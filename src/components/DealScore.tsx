import type { DealParams, DealResult } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

interface ScoreComponent {
    label: string;
    score: number;
    max: number;
}

function computeScoreComponents(params: DealParams, metrics: DealResult): ScoreComponent[] {
    // 1. Margin buffer: 25 pts
    // 30%+ = full 25, 15-30% = proportional, <15% = proportional down to 0
    const marginPct = metrics.marginBuffer * 100;
    let marginScore: number;
    if (marginPct >= 30) {
        marginScore = 25;
    } else if (marginPct >= 15) {
        marginScore = ((marginPct - 15) / 15) * 25;
    } else {
        marginScore = (marginPct / 15) * 25;
    }

    // 2. Tier protection: 15 pts
    // S < 40% = full 15, 40-50% = proportional, >50% = 0
    const subSplitPct = params.S;
    let tierScore: number;
    if (subSplitPct < 40) {
        tierScore = 15;
    } else if (subSplitPct <= 50) {
        tierScore = ((50 - subSplitPct) / 10) * 15;
    } else {
        tierScore = 0;
    }

    // 3. Retainer safety: 15 pts
    // R < netProfit * 0.45 = full 15, proportional otherwise, R > netProfit = 0
    const retainer = params.R;
    const netProfit = metrics.netProfit;
    let retainerScore: number;
    if (netProfit <= 0) {
        retainerScore = 0;
    } else if (retainer <= 0) {
        retainerScore = 15;
    } else if (retainer > netProfit) {
        retainerScore = 0;
    } else {
        const threshold = netProfit * 0.45;
        if (retainer < threshold) {
            retainerScore = 15;
        } else {
            retainerScore = ((netProfit - retainer) / (netProfit - threshold)) * 15;
        }
    }

    // 4. Bonus containment: 15 pts
    // Bonus equivalent = (B / 350) * 100 as a percentage
    // < 15% = full 15, proportional to 30%, >30% = 0
    const bonusEquivalentPct = (params.B / 350) * 100;
    let bonusScore: number;
    if (bonusEquivalentPct < 15) {
        bonusScore = 15;
    } else if (bonusEquivalentPct <= 30) {
        bonusScore = ((30 - bonusEquivalentPct) / 15) * 15;
    } else {
        bonusScore = 0;
    }

    // 5. Fee compression resilience: 15 pts
    // Simulate at 0.028% fee — if still profitable = 15, break-even = 7, loss = 0
    const stressParams: DealParams = { ...params, F: 0.028 };
    const stressMetrics = calculateDealMetrics(stressParams);
    let feeScore: number;
    if (stressMetrics.netProfit > 0) {
        feeScore = 15;
    } else if (stressMetrics.netProfit === 0) {
        feeScore = 7;
    } else {
        feeScore = 0;
    }

    // 6. Portfolio correlation risk: 15 pts
    // Fixed 10pts — single deal, no portfolio data available
    const portfolioScore = 10;

    return [
        { label: 'Margin Buffer', score: marginScore, max: 25 },
        { label: 'Tier Protection', score: tierScore, max: 15 },
        { label: 'Retainer Safety', score: retainerScore, max: 15 },
        { label: 'Bonus Containment', score: bonusScore, max: 15 },
        { label: 'Fee Compression', score: feeScore, max: 15 },
        { label: 'Portfolio Risk', score: portfolioScore, max: 15 },
    ];
}

export function DealScore({ params, metrics }: Props) {
    const components = computeScoreComponents(params, metrics);
    const scoreValue = Math.round(components.reduce((sum, c) => sum + c.score, 0));

    const getStatusColor = () => {
        switch (metrics.status) {
            case 'SAFE': return 'var(--accent-emerald)';
            case 'WARNING': return 'var(--accent-amber)';
            case 'CRITICAL': return 'var(--accent-rose)';
            case 'BLOCKED': return '#ff0000';
            default: return 'var(--text-secondary)';
        }
    };

    const getScoreDescription = () => {
        if (metrics.status === 'BLOCKED') return 'VIOLATION: Margin below safety threshold.';
        if (metrics.status === 'SAFE') return 'OPTIMAL: Strong margin buffer, scalable structure.';
        if (metrics.status === 'WARNING') return 'SUB-OPTIMAL: Respectable, but vulnerable to volume dips.';
        if (metrics.status === 'CRITICAL') return 'DANGEROUS: Margin collapse imminent. Renegotiate.';
        return 'CALCULATING...';
    };

    const statusColor = getStatusColor();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: statusColor,
                    lineHeight: 1,
                    letterSpacing: '-0.05em'
                }}>
                    {scoreValue < 10 ? `0${scoreValue}` : scoreValue}
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: statusColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginTop: '4px'
                }}>
                    {metrics.status} STATUS
                </div>
            </div>

            <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginTop: '10px'
            }}>
                <div style={{
                    width: `${scoreValue}%`,
                    height: '100%',
                    background: statusColor,
                    boxShadow: `0 0 15px ${statusColor}`
                }} />
            </div>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                textAlign: 'center',
                margin: 0,
                fontStyle: 'italic'
            }}>
                "{getScoreDescription()}"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {components.map((c) => (
                    <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontSize: '0.65rem',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            width: '120px',
                            flexShrink: 0
                        }}>
                            {c.label}
                        </span>
                        <div style={{
                            flex: 1,
                            height: '4px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${(c.score / c.max) * 100}%`,
                                height: '100%',
                                background: statusColor,
                                opacity: 0.7
                            }} />
                        </div>
                        <span style={{
                            fontSize: '0.65rem',
                            color: 'var(--text-secondary)',
                            width: '36px',
                            textAlign: 'right',
                            flexShrink: 0
                        }}>
                            {Math.round(c.score)}/{c.max}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
