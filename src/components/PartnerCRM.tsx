import { useState } from 'react';
import '../index.css';

interface Lead {
    id: number;
    name: string;
    type: string;
    volume: string;
    status: 'Active' | 'Negotiating' | 'Dead';
    contact: string;
    deal: string;
}

export function PartnerCRM() {
    const [leads] = useState<Lead[]>([
        { id: 1, name: 'AlphaSignals', type: 'Telegram', volume: '18.2M', status: 'Active', contact: 'Today', deal: 'Hybrid (45% + 2k)' },
        { id: 2, name: 'CryptoDesk', type: 'Twitter', volume: '12.4M', status: 'Active', contact: '2 days ago', deal: 'RevShare (50%)' },
        { id: 3, name: 'WhaleSniper', type: 'Discord', volume: '45.0M', status: 'Negotiating', contact: '1 hour ago', deal: 'VIP Tier 3' },
        { id: 4, name: 'DeFi Degen', type: 'YouTube', volume: '2.1M', status: 'Dead', contact: '1 week ago', deal: 'Requested 70%' },
    ]);

    const getStatusColor = (status: string) => {
        if (status === 'Active') return 'var(--accent-emerald)';
        if (status === 'Negotiating') return 'var(--accent-amber)';
        return 'var(--accent-rose)';
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>💼</span> Partner CRM & Global Pipeline
                    </h3>
                    <button style={{ padding: '6px 16px', background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>+ Add Lead</button>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Track your business development pipeline. Move leads from negotiation to active status.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Pipeline Volume</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>77.7M</div>
                    </div>
                    <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--accent-emerald)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>Active Partners</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>2</div>
                    </div>
                    <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid var(--accent-amber)', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-amber)' }}>In Negotiation</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-amber)' }}>1</div>
                    </div>
                </div>

                {/* CRM Table */}
                <div style={{ overflowX: 'auto', background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Partner Name</th>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Type</th>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Est. Volume</th>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Last Contact</th>
                                <th style={{ padding: '12px 16px', fontWeight: 500 }}>Structure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map(lead => (
                                <tr key={lead.id} style={{ borderTop: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 500 }}>{lead.name}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{lead.type}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{lead.volume}</td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', background: `color-mix(in srgb, ${getStatusColor(lead.status)} 15%, transparent)`, color: getStatusColor(lead.status) }}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{lead.contact}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{lead.deal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Ranking Leaderboard */}
                <div style={{ marginTop: '24px' }}>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px' }}>Top Earnings Leaderboard</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-amber)' }}>1</div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>AlphaSignals</div>
                                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>$18,200 / mo</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-secondary)' }}>2</div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>CryptoDesk</div>
                                <div style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>$12,400 / mo</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
