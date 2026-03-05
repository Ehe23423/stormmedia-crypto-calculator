import type { DealParams } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';
import { useLanguage } from '../lib/LanguageContext';

interface Props {
    params: DealParams;
}

export function ProposalGenerator({ params }: Props) {
    const { t } = useLanguage();
    const m = calculateDealMetrics(params);
    const formatUSD = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(val));

    const variants = [
        {
            id: 'community',
            title: t('prop.variant1Title'),
            content: t('prop.variant1Content')
                .replace('{vol}', (params.V / 1000000).toFixed(0))
                .replace('{F}', params.F.toString())
                .replace('{pool}', formatUSD(m.partnerPool))
                .replace('{R}', params.R.toString())
                .replace('{P}', params.P.toString())
        },
        {
            id: 'trader',
            title: t('prop.variant2Title'),
            content: t('prop.variant2Content')
                .replace('{vol}', (params.V / 1000000).toFixed(0))
                .replace('{netFee}', (params.F * (1 - params.P / 100)).toFixed(3))
                .replace('{P}', params.P.toString())
                .replace('{F}', params.F.toString())
        },
        {
            id: 'whale',
            title: t('prop.variant3Title'),
            content: t('prop.variant3Content')
                .replace('{vol}', (params.V / 1000000).toFixed(0))
                .replace('{P}', params.P.toString())
                .replace('{retained}', formatUSD(m.exchangeRetained))
                .replace('{I}', params.I.toString())
        }
    ];

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('📋 Proposal copied to clipboard!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', height: '100%' }}>
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
                            {t('prop.copyBtn')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
