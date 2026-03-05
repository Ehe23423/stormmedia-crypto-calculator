import type { DealParams } from '../model/DealModel';

interface Props {
    applyParams: (newParams: Partial<DealParams>) => void;
}

export function DealTemplates({ applyParams }: Props) {

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>📑</span> BD DEAL TEMPLATES
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', fontStyle: 'italic' }}>
                Quickly load standard partnership frameworks. These structures scale nicely. Assuming the traders actually trade.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>

                {/* SIGNAL GROUP */}
                <div className="glass-panel template-card" style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--border-light)', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onClick={() => applyParams({ V: 2_000_000, F: 0.0005, P: 0.45, R: 200, S: 0, useTiers: false, useMilestones: false })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px', fontSize: '1rem', fontWeight: 500, fontFamily: 'var(--font-main)' }}>Signal Group (Small)</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>Standard intro deal for telegram signal groups.</p>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-primary)', paddingLeft: '20px', margin: 0 }}>
                        <li style={{ marginBottom: '4px' }}>2M Monthly Vol</li>
                        <li style={{ marginBottom: '4px' }}>0.05% Fee Level ($1k total)</li>
                        <li style={{ marginBottom: '4px' }}>45% Commission</li>
                        <li style={{ marginBottom: '4px' }}>$200 Incentive Layer</li>
                    </ul>
                    <div style={{ marginTop: '12px', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.9rem' }}>
                        Est. Revenue: ~$650 /mo
                    </div>
                </div>

                {/* MID SIZE COMMUNITY */}
                <div className="glass-panel template-card" style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.05)', border: '1px solid var(--border-light)', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onClick={() => applyParams({ V: 10_000_000, F: 0.0005, P: 0.55, R: 1000, S: 0, useTiers: false, useMilestones: false })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h4 style={{ color: 'var(--accent-purple)', marginBottom: '8px' }}>Mid Size Community</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Mature communities with solid trading floors.</p>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-primary)', paddingLeft: '20px', margin: 0 }}>
                        <li>10M Monthly Vol</li>
                        <li>0.05% Fee Level ($5k total)</li>
                        <li>55% Commission</li>
                        <li>~$1k Incentive Layer</li>
                        <li style={{ color: 'var(--accent-emerald)', marginTop: '4px', fontWeight: 'bold', listStyle: 'none', marginLeft: '-20px' }}>Est. Revenue: ~$3,750 /mo</li>
                    </ul>
                </div>

                {/* WHALE TRADER */}
                <div className="glass-panel template-card" style={{ padding: '16px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid var(--border-light)', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onClick={() => applyParams({ V: 50_000_000, F: 0.00028, P: 0, R: 0, S: 0, useTiers: false, useMilestones: false })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h4 style={{ color: 'var(--accent-pink)', marginBottom: '8px' }}>Whale Futures Trader</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Zero commission, pure fee tier optimization savings.</p>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-primary)', paddingLeft: '20px', margin: 0 }}>
                        <li>50M+ Monthly Vol</li>
                        <li>Regular fee: 0.05% ($25k)</li>
                        <li>Optimized VIP: 0.028% ($14k)</li>
                        <li style={{ color: 'var(--accent-emerald)', marginTop: '4px', fontWeight: 'bold', listStyle: 'none', marginLeft: '-20px' }}>Direct Savings: $11,000 /mo</li>
                    </ul>
                </div>

                {/* SPOT DESK */}
                <div style={{ padding: '20px', background: 'rgba(234, 179, 8, 0.05)', border: '1px solid #eab308', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onClick={() => applyParams({ V: 100_000_000, F: 0.0002, P: 0, R: 0, S: 0, useTiers: false, useMilestones: false })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h4 style={{ color: '#eab308', marginBottom: '8px' }}>Spot Desk (VIP Savings)</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>High volume spot trading API pitch.</p>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-primary)', paddingLeft: '20px', margin: 0 }}>
                        <li>100M Monthly Spot Vol</li>
                        <li>Regular fee: 0.10% ($100k)</li>
                        <li>Optimized VIP: 0.020% ($20k)</li>
                        <li style={{ color: 'var(--accent-emerald)', marginTop: '4px', fontWeight: 'bold', listStyle: 'none', marginLeft: '-20px' }}>Direct Savings: $80,000 /mo</li>
                    </ul>
                </div>

                {/* STREAMER INFLUENCER */}
                <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--accent-emerald)', borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onClick={() => applyParams({
                        V: 20_000_000, F: 0.00035, P: 0.40, R: 0, S: 0,
                        useTiers: true, tiers: [{ threshold: 20_000_000, s: 0.5 }],
                        useMilestones: true, milestones: [{ threshold: 10_000_000, r: 1000 }, { threshold: 20_000_000, r: 1000 }]
                    })}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                    <h4 style={{ color: 'var(--accent-emerald)', marginBottom: '8px' }}>Streamer / Influencer</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>Hybrid structure with growth incentives.</p>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-primary)', paddingLeft: '20px', margin: 0 }}>
                        <li>Tier Unlocks above thresholds</li>
                        <li>Milestone-Based Retainer</li>
                        <li>Performance Caps Enabled</li>
                        <li style={{ color: 'var(--accent-pink)', marginTop: '4px', fontWeight: 'bold', listStyle: 'none', marginLeft: '-20px' }}>Secure Growth Structure</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
