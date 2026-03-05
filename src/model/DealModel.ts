import { toNum, safeDiv, validateMetricsSafe } from '../lib/safeMath';

/**
 * Normalization Rules:
 * - V, R, I, bonusPer1M: Absolute USD values.
 * - F, P, S: Visualized as 0-100% in UI, handled as 0.x decimals internally.
 */

export interface DealParams {
    V: number; // Volume (USD)
    F: number; // Fee Percentage (e.g. 0.035 for 0.035%)
    P: number; // Payout Share Percentage (e.g. 40 for 40%)
    S: number; // Sub Split Percentage (e.g. 30 for 30%)
    R: number; // Retainer (USD)
    I: number; // Operational Cost (USD) - paid to Szymon
    bonusPer1M: number; // Bonus in USD per 1M volume
    useTiers: boolean;
    tiers: { threshold: number; s: number }[];
    useMilestones: boolean;
    milestones: { threshold: number; r: number }[];
    requireMarginLock: boolean;
}

export interface DealResult {
    // Basic normalized metrics
    feePer1M: number;           // feePer1M = 1_000_000 * (F / 100)
    retainedPer1M: number;      // retainedPer1M = feePer1M * P * (1 - S)
    baseCosts: number;          // R + I

    // Core P&L
    grossRetained: number;      // (V / 1M) * retainedPer1M
    net: number;                // grossRetained - baseCosts

    // Risk & Break-even (null if undefined/div-by-zero)
    safetyBufferPct: number | null; // (net / base) * 100
    breakEvenVolume: number | null; // (base / retainedPer1M) * 1M

    // Flags
    isSustainable: boolean;     // net > 0
    isSafe: boolean;            // safetyBufferPct >= 15

    // Bonus & Distributions
    bonusCost: number;          // Total Performance Bonus
    hunterEarnings: number;     // Total paid out (Split + Retainer + Bonus)
}

export function calculateDealMetrics(rawParams: DealParams): DealResult {
    // 1. Sanitize all inputs via the Numeric Safety Layer - Normalize to internal units
    // We treat F, P, S as percentages (0-100) from the UI and convert to 0-1 decimals here.
    const V = Math.max(0, toNum(rawParams.V));
    const fPct = Math.max(0, toNum(rawParams.F));
    const pDec = Math.max(0, toNum(rawParams.P)) / 100; // UI 40 -> Internal 0.4
    const sDec = Math.max(0, toNum(rawParams.S)) / 100; // UI 30 -> Internal 0.3
    const baseR = Math.max(0, toNum(rawParams.R));
    const baseI = Math.max(0, toNum(rawParams.I));
    const bonusPer1M = Math.max(0, toNum(rawParams.bonusPer1M));

    const useTiers = Boolean(rawParams.useTiers);
    const tiers = rawParams.tiers || [];
    const useMilestones = Boolean(rawParams.useMilestones);
    const milestones = rawParams.milestones || [];

    const UNIT = 1_000_000;

    // --- Tier Logic (Dynamic Sub Split) ---
    let effectiveSDec = sDec;
    if (useTiers && tiers.length > 0) {
        // Find highest tier threshold met
        const sortedTiers = [...tiers].sort((a, b) => b.threshold - a.threshold);
        const activeTier = sortedTiers.find(t => V >= t.threshold);
        if (activeTier) {
            effectiveSDec = activeTier.s / 100;
        } else {
            const lowestTier = sortedTiers[sortedTiers.length - 1];
            // If below even the lowest tier, use baseline S
            effectiveSDec = (V >= lowestTier.threshold ? lowestTier.s : (toNum(rawParams.S))) / 100;
        }
    }

    // --- Milestone Logic (Dynamic Retainer) ---
    let effectiveR = baseR;
    if (useMilestones && milestones.length > 0) {
        // Milestones add up based on what's met
        effectiveR = milestones
            .filter(m => V >= m.threshold)
            .reduce((sum, m) => sum + m.r, 0);
    }

    // ==========================================
    // CANONICAL FORMULAS (Requested by User)
    // ==========================================

    // feePer1M = 1,000,000 * (feePct / 100)
    const feePer1M = UNIT * (fPct / 100);

    // retainedPer1M = feePer1M * P * (1 - S)
    const retainedPer1M = feePer1M * pDec * (1 - effectiveSDec);

    // base = R + I
    const baseCosts = effectiveR + baseI;

    // grossRetained = (V / 1,000,000) * retainedPer1M
    const grossRetained = safeDiv(V, UNIT, 0) * retainedPer1M;

    // net = grossRetained - base
    const net = grossRetained - baseCosts;

    // safetyBufferPct = base == 0 ? null : (net / base) * 100
    const safetyBufferPct = baseCosts === 0 ? null : (net / baseCosts) * 100;

    // breakEvenVolume = retainedPer1M == 0 ? null : base / retainedPer1M * 1,000,000
    const breakEvenVolume = retainedPer1M === 0 ? null : (baseCosts / retainedPer1M) * UNIT;

    // --- Auxiliary Metrics ---

    // Total Bonus: Valid only if Net > 0 (Bonus Freeze Rule)
    const bonusCost = (net > 0) ? (safeDiv(V, UNIT, 0) * bonusPer1M) : 0;

    // Hunter Earnings: SubSplit + Retainer + Bonus
    // grossFees = V * (fPct/100)
    // agencyPayout = grossFees * pDec
    // hunterCommission = agencyPayout * effectiveSDec
    const grossFees = V * (fPct / 100);
    const agencyRevenue = grossFees * pDec;
    const hunterCommission = agencyRevenue * effectiveSDec;
    const hunterEarnings = hunterCommission + effectiveR + bonusCost;

    const result: DealResult = {
        feePer1M,
        retainedPer1M,
        baseCosts,
        grossRetained,
        net,
        safetyBufferPct,
        breakEvenVolume,
        isSustainable: net > 0,
        isSafe: (safetyBufferPct !== null && safetyBufferPct >= 15),
        bonusCost,
        hunterEarnings
    };

    validateMetricsSafe(result, "DealMetricsCanonical");

    return result;
}
