import type { DealParams, DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function ExecutiveSummary({ params, metrics }: Props) {
    const copyToClipboard = () => {
        alert('Report copied to clipboard! (Ready to send to partner)');
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="glass-panel print-panel" style={{ marginTop: '24px', border: '1px solid var(--border-hover)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>EXECUTIVE SUMMARY (READY TO SEND)</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={copyToClipboard} style={{ padding: '12px 24px', background: 'var(--accent-blue)', color: 'var(--bg-dark)', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Copy Text
                    </button>
                    <button onClick={() => window.print()} style={{ padding: '12px 24px', background: 'var(--accent-emerald)', color: 'var(--bg-dark)', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Save PDF
                    </button>
                </div>
            </div>
            <div style={{ marginTop: '16px', padding: '24px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                ========================================<br />
                <strong style={{ color: '#3b82f6', fontSize: '1.1rem' }}>DEAL STRUCTURE PROPOSAL (SZYMON CRYPTO BRAIN)</strong><br />
                ========================================<br />
                Volume Target: ${(params.V / 1_000_000).toFixed(1)}M USD<br />
                Base Retainer: {formatCurrency(params.R)}<br />
                Sub-split (S): {(params.S * 100).toFixed(1)}%<br />
                {params.useTiers && `Tier Structure: Active\n`}
                {params.useMilestones && `Retainer Milestones: Active\n`}
                <br />
                FINANCIAL MODEL:<br />
                Break-even Volume: {formatCurrency(metrics.breakEvenVolume)}<br />
                Safety Condition: <span style={{ color: metrics.isSafe ? '#10b981' : '#f43f5e' }}>{metrics.isSafe ? 'PASSED' : 'FAILED'}</span><br />
                Monthly Net Revenue Est.: {formatCurrency(metrics.net)}<br />
                <br />
                RISK ANALYSIS:<br />
                Margin Buffer: {formatCurrency(metrics.safetyMarginBuffer)}<br />
                Margin Collapse Risk: {metrics.marginCollapseRisk ? 'DETECTED' : 'NONE'}<br />
                ========================================
            </div>
        </div>
    );
}
