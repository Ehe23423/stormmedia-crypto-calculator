import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Props {
    onClose: () => void;
}

export function AuthModal({ onClose }: Props) {
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const keyMap: Record<string, { role: 'admin' | 'agency' | 'hunter' | 'partner', email: string }> = {
        'SZYMON_ADMIN': { role: 'admin', email: 'jerryszymon@gmail.com' },
        'MATEUS_AGENCY': { role: 'agency', email: 'mateus@example.com' },
        'SHIKHA_HUNTER': { role: 'hunter', email: 'shikha@example.com' },
        'KRITIK_HUNTER': { role: 'hunter', email: 'kritik@example.com' },
        'REMSUA_STREAMER': { role: 'partner', email: 'remsua@example.com' }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const normalizedKey = accessKey.trim().toUpperCase();
        const access = keyMap[normalizedKey as keyof typeof keyMap];

        if (access) {
            // Simulate a session for the App to consume
            // In a real app we'd use a service role to fetch/sign in, 
            // but for this request we'll just trigger the onClose and let the parent handle the "simulated" role if needed.
            // Actually, we need to bypass Supabase Auth in App.tsx too.

            // For now, we will use a "Hack": use a common password in Supabase for all these accounts
            // or just mock the session entirely if the user prefers.
            // Given "jebac emaile", I will mock the session in App.tsx.

            const sessionData = {
                user: { email: access.email, id: 'mock-id' },
                role: access.role
            };
            localStorage.setItem('sb_mock_session', JSON.stringify(sessionData));

            setLoading(false);
            onClose();
            window.location.reload();
        } else {
            setError('Invalid Access Key. Contact Szymon for credentials.');
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div className="glass-panel" style={{ width: '400px', padding: '40px', position: 'relative', border: '1px solid var(--border-light)', boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                <h2 style={{ marginBottom: '8px', letterSpacing: '2px' }}>TERMINAL ACCESS</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '32px' }}>
                    Enter your professional access key to unlock your workspace.
                </p>

                {error && <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem', border: '1px solid var(--accent-rose)' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="input-group">
                        <label className="input-label" style={{ letterSpacing: '1px' }}>SECRET ACCESS KEY</label>
                        <input
                            type="password"
                            required
                            value={accessKey}
                            onChange={e => setAccessKey(e.target.value)}
                            placeholder="Enter Key..."
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', color: 'white', fontSize: '1.1rem', textAlign: 'center', letterSpacing: '4px' }}
                        />
                    </div>
                    <button type="submit" disabled={loading} style={{ background: 'var(--accent-blue)', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
                        {loading ? 'UNCORRECTING...' : 'INITIATE SESSION'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Level 4 encryption enabled • Terminal ID: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
            </div>
        </div>
    );
}
