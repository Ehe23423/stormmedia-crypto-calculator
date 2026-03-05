import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props { params: DealParams; }

const VOL_MULT = [0.5, 0.6, 0.8, 1.0, 1.2, 1.5, 2.0];
const FEE_VALS = [0.028, 0.030, 0.035, 0.040, 0.050];

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
    SAFE: { bg: 'rgba(16,185,129,0.85)', text: '#000' },
    WARNING: { bg: 'rgba(245,158,11,0.85)', text: '#000' },
    CRITICAL: { bg: 'rgba(239,68,68,0.85)', text: '#fff' },
    BLOCKED: { bg: 'rgba(127,29,29,0.95)', text: '#fff' },
};

function fmt(n: number) {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (Math.abs(n) >= 1_000) return `${Math.round(n / 1_000)}k`;
    return `${Math.round(n)}`;
}

export function Heatmap({ params }: Props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '4px', tableLayout: 'fixed' }}>
                    <colgroup>
                        <col style={{ width: '70px' }} />
                        {VOL_MULT.map(m => <col key={m} />)}
                    </colgroup>
                    <thead>
                        <tr>
                            <th style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', padding: '4px 6px', textAlign: 'left', whiteSpace: 'nowrap' }}>
                                FEE ↓ / VOL →
                            </th>
                            {VOL_MULT.map(m => (
                                <th key={m} style={{ fontSize: '0.62rem', color: m === 1.0 ? '#fff' : 'rgba(255,255,255,0.4)', padding: '4px', textAlign: 'center', fontWeight: m === 1.0 ? 800 : 400 }}>
                                    {m === 1.0 ? '●' : ''}{m}x
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {FEE_VALS.map(fee => (
                            <tr key={fee}>
                                <td style={{ fontSize: '0.62rem', color: fee === params.F ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: fee === params.F ? 800 : 400, padding: '2px 6px', whiteSpace: 'nowrap' }}>
                                    {fee === params.F ? '▶ ' : ''}{fee}%
                                </td>
                                {VOL_MULT.map(m => {
                                    const res = calculateDealMetrics({ ...params, V: params.V * m, F: fee });
                                    const col = STATUS_COLOR[res.status] ?? { bg: 'rgba(255,255,255,0.05)', text: '#fff' };
                                    const isCurrent = fee === params.F && m === 1.0;
                                    return (
                                        <td
                                            key={`${fee}-${m}`}
                                            title={`Fee ${fee}% × ${m}x Vol → Net: $${Math.round(res.netProfit).toLocaleString()} (${res.status})`}
                                            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                                            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
                                            style={{
                                                background: col.bg,
                                                borderRadius: '6px',
                                                height: '34px',
                                                textAlign: 'center',
                                                fontSize: '0.62rem',
                                                color: col.text,
                                                fontWeight: 700,
                                                cursor: 'help',
                                                transition: 'transform 0.15s',
                                                outline: isCurrent ? '2px solid #fff' : 'none',
                                                outlineOffset: '1px',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            {fmt(res.netProfit)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {Object.entries(STATUS_COLOR).map(([s, col]) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '10px', height: '10px', background: col.bg, borderRadius: '3px' }} />
                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600, letterSpacing: '0.08em' }}>{s}</span>
                    </div>
                ))}
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', marginLeft: '8px' }}>
                    ● current scenario · hover for details
                </div>
            </div>
        </div>
    );
}
