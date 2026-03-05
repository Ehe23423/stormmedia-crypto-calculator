import { type DealParams, calculateDealMetrics } from '../model/DealModel';

interface Props {
    params: DealParams;
}

export function ProposalGenerator({ params }: Props) {
    const m = calculateDealMetrics(params);
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(val));

    const variants = [
        {
            id: 'community',
            title: 'Community / Group',
            content: `SZYMON CRYPTO BRAIN Proposal — Community Hybrid
Target Volume: $${(params.V / 1000000).toFixed(0)}M/mo
Fee Tier: ${params.F}%
Partner Revenue: ${formatUSD(m.partnerPool)}/mo

Structure: $${params.R} Monthly Retainer + ${params.P}% Volume Share.
Next Step: 14-day Trading Tournament Trial.`
        },
        {
            id: 'trader',
            title: 'Trader / Desk',
            content: `SZYMON CRYPTO BRAIN Proposal — VIP Trader
Volume Committment: $${(params.V / 1000000).toFixed(0)}M/mo
Net Fee: ${(params.F * (1 - params.P / 100)).toFixed(3)}%
VIP Tier: Elite

Structure: Direct fee rebate of ${params.P}% from baseline ${params.F}% fees.
Next Step: Onboard to API VIP Node.`
        },
        {
            id: 'whale',
            title: 'Whale / Institutional',
            content: `SZYMON CRYPTO BRAIN Proposal — Institutional
Total Monthly Flow: $${(params.V / 1000000).toFixed(0)}M/mo
Effective Discount: ${params.P}%
Exchange Retained: ${formatUSD(m.exchangeRetained)}

Structure: $${params.I} Op-Cost optimization + ${params.P}% performance split.
Next Step: Direct Custody & Settlement Call.`
        }
    ];

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('📋 Proposal copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', height: '100%' }}>
                {variants.map(v => (
                    <div key={v.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '200px' }}>
                        <h4 style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', margin: 0 }}>{v.title}</h4>
                        <div style={{
                            flex: 1,
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: 'var(--accent-cyan)',
                            whiteSpace: 'pre-wrap',
                            border: '1px solid var(--border-light)',
                            overflowY: 'auto'
                        }}>
                            {v.content}
                        </div>
                        <button
                            onClick={() => copy(v.content)}
                            className="glass-btn"
                            style={{ width: '100%', padding: '8px', fontSize: '0.75rem', fontWeight: 'bold' }}
                        >
                            Copy Proposal
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
