import type { DealResult } from '../model/DealModel';

interface Props {
    metrics: DealResult;
}

export function FinancialSnapshot({ metrics }: Props) {
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
                    color: 'var(--text-secondary)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '8px',
                    fontWeight: 700
                }}>
                    Net Monthly Profit
                </div>
                <div style={{
                    fontSize: '2.8rem', /* Was 4.8rem */
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
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px'
            }}>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.6rem' }}>Gross Fees</span>
                    <span className="value" style={{ fontSize: '1rem' }}>{formatUSD(metrics.grossFees)}</span>
                </div>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.6rem' }}>Partner Pool</span>
                    <span className="value" style={{ fontSize: '1rem', color: 'var(--accent-blue)' }}>{formatUSD(metrics.partnerPool)}</span>
                </div>
                <div className="metric-card" style={{ padding: '10px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.6rem' }}>Retained</span>
                    <span className="value" style={{ fontSize: '1rem' }}>{formatUSD(metrics.exchangeRetained)}</span>
                </div>
                <div className="metric-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                    <span className="label" style={{ fontSize: '0.65rem' }}>Margin Buffer</span>
                    <span className={`value ${metrics.isSafe ? 'positive' : 'negative'}`} style={{ fontSize: '1.2rem' }}>
                        {formatPct(metrics.marginBuffer)}
                    </span>
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
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', letterSpacing: '0.1em' }}>BREAK-EVEN VOLUME</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{formatUSD(metrics.breakEvenVolume)}</span>
            </div>
        </div>
    );
}
