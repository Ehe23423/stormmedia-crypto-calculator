import { useEffect, useState } from 'react';

export function WhaleEffect({ volume }: { volume: number }) {
    const [showAlert, setShowAlert] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const TRIGGER_VOL = 100_000_000;
        const RESET_VOL = 90_000_000; // Drop to 90M to reset

        if (volume >= TRIGGER_VOL && !hasPlayed) {
            console.log("WHALE TRIGGERED");
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


    if (volume < 100_000_000 && !showAlert) return null;

    return (
        <>
            {showAlert && (
                <div className="whale-alert">
                    <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '16px', filter: 'drop-shadow(0 0 20px rgba(139, 233, 253, 0.5))' }}>🐋</span>
                    WHALE DETECTED
                    <div style={{ fontSize: '1rem', marginTop: '12px', opacity: 0.9, color: 'var(--accent-blue)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
                        CRYPTO VIBE ENGINE ACTIVE
                    </div>
                </div>
            )}
            <div className="whale-overlay">
                <div className="whale-sprite">🐳</div>
            </div>
        </>
    );
}
