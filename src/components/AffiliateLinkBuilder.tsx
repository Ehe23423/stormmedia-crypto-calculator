import { useState } from 'react';

export function AffiliateLinkBuilder() {
    const [partnerId, setPartnerId] = useState('PARTNER_001');
    const [subId, setSubId] = useState('');

    const baseUrl = "https://exchange.com/register";
    const generatedUrl = `${baseUrl}?ref=${partnerId}${subId ? `&sub=${subId}` : ''}`;

    const copyLink = () => {
        navigator.clipboard.writeText(generatedUrl);
        alert('Copied link: ' + generatedUrl);
    };

    return (
        <div style={{ padding: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="input-group">
                    <label className="input-label">Partner ID (Ref)</label>
                    <input
                        className="glass-input"
                        value={partnerId}
                        onChange={(e) => setPartnerId(e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem' }}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Sub-ID (Optional)</label>
                    <input
                        className="glass-input"
                        value={subId}
                        onChange={(e) => setSubId(e.target.value)}
                        placeholder="e.g. campaign_winter"
                        style={{ background: 'rgba(255,255,255,0.02)', fontSize: '0.75rem' }}
                    />
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.7rem',
                    wordBreak: 'break-all',
                    border: '1px dashed var(--border-light)',
                    color: 'var(--accent-cyan)',
                    fontFamily: 'monospace'
                }}>
                    {generatedUrl}
                </div>

                <button
                    onClick={copyLink}
                    className="glass-btn"
                    style={{ width: '100%', borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' }}
                >
                    Copy Partner Link
                </button>
            </div>
        </div>
    );
}
