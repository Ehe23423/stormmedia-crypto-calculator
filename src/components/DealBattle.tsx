import { useState } from 'react';
import '../index.css';

interface Props {
    currentParams?: any;
    currentMetrics?: any;
    globalRoastMode?: boolean;
}

export function DealBattle({ currentParams, currentMetrics, globalRoastMode }: Props) {
    interface ScenarioPayload {
        retainedPer1M: number;
        breakEvenVolume: number | null;
        baseCosts: number;
        net: number;
        grossRetained: number;
    }
    interface Scenario {
        name: string;
        payload: ScenarioPayload | null;
        params: any | null;
    }

    const [scenarios, setScenarios] = useState<Scenario[]>([
        { name: 'Slot A (Empty)', payload: null, params: null },
        { name: 'Slot B (Empty)', payload: null, params: null },
        { name: 'Slot C (Empty)', payload: null, params: null }
    ]);

    const [simVol, setSimVol] = useState(15); // simulated volume in millions

    const saveScenario = (index: number) => {
        if (!currentParams || !currentMetrics) return;
        const newScenarios = [...scenarios];
        newScenarios[index] = {
            name: `Scenario ${['A', 'B', 'C'][index]}`,
            payload: currentMetrics,
            params: currentParams
        };
        setScenarios(newScenarios);
    };

    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

    const calcNet = (s: any, volM: number) => {
        if (!s.params) return 0;
        const feePer1M = 1_000_000 * (s.params.F / 100);
        const retainedPer1M = feePer1M * (s.params.P / 100) * (1 - (s.params.S / 100));
        const baseCosts = s.params.R + s.params.I;
        const grossRetained = volM * retainedPer1M;
        // Simplified bonus check for battle mode
        const bonusCost = (grossRetained > baseCosts) ? (volM * s.params.bonusPer1M) : 0;
        return grossRetained - baseCosts - bonusCost;
    };

    const copySummary = (s: any) => {
        if (!s.params) return;
        const txt = `DEAL SUMMARY: ${s.name}\n` +
            `Fee: {s.params.F}%\n` +
            `Partner Share: ${s.params.P}%\n` +
            `Sub-split: ${s.params.S}%\n` +
            `Retainer: $${s.params.R}\n` +
            `Base Net @ 10M Vol: ${formatCurrency(calcNet(s, 10))}\n` +
            `Base Net @ 50M Vol: ${formatCurrency(calcNet(s, 50))}\n`;
        navigator.clipboard.writeText(txt);
        alert('Scenario copied!');
    };

    const getSnarkyComment = (isWinner: boolean) => {
        if (!globalRoastMode) return isWinner ? "Solid structure." : "Needs refinement.";
        return isWinner
            ? "👑 KING OF MARGIN. This deal actually makes sense. Surprising."
            : "🤡 CLOWN DEAL. You're basically a charity for the exchange. Retrain immediately.";
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ borderTop: `4px solid ${globalRoastMode ? 'var(--accent-pink)' : 'var(--accent-amber)'}`, position: 'relative', overflow: 'hidden' }}>
                {globalRoastMode && <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '4rem', opacity: 0.1, pointerEvents: 'none' }}>🔥</div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{globalRoastMode ? '👺' : '⚔️'}</span> {globalRoastMode ? 'DEAL MASSACRE' : 'Deal Battle Mode'}
                    </h3>
                </div>
                {/* ... rest of UI ... */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '24px' }}>
                    Save architectures from the builder into slots below to compare mathematically sound structures side-by-side.
                </p>

                <div className="input-group" style={{ maxWidth: '300px', marginBottom: '24px' }}>
                    <label className="input-label">Projected Volume (Millions)</label>
                    <input type="range" min="1" max="100" value={simVol} onChange={(e) => setSimVol(Number(e.target.value))} />
                    <div style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-blue)', marginTop: '8px' }}>{simVol}M Volume Projection</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    {scenarios.map((s, i) => (
                        <div key={i} style={{ border: `1px solid ${s.payload ? 'var(--accent-amber)' : 'var(--border-light)'}`, borderRadius: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
                                <h4 style={{ margin: 0, color: s.payload ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '1rem' }}>{s.name}</h4>
                            </div>

                            {!s.payload ? (
                                <button onClick={() => saveScenario(i)} style={{ width: '100%', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-amber)', border: '1px dashed var(--accent-amber)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Save Active Setup Here
                                </button>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Retained Margin:</span>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{formatCurrency(s.payload.retainedPer1M)} / 1M</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Fixed Costs (R+I):</span>
                                        <span style={{ color: 'var(--accent-rose)', fontWeight: 'bold' }}>-${s.payload.baseCosts}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ color: 'var(--text-secondary)' }}>Break-even:</span>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{s.payload.breakEvenVolume !== null ? formatCurrency(s.payload.breakEvenVolume) : '—'}</span>
                                    </div>

                                    <div style={{ background: 'var(--bg-dark)', padding: '12px', borderRadius: '8px', textAlign: 'center', marginTop: '12px', border: '1px solid var(--border-light)', position: 'relative' }}>
                                        {globalRoastMode && (
                                            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: calcNet(s, simVol) >= (currentMetrics?.net || 0) ? 'var(--accent-emerald)' : 'var(--accent-rose)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                                {getSnarkyComment(calcNet(s, simVol) >= (currentMetrics?.net || 0))}
                                            </div>
                                        )}
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Net Yield (at {simVol}M)</div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: calcNet(s, simVol) < 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                                            {formatCurrency(calcNet(s, simVol))}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                        <button onClick={() => saveScenario(i)} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>Overwrite</button>
                                        <button onClick={() => copySummary(s)} style={{ flex: 1, padding: '8px', background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Copy Summary</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
