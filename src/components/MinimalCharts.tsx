import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
}

export function MinimalCharts({ params }: Props) {
    // Chart A Data: Net Profit vs Volume (1M to 50M)
    const volPoints = [1, 5, 10, 20, 30, 40, 50];
    const chartAData = volPoints.map(vM => {
        const p = { ...params, V: vM * 1_000_000 };
        const m = calculateDealMetrics(p);
        return { x: vM, y: m.netProfit };
    });

    const maxProfit = Math.max(...chartAData.map(d => Math.abs(d.y)), 1000);
    const height = 100;
    const width = 300;

    const getY = (y: number) => height / 2 - (y / maxProfit) * (height / 2);
    const getX = (x: number) => (x / 50) * width;

    const linePath = chartAData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.x)} ${getY(d.y)}`).join(' ');

    // Chart B Data: Retained vs Partner Pool
    const m = calculateDealMetrics(params);
    const total = Math.max(m.exchangeRetained + m.partnerPool, 1);
    const retainedWidth = (m.exchangeRetained / total) * 100;
    const partnerWidth = (m.partnerPool / total) * 100;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: '100%' }}>
            {/* CHART A */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>Net Profit vs Volume (1M-50M)</h4>
                <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '12px', border: '1px solid var(--border-light)', position: 'relative' }}>
                    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <path d={linePath} fill="none" stroke="var(--accent-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        {chartAData.map((d, i) => (
                            <circle key={i} cx={getX(d.x)} cy={getY(d.y)} r="3" fill={d.y > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'} />
                        ))}
                    </svg>
                </div>
            </div>

            {/* CHART B */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>Retained vs Partner Pool</h4>
                <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '24px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
                    <div style={{ height: '32px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', display: 'flex' }}>
                        <div style={{ width: `${retainedWidth}%`, height: '100%', background: 'var(--text-primary)', transition: 'width 0.3s ease' }} />
                        <div style={{ width: `${partnerWidth}%`, height: '100%', background: 'var(--accent-blue)', transition: 'width 0.3s ease' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', background: 'var(--text-primary)', borderRadius: '2px' }} />
                            <span>Retained</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', background: 'var(--accent-blue)', borderRadius: '2px' }} />
                            <span>Partner Pool</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
