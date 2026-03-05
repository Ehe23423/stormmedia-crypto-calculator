import '../index.css';

export function ComplianceWarning({ params }: { params?: any }) {
    const isStupidDeal = params && params.P >= 0.70 && params.I > 3000 && params.V < 5000000;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Stupid Deal Detector Mode */}
            {isStupidDeal && (
                <div style={{ background: 'rgba(236, 72, 153, 0.1)', border: '2px solid var(--accent-rose)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🚨</div>
                    <h3 style={{ color: 'var(--accent-rose)', margin: '0 0 8px 0', fontSize: '1.2rem' }}>STUPID DEAL DETECTOR TRIGGERED</h3>
                    <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
                        70%+ Revenue Share with a massive retainer on low volume?<br />
                        <span style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>This deal loses money. Try therapy.</span>
                    </p>
                </div>
            )}
        </div>
    );
}
