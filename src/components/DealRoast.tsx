import React, { useState } from 'react';
import type { DealParams, DealResult } from '../model/DealModel';

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

function generateRoastLines(params: DealParams, metrics: DealResult, score: number): RoastLine[] {
    const lines: RoastLine[] = [];

    // Sub-split
    if (params.S > 50) {
        lines.push({ emoji: '💸', text: `Sub-split at ${params.S}%? Bro literally donated the exchange to the KOL. GM ser 🫡`, severity: 'critical' });
    } else if (params.S > 45) {
        lines.push({ emoji: '😬', text: `${params.S}% sub-split and you're still okay with this? Bold strategy cotton.`, severity: 'warning' });
    } else if (params.S < 30) {
        lines.push({ emoji: '🧠', text: `Sub-split at ${params.S}%? Based. The exchange keeps its lunch money.`, severity: 'chad' });
    }

    // Retainer vs net
    if (params.R > 0 && metrics.netProfit < params.R) {
        lines.push({ emoji: '💀', text: `Retainer ($${params.R.toLocaleString()}) is bigger than net profit. Sir this is a charity.`, severity: 'critical' });
    } else if (params.R > metrics.netProfit * 0.7) {
        lines.push({ emoji: '🤡', text: `Retainer eating 70%+ of profit. One bad month and you're ngmi.`, severity: 'warning' });
    } else if (params.R === 0) {
        lines.push({ emoji: '🎯', text: `Zero retainer. High-risk high-reward. Very degen. Very BD.`, severity: 'ok' });
    }

    // Net profit
    if (metrics.netProfit < 0) {
        lines.push({ emoji: '🚨', text: `Negative net profit (${metrics.netProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}). This deal is literally burning money. WAGMI? No.`, severity: 'critical' });
    } else if (metrics.netProfit > 50000) {
        lines.push({ emoji: '🚀', text: `${metrics.netProfit.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} net/month. This deal is sending. Degen approved.`, severity: 'chad' });
    }

    // Margin buffer
    if (metrics.marginBuffer * 100 < 10) {
        lines.push({ emoji: '📉', text: `Margin buffer at ${(metrics.marginBuffer * 100).toFixed(1)}%? One volume dip and you're eating Mcdonalds.`, severity: 'critical' });
    } else if (metrics.marginBuffer * 100 > 40) {
        lines.push({ emoji: '💎', text: `${(metrics.marginBuffer * 100).toFixed(1)}% margin buffer. Diamond hands deal structure. Respect.`, severity: 'chad' });
    }

    // Bonus stacking
    if (params.B > 0) {
        const bonusEq = (params.B / 350) * 100;
        if (bonusEq > 28) {
            lines.push({ emoji: '💣', text: `Bonus stacking at ${bonusEq.toFixed(1)}% equivalent. One good month ruins the model. Classic bonus trap.`, severity: 'critical' });
        } else if (bonusEq > 15) {
            lines.push({ emoji: '⚠️', text: `Bonus equivalent at ${bonusEq.toFixed(1)}%. Getting spicy. Watch the stack.`, severity: 'warning' });
        } else {
            lines.push({ emoji: '✅', text: `Bonus equivalent ${bonusEq.toFixed(1)}% — contained and based. Good boy.`, severity: 'ok' });
        }
    }

    // Volume
    if (params.V < 5_000_000) {
        lines.push({ emoji: '🐌', text: `$${(params.V / 1e6).toFixed(0)}M volume? Even my grandma trades more.`, severity: 'warning' });
    } else if (params.V > 40_000_000) {
        lines.push({ emoji: '🦁', text: `$${(params.V / 1e6).toFixed(0)}M volume — HUNTER TIER. This KOL is built different.`, severity: 'chad' });
    }

    // Partner share
    if (params.P > 60) {
        lines.push({ emoji: '🙏', text: `${params.P}% partner share? You're basically the KOL's employee at this point.`, severity: 'critical' });
    } else if (params.P < 40) {
        lines.push({ emoji: '🏦', text: `${params.P}% partner share? Exchange-maxi energy. Frugal and disciplined.`, severity: 'ok' });
    }

    // retained per 1M
    if (metrics.retainedPer1M < 80) {
        lines.push({ emoji: '☠️', text: `Only $${metrics.retainedPer1M.toFixed(0)} retained per $1M volume. This is margin collapse territory. RIP.`, severity: 'critical' });
    }

    // Score-based closing
    if (score >= 80) {
        lines.push({ emoji: '👑', text: `Deal score ${score}/100. Chad structure. Screenshot this. Show your boss.`, severity: 'chad' });
    } else if (score >= 60) {
        lines.push({ emoji: '🤝', text: `Score ${score}/100. Workable. Don't celebrate yet. Run stress tests.`, severity: 'ok' });
    } else if (score >= 40) {
        lines.push({ emoji: '😰', text: `Score ${score}/100. COPE tier. This deal is one bad month from disaster.`, severity: 'warning' });
    } else {
        lines.push({ emoji: '💀', text: `Score ${score}/100. NGMI. Anon this deal is structurally cursed. Renegotiate everything.`, severity: 'critical' });
    }

    return lines.slice(0, 7); // max 7 roast lines
}

function getRoastTier(score: number): { label: string; emoji: string; color: string; bg: string; desc: string } {
    if (score >= 80) return { label: 'CHAD DEAL', emoji: '🚀', color: '#10b981', bg: 'rgba(16,185,129,0.08)', desc: 'Sir this deal is built.' };
    if (score >= 60) return { label: 'SER', emoji: '🤔', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', desc: 'Technically passable. Barely.' };
    if (score >= 40) return { label: 'COPE', emoji: '😬', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', desc: 'We are so back? No. We are not.' };
    return { label: 'NGMI', emoji: '💀', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', desc: 'This deal is structurally cooked.' };
}

const negotiationMoves = [
    { step: 1, emoji: '🔧', move: 'Adjust retainer structure', detail: 'Split R into milestone tranches (launch / 25M / 40M). Reduces upfront exposure.' },
    { step: 2, emoji: '📊', move: 'Use tiered sub-split', detail: '0–20M → 30%, 20–35M → 40%, 35M+ → 50%. Align KOL incentives with volume.' },
    { step: 3, emoji: '🎁', move: 'Replace bonus with tier upgrade', detail: 'Bonus stacking is a trap. Offer tier promotion instead — less linear risk.' },
    { step: 4, emoji: '⚡', move: 'Only then raise S', detail: 'S increase is last resort. Every 10% in S needs ~20% more volume to compensate.' },
];

export const DealRoast: React.FC<Props> = ({ params, metrics, dealScore }) => {
    const [showTips, setShowTips] = useState(false);
    const tier = getRoastTier(dealScore);
    const roastLines = generateRoastLines(params, metrics, dealScore);

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
                        Deal Score: <strong style={{ color: tier.color }}>{dealScore}/100</strong>
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 14px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                        V: <strong style={{ color: '#fff' }}>${(params.V / 1e6).toFixed(1)}M</strong>
                    </span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px 14px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                        Margin: <strong style={{ color: metrics.marginBuffer * 100 > 20 ? '#10b981' : '#ef4444' }}>{(metrics.marginBuffer * 100).toFixed(1)}%</strong>
                    </span>
                </div>
            </div>

            {/* ROAST LINES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    🔥 The Roast
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
                    <span>🎯 Negotiation Rulebook</span>
                    <span style={{ fontSize: '1rem' }}>{showTips ? '▲' : '▼'}</span>
                </button>

                {showTips && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {negotiationMoves.map(m => (
                            <div key={m.step} style={{
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
                                    {m.step}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c4b5fd', marginBottom: '2px' }}>
                                        {m.emoji} {m.move}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
                                        {m.detail}
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        🤖 Auto-Optimizer Suggestions
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {params.S > 40 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>Reduce sub-split S from <strong style={{ color: '#f59e0b' }}>{params.S}%</strong> to <strong style={{ color: '#22d3ee' }}>35%</strong> to increase margin buffer by ~{Math.round((params.S - 35) * 2)}%</span>
                            </div>
                        )}
                        {params.B > 100 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>Replace bonus $B={params.B}/1M with tier upgrade at 30M volume milestone</span>
                            </div>
                        )}
                        {params.R > metrics.netProfit * 0.5 && params.R > 0 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>Split retainer $R={params.R.toLocaleString()} into milestones: launch (40%) + 25M (35%) + 40M (25%)</span>
                            </div>
                        )}
                        {params.P > 55 && (
                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', display: 'flex', gap: '8px' }}>
                                <span>→</span>
                                <span>Negotiate partner share P down from <strong style={{ color: '#f59e0b' }}>{params.P}%</strong> to <strong style={{ color: '#22d3ee' }}>50%</strong></span>
                            </div>
                        )}
                        {params.S <= 40 && params.B <= 100 && params.R <= metrics.netProfit * 0.5 && params.P <= 55 && (
                            <div style={{ fontSize: '0.75rem', color: '#22d3ee' }}>
                                ✅ Parameters are reasonable. Focus on volume growth to improve score.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
