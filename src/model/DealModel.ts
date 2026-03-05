import { toNum, safeDiv, validateMetricsSafe } from '../lib/safeMath';

/**
 * SZYMON CRYPTO BRAIN - CANONICAL CALCULATION ENGINE
 * Pure stateless math logic based on the Bloomberg Terminal specification.
 */

export interface DealParams {
    V: number;  // Volume (USD)
    F: number;  // Fee Percentage (e.g. 0.035 for 0.035%) -> internally 0.00035
    P: number;  // Partner Share Percentage (0-80) -> internally 0.50
    S: number;  // Sub Split Percentage (0-50) -> internally 0.30
    R: number;  // Retainer (USD)
    I: number;  // Operational Cost (USD)
    B: number;  // Bonus per 1M (USD)
    safetyThreshold: number; // Percentage (0-40)
}

export interface DealResult {
    grossFees: number;
    partnerPool: number;
    subRevenue: number;
    exchangeRetained: number;
    netProfit: number;
    marginBuffer: number;
    breakEvenVolume: number;
    isSafe: boolean;
    isBlocked: boolean;
    safetyThreshold: number;
    status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'SUICIDAL' | 'BLOCKED';
}

export function calculateDealMetrics(rawParams: DealParams): DealResult {
    // 1. Sanitize & Normalize
    const volume = Math.max(0, toNum(rawParams.V));
    const feeDec = Math.max(0, toNum(rawParams.F)) / 100; // 0.035 -> 0.00035
    const partnerShareDec = Math.max(0, toNum(rawParams.P)) / 100; // 50 -> 0.5
    const subSplitDec = Math.max(0, toNum(rawParams.S)) / 100; // 30 -> 0.3
    const retainer = Math.max(0, toNum(rawParams.R));
    const opCost = Math.max(0, toNum(rawParams.I));
    const bonusPer1M = Math.max(0, toNum(rawParams.B));
    const safetyThreshold = Math.max(0, toNum(rawParams.safetyThreshold || 15));

    // 2. Core P&L Formulas
    const grossFees = volume * feeDec;
    const partnerPool = grossFees * partnerShareDec;
    const subRevenue = partnerPool * subSplitDec;

    // Bonus logic: only if profitable? User prompt implies it's a cost. 
    // We treat it as an additional cost per 1M volume.
    const totalBonus = (volume / 1_000_000) * bonusPer1M;

    const exchangeRetained = grossFees - partnerPool;
    const netProfit = exchangeRetained - retainer - opCost - totalBonus;

    // 3. Margin & Break-even
    const marginBuffer = safeDiv(netProfit, grossFees, 0);

    // breakEvenVolume = (retainer + operationalCost) / (fee * (1 - partnerShare))
    const feeCapture = feeDec * (1 - partnerShareDec);
    const totalFixedCosts = retainer + opCost;
    // Note: bonusPer1M also affects break-even. 
    // netProfit = (V * feeDec * (1 - partnerShareDec)) - (V/1M * bonus) - fixed = 0
    // V * (feeCapture - bonus/1M - fixed/V) = 0? 
    // V = fixed / (feeCapture - bonusPer1M/1M)
    const effectiveVariableReturn = feeCapture - (bonusPer1M / 1_000_000);
    const breakEvenVolume = safeDiv(totalFixedCosts, effectiveVariableReturn, 0);

    // 4. Status Determination
    const bufferPct = marginBuffer * 100;
    const isBlocked = bufferPct < safetyThreshold;

    let status: DealResult['status'] = 'SUICIDAL';

    if (isBlocked) status = 'BLOCKED';
    else if (bufferPct > 30) status = 'SAFE';
    else if (bufferPct > 15) status = 'WARNING';
    else if (bufferPct > 5) status = 'CRITICAL';
    else status = 'SUICIDAL';

    const result: DealResult = {
        grossFees,
        partnerPool,
        subRevenue,
        exchangeRetained,
        netProfit,
        marginBuffer,
        breakEvenVolume,
        isSafe: bufferPct >= safetyThreshold && bufferPct > 15,
        isBlocked,
        safetyThreshold,
        status
    };

    validateMetricsSafe(result, "CanonicalDealEngine");
    return result;
}
