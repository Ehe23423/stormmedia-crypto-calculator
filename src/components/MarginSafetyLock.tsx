
interface Props {
    value: number;
    onChange: (val: number) => void;
}

export function MarginSafetyLock({ value, onChange }: Props) {
    const steps = [0, 5, 10, 15, 20, 25, 30, 40];

    return (
        <div style={{
            background: '#0f172a', // bg-slate-900 
            border: '1px solid #1e293b', // border-slate-800
            borderRadius: '0.75rem',
            padding: '1.25rem'
        }}>
            <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🛡️ Exchange Margin Guard
                </h3>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    Minimum margin required for deal to be considered safe
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={value}
                    onChange={e => {
                        const val = Number(e.target.value);
                        // Snap to steps
                        const closest = steps.reduce((prev, curr) =>
                            Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev
                        );
                        onChange(closest);
                    }}
                    style={{ accentColor: '#f97316' }} // orange-500
                    className="styled-range"
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                    {steps.map(s => (
                        <span key={s} style={{ color: value === s ? '#f97316' : 'inherit' }}>{s}%</span>
                    ))}
                </div>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', margin: 0, fontStyle: 'italic' }}>
                    💡 If the margin buffer drops below this threshold, the deal will be flagged as <span style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>BLOCKED</span>.
                </p>
            </div>
        </div>
    );
}
