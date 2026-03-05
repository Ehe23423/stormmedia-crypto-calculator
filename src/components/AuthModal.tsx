import { useState } from 'react';

interface Props {
    onClose: () => void;
}

export function AuthModal({ onClose }: Props) {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const riddle = {
        question: "Who is the ghost that started it all in 2008? (First Name only)",
        answer: "satoshi"
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Fun delay for "verifying"
        await new Promise(r => setTimeout(r, 1000));

        if (answer.toLowerCase().trim() === riddle.answer) {
            const guestSession = {
                user: { email: 'guest@brain.os', id: 'guest-user-001' },
                role: 'admin' // Give full access since it's a team-only secret gate
            };
            localStorage.setItem('sb_mock_session', JSON.stringify(guestSession));
            onClose();
            window.location.reload();
        } else {
            setError("WRONG. Access Denied. You are not a true degen.");
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }} className="fade-in">
            <div className="glass-panel" style={{ maxWidth: '450px', width: '100%', position: 'relative', border: '1px solid var(--accent-blue)', boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
                >✕</button>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧩</div>
                    <h2 style={{ fontSize: '1.5rem', letterSpacing: '2px', color: 'white', textTransform: 'uppercase', margin: 0 }}>DEGEN PROOF</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
                        Solve the riddle to unlock the operating system.
                    </p>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-light)', marginBottom: '24px' }}>
                    <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--accent-blue)', fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.4 }}>
                        "{riddle.question}"
                    </p>
                </div>

                {error && <div className="shake" style={{ background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.85rem', border: '1px solid var(--accent-rose)', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        type="text"
                        required
                        autoFocus
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        placeholder="Type answer here..."
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '12px', color: 'white', fontSize: '1.1rem', textAlign: 'center', outline: 'none' }}
                    />
                    <button type="submit" disabled={loading} style={{ background: 'var(--accent-blue)', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.1rem' }}>
                        {loading ? 'VERIFYING...' : 'UNLOCK TERMINAL'}
                    </button>
                </form>

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.7rem', opacity: 0.3, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    SZYMON CRYPTO BRAIN • NO ACCOUNTS REQUIRED
                </div>
            </div>
        </div>
    );
}
