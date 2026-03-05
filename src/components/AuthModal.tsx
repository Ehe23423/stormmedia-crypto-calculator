import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Props {
    onClose: () => void;
}

export function AuthModal({ onClose }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = isSignUp
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            if (isSignUp) {
                alert('Verification email sent! (If configured) or account created.');
            }
            onClose();
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div className="glass-panel" style={{ width: '400px', padding: '40px', position: 'relative', border: '1px solid var(--border-light)' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                <h2 style={{ marginBottom: '8px' }}>{isSignUp ? 'Create Account' : 'Login'}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    {isSignUp ? 'Join the elite BD network.' : 'Access your BD OS workspace.'}
                </p>

                {error && <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', border: '1px solid var(--accent-rose)' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Secure Password</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
                    </div>
                    <button type="submit" disabled={loading} style={{ background: 'var(--accent-blue)', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', fontSize: '1rem' }}>
                        {loading ? 'Processing...' : (isSignUp ? 'Register Now' : 'Sign In')}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {isSignUp ? 'Login here' : 'Register here'}
                    </button>
                </div>
            </div>
        </div>
    );
}
