import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    baseParams: DealParams;
}

export function RiskHeatmap({ baseParams }: Props) {
    const vList = [5_000_000, 15_000_000, 30_000_000, 50_000_000, 80_000_000];
    const sList = [20, 30, 40, 50, 60];

    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>RISK HEATMAP (NET PROFIT)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>X-Axis: Sub-split (S) | Y-Axis: Volume (V)</p>

            <div className="table-responsive">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px', borderBottom: '1px solid var(--border-light)' }}>V \ S</th>
                            {sList.map(s => (
                                <th key={s} style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', color: '#8b5cf6' }}>
                                    {(s * 100).toFixed(0)}%
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {vList.map(v => (
                            <tr key={v}>
                                <td style={{ padding: '8px', borderBottom: '1px solid var(--border-light)', fontWeight: 'bold', color: '#3b82f6' }}>
                                    {(v / 1_000_000).toFixed(0)}M
                                </td>
                                {sList.map(s => {
                                    const m = calculateDealMetrics({ ...baseParams, V: v, S: s, useTiers: false });
                                    let bgColor = 'rgba(48, 30, 20, 0.2)'; // Loss (red)
                                    let color = '#f43f5e';

                                    if (m.net > 0 && m.net < 200) {
                                        bgColor = 'rgba(188, 108, 37, 0.2)'; // Near break-even (yellow)
                                        color = '#f59e0b';
                                    } else if (m.net > 0) {
                                        bgColor = 'rgba(40, 54, 24, 0.2)'; // Profit (green)
                                        color = '#10b981';
                                    }

                                    return (
                                        <td key={s} style={{ padding: '8px', margin: '2px', border: '1px solid var(--bg-dark)', background: bgColor, color, fontWeight: 'bold' }}>
                                            ${m.net.toFixed(0)}
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
