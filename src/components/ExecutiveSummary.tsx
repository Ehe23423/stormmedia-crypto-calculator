import type { DealParams, DealResult } from '../model/DealModel';
import { useLanguage } from '../lib/LanguageContext';

interface Props {
    params: DealParams;
    metrics: DealResult;
}

export function ExecutiveSummary({ params, metrics }: Props) {
    const { t } = useLanguage();
    const formatUSD = (val: number | null | undefined) => {
        if (val === null || val === undefined || Number.isNaN(val)) return '—';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const generateReport = () => {
        return `======================================
SZYMON CRYPTO BRAIN — ${t('exec.verdict')}
======================================

${t('exec.strategy').replace('{vol}', (params.V / 1_000_000).toFixed(1))}
${t('exec.feeTier')}: ${params.F}%
${t('exec.safety')}: ${params.safetyThreshold}%
${t('exec.revShare')}: ${params.P}%
--------------------------------------
${t('exec.outcome')}: ${metrics.isBlocked ? t('exec.blocked') : metrics.netProfit > 0 ? t('exec.profitable') : t('exec.unsustainable')}
${t('exec.monthlyNet')}: ${formatUSD(metrics.netProfit)}
${t('exec.breakEven')}: ${formatUSD(metrics.breakEvenVolume)}
${t('exec.marginBuffer')}: ${(metrics.marginBuffer * 100).toFixed(1)}%

${t('exec.riskVerdict')}: ${metrics.status}
--------------------------------------
${t('exec.summary')}
${t('exec.summaryText').replace('{pool}', formatUSD(metrics.partnerPool))}
======================================`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateReport());
        alert(t('topBar.urlCopied'));
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
                    className="storm-btn"
                    style={{
                        flex: 1,
                        padding: '12px',
                        background: 'var(--accent-blue)',
                        color: '#fff'
                    }}
                >
                    {t('exec.copyBtn')}
                </button>
            </div>
        </div>
    );
}
