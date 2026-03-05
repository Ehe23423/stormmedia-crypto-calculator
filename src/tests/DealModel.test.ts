import { describe, it, expect } from 'vitest';
import { calculateDealMetrics } from '../model/DealModel';
import type { DealParams } from '../model/DealModel';

describe('Canonical Economics Engine (DealModel)', () => {
    const baseline: DealParams = {
        V: 10_000_000,   // 10M
        F: 0.035,        // 0.035%
        P: 40,           // 40%
        S: 30,           // 30%
        R: 1000,         // Retainer
        I: 500,          // Ops
        B: 0,
        safetyThreshold: 15
    };

    it('Scenario 1: Baseline 10M Deal', () => {
        const res = calculateDealMetrics(baseline);

        // grossFees = 10M * 0.00035 = 3500
        expect(res.grossFees).toBeCloseTo(3500, 5);

        // partnerPool = 3500 * 0.4 = 1400
        expect(res.partnerPool).toBeCloseTo(1400, 5);

        // exchangeRetained = 3500 - 1400 = 2100
        expect(res.exchangeRetained).toBeCloseTo(2100, 5);

        // netProfit = 2100 - 1000 - 500 = 600
        expect(res.netProfit).toBeCloseTo(600, 5);

        // marginBuffer = 600 / 3500 ≈ 0.1714 (17.1%)
        expect(res.marginBuffer).toBeCloseTo(0.1714, 3);

        expect(res.isBlocked).toBe(false);
        expect(res.status).toBe('WARNING'); // Between 15% and 30%
    });

    it('Scenario 2: Higher Retainer (R) -> Net Profit decreases', () => {
        const lowR = calculateDealMetrics({ ...baseline, R: 500 });
        const highR = calculateDealMetrics({ ...baseline, R: 2000 });

        expect(highR.netProfit).toBeLessThan(lowR.netProfit);
        expect(highR.marginBuffer).toBeLessThan(lowR.marginBuffer);
    });

    it('Scenario 3: Higher Sub-Split (S) -> Sub Revenue increases, but Net Profit same (since it comes out of partner pool)', () => {
        const lowS = calculateDealMetrics({ ...baseline, S: 20 });
        const highS = calculateDealMetrics({ ...baseline, S: 50 });

        expect(highS.subRevenue).toBeGreaterThan(lowS.subRevenue);
        expect(highS.netProfit).toBeCloseTo(lowS.netProfit, 5);
    });

    it('Scenario 4: Break-even Logic', () => {
        // volume required to cover 1500 fixed costs with (0.035% * (1 - 40%)) = 0.00021 fee capture
        // BE = 1500 / 0.00021 ≈ 7,142,857
        const res = calculateDealMetrics(baseline);
        expect(res.breakEvenVolume).toBeCloseTo(7142857, 0);
    });

    it('Scenario 5: No NaN for Zero Inputs', () => {
        const zeros = { ...baseline, V: 0, F: 0, R: 0, I: 0 };
        const res = calculateDealMetrics(zeros);

        expect(res.netProfit).toBe(0);
        expect(res.marginBuffer).toBe(0);
        expect(res.breakEvenVolume).toBe(0);
    });
});
