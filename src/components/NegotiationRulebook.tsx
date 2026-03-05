export function NegotiationRulebook() {
    const rules = [
        { id: 1, title: 'Retainer First', desc: 'Adjust/lower fixed retainer to lower initial break-even exposure.' },
        { id: 2, title: 'Tier Efficiency', desc: 'Use tiered fee structures instead of flat share to protect variable margin.' },
        { id: 3, title: 'Bonus to Tier', desc: 'Convert one-time bonuses into high-volume tier unlocks to incentivize flow.' },
        { id: 4, title: 'Sub-Split Floor', desc: 'Treat sub-split as the final flexibility lever; increase only after share is optimized.' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rules.map(r => (
                <div key={r.id} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                        minWidth: '24px',
                        height: '24px',
                        background: 'var(--accent-blue)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: '#fff'
                    }}>
                        {r.id}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{r.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.desc}</div>
                    </div>
                </div>
            ))}

            <div style={{
                marginTop: '8px',
                padding: '12px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '0.7rem',
                color: 'var(--accent-cyan)',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                "Protect the baseline margin; scale the top-line volume."
            </div>
        </div>
    );
}
