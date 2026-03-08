import React, { useState } from 'react';
import type { DealParams, DealResult } from '../model/DealModel';
import { useLanguage } from '../lib/LanguageContext';

interface Props {
    params: DealParams;
    metrics: DealResult;
    dealScore: number;
}

interface RoastLine {
    emoji: string;
    text: string;
    severity: 'critical' | 'warning' | 'ok' | 'chad';
}

function generateRoastLines(params: DealParams, metrics: DealResult, score: number, t: (k: string, p?: any) => string): RoastLine[] {
    const lines: RoastLine[] = [];

    // Sub-split
    if (params.S > 50) {
        lines.push({ emoji: '💸', text: t('roast.subSplitCrit', { val: params.S }), severity: 'critical' });
    } else if (params.S > 45) {
        lines.push({ emoji: '😬', text: t('roast.subSplitWarn', { val: params.S }), severity: 'warning' });
    } else if (params.S < 30) {
        lines.push({ emoji: '🧠', text: t('roast.subSplitChad', { val: params.S }), severity: 'chad' });
    }

    // Retainer vs net
    if (params.R > 0 && metrics.netProfit < params.R) {
        lines.push({ emoji: '💀', text: t('roast.retainerCrit', { val: params.R.toLocaleString() }), severity: 'critical' });
    } else if (params.R > metrics.netProfit * 0.7) {
        lines.push({ emoji: '🤡', text: t('roast.retainerWarn'), severity: 'warning' });
    } else if (params.R === 0) {
        lines.push({ emoji: '🎯', text: t('roast.retainerDegen'), severity: 'ok' });
    }

    // Net profit
    if (metrics.netProfit < 0) {
        const val = metrics.netProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        lines.push({ emoji: '🚨', text: t('roast.netCrit', { val }), severity: 'critical' });
    } else if (metrics.netProfit > 50000) {
        const val = metrics.netProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        lines.push({ emoji: '🚀', text: t('roast.netChad', { val }), severity: 'chad' });
    }

    // Margin buffer
    if (metrics.marginBuffer * 100 < 10) {
        lines.push({ emoji: '📉', text: t('roast.marginCrit', { val: (metrics.marginBuffer * 100).toFixed(1) }), severity: 'critical' });
    } else if (metrics.marginBuffer * 100 > 40) {
        lines.push({ emoji: '💎', text: t('roast.marginChad', { val: (metrics.marginBuffer * 100).toFixed(1) }), severity: 'chad' });
    }

    // Bonus stacking
    if (params.B > 0) {
        const bonusEq = (params.B / 350) * 100;
        if (bonusEq > 28) {
            lines.push({ emoji: '💣', text: t('roast.bonusCrit', { val: bonusEq.toFixed(1) }), severity: 'critical' });
        } else if (bonusEq > 15) {
            lines.push({ emoji: '⚠️', text: t('roast.bonusWarn', { val: bonusEq.toFixed(1) }), severity: 'warning' });
        } else {
            lines.push({ emoji: '✅', text: t('roast.bonusOk', { val: bonusEq.toFixed(1) }), severity: 'ok' });
        }
    }

    // Volume
    if (params.V < 5_000_000) {
        lines.push({ emoji: '🐌', text: t('roast.volWarn', { val: (params.V / 1e6).toFixed(0) }), severity: 'warning' });
    } else if (params.V > 40_000_000) {
        lines.push({ emoji: '🦁', text: t('roast.volChad', { val: (params.V / 1e6).toFixed(0) }), severity: 'chad' });
    }

    // Partner share
    if (params.P > 60) {
        lines.push({ emoji: '🙏', text: t('roast.partnerCrit', { val: params.P }), severity: 'critical' });
    } else if (params.P < 40) {
        lines.push({ emoji: '🏦', text: t('roast.partnerOk', { val: params.P }), severity: 'ok' });
    }

    // retained per 1M
    if (metrics.retainedPer1M < 80) {
        lines.push({ emoji: '☠️', text: t('roast.retainedCrit', { val: metrics.retainedPer1M.toFixed(0) }), severity: 'critical' });
    }

    // Score-based closing
    if (score >= 80) {
        lines.push({ emoji: '👑', text: t('roast.scoreChad', { val: score }), severity: 'chad' });
    } else if (score >= 60) {
        lines.push({ emoji: '🤝', text: t('roast.scoreOk', { val: score }), severity: 'ok' });
    } else if (score >= 40) {
        lines.push({ emoji: '😰', text: t('roast.scoreWarn', { val: score }), severity: 'warning' });
    } else {
        lines.push({ emoji: '💀', text: t('roast.scoreCrit', { val: score }), severity: 'critical' });
    }

    return lines.slice(0, 7); // max 7 roast lines
}

export const DealRoast: React.FC<Props> = ({ params, metrics, dealScore }) => {
    const { t } = useLanguage();
    const [showTips, setShowTips] = useState(false);

    const getRoastTier = (score: number) => {
        if (score >= 80) return { emoji: '🚀', color: '#10b981', bg: 'rgba(16,185,129,0.08)', ...t('roastTiers.chad') };
        if (score >= 60) return { emoji: '🤔', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', ...t('roastTiers.ser') };
        if (score >= 40) return { emoji: '😬', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', ...t('roastTiers.cope') };
        return { emoji: '💀', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', ...t('roastTiers.ngmi') };
    };

    const tier = getRoastTier(dealScore) as any;
    const roastLines = generateRoastLines(params, metrics, dealScore, t);

    const severityStyle = (s: RoastLine['severity']) => {
        const map = {
            critical: { color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', backgroundColor: 'rgba(239,68,68,0.05)' },
            warning: { color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)', backgroundColor: 'rgba(245,158,11,0.05)' },
            ok: { color: '#60a5fa', borderColor: 'rgba(96,165,250,0.2)', backgroundColor: 'rgba(96,165,250,0.04)' },
            chad: { color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(16,185,129,0.05)' },
        };
        return map[s];
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* TIER HEADER */}
            <div style={{
                background: tier.bg,
                border: `2px solid ${tier.color}`,
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: `0 0 40px ${tier.color}30`,
                backdropFilter: 'blur(20px)',
            }}>
                <div style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '8px' }}>{tier.emoji}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: tier.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {tier.label}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '6px', fontStyle: 'italic' }}>
                    {tier.desc}
                </div>
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 14px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                        {t('topBar.score').replace('{val}', dealScore)}
                    </span>
                    <span
                        title={t('tooltips.V')}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 14px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', cursor: 'help' }}
                    >
                        V: <strong style={{ color: '#fff' }}>${(params.V / 1e6).toFixed(1)}M</strong>
                    </span>
                    <span
                        title={t('tooltips.margin')}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 14px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', cursor: 'help' }}
                    >
                        Margin: <strong style={{ color: metrics.marginBuffer * 100 > 20 ? '#10b981' : '#ef4444' }}>{(metrics.marginBuffer * 100).toFixed(1)}%</strong>
                    </span>
                </div>
            </div>

            {/* ROAST LINES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {t('roast.title')}
                </div>
                {roastLines.map((line, i) => {
                    const s = severityStyle(line.severity);
                    return (
                        <div key={i} style={{
                            background: s.backgroundColor,
                            border: `1px solid ${s.borderColor}`,
                            borderRadius: '10px',
                            padding: '10px 14px',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                            backdropFilter: 'blur(8px)',
                        }}>
                            <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1.4 }}>{line.emoji}</span>
                            <span style={{ fontSize: '0.8rem', color: s.color, lineHeight: 1.5, fontWeight: 500 }}>{line.text}</span>
                        </div>
                    );
                })}
            </div>

            {/* NEGOTIATION TIPS TOGGLE */}
            <div>
                <button
                    onClick={() => setShowTips(v => !v)}
                    style={{
                        width: '100%',
                        padding: '10px 20px',
                        background: showTips ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.07)',
                        border: '1px solid rgba(139,92,246,0.4)',
                        borderRadius: '10px',
                        color: '#a78bfa',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s',
                    }}
                >
                    <span>{t('roastNegotiation.title')}</span>
                    <span style={{ fontSize: '1rem' }}>{showTips ? '▲' : '▼'}</span>
                </button>

                {showTips && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[1, 2, 3, 4].map(step => {
                            const move = t(`roastNegotiation.move${step}`) as any;
                            const emojis: any = { 1: '🔧', 2: '📊', 3: '🎁', 4: '⚡' };
                            return (
                                <div key={step} style={{
                                    background: 'rgba(139,92,246,0.05)',
                                    border: '1px solid rgba(139,92,246,0.2)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    gap: '12px',
                                    alignItems: 'flex-start',
                                }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '8px',
                                        background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem', fontWeight: 900, color: '#a78bfa', flexShrink: 0,
                                    }}>
                                        {step}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c4b5fd', marginBottom: '2px' }}>
                                            {emojis[step]} {move.title}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                                            {move.detail}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* AUTO-OPTIMIZER SUGGESTION */}
            {dealScore < 60 && (
                <div style={{
                    background: 'rgba(6,182,212,0.06)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    borderRadius: '12px',
                    padding: '16px',
                    backdropFilter: 'blur(10px)',
                }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22d3ee', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>
                        {t('roastOptimizer.title')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {params.S > 40 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>{t('roastOptimizer.reduceS', { val1: params.S, val2: 35, val3: Math.round((params.S - 35) * 2) })}</span>
                            </div>
                        )}
                        {params.B > 100 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>{t('roastOptimizer.replaceB', { val1: params.B, val2: 30 })}</span>
                            </div>
                        )}
                        {params.R > metrics.netProfit * 0.5 && params.R > 0 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>{t('roastOptimizer.splitR', { val1: params.R.toLocaleString() })}</span>
                            </div>
                        )}
                        {params.P > 55 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>{t('roastOptimizer.reduceP', { val1: params.P, val2: 50 })}</span>
                            </div>
                        )}
                        {params.S <= 40 && params.B <= 100 && params.R <= metrics.netProfit * 0.5 && params.P <= 55 && (
                            <div style={{ fontSize: '0.75rem', color: '#22d3ee' }}>
                                {t('roastOptimizer.perfect')}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
