import { useState } from 'react';
import { formatPct } from '../lib/safeMath';
import type { DealResult } from '../model/DealModel';

export function DealScore({ metrics, forcedRoastMode }: { metrics: DealResult, forcedRoastMode?: boolean }) {
    const [localRoastMode, setLocalRoastMode] = useState(false);
    const roastMode = forcedRoastMode || localRoastMode;

    // Use pre-computed, safe percentage from DealModel (or fallback to 0 if missing)
    const safetyBufferVal = metrics.safetyBufferPct ?? 0;
    const safetyBufferPctNum = safetyBufferVal * 100;
    const safetyBufferDisplay = isFinite(safetyBufferPctNum) ? formatPct(safetyBufferVal) : '—';

    let color = 'var(--text-primary)';
    let badge = '🟢';
    let profStatus = 'EXCELLENT';
    let roastStatus = 'Miracles happen.';
    let comment = 'This structure leaves ample margin for operations and profitability.';
    let roastComment = 'Yes, this deal works. Miracles happen. Don\'t screw it up during onboarding.';

    if (safetyBufferPctNum < 10) {
        color = 'var(--accent-rose)';
        badge = '🔴';
        profStatus = 'CRITICAL RISK';
        roastStatus = 'FINANCIALLY QUESTIONABLE';
        comment = 'Safety buffer is dangerously low. Deal is highly likely to lose money.';
        roastComment = 'This structure destroys your margin faster than a degenerate trader with 150x leverage. Try therapy instead of Business Development.';
    } else if (safetyBufferPctNum < 25) {
        color = '#f59e0b'; // amber
        badge = '🟡';
        profStatus = 'MARGINAL';
        roastStatus = 'ADMIRABLE CONFIDENCE';
        comment = 'Acceptable but tight. Ensure volume projections are strictly verified.';
        roastComment = 'Partner asking for this much? Admirable confidence. Financially questionable, but emotionally entertaining.';
    }

    if (metrics.net < 0) {
        color = 'var(--danger-deep)';
        badge = '☠️';
        profStatus = 'NEGATIVE NET';
        roastStatus = 'ABSOLUTE DISASTER';
        comment = 'This deal generates net losses. Do not sign.';
        roastComment = 'You are literally paying them to trade on our platform. Are you running a charity or an exchange? Immediate abort.';
    }

    return (
        <div style={{ padding: '24px', background: `color-mix(in srgb, ${color} 5%, var(--bg-card))`, border: `1px solid ${color}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: roastMode ? 'var(--accent-pink)' : 'var(--text-secondary)', fontWeight: 'bold' }}>
                    🔥 ROAST MODE
                    <input type="checkbox" checked={roastMode} onChange={(e) => setLocalRoastMode(e.target.checked)} style={{ width: 'auto', margin: 0 }} />
                </label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '3rem', lineHeight: 1 }}>{badge}</div>
                <div>
                    <h3 style={{ margin: 0, color: color, fontSize: '1.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {roastMode ? roastStatus : profStatus}
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Safety Buffer: <strong style={{ color: color }}>{safetyBufferDisplay}</strong></div>
                </div>
            </div>

            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.5, padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `4px solid ${color}` }}>
                {roastMode ? roastComment : comment}
            </p>
        </div>
    );
}
