/**
 * NUMERIC SAFETY LAYER
 * 
 * SZYMON CRYPTO BRAIN V2
 * Centralized utility functions to entirely prevent NaN, Infinity, and crash scenarios
 * across the entire SaaS BD OS platform.
 */

/**
 * Ensures a value is a finite number.
 * If the value is undefined, null, NaN, Infinity, or an empty string, it returns the fallback.
 */
export function toNum(value: any, fallback = 0): number {
    if (value === null || value === undefined || value === '') {
        return fallback;
    }
    const num = Number(value);
    if (!Number.isFinite(num) || Number.isNaN(num)) {
        return fallback;
    }
    return num;
}

/**
 * Safely divides a by b.
 * Prevents Division by Zero, Infinity, and NaN results.
 */
export function safeDiv(a: any, b: any, fallback = 0): number {
    const numA = toNum(a);
    const numB = toNum(b);

    if (numB === 0) {
        return fallback;
    }

    const result = numA / numB;
    if (!Number.isFinite(result) || Number.isNaN(result)) {
        return fallback;
    }

    return result;
}

/**
 * Formats a decimal representing a percentage into a presentable string (e.g., 0.15 -> "15.00%").
 * Returns "—" (an em dash) if the value is not a finite calculable percentage.
 */
export function formatPct(value: any, decimals = 2): string {
    if (value === null || value === undefined || value === '') return '—';

    const num = Number(value);
    if (!Number.isFinite(num) || Number.isNaN(num)) {
        return '—';
    }

    return `${(num * 100).toFixed(decimals)}%`;
}

/**
 * Validates a metrics object post-calculation to ensure no NaNs seeped through.
 * In development, warns via console if irregular data structure is found.
 */
export function validateMetricsSafe(metricsObj: Record<string, any>, contextName = "Deal Metrics"): void {
    const invalidFields: string[] = [];

    for (const [key, val] of Object.entries(metricsObj)) {
        if (typeof val === 'number') {
            if (!Number.isFinite(val) || Number.isNaN(val)) {
                invalidFields.push(key);
            }
        }
    }

    if (invalidFields.length > 0) {
        console.warn(`[SAFETY LAYER WARNING] Found non-finite values in ${contextName}: ${invalidFields.join(', ')}`);
    }
}
