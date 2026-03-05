# SZYMON CRYPTO BRAIN — Full Requirements (from 3 PDFs)

## PDF 1: UNIVERSAL DEAL SUSTAINABILITY MODEL (32 pages)

### Core Math Model
- **Base unit**: $350 per $1M futures volume (at 0.035% fee)
- **Retained per 1M** = Fee × P × (1 − S) = 350 × P × (1 − S)
- **Break-even** = (R + I) / (350 × P × (1 − S))
- **Net** = V × F × P × (1 − S) − R − I
- **Sustainability**: Net > 0
- **Safety**: Retained ≥ 1.15 × (R + I)

### Variables
- V = Monthly trading volume (USD)
- F = Blended trading fee (default 0.035%, options: 0.035%, 0.030%, 0.028%)
- P = Partner payout share from fee pool (e.g. 40%, 50%, 60%)
- S = Sub-split from partner to KOL (e.g. 30%, 40%, 50%)
- R = Retainer (fixed monthly compensation)
- I = Operational/allocation cost per deal
- B = Bonus per 1M volume

### Key Concepts
- Sub-split elasticity: 10% S increase → ~20% required volume increase
- Bonus stacking risk: $100/1M bonus = 28.6% equivalent
- Fee compression stress: test at 0.035%, 0.030%, 0.028%
- Tiered sub-split: 0-20M→30%, 20-35M→40%, 35M+→50%
- Milestone retainers: split R into launch/25M/40M milestones
- Tier unlock requires 2 consecutive qualifying months
- Bonus freeze rule: if Net ≤ 0, bonus is PAUSED
- Volume recovery clause: tier reverts if volume drops for 2 months

### Deal Templates (from PDF)
1. **CONSERVATIVE**: S=30% flat, R=$0-$1000, no bonus
2. **BALANCED**: S=35-45% tiered, R=$1000-$1800, bonus only above threshold
3. **AGGRESSIVE**: S up to 50% at high tiers, milestone retainer, bonus above high volume

### Deal Scoring System (0-100)
- Margin buffer: 25 pts
- Tier protection: 15 pts
- Retainer safety: 15 pts
- Bonus containment: 15 pts
- Fee compression resilience: 15 pts
- Portfolio correlation risk: 15 pts
- Below 60 = STRUCTURALLY DANGEROUS

### Negotiation Rulebook (Order of Moves)
1. Adjust retainer structure (milestones)
2. Use tiering instead of flat S
3. Replace bonus with tier upgrade
4. Only then raise S

---

## PDF 2: Scope Document (64 Modules)

### Sekcja 1-18 (Core)
1. Basic variables (V, F, P, S, R, I)
2. Core economic unit ($350/1M)
3. Core equations (retained, break-even, net)
4. Sub-split elasticity visualization
5. Bonus stacking model
6. Fee compression stress test (0.035%, 0.030%, 0.028%)
7. Tiered sub-split configuration
8. Retainer milestone structure
9. Bonus freeze rule (Net ≤ 0 → PAUSED)
10. Tier reversion clause
11. Deal templates (Conservative/Balanced/Aggressive)
12. Sensitivity grid (S×P matrix with break-even)
13. Bear market stress (volume -40%, fee 0.028%)
14. Portfolio model (multi-partner simulation)
15. Wash trading shield
16. Deal score (0-100, 6 components)
17. Negotiation rulebook
18. Hybrid deal (Stormmedia mode) — checkbox activating retainer+sub-split+bonus+tier

### Moduł 19-34 (Extensions)
19. Auto deal optimizer
20. Risk heatmap (S×V color grid)
21. Deal structure simulator (flat vs tiered vs hybrid)
22. Bonus equivalent converter (bonus/350 = %)
23. Structural margin meter
24. Capital exposure model (|Net_negative| × months)
25. Multi-deal portfolio
26. Fee realization check
27. Negotiation assistant (suggestion texts)
28. Deal scoring system (duplicate of 16)
29. Structural warnings
30. Hunter detection mode (V > 40M → HIGH CAPACITY HUNTER)
31. Dynamic fee protection
32. LTV expansion model
33. Wash trading protection (duplicate of 15)
34. Executive summary report

### Moduł 35-50 (Negotiation Engine)
35. Offer generator (proposed deal structure)
36. Partner profit estimator (PartnerRevenue = V × F × P × S)
37. Negotiation simulator
38. Counter offer builder
39. Partner upside graph (earnings at 10M/20M/30M/40M/50M)
40. Margin floor protection (retained < $80/1M → COLLAPSE RISK)
41. Deal red flags
42. Negotiation strategy panel (order: retainer→tiering→bonus→S)
43. Volume proof mode
44. Deal summary card
45. Ready to send proposal
46. Hybrid Stormmedia mode (duplicate of 18)
47. Executive report export
48. Deal memory (save/load deals)
49. Quick negotiation tool (real-time sliders)
50. Strategic principle reminder

### Moduł 51-64 (AI Deal Engine)
51. AI deal structure engine
52. Smart counter offer
53. Deal stability score (duplicate of 16/28)
54. Margin collapse detector (retained < $80/1M)
55. Competitor match mode
56. Volume realism check
57. Deal strategy mode (Win/Protect/Test)
58. Capital protection mode (BD budget tracking)
59. Multi-partner strategy
60. Automatic deal summary (duplicate of 34)
61. Ready to send offer (duplicate of 45)
62. Stormmedia negotiation mode
63. Quick negotiation slider (duplicate of 49)
64. Dominance strategy panel (core equation reminder)

### Feature Audit Table (from PDF)
**P0 (Keep)**:
- Deal Simulator (inputs) — SimulatorPro
- Financial Snapshot (outputs) — FinancialSnapshot
- Risk Engine — DealScore
- Stress Test — StressTests
- Executive Summary — ExecutiveSummary
- Deal Assistant (Q&A) — NOT IMPLEMENTED

**P1 (Keep)**:
- Deal Templates — DealTemplates

**Cut/Later**:
- Pitch Generator, Activation Builder, Admin Console, Deal Battle, Hunter Panel, Intelligence Scout, Partner CRM

### Component List (from PDF page 43)
32 components listed, of which current app has 17.

---

## PDF 3: BingX Info For Partners
- Context document about BingX partnership model
- VIP tier structure (fees decrease with volume)
- Supreme VIP: 0.00% maker, 0.028% taker (futures)
- Fee comparison examples at various volumes
- Partner commission model: commission % of trading fees + volume incentives
- Not directly implementable — provides business context for the calculator

---

## Current Implementation Status

### IMPLEMENTED & WORKING:
- [x] SimulatorPro (Sekcja 1, Moduł 49/63) — all variables
- [x] FinancialSnapshot (Sekcja 2-3) — gross, retained, net, break-even
- [x] DealScore (Sekcja 16, Moduł 28/53) — BUT: wrong formula (×333 instead of 6-component scoring)
- [x] MinimalCharts (Moduł 39 partial) — net profit vs volume, retained vs partner
- [x] StressTests (Sekcja 6/13) — volume drop, fee compression, partner greed
- [x] Heatmap (Sekcja 12, Moduł 20) — fee×volume sensitivity
- [x] StructuralWarnings (Moduł 29/41) — deal red flags
- [x] ProposalGenerator (Moduł 35/45/61) — 3 proposal variants
- [x] NegotiationRulebook (Sekcja 17, Moduł 42) — 4-step negotiation order
- [x] MarginSafetyLock — safety threshold slider
- [x] DealTemplates (Sekcja 11) — BUT: 5 custom templates instead of PDF's 3
- [x] PartnerRevenueSim (Moduł 36) — partner earnings
- [x] ExecutiveSummary (Moduł 34/60) — text report + copy
- [x] CryptoTicker — live prices (Binance API)
- [x] StreamerMode (from component list #29) — BUT: CSS masking not implemented
- [x] AffiliateLinkBuilder (from component list #3) — placeholder domain

### CRITICAL BUGS:
1. **DealScore formula**: Uses arbitrary ×333 multiplier. PDF specifies 6 scored components (margin buffer 25pts, tier protection 15pts, retainer safety 15pts, bonus containment 15pts, fee compression resilience 15pts, portfolio correlation risk 15pts)
2. **StreamerMode**: Toggle exists but masking CSS is missing — figures not actually hidden
3. **DealModel.ts**: Net formula uses `exchangeRetained - R - I - bonus` but PDF says `V × F × P × (1-S) - R - I`. Current formula is actually equivalent (exchangeRetained = grossFees - partnerPool = V×F - V×F×P, then net = V×F×(1-P) - R - I - bonus). Note: PDF doesn't include bonus in basic formula but Sekcja 5 adds it.

### NOT IMPLEMENTED (from P0/P1 features):
- Deal Assistant (Q&A) — P0 in audit table, not implemented
- Bonus equivalent converter (Moduł 22) — simple: bonus/350 displayed
- Margin collapse detector (Moduł 40/54) — retained < $80/1M warning
- Hunter detection (Moduł 30) — V > 40M flag
