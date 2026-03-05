import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props { params: DealParams; }

export function MinimalCharts({ params }: Props) {
    const volPoints = [1, 5, 10, 20, 30, 40, 50];

    const chartData = volPoints.map(vM => {
        const m = calculateDealMetrics({ ...params, V: vM * 1_000_000 });
        return { x: vM, net: m.netProfit, retained: m.exchangeRetained, partner: m.partnerPool };
    });

    const maxVal = Math.max(...chartData.map(d => Math.abs(d.net)), 1000);
    const H = 120, W = 260;
    const getX = (x: number) => ((x - 1) / (50 - 1)) * W;
    const getY = (y: number) => H / 2 - (y / maxVal) * (H / 2);

    const profitPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.x).toFixed(1)} ${getY(d.net).toFixed(1)}`).join(' ');
    const zeroY = getY(0);

    // Bar chart data for current params
    const m = calculateDealMetrics(params);
    const total = Math.max(m.exchangeRetained + m.partnerPool, 1);
    const retPct = (m.exchangeRetained / total) * 100;
    const partnerPct = (m.partnerPool / total) * 100;

    const fmt = (n: number) => n >= 1_000_000 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${Math.round(n)}`;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

            {/* CHART A — Net Profit Line */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    📈 Net Profit vs Volume
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
                        {/* Grid lines */}
                        <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
                        <line x1="0" y1={H / 4} x2={W} y2={H / 4} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        <line x1="0" y1={H * 3 / 4} x2={W} y2={H * 3 / 4} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                        {/* Zero line highlight */}
                        <line x1="0" y1={zeroY} x2={W} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                        {/* Area fill under line */}
                        <path
                            d={`${profitPath} L ${getX(50)} ${zeroY} L ${getX(1)} ${zeroY} Z`}
                            fill={m.netProfit >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)'}
                        />

                        {/* Main line */}
                        <path
                            d={profitPath}
                            fill="none"
                            stroke={m.netProfit >= 0 ? '#10b981' : '#ef4444'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Dots */}
                        {chartData.map((d, i) => (
                            <circle
                                key={i}
                                cx={getX(d.x)}
                                cy={getY(d.net)}
                                r="3.5"
                                fill={d.net >= 0 ? '#10b981' : '#ef4444'}
                                stroke="rgba(0,0,0,0.5)"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Axis labels */}
                        <text x="0" y={H - 2} fontSize="8" fill="rgba(255,255,255,0.3)">1M</text>
                        <text x={W - 14} y={H - 2} fontSize="8" fill="rgba(255,255,255,0.3)">50M</text>
                    </svg>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>
                    <span>@ 1M vol: <strong style={{ color: m.netProfit >= 0 ? '#10b981' : '#ef4444' }}>{fmt(chartData[0].net)}</strong></span>
                    <span>@ 50M vol: <strong style={{ color: '#10b981' }}>{fmt(chartData[chartData.length - 1].net)}</strong></span>
                </div>
            </div>

            {/* CHART B — Fee Split Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    💰 Fee Split (Current Vol)
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Stacked bar */}
                    <div style={{ height: '28px', borderRadius: '8px', overflow: 'hidden', display: 'flex', background: 'rgba(255,255,255,0.04)' }}>
                        <div style={{ width: `${retPct}%`, background: 'linear-gradient(90deg,#10b981,#059669)', transition: 'width 0.4s ease' }} />
                        <div style={{ width: `${partnerPct}%`, background: 'linear-gradient(90deg,#3b82f6,#6366f1)', transition: 'width 0.4s ease' }} />
                    </div>

                    {/* Legend rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'linear-gradient(90deg,#10b981,#059669)' }} />
                                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>Exchange Retained</span>
                            </div>
                            <strong style={{ fontSize: '0.75rem', color: '#10b981' }}>{fmt(m.exchangeRetained)} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>({retPct.toFixed(0)}%)</span></strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'linear-gradient(90deg,#3b82f6,#6366f1)' }} />
                                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>Partner Pool</span>
                            </div>
                            <strong style={{ fontSize: '0.75rem', color: '#60a5fa' }}>{fmt(m.partnerPool)} <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>({partnerPct.toFixed(0)}%)</span></strong>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>Gross Fees Total</span>
                            <strong style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{fmt(m.grossFees)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
