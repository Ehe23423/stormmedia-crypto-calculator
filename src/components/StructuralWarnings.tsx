import { type DealParams, type DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function StructuralWarnings({ params, metrics }: Props) {
    const warnings = [];

    if (params.R > metrics.netProfit && metrics.netProfit > 0) {
        warnings.push({
            id: 'retainer-high',
            label: 'Retainer Impact',
            text: 'Retainer consumes more than 100% of Net Profit. High financial dependency.',
            severity: 'high'
        });
    }

    if (metrics.breakEvenVolume > 30000000) {
        warnings.push({
            id: 'be-extreme',
            label: 'Break-even Risk',
            text: `Break-even exceeds $30M (${(metrics.breakEvenVolume / 1000000).toFixed(1)}M). Unrealistic volume target?`,
            severity: 'high'
        });
    }

    if (params.P > 70) {
        warnings.push({
            id: 'share-extreme',
            label: 'Share Ceiling',
            text: 'Partner share > 70% leaves minimal margin for node/opex costs.',
            severity: 'medium'
        });
    }

    if (metrics.marginBuffer < (params.safetyThreshold / 100)) {
        warnings.push({
            id: 'safety-violation',
            label: 'Margin Safety',
            text: `Current margin (${(metrics.marginBuffer * 100).toFixed(1)}%) is below locked threshold (${params.safetyThreshold}%).`,
            severity: 'high'
        });
    }

    if (params.F < 0.02) {
        warnings.push({
            id: 'low-fee',
            label: 'Fee Compression',
            text: 'Fees below 0.02% create high vulnerability to market volatility.',
            severity: 'medium'
        });
    }

    if (warnings.length === 0) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--accent-emerald)', fontSize: '0.9rem', opacity: 0.8 }}>
                ✅ No structural risks detected in current model.
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {warnings.map(w => (
                <div
                    key={w.id}
                    style={{
                        background: w.severity === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                        borderLeft: `3px solid ${w.severity === 'high' ? 'var(--accent-rose)' : 'var(--accent-orange)'}`,
                        padding: '12px',
                        borderRadius: '4px'
                    }}
                >
                    <div style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px', color: w.severity === 'high' ? 'var(--accent-rose)' : 'var(--accent-orange)' }}>
                        {w.label}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#fff', lineHeight: '1.4' }}>
                        {w.text}
                    </div>
                </div>
            ))}
        </div>
    );
}
