-- =========================================================================================
-- SZYMON CRYPTO BRAIN BS OS: PRODUCTION V2 SCHEMA
-- Implements Multi-Tenancy (orgs), Strict RLS roles (partner/admin/agency/hunter),
-- CRM functionality, Deal Workflows, and Advanced Logging.
-- =========================================================================================

-- 0. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================================
-- 1. ENUMS
-- =========================================================================================
CREATE TYPE user_role AS ENUM ('admin', 'partner', 'agency', 'hunter');
CREATE TYPE entity_type AS ENUM ('partner', 'creator', 'community', 'agency', 'trader');
CREATE TYPE entity_status AS ENUM ('lead', 'contacted', 'negotiating', 'won', 'lost', 'paused');
CREATE TYPE template_category AS ENUM ('spot', 'futures', 'streamer', 'signal', 'affiliate', 'event', 'custom');
CREATE TYPE deal_status AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'active', 'completed', 'archived');
CREATE TYPE deal_type AS ENUM ('flat', 'revshare', 'hybrid', 'performance');
CREATE TYPE deliverable_type AS ENUM ('stream', 'video', 'post', 'banner', 'discord', 'telegram', 'event', 'other');
CREATE TYPE deliverable_status AS ENUM ('planned', 'in_progress', 'delivered', 'approved');
CREATE TYPE outreach_channel AS ENUM ('email', 'telegram', 'twitter', 'instagram', 'call', 'meeting');
CREATE TYPE outreach_outcome AS ENUM ('no_reply', 'replied', 'positive', 'negative', 'scheduled', 'closed');
CREATE TYPE link_target_type AS ENUM ('deal', 'scenario', 'template');
CREATE TYPE link_mode AS ENUM ('read', 'edit');

-- =========================================================================================
-- 2. ORGS (TENANTS)
-- =========================================================================================
CREATE TABLE orgs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_by_user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 3. PROFILES
-- =========================================================================================
CREATE TABLE profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'partner'::user_role,
    org_id UUID REFERENCES orgs(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Internal Function: Automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'partner'::user_role);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for Auto-Profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================================================================
-- 4. PARTNER ENTITIES (CRM Objects & Leads)
-- =========================================================================================
CREATE TABLE partner_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    type entity_type NOT NULL DEFAULT 'creator',
    name TEXT NOT NULL,
    platform TEXT,
    country TEXT,
    tags TEXT[],
    owner_user_id UUID REFERENCES auth.users(id),
    status entity_status DEFAULT 'lead',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 5. DEAL TEMPLATES
-- =========================================================================================
CREATE TABLE deal_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    name TEXT NOT NULL,
    category template_category DEFAULT 'custom',
    template_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_by_user_id UUID REFERENCES auth.users(id),
    is_global BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 6. DEALS (THE CORE ENGINE)
-- =========================================================================================
CREATE TABLE deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    created_by_user_id UUID REFERENCES auth.users(id),
    owner_user_id UUID REFERENCES auth.users(id),
    entity_id UUID REFERENCES partner_entities(id),
    title TEXT NOT NULL,
    status deal_status DEFAULT 'draft',
    deal_type deal_type DEFAULT 'hybrid',
    scenario_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    metrics_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    margin_lock_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-update updated_at on modify
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_deals_modtime 
BEFORE UPDATE ON deals 
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- =========================================================================================
-- 7. DELIVERABLES (Agency tracking)
-- =========================================================================================
CREATE TABLE deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    created_by_user_id UUID REFERENCES auth.users(id),
    type deliverable_type DEFAULT 'other',
    description TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    due_date DATE,
    status deliverable_status DEFAULT 'planned',
    link_url TEXT,
    proof_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 8. OUTREACH (Hunter Pipeline Logs)
-- =========================================================================================
CREATE TABLE outreach (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    entity_id UUID REFERENCES partner_entities(id) ON DELETE CASCADE,
    created_by_user_id UUID REFERENCES auth.users(id),
    channel outreach_channel DEFAULT 'email',
    message_text TEXT,
    outcome outreach_outcome DEFAULT 'no_reply',
    next_step_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 9. SHARE LINKS (External pitching & collaboration)
-- =========================================================================================
CREATE TABLE share_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    created_by_user_id UUID REFERENCES auth.users(id),
    target_type link_target_type DEFAULT 'deal',
    target_id UUID NOT NULL,
    token TEXT UNIQUE NOT NULL,
    mode link_mode DEFAULT 'read',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 10. AUDIT LOG (Action Tracking & Compliance)
-- =========================================================================================
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES orgs(id),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    object_type TEXT,
    object_id UUID,
    meta JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================================
-- 11. ROW LEVEL SECURITY (RLS) ACTIVATION & POLICIES
-- =========================================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orgs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user role
CREATE OR REPLACE FUNCTION get_user_role() RETURNS TEXT AS $$
  SELECT role::TEXT FROM profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function to get current user org
CREATE OR REPLACE FUNCTION get_user_org() RETURNS UUID AS $$
  SELECT org_id FROM profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- -------------------------------------------------------------------------
-- PROFILES POLICIES
-- Users can read their own profile, Admins can read all profiles in org.
-- -------------------------------------------------------------------------
CREATE POLICY "Users can view own profile" ON profiles 
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles in org" ON profiles 
    FOR SELECT USING (get_user_role() = 'admin' AND org_id = get_user_org());

-- -------------------------------------------------------------------------
-- ORGS POLICIES
-- Users can view their assigned org.
-- -------------------------------------------------------------------------
CREATE POLICY "Users can view their org" ON orgs 
    FOR SELECT USING (id = get_user_org() OR created_by_user_id = auth.uid());

-- -------------------------------------------------------------------------
-- PARTNER ENTITIES POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "Admin entity access" ON partner_entities 
    FOR ALL USING (get_user_role() = 'admin' AND org_id = get_user_org());

CREATE POLICY "Partner entity access" ON partner_entities 
    FOR ALL USING (get_user_role() = 'partner' AND owner_user_id = auth.uid());

CREATE POLICY "Agency/Hunter entity access" ON partner_entities 
    FOR ALL USING ((get_user_role() = 'agency' OR get_user_role() = 'hunter') AND (owner_user_id = auth.uid() OR org_id = get_user_org()));

-- -------------------------------------------------------------------------
-- DEAL TEMPLATES POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "View global templates and org templates" ON deal_templates 
    FOR SELECT USING (is_global = true OR org_id = get_user_org() OR created_by_user_id = auth.uid());

CREATE POLICY "Admin template management" ON deal_templates 
    FOR ALL USING (get_user_role() = 'admin' AND org_id = get_user_org());

-- -------------------------------------------------------------------------
-- DEALS POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "Admin deals access" ON deals 
    FOR ALL USING (get_user_role() = 'admin' AND org_id = get_user_org());

CREATE POLICY "Partner deals access" ON deals 
    FOR SELECT USING (owner_user_id = auth.uid() OR created_by_user_id = auth.uid());

CREATE POLICY "Partner deals full" ON deals 
    FOR ALL USING (get_user_role() = 'partner' AND (owner_user_id = auth.uid() OR created_by_user_id = auth.uid()));

CREATE POLICY "Agency/Hunter deals access" ON deals 
    FOR ALL USING ((get_user_role() = 'agency' OR get_user_role() = 'hunter') AND (owner_user_id = auth.uid() OR created_by_user_id = auth.uid()));

-- -------------------------------------------------------------------------
-- DELIVERABLES POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "View deliverables" ON deliverables 
    FOR SELECT USING (org_id = get_user_org() OR created_by_user_id = auth.uid());
CREATE POLICY "Manage deliverables" ON deliverables 
    FOR ALL USING (org_id = get_user_org() OR created_by_user_id = auth.uid());

-- -------------------------------------------------------------------------
-- OUTREACH POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "Hunter/Admin outreach access" ON outreach 
    FOR ALL USING (created_by_user_id = auth.uid() OR (get_user_role() = 'admin' AND org_id = get_user_org()));

-- -------------------------------------------------------------------------
-- SHARE LINKS POLICIES
-- Links are public to resolve via token bypass, but mutation is restricted
-- -------------------------------------------------------------------------
CREATE POLICY "Public token resolution" ON share_links 
    FOR SELECT USING (true);
CREATE POLICY "Creator manage links" ON share_links 
    FOR ALL USING (created_by_user_id = auth.uid() OR (get_user_role() = 'admin' AND org_id = get_user_org()));

-- -------------------------------------------------------------------------
-- AUDIT LOG POLICIES
-- -------------------------------------------------------------------------
CREATE POLICY "Admin view all logs" ON audit_log 
    FOR SELECT USING (get_user_role() = 'admin' AND org_id = get_user_org());
CREATE POLICY "Users view own logs" ON audit_log 
    FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users insert logs" ON audit_log 
    FOR INSERT WITH CHECK (user_id = auth.uid());
