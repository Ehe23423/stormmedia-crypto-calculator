import { useState } from 'react';

export function ActivationBuilder() {
    const [activationType, setActivationType] = useState('Trading Tournament');
    const [budget, setBudget] = useState<number>(5000);
    const [duration, setDuration] = useState('14 Days');
    const [targetVol, setTargetVol] = useState<number>(10);

    const generatePlan = () => {
        let plan = '';
        if (activationType === 'Trading Tournament') {
            plan = `🏆 **ACTIVATION: BATTLE ROYALE TOURNAMENT**
Duration: ${duration}
Budget Allocated: $${budget.toLocaleString()}
Target Volume Lift: ${targetVol}M USD

**Prize Pool Breakdown:**
- 1st Place: $${(budget * 0.4).toLocaleString()} (40%)
- 2nd Place: $${(budget * 0.2).toLocaleString()} (20%)
- 3rd Place: $${(budget * 0.1).toLocaleString()} (10%)
- Rank 4-10: Shared $${(budget * 0.3).toLocaleString()} (30%)

**Marketing Requirements:**
- 3 Dedicated YouTube Videos outlining the rules
- Daily Telegram Leaderboard updates
- "Sign up to participate" mandatory link gate`;
        } else if (activationType === 'Leaderboard Competition') {
            plan = `📈 **ACTIVATION: VOLUME SPRINT LEADERBOARD**
Duration: ${duration}
Budget Allocated: $${budget.toLocaleString()}
Target Volume Lift: ${targetVol}M USD

**Structure:**
- Top 10 traders by pure volume share the pool.
- Minimum volume threshold to qualify: 100k USD.
- Drops $${(budget / 10).toLocaleString()} airdrops to random active traders daily to keep engagement high.

**Partner Obligation:**
- Pin leaderboard link in main Telegram.
- Mention competition status daily.`;
        } else {
            plan = `🧠 **ACTIVATION: STRATEGY & COMMUNITY EVENT**
Duration: ${duration}
Budget Allocated: $${budget.toLocaleString()}
Target Volume Lift: ${targetVol}M USD

**Structure:**
- Fund community giveaways during live AMAs and trading sessions.
- $${(budget * 0.5).toLocaleString()} allocated to deposit bonuses for new signups.
- $${(budget * 0.5).toLocaleString()} allocated to raffle draw for active traders.`;
        }
        return plan;
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🎪</span> ACTIVATION BUILDER
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', fontStyle: 'italic' }}>
                Plan and structure community growth initiatives to milk maximum volume from the partnership.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Campaign Type</label>
                    <select
                        value={activationType}
                        onChange={e => setActivationType(e.target.value)}
                        style={{ padding: '12px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                    >
                        <option value="Trading Tournament">Trading Tournament</option>
                        <option value="Leaderboard Competition">Leaderboard Sprint</option>
                        <option value="Community Event">Community Event / AMAs</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Budget Pool (USD)</label>
                    <input
                        type="number"
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                        style={{ padding: '12px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Target Lift (M)</label>
                    <input
                        type="number"
                        value={targetVol}
                        onChange={e => setTargetVol(Number(e.target.value))}
                        style={{ padding: '12px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Duration</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        style={{ padding: '12px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                    />
                </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1rem' }}>Generated Activation Plan</h4>
                <pre style={{
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    background: 'var(--bg-dark)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-hover)'
                }}>
                    {generatePlan()}
                </pre>
                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <button
                        onClick={() => navigator.clipboard.writeText(generatePlan())}
                        style={{ padding: '8px 16px', background: 'var(--accent-emerald)', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        </div>
    );
}
