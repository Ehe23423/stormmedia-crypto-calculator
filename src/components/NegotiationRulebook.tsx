import { useLanguage } from '../lib/LanguageContext';

export function NegotiationRulebook() {
    const { t } = useLanguage();
    const rules = [
        { id: 1, title: t('rule.r1t'), desc: t('rule.r1d') },
        { id: 2, title: t('rule.r2t'), desc: t('rule.r2d') },
        { id: 3, title: t('rule.r3t'), desc: t('rule.r3d') },
        { id: 4, title: t('rule.r4t'), desc: t('rule.r4d') }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rules.map(r => (
                <div key={r.id} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{
                        minWidth: '24px',
                        height: '24px',
                        background: 'var(--accent-blue)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: '#fff'
                    }}>
                        {r.id}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{r.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.desc}</div>
                    </div>
                </div>
            ))}

            <div style={{
                marginTop: '8px',
                padding: '12px',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '8px',
                fontSize: '0.7rem',
                color: 'var(--accent-cyan)',
                fontStyle: 'italic',
                textAlign: 'center'
            }}>
                {t('rule.quote')}
            </div>
        </div>
    );
}
