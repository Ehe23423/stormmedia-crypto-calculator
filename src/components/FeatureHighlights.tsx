import '../index.css';

export function FeatureHighlights() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
        }}>

            {/* Card 1: BD OS */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(61,155,255,0.12) 0%, rgba(61,155,255,0.04) 100%)',
                border: '1px solid rgba(61,155,255,0.25)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.6rem' }}>⚡</span>
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>BD Operating System</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-blue)' }}>Real-time Deal Engine</div>
                </div>
            </div>

            {/* Card 2: Zero Auth */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(16,217,138,0.12) 0%, rgba(16,217,138,0.04) 100%)',
                border: '1px solid rgba(16,217,138,0.25)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.6rem' }}>🔓</span>
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Access Level</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>Open Dashboard</div>
                </div>
            </div>

            {/* Card 3: Roast Mode */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(244,114,182,0.12) 0%, rgba(244,114,182,0.04) 100%)',
                border: '1px solid rgba(244,114,182,0.25)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.6rem' }}>🔥</span>
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Roast Mode</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-pink)' }}>Deal Massacre Ready</div>
                </div>
            </div>

            {/* Card 4: Tools */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.04) 100%)',
                border: '1px solid rgba(168,85,247,0.25)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.6rem' }}>🛠️</span>
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Tools Active</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-purple)' }}>20+ BD Modules</div>
                </div>
            </div>

            {/* Card 5: VIP Upgrade */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(251,188,4,0.12) 0%, rgba(251,188,4,0.04) 100%)',
                border: '1px solid rgba(251,188,4,0.25)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{ fontSize: '1.6rem' }}>👑</span>
                <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>VIP Upgrade</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-amber)' }}>Beat Any Exchange</div>
                </div>
            </div>

        </div>
    );
}
