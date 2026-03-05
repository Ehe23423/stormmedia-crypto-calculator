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
import { Glossary } from './Glossary';
import { PartnerRevenueSim } from './PartnerRevenueSim';
import { DealRoast } from './DealRoast';
import { DealAssistant } from './DealAssistant';
import { WhaleEffect } from './WhaleEffect';
import { useSolanaRain } from './SolanaRain';

type TabId = 'hunter' | 'agency' | 'roast';

const TABS: { id: TabId; emoji: string; label: string; color: string }[] = [
    { id: 'hunter', emoji: '🎯', label: 'HUNTER', color: '#10b981' },
    { id: 'agency', emoji: '🏢', label: 'AGENCY', color: '#60a5fa' },
    { id: 'roast', emoji: '🔥', label: 'ROAST', color: '#f97316' },
];

const TINTS: Record<string, React.CSSProperties> = {
    hunter: { borderColor: 'rgba(80,250,123,0.3)', background: 'linear-gradient(135deg,rgba(80,250,123,0.08) 0%,rgba(26,25,45,0.9) 100%)' },
    blue: { borderColor: 'rgba(139,233,253,0.3)', background: 'linear-gradient(135deg,rgba(139,233,253,0.08) 0%,rgba(26,25,45,0.9) 100%)' },
    purple: { borderColor: 'rgba(189,147,249,0.3)', background: 'linear-gradient(135deg,rgba(189,147,249,0.1) 0%,rgba(26,25,45,0.9) 100%)' },
    warning: { borderColor: 'rgba(255,184,108,0.3)', background: 'linear-gradient(135deg,rgba(255,184,108,0.08) 0%,rgba(26,25,45,0.9) 100%)' },
    danger: { borderColor: 'rgba(255,85,85,0.3)', background: 'linear-gradient(135deg,rgba(255,85,85,0.08) 0%,rgba(26,25,45,0.9) 100%)' },
    roast: { borderColor: 'rgba(255,184,108,0.4)', background: 'linear-gradient(135deg,rgba(255,184,108,0.1) 0%,rgba(255,85,85,0.05) 50%,rgba(26,25,45,0.9) 100%)' },
};

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
            flexShrink: 0,
            minHeight: 'min-content',
            display: 'flex',
            flexDirection: 'column'
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
    const { RainComponent, triggerRain } = useSolanaRain();

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
            <WhaleEffect isWhale={params.V >= 200000000} />
            {RainComponent}

            {/* ══ TICKER ══ */}
            <div style={{ flexShrink: 0 }}>
                <CryptoTicker />
            </div>

            {/* ══ HEADER ══ */}
            <div style={{
                flexShrink: 0,
                padding: '12px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                background: 'linear-gradient(135deg,rgba(139,92,246,0.08) 0%,rgba(0,0,0,0.4) 100%)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
            }} className="terminal-header">
                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.05em' }}>
                        BD <span style={{ color: 'var(--accent-purple)' }}>BRAIN</span>
                    </h1>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '4px' }}>
                        First Ever Exchange deal calculator for Crypto Business developers - one to help us all
                    </div>
                    <div style={{ fontSize: '0.55rem', color: 'var(--accent-emerald)', fontWeight: 700, marginTop: '2px', opacity: 0.8 }}>
                        TELEGRAM: @ostryopos
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                        className="storm-btn"
                        data-variant="hunter"
                        style={{ fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={triggerRain}
                    >
                        <svg width="18" height="18" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none">
                                <circle fill="#14F195" cx="16" cy="16" r="16" />
                                <path d="M9.925 19.687a.59.59 0 01.415-.17h14.366a.29.29 0 01.207.497l-2.838 2.815a.59.59 0 01-.415.171H7.294a.291.291 0 01-.207-.498l2.838-2.815zm0-10.517A.59.59 0 0110.34 9h14.366c.261 0 .392.314.207.498l-2.838 2.815a.59.59 0 01-.415.17H7.294a.291.291 0 01-.207-.497L9.925 9.17zm12.15 5.225a.59.59 0 00-.415-.17H7.294a.291.291 0 00-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 00.207-.498l-2.838-2.815z" fill="#FFF" />
                            </g>
                        </svg>
                        MAKE IT RAIN SOL
                    </button>
                    <div style={{ display: 'flex', gap: '6px' }} className="header-chips">
                        {[
                            { label: metrics.status, color: sColor, glow: sColor },
                            { label: `Score ${dealScore}/100`, color: 'var(--accent-amber)', glow: 'var(--accent-amber)' },
                            { label: `V $${(params.V / 1e6).toFixed(1)}M`, color: 'var(--accent-blue)', glow: 'var(--accent-blue)' },
                        ].map(chip => (
                            <div key={chip.label} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '4px 12px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#ffffff',
                                whiteSpace: 'nowrap',
                                boxShadow: `0 0 16px ${chip.glow}40, inset 0 0 12px ${chip.glow}25`,
                                textShadow: `0 1px 3px rgba(0,0,0,1), 0 0 6px ${chip.glow}`,
                                border: `1px solid ${chip.glow}66`,
                                borderRadius: '6px',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', inset: 0, borderRadius: '6px', background: `linear-gradient(45deg, ${chip.glow}22, transparent)`, pointerEvents: 'none' }} />
                                {chip.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ TABS ══ */}
            <div className="tab-container" style={{
                flexShrink: 0,
                display: 'flex', gap: '8px', padding: '8px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)',
                alignItems: 'center',
                overflowX: 'auto'
            }}>
                <span style={{ fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.2)', textTransform: 'uppercase', marginRight: '4px' }}>MODE</span>
                {TABS.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`storm-btn ${activeTab === t.id ? 'active' : ''}`}
                        data-variant={t.id}
                        style={{ padding: '8px 16px', fontSize: '0.7rem' }}
                    >
                        {t.emoji} {t.label}
                    </button>
                ))}
            </div>

            {/* ══ BODY ══ */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }} className="terminal-content">

                {/* LEFT SIDEBAR */}
                <div style={{
                    width: '300px',
                    flexShrink: 0,
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    background: 'rgba(0,0,0,0.18)',
                    scrollbarWidth: 'none',
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
                                    className="storm-btn"
                                    style={{
                                        width: '100%', justifyContent: 'flex-start', padding: '10px 14px',
                                        fontSize: '0.7rem', background: 'rgba(255,255,255,0.03)'
                                    }}
                                >
                                    {t.name}
                                </button>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="🛡️ Safety Protocol" noPad>
                        <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                    </Panel>
                    <Panel title="📖 Terminal Glossary" noPad>
                        <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', minHeight: '100px' }}>
                            <Glossary />
                        </div>
                    </Panel>
                    <div style={{ height: '40px' }} /> {/* Extra space at bottom of sidebar */}

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
                    <div style={{ marginTop: '20px', paddingBottom: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        SZYMON CRYPTO BRAIN ACTIVE · {tab.emoji} {tab.label} · V4.2 PRO · TERMINAL ACTIVE
                    </div>
                </div>
            </div>
        </div>
    );
};
