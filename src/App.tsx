import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import { useDealSimulator } from './hooks/useDealSimulator';
import { TierConfigurator } from './components/TierConfigurator';
import { NegotiationAssistant } from './components/NegotiationAssistant';
import { PortfolioDashboard } from './components/PortfolioDashboard';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { HunterPanel } from './components/HunterPanel';
import { RiskHeatmap } from './components/RiskHeatmap';
import { DealOptimizer } from './components/DealOptimizer';
import { CryptoTicker } from './components/CryptoTicker';
import { DealScore } from './components/DealScore';
import { safeDiv } from './lib/safeMath';
import { SensitivityGrid } from './components/SensitivityGrid';
import { StressTests } from './components/StressTests';
import { DealTemplates } from './components/DealTemplates';
import { CommunitySelector } from './components/CommunitySelector';
import { VIPFeeComparison } from './components/VIPFeeComparison';
import { PartnerRevenueSim } from './components/PartnerRevenueSim';
import { DealBuilder } from './components/DealBuilder';
import { ComplianceWarning } from './components/ComplianceWarning';
import { BatchBuilder } from './components/BatchBuilder';
import { ActivationBuilder } from './components/ActivationBuilder';
import { DealPitchMode } from './components/DealPitchMode';
import { FeatureHighlights } from './components/FeatureHighlights';
import { AIAssistant } from './components/AIAssistant';
import { IntelligenceScout } from './components/IntelligenceScout';
import { PartnerCRM } from './components/PartnerCRM';
import { SimulatorPro } from './components/SimulatorPro';
import { DealBattle } from './components/DealBattle';
import { StreamerMode } from './components/StreamerMode';
import { AffiliateLinkBuilder } from './components/AffiliateLinkBuilder';
import { MinimalCharts } from './components/MinimalCharts';
import { AuthModal } from './components/AuthModal';
import { ShareLinkView } from './components/ShareLinkView';
import { AdminConsole } from './components/AdminConsole';
import { MyScenarios } from './components/MyScenarios';
import './index.css';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string>('partner'); // default to lowest perms
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchRole(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchRole(session.user.id);
      else setRole('partner');
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('role').eq('user_id', userId).single();
    if (data) setRole(data.role);
  };

  const { params, metrics, updateParam, setParams } = useDealSimulator();
  const [activeTab, setActiveTab] = useState<'ARCHITECT' | 'HUNTER' | 'PITCH' | 'AGENCY' | 'BD_OS' | 'SAVES' | 'ADMIN'>('BD_OS');

  // Role-based Navigation logic
  const tabs = [
    { id: 'BD_OS', label: 'BD OS', roles: ['admin', 'agency', 'partner', 'hunter'] },
    { id: 'ARCHITECT', label: 'Architect', roles: ['admin', 'agency', 'partner'] },
    { id: 'HUNTER', label: 'Hunter Panel', roles: ['admin', 'agency', 'partner', 'hunter'] },
    { id: 'PITCH', label: 'Pitch Mode', roles: ['admin', 'agency', 'partner', 'hunter'] },
    { id: 'AGENCY', label: 'Agency Ops', roles: ['admin', 'agency', 'partner'] },
    { id: 'SAVES', label: 'Library', roles: ['admin', 'agency', 'partner', 'hunter'] },
    { id: 'ADMIN', label: 'Admin', roles: ['admin'] },
  ].filter(t => t.roles.includes(role));

  useEffect(() => {
    // If current tab is not allowed for new role, fallback to first available
    if (!tabs.find(t => t.id === activeTab)) {
      setActiveTab(tabs[0]?.id as any || 'BD_OS');
    }
  }, [role]);

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'SAFE_START':
        setParams(prev => ({ ...prev, S: 0.3, R: 0, useTiers: true, tiers: [{ threshold: 15_000_000, s: 0.4 }], useMilestones: false }));
        break;
      case 'HIGH_ROLLER':
        setParams(prev => ({ ...prev, S: 0.5, R: 5000, useTiers: false, useMilestones: true, milestones: [{ threshold: 50_000_000, r: 2500 }] }));
        break;
      case 'HYBRID_GROWTH':
        setParams(prev => ({ ...prev, S: 0.2, R: 1000, useTiers: true, tiers: [{ threshold: 10_000_000, s: 0.3 }, { threshold: 30_000_000, s: 0.4 }] }));
        break;
    }
  };

  const formatCurrency = (val: number) => {
    if (!isFinite(val)) return '∞';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  const handleShareSetup = async () => {
    if (!session) {
      alert("You must be logged in to save and share deal structures.");
      setShowAuth(true);
      return;
    }

    try {
      // 1. Create a Scenario Record
      const { data: scenarioArray, error: scenarioError } = await supabase
        .from('scenarios')
        .insert({
          owner_user_id: session.user.id,
          name: `Shared Deal - ${new Date().toLocaleDateString()}`,
          state_json: params
        })
        .select();

      if (scenarioError || !scenarioArray) throw scenarioError || new Error("Failed to return scenario struct.");
      const newScenario = scenarioArray[0];

      // 2. Generate a Unique Token
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // 3. Create Share Link Record
      const { error: linkError } = await supabase
        .from('share_links')
        .insert({
          scenario_id: newScenario.id,
          created_by_user_id: session.user.id,
          token: token,
          mode: 'read_only'
        });

      if (linkError) throw linkError;

      // 4. Copy to Clipboard
      const url = `${window.location.origin}/share/${token}`;
      navigator.clipboard.writeText(url);

      // 5. Audit Log (Async)
      supabase.from('audit_log').insert({
        owner_user_id: session.user.id,
        scenario_id: newScenario.id,
        event: 'SHARE_LINK_GENERATED',
        payload_json: { token, mode: 'read_only' }
      }).then();

      alert('Read-Only Pitch Link Copied to Clipboard!\n\nMetrics are hidden from the viewer.');

    } catch (e: any) {
      alert(`Error generating share link: ${e.message}`);
    }
  };

  if (!session) {
    return <LandingPage onAuth={() => setShowAuth(true)} />;
  }

  return (
    <>
      <div className="app-container">

        <header className="brand-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>SZYMON CRYPTO BRAIN</h1>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Business Development Operating System
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {session ? (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>{session.user.email}</span>
                <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>{role}</span>
                <button onClick={() => supabase.auth.signOut()} style={{ background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}>Log Out</button>
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{ background: 'var(--accent-blue)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                Sign In
              </button>
            )}

            <button onClick={handleShareSetup} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔗 Share Setup
            </button>
            <button onClick={() => window.print()} style={{ background: 'var(--accent-blue)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🖨️ Export PDF
            </button>
          </div>
        </header>

        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

        <Routes>
          <Route path="/" element={
            <>
              <CryptoTicker />
              <div className="grid-layout grid-cols-sidebar" style={{ marginTop: '24px' }}>
                {/* SIDEBAR: Inputs */}
                <aside className="sidebar">
                  <div className="glass-panel sidebar">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <h2 className="header-title" style={{ margin: 0 }}>
                        <span style={{ fontSize: '1.2em' }}>📐</span> VARIABLES
                      </h2>
                      {/* The share button was moved to the header */}
                    </div>

                    <div style={{ marginBottom: '24px', padding: '12px', background: params.requireMarginLock ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)', border: `1px solid ${params.requireMarginLock ? 'var(--accent-emerald)' : 'var(--border-light)'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => updateParam('requireMarginLock', !params.requireMarginLock)}>
                      <div style={{ width: '40px', height: '20px', background: params.requireMarginLock ? 'var(--accent-emerald)' : 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', position: 'relative', transition: 'var(--transition-smooth)' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: params.requireMarginLock ? '22px' : '2px', transition: 'var(--transition-smooth)' }} />
                      </div>
                      <div>
                        <strong style={{ display: 'block', color: params.requireMarginLock ? 'var(--accent-emerald)' : 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>Prevent terrible deals (15% Lock)</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>You can technically do this deal. You can also technically juggle chainsaws.</span>
                      </div>
                    </div>

                    <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', marginBottom: '16px' }}>
                      <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Quick Templates</h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button onClick={() => applyPreset('SAFE_START')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer' }}>Safe Start</button>
                        <button onClick={() => applyPreset('HYBRID_GROWTH')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer' }}>Hybrid Growth</button>
                        <button onClick={() => applyPreset('HIGH_ROLLER')} style={{ flex: 1, padding: '8px', fontSize: '0.75rem', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer' }}>High Roller</button>
                      </div>
                    </div>

                    <CommunitySelector applyParams={(newParams) => setParams(prev => ({ ...prev, ...newParams }))} />

                    <div className="input-group">
                      <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500, fontSize: '0.85rem' }}>Volume (USD)</label>
                      <input
                        type="number"
                        value={params.V}
                        onChange={e => updateParam('V', Number(e.target.value))}
                      />
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                        {[1, 5, 10, 20, 50].map(v => (
                          <button key={v} onClick={() => updateParam('V', v * 1_000_000)} style={{ flex: 1, padding: '4px', fontSize: '0.7rem', background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer' }}>{v}M</button>
                        ))}
                      </div>
                    </div>

                    <div className="input-group">
                      <label className="input-label">Blended Fee</label>
                      <select
                        value={params.F}
                        onChange={e => updateParam('F', Number(e.target.value))}
                      >
                        <option value={0.00035}>0.035%</option>
                        <option value={0.00030}>0.030%</option>
                        <option value={0.00028}>0.028%</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Partner Payout Share (P)</span>
                        <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{params.P}%</span>
                      </label>
                      <input
                        type="range"
                        min="0" max="100" step="1"
                        value={params.P}
                        onChange={e => updateParam('P', Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-blue)', cursor: 'pointer' }}
                      />
                      <input
                        type="number"
                        className="glass-input"
                        style={{ marginTop: '8px' }}
                        value={params.P}
                        onChange={e => updateParam('P', Number(e.target.value))}
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Sub Split (S)</span>
                        <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>{params.S}%</span>
                      </label>
                      <input
                        type="range"
                        min="0" max="100" step="1"
                        value={params.S}
                        onChange={e => updateParam('S', Number(e.target.value))}
                        style={{ width: '100%', accentColor: 'var(--accent-purple)', cursor: 'pointer' }}
                      />
                      <input
                        type="number"
                        className="glass-input"
                        style={{ marginTop: '8px' }}
                        value={params.S}
                        onChange={e => updateParam('S', Number(e.target.value))}
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ fontWeight: 500, fontSize: '0.85rem' }}>Fixed Retainer (USD)</label>
                      <input
                        type="number"
                        value={params.R}
                        onChange={e => updateParam('R', Number(e.target.value))}
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">Operational Cost (I) — paid to Szymon</label>
                      <input
                        type="number"
                        value={params.I}
                        onChange={e => updateParam('I', Number(e.target.value))}
                      />
                      <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic', display: 'block' }}>
                        Operational cost is evaluated manually by Szymon.
                      </small>
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ fontWeight: 500, fontSize: '0.85rem' }}>Bonus per 1M Volume Increment (USD)</label>
                      <input
                        type="number"
                        value={params.bonusPer1M}
                        onChange={e => updateParam('bonusPer1M', Number(e.target.value))}
                      />
                      {params.bonusPer1M > 0 && (
                        <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--accent-pink)', background: 'rgba(236, 72, 153, 0.1)', padding: '8px', borderRadius: '6px', border: '1px solid var(--accent-pink)' }}>
                          Equivalent Cost: <strong>+{(safeDiv(params.bonusPer1M, (params.F * 1_000_000), 0) * 100).toFixed(1)}%</strong> of gross revenue
                        </div>
                      )}
                    </div>

                    <TierConfigurator params={params} updateParam={updateParam} />

                  </div>
                </aside>

                {/* MAIN CONTENT: Dashboards */}
                <main className="main-content">
                  <FeatureHighlights />

                  {/* TAB NAVIGATION */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`glass-btn ${activeTab === tab.id ? 'active' : ''}`}
                        style={{ flex: 1, border: activeTab === tab.id ? '1px solid var(--accent-blue)' : undefined, minWidth: '100px' }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'ARCHITECT' && (
                    <>
                      <DealTemplates applyParams={(newParams) => setParams(prev => ({ ...prev, ...newParams }))} />

                      <div className="glass-panel" style={{ marginTop: '24px' }}>
                        <h3 style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>DEAL METRICS DASHBOARD</h3>

                        <div className="metric-grid">
                          <div className={`metric-card ${metrics.net > 0 ? 'positive-border' : 'negative-border'}`}>
                            <span className="label">Monthly Net</span>
                            <span className={`value ${metrics.net > 0 ? 'positive' : 'negative'}`}>
                              {formatCurrency(metrics.net)}
                            </span>
                          </div>

                          <div className="metric-card">
                            <span className="label">Break-even Volume</span>
                            <span className="value">{metrics.breakEvenVolume !== null ? formatCurrency(metrics.breakEvenVolume) : '—'}</span>
                          </div>

                          <div className="metric-card">
                            <span className="label">Retained per 1M</span>
                            <span className={`value ${(metrics.safetyBufferPct || 0) < 5 ? 'negative' : 'positive'}`}>
                              {formatCurrency(metrics.retainedPer1M)}
                            </span>
                          </div>

                          <div className="metric-card">
                            <span className="label">Margin Buffer</span>
                            <span className={`value ${metrics.net > 0 ? 'positive' : 'negative'}`}>
                              {metrics.net !== null ? formatCurrency(metrics.net) : '—'}
                            </span>
                          </div>
                        </div>

                        <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                          <div style={{ padding: '16px', borderRadius: '12px', background: metrics.isSustainable ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)', color: metrics.isSustainable ? '#10b981' : '#f43f5e', flex: 1 }}>
                            <h4 style={{ marginBottom: '8px' }}>Sustainability Condition</h4>
                            <p style={{ fontSize: '0.875rem' }}>{metrics.isSustainable ? '✅ Net is positive' : '❌ Net is negative'}</p>
                          </div>

                          <div style={{ padding: '16px', borderRadius: '12px', background: metrics.isSafe ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)', color: metrics.isSafe ? '#10b981' : '#f43f5e', flex: 1 }}>
                            <h4 style={{ marginBottom: '8px' }}>Safety Condition</h4>
                            <p style={{ fontSize: '0.875rem' }}>{metrics.isSafe ? '✅ Retained is >= 15% above fixed base' : '❌ Retained is too low compared to fixed base'}</p>
                          </div>
                        </div>

                        <MinimalCharts params={params} />

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }} className="dashboard-grid">
                          <DealBuilder />
                          <DealScore metrics={metrics} />
                        </div>

                        <PartnerRevenueSim />
                        <VIPFeeComparison />

                        <DealOptimizer
                          baseParams={params}
                          onApplyOptimization={(newParams) => {
                            setParams(prev => ({ ...prev, ...newParams }));
                          }}
                        />

                        <NegotiationAssistant
                          params={params}
                          onApplyCounterOffer={newParams => setParams(prev => ({ ...prev, ...newParams }))}
                        />
                        <RiskHeatmap baseParams={params} />
                        <SensitivityGrid baseParams={params} />
                        <StressTests baseParams={params} />
                        <ExecutiveSummary params={params} metrics={metrics} />
                        <PortfolioDashboard currentParams={params} currentMetrics={metrics} />
                        <ComplianceWarning />
                      </div>
                    </>
                  )}

                  {activeTab === 'PITCH' && (
                    <div className="tab-pane active fade-in">
                      <DealPitchMode params={params} metrics={metrics} userRole={role} />
                    </div>
                  )}

                  {activeTab === 'AGENCY' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <BatchBuilder />
                      <ActivationBuilder />
                    </div>
                  )}

                  {activeTab === 'BD_OS' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div className="grid-layout grid-cols-3">
                        <PartnerCRM />
                        <SimulatorPro />
                        <DealBattle currentParams={params} currentMetrics={metrics} />
                      </div>
                      <div className="grid-layout grid-cols-3">
                        <StreamerMode />
                        <AIAssistant />
                        <IntelligenceScout />
                      </div>
                      <AffiliateLinkBuilder />
                    </div>
                  )}

                  {activeTab === 'HUNTER' && (
                    <HunterPanel />
                  )}

                  {activeTab === 'SAVES' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <MyScenarios session={session} onLoadScenario={(loadedParams) => {
                        setParams(prev => ({ ...prev, ...loadedParams }));
                        setActiveTab('ARCHITECT');
                        alert('Scenario loaded successfully!');
                      }} />
                    </div>
                  )}

                  {activeTab === 'ADMIN' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <AdminConsole session={session} role={role} />
                    </div>
                  )}
                </main>
              </div>
            </>
          } />
          <Route path="/share/:token" element={<ShareLinkView />} />
        </Routes>
      </div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

function LandingPage({ onAuth }: { onAuth: () => void }) {
  return (
    <div className="landing-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', color: 'var(--text-primary)', textAlign: 'center', padding: '20px' }}>
      <div className="glass-panel" style={{ maxWidth: '600px', padding: '60px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.03)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px', letterSpacing: '2px' }}>SZYMON CRYPTO BRAIN</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
          The production-grade Business Development Operating System for the crypto ecosystem.
          Standardize deal structures, automate revenue modelling, and secure partner acquisitions.
        </p>
        <button
          onClick={onAuth}
          className="glass-btn"
          style={{ padding: '16px 48px', fontSize: '1.2rem', background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}
        >
          ENTER TERMINAL
        </button>
      </div>
      <div style={{ marginTop: '40px', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.5 }}>
        v2.0.0-PROD • TERMINAL ACCESS RESTRICTED
      </div>
    </div>
  );
}
