import { useEffect, useState } from 'react';

interface CoinData {
    symbol: string;
    price: number;
    change: number;
}

const COINS = ['BTC-USDT', 'ETH-USDT', 'SOL-USDT', 'BNB-USDT', 'XRP-USDT', 'DOGE-USDT', 'ADA-USDT', 'AVAX-USDT'];

const FALLBACK: CoinData[] = [
    { symbol: 'BTC', price: 92450.00, change: 2.5 },
    { symbol: 'ETH', price: 3450.20, change: -1.2 },
    { symbol: 'SOL', price: 145.60, change: 5.4 },
    { symbol: 'BNB', price: 610.15, change: 0.8 },
    { symbol: 'XRP', price: 0.58, change: -0.4 },
    { symbol: 'DOGE', price: 0.15, change: 12.5 },
    { symbol: 'ADA', price: 0.45, change: 1.1 },
    { symbol: 'AVAX', price: 35.20, change: -3.2 },
];

export function CryptoTicker() {
    const [coins, setCoins] = useState<CoinData[]>(FALLBACK);
    const [isLive, setIsLive] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchPrices = async () => {
            // Try BingX first
            try {
                const symbolQueries = COINS.map(s => `symbol=${s}`).join('&');
                // BingX's public ticker endpoint (no auth needed for public market data)
                const bingxRes = await fetch(
                    `https://open-api.bingx.com/openApi/spot/v1/ticker/24hr?${symbolQueries}`,
                    { cache: 'no-store' }
                );
                if (bingxRes.ok) {
                    const bingxData = await bingxRes.json();
                    if (bingxData?.data && Array.isArray(bingxData.data) && bingxData.data.length > 0) {
                        const formatted = bingxData.data.map((item: any) => ({
                            symbol: (item.symbol || '').replace('-USDT', ''),
                            price: parseFloat(item.lastPrice || item.closePrice || '0'),
                            change: parseFloat(item.priceChangePercent || '0'),
                        })).filter((c: CoinData) => c.price > 0);
                        if (formatted.length > 0) {
                            setCoins(formatted);
                            setIsLive(true);
                            setLastUpdate(new Date());
                            return;
                        }
                    }
                }
            } catch {
                // BingX failed, fall through to Binance
            }

            // Fallback to Binance
            try {
                const binanceSymbols = COINS.map(s => `"${s.replace('-', '')}"`).join(',');
                const response = await fetch(
                    `https://api.binance.com/api/v3/ticker/24hr?symbols=[${binanceSymbols}]`
                );
                if (!response.ok) return;
                const data = await response.json();
                const formatted = data.map((item: any) => ({
                    symbol: item.symbol.replace('USDT', ''),
                    price: parseFloat(item.lastPrice),
                    change: parseFloat(item.priceChangePercent),
                }));
                setCoins(formatted);
                setIsLive(true);
                setLastUpdate(new Date());
            } catch (e) {
                console.error('Both BingX and Binance price fetch failed', e);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="crypto-ticker-container">
            {/* Live source badge */}
            <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '6px',
                padding: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                border: isLive ? '1px solid rgba(16,185,129,0.4)' : '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: isLive ? '#10b981' : 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
            }}>
                <div style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: isLive ? '#10b981' : 'rgba(255,255,255,0.3)',
                    boxShadow: isLive ? '0 0 6px #10b981' : 'none',
                    animation: isLive ? 'pulse 2s infinite' : 'none',
                }} />
                {isLive ? '⚡ EXCHANGE LIVE' : 'DEMO'}
                {lastUpdate && (
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                        {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </div>
            <div className="crypto-ticker-marquee" style={{ paddingLeft: '110px' }}>
                {[...coins, ...coins].map((coin, i) => (
                    <div key={`${coin.symbol}-${i}`} className="crypto-ticker-item">
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{coin.symbol}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            ${coin.price.toLocaleString(undefined, {
                                minimumFractionDigits: coin.price < 1 ? 4 : 2,
                                maximumFractionDigits: coin.price < 1 ? 4 : 2
                            })}
                        </span>
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
