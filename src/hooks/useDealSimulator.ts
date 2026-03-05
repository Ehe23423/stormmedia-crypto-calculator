import { useState, useMemo } from 'react';
import type { DealParams, DealResult } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

const DEFAULT_PARAMS: DealParams = {
    V: 10_000_000,
    F: 0.035,   // 0.035%
    P: 40,      // 40%
    S: 30,      // 30%
    R: 0,
    I: 0,
    bonusPer1M: 0,
    useTiers: false,
    tiers: [
        { threshold: 20_000_000, s: 40 },
        { threshold: 35_000_000, s: 50 }
    ],
    useMilestones: false,
    milestones: [
        { threshold: 0, r: 1000 },
        { threshold: 25_000_000, r: 1000 },
        { threshold: 40_000_000, r: 1000 }
    ],
    requireMarginLock: false
};

export function useDealSimulator(initialParams: Partial<DealParams> = {}) {
    // Attempt to load state from URL
    const loadFromUrl = (): Partial<DealParams> => {
        try {
            const params = new URLSearchParams(window.location.search);
            const stateQuery = params.get('state');
            if (stateQuery) {
                const decoded = atob(stateQuery);
                return JSON.parse(decoded);
            }
        } catch (e) {
            console.error("Failed to parse state from URL", e);
        }
        return {};
    };

    const urlParams = loadFromUrl();

    const [params, setParams] = useState<DealParams>({
        ...DEFAULT_PARAMS,
        ...initialParams,
        ...urlParams
    });

    const [error, setError] = useState<string | null>(null);

    const updateParam = <K extends keyof DealParams>(key: K, value: DealParams[K]) => {
        setError(null);
        setParams(prev => {
            const nextParams = { ...prev, [key]: value };

            // Safety Guardrail Interceptor
            if (nextParams.requireMarginLock) {
                const dryRunMetrics = calculateDealMetrics(nextParams);
                if (!dryRunMetrics.isSafe) {
                    setError("Safety Margin below 15% threshold.");
                    return prev;
                }
            }

            return nextParams;
        });
    };

    const generateShareLink = () => {
        const encodedState = btoa(JSON.stringify(params));
        const newUrl = `${window.location.origin}${window.location.pathname}?state=${encodedState}`;
        window.history.pushState({}, '', newUrl);
        navigator.clipboard.writeText(newUrl);
        return newUrl;
    };

    const metrics = useMemo<DealResult>(() => {
        return calculateDealMetrics(params);
    }, [params]);

    return {
        params,
        metrics,
        error,
        updateParam,
        setParams,
        generateShareLink
    };
}
