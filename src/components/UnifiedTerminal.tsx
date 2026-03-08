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
import { useCryptoRain, type CoinType } from './SolanaRain';
import { useLanguage } from '../lib/LanguageContext';

type TabId = 'hunter' | 'agency' | 'roast' | 'streamer' | 'trader';

const TABS: { id: TabId; emoji: string; label: string; color: string }[] = [
    { id: 'hunter', emoji: '🎯', label: 'HUNTER', color: '#10b981' },
    { id: 'agency', emoji: '🏢', label: 'AGENCY', color: '#60a5fa' },
    { id: 'streamer', emoji: '📺', label: 'STREAMER', color: '#ec4899' },
    { id: 'trader', emoji: '📈', label: 'TRADER', color: '#a855f7' },
    { id: 'roast', emoji: '🔥', label: 'ROAST', color: '#f97316' },
];

const PRESET_SCENARIOS = [
    { label: "Vanilla Agency", params: { V: 10_000_000, F: 0.035, P: 50, S: 30, R: 0, I: 0, B: 0, safetyThreshold: 15 } },
    { label: "High Rebate Trap", params: { V: 20_000_000, F: 0.04, P: 50, S: 30, R: 20000, I: 5000, B: 0, safetyThreshold: 15 } },
    { label: "Aggressive Hunter", params: { V: 50_000_000, F: 0.04, P: 50, S: 40, R: 0, I: 0, B: 0, safetyThreshold: 15 } },
    { label: "Whale Client (M-Tier)", params: { V: 250_000_000, F: 0.02, P: 50, S: 20, R: 0, I: 0, B: 0, safetyThreshold: 5 } },
];

function Panel({ title, children, tint, noPad }: { title: React.ReactNode; children: React.ReactNode; tint?: string; noPad?: boolean }) {
    return (
        <div className={`bento-item ${tint ? `bento-${tint}` : ''}`} style={{
            padding: noPad ? '14px' : '20px',
            flexShrink: 0,
            minHeight: 'min-content',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {title}
            </h3>
            {children}
        </div>
    );
}

export function UnifiedTerminal() {
    const { language, setLanguage, t } = useLanguage();
    const [activeTab, setActiveTab] = useState<TabId>('hunter');
    const [params, setParams] = useState<DealParams>({
        V: 10_000_000, F: 0.035, P: 50, S: 30,
        R: 0, I: 0, B: 0, safetyThreshold: 15,
    });

    const metrics = useMemo(() => calculateDealMetrics(params), [params]);
    const { RainComponent, triggerRain } = useCryptoRain();
    const [selectedRainCoin, setSelectedRainCoin] = useState<CoinType>('SOL');

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
        <div className="unified-terminal-root">
            {/* MASSIVE VERSION BANNER FOR VERIFICATION */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: '#ff0000', color: '#fff', fontSize: '10px', textAlign: 'center', zIndex: 99999, fontWeight: 900, pointerEvents: 'none', padding: '2px' }}>
                MISSION RECOVERY v5.0 - SYSTEM ACTIVE
            </div>
            <WhaleEffect volume={params.V} />
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
                background: 'linear-gradient(135deg, rgba(20,20,35,0.65) 0%, rgba(10,10,20,0.85) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            }} className="terminal-header">
                <div className="layout-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ flex: 1, minWidth: '100%' }} className="header-title-section">
                        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1.1 }}>
                            {t('title').split(' ')[0]} <span style={{
                                background: 'linear-gradient(90deg, var(--accent-emerald), var(--accent-amber))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>{t('title').split(' ').slice(1).join(' ')}</span>
                        </h1>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-amber)', letterSpacing: '0.15em', marginTop: '2px' }}>
                            {t('subtitle')}
                        </div>
                        <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', marginTop: '4px', textTransform: 'uppercase' }}>
                            {t('topBar.createdBy')} Szymon & Damian
                        </div>
                        <div className="header-actions" style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={() => setLanguage('en')} style={{ background: language === 'en' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px', fontSize: '1rem' }} title="English">🇺🇸</button>
                                <button onClick={() => setLanguage('pl')} style={{ background: language === 'pl' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px', fontSize: '1rem' }} title="Polski">🇵🇱</button>
                                <button onClick={() => setLanguage('hi')} style={{ background: language === 'hi' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px', fontSize: '1rem' }} title="Hindi">🇮🇳</button>
                                <button onClick={() => setLanguage('es')} style={{ background: language === 'es' ? 'rgba(255,255,255,0.15)' : 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px', padding: '2px 6px', fontSize: '1rem' }} title="Español">🇪🇸</button>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <a href="https://t.me/ostryopos" target="_blank" rel="noreferrer" className="storm-btn" style={{ fontSize: '0.7rem', fontWeight: 800, padding: '6px 16px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}>
                                    ✈️ DM @ostryopos
                                </a>
                                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('App URL copied to clipboard!'); }} className="storm-btn" style={{ fontSize: '0.7rem', fontWeight: 800, padding: '6px 16px', background: 'rgba(255, 255, 255, 0.08)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}>
                                    🔗 {t('shareSetup')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', width: '100%' }} className="header-controls">
                        <select
                            onChange={(e) => {
                                if (e.target.value) setParams(PRESET_SCENARIOS[parseInt(e.target.value)].params);
                            }}
                            defaultValue=""
                            className="storm-btn"
                            style={{ fontSize: '0.65rem', padding: '0 12px', height: '28px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', outline: 'none', cursor: 'pointer', fontWeight: 600, backdropFilter: 'blur(10px)', width: 'auto' }}
                        >
                            <option value="" disabled>{t('topBar.loadParams')}</option>
                            {PRESET_SCENARIOS.map((s, i) => (
                                <option key={i} value={i} style={{ background: '#1e1e22' }}>{s.label}</option>
                            ))}
                        </select>

                        <div style={{ display: 'flex', gap: '2px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
                            <select
                                value={selectedRainCoin}
                                onChange={(e) => setSelectedRainCoin(e.target.value as CoinType)}
                                className="storm-btn"
                                style={{
                                    fontSize: '0.65rem', padding: '0 8px', height: '28px',
                                    background: 'transparent', border: 'none',
                                    color: 'white', outline: 'none', cursor: 'pointer',
                                    fontWeight: 600, width: 'auto', borderRadius: 0
                                }}
                            >
                                <option value="SOL">SOL</option>
                                <option value="BTC">BTC</option>
                                <option value="ETH">ETH</option>
                                <option value="DOGE">DOGE</option>
                                <option value="XRP">XRP</option>
                            </select>
                            <button
                                className="storm-btn"
                                data-variant="hunter"
                                style={{
                                    fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '6px',
                                    height: '28px', border: 'none', borderRadius: 0,
                                    background: 'rgba(16, 185, 129, 0.2)', color: '#10b981',
                                    padding: '0 12px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                                onClick={() => triggerRain(selectedRainCoin)}
                            >
                                {t('topBar.rain').replace('{coin}', selectedRainCoin)}
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} className="header-chips">
                        {[
                            { label: t(`panels.scoreDesc.${metrics.status === 'BLOCKED' ? 'blocked' : metrics.status === 'SAFE' ? 'safe' : metrics.status === 'WARNING' ? 'warn' : 'crit'}`), color: sColor, glow: sColor },
                            { label: t('topBar.score').replace('{val}', dealScore.toString()), color: 'var(--accent-amber)', glow: 'var(--accent-amber)' },
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
                overflowX: 'auto',
                flexWrap: 'wrap'
            }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', marginRight: '8px' }}>{t('tabs.MODE')}</span>
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
            <div className="terminal-content">

                {/* LEFT SIDEBAR */}
                <div className="layout-main-content">
                    {['hunter', 'streamer', 'trader'].includes(activeTab) && (
                        <div className="layout-sidebar">
                            <Panel title={`🎚️ ${t('sim.params')}`}>
                                <DealSimulator params={params} updateParam={updateParam} />
                            </Panel>
                            <Panel title={`📑 ${t('panels.templates')}`} noPad>
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
                            <Panel title={`🛡️ ${t('panels.safety')}`} noPad>
                                <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                            </Panel>
                            <Panel title={`📖 ${t('panels.glossary')}`} noPad>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', minHeight: '100px' }}>
                                    <Glossary />
                                </div>
                            </Panel>
                            <div style={{ height: '40px' }} /> {/* Extra space at bottom of sidebar */}

                        </div>
                    )}

                    {/* RIGHT CONTENT */}
                    <div className="layout-main">

                        {/* ─── HUNTER / STREAMER / TRADER TABS ─── */}
                        {['hunter', 'streamer', 'trader'].includes(activeTab) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                    <Panel title={`🚨 ${t('panels.scoreEngine')}`} tint="hunter">
                                        <DealScore params={params} metrics={metrics} />
                                    </Panel>
                                    <Panel title={`⚠️ ${t('panels.warnings')}`} tint="warning">
                                        <StructuralWarnings params={params} metrics={metrics} />
                                    </Panel>
                                </div>
                                <Panel title={`📊 ${t('panels.financials')}`}>
                                    <FinancialSnapshot params={params} metrics={metrics} />
                                </Panel>
                                <Panel title={`📈 ${t('panels.projections')}`}>
                                    <MinimalCharts params={params} />
                                </Panel>
                                <Panel title="⛈️ Stress Tests" tint="danger">
                                    <StressTests baseParams={params} />
                                </Panel>
                                <Panel title={`🌡️ ${t('panels.heatmap')}`}>
                                    <Heatmap params={params} />
                                </Panel>
                                <Panel title={`🤖 ${t('panels.assistant')}`} tint="blue">
                                    <DealAssistant params={params} metrics={metrics} dealScore={dealScore} />
                                </Panel>
                            </div>
                        )}

                        {/* ─── AGENCY TAB ─── */}
                        {activeTab === 'agency' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                    <Panel title={`📊 ${t('panels.financials')}`} tint="blue">
                                        <FinancialSnapshot params={params} metrics={metrics} />
                                    </Panel>
                                    <Panel title={`🤝 ${t('panels.partnerEcon')}`}>
                                        <PartnerRevenueSim params={params} metrics={metrics} />
                                    </Panel>
                                </div>
                                <Panel title={`💬 ${t('panels.proposal')}`} tint="purple">
                                    <ProposalGenerator params={params} />
                                </Panel>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                    <Panel title={`📝 ${t('panels.executive')}`}>
                                        <ExecutiveSummary params={params} metrics={metrics} />
                                    </Panel>
                                    <Panel title={`📖 ${t('panels.rulebook')}`} tint="purple">
                                        <NegotiationRulebook />
                                    </Panel>
                                </div>
                                <Panel title={`🏅 ${t('panels.score')}`}>
                                    <DealScore params={params} metrics={metrics} />
                                </Panel>
                            </div>
                        )}

                        {/* ─── ROAST TAB ─── */}
                        {activeTab === 'roast' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Panel tint="roast" title={`🔥 ${t('panels.roastMode')}`}>
                                    <DealRoast params={params} metrics={metrics} dealScore={dealScore} />
                                </Panel>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: 0 }} className="terminal-grid">
                                    <Panel title={`🚨 ${t('panels.breakdown')}`}>
                                        <DealScore params={params} metrics={metrics} />
                                    </Panel>
                                    <Panel title={`⚠️ ${t('panels.warnings')}`} tint="warning">
                                        <StructuralWarnings params={params} metrics={metrics} />
                                    </Panel>
                                </div>
                                <Panel title="⛈️ Stress Tests — is your deal cooked?" tint="danger">
                                    <StressTests baseParams={params} />
                                </Panel>
                            </div>
                        )}

                        <div style={{ marginTop: '20px', paddingBottom: '20px', textAlign: 'center', color: 'rgba(255,255,255,1)', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'rgba(255,0,0,0.1)', padding: '10px' }}>
                            MISSION RECOVERY v5.0 · PRO CLEAN · NO GITARA · {tab.emoji} {tab.label.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
