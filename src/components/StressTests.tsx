import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    baseParams: DealParams;
}

export function StressTests({ baseParams }: Props) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Fee Compression Test
    const feeVals = [0.035, 0.030, 0.028];

    // Bear Market Stress (Volume -40%, Fee 0.028%)
    const bearMarketParams: DealParams = {
        ...baseParams,
        V: baseParams.V * 0.60,
        F: 0.028
    };

    const bearMetrics = calculateDealMetrics(bearMarketParams);

    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>STRESS TESTS</h3>

            <h4 style={{ marginBottom: '12px', color: '#3b82f6' }}>Fee Compression Resilience</h4>
            <div className="metric-grid" style={{ marginBottom: '32px' }}>
                {feeVals.map(f => {
                    const m = calculateDealMetrics({ ...baseParams, F: f });
                    return (
                        <div key={f} className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                            <div className="label">F = {f}%</div>
                            <div style={{ marginTop: '8px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                Retained: {formatCurrency(m.retainedPer1M)} / 1M
                            </div>
                            <div style={{ marginTop: '4px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                                Net: <span className={m.net > 0 ? 'positive' : 'negative'}>{formatCurrency(m.net)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <h4 style={{ marginBottom: '12px', color: '#f43f5e' }}>Bear Market Scenario (-40% Vol, 0.028% Fee)</h4>
            <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'rgba(255, 255, 255, 0.05)' }}>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="label">Simulated Volume:</span>
                    <strong>{formatCurrency(bearMarketParams.V).replace('$', '')}</strong>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="label">New Net Revenue:</span>
                    <strong className={bearMetrics.net > 0 ? 'positive' : 'negative'}>{formatCurrency(bearMetrics.net)}</strong>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="label">Sustainability Status:</span>
                    <strong className={bearMetrics.isSustainable ? 'positive' : 'negative'}>
                        {bearMetrics.isSustainable ? '✅ SURVIVED' : '❌ CRASHED (Net ≤ 0)'}
                    </strong>
                </p>
            </div>
        </div>
    );
}
