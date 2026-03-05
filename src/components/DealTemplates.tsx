import { type DealParams } from '../model/DealModel';

interface Props {
    applyParams: (newParams: Partial<DealParams>) => void;
}

export function DealTemplates({ applyParams }: Props) {
    const templates = [
        {
            name: 'Signal Group',
            desc: 'High share, zero retainer, bonus focused.',
            params: { V: 5000000, F: 0.05, P: 45, S: 20, R: 0, I: 0, B: 200 }
        },
        {
            name: 'Mid-size Community',
            desc: 'Balanced hybrid with small retainer.',
            params: { V: 15000000, F: 0.04, P: 50, S: 30, R: 1000, I: 500, B: 100 }
        },
        {
            name: 'Influencer Hybrid',
            desc: 'Premium content creators, high fixed cost.',
            params: { V: 10000000, F: 0.035, P: 40, S: 0, R: 2500, I: 1000, B: 0 }
        },
        {
            name: 'Whale Trader',
            desc: 'VIP fee focus, minimal revenue share.',
            params: { V: 50000000, F: 0.028, P: 10, S: 0, R: 0, I: 0, B: 0 }
        },
        {
            name: 'Spot VIP Desk',
            desc: 'High volume, competitive fee rebate.',
            params: { V: 100000000, F: 0.02, P: 5, S: 0, R: 0, I: 0, B: 0 }
        }
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {templates.map(t => (
                <button
                    key={t.name}
                    onClick={() => applyParams(t.params)}
                    className="bento-item"
                    style={{
                        cursor: 'pointer',
                        padding: '16px',
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}
                >
                    <div style={{ fontWeight: 800, color: 'var(--accent-blue)', fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.desc}</div>
                </button>
            ))}
        </div>
    );
}
