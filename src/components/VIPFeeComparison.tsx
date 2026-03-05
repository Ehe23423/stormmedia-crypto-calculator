import { useState } from 'react';

export function VIPFeeComparison() {
    const [volume, setVolume] = useState(50_000_000);
    const [regularFee, setRegularFee] = useState(0.0005); // 0.05%
    const [optimizedFee, setOptimizedFee] = useState(0.00028); // 0.028%

    const regularTotal = volume * regularFee;
    const optimizedTotal = volume * optimizedFee;
    const savings = regularTotal - optimizedTotal;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(59, 130, 246, 0.05)', borderColor: 'var(--accent-blue)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>💎</span> VIP FEE COMPARISON (WHALE PITCH)
            </h3>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div className="input-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="input-label">Projected Volume (USD)</label>
                    <input type="number" value={volume} onChange={e => setVolume(Number(e.target.value))} />
                </div>
                <div className="input-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="input-label">Regular Taker Fee (%)</label>
                    <input type="number" step="0.001" value={regularFee * 100} onChange={e => setRegularFee(Number(e.target.value) / 100)} />
                </div>
                <div className="input-group" style={{ flex: 1, minWidth: '150px' }}>
                    <label className="input-label">Optimized VIP Fee (%)</label>
                    <input type="number" step="0.001" value={optimizedFee * 100} onChange={e => setOptimizedFee(Number(e.target.value) / 100)} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <span className="label">Regular Fees Cost</span>
                    <span className="value" style={{ color: 'var(--text-secondary)' }}>{formatCurrency(regularTotal)}</span>
                </div>
                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <span className="label">Optimized VIP Cost</span>
                    <span className="value" style={{ color: 'var(--accent-blue)' }}>{formatCurrency(optimizedTotal)}</span>
                </div>
                <div className="metric-card" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--accent-emerald)' }}>
                    <span className="label" style={{ color: 'var(--accent-emerald)' }}>Direct Savings / Extra P&L</span>
                    <span className="value positive">+{formatCurrency(savings)} / mo</span>
                </div>
            </div>

            <div style={{ marginTop: '16px', padding: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <strong>Pitch to Whale:</strong> "By trading {formatCurrency(volume)} with our optimized VIP tier of {(optimizedFee * 100).toFixed(3)}%, you immediately save {formatCurrency(savings)} every single month compared to the standard rate. This directly increases your trading P&L."
            </div>
        </div>
    );
}
