import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDealSimulator } from './hooks/useDealSimulator';
import { CryptoTicker } from './components/CryptoTicker';
import { DealSimulator } from './components/SimulatorPro';
import { FinancialSnapshot } from './components/FinancialSnapshot';
import { MinimalCharts } from './components/MinimalCharts';
import { DealScore } from './components/DealScore';
import { StressTests } from './components/StressTests';
import { Heatmap } from './components/Heatmap';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ProposalGenerator } from './components/ProposalGenerator';
import { StructuralWarnings } from './components/StructuralWarnings';
import { NegotiationRulebook } from './components/NegotiationRulebook';
import { PartnerRevenueSim } from './components/PartnerRevenueSim';
import { DealTemplates } from './components/DealTemplates';
import { MarginSafetyLock } from './components/MarginSafetyLock';
import './index.css';

export default function App() {
  const { params, metrics, updateParam, setParams } = useDealSimulator();

  // Set default values on mount
  useEffect(() => {
    setParams({
      V: 10_000_000,
      F: 0.035,
      P: 50,
      S: 30,
      R: 0,
      I: 0,
      B: 0,
      safetyThreshold: 15
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <header className="brand-header" style={{ padding: '16px 32px', borderBottom: '1px solid #1f2937', background: '#0B0F19' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.05em' }}>SZYMON CRYPTO BRAIN</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.1em', marginTop: '4px' }}>
            PUBLIC BD ANALYTICAL TERMINAL
          </p>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
          <div className="terminal-view">
            <CryptoTicker />

            <div style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(59,130,246,0.1) 0%, transparent 100%)', borderBottom: '1px solid #1f2937' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', color: '#fff' }}>
                Bloomberg Terminal for <span style={{ color: 'var(--accent-blue)' }}>Crypto BD</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
                Pure analytical modelling. No accounts. No AI. Just cold economics.
              </p>
            </div>

            <div className="page-layout" style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
              <div className="bento-grid">
                {/* 1. INPUTS */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 4' }}>
                  <h3 className="module-title"><span>🎛️</span> 1. DEAL SIMULATOR</h3>
                  <DealSimulator params={params} updateParam={updateParam} />
                </div>

                {/* 2. CORE MATH */}
                <div className="bento-item" style={{ gridColumn: 'span 8', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📊</span> 2. FINANCIAL SNAPSHOT</h3>
                  <FinancialSnapshot metrics={metrics} />
                </div>

                {/* 3. VISUALS */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📈</span> 3. PERFORMANCE CHARTS</h3>
                  <MinimalCharts params={params} />
                </div>

                {/* 4. RISK SCORE */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>🚨</span> 4. DEAL SCORE</h3>
                  <DealScore metrics={metrics} />
                </div>

                {/* 5. STRESS TESTS */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>⛈️</span> 5. STRESS TESTS</h3>
                  <StressTests baseParams={params} />
                </div>

                {/* 6. HEATMAP */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                  <h3 className="module-title"><span>🌡️</span> 6. SENSITIVITY HEATMAP</h3>
                  <Heatmap params={params} />
                </div>

                {/* 9. STRUCTURAL WARNINGS */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                  <h3 className="module-title"><span>⚠️</span> 9. STRUCTURAL WARNINGS</h3>
                  <StructuralWarnings params={params} metrics={metrics} />
                </div>

                {/* 10. PARTNER REVENUE */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>🤝</span> 10. PARTNER REVENUE SIM</h3>
                  <PartnerRevenueSim params={params} metrics={metrics} />
                </div>

                {/* 7. TEMPLATES */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📑</span> 7. DEAL TEMPLATES</h3>
                  <DealTemplates applyParams={(newParams) => {
                    setParams(prev => ({ ...prev, ...newParams }));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }} />
                </div>

                {/* 8. SUMMARY */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                  <h3 className="module-title"><span>📃</span> 8. EXECUTIVE SUMMARY</h3>
                  <ExecutiveSummary params={params} metrics={metrics} />
                </div>

                {/* 11. RULEBOOK */}
                <div className="bento-item" style={{ gridColumn: 'span 4', gridRow: 'span 3' }}>
                  <h3 className="module-title"><span>📖</span> 11. NEGOTIATION RULEBOOK</h3>
                  <NegotiationRulebook />
                </div>

                {/* PROPOSALS */}
                <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>💬</span> TACTICAL PROPOSAL GENERATOR</h3>
                  <ProposalGenerator params={params} />
                </div>

                {/* SAFETY GUARD */}
                <div className="bento-item" style={{ gridColumn: 'span 12' }}>
                  <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}
