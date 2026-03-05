import { useState } from 'react';
import type { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    onApplyCounterOffer?: (newParams: Partial<DealParams>) => void;
}

export function NegotiationAssistant({ params, onApplyCounterOffer }: Props) {
    const [activeView, setActiveView] = useState<'SHORT' | 'FULL' | 'COUNTER'>('SHORT');

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Text copied to clipboard!');
    };

    // V4 Features: Text Generators
    const generateShortPitch = () => {
        let text = `Hi team, based on your estimated volume of ${(params.V / 1_000_000).toFixed(1)}M USD, we can offer a highly competitive structure.\n\n`;
        if (params.F < 0.0005) {
            text += `🔹 We will immediately map you to an optimized VIP tier (${(params.F * 100).toFixed(3)}%), creating significant taker fee savings.\n`;
        }
        if (params.P > 0) {
            text += `🔹 Your partnership model yields ${(params.P * 100).toFixed(0)}% from the generated fee pool.\n`;
        }
        if (params.R > 0) {
            text += `🔹 A baseline retainer of ${formatCurrency(params.R)} has been secured.\n`;
        }
        text += `\nNext step: Let's do a quick call to review the volume thresholds and map the tier positioning.`;
        return text;
    };

    const generateFullPitch = () => {
        let text = `### SZYMON CRYPTO BRAIN - PARTNERSHIP PROPOSAL\n\n`;
        text += `**1. Volume & VIP Positioning**\n`;
        text += `- Target Verified Volume: ${(params.V / 1_000_000).toFixed(1)}M USD\n`;
        if (params.F < 0.0005) {
            const savings = (params.V * 0.0005) - (params.V * params.F);
            text += `- Standard Fee: 0.05% | Optimized VIP Fee: ${(params.F * 100).toFixed(3)}%\n`;
            text += `- Direct Client Savings: ${formatCurrency(savings)} / month\n\n`;
        } else {
            text += `- Standard Fee Tier applied (0.05%)\n\n`;
        }

        text += `**2. Revenue Structure**\n`;
        text += `- Commission Base: ${(params.P * 100).toFixed(0)}%\n`;
        if (params.useTiers) {
            text += `- Tiered Growth Unlocks available based on consecutive monthly volume.\n`;
        }
        if (params.R > 0 || params.useMilestones) {
            text += `- Support Retainer: ${params.useMilestones ? 'Subject to Milestone conditions' : formatCurrency(params.R)}\n`;
        }

        text += `\n**3. Next Steps**\n`;
        text += `- Review estimated monthly volume\n`;
        text += `- Verify proof-of-volume for day-1 VIP mapping\n`;
        text += `- Evaluate API integration (if relevant)\n`;

        return text;
    };

    const generateCounterOffer = () => {
        let text = `🚨 **COUNTER-OFFER GENERATOR** 🚨\n`;
        text += `Partner requested excessive flat conditions (High rev-share + High base retainer).\n\n`;
        text += `**Recommended Safe Structure:**\n`;
        text += `1. Convert flat retainer into Milestones (Unlock 50% at ${(params.V * 0.5 / 1_000_000).toFixed(1)}M, 100% at ${(params.V / 1_000_000).toFixed(1)}M).\n`;
        text += `2. Lock base commission at 40%, but add a Tier Unlock to 55% at target volume.\n`;
        text += `3. Cap all arbitrary bonuses.\n\n`;
        text += `*Use the button below to instantly apply this defensive mathematical structure to the calculator.*`;
        return text;
    };

    const handleApplySafeStructure = () => {
        if (onApplyCounterOffer) {
            onApplyCounterOffer({
                P: 0.40, // Base fallback
                S: 0,
                R: 0,
                bonusPer1M: 0,
                useTiers: true,
                tiers: [{ threshold: params.V, s: 0.55 }],
                useMilestones: true,
                milestones: [
                    { threshold: params.V * 0.5, r: params.R * 0.5 },
                    { threshold: params.V, r: params.R * 0.5 }
                ]
            });
            alert("Safe Counter-Offer Structure Applied!");
        }
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    OFFER & COUNTER-OFFER GENERATOR
                </h3>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button onClick={() => setActiveView('SHORT')} style={{ padding: '8px 16px', background: activeView === 'SHORT' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.05)', color: activeView === 'SHORT' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Short Pitch</button>
                <button onClick={() => setActiveView('FULL')} style={{ padding: '8px 16px', background: activeView === 'FULL' ? 'var(--accent-purple)' : 'rgba(255,255,255,0.05)', color: activeView === 'FULL' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Full Proposal</button>
                <button onClick={() => setActiveView('COUNTER')} style={{ padding: '8px 16px', background: activeView === 'COUNTER' ? '#f43f5e' : 'rgba(255,255,255,0.05)', color: activeView === 'COUNTER' ? '#fff' : 'var(--text-secondary)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>1-Click Safe Counter</button>
            </div>

            <div style={{ padding: '20px', background: 'var(--bg-dark)', borderRadius: '8px', border: '1px solid var(--border-hover)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {activeView === 'SHORT' && generateShortPitch()}
                {activeView === 'FULL' && generateFullPitch()}
                {activeView === 'COUNTER' && generateCounterOffer()}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                {activeView === 'COUNTER' && (
                    <button onClick={handleApplySafeStructure} style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', cursor: 'pointer', fontWeight: 'bold' }}>
                        Apply Safe Structure
                    </button>
                )}
                <button
                    onClick={() => {
                        const txt = activeView === 'SHORT' ? generateShortPitch() : activeView === 'FULL' ? generateFullPitch() : generateCounterOffer();
                        copyToClipboard(txt);
                    }}
                    style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                    Copy Text
                </button>
            </div>
        </div>
    );
}
