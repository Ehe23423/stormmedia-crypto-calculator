import { useState, useCallback } from 'react';

export function useSolanaRain() {
    const [particles, setParticles] = useState<{ id: number; left: string; duration: string; delay: string; size: string }[]>([]);

    const triggerRain = useCallback(() => {
        const newParticles = Array.from({ length: 60 }).map((_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100 + 'vw',
            duration: 2 + Math.random() * 3 + 's',
            delay: Math.random() * 2 + 's',
            size: 20 + Math.random() * 40 + 'px'
        }));
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 6000);
    }, []);

    // Expose trigger globally for easier integration
    if (typeof window !== 'undefined') {
        (window as any).triggerSolanaRain = triggerRain;
    }

    const RainComponent = (
        <>
            {particles.map(p => (
                <div
                    key={p.id}
                    className="sol-coin"
                    style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay, width: p.size, height: p.size }}
                />
            ))}
        </>
    );

    return { RainComponent, triggerRain };
}
