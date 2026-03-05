
import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
}

export function MinimalCharts({ params }: Props) {
    const simulateData = () => {
        const data = [];
        // Map 5 points from 1M to 50M
        const volPoints = [1, 5, 10, 20, 50];
        for (let v of volPoints) {
            const simParams = { ...params, V: v * 1_000_000 };
            const simMetrics = calculateDealMetrics(simParams);
            data.push({ v, partnerPayout: simMetrics.hunterEarnings, net: simMetrics.net });
        }
        return data;
    };

    const data = simulateData();
    const maxPayout = Math.max(...data.map(d => d.partnerPayout));
    const maxNet = Math.max(...data.map(d => d.net));
    const globalMax = Math.max(maxPayout, maxNet, 1);

    // SVG parameters
    const w = 400;
    const h = 100;
    const padding = 10;

    const getPath = (key: 'partnerPayout' | 'net') => {
        return data.map((d, index) => {
            const x = padding + (index / (data.length - 1)) * (w - padding * 2);
            const y = h - padding - ((Math.max(0, d[key]) / globalMax) * (h - padding * 2));
            return `${index === 0 ? 'M' : 'L'} ${x} ${y} `;
        }).join(' ');
    };

    const formatCurrency = (val: number) => {
        if (val >= 1000) return `$${(val / 1000).toFixed(1)} k`;
        return `$${val} `;
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '24px' }}>

            {/* Partner Earnings Chart */}
            <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Partner Payout Curve</span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 'bold' }}>MAX: {formatCurrency(maxPayout)}</span>
                </div>
                <svg width="100%" height={h} viewBox={`0 0 ${w} ${h} `} preserveAspectRatio="none">
                    {/* Grid line */}
                    <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    {/* Path */}
                    <path d={getPath('partnerPayout')} fill="none" stroke="var(--accent-emerald)" strokeWidth="3" />
                    {/* Points */}
                    {data.map((d, i) => (
                        <circle key={i} cx={padding + (i / (data.length - 1)) * (w - padding * 2)} cy={h - padding - ((Math.max(0, d.partnerPayout) / globalMax) * (h - padding * 2))} r="4" fill="var(--bg-dark)" stroke="var(--accent-emerald)" strokeWidth="2" />
                    ))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {data.map(d => <span key={d.v}>{d.v}M</span>)}
                </div>
            </div>

            {/* Exchange Net Chart */}
            <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Exchange Net Yield Curve</span>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>MAX: {formatCurrency(maxNet)}</span>
                </div>
                <svg width="100%" height={h} viewBox={`0 0 ${w} ${h} `} preserveAspectRatio="none">
                    {/* Grid line */}
                    <line x1="0" y1={h} x2={w} y2={h} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                    {/* Zero line if negatives exist */}
                    {data.some(d => d.net < 0) && (
                        <line x1="0" y1={h - padding - ((0 / globalMax) * (h - padding * 2))} x2={w} y2={h - padding - ((0 / globalMax) * (h - padding * 2))} stroke="var(--accent-rose)" strokeWidth="1" strokeDasharray="4" />
                    )}

                    {/* Path */}
                    <path d={getPath('net')} fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
                    {/* Points */}
                    {data.map((d, i) => (
                        <circle key={i} cx={padding + (i / (data.length - 1)) * (w - padding * 2)} cy={h - padding - ((Math.max(0, d.net) / globalMax) * (h - padding * 2))} r="4" fill="var(--bg-dark)" stroke="var(--accent-blue)" strokeWidth="2" />
                    ))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                    {data.map(d => <span key={d.v}>{d.v}M</span>)}
                </div>
            </div>

        </div>
    );
}
