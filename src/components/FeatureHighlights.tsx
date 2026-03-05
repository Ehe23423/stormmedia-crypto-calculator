
import '../index.css';

export function FeatureHighlights() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>

            {/* Card 1: Abstract Chart */}
            <div className="glass-panel feature-card">
                <div className="card-graphic">
                    <div className="abstract-chart">
                        <svg viewBox="0 0 200 80" width="100%" height="100%" preserveAspectRatio="none">
                            <path d="M0,80 Q25,40 50,60 T100,30 T150,50 T200,10" fill="none" stroke="var(--accent-purple)" strokeWidth="3" />
                            <circle cx="50" cy="60" r="4" fill="var(--accent-purple)" />
                            <circle cx="100" cy="30" r="4" fill="var(--bg-dark)" stroke="var(--accent-purple)" strokeWidth="2" />
                            <circle cx="150" cy="50" r="4" fill="var(--bg-dark)" stroke="var(--accent-purple)" strokeWidth="2" />
                            <circle cx="200" cy="10" r="4" fill="var(--bg-dark)" stroke="var(--accent-purple)" strokeWidth="2" />
                        </svg>
                        <div className="floating-tag tag-1">Tight Spreads</div>
                        <div className="floating-tag tag-2">No Commissions</div>
                    </div>
                </div>
                <div className="card-content">
                    <h3>Institutional Spreads</h3>
                    <p>Access some of the lowest all-in costs. Benefit from market-leading prices and zero commissions.</p>
                </div>
            </div>

            {/* Card 2: Tier One Liquidity (Floating Icons) */}
            <div className="glass-panel feature-card">
                <div className="card-graphic">
                    <div className="liquidity-ring">
                        <div className="center-node">🏦</div>
                        <div className="orbiting-node n1">💰</div>
                        <div className="orbiting-node n2">📈</div>
                        <div className="orbiting-node n3">⚡</div>
                    </div>
                </div>
                <div className="card-content">
                    <h3>Tier-One Liquidity</h3>
                    <p>Sourced from major institutions and top cryptocurrency exchanges to offer the best trading conditions.</p>
                </div>
            </div>

            {/* Card 3: Deep Markets (Bars) */}
            <div className="glass-panel feature-card">
                <div className="card-graphic">
                    <div className="crypto-pairs">
                        <div className="pair-row"><span>BTC/USDT</span> <span className="pair-val">0.05</span></div>
                        <div className="pair-row"><span>ETH/USDT</span> <span className="pair-val">0.03</span></div>
                        <div className="pair-row"><span>SOL/USDT</span> <span className="pair-val">0.01</span></div>
                        <div className="floating-plus">+</div>
                    </div>
                </div>
                <div className="card-content">
                    <h3>200+ Crypto Pairs</h3>
                    <p>Trade your favorite pairs with tight spreads and huge depth. Scale up without slippage.</p>
                </div>
            </div>

        </div>
    );
}
