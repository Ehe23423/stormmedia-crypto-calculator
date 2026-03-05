import React, { useState } from 'react';
import type { DealParams, DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
    dealScore: number;
}

interface QA {
    question: string;
    emoji: string;
    getAnswer: (p: DealParams, m: DealResult, s: number) => string;
}

const QA_LIST: QA[] = [
    {
        question: 'Is this deal safe?',
        emoji: '🛡️',
        getAnswer: (p, m, s) => {
            if (m.status === 'BLOCKED') return `❌ BLOCKED. Margin buffer ${(m.marginBuffer * 100).toFixed(1)}% is below your safety threshold of ${p.safetyThreshold}%. This deal violates minimum safety protocol. Do not proceed.`;
            if (m.status === 'SAFE') return `✅ SAFE. Deal score ${s}/100 with ${(m.marginBuffer * 100).toFixed(1)}% margin buffer. Surplus retained: ${(m.netProfit).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} monthly. Structure is sound.`;
            if (m.status === 'WARNING') return `⚠️ WARNING. Score ${s}/100. Margin buffer ${(m.marginBuffer * 100).toFixed(1)}% is acceptable but thin. One volume dip of 20% could flip this negative. Proceed with caution.`;
            return `🚨 CRITICAL. Margin at ${(m.marginBuffer * 100).toFixed(1)}%. Vulnerable to any volume decline or fee compression. Renegotiate before signing.`;
        }
    },
    {
        question: 'What should I change first?',
        emoji: '🎯',
        getAnswer: (p, m) => {
            if (p.R > m.netProfit * 0.5 && p.R > 0)
                return `🔧 Step 1 priority: Restructure retainer. Your R=$${p.R.toLocaleString()} eats ${((p.R / Math.max(m.netProfit, 1)) * 100).toFixed(0)}% of net profit. Split into milestones: launch + 25M + 40M. Immediately reduces fixed cost exposure.`;
            if (p.S > 42)
                return `📊 Step 1 priority: Reduce sub-split from ${p.S}% to tiered structure (30%→40%→50%) based on volume milestones instead of flat ${p.S}%. This protects you at low volumes.`;
            if (p.B > 100)
                return `🎁 Step 1 priority: Your bonus ($${p.B}/1M = ${((p.B / 350) * 100).toFixed(1)}% equivalent) is a stacking risk. Replace with tier upgrade at 30M volume. Eliminates linear bonus exposure.`;
            if (p.P > 58)
                return `⚡ Step 1 priority: Partner share ${p.P}% is high. Try negotiating down to 50–55%. Every 5% reduction recaptures ~${((p.V / 1e6) * (p.F / 100) * 0.05 * 1e6).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} monthly.`;
            return `✅ Your parameters look balanced. Focus on increasing volume V→${(p.V * 1.2 / 1e6).toFixed(0)}M to improve all metrics proportionally.`;
        }
    },
    {
        question: 'Show me the break-even',
        emoji: '📐',
        getAnswer: (p, m) => {
            const beM = m.breakEvenVolume / 1e6;
            const currentM = p.V / 1e6;
            const pct = currentM > 0 ? ((currentM - beM) / currentM * 100).toFixed(0) : '0';
            if (m.breakEvenVolume <= 0)
                return `⚡ No fixed costs (R=0, I=0, B=0) — break-even is at $0 volume. Every dollar of volume is profitable.`;
            if (beM > currentM)
                return `🚨 Break-even volume: $${beM.toFixed(1)}M — you are BELOW break-even at current ${currentM}M volume. Need ${(beM - currentM).toFixed(1)}M MORE to stop losing money.`;
            return `📐 Break-even at $${beM.toFixed(1)}M. Current volume ($${currentM.toFixed(0)}M) is ${pct}% above break-even. Comfortable buffer. Volume can drop ${(currentM - beM).toFixed(1)}M before you go negative.`;
        }
    },
    {
        question: 'How risky is this bonus?',
        emoji: '💣',
        getAnswer: (p) => {
            if (p.B === 0) return `✅ No bonus in this deal. Zero stacking risk. Clean and simple structure.`;
            const eq = (p.B / 350) * 100;
            if (eq > 28.6) return `💀 DANGER: Bonus $${p.B}/1M = ${eq.toFixed(1)}% equivalent of gross/1M. PDF states 28.6% is the max safe threshold (=$100/1M bonus). You're above it. At high volumes this bonus will eat your margin. Freeze rule: if Net≤0, bonus pauses — but damage is done.`;
            if (eq > 15) return `⚠️ CAUTION: Bonus ${eq.toFixed(1)}% equivalent. Above 15% is considered elevated risk. Consider converting to tier upgrade at 30M milestone instead.`;
            return `✅ Bonus $${p.B}/1M = ${eq.toFixed(1)}% equivalent — within safe range (<15%). Bonus freeze rule applies if Net turns negative.`;
        }
    },
    {
        question: 'Best negotiation move?',
        emoji: '♟️',
        getAnswer: (p, m) => {
            // Follow the 4-step PDF rulebook
            if (p.R > m.netProfit * 0.45 && p.R > 500)
                return `♟️ Move 1 — Retainer restructure: "I can offer the base retainer, but split as $${Math.round(p.R * 0.4).toLocaleString()} at launch, $${Math.round(p.R * 0.35).toLocaleString()} at 25M/month, $${Math.round(p.R * 0.25).toLocaleString()} at 40M/month. Aligns both parties to growth." This reduces your upfront risk significantly.`;
            if (p.S > 40)
                return `♟️ Move 2 — Tiering: "Instead of flat ${p.S}%, let's structure it as 30% up to 20M monthly, 40% at 20–35M, and 50% above 35M. You earn more as you bring more — fair and motivating." Protects you at low volumes while giving upside.`;
            if (p.B > 100)
                return `♟️ Move 3 — Tier over bonus: "Rather than a per-1M bonus, how about a tier upgrade to the next commission level when you hit 35M volume? Gives you reliable upside without capping our margin at all scenarios."`;
            return `♟️ Move 4 (last resort): Sub-split adjustment. Current ${p.S}%. If needed, you can offer +3–5% S increase ONLY tied to tier qualification (2 consecutive qualifying months at target volume). Never agree to flat S increase without volume proof.`;
        }
    },
    {
        question: 'Retained per $1M volume?',
        emoji: '💰',
        getAnswer: (p, m) => {
            const r1m = m.retainedPer1M;
            if (r1m < 80) return `☠️ COLLAPSE ZONE: Only $${r1m.toFixed(0)} retained per $1M volume. PDF thresholds: <$80/1M = MARGIN COLLAPSE RISK. You need at least $${(80).toFixed(0)} to cover operational variability.`;
            if (r1m < 140) return `⚠️ LOW MARGIN: $${r1m.toFixed(0)}/1M retained. Base formula at 0.035% fee = $350/1M gross. You're keeping ${(r1m / 350 * 100).toFixed(0)}% of gross — below recommended 40%+ floor.`;
            return `✅ $${r1m.toFixed(0)} retained per $1M volume. Healthy: ${(r1m / 350 * 100).toFixed(0)}% of $350/1M base fee. Fee compression buffer: survives to ${(0.035 - (0.035 * (1 - r1m / 350))).toFixed(3)}% fee scenario.`;
        }
    },
];

export const DealAssistant: React.FC<Props> = ({ params, metrics, dealScore }) => {
    const [activeQ, setActiveQ] = useState<number | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '4px' }}>
                🤖 Ask the BD Engine
            </div>
            {QA_LIST.map((qa, i) => {
                const isActive = activeQ === i;
                return (
                    <div key={i} style={{
                        border: `1px solid ${isActive ? 'rgba(96,165,250,0.5)' : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: '10px',
                        overflow: 'hidden',
                        transition: 'border-color 0.2s',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <button
                            onClick={() => setActiveQ(isActive ? null : i)}
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                background: isActive ? 'rgba(96,165,250,0.08)' : 'rgba(255,255,255,0.02)',
                                border: 'none',
                                color: isActive ? '#93c5fd' : 'rgba(255,255,255,0.7)',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{qa.emoji}</span>
                            <span style={{ flex: 1 }}>{qa.question}</span>
                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{isActive ? '▲' : '▼'}</span>
                        </button>
                        {isActive && (
                            <div style={{
                                padding: '12px 14px',
                                background: 'rgba(0,0,0,0.3)',
                                borderTop: '1px solid rgba(255,255,255,0.05)',
                                fontSize: '0.78rem',
                                color: 'rgba(255,255,255,0.75)',
                                lineHeight: 1.6,
                            }}>
                                {qa.getAnswer(params, metrics, dealScore)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
