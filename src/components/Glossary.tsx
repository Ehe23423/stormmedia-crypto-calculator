

import { useLanguage } from '../lib/LanguageContext';

export function Glossary() {
    const { t } = useLanguage();

    const TERMS = [
        { label: 'V', full: t('glossTerms.V.full'), desc: t('glossTerms.V.desc') },
        { label: 'F', full: t('glossTerms.F.full'), desc: t('glossTerms.F.desc') },
        { label: 'P', full: t('glossTerms.P.full'), desc: t('glossTerms.P.desc') },
        { label: 'S', full: t('glossTerms.S.full'), desc: t('glossTerms.S.desc') },
        { label: 'R', full: t('glossTerms.R.full'), desc: t('glossTerms.R.desc') },
        { label: 'I', full: t('glossTerms.I.full'), desc: t('glossTerms.I.desc') },
        { label: 'B', full: t('glossTerms.B.full'), desc: t('glossTerms.B.desc') },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TERMS.map(t => (
                <div key={t.label} style={{
                    display: 'grid',
                    gridTemplateColumns: '30px 1fr',
                    gap: '12px',
                    paddingBottom: '8px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)'
                }}>
                    <div style={{
                        fontWeight: 900,
                        color: 'var(--accent-blue)',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {t.label}
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                            {t.full}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.3, marginTop: '2px' }}>
                            {t.desc}
                        </div>
                    </div>
                </div>
            ))}
            <div style={{
                marginTop: '4px',
                fontSize: '0.6rem',
                color: 'var(--accent-cyan)',
                fontStyle: 'italic',
                opacity: 0.6
            }}>
                {t('gloss.hover')}
            </div>
        </div>
    );
}

export const getTooltips = (t: (key: string) => string) => ({
    V: t('tooltips.V'),
    F: t('tooltips.F'),
    P: t('tooltips.P'),
    S: t('tooltips.S'),
    R: t('tooltips.R'),
    I: t('tooltips.I'),
    B: t('tooltips.B'),
    margin: t('tooltips.margin')
});
