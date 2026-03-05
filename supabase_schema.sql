-- Run this entirely in the Supabase SQL Editor

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('admin', 'partner', 'agency', 'hunter');
CREATE TYPE share_mode AS ENUM ('read_only', 'editable');

-- 2. Create Tables

-- PROFILES (Linked to auth.users)
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT,
    role user_role DEFAULT 'partner'::user_role,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SCENARIOS
CREATE TABLE scenarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    state_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PARTNER ENTITIES (CRM)
CREATE TABLE partner_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SHARE LINKS
CREATE TABLE share_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
    created_by_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    mode share_mode DEFAULT 'read_only'::share_mode NOT NULL,
    allowed_role user_role, -- If null, anyone can access based on mode
    expires_at TIMESTAMP WITH TIME ZONE,
    password_hash TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- AUDIT LOG
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    scenario_id UUID REFERENCES scenarios(id) ON DELETE SET NULL,
    event TEXT NOT NULL,
    payload_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Trigger for Auth Profile Creation
-- Automatically creates a profile when a new user signs up in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, display_name)
  VALUES (new.id, new.email, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies

-- PROFILES
-- Users can see their own profile. Admins can see all.
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
-- Only admin can update roles
CREATE POLICY "Admins can update profiles" ON profiles FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));

-- SCENARIOS
CREATE POLICY "Users can manage own scenarios" ON scenarios FOR ALL USING (auth.uid() = owner_user_id);
CREATE POLICY "Admins can view all scenarios" ON scenarios FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
-- Shared scenario access handled via a separate DB function or explicitly fetching via token on RPC, 
-- but we'll add a read policy for shared scenarios if they match a token check logic (usually done client side or edge function).
-- For security, we strictly bind to owner_user_id in standard queries.

-- PARTNER ENTITIES
CREATE POLICY "Users can manage own CRM" ON partner_entities FOR ALL USING (auth.uid() = owner_user_id);
CREATE POLICY "Admins can view CRM" ON partner_entities FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));

-- SHARE LINKS
CREATE POLICY "Users can manage own links" ON share_links FOR ALL USING (auth.uid() = created_by_user_id);
CREATE POLICY "Anyone can read share links" ON share_links FOR SELECT USING (true); -- Public read so the token can be verified at edge

-- AUDIT LOG
CREATE POLICY "Users can view own logs" ON audit_log FOR SELECT USING (auth.uid() = owner_user_id);
CREATE POLICY "Users can insert own logs" ON audit_log FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
CREATE POLICY "Admins can view all logs" ON audit_log FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
