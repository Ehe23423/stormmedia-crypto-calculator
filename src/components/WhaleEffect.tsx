import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/LanguageContext';

export function WhaleEffect({ volume }: { volume: number }) {
    const { t } = useLanguage();
    const [showAlert, setShowAlert] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const TRIGGER_VOL = 100_000_000;
        const RESET_VOL = 90_000_000; // Drop to 90M to reset

        if (volume >= TRIGGER_VOL && !hasPlayed) {
            setShowAlert(true);
            setHasPlayed(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else if (volume < RESET_VOL && hasPlayed) {
            setHasPlayed(false);
            setShowAlert(false);
        }
    }, [volume, hasPlayed]);

    if (!showAlert) return null;

    return (
        <>
            <div className="whale-alert">
                {t('whale.alert')}
            </div>
            <div className="whale-overlay">
                <div className="whale-sprite">🐳</div>
            </div>
        </>
    );
}
