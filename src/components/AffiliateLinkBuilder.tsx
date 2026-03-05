import { useState } from 'react';
import '../index.css';

export function AffiliateLinkBuilder() {
    const [campaignName, setCampaignName] = useState('summer_promo_2026');
    const [source, setSource] = useState('telegram');
    const [community, setCommunity] = useState('CryptoAlphas');
    const [influencer, setInfluencer] = useState('JohnDoe');

    const generateURL = () => {
        const baseUrl = "https://exchange.com/register";
        const params = new URLSearchParams({
            ref: 'partnerID',
            utm_source: source,
            utm_campaign: campaignName,
            utm_content: community,
            utm_term: influencer
        });
        return `${baseUrl}?${params.toString()}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🔗</span> Affiliate Link Builder
                    </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Generate granular tracking links for exact BD attribution across campaigns and influencers.
                </p>

                <div className="variables-grid" style={{ marginBottom: '24px' }}>
                    <div className="input-group">
                        <label className="input-label">Campaign Name (utm_campaign)</label>
                        <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Traffic Source (utm_source)</label>
                        <select value={source} onChange={e => setSource(e.target.value)}>
                            <option>telegram</option>
                            <option>youtube</option>
                            <option>twitter</option>
                            <option>discord</option>
                            <option>newsletter</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Community / Group (utm_content)</label>
                        <input type="text" value={community} onChange={e => setCommunity(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Influencer / KOL (utm_term)</label>
                        <input type="text" value={influencer} onChange={e => setInfluencer(e.target.value)} />
                    </div>
                </div>

                <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Generated Tracking Link</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--accent-blue)', fontSize: '0.9rem', wordBreak: 'break-all', marginBottom: '16px', background: 'var(--bg-dark)', padding: '12px', borderRadius: '4px' }}>
                        {generateURL()}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { navigator.clipboard.writeText(generateURL()); alert('✅ Link Copied to clipboard!'); }} style={{ flex: 1, padding: '10px', background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>📋 Copy Tracking URL</button>
                        <button style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>💾 Save & Log to CRM</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
