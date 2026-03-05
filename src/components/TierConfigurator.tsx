import type { DealParams } from '../model/DealModel';

interface Props {
    params: DealParams;
    updateParam: <K extends keyof DealParams>(key: K, value: DealParams[K]) => void;
}

export function TierConfigurator({ params, updateParam }: Props) {
    return (
        <div className="glass-panel" style={{ marginTop: '24px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>ADVANCED STRUCTURING</h3>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={params.useTiers}
                        onChange={e => updateParam('useTiers', e.target.checked)}
                    />
                    <span className="input-label" style={{ color: params.useTiers ? '#3b82f6' : 'var(--text-secondary)' }}>
                        Enable Volume Tiers (Sub-Split)
                    </span>
                </label>

                {params.useTiers && (
                    <div style={{ marginTop: '8px', paddingLeft: '24px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        <strong style={{ color: '#3b82f6' }}>Active Tiers:</strong><br />
                        {params.tiers.map((t, idx) => (
                            <div key={idx} style={{ marginTop: '4px' }}>
                                ≥ {(t.threshold / 1_000_000).toFixed(0)}M : {(t.s * 100).toFixed(0)}%
                            </div>
                        ))}
                        <div style={{ marginTop: '8px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Overrides base S parameter when threshold is met.
                        </div>
                    </div>
                )}
            </div>

            <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={params.useMilestones}
                        onChange={e => updateParam('useMilestones', e.target.checked)}
                    />
                    <span className="input-label" style={{ color: params.useMilestones ? '#8b5cf6' : 'var(--text-secondary)' }}>
                        Enable Milestone Retainers
                    </span>
                </label>

                {params.useMilestones && (
                    <div style={{ marginTop: '8px', paddingLeft: '24px', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        <strong style={{ color: '#8b5cf6' }}>Active Milestones:</strong><br />
                        {params.milestones.map((m, idx) => (
                            <div key={idx} style={{ marginTop: '4px' }}>
                                ≥ {(m.threshold / 1_000_000).toFixed(0)}M : +${m.r}
                            </div>
                        ))}
                        <div style={{ marginTop: '8px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Base retainer acts as minimum floor. Milestones stack on top.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
