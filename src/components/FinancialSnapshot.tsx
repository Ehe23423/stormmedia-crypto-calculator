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
            <div style={{
                flex: 1,
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                border: `2px solid ${metrics.netProfit > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
                padding: '24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Net Monthly Profit</div>
                <div style={{
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    color: metrics.netProfit > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    lineHeight: 1
                }}>
                    {formatUSD(metrics.netProfit)}
                </div>
            </div>

            <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: 0 }}>
                <div className="metric-card" style={{ padding: '16px' }}>
                    <span className="label">Gross Fees</span>
                    <span className="value" style={{ fontSize: '1.4rem' }}>{formatUSD(metrics.grossFees)}</span>
                </div>
                <div className="metric-card" style={{ padding: '16px' }}>
                    <span className="label">Partner Pool</span>
                    <span className="value" style={{ fontSize: '1.4rem', color: 'var(--accent-blue)' }}>{formatUSD(metrics.partnerPool)}</span>
                </div>
                <div className="metric-card" style={{ padding: '16px' }}>
                    <span className="label">Retained</span>
                    <span className="value" style={{ fontSize: '1.4rem' }}>{formatUSD(metrics.exchangeRetained)}</span>
                </div>
                <div className="metric-card" style={{ padding: '16px' }}>
                    <span className="label">Margin Buffer</span>
                    <span className={`value ${metrics.isSafe ? 'positive' : 'negative'}`} style={{ fontSize: '1.4rem' }}>
                        {formatPct(metrics.marginBuffer)}
                    </span>
                </div>
                <div className="metric-card" style={{ gridColumn: 'span 2', padding: '16px' }}>
                    <span className="label">Break-even Volume</span>
                    <span className="value" style={{ fontSize: '1.4rem' }}>{formatUSD(metrics.breakEvenVolume)}</span>
                </div>
            </div>
        </div>
    );
}
