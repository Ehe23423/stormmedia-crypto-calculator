

export function KnowledgeBase() {
    return (
        <div className="knowledge-base glass-panel fade-in" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Header Section */}
            <section style={{ textAlign: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '32px' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--accent-blue)', marginBottom: '16px' }}>PHILOSOPHY & STRATEGY</h2>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                    "Most exchanges operate on a standard template: affiliate link, basic commission, generic conditions. We don’t!!! We structure partnerships around actual trader activity, real monthly volume, and long-term scalability."
                </p>
            </section>

            {/* Target Audience Section */}
            <div className="grid-layout grid-cols-2">
                <section className="glass-panel" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <h3 style={{ color: 'var(--accent-blue)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🎯</span> TARGET: LARGE COMMUNITIES
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li>• Telegram / Discord groups</li>
                        <li>• Twitter crypto influencers</li>
                        <li>• Active, volume-driven traders</li>
                        <li>• BTC / ETH / alt futures traders</li>
                        <li>• Admins with decision-making power</li>
                        <li>• Streamers</li>
                    </ul>
                </section>

                <section className="glass-panel" style={{ background: 'rgba(139, 92, 246, 0.05)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <h3 style={{ color: 'var(--accent-purple)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🐋</span> TARGET: WHALES
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li>• Traders doing serious monthly volume</li>
                        <li>• Traders with VIP status on other exchanges</li>
                        <li>• Consistent performers</li>
                        <li>• High-Volume Traders (Self-driven)</li>
                    </ul>
                </section>
            </div>

            {/* Why Work With Us Section */}
            <section style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <h3 style={{ marginBottom: '20px' }}>WHY WORK WITH US?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    Because we structure deals properly. Even a <strong>0.01% fee improvement</strong> equals thousands saved. We don’t throw random affiliate links and hope. We build custom setups.
                </p>
                <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>
                        Futures-driven communities
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-emerald)', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'center' }}>
                        Backend economics for Admins
                    </div>
                </div>
            </section>

            {/* Fee Structure Section */}
            <section>
                <h3 style={{ marginBottom: '24px', textAlign: 'center' }}>BINGX VIP FEE SCHEDULE (FUTURES)</h3>
                <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <tr>
                                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>Tier</th>
                                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>Maker Fee</th>
                                <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid var(--border-light)' }}>Taker Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}>Regular (VIP 0)</td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}>0.020%</td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}>0.050%</td>
                            </tr>
                            <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}><strong>Supreme VIP</strong></td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}><strong>0.000%</strong></td>
                                <td style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}><strong>0.028%</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                    At scale, fee optimization becomes <strong>P&L protection</strong>.
                </p>
            </section>

            {/* Math Example */}
            <div className="grid-layout grid-cols-2">
                <section className="glass-panel" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
                    <h4 style={{ color: 'var(--accent-rose)', marginBottom: '12px' }}>50M Monthly Volume</h4>
                    <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>Regular Fee: $25,000</p>
                    <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>Supreme Fee: $14,000</p>
                    <div style={{ marginTop: '8px', color: 'var(--accent-emerald)', fontWeight: 'bold' }}>Savings: $11,000 / month</div>
                </section>
                <section className="glass-panel" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
                    <h4 style={{ color: 'var(--accent-rose)', marginBottom: '12px' }}>100M Monthly Volume</h4>
                    <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>Regular Fee: $50,000</p>
                    <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>Supreme Fee: $28,000</p>
                    <div style={{ marginTop: '8px', color: 'var(--accent-emerald)', fontWeight: 'bold' }}>Savings: $22,000 / month</div>
                </section>
            </div>

            {/* Upgrade Policy */}
            <section className="glass-panel" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid var(--accent-blue)' }}>
                <h3 style={{ marginBottom: '16px' }}>VIP UPGRADE POLICY</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '20px' }}>
                    We don’t just match — we upgrade. If someone already has VIP on Binance, Bybit, OKX, etc., we can place them at a <strong>higher VIP tier</strong> from day one.
                </p>
                <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
                    <div>✅ Proof of Volume</div>
                    <div>✅ Basic Verification</div>
                    <div>✅ Better Rates Instantly</div>
                </div>
            </section>

            {/* Footer Info */}
            <section style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.8rem', borderTop: '1px solid var(--border-light)', paddingTop: '32px' }}>
                <p>BINXG COMPLIANCE: List of restricted jurisdictions applies.</p>
                <p>This is not automated retail onboarding. This is volume-driven negotiation.</p>
                <h4 style={{ marginTop: '16px', color: 'var(--text-primary)' }}>Szymon • Business Development</h4>
            </section>

        </div>
    );
}
