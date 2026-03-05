import { useState } from 'react';
import '../index.css';

export function StreamerMode() {
    const [viewerConversion, setViewerConversion] = useState('Medium');
    const [basePayout] = useState(40); // 40%

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-pink)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🎥</span> Streamer Mode (Simplified Payouts)
                    </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    A dedicated layout optimized for Twitch/YouTube influencers showing raw volume-to-cash payouts instantly.
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
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 600 }}>$2M Volume</div>
                            <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 800 }}>→ {formatCurrency(basePayout * 1.2)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid var(--border-light)', background: 'rgba(236, 72, 153, 0.05)' }}>
                            <div style={{ fontSize: '1.4rem', color: 'var(--accent-pink)', fontWeight: 600 }}>$5M Volume</div>
                            <div style={{ fontSize: '1.4rem', color: 'var(--accent-pink)', fontWeight: 800 }}>→ {formatCurrency(basePayout * 3)}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px', background: 'rgba(236, 72, 153, 0.1)' }}>
                            <div style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 900 }}>$10M Volume</div>
                            <div style={{ fontSize: '1.8rem', color: 'var(--accent-emerald)', fontWeight: 900 }}>→ {formatCurrency(basePayout * 6)}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
