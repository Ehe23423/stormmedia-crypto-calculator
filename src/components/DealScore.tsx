import { DealResult } from '../model/DealModel';

interface Props {
    metrics: DealResult;
    forcedRoastMode?: boolean;
}

export function DealScore({ metrics, forcedRoastMode = false }: Props): JSX.Element {
    const bufferPct = metrics.marginBuffer * 100;

    const getStatusConfig = () => {
        if (metrics.status === 'BLOCKED') return {
            color: 'var(--accent-rose)',
            status: 'BLOCKED',
            comment: 'Margin safety violated. Adjust partner share, fee or retainer.',
            roast: 'You can technically run this deal. You can also technically juggle chainsaws.'
        };
        if (bufferPct > 30) return {
            color: 'var(--accent-emerald)',
            status: 'SAFE',
            comment: 'Sustainable. Healthy retained margin.',
            roast: 'This partnership makes sense. Unlike most influencer deals which are financially brain-dead.'
        };
        if (bufferPct > 15) return {
            color: 'var(--accent-amber)',
            status: 'WARNING',
            comment: 'Payout is getting spicy. Fee compression can hurt.',
            roast: 'Partner asking for this much? Admirable confidence. Financially questionable.'
        };
        if (bufferPct > 5) return {
            color: 'var(--accent-rose)',
            status: 'CRITICAL',
            comment: 'Thin margin. One bad month flips this negative.',
            roast: 'You are burning money. Either you re-negotiate this or prepare your resume for McDonald\'s.'
        };
        return {
            color: '#7f1d1d',
            status: 'SUICIDAL',
            comment: 'This deal burns margin faster than a degen with 150x leverage.',
            roast: 'ABSOLUTE DISASTER. This deal destroys your margin faster than a degen trader with 150x leverage.'
        };
    };

    const config = getStatusConfig();

    return (
        <div style={{
            padding: '24px',
            background: `color-mix(in srgb, ${config.status === 'BLOCKED' || config.status === 'SUICIDAL' ? 'red' : config.color} 5%, var(--bg-card))`,
            border: `2px solid ${config.status === 'BLOCKED' ? 'var(--accent-rose)' : metrics.isSafe ? 'var(--accent-emerald)' : 'transparent'}`,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: '100%',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: config.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 20px ${config.color}44`
                }}>
                    <span style={{ fontSize: '2rem' }}>{metrics.isSafe ? '✔️' : '⚠️'}</span>
                </div>
                <div>
                    <h3 style={{ margin: 0, color: config.color, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.1em' }}>
                        {config.status}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Margin Buffer: <strong style={{ color: config.color }}>{bufferPct.toFixed(1)}%</strong>
                    </div>
                </div>
            </div>

            <p style={{
                margin: 0,
                fontSize: '1rem',
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                padding: '16px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                borderLeft: `4px solid ${config.color}`,
                fontStyle: 'italic'
            }}>
                {forcedRoastMode ? config.roast : config.comment}
            </p>
        </div>
    );
}
