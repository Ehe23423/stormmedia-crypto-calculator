import type { DealParams, DealResult } from '../model/DealModel';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function ExecutiveSummary({ params, metrics }: Props) {
    const formatUSD = (val: number | null | undefined) => {
        if (val === null || val === undefined || Number.isNaN(val)) return '—';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const generateReport = () => {
        return `======================================
SZYMON CRYPTO BRAIN — DEAL VERDICT
======================================

STRATEGY: ${(params.V / 1_000_000).toFixed(1)}M Monthly Volume
FEE TIER: ${params.F}%
SAFETY THRESHOLD: ${params.safetyThreshold}%
REVENUE SHARE: ${params.P}%
--------------------------------------
OUTCOME: ${metrics.isBlocked ? 'BLOCKED - SAFETY VIOLATED' : metrics.netProfit > 0 ? 'PROFITABLE' : 'UNSUSTAINABLE'}
MONTHLY NET: ${formatUSD(metrics.netProfit)}
BREAK-EVEN: ${formatUSD(metrics.breakEvenVolume)}
MARGIN BUFFER: ${(metrics.marginBuffer * 100).toFixed(1)}%

RISK VERDICT: ${metrics.status}
--------------------------------------
PROPOSAL SUMMARY:
This structure yields ${formatUSD(metrics.partnerPool)} in partner revenue. 
The deal remains sustainable for the exchange while maintaining 
competitive upside for the partner at current fee compression levels.
======================================`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateReport());
        alert('📋 Executive Summary copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            <div style={{
                flex: 1,
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                padding: '20px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: 'var(--accent-blue)',
                whiteSpace: 'pre-wrap',
                border: '1px solid var(--border-light)',
                overflowY: 'auto',
                lineHeight: '1.5'
            }}>
                {generateReport()}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    onClick={copyToClipboard}
                    style={{
                        flex: 1,
                        padding: '12px',
                        background: 'var(--accent-blue)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                    }}
                >
                    Copy Text Summary
                </button>
            </div>
        </div>
    );
}
