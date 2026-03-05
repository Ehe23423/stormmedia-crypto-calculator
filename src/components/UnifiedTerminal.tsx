import React, { useState, useMemo } from 'react';
import { calculateDealMetrics, DealParams, DealResult } from '../model/DealModel';
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
import { PartnerRevenueSim } from './PartnerRevenueSim';
import { DealTemplates } from './DealTemplates';
import { MarginSafetyLock } from './MarginSafetyLock';

export const UnifiedTerminal: React.FC = () => {
    const [params, setParams] = useState<DealParams>({
        V: 10_000_000,
        F: 0.035,
        P: 50,
        S: 30,
        R: 0,
        I: 0,
        B: 0,
        safetyThreshold: 15
    });

    const metrics = useMemo(() => calculateDealMetrics(params), [params]);

    const updateParam = (key: keyof DealParams, val: any) => {
        setParams(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="unified-terminal" style={{
            background: 'var(--bg-dark)',
            minHeight: '100vh',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-main)'
        }}>
            {/* 1. TICKER LAYER */}
            <CryptoTicker />

            {/* 2. HERO HEADER */}
            <div style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--border-glass)',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px', margin: 0 }}>
                            SZYMON <span style={{ color: 'var(--accent-blue)' }}>CRYPTO</span> BRAIN
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', letterSpacing: '0.05em', marginTop: '1px', textTransform: 'uppercase' }}>
                            Analytical Terminal V3.0
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>System Status</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.9rem' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--accent-emerald)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-emerald)' }} />
                            ENGINE ONLINE (V3.0)
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. CORE DASHBOARD BENTO */}
            <main style={{ padding: '20px', maxWidth: '1800px', margin: '0 auto' }}>
                <div className="bento-grid" style={{ gap: '16px' }}>

                    {/* INPUT SECTION - THE BRAIN */}
                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 5', minHeight: '600px' }}>
                        <h3 className="module-title"><span>🎚️</span> Parameter Control</h3>
                        <DealSimulator params={params} updateParam={updateParam} />

                        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
                            <h3 className="module-title" style={{ fontSize: '0.9rem' }}><span>🛡️</span> Safety Protocol</h3>
                            <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <h3 className="module-title" style={{ fontSize: '0.9rem' }}><span>📑</span> Quick Templates</h3>
                            <DealTemplates applyParams={p => setParams(prev => ({ ...prev, ...p }))} />
                        </div>
                    </div>

                    {/* RESULTS SECTION - THE NUMBERS */}
                    <div className="bento-item" style={{ gridColumn: 'span 5', gridRow: 'span 2' }}>
                        <h3 className="module-title"><span>📊</span> Financial Summary</h3>
                        <FinancialSnapshot metrics={metrics} />
                    </div>

                    {/* RISK SECTION - THE SCORE */}
                    <div className="bento-item" style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
                        <h3 className="module-title"><span>🚨</span> Deal Score</h3>
                        <DealScore metrics={metrics} />
                    </div>

                    {/* VISUALS SECTION - CHARTS */}
                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>📈</span> Volume Projections</h3>
                        <MinimalCharts params={params} />
                    </div>

                    {/* WARNINGS LAYER */}
                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>⚠️</span> Structural Warnings</h3>
                        <StructuralWarnings params={params} metrics={metrics} />
                    </div>

                    {/* HEATMAP LAYER */}
                    <div className="bento-item" style={{ gridColumn: 'span 8', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>🌡️</span> Sensitivity Analysis</h3>
                        <Heatmap params={params} />
                    </div>

                    {/* PROPOSAL LAYER */}
                    <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
                        <h3 className="module-title" style={{ color: 'var(--accent-cyan)' }}><span>💬</span> Negotiation Proposal Generator</h3>
                        <ProposalGenerator params={params} />
                    </div>

                    {/* BOTTOM DEEP-DIVE LAYER */}
                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>🤝</span> Partner Side Economics</h3>
                        <PartnerRevenueSim params={params} metrics={metrics} />
                    </div>

                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>📖</span> BD Rulebook</h3>
                        <NegotiationRulebook />
                    </div>

                    <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                        <h3 className="module-title"><span>⛈️</span> Stress Tests</h3>
                        <StressTests baseParams={params} />
                    </div>

                </div>
            </main>

            {/* 4. FOOTER */}
            <footer style={{
                padding: '24px 32px',
                borderTop: '1px solid var(--border-light)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                letterSpacing: '0.05em'
            }}>
                STORMMEDIA ANALYTICAL TERMINAL V3.0 // NO AUTH // NO PERSISTENCE // PURE MATH
            </footer>
        </div>
    );
};
