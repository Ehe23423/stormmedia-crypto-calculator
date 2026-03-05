import { describe, it, expect } from 'vitest';
import { calculateDealMetrics } from '../model/DealModel';
import type { DealParams } from '../model/DealModel';

describe('Calculator Core Logic', () => {
    const baseParams: DealParams = {
        V: 10_000_000,
        F: 0.035,
        P: 40,
        S: 20,
        R: 0,
        I: 0,
        B: 0,
        safetyThreshold: 15
    };

    it('should decrease net profit when Retainer (R) increases', () => {
        const metricsBefore = calculateDealMetrics({ ...baseParams, R: 0 });
        const metricsAfter = calculateDealMetrics({ ...baseParams, R: 5000 });

        expect(metricsAfter.netProfit).toBeLessThan(metricsBefore.netProfit);
    });

    it('should decrease net profit when Operational Cost (I) increases', () => {
        const metricsBefore = calculateDealMetrics({ ...baseParams, I: 0 });
        const metricsAfter = calculateDealMetrics({ ...baseParams, I: 1000 });

        expect(metricsAfter.netProfit).toBeLessThan(metricsBefore.netProfit);
    });

    it('should decrease net profit when Partner Share (P) increases', () => {
        const metricsBefore = calculateDealMetrics({ ...baseParams, P: 40 });
        const metricsAfter = calculateDealMetrics({ ...baseParams, P: 50 });

        expect(metricsAfter.netProfit).toBeLessThan(metricsBefore.netProfit);
    });

    it('should increase all revenues when Volume (V) increases', () => {
        const metricsBefore = calculateDealMetrics({ ...baseParams, V: 10_000_000 });
        const metricsAfter = calculateDealMetrics({ ...baseParams, V: 20_000_000 });

        expect(metricsAfter.netProfit).toBeGreaterThan(metricsBefore.netProfit);
        expect(metricsAfter.partnerPool).toBeGreaterThan(metricsBefore.partnerPool);
    });

    it('should respond to Safety Threshold changes', () => {
        const params = { ...baseParams, P: 70 }; // High share creates low margin
        const metricsLowThreshold = calculateDealMetrics({ ...params, safetyThreshold: 5 });
        const metricsHighThreshold = calculateDealMetrics({ ...params, safetyThreshold: 20 });

        // Low threshold should NOT be blocked
        expect(metricsLowThreshold.status).not.toBe('BLOCKED');

        // High threshold should trigger BLOCKED at this margin
        if (metricsHighThreshold.marginBuffer * 100 < 20) {
            expect(metricsHighThreshold.status).toBe('BLOCKED');
        }
    });
});
