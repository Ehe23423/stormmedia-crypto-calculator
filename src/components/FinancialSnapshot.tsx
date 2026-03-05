import type { DealParams, DealResult } from '../model/DealModel';
import { useLanguage } from '../lib/LanguageContext';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function FinancialSnapshot({ params, metrics }: Props) {
    const { t } = useLanguage();
    const grossPer1M = (params.F / 100) * 1_000_000;
    const bonusEquivalent = grossPer1M > 0 ? (params.B / grossPer1M) * 100 : 0;
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(val));

    const formatPct = (val: number) => `${(val * 100).toFixed(1)}%`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
            {/* PRIMARY PROFIT FIGURE */}
            <div style={{
                flex: 1,
                background: 'rgba(10, 15, 25, 0.4)',
                borderRadius: '8px',
                border: `1px solid ${metrics.netProfit > 0 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
                padding: '16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: metrics.netProfit > 0 ? '0 0 20px rgba(16, 185, 129, 0.08)' : '0 0 20px rgba(239, 68, 68, 0.08)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '8px',
                    fontWeight: 800
                }}>
                    {t('metrics.netProfit')}
                </div>
                <div className="mask-sensitive" style={{
                    fontSize: '3rem', /* Was 2.8rem */
                    fontWeight: 900,
                    color: metrics.netProfit > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em'
                }}>
                    {formatUSD(metrics.netProfit)}
                </div>
            </div>

            {/* SECONDARY METRICS GRID */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '12px'
            }}>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>{t('metrics.grossFees')}</span>
                    <span className="value mask-sensitive" style={{ fontSize: '1rem' }}>{formatUSD(metrics.grossFees)}</span>
                </div>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>{t('metrics.partnerPool')}</span>
                    <span className="value mask-sensitive" style={{ fontSize: '1rem', color: 'var(--accent-blue)' }}>{formatUSD(metrics.partnerPool)}</span>
                </div>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)' }}>{t('metrics.retained')}</span>
                    <span className="value mask-sensitive" style={{ fontSize: '1rem' }}>{formatUSD(metrics.exchangeRetained)}</span>
                </div>
                <div className="metric-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="label" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>{t('metrics.marginBuffer')}</span>
                        <span className={`value ${metrics.isSafe ? 'positive' : 'negative'}`} style={{ fontSize: '1.2rem' }}>
                            {formatPct(metrics.marginBuffer)}
                        </span>
                    </div>

                    {/* Visual Comparison Bar */}
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', position: 'relative', margin: '8px 0' }}>
                        {/* Target Marker */}
                        <div style={{
                            position: 'absolute',
                            left: `${params.safetyThreshold}%`,
                            top: '-4px',
                            bottom: '-4px',
                            width: '2px',
                            background: '#fff',
                            zIndex: 2,
                            boxShadow: '0 0 5px #fff'
                        }} title={`Safety Threshold: ${params.safetyThreshold}%`} />

                        {/* Actual Fill */}
                        <div style={{
                            width: `${Math.min(100, metrics.marginBuffer * 100)}%`,
                            height: '100%',
                            background: metrics.marginBuffer * 100 >= params.safetyThreshold ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                            borderRadius: '2px',
                            transition: 'all 0.4s ease'
                        }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '6px' }}>
                        <span>{t('metrics.limit')}: {params.safetyThreshold}%</span>
                        <span style={{ color: (metrics.marginBuffer * 100) < params.safetyThreshold ? 'var(--accent-rose)' : 'inherit' }}>{t('metrics.actual')}: {(metrics.marginBuffer * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            {/* BREAK EVEN BANNER */}
            <div style={{
                padding: '12px 20px',
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.1em' }}>{t('metrics.breakEven')}</span>
                <span className="mask-sensitive" style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{formatUSD(metrics.breakEvenVolume)}</span>
            </div>

            {/* BONUS EQUIVALENT CONVERTER (Moduł 22) */}
            {params.B > 0 && (
                <div style={{ padding: '8px 20px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.1)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange)', letterSpacing: '0.1em' }}>{t('metrics.bonusEquivalent')}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 900, color: bonusEquivalent > 20 ? 'var(--accent-rose)' : 'var(--accent-orange)' }}>{bonusEquivalent.toFixed(1)}% of gross/1M</span>
                </div>
            )}
        </div>
    );
}
