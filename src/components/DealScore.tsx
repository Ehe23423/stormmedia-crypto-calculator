import type { DealResult } from '../model/DealModel';

interface Props {
    metrics: DealResult;
}

export function DealScore({ metrics }: Props) {
    const getStatusColor = () => {
        switch (metrics.status) {
            case 'SAFE': return 'var(--accent-emerald)';
            case 'WARNING': return 'var(--accent-amber)';
            case 'CRITICAL': return 'var(--accent-rose)';
            case 'BLOCKED': return '#ff0000';
            default: return 'var(--text-secondary)';
        }
    };

    const getScoreDescription = () => {
        if (metrics.status === 'BLOCKED') return 'VIOLATION: Margin below safety threshold.';
        if (metrics.status === 'SAFE') return 'OPTIMAL: Strong margin buffer, scalable structure.';
        if (metrics.status === 'WARNING') return 'SUB-OPTIMAL: Respectable, but vulnerable to volume dips.';
        if (metrics.status === 'CRITICAL') return 'DANGEROUS: Margin collapse imminent. Renegotiate.';
        return 'CALCULATING...';
    };

    const scoreValue = Math.min(100, Math.max(0, Math.round(metrics.marginBuffer * 333))); // Arbitrary 0-100 score based on 30% margin target

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{
                    fontSize: '3.5rem', /* Was 5rem */
                    fontWeight: 900,
                    color: getStatusColor(),
                    lineHeight: 1,
                    letterSpacing: '-0.05em'
                }}>
                    {scoreValue < 10 ? `0${scoreValue}` : scoreValue}
                </div>
                <div style={{
                    fontSize: '0.8rem', /* Was 1rem */
                    fontWeight: 800,
                    color: getStatusColor(),
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginTop: '4px'
                }}>
                    {metrics.status} STATUS
                </div>
            </div>

            <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginTop: '10px'
            }}>
                <div style={{
                    width: `${scoreValue}%`,
                    height: '100%',
                    background: getStatusColor(),
                    boxShadow: `0 0 15px ${getStatusColor()}`
                }} />
            </div>

            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                textAlign: 'center',
                margin: 0,
                fontStyle: 'italic'
            }}>
                "{getScoreDescription()}"
            </p>
        </div>
    );
}
