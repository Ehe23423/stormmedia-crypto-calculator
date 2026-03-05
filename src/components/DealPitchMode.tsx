import type { DealParams, DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
    userRole: string;
}

export function DealPitchMode({ params, metrics, userRole }: Props) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Hunters shouldn't see sensitive internal P and F details if possible, 
    // but the user said "Hunter: see hunter panel, cannot edit partner economics".
    // So in PITCH mode, we show the results.

    return (
        <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="glass-panel" style={{ border: '1px solid var(--accent-blue)', background: 'rgba(59, 130, 246, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.8rem' }}>
                        SHADOW DEAL SCENARIO
                    </h2>
                    <span style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Target Volume: <strong style={{ color: 'var(--text-primary)' }}>{(params.V / 1_000_000).toFixed(1)}M USD</strong>
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

                    {/* VIP Savings Pitch */}
                    <div style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <h3 style={{ color: 'var(--accent-purple)', marginBottom: '16px' }}>Fee Optimization (VIP)</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
                            Standard taker fees are 0.05%. By pushing your volume through our optimized structure, you immediately unlock structural savings.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-hover)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Standard Fees (0.05%)</span>
                            <span style={{ color: '#f43f5e' }}>{formatCurrency(params.V * 0.0005)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-hover)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Optimized Fees ({params.F}%)</span>
                            <span style={{ color: 'var(--accent-emerald)' }}>{formatCurrency(params.V * (params.F / 100))}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 'bold' }}>
                            <span style={{ color: 'var(--text-primary)' }}>Client Savings</span>
                            <span style={{ color: 'var(--accent-blue)', fontSize: '1.2rem' }}>{formatCurrency((params.V * 0.0005) - (params.V * (params.F / 100)))}</span>
                        </div>
                    </div>

                    {/* Revenue Structure Pitch */}
                    <div style={{ padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '16px' }}>Revenue Framework</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>
                            Estimated potential earnings based solely on hitting the {(params.V / 1_000_000).toFixed(1)}M milestone.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-hover)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Commission Yield</span>
                            <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(params.V * (params.F / 100) * (params.P / 100))}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-hover)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Fixed Base / Retainer</span>
                            <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(params.R)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-hover)' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Performance Bonus</span>
                            <span style={{ color: 'var(--text-primary)' }}>{formatCurrency(metrics.bonusCost)}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: 'bold' }}>
                            <span style={{ color: 'var(--text-primary)' }}>Total Partner Pool</span>
                            <span style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }}>{formatCurrency((params.V * (params.F / 100) * (params.P / 100)) + params.R + metrics.bonusCost)}</span>
                        </div>
                    </div>
                </div>

                {/* Tier Targets */}
                {(params.useTiers || params.useMilestones) && (
                    <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <h3 style={{ color: 'var(--accent-pink)', marginBottom: '16px' }}>Growth Milestones & Unlock Targets</h3>

                        {params.useTiers && (
                            <div style={{ marginBottom: '16px' }}>
                                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Commission Progression</h4>
                                {params.tiers.map((t, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', marginBottom: '4px' }}>
                                        <span style={{ color: 'var(--text-primary)' }}>Reach {(t.threshold / 1_000_000).toFixed(1)}M Volume</span>
                                        <span style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>Unlock {t.s}% Sub-Split</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {params.useMilestones && (
                            <div>
                                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Retainer Tranches</h4>
                                {params.milestones.map((m, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', marginBottom: '4px' }}>
                                        <span style={{ color: 'var(--text-primary)' }}>At {(m.threshold / 1_000_000).toFixed(1)}M Volume Target</span>
                                        <span style={{ color: 'var(--accent-pink)', fontWeight: 'bold' }}>Unlock {formatCurrency(m.r)} Payment</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                CONFIDENTIAL DEAL STRUCTURE PROPOSAL {userRole === 'admin' ? '(ADMIN VIEW)' : ''} • SZYMON CRYPTO BRAIN
            </div>
        </div>
    );
}
