import { useEffect, useState } from 'react';

interface CoinData {
    symbol: string;
    price: number;
    change: number;
}

export function CryptoTicker() {
    const [coins, setCoins] = useState<CoinData[]>([
        { symbol: 'BTC', price: 92450.00, change: 2.5 },
        { symbol: 'ETH', price: 3450.20, change: -1.2 },
        { symbol: 'SOL', price: 145.60, change: 5.4 },
        { symbol: 'BNB', price: 610.15, change: 0.8 },
        { symbol: 'XRP', price: 0.58, change: -0.4 },
        { symbol: 'DOGE', price: 0.15, change: 12.5 },
        { symbol: 'ADA', price: 0.45, change: 1.1 },
        { symbol: 'AVAX', price: 35.20, change: -3.2 },
    ]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","DOGEUSDT","ADAUSDT","AVAXUSDT"]');
                if (!response.ok) return;
                const data = await response.json();
                const formatted = data.map((item: any) => ({
                    symbol: item.symbol.replace('USDT', ''),
                    price: parseFloat(item.lastPrice),
                    change: parseFloat(item.priceChangePercent),
                }));
                setCoins(formatted);
            } catch (e) {
                console.error('Failed to fetch crypto prices from Binance', e);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="crypto-ticker-container">
            <div className="crypto-ticker-marquee">
                {/* Double array for seamless loop */}
                {[...coins, ...coins].map((coin, i) => (
                    <div key={`${coin.symbol}-${i}`} className="crypto-ticker-item">
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{coin.symbol}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>${coin.price.toLocaleString(undefined, { minimumFractionDigits: coin.price < 1 ? 4 : 2, maximumFractionDigits: coin.price < 1 ? 4 : 2 })}</span>
                        <span style={{
                            color: coin.change >= 0 ? '#10b981' : '#f43f5e',
                            fontWeight: '600',
                            marginLeft: '4px'
                        }}>
                            {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
