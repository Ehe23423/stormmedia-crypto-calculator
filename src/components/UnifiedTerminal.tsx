import React, { useState, useMemo } from 'react';
import { calculateDealMetrics } from '../model/DealModel';
import type { DealParams } from '../model/DealModel';
import { CryptoTicker } from './CryptoTicker';
import { FinancialSnapshot } from './FinancialSnapshot';
import { DealSimulator } from './SimulatorPro';
import { MinimalCharts } from './MinimalCharts';
import { DealScore } from './DealScore';
import { StressTests } from './StressTests';
import { Heatmap } from './Heatmap';
import { ExecutiveSummary } from './ExecutiveSummary';
import { ProposalGenerator } from './ProposalGenerator';
import { StructuralWarnings } from './StructuralWarnings';
import { NegotiationRulebook } from './NegotiationRulebook';
import { MarginSafetyLock } from './MarginSafetyLock';



import { PartnerRevenueSim } from './PartnerRevenueSim';
import { DealRoast } from './DealRoast';
import { DealAssistant } from './DealAssistant';

type TabId = 'hunter' | 'agency' | 'roast';

const TABS: { id: TabId; emoji: string; label: string; color: string }[] = [
    { id: 'hunter', emoji: '🎯', label: 'HUNTER', color: '#10b981' },
    { id: 'agency', emoji: '🏢', label: 'AGENCY', color: '#60a5fa' },
    { id: 'roast', emoji: '🔥', label: 'ROAST', color: '#f97316' },
];

// Tint styles per variant
const TINTS: Record<string, React.CSSProperties> = {
    hunter: { borderColor: 'rgba(16,185,129,0.25)', background: 'linear-gradient(135deg,rgba(16,185,129,0.06) 0%,rgba(17,24,39,0.6) 100%)' },
    blue: { borderColor: 'rgba(96,165,250,0.25)', background: 'linear-gradient(135deg,rgba(59,130,246,0.07) 0%,rgba(17,24,39,0.6) 100%)' },
    purple: { borderColor: 'rgba(167,139,250,0.25)', background: 'linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(17,24,39,0.6) 100%)' },
    warning: { borderColor: 'rgba(245,158,11,0.3)', background: 'linear-gradient(135deg,rgba(245,158,11,0.06) 0%,rgba(17,24,39,0.6) 100%)' },
    danger: { borderColor: 'rgba(239,68,68,0.3)', background: 'linear-gradient(135deg,rgba(239,68,68,0.06) 0%,rgba(17,24,39,0.6) 100%)' },
    roast: { borderColor: 'rgba(249,115,22,0.35)', background: 'linear-gradient(135deg,rgba(249,115,22,0.08) 0%,rgba(239,68,68,0.04) 50%,rgba(17,24,39,0.6) 100%)' },
};

// Panel wrapper
function Panel({ title, children, tint, noPad }: { title: React.ReactNode; children: React.ReactNode; tint?: string; noPad?: boolean }) {
    return (
        <div style={{
            background: 'rgba(17,24,39,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: noPad ? '14px' : '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
            ...(tint ? TINTS[tint] : {}),
        }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: noPad ? '10px' : '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {title}
            </div>
            {children}
        </div>
    );
}

export const UnifiedTerminal: React.FC = () => {
    const [params, setParams] = useState<DealParams>({
        V: 10_000_000, F: 0.035, P: 50, S: 30,
        R: 0, I: 0, B: 0, safetyThreshold: 15,
    });
    const [activeTab, setActiveTab] = useState<TabId>('hunter');

    const metrics = useMemo(() => calculateDealMetrics(params), [params]);

    const dealScore = useMemo(() => {
        const buf = metrics.marginBuffer * 100;
        const mS = buf >= 30 ? 25 : buf >= 15 ? ((buf - 15) / 15) * 25 : (buf / 15) * 25;
        const tS = params.S < 40 ? 15 : params.S <= 50 ? ((50 - params.S) / 10) * 15 : 0;
        const np = metrics.netProfit;
        const rS = np <= 0 ? 0 : params.R <= 0 ? 15 : params.R > np ? 0 : params.R < np * 0.45 ? 15 : ((np - params.R) / (np - np * 0.45)) * 15;
        const beq = (params.B / 350) * 100;
        const bS = beq < 15 ? 15 : beq <= 30 ? ((30 - beq) / 15) * 15 : 0;
        const sm = calculateDealMetrics({ ...params, F: 0.028 });
        const fS = sm.netProfit > 0 ? 15 : sm.netProfit === 0 ? 7 : 0;
        return Math.min(100, Math.round(mS + tS + rS + bS + fS + 10));
    }, [params, metrics]);

    const updateParam = (key: keyof DealParams, val: any) =>
        setParams(prev => ({ ...prev, [key]: val }));

    const sColor = metrics.status === 'SAFE' ? '#10b981' : metrics.status === 'WARNING' ? '#f59e0b' : '#ef4444';
    const tab = TABS.find(t => t.id === activeTab)!;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden',
            background: 'var(--bg-dark)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-main)',
        }}>

            {/* ══ TICKER ══ */}
            <div style={{ flexShrink: 0 }}>
                <CryptoTicker />
            </div>

            {/* ══ HEADER ══ */}
            <div style={{
                flexShrink: 0,
                padding: '10px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: 'linear-gradient(135deg,rgba(139,92,246,0.05) 0%,rgba(0,0,0,0.3) 100%)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
            }} className="terminal-header">
                <div>
                    <h1 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, letterSpacing: '0.08em' }}>
                        SZYMON{' '}
                        <span style={{ background: 'linear-gradient(90deg,#3b82f6,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CRYPTO</span>
                        {' '}BRAIN
                    </h1>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(148,163,184,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
                        Institutional BD Terminal · 64-Module Engine
                    </div>
                    <div style={{ fontSize: '0.45rem', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginTop: '4px', textTransform: 'uppercase' }}>
                        Stworzone przez Szymon Białek z pomocą Damian Siodłak · Strona niepowiązana z BingX
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {[
                        { label: metrics.status, color: sColor },
                        { label: `Score ${dealScore}/100`, color: '#fff' },
                        { label: `V $${(params.V / 1e6).toFixed(1)}M`, color: '#94a3b8' },
                    ].map(chip => (
                        <div key={chip.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '3px 10px', fontSize: '0.65rem', fontWeight: 700, color: chip.color, whiteSpace: 'nowrap' }}>
                            {chip.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ══ TABS ══ */}
            <div style={{
                flexShrink: 0,
                display: 'flex', gap: '6px', padding: '8px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)',
                alignItems: 'center',
            }}>
                <span style={{ fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginRight: '4px' }}>MODE</span>
                {TABS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        style={{
                            padding: '6px 14px', borderRadius: '8px', cursor: 'pointer',
                            border: activeTab === t.id ? `1px solid ${t.color}60` : '1px solid rgba(255,255,255,0.07)',
                            background: activeTab === t.id ? `${t.color}1a` : 'rgba(255,255,255,0.02)',
                            color: activeTab === t.id ? t.color : 'rgba(255,255,255,0.38)',
                            fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em',
                            transition: 'all 0.15s', fontFamily: 'var(--font-main)',
                            boxShadow: activeTab === t.id ? `0 0 12px ${t.color}25` : 'none',
                        }}
                    >
                        {t.emoji} {t.label}
                    </button>
                ))}
            </div>

            {/* ══ BODY ══ */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }} className="terminal-content">

                {/* LEFT SIDEBAR */}
                <div style={{
                    width: '290px',
                    flexShrink: 0,
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    overflowY: 'auto',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    background: 'rgba(0,0,0,0.12)',
                }} className="layout-sidebar">
                    <Panel title="🎚️ Parameters">
                        <DealSimulator params={params} updateParam={updateParam} />
                    </Panel>
                    <Panel title="📑 Quick Templates" noPad>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {[
                                { name: '🛡️ Conservative', params: { V: 5000000, F: 0.035, P: 40, S: 30, R: 0, I: 0, B: 0 } },
                                { name: '⚖️ Balanced', params: { V: 15000000, F: 0.035, P: 50, S: 37, R: 1200, I: 500, B: 50 } },
                                { name: '🔥 Aggressive', params: { V: 30000000, F: 0.035, P: 60, S: 45, R: 1800, I: 800, B: 100 } },
                            ].map(t => (
                                <button
                                    key={t.name}
                                    onClick={() => setParams(prev => ({ ...prev, ...t.params }))}
                                    style={{
                                        width: '100%', textAlign: 'left', padding: '8px 12px',
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem',
                                        fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-main)',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="🛡️ Safety Protocol" noPad>
                        <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                    </Panel>

                </div>

                {/* RIGHT CONTENT */}
                <div style={{ flex: 1, overflowY: 'auto', minWidth: 0, padding: '14px' }} className="layout-main">

                    {/* ─── HUNTER TAB ─── */}
                    {activeTab === 'hunter' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                <Panel title="🚨 Deal Score Engine" tint="hunter">
                                    <DealScore params={params} metrics={metrics} />
                                </Panel>
                                <Panel title="⚠️ Structural Warnings" tint="warning">
                                    <StructuralWarnings params={params} metrics={metrics} />
                                </Panel>
                            </div>
                            <Panel title="📊 Financial Snapshot">
                                <FinancialSnapshot params={params} metrics={metrics} />
                            </Panel>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                <Panel title="📈 Volume Projections">
                                    <MinimalCharts params={params} />
                                </Panel>
                                <Panel title="⛈️ Stress Tests" tint="danger">
                                    <StressTests baseParams={params} />
                                </Panel>
                            </div>
                            <Panel title="🌡️ Sensitivity Heatmap">
                                <Heatmap params={params} />
                            </Panel>
                            <Panel title="🤖 BD Deal Assistant" tint="blue">
                                <DealAssistant params={params} metrics={metrics} dealScore={dealScore} />
                            </Panel>
                        </div>
                    )}

                    {/* ─── AGENCY TAB ─── */}
                    {activeTab === 'agency' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                <Panel title="📊 Financial Snapshot" tint="blue">
                                    <FinancialSnapshot params={params} metrics={metrics} />
                                </Panel>
                                <Panel title="🤝 Partner Side Economics">
                                    <PartnerRevenueSim params={params} metrics={metrics} />
                                </Panel>
                            </div>
                            <Panel title="💬 Negotiation Proposal Generator" tint="purple">
                                <ProposalGenerator params={params} />
                            </Panel>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                <Panel title="📝 Executive Summary">
                                    <ExecutiveSummary params={params} metrics={metrics} />
                                </Panel>
                                <Panel title="📖 BD Rulebook" tint="purple">
                                    <NegotiationRulebook />
                                </Panel>
                            </div>
                            <Panel title="🏅 Deal Score Breakdown">
                                <DealScore params={params} metrics={metrics} />
                            </Panel>
                        </div>
                    )}

                    {/* ─── ROAST TAB ─── */}
                    {activeTab === 'roast' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Panel tint="roast" title={<>🔥 Deal Roast Mode <span style={{ fontSize: '0.55rem', fontWeight: 400, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', marginLeft: 8, textTransform: 'none', letterSpacing: 0 }}>na granicy dobrego smaku</span></>}>
                                <DealRoast params={params} metrics={metrics} dealScore={dealScore} />
                            </Panel>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                <Panel title="🚨 Score Breakdown">
                                    <DealScore params={params} metrics={metrics} />
                                </Panel>
                                <Panel title="⚠️ Structural Warnings" tint="warning">
                                    <StructuralWarnings params={params} metrics={metrics} />
                                </Panel>
                            </div>
                            <Panel title="⛈️ Stress Tests — is your deal cooked?" tint="danger">
                                <StressTests baseParams={params} />
                            </Panel>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ marginTop: '20px', paddingBottom: '8px', textAlign: 'center', color: 'rgba(255,255,255,0.12)', fontSize: '0.52rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        STORMMEDIA BD ENGINE · {tab.emoji} {tab.label} · V4.0 · BINGX
                    </div>
                </div>
            </div>
        </div>
    );
};
