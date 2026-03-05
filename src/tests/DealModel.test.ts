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
        bonusPer1M: 0,
        useTiers: false,
        tiers: [],
        useMilestones: false,
        milestones: [],
        requireMarginLock: false
    };

    it('Scenario 1: Baseline 10M Deal', () => {
        const res = calculateDealMetrics(baseline);

        // feePer1M = 1M * 0.00035 = 350
        expect(res.feePer1M).toBeCloseTo(350, 5);

        // retainedPer1M = 350 * 0.4 * (1 - 0.3) = 350 * 0.4 * 0.7 = 98
        expect(res.retainedPer1M).toBeCloseTo(98, 5);

        // baseCosts = 1000 + 500 = 1500
        expect(res.baseCosts).toBeCloseTo(1500, 5);

        // grossRetained = 10 * 98 = 980
        expect(res.grossRetained).toBeCloseTo(980, 5);

        // net = 980 - 1500 = -520
        expect(res.net).toBeCloseTo(-520, 5);

        // safetyBufferPct = (-520 / 1500) * 100 = -34.66%
        expect(res.safetyBufferPct).toBeCloseTo(-34.66, 1);

        expect(res.isSustainable).toBe(false);
    });

    it('Scenario 2: Higher Retainer (R) -> Net and SafetyBuffer must decrease', () => {
        const lowR = calculateDealMetrics({ ...baseline, R: 500 });
        const highR = calculateDealMetrics({ ...baseline, R: 2000 });

        expect(highR.net).toBeLessThan(lowR.net);
        expect(highR.safetyBufferPct!).toBeLessThan(lowR.safetyBufferPct!);
    });

    it('Scenario 3: Higher Sub-Split (S) -> Net must decrease', () => {
        const lowS = calculateDealMetrics({ ...baseline, S: 20 });
        const highS = calculateDealMetrics({ ...baseline, S: 50 });

        expect(highS.net).toBeLessThan(lowS.net);
    });

    it('Scenario 4: Break-even Logic', () => {
        const profitable = { ...baseline, V: 50_000_000 }; // 50M
        const res = calculateDealMetrics(profitable);

        // grossRetained = 50 * 98 = 4900
        // net = 4900 - 1500 = 3400
        expect(res.net).toBeCloseTo(3400, 5);
        expect(res.isSustainable).toBe(true);

        // breakEvenVolume = 1500 / 98 * 1,000,000 ≈ 15,306,122
        expect(res.breakEvenVolume).toBeCloseTo(15306122, 0);
    });

    it('Scenario 5: No NaN for Zero Inputs', () => {
        const zeros = { ...baseline, V: 0, F: 0, R: 0, I: 0 };
        const res = calculateDealMetrics(zeros);

        expect(res.net).toBe(0);
        expect(res.safetyBufferPct).toBe(null); // base is 0
        expect(res.breakEvenVolume).toBe(null); // retainedPer1M is 0
    });
});
