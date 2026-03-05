import { describe, it, expect } from 'vitest';
import { toNum, safeDiv, formatPct } from '../lib/safeMath';

describe('Numeric Safety Layer (safeMath)', () => {
    describe('toNum()', () => {
        it('handles valid numbers', () => {
            expect(toNum(5)).toBe(5);
            expect(toNum("10.5")).toBe(10.5);
            expect(toNum(0)).toBe(0);
        });

        it('handles null, undefined, and empty string without throwing', () => {
            expect(toNum(null)).toBe(0);
            expect(toNum(undefined)).toBe(0);
            expect(toNum("")).toBe(0);
        });

        it('handles NaN and Infinity by falling back securely', () => {
            expect(toNum(NaN)).toBe(0);
            expect(toNum(Infinity)).toBe(0);
            expect(toNum(-Infinity)).toBe(0);
        });

        it('uses custom fallback', () => {
            expect(toNum(NaN, 100)).toBe(100);
            expect(toNum(null, -1)).toBe(-1);
        });
    });

    describe('safeDiv()', () => {
        it('performs clear division securely', () => {
            expect(safeDiv(10, 2)).toBe(5);
            expect(safeDiv("10", "2")).toBe(5);
        });

        it('prevents division by zero correctly', () => {
            expect(safeDiv(10, 0)).toBe(0);
            expect(safeDiv(10, 0, 999)).toBe(999);
        });

        it('prevents division by NaN or Infinity correctly', () => {
            expect(safeDiv(10, NaN)).toBe(0);
            expect(safeDiv(10, Infinity)).toBe(0);
            expect(safeDiv(Infinity, 10)).toBe(0);
        });
    });

    describe('formatPct()', () => {
        it('formats valid floating point percentages to strings correctly', () => {
            expect(formatPct(0.15)).toBe("15.00%");
            expect(formatPct(1)).toBe("100.00%");
            expect(formatPct(0.0035, 3)).toBe("0.350%");
        });

        it('handles zero correctly', () => {
            expect(formatPct(0)).toBe("0.00%");
        });

        it('replaces NaN/Infinity with em-dash placeholder "—" in UI securely', () => {
            expect(formatPct(NaN)).toBe("—");
            expect(formatPct(Infinity)).toBe("—");
            expect(formatPct(null)).toBe("—");
            expect(formatPct(undefined)).toBe("—");
            expect(formatPct("")).toBe("—");
        });
    });
});
