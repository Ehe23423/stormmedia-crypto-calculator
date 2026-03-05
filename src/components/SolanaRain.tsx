import { useState, useCallback } from 'react';

export type CoinType = 'SOL' | 'BTC' | 'ETH' | 'DOGE' | 'XRP';

export const COIN_ICONS: Record<CoinType, { url: string; shadow: string }> = {
    SOL: { url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/sol.svg', shadow: 'rgba(20, 241, 149, 0.6)' },
    BTC: { url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/btc.svg', shadow: 'rgba(247, 147, 26, 0.6)' },
    ETH: { url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/eth.svg', shadow: 'rgba(98, 126, 234, 0.6)' },
    DOGE: { url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/doge.svg', shadow: 'rgba(194, 166, 51, 0.6)' },
    XRP: { url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/xrp.svg', shadow: 'rgba(35, 41, 47, 0.6)' },
};

export function useCryptoRain() {
    const [particles, setParticles] = useState<{ id: number; left: string; duration: string; delay: string; size: string; coin: CoinType }[]>([]);

    const triggerRain = useCallback((coinType: CoinType = 'SOL') => {
        const newParticles = Array.from({ length: 60 }).map((_, i) => ({
            id: Date.now() + i,
            left: Math.random() * 100 + 'vw',
            duration: 2 + Math.random() * 3 + 's',
            delay: Math.random() * 2 + 's',
            size: 20 + Math.random() * 40 + 'px',
            coin: coinType
        }));
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 6000);
    }, []);

    if (typeof window !== 'undefined') {
        (window as any).triggerCryptoRain = triggerRain;
    }

    const RainComponent = (
        <>
            {particles.map(p => (
                <img
                    key={p.id}
                    className="crypto-coin"
                    src={COIN_ICONS[p.coin].url}
                    style={{
                        left: p.left,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        width: p.size,
                        height: p.size,
                        filter: `drop-shadow(0 0 10px ${COIN_ICONS[p.coin].shadow})`
                    }}
                />
            ))}
        </>
    );

    return { RainComponent, triggerRain };
}
