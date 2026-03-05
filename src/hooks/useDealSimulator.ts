import { useState, useMemo } from 'react';
import type { DealParams, DealResult } from '../model/DealModel';
import { calculateDealMetrics } from '../model/DealModel';

const DEFAULT_PARAMS: DealParams = {
    V: 10_000_000,
    F: 0.035,
    P: 50,
    S: 30,
    R: 0,
    I: 0,
    B: 0,
    safetyThreshold: 15
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

    const updateParam = <K extends keyof DealParams>(key: K, value: DealParams[K]) => {
        setParams(prev => ({
            ...prev,
            [key]: value
        }));
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
        updateParam,
        setParams,
        generateShareLink
    };
}
