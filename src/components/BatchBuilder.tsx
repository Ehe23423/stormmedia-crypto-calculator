import { useState } from 'react';

interface AgencyPartner {
    id: string;
    name: string;
    type: 'Signal' | 'Whale' | 'Streamer' | 'Spot Desk';
    estVolumeM: number;
}

export function BatchBuilder() {
    const [partners, setPartners] = useState<AgencyPartner[]>([]);
    const [name, setName] = useState('');
    const [type, setType] = useState<'Signal' | 'Whale' | 'Streamer' | 'Spot Desk'>('Signal');
    const [vol, setVol] = useState<number>(5);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const addPartner = () => {
        if (!name) return;
        setPartners([...partners, { id: Date.now().toString(), name, type, estVolumeM: vol }]);
        setName('');
    };

    const determineExpectedRevenue = (p: AgencyPartner) => {
        // Simplified dummy math for agency view based on templates
        if (p.type === 'Spot Desk') return p.estVolumeM * 200; // 0.02% yield logic roughly
        if (p.type === 'Whale') return p.estVolumeM * 100;
        if (p.type === 'Streamer') return p.estVolumeM * 350;
        return p.estVolumeM * 500; // Signal default
    };

    const totalVolume = partners.reduce((sum, p) => sum + p.estVolumeM, 0);
    const totalAgencyExpectedRev = partners.reduce((sum, p) => sum + determineExpectedRevenue(p), 0);

    const exportCSV = () => {
        const headers = ['Partner Name,Partner Type,Estimated Vol (M),Expected Monthly Rev USD\n'];
        const rows = partners.map(p => `${p.name},${p.type},${p.estVolumeM},${determineExpectedRevenue(p)}`);
        const csvContent = headers.concat(rows).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'agency_batch_deal_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🏭</span> BATCH BUILDER (AGENCY MODE)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px', fontStyle: 'italic' }}>
                Paste and assign templates to manage massive affiliate networks. Congratulations. You now run a small trading empire.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '12px', marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Partner / Community Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                />
                <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    style={{ padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                >
                    <option value="Signal">Signal Group</option>
                    <option value="Streamer">Streamer Hybrid</option>
                    <option value="Whale">Whale Trader</option>
                    <option value="Spot Desk">Spot VIP Desk</option>
                </select>
                <div style={{ position: 'relative' }}>
                    <input
                        type="number"
                        placeholder="Vol (M)"
                        value={vol}
                        onChange={e => setVol(Number(e.target.value))}
                        style={{ padding: '12px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                    />
                </div>
                <button
                    onClick={addPartner}
                    style={{ padding: '0 24px', background: 'var(--accent-purple)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Add to Roster
                </button>
            </div>

            {partners.length > 0 && (
                <>
                    <div className="table-responsive" style={{ marginBottom: '24px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Partner</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Assigned Template</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Est Volume</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Expected Network Yield</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners.map((p) => (
                                    <tr key={p.id}>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', fontWeight: 'bold' }}>{p.name}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)' }}>
                                            <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.8rem' }}>{p.type}</span>
                                        </td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>{p.estVolumeM}M</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--accent-emerald)', fontWeight: 'bold' }}>{formatCurrency(determineExpectedRevenue(p))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px dashed var(--border-hover)' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Agency Volume: <strong>{totalVolume}M</strong></div>
                            <div style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Total Empire Yield: <strong style={{ color: 'var(--accent-emerald)' }}>{formatCurrency(totalAgencyExpectedRev)}</strong></div>
                        </div>
                        <button
                            onClick={exportCSV}
                            style={{ padding: '10px 20px', background: 'transparent', color: '#fff', border: '1px solid var(--border-light)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                            Download CSV
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
