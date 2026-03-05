import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
}

export function Heatmap({ params }: Props) {
    const volMultipliers = [0.6, 0.8, 1.0, 1.2, 1.5];
    const feeValues = [0.028, 0.030, 0.035, 0.040, 0.050];

    const getColor = (status: string) => {
        switch (status) {
            case 'SAFE': return 'var(--accent-emerald)';
            case 'WARNING': return 'var(--accent-amber)';
            case 'CRITICAL': return 'var(--accent-rose)';
            case 'SUICIDAL': return '#7f1d1d'; // Darker red
            default: return 'var(--bg-card)';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px' }}>
                    <thead>
                        <tr>
                            <th style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', padding: '4px' }}>FEE \ VOL</th>
                            {volMultipliers.map(m => (
                                <th key={m} style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', padding: '4px' }}>{m}x</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {feeValues.map(fee => (
                            <tr key={fee}>
                                <td style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>{fee}%</td>
                                {volMultipliers.map(m => {
                                    const res = calculateDealMetrics({ ...params, V: params.V * m, F: fee });
                                    return (
                                        <td
                                            key={`${fee}-${m}`}
                                            style={{
                                                background: getColor(res.status),
                                                borderRadius: '4px',
                                                height: '32px',
                                                width: '40px',
                                                textAlign: 'center',
                                                fontSize: '0.65rem',
                                                color: res.status === 'SAFE' ? '#000' : '#fff',
                                                fontWeight: 'bold',
                                                cursor: 'help',
                                                transition: 'transform 0.2s',
                                                border: fee === params.F && m === 1.0 ? '2px solid white' : 'none'
                                            }}
                                            title={`Net Profit: $${Math.round(res.netProfit).toLocaleString()}`}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                        >
                                            {Math.round(res.netProfit / 1000)}k
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                {['SAFE', 'WARNING', 'CRITICAL', 'SUICIDAL'].map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '8px', height: '8px', background: getColor(s), borderRadius: '2px' }} />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{s}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
