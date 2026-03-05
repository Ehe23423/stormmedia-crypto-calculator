import type { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    updateParam: (key: keyof DealParams, val: any) => void;
}

export function DealSimulator({ params, updateParam }: Props) {
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(val));

    return (
        <div className="simulator-controls" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* VOLUME */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>MONTHLY VOLUME (USD)</label>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 900 }}>{formatUSD(params.V)}</span>
                </div>
                <input
                    className="styled-range range-blue"
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="1000000"
                    value={params.V}
                    onChange={(e) => updateParam('V', parseInt(e.target.value))}
                />
            </div>

            {/* FEE */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>GROSS FEE (%)</label>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 900 }}>{params.F}%</span>
                </div>
                <input
                    className="styled-range range-cyan"
                    type="range"
                    min="0.01"
                    max="0.2"
                    step="0.005"
                    value={params.F}
                    onChange={(e) => updateParam('F', parseFloat(e.target.value))}
                />
            </div>

            {/* PARTNER SHARE */}
            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>PARTNER SHARE (REVENUE %)</label>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 900 }}>{params.P}%</span>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* SUB SPLIT */}
                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-secondary)' }}>SUB-SPLIT %</label>
                    <input
                        type="number"
                        value={params.S}
                        onChange={(e) => updateParam('S', parseInt(e.target.value))}
                        className="glass-input"
                        style={{ width: '100%' }}
                    />
                </div>

                {/* RETAINER */}
                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-secondary)' }}>RETAINER (USD)</label>
                    <input
                        type="number"
                        value={params.R}
                        onChange={(e) => updateParam('R', parseInt(e.target.value))}
                        className="glass-input"
                        style={{ width: '100%' }}
                    />
                </div>

                {/* OP COST */}
                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-secondary)' }}>OP COST (USD)</label>
                    <input
                        type="number"
                        value={params.I}
                        onChange={(e) => updateParam('I', parseInt(e.target.value))}
                        className="glass-input"
                        style={{ width: '100%' }}
                    />
                </div>

                {/* BONUS */}
                <div className="control-group">
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-secondary)' }}>BONUS / 1M (USD)</label>
                    <input
                        type="number"
                        value={params.B}
                        onChange={(e) => updateParam('B', parseInt(e.target.value))}
                        className="glass-input"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}
