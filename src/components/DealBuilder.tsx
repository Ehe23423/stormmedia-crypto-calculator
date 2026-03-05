import { useState } from 'react';

export function DealBuilder() {
    const [isFlat, setIsFlat] = useState(false);
    const [isRevShare, setIsRevShare] = useState(true);
    const [isHybrid, setIsHybrid] = useState(false);
    const [isPerf, setIsPerf] = useState(false);

    // Auto-exclusive logic for Hybrid vs Flat/RevShare
    const handleCheck = (type: string) => {
        if (type === 'HYBRID') {
            setIsHybrid(true);
            setIsFlat(true);
            setIsRevShare(true);
        } else if (type === 'FLAT') {
            setIsFlat(!isFlat);
            if (!(!isFlat) || !isRevShare) setIsHybrid(false);
            if (!isFlat && isRevShare) setIsHybrid(true);
        } else if (type === 'REV') {
            setIsRevShare(!isRevShare);
            if (!isFlat || !(!isRevShare)) setIsHybrid(false);
            if (isFlat && !isRevShare) setIsHybrid(true);
        } else if (type === 'PERF') {
            setIsPerf(!isPerf);
        }
    };

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(139, 92, 246, 0.05)', borderColor: 'var(--accent-purple)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>🔧</span> DEAL BUILDER
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Select the structural components of the partnership to generate the framework.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isFlat ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isFlat ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                    <input type="checkbox" checked={isFlat} onChange={() => handleCheck('FLAT')} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-blue)' }} />
                    <span style={{ fontWeight: isFlat ? 'bold' : 'normal', color: isFlat ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Flat Monthly Payment (Retainer)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isRevShare ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isRevShare ? 'var(--accent-pink)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                    <input type="checkbox" checked={isRevShare} onChange={() => handleCheck('REV')} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-pink)' }} />
                    <span style={{ fontWeight: isRevShare ? 'bold' : 'normal', color: isRevShare ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Revenue Share (Commission)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isHybrid ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isHybrid ? 'var(--accent-purple)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                    <input type="checkbox" checked={isHybrid} onChange={() => handleCheck('HYBRID')} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-purple)' }} />
                    <span style={{ fontWeight: isHybrid ? 'bold' : 'normal', color: isHybrid ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Hybrid Structure (Flat + Rev Share)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: isPerf ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isPerf ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '12px', cursor: 'pointer', transition: 'var(--transition-smooth)' }}>
                    <input type="checkbox" checked={isPerf} onChange={() => handleCheck('PERF')} style={{ width: '20px', height: '20px', accentColor: 'var(--accent-emerald)' }} />
                    <span style={{ fontWeight: isPerf ? 'bold' : 'normal', color: isPerf ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Performance Incentives (Milestones)</span>
                </label>

            </div>

            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', borderLeft: '4px solid ' + (isHybrid ? 'var(--accent-purple)' : isRevShare ? 'var(--accent-pink)' : isFlat ? 'var(--accent-blue)' : 'var(--text-secondary)') }}>
                <strong>Selected Framework: </strong>
                {isHybrid ? 'Hybrid Deal (Retainer to cover baseline operations, Commission to scale with success).' :
                    isRevShare ? 'Pure Revenue Share (Zero upfront risk, unlimited upside).' :
                        isFlat ? 'Pure Flat Fee (Predictable fixed cost, no upside tracking required).' :
                            'No core compensation structure selected.'}
                {isPerf && ' Enhanced with Performance Milestone bonuses.'}
            </div>
        </div>
    );
}
