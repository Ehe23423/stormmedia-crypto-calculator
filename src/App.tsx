import { useState, useEffect } from 'react';
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
import { ScenarioBuilder } from './components/AIAssistant';
import { DealTemplates } from './components/DealTemplates';
import { MarginSafetyLock } from './components/MarginSafetyLock';
import './index.css';

export default function App() {
  const { params, metrics, updateParam, setParams } = useDealSimulator();
  const [roastMode, setRoastMode] = useState(false);

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
            PUBLIC PARTNERSHIP INTELLIGENCE TERMINAL
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setRoastMode(!roastMode)}
            style={{ background: roastMode ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${roastMode ? 'var(--accent-pink)' : 'var(--border-light)'}`, color: roastMode ? 'var(--accent-pink)' : 'var(--text-secondary)', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
          >
            {roastMode ? '🔥 ROAST ON' : '🧊 ROAST OFF'}
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
          <div className={`${roastMode ? 'roast-active' : ''}`}>
            <CryptoTicker />

            <div style={{ padding: '60px 20px', textAlign: 'center', background: 'linear-gradient(180deg, rgba(59,130,246,0.1) 0%, transparent 100%)', borderBottom: '1px solid #1f2937' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', color: '#fff' }}>
                Bloomberg Terminal for <span style={{ color: 'var(--accent-blue)' }}>Crypto Partnerships</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
                Simulate exchange deals with the ultimate BD intelligence machine. Instant math, risk verdicts, and tactical proposals.
              </p>
            </div>

            <div className="page-layout" style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
              <div className="bento-grid">
                <div className="bento-item" style={{ gridColumn: 'span 5', gridRow: 'span 4' }}>
                  <h3 className="module-title"><span>🎛️</span> DEAL SIMULATOR</h3>
                  <DealSimulator params={params} updateParam={updateParam} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 7', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📊</span> FINANCIAL SNAPSHOT</h3>
                  <FinancialSnapshot metrics={metrics} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 7', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📈</span> PERFORMANCE CHARTS</h3>
                  <MinimalCharts params={params} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 7', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>🚨</span> RISK ENGINE</h3>
                  <DealScore metrics={metrics} forcedRoastMode={roastMode} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 5', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>⛈️</span> STRESS TESTS</h3>
                  <StressTests baseParams={params} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 5', gridRow: 'span 3' }}>
                  <h3 className="module-title"><span>🌡️</span> SENSITIVITY HEATMAP</h3>
                  <Heatmap params={params} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 7', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📃</span> EXECUTIVE SUMMARY</h3>
                  <ExecutiveSummary params={params} metrics={metrics} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>🧩</span> SCENARIO BUILDER</h3>
                  <ScenarioBuilder params={params} metrics={metrics} updateParam={updateParam} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>💬</span> PROPOSAL GENERATOR</h3>
                  <ProposalGenerator params={params} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 12' }}>
                  <MarginSafetyLock value={params.safetyThreshold} onChange={v => updateParam('safetyThreshold', v)} />
                </div>

                <div className="bento-item" style={{ gridColumn: 'span 12', gridRow: 'span 2' }}>
                  <h3 className="module-title"><span>📑</span> DEAL TEMPLATES</h3>
                  <DealTemplates applyParams={(newParams) => {
                    setParams(prev => ({ ...prev, ...newParams }));
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }} />
                </div>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}
