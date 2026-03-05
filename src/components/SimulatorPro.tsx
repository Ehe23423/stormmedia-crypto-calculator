import { useState } from 'react';
import '../index.css';

export function SimulatorPro() {
    const [users, setUsers] = useState<number>(3000);
    const [activePercent, setActivePercent] = useState<number>(8);
    const [avgVol, setAvgVol] = useState<number>(3000);

    // Exchange vars for calculation
    const [feeLevel] = useState(0.00035);
    const [payoutShare] = useState(0.40);

    // Derived Metrics
    const activeTraders = Math.floor(users * (activePercent / 100));
    const totalMonthlyVolume = activeTraders * avgVol;
    const totalExchangeFee = totalMonthlyVolume * feeLevel;          // feeLevel already in decimal e.g. 0.00035
    const partnerEarnings = totalExchangeFee * payoutShare;            // payoutShare already in decimal e.g. 0.40

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div className="glass-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🧠</span> Partner Profit Simulator
                    </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Most KOLs do not understand trading mathematics. Translate their community size into exact monthly revenue.
                </p>

                <div className="variables-grid" style={{ marginBottom: '24px' }}>
                    <div className="input-group">
                        <label className="input-label">Community Size (Users)</label>
                        <input type="number" value={users} onChange={(e) => setUsers(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Active Traders (%)</label>
                        <input type="number" value={activePercent} onChange={(e) => setActivePercent(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Avg Volume per Trader (USD)</label>
                        <input type="number" value={avgVol} onChange={(e) => setAvgVol(Number(e.target.value))} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                    <div className="metric-card" style={{ background: 'rgba(59, 130, 246, 0.05)', borderColor: 'var(--accent-blue)' }}>
                        <div className="label">Active Trading Hub</div>
                        <div className="value" style={{ fontSize: '1.5rem', color: 'var(--accent-blue)' }}>{activeTraders} Users</div>
                        <div className="sub-value">Based on {activePercent}% conversion</div>
                    </div>
                    <div className="metric-card" style={{ background: 'rgba(139, 92, 246, 0.05)', borderColor: 'var(--accent-purple)' }}>
                        <div className="label">Total Monthly Block</div>
                        <div className="value" style={{ fontSize: '1.5rem', color: 'var(--accent-purple)' }}>{formatCurrency(totalMonthlyVolume)}</div>
                        <div className="sub-value">Gross network flow</div>
                    </div>
                    <div className="metric-card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'var(--accent-emerald)' }}>
                        <div className="label">Partner Earnings</div>
                        <div className="value" style={{ fontSize: '1.8rem', color: 'var(--accent-emerald)' }}>{formatCurrency(partnerEarnings)}</div>
                        <div className="sub-value">Clear cut at {payoutShare}%</div>
                    </div>
                </div>
            </div>

            {/* Growth Projection Tool */}
            <div className="glass-panel">
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '16px' }}>Ascension (Growth Projection)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Show partners the compound effect of their community growth over time.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Month 1 (Baseline)</div>
                        <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(partnerEarnings)}</div>
                        <div style={{ marginTop: '8px', width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: '33%', height: '100%', background: 'var(--text-secondary)' }}></div>
                        </div>
                    </div>

                    <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--accent-blue)', textAlign: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-blue)', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>+150%</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', marginBottom: '8px' }}>Month 3 (Scaling)</div>
                        <div style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(partnerEarnings * 2.5)}</div>
                        <div style={{ marginTop: '8px', width: '100%', height: '4px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: '66%', height: '100%', background: 'var(--accent-blue)' }}></div>
                        </div>
                    </div>

                    <div style={{ padding: '16px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--accent-emerald)', textAlign: 'center', position: 'relative', boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-emerald)', color: '#000', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>+300%</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginBottom: '8px' }}>Month 6 (Maturity)</div>
                        <div style={{ fontSize: '1.5rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{formatCurrency(partnerEarnings * 4.0)}</div>
                        <div style={{ marginTop: '8px', width: '100%', height: '4px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: '100%', height: '100%', background: 'var(--accent-emerald)' }}></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
