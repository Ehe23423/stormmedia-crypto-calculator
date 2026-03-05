import { useEffect, useState } from 'react';

export function WhaleEffect({ isWhale }: { isWhale: boolean }) {
    const [showAlert, setShowAlert] = useState(false);

    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        if (isWhale && !hasPlayed) {
            setShowAlert(true);
            setHasPlayed(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (!isWhale) {
            setHasPlayed(false); // Reset if they drop below whale level so it can trigger again
            setShowAlert(false);
        }
    }, [isWhale, hasPlayed]);

    if (!isWhale && !showAlert) return null;

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
