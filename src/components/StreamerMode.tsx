import { useState, useEffect } from 'react';

export function StreamerMode() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.classList.add('streamer-mode-active');
        } else {
            document.body.classList.remove('streamer-mode-active');
        }
    }, [isActive]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)' }}>
                    {isActive ? '🔴 STREAMER MODE ON' : '⚪ STREAMER MODE OFF'}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Masks sensitive volume & profit figures</div>
            </div>
            <button
                onClick={() => setIsActive(!isActive)}
                className="glass-btn"
                style={{
                    padding: '4px 12px',
                    background: isActive ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    borderColor: isActive ? 'var(--accent-blue)' : 'var(--border-light)'
                }}
            >
                {isActive ? 'Disable' : 'Enable'}
            </button>
        </div>
    );
}
