import { useState } from 'react';
import type { DealResult, DealParams } from '../model/DealModel';

export interface SavedPartner {
    id: string;
    name: string;
    params: DealParams;
    metrics: DealResult;
}

interface Props {
    currentParams: DealParams;
    currentMetrics: DealResult;
}

export function PortfolioDashboard({ currentParams, currentMetrics }: Props) {
    const [partners, setPartners] = useState<SavedPartner[]>([]);
    const [partnerName, setPartnerName] = useState('');

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const handleSnapshot = () => {
        if (!partnerName.trim()) {
            alert('Please enter a partner name first.');
            return;
        }
        if (partners.length >= 10) {
            alert('Maximum of 10 partners allowed in the portfolio tracker.');
            return;
        }

        const newPartner: SavedPartner = {
            id: Date.now().toString(),
            name: partnerName.trim(),
            params: { ...currentParams },
            metrics: { ...currentMetrics }
        };

        setPartners([...partners, newPartner]);
        setPartnerName('');
    };

    const removePartner = (id: string) => {
        setPartners(partners.filter(p => p.id !== id));
    };

    const totalRetained = partners.reduce((sum, p) => sum + p.metrics.grossRetained, 0);
    const totalBonusCost = partners.reduce((sum, p) => sum + p.metrics.bonusCost, 0);
    const totalBaseRetainer = partners.reduce((sum, p) => sum + p.params.R, 0);
    const totalNet = partners.reduce((sum, p) => sum + p.metrics.net, 0);

    // Multi-partner Alerts
    const hasDangerMargin = partners.some(p => p.metrics.net < 500);
    const totalCostOfCommitments = totalBonusCost + totalBaseRetainer;

    return (
        <div className="glass-panel" style={{ marginTop: '24px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💼 MULTI-PARTNER PORTFOLIO BUDGET
            </h3>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Enter Partner Name..."
                    value={partnerName}
                    onChange={e => setPartnerName(e.target.value)}
                    style={{ flex: 1, padding: '12px', background: 'var(--bg-dark)', border: '1px solid var(--border-hover)', color: '#fff', borderRadius: '8px' }}
                />
                <button
                    onClick={handleSnapshot}
                    style={{ padding: '0 24px', background: 'var(--accent-purple)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Snapshot Deal ➔ Portfolio
                </button>
            </div>

            {hasDangerMargin && (
                <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid #f43f5e', borderRadius: '8px', marginBottom: '24px', color: '#f43f5e', fontSize: '0.9rem' }}>
                    ⚠️ <strong>PORTFOLIO ALERT:</strong> One or more partners in your portfolio are operating with a dangerously low margin buffer (&lt; $500). Review their structures.
                </div>
            )}

            {partners.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Partner</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Volume</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Retainer/Base</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Bonus Cap</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Net Yield</th>
                                    <th style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners.map((p) => (
                                    <tr key={p.id}>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', fontWeight: 'bold' }}>{p.name}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)' }}>{(p.params.V / 1_000_000).toFixed(1)}M</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)' }}>{formatCurrency(p.params.R)}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: 'var(--accent-pink)' }}>{formatCurrency(p.metrics.bonusCost)}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)', color: p.metrics.net >= 0 ? 'var(--accent-emerald)' : '#f43f5e' }}>{formatCurrency(p.metrics.net)}</td>
                                        <td style={{ padding: '12px 8px', borderBottom: '1px solid var(--border-light)' }}>
                                            <button onClick={() => removePartner(p.id)} style={{ padding: '4px 8px', background: 'transparent', border: '1px solid #f43f5e', color: '#f43f5e', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '24px', padding: '24px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-hover)' }}>
                        <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>PORTFOLIO AGGREGATE METRICS</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Gross Retained</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{formatCurrency(totalRetained)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Committed Fixed Baseline</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-pink)' }}>{formatCurrency(totalBaseRetainer)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Committed Bonuses</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-pink)' }}>{formatCurrency(totalBonusCost)}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>PORTFOLIO TRUE NET</div>
                                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: totalNet >= 0 ? 'var(--accent-emerald)' : '#f43f5e' }}>{formatCurrency(totalNet)}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            * Total budget committed to partners: {formatCurrency(totalCostOfCommitments)} ({(totalRetained > 0 ? (totalCostOfCommitments / totalRetained * 100).toFixed(1) : 0)}% of pooled retention).
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)', border: '1px dashed var(--border-light)', borderRadius: '12px' }}>
                    No partners in portfolio yet. Stage a deal in the calculator and snapshot it to begin tracking your BD budget.
                </div>
            )}
        </div>
    );
}
