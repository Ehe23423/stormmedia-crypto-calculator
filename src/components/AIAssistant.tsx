import { type DealParams, type DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
    updateParam: (key: keyof DealParams, val: any) => void;
}

export function ScenarioBuilder({ params, updateParam }: Props) {
    const presets = [
        { name: 'Community', p: 50, r: 0, s: 30, desc: 'High share, sub-split heavy.' },
        { name: 'Influencer', p: 40, r: 2500, s: 0, desc: 'Variable share + fixed retainer.' },
        { name: 'Trader', p: 15, r: 0, s: 0, desc: 'Low share, fee-optimization focus.' },
        { name: 'Whale', p: 5, r: 0, s: 0, desc: 'Minimal payout, institutional flow.' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {presets.map(p => (
                    <button
                        key={p.name}
                        onClick={() => {
                            updateParam('P', p.p);
                            updateParam('R', p.r);
                            updateParam('S', p.s);
                        }}
                        className="glass-btn"
                        style={{
                            padding: '10px 5px',
                            fontSize: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border-light)',
                            background: 'rgba(255,255,255,0.02)'
                        }}
                    >
                        <strong>{p.name}</strong>
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="var-block">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Partner Greed</span>
                        <span style={{ color: 'var(--accent-rose)', fontWeight: 800 }}>{params.P}%</span>
                    </label>
                    <input
                        className="styled-range range-rose"
                        type="range"
                        min={0}
                        max={80}
                        step={1}
                        value={params.P}
                        onChange={e => updateParam('P', Number(e.target.value))}
                    />
                </div>
                <div className="var-block">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Volume Reliability</span>
                        <span style={{ color: 'var(--accent-blue)', fontWeight: 800 }}>{(params.V / 1_000_000).toFixed(0)}M</span>
                    </label>
                    <input
                        className="styled-range range-blue"
                        type="range"
                        min={1000000}
                        max={100000000}
                        step={1000000}
                        value={params.V}
                        onChange={e => updateParam('V', Number(e.target.value))}
                    />
                </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.1)', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Current Scenario Logic:
                <strong style={{ color: 'var(--accent-blue)', marginLeft: '4px' }}>
                    {params.P > 60 ? 'Extreme Payout' : params.P > 30 ? 'Standard Hybrid' : 'Institutional Flow'}
                </strong>
            </div>
        </div>
    );
}
