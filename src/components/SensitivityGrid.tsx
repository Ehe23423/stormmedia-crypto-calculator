import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    baseParams: DealParams;
}

export function SensitivityGrid({ baseParams }: Props) {
    const pVals = [0.40, 0.50, 0.60];
    const sVals = [0.30, 0.40, 0.50];

    const formatNum = (val: number) => {
        if (!isFinite(val)) return '∞';
        if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + 'M';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>SENSITIVITY GRID (Break-even Volume)</h3>
            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '12px', borderBottom: '1px solid var(--border-light)' }}>S / P</th>
                            {pVals.map(p => (
                                <th key={p} style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', color: '#3b82f6' }}>
                                    P = {Math.round(p * 100)}%
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sVals.map(s => (
                            <tr key={s}>
                                <td style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', fontWeight: 'bold', color: '#8b5cf6' }}>
                                    S = {Math.round(s * 100)}%
                                </td>
                                {pVals.map(p => {
                                    const metrics = calculateDealMetrics({ ...baseParams, P: p, S: s });
                                    return (
                                        <td key={p} style={{ padding: '12px', borderBottom: '1px solid var(--border-light)', color: 'var(--text-primary)' }}>
                                            {formatNum(metrics.breakEvenVolume)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
