import { useState } from 'react';
import '../index.css';

export function IntelligenceScout() {
    const [communitySize, setCommunitySize] = useState(15000);
    const [engagement, setEngagement] = useState(12);
    const [region, setRegion] = useState('Europe');
    const [churnRisk, setChurnRisk] = useState('Low');

    const calculateHealthScore = () => {
        let score = 50;

        // Size vector
        if (communitySize > 50000) score += 20;
        else if (communitySize > 10000) score += 10;
        else score += 5;

        // Engagement vector
        if (engagement > 15) score += 25;
        else if (engagement > 5) score += 15;
        else score -= 10;

        // Region Vector
        if (['USA', 'UK', 'China', 'Singapore', 'Canada'].includes(region)) score -= 40;
        else if (['Europe', 'LatAm', 'Asia'].includes(region)) score += 15;

        // Churn vector
        if (churnRisk === 'Low') score += 10;
        else if (churnRisk === 'High') score -= 15;

        return Math.min(100, Math.max(0, score));
    };

    const score = calculateHealthScore();

    let scoreColor = 'var(--accent-emerald)';
    if (score < 40) scoreColor = 'var(--accent-rose)';
    else if (score < 70) scoreColor = 'var(--accent-amber)';

    let trafficRisk = 'Low';
    if (['USA', 'UK', 'China', 'Singapore', 'Canada'].includes(region)) trafficRisk = 'Critical (Restricted)';
    else if (churnRisk === 'High') trafficRisk = 'High';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🕵️</span> Intelligence Scout
                    </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Calculate the Partner Potential Score analyzing audience size, engagement, and geopolitical compliance risk.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

                    {/* INPUTS */}
                    <div className="variables-grid" style={{ gridTemplateColumns: '1fr', gap: '8px', alignContent: 'start' }}>
                        <div className="input-group">
                            <label className="input-label">Community Size</label>
                            <input type="number" value={communitySize} onChange={e => setCommunitySize(Number(e.target.value))} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Avg Engagement (%)</label>
                            <input type="number" value={engagement} onChange={e => setEngagement(Number(e.target.value))} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Primary Region</label>
                            <select value={region} onChange={e => setRegion(e.target.value)}>
                                <option>Europe</option>
                                <option>LatAm</option>
                                <option>Asia</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>Canada</option>
                                <option>China</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Perceived Churn Risk</label>
                            <select value={churnRisk} onChange={e => setChurnRisk(e.target.value)}>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                    </div>

                    {/* SCORE OUTPUTS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: `1px solid ${scoreColor}`, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '150px', background: `linear-gradient(90deg, transparent, ${scoreColor})`, opacity: 0.1 }}></div>

                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Partner Potential Score</div>
                                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                                    {score} <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/ 100</span>
                                </div>
                            </div>

                            <div style={{ flex: 1, borderLeft: '1px solid var(--border-light)', paddingLeft: '24px' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Conversion Potential:</span>
                                    <strong style={{ color: score > 60 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>{score > 80 ? 'EXCEPTIONAL' : score > 60 ? 'HIGH' : score > 40 ? 'MEDIUM' : 'POOR'}</strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Traffic & Compliance Risk:</span>
                                    <strong style={{ color: trafficRisk === 'Low' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>{trafficRisk}</strong>
                                </div>
                            </div>
                        </div>

                        {trafficRisk.includes('Restricted') && (
                            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid var(--accent-rose)', borderRadius: '8px', color: 'var(--accent-rose)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>🛑</span> This partner operates in a restricted jurisdiction. Do not proceed to onboarding.
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
