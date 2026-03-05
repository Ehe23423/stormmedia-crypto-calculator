import { useState } from 'react';

export function PartnerRevenueSim() {
    const [volume, setVolume] = useState(10_000_000);
    const [feeLevel, setFeeLevel] = useState(0.0005);
    const [commissionPercent, setCommissionPercent] = useState(40);
    const [bonusPer1M, setBonusPer1M] = useState(100);

    const totalFees = volume * feeLevel;
    const commissionEarnings = totalFees * (commissionPercent / 100);
    const incentiveEarnings = (volume / 1_000_000) * bonusPer1M;
    const totalPartnerRevenue = commissionEarnings + incentiveEarnings;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Calculate max height for chart bars
    const maxBarValue = Math.max(totalFees, totalPartnerRevenue);
    const commissionHeight = maxBarValue > 0 ? (commissionEarnings / maxBarValue) * 100 : 0;
    const incentiveHeight = maxBarValue > 0 ? (incentiveEarnings / maxBarValue) * 100 : 0;
    const feesHeight = maxBarValue > 0 ? (totalFees / maxBarValue) * 100 : 0;

    return (
        <div className="glass-panel" style={{ marginTop: '24px', background: 'rgba(236, 72, 153, 0.05)', borderColor: 'var(--accent-pink)' }}>
            <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>💰</span> PARTNER REVENUE SIMULATION
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="input-group">
                        <label className="input-label">Monthly Trading Volume (USD)</label>
                        <input type="number" value={volume} onChange={e => setVolume(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Trading Fee Level (%)</label>
                        <input type="number" step="0.001" value={feeLevel * 100} onChange={e => setFeeLevel(Number(e.target.value) / 100)} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Commission Percentage (%)</label>
                        <input type="number" value={commissionPercent} onChange={e => setCommissionPercent(Number(e.target.value))} />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Incentive Bonus per 1M (USD)</label>
                        <input type="number" value={bonusPer1M} onChange={e => setBonusPer1M(Number(e.target.value))} />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Fees Generated</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{formatCurrency(totalFees)}</div>
                        </div>
                        <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid var(--accent-emerald)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', marginBottom: '4px' }}>Total Partner Revenue</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-emerald)' }}>{formatCurrency(totalPartnerRevenue)}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flex: 1, alignItems: 'flex-end', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', height: '150px' }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                            <div style={{ height: `${feesHeight}%`, background: 'rgba(255,255,255,0.2)', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.3s' }}>
                                <span style={{ position: 'absolute', top: '-24px', width: '100%', textAlign: 'center', fontSize: '0.75rem' }}>Fees</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                            <div style={{ height: `${commissionHeight}%`, background: 'var(--accent-blue)', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.3s' }}>
                                <span style={{ position: 'absolute', top: '-24px', width: '100%', textAlign: 'center', fontSize: '0.75rem', color: 'var(--accent-blue)' }}>Comm.</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                            <div style={{ height: `${incentiveHeight}%`, background: 'var(--accent-pink)', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.3s' }}>
                                <span style={{ position: 'absolute', top: '-24px', width: '100%', textAlign: 'center', fontSize: '0.75rem', color: 'var(--accent-pink)' }}>Bonus</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Revenue Breakdown: {formatCurrency(commissionEarnings)} (Commission) + {formatCurrency(incentiveEarnings)} (Incentives)
                    </div>

                </div>
            </div>
        </div>
    );
}
