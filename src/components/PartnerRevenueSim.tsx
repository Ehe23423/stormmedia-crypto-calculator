import type { DealParams, DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function PartnerRevenueSim({ params, metrics }: Props) {
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%', alignItems: 'center' }}>
            <div className="metric-box">
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Partner Revenue</label>
                <div className="mask-sensitive" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{formatUSD(metrics.partnerPool)}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{params.V > 0 ? (metrics.partnerPool / (params.V / 1000000)).toFixed(1) : '0'} USD per 1M Vol</div>
            </div>

            <div className="metric-box">
                <label style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Sub-Split Revenue</label>
                <div className="mask-sensitive" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-cyan)' }}>{formatUSD(metrics.subRevenue)}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{params.S}% of Partner Pool</div>
            </div>

            <div style={{ gridColumn: 'span 2', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                    <span>Total Fixed Retainer</span>
                    <span style={{ fontWeight: 'bold' }}>{formatUSD(params.R)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span>Effective Payout Share</span>
                    <span style={{ fontWeight: 'bold' }}>{params.P}%</span>
                </div>
            </div>
        </div>
    );
}
