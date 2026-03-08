
interface Props {
    value: number;
    onChange: (val: number) => void;
}

export function MarginSafetyLock({ value, onChange }: Props) {
    const steps = [0, 5, 10, 15, 20, 25, 30, 35, 40];

    return (
        <div style={{
            background: 'rgba(15, 23, 42, 0.4)', // semi-transparent
            border: '1px solid rgba(30, 41, 59, 0.5)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '0.9rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    🛡️ Exchange Margin Guard
                </h3>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    Minimum margin required for deal to be considered safe
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative', height: '32px', display: 'flex', alignItems: 'center' }}>
                    <input
                        type="range"
                        min={0}
                        max={40}
                        step={5}
                        value={value}
                        onChange={e => {
                            const val = Number(e.target.value);
                            const closest = steps.reduce((prev, curr) =>
                                Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
                            );
                            onChange(closest);
                        }}
                        style={{
                            width: '100%',
                            accentColor: 'var(--accent-rose)',
                            cursor: 'pointer'
                        }}
                        className="styled-range"
                    />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0 8px', // offset for thumb radius
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                }}>
                    {steps.map(s => (
                        <span key={s} style={{
                            color: value === s ? 'var(--accent-rose)' : 'inherit',
                            transition: 'color 0.2s',
                            width: '24px',
                            textAlign: 'center'
                        }}>{s}%</span>
                    ))}
                </div>

                <div style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '12px',
                    borderRadius: '8px',
                    margin: 0,
                    border: '1px solid rgba(255,255,255,0.05)',
                    lineHeight: '1.4'
                }}>
                    <span style={{ marginRight: '8px' }}>💡</span>
                    If the margin buffer drops below this threshold, the deal will be flagged as <span style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>BLOCKED</span>.
                </div>
            </div>
        </div>
    );
}
