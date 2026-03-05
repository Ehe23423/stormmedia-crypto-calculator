import { useState } from 'react';

export function HunterPanel() {
    const [mode, setMode] = useState<'A' | 'B'>('A');

    // Mode A Inputs
    const [partnerMonthlyPayout, setPartnerMonthlyPayout] = useState(15000);

    // Mode B Inputs
    const [partnerPayoutPer1M, setPartnerPayoutPer1M] = useState(150);
    const [volume, setVolume] = useState(10_000_000);

    // Common Inputs
    const [hunterCutPercent, setHunterCutPercent] = useState(10);
    const [durationMonths, setDurationMonths] = useState(1);

    // Optional Inputs
    const [hasCap, setHasCap] = useState(false);
    const [monthlyCap, setMonthlyCap] = useState(5000);

    const [hasMilestones, setHasMilestones] = useState(false);
    const [milestones, setMilestones] = useState([{ threshold: 20_000_000, bonus: 1000 }]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Calculations
    let baseMonthly = 0;
    let activeVolume = 0;

    if (mode === 'A') {
        baseMonthly = partnerMonthlyPayout;
    } else {
        activeVolume = volume;
        baseMonthly = (volume / 1_000_000) * partnerPayoutPer1M;
    }

    // Hunter Cut
    let hunterMonthly = baseMonthly * (hunterCutPercent / 100);

    // Milestones (Only apply if volume is known in Mode B)
    let milestoneBonus = 0;
    if (mode === 'B' && hasMilestones) {
        milestoneBonus = milestones
            .filter(m => volume >= m.threshold)
            .reduce((sum, m) => sum + m.bonus, 0);
    }

    hunterMonthly += milestoneBonus;

    // Cap
    if (hasCap) {
        hunterMonthly = Math.min(hunterMonthly, monthlyCap);
    }

    const hunterTotal = hunterMonthly * durationMonths;
    let hunterEffectivePer1M = 0;
    if (mode === 'B' && volume > 0) {
        hunterEffectivePer1M = hunterMonthly / (volume / 1_000_000);
    }

    const copySummary = () => {
        const text = `Hunter cut: ${hunterCutPercent}%. Partner payout: ${formatCurrency(baseMonthly)}/month. Hunter earns: ${formatCurrency(hunterMonthly)}/month, ${formatCurrency(hunterTotal)} total over ${durationMonths} months.`;
        navigator.clipboard.writeText(text);
        alert('Summary copied to clipboard!');
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--accent-blue)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                    🎯 HUNTER PANEL
                </h2>
                <button onClick={copySummary} style={{ padding: '8px 16px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer' }}>
                    📋 Copy Summary
                </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button
                    onClick={() => setMode('A')}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: mode === 'A' ? '1px solid var(--accent-blue)' : '1px solid var(--border-light)', background: mode === 'A' ? '#3b82f6' : 'var(--bg-card)', color: mode === 'A' ? 'var(--bg-dark)' : 'var(--text-primary)', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    MODE A) MONTHLY PAYOUT
                </button>
                <button
                    onClick={() => setMode('B')}
                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: mode === 'B' ? '1px solid var(--accent-purple)' : '1px solid var(--border-light)', background: mode === 'B' ? '#8b5cf6' : 'var(--bg-card)', color: mode === 'B' ? 'var(--bg-dark)' : 'var(--text-primary)', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    MODE B) PAYOUT PER 1M
                </button>
            </div>

            <div className="app-container" style={{ padding: 0, gap: '24px', gridTemplateColumns: '1fr 1fr' }}>

                {/* INPUTS COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255, 255, 255, 0.03)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                    {mode === 'A' ? (
                        <div className="input-group">
                            <label className="input-label">Partner Monthly Payout (USD)</label>
                            <input
                                type="number"
                                value={partnerMonthlyPayout}
                                onChange={e => setPartnerMonthlyPayout(Number(e.target.value))}
                            />
                            <small style={{ color: 'var(--text-secondary)' }}>Total internal manual input (retainer + commissions)</small>
                        </div>
                    ) : (
                        <>
                            <div className="input-group">
                                <label className="input-label">Partner Payout Per 1M (USD)</label>
                                <input
                                    type="number"
                                    value={partnerPayoutPer1M}
                                    onChange={e => setPartnerPayoutPer1M(Number(e.target.value))}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Volume (USD)</label>
                                <input
                                    type="number"
                                    value={volume}
                                    onChange={e => setVolume(Number(e.target.value))}
                                />
                            </div>
                        </>
                    )}
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', fontStyle: 'italic' }}>
                        Calculate your direct cut from the partner's generated revenue. Networking finally pays off.
                    </p>
                    <div className="input-group" style={{ marginTop: '16px' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            <span>Hunter Cut Percent</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{hunterCutPercent}%</span>
                        </label>
                        <input
                            type="range"
                            min="0" max="30" step="0.5"
                            value={hunterCutPercent}
                            onChange={e => setHunterCutPercent(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#3b82f6' }}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Duration (Months)</label>
                        <input
                            type="number"
                            min="1"
                            value={durationMonths}
                            onChange={e => setDurationMonths(Number(e.target.value))}
                        />
                    </div>

                    {/* OPTIONAL TOGGLES */}
                    <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '12px' }}>
                            <input type="checkbox" checked={hasCap} onChange={e => setHasCap(e.target.checked)} />
                            <span style={{ fontSize: '0.9rem', color: hasCap ? '#f59e0b' : 'var(--text-secondary)' }}>Enable Monthly Cap</span>
                        </label>
                        {hasCap && (
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <input type="number" value={monthlyCap} onChange={e => setMonthlyCap(Number(e.target.value))} placeholder="Cap (USD)" />
                            </div>
                        )}
                    </div>

                    {mode === 'B' && (
                        <div style={{ marginTop: '8px', padding: '16px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '12px' }}>
                                <input type="checkbox" checked={hasMilestones} onChange={e => setHasMilestones(e.target.checked)} />
                                <span style={{ fontSize: '0.9rem', color: hasMilestones ? '#8b5cf6' : 'var(--text-secondary)' }}>Enable Fixed Milestones</span>
                            </label>
                            {hasMilestones && (
                                <div>
                                    {milestones.map((m, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                            <input type="number" value={m.threshold} onChange={e => {
                                                const newM = [...milestones];
                                                newM[idx].threshold = Number(e.target.value);
                                                setMilestones(newM);
                                            }} placeholder="Threshold USD" style={{ flex: 1 }} />
                                            <input type="number" value={m.bonus} onChange={e => {
                                                const newM = [...milestones];
                                                newM[idx].bonus = Number(e.target.value);
                                                setMilestones(newM);
                                            }} placeholder="Bonus USD" style={{ width: '100px' }} />
                                        </div>
                                    ))}
                                    <button onClick={() => setMilestones([...milestones, { threshold: 30000000, bonus: 500 }])} style={{ background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>+ Add Row</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* OUTPUTS COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: '#3b82f6' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>Hunter Cut</span>
                        <span className="value" style={{ color: 'var(--text-primary)' }}>{hunterCutPercent}%</span>
                    </div>

                    <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: '#10b981' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>Hunter Monthly (USD)</span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <span className="value positive">{formatCurrency(hunterMonthly)}</span>
                            {hasCap && hunterMonthly >= monthlyCap && <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 'bold' }}>(CAPPED)</span>}
                        </div>
                    </div>

                    <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: '#8b5cf6' }}>
                        <span className="label" style={{ color: 'var(--text-secondary)' }}>Hunter Total (over {durationMonths} mo)</span>
                        <span className="value" style={{ color: '#8b5cf6' }}>{formatCurrency(hunterTotal)}</span>
                    </div>

                    {mode === 'B' && activeVolume > 0 && (
                        <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                            <span className="label" style={{ color: 'var(--text-secondary)' }}>Effective Hunter Pay per 1M</span>
                            <span className="value" style={{ color: 'var(--text-primary)' }}>{formatCurrency(hunterEffectivePer1M)}</span>
                        </div>
                    )}

                    <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        <strong>Note:</strong> This panel is fully decoupled from exchange economics. Internal Partner Share (P) is entirely hidden. Outputs only reflect the defined percentage cut mapped to partner payouts.
                    </div>

                </div>

            </div>
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1rem' }}>HUNTER EARNINGS LADDER</h4>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Target Volume</th>
                                <th style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Partner Pay Pool</th>
                                <th style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Your Monthly Cut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[10, 20, 30, 50].map(volM => {
                                const theoreticalPayout = mode === 'B'
                                    ? volM * partnerPayoutPer1M
                                    : partnerMonthlyPayout * (volM / (volume / 1_000_000 || 1));
                                const theoreticalHunterEarn = theoreticalPayout * (hunterCutPercent / 100);
                                return (
                                    <tr key={volM}>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', fontWeight: 'bold' }}>{volM}M</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>{formatCurrency(theoreticalPayout)}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--accent-emerald)', fontWeight: 'bold' }}>{formatCurrency(theoreticalHunterEarn)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
