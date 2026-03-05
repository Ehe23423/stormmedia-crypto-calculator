import type { DealParams, DealResult } from '../model/DealModel';

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

    // Moduł 40/54 — Margin Collapse Detector
    const retainedPer1M = (params.F / 100) * (params.P / 100) * (1 - params.S / 100) * 1_000_000;
    if (retainedPer1M < 80) {
        warnings.push({
            id: 'margin-collapse',
            label: 'Margin Collapse Risk',
            text: `MARGIN COLLAPSE RISK - Retained per $1M below $80 safety floor (currently $${retainedPer1M.toFixed(2)}).`,
            severity: 'high'
        });
    }

    // Moduł 30 — Hunter Detection
    if (params.V > 40_000_000) {
        warnings.push({
            id: 'hunter-detection',
            label: 'High Capacity Hunter',
            text: 'HIGH CAPACITY HUNTER - Consider: tier unlock, milestone retainer, bonus cap.',
            severity: 'medium'
        });
    }

    // Bonus Stacking Risk
    const grossPer1M = (params.F / 100) * 1_000_000;
    const bonusEquivPct = grossPer1M > 0 ? (params.B / grossPer1M) * 100 : 0;
    if (bonusEquivPct > 20) {
        warnings.push({
            id: 'bonus-stacking',
            label: 'Bonus Stacking Risk',
            text: `Bonus equivalent exceeds 20% of gross per 1M (currently ${bonusEquivPct.toFixed(1)}%). Stacking risk.`,
            severity: 'high'
        });
    }

    // Moduł 41 — High S + High R combo
    if (params.S > 40 && params.R > 2000) {
        warnings.push({
            id: 'high-s-high-r',
            label: 'Double Cost Exposure',
            text: 'High sub-split combined with high retainer. Double cost exposure.',
            severity: 'high'
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
