export interface DealParams {
    V: number; // Volume (USD)
    F: number; // Fee (e.g., 0.00035 for 0.035%)
    P: number; // Partner payout share (e.g., 0.40 for 40%)
    S: number; // Sub split (e.g., 0.30 for 30%)
    R: number; // Retainer (USD)
    I: number; // Operational cost (USD)
    bonusPer1M: number;
    useTiers: boolean;
    tiers: { threshold: number; s: number }[];
    useMilestones: boolean;
    milestones: { threshold: number; r: number }[];
    requireMarginLock: boolean;
}

export interface DealResult {
    grossPer1M: number;
    retainedPer1M: number;
    totalRetained: number;
    breakEvenVolume: number; // in USD
    netBeforeBonus: number;
    net: number;
    safetyMarginBuffer: number;
    isSustainable: boolean;
    isSafe: boolean;
    bonusCost: number;
    marginCollapseRisk: boolean;
    hunterEarnings: number;
    hunterEarningsPer1M: number;
}

export function calculateDealMetrics(params: DealParams): DealResult {
    const { V, F, P, S, R, I, bonusPer1M, useTiers, tiers, useMilestones, milestones } = params;

    // Base 1M unit
    const UNIT = 1_000_000;
    const vUnits = V / UNIT;

    // Tier computation
    let effectiveS = S;
    if (useTiers && tiers && tiers.length > 0) {
        const sortedTiers = [...tiers].sort((a, b) => b.threshold - a.threshold);
        const activeTier = sortedTiers.find(t => V >= t.threshold);
        if (activeTier) effectiveS = activeTier.s;
        else {
            const lowestTier = sortedTiers[sortedTiers.length - 1];
            effectiveS = V >= lowestTier.threshold ? lowestTier.s : S;
        }
    }

    // Milestone Retainer computation
    let effectiveR = R;
    if (useMilestones && milestones && milestones.length > 0) {
        effectiveR = milestones
            .filter(m => V >= m.threshold)
            .reduce((sum, m) => sum + m.r, 0);
    }

    // CORE EQUATIONS
    const grossPer1M = UNIT * F;
    const retainedPer1M = grossPer1M * P * (1 - effectiveS);

    const fixedCosts = effectiveR + I;
    const totalRetained = vUnits * retainedPer1M;

    // Break-even
    const breakEvenVolume = retainedPer1M > 0 ? (fixedCosts / retainedPer1M) * UNIT : Infinity;

    // Net before bonus
    const netBeforeBonus = totalRetained - fixedCosts;

    // Bonus Freeze Rule
    let finalBonusCost = 0;
    if (netBeforeBonus > 0) {
        finalBonusCost = vUnits * bonusPer1M;
    }

    // Final Net
    const net = netBeforeBonus - finalBonusCost;

    // Safety
    const isSustainable = net > 0;
    // retained revenue co najmniej 15% większy niż fixed base
    const isSafe = totalRetained >= 1.15 * fixedCosts;

    // Margin Meter
    const safetyMarginBuffer = totalRetained - fixedCosts;

    // Margin Floor Protection
    const marginCollapseRisk = retainedPer1M < 80;

    // Hunter Earnings (KOL/Partner facing metrics)
    // Formula from Modul 36: PartnerRevenue = V * F * P * S
    // Plus fixed costs they receive: Retainer + Bonus
    const baseHunterEarnings = UNIT * F * P * effectiveS;
    const totalHunterEarnings = (vUnits * baseHunterEarnings) + effectiveR + finalBonusCost;

    return {
        grossPer1M,
        retainedPer1M,
        totalRetained,
        breakEvenVolume,
        netBeforeBonus,
        net,
        safetyMarginBuffer,
        isSustainable,
        isSafe,
        bonusCost: finalBonusCost,
        marginCollapseRisk,
        hunterEarnings: totalHunterEarnings,
        hunterEarningsPer1M: baseHunterEarnings,
    };
}
