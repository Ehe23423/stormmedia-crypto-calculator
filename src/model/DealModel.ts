import { toNum, safeDiv, validateMetricsSafe } from '../lib/safeMath';

/**
 * SZYMON CRYPTO BRAIN V3 - CANONICAL UNIFIED ENGINE
 * Consolidation of all BD logic: Blended Fees, Partner Shares, Sub-splits, and Safety Locks.
 */

export interface DealParams {
    V: number;  // Volume (USD)
    F: number;  // Blended Fee Percentage (e.g. 0.035 for 0.035%)
    P: number;  // Partner Share Percentage (0-100)
    S: number;  // Sub Split Percentage (0-100)
    R: number;  // Fixed Retainer (USD)
    I: number;  // Infrastructure/Op Cost (USD)
    B: number;  // Bonus per 1M Volume (USD)
    safetyThreshold: number; // Minimum Margin Buffer %
    productType: 'SPOT' | 'FUTURES';
    exchangeFlavor: 'GENERIC' | 'BINGX';
}

export interface DealResult {
    grossFees: number;
    partnerPool: number;
    subRevenue: number;
    exchangeRetained: number;
    retainedPer1M: number;
    netProfit: number;
    marginBuffer: number;
    breakEvenVolume: number;
    isSafe: boolean;
    isBlocked: boolean;
    status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'BLOCKED';
}

export function calculateDealMetrics(p: DealParams): DealResult {
    const volume = toNum(p.V);
    const feeDec = toNum(p.F) / 100;           // 0.035 -> 0.00035
    const partnerShareDec = toNum(p.P) / 100;   // 40 -> 0.4
    const subSplitDec = toNum(p.S) / 100;       // 30 -> 0.3
    const retainer = toNum(p.R);
    const opCost = toNum(p.I);
    const bonusPer1M = toNum(p.B);
    const safetyThreshold = toNum(p.safetyThreshold || 15);

    // 1. Calculations
    const grossFees = volume * feeDec;
    const partnerPool = grossFees * partnerShareDec;
    const subRevenue = partnerPool * subSplitDec;

    // Total variable costs
    const totalBonus = (volume / 1_000_000) * bonusPer1M;

    // Exchange Bottom Line
    const exchangeRetained = grossFees - partnerPool;
    const netProfit = exchangeRetained - retainer - opCost - totalBonus;

    // 2. Metrics
    const marginBuffer = safeDiv(netProfit, grossFees, 0);
    const bufferPct = marginBuffer * 100;

    // Break-even: Fixed Costs / (FeeCapture - BonusCapture)
    const feeCapture = feeDec * (1 - partnerShareDec);
    const bonusCapture = bonusPer1M / 1_000_000;
    const effectiveMargin = feeCapture - bonusCapture;
    const breakEvenVolume = safeDiv(retainer + opCost, effectiveMargin, 0);

    // 3. Status
    const isBlocked = bufferPct < safetyThreshold;
    let status: DealResult['status'] = 'CRITICAL';

    if (isBlocked) {
        status = 'BLOCKED';
    } else if (bufferPct >= (safetyThreshold + 15)) {
        // Significantly above threshold
        status = 'SAFE';
    } else if (bufferPct >= (safetyThreshold + 5)) {
        // Comfortably above threshold
        status = 'WARNING';
    } else {
        // Barely above threshold
        status = 'CRITICAL';
    }

    const retainedPer1M = volume > 0 ? (exchangeRetained / volume) * 1_000_000 : 0;

    const result: DealResult = {
        grossFees,
        partnerPool,
        subRevenue,
        exchangeRetained,
        retainedPer1M,
        netProfit,
        marginBuffer,
        breakEvenVolume,
        isSafe: !isBlocked,
        isBlocked,
        status
    };

    validateMetricsSafe(result, "V3UnifiedEngine");
    return result;
}
