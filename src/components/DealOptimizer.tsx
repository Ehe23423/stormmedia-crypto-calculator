import { useState } from 'react';
import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

interface Props {
    baseParams: DealParams;
    onApplyOptimization: (newParams: Partial<DealParams>) => void;
}

export function DealOptimizer({ baseParams, onApplyOptimization }: Props) {
    const [targetV, setTargetV] = useState(30_000_000);
    const [optimized, setOptimized] = useState<Partial<DealParams> | null>(null);

    const runOptimization = () => {
        // Basic brute-force algorithm to find max Net that passes IsSafe
        let bestNet = -1;
        let bestStructure: Partial<DealParams> | null = null;

        // We lock V, F, P to the user inputs in the optimizer context.
        // Try sub-splits from 20% to 50%
        const possibleS = [0.20, 0.30, 0.40, 0.50];
        const possibleR = [0, 1000, 3000, 5000];

        for (const testS of possibleS) {
            for (const testR of possibleR) {
                // Assume tier structure unlocks high S
                const tiers = [
                    { threshold: targetV * 0.5, s: Math.max(0.1, testS - 0.1) },
                    { threshold: targetV, s: testS }
                ];

                const testParams: DealParams = {
                    ...baseParams,
                    V: targetV,
                    S: testS,
                    R: testR,
                    useTiers: true,
                    tiers,
                    bonusPer1M: 0 // Optimizer recommends 0 bonus cap by default to protect margin
                };

                const metrics = calculateDealMetrics(testParams);

                if (metrics.isSafe && metrics.isSustainable && metrics.net > bestNet) {
                    bestNet = metrics.net;
                    bestStructure = {
                        S: testS,
                        R: testR,
                        useTiers: true,
                        tiers,
                        bonusPer1M: 0
                    };
                }
            }
        }

        setOptimized(bestStructure);
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px', border: '1px solid var(--accent-emerald)', background: 'rgba(255, 255, 255, 0.03)' }}>
            <h3 style={{ marginBottom: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚡ AUTO DEAL OPTIMIZER
            </h3>
            <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Enter a Target Volume to let the AI Engine find the optimal structure (max Net, preserving Safety margin).
                </p>
                <div style={{ display: 'flex', gap: '16px', marginTop: '12px', alignItems: 'flex-end' }}>
                    <div>
                        <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Target Volume</label>
                        <input
                            type="number"
                            value={targetV}
                            onChange={e => setTargetV(Number(e.target.value))}
                            style={{ padding: '8px 12px', width: '200px' }}
                        />
                    </div>
                    <button
                        onClick={runOptimization}
                        style={{ padding: '10px 24px', background: '#10b981', color: 'var(--bg-dark)', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Run Optimization
                    </button>
                </div>
            </div>

            {optimized && (
                <div style={{ padding: '16px', marginTop: '16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
                    <h4 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>Suggested Structure</h4>
                    <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        <li><strong style={{ color: '#3b82f6' }}>Base S:</strong> {(optimized.tiers![0].s * 100).toFixed(0)}%</li>
                        <li><strong style={{ color: '#8b5cf6' }}>Tier Unlock:</strong> {(optimized.tiers![1].s * 100).toFixed(0)}% at {(optimized.tiers![1].threshold / 1_000_000).toFixed(0)}M</li>
                        <li><strong style={{ color: 'var(--text-primary)' }}>Safe Retainer Cap:</strong> ${optimized.R}</li>
                        <li><strong style={{ color: 'var(--text-primary)' }}>Bonus:</strong> Converted to tier upgrade (0)</li>
                    </ul>
                    <button
                        onClick={() => onApplyOptimization(optimized)}
                        style={{ marginTop: '16px', padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        Apply to Deal Board
                    </button>
                </div>
            )}
        </div>
    );
}
