import { useLanguage } from '../lib/LanguageContext';
import type { DealParams, DealResult } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

interface ScoreComponent {
    key: string;
    score: number;
    max: number;
}

function computeScoreComponents(params: DealParams, metrics: DealResult): ScoreComponent[] {
    // ... (logic remains same, just changed label to key)
    const marginPct = metrics.marginBuffer * 100;
    const thresh = params.safetyThreshold;
    let marginScore: number;

    if (marginPct >= thresh + 15) {
        marginScore = 25;
    } else if (marginPct >= thresh) {
        marginScore = ((marginPct - thresh) / 15) * 25;
    } else {
        marginScore = Math.max(0, (marginPct / thresh) * 10);
    }

    const subSplitPct = params.S;
    let tierScore: number;
    if (subSplitPct < 40) {
        tierScore = 15;
    } else if (subSplitPct <= 50) {
        tierScore = ((50 - subSplitPct) / 10) * 15;
    } else {
        tierScore = 0;
    }

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

    const bonusEquivalentPct = (params.B / 350) * 100;
    let bonusScore: number;
    if (bonusEquivalentPct < 15) {
        bonusScore = 15;
    } else if (bonusEquivalentPct <= 30) {
        bonusScore = ((30 - bonusEquivalentPct) / 15) * 15;
    } else {
        bonusScore = 0;
    }

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

    const portfolioScore = 10;

    return [
        { key: 'scoreLabels.margin', score: marginScore, max: 25 },
        { key: 'scoreLabels.tier', score: tierScore, max: 15 },
        { key: 'scoreLabels.retainer', score: retainerScore, max: 15 },
        { key: 'scoreLabels.bonus', score: bonusScore, max: 15 },
        { key: 'scoreLabels.fee', score: feeScore, max: 15 },
        { key: 'scoreLabels.portfolio', score: portfolioScore, max: 15 },
    ];
}

export function DealScore({ params, metrics }: Props) {
    const { t } = useLanguage();
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
        if (metrics.status === 'BLOCKED') return t('scoreDesc.blocked');
        if (metrics.status === 'SAFE') return t('scoreDesc.safe');
        if (metrics.status === 'WARNING') return t('scoreDesc.warn');
        if (metrics.status === 'CRITICAL') return t('scoreDesc.crit');
        return t('scoreDesc.calculating');
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
                    {t('scoreLabels.status').replace('{status}', metrics.status)}
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
                    <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontSize: '0.65rem',
                            color: 'var(--text-secondary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            width: '120px',
                            flexShrink: 0
                        }}>
                            {t(c.key)}
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
