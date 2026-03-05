import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Props {
    onClose: () => void;
}

export function AuthModal({ onClose }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            onClose();
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div className="glass-panel" style={{ width: '400px', padding: '32px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                <h2 style={{ marginBottom: '8px' }}>Login</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>Access your BD OS workspace.</p>

                {error && <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem', border: '1px solid var(--accent-rose)' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="input-group">
                        <label className="input-label">Email</label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loading} style={{ background: 'var(--accent-blue)', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' }}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
