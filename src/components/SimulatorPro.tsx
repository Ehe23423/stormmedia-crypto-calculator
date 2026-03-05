import type { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    updateParam: (key: keyof DealParams, val: any) => void;
}

export function DealSimulator({ params, updateParam }: Props) {
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(val));

    return (
        <div className="simulator-controls" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* 1. VOLUME */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>MONTHLY VOLUME (USD)</label>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 900, fontSize: '1rem' }}>{formatUSD(params.V)}</span>
                </div>
                <input
                    className="styled-range range-blue"
                    type="range"
                    min="1000000"
                    max="200000000"
                    step="1000000"
                    value={params.V}
                    onChange={(e) => updateParam('V', parseInt(e.target.value))}
                />
            </div>

            {/* 2. BLENDED FEE (%) */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>BLENDED FEE (%)</label>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 900, fontSize: '1.2rem' }}>{params.F}%</span>
                </div>
                <input
                    className="styled-range range-cyan"
                    type="range"
                    min="0.005"
                    max="0.25"
                    step="0.005"
                    value={params.F}
                    onChange={(e) => updateParam('F', parseFloat(e.target.value))}
                />
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                    Note: This is the combined avg fee across all tiers and assets.
                </div>
            </div>

            {/* 3. PARTNER SHARE (%) */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>PARTNER SHARE (%)</label>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 900, fontSize: '1.2rem' }}>{params.P}%</span>
                </div>
                <input
                    className="styled-range range-emerald"
                    type="range"
                    min="0"
                    max="95"
                    step="5"
                    value={params.P}
                    onChange={(e) => updateParam('P', parseInt(e.target.value))}
                />
            </div>

            {/* 4. SUB-SPLIT (%) */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>SUB-SPLIT (%)</label>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: 900, fontSize: '1.2rem' }}>{params.S}%</span>
                </div>
                <input
                    className="styled-range range-purple"
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={params.S}
                    onChange={(e) => updateParam('S', parseInt(e.target.value))}
                />
            </div>

            {/* FIXED COSTS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Retainer (USD)</label>
                    <input
                        type="number"
                        value={params.R}
                        onChange={(e) => updateParam('R', parseInt(e.target.value))}
                        className="glass-input"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)' }}
                    />
                </div>

                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Op Cost (USD)</label>
                    <input
                        type="number"
                        value={params.I}
                        onChange={(e) => updateParam('I', parseInt(e.target.value))}
                        className="glass-input"
                    />
                </div>

                <div className="control-group" style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-secondary)' }}>Bonus per 1M (USD)</label>
                    <input
                        type="number"
                        value={params.B}
                        onChange={(e) => updateParam('B', parseInt(e.target.value))}
                        className="glass-input"
                    />
                </div>
            </div>
        </div>
    );
}
