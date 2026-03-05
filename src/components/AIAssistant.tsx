import { useState } from 'react';


export function AIAssistant() {
    const [communityType, setCommunityType] = useState('Telegram Signals');
    const [members, setMembers] = useState(12000);
    const [expectedVol, setExpectedVol] = useState(8); // in millions

    const [negotiationInput, setNegotiationInput] = useState('');

    const generateStructure = () => {
        let text = "Recommended Deal Structure:\n\n";

        // Adjust expectedVol for calculations if it's in millions
        const actualExpectedVol = expectedVol * 1_000_000;

        if (actualExpectedVol < 5_000_000) {
            text += "• Type: Flat Revenue Share\n";
            text += "• Retainer: $0\n";
            text += "• Revenue Share: 40%\n";
            text += "• Note: Volume too low for fixed risk.\n";
        } else if (actualExpectedVol >= 5_000_000 && actualExpectedVol < 20_000_000) {
            text += "• Type: Hybrid\n";
            text += `• Retainer: $${Math.floor(actualExpectedVol / 5_000_000) * 500}\n`;
            text += "• Revenue Share: 45%\n";
            text += `• Performance unlock above ${(actualExpectedVol * 1.5 / 1_000_000).toFixed(0)}M\n`;
        } else {
            text += "• Type: Aggressive Tiered\n";
            text += `• Retainer: $${Math.floor(actualExpectedVol / 10_000_000) * 1000}\n`;
            text += "• Revenue Share: 50%\n";
            text += `• Bonus: $200 per 1M over ${(actualExpectedVol / 1_000_000).toFixed(0)}M\n`;
        }

        return text;
    };

    const generateCounterOffer = () => {
        if (negotiationInput.includes('60%') && negotiationInput.includes('3000')) {
            return "Suggested counter:\n\n• 45% revenue share\n• $1500 retainer\n• Performance unlock above 10M\n\n(Never give 60% on day 1 with a high retainer)";
        }
        return "Suggested counter:\n\n• Drop the requested share by 10%\n• Halve the retainer, convert it to a 30-day milestone\n• Add a volume requirement before unlocking full payouts.";
    };

    const generateTelegramPitch = () => {
        const actualExpectedVol = expectedVol * 1_000_000;
        return `Hey! We reviewed your community structure (${members} members).\n\nWe propose a hybrid structure with performance incentives. We can start with a base 45% cut, providing a $${Math.floor(actualExpectedVol / 5_000_000) * 500 || 200} retainer that unlocks upon hitting ${(actualExpectedVol / 1_000_000 * 0.8).toFixed(1)}M verifiable volume. Let's grow this together.`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel">
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span>🤖</span> BD AI Assistant
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Your virtual BD Director. Generate mathematically proven deal structures, counter-offers, and instant pitches.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                    {/* Deal Structure Generator */}
                    <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ color: 'var(--accent-blue)', margin: '0 0 16px 0', fontSize: '1rem' }}>Deal Structure Generator</h4>
                        <div className="variables-grid" style={{ gridTemplateColumns: '1fr', gap: '8px' }}>
                            <div className="input-group">
                                <label className="input-label">Community Type</label>
                                <select value={communityType} onChange={e => setCommunityType(e.target.value)}>
                                    <option value="Telegram Signals">Telegram Signals</option>
                                    <option value="Discord Alpha Group">Discord Alpha Group</option>
                                    <option value="Twitter KOL">Twitter KOL</option>
                                    <option value="YouTube Streamer">YouTube Streamer</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label">Members</label>
                                <input type="number" value={members} onChange={e => setMembers(Number(e.target.value))} />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Expected Monthly Volume (in millions)</label>
                                <input type="number" value={expectedVol} onChange={e => setExpectedVol(Number(e.target.value))} />
                            </div>
                        </div>

                        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-blue)', whiteSpace: 'pre-line', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                            {generateStructure()}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Negotiation Assistant */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)', flex: 1 }}>
                            <h4 style={{ color: 'var(--accent-pink)', margin: '0 0 16px 0', fontSize: '1rem' }}>Negotiation Assistant</h4>
                            <div className="input-group">
                                <label className="input-label">Partner Demands</label>
                                <input type="text" value={negotiationInput} onChange={e => setNegotiationInput(e.target.value)} />
                            </div>
                            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-pink)', whiteSpace: 'pre-line', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                {generateCounterOffer()}
                            </div>
                        </div>

                        {/* Instant Offer */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <h4 style={{ color: 'var(--accent-emerald)', margin: '0 0 16px 0', fontSize: '1rem' }}>Instant Offer Pitch (Telegram)</h4>
                            <div style={{ padding: '12px', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-light)', whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, position: 'relative' }}>
                                {generateTelegramPitch()}
                                <button onClick={() => { navigator.clipboard.writeText(generateTelegramPitch()); alert('✅ Pitch copied!'); }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--accent-emerald)', color: '#000', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold' }}>📋 Copy</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
