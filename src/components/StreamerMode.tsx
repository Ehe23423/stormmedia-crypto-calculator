import { useState } from 'react';
import '../index.css';

export function StreamerMode() {
    const [viewerConversion, setViewerConversion] = useState('Medium (General Crypto)');

    const FEE = 0.00035; // 0.035% blended
    const SHARE = 0.40;  // 40% partner split

    const qualityMap: Record<string, number> = {
        'Low (DeFi/Airdrop)': 0.4,
        'Medium (General Crypto)': 1.0,
        'High (Trading Focused)': 1.8,
    };

    const q = qualityMap[viewerConversion] ?? 1.0;
    const calcPay = (volM: number) => volM * 1_000_000 * FEE * SHARE * q;
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const tiers = [
        { label: '$2M Volume', vol: 2 },
        { label: '$5M Volume', vol: 5 },
        { label: '$10M Volume', vol: 10 },
        { label: '$20M Volume', vol: 20 },
        { label: '$50M Volume', vol: 50 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-pink)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🎥</span> Streamer Mode (Simplified Payouts)
                    </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    A dedicated layout for streamers/influencers — showing exact volume-to-cash estimates. Uses 0.035% fee × 40% partner share baseline.
                </p>

                <div className="variables-grid" style={{ marginBottom: '24px' }}>
                    <div className="input-group">
                        <label className="input-label">Audience Quality / Conversion</label>
                        <select value={viewerConversion} onChange={(e) => setViewerConversion(e.target.value)}>
                            <option>Low (DeFi/Airdrop)</option>
                            <option>Medium (General Crypto)</option>
                            <option>High (Trading Focused)</option>
                        </select>
                    </div>
                </div>

                <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ margin: 0, color: 'var(--accent-pink)', fontSize: '1rem' }}>If your audience trades...</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Quality multiplier: {q}x ({viewerConversion})</div>
                    </div>
                    <div>
                        {tiers.map((t, i) => {
                            const pay = calcPay(t.vol);
                            const isFeatured = i === 2;
                            return (
                                <div key={t.vol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isFeatured ? '20px 24px' : '14px 24px', borderBottom: '1px solid var(--border-light)', background: isFeatured ? 'rgba(244, 114, 182, 0.08)' : 'transparent' }}>
                                    <div style={{ fontSize: isFeatured ? '1.5rem' : '1.1rem', color: isFeatured ? 'var(--accent-pink)' : 'var(--text-secondary)', fontWeight: 600 }}>{t.label}</div>
                                    <div style={{ fontSize: isFeatured ? '1.5rem' : '1.1rem', color: isFeatured ? 'var(--accent-emerald)' : 'var(--text-primary)', fontWeight: 800 }}>→ {formatCurrency(pay)}<span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>/mo</span></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

