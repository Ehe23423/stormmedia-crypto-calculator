export const translations = {
    en: {
        title: "SZYMON CRYPTO BRAIN",
        subtitle: "First Ever Exchange deal calculator for Crypto Business developers",
        enterTerminal: "ENTER TERMINAL",
        exitTerminal: "EXIT TERMINAL",
        roastOn: "🔥 ROAST ON",
        roastOff: "🧊 ROAST OFF",
        shareSetup: "🔗 Share Setup",
        tabs: {
            BD_OS: "BD OS",
            KNOWLEDGE: "Knowledge Base",
            ARCHITECT: "Architect",
            HUNTER: "HUNTER",
            AGENCY: "AGENCY",
            STREAMER: "STREAMER",
            TRADER: "TRADER",
            ROAST: "ROAST",
            MODE: "MODE"
        },
        variables: {
            title: "VARIABLES",
            volume: "Volume (USD)",
            community: "Community Type",
            payout: "Partner Payout Share (P)",
            subSplit: "Sub Split (S)",
            locked: "LOCKED"
        },
        battle: {
            title: "Deal Battle Mode",
            massacre: "DEAL MASSACRE",
            win: "Solid structure.",
            loss: "Needs refinement.",
            roastWin: "👑 KING OF MARGIN. This deal actually makes sense. Surprising.",
            roastLoss: "🤡 CLOWN DEAL. You're basically a charity for the exchange. Retrain immediately."
        },
        metrics: {
            netProfit: "Net Monthly Profit",
            grossFees: "Gross Fees",
            partnerPool: "Partner Pool",
            retained: "Retained",
            marginBuffer: "Margin Buffer",
            breakEven: "BREAK-EVEN VOLUME",
            bonusEquivalent: "BONUS EQUIVALENT",
            limit: "LIMIT",
            actual: "ACTUAL"
        },
        panels: {
            financials: "Financial Snapshot",
            projections: "Volume Projections",
            heatmap: "Sensitivity Heatmap",
            assistant: "BD Deal Assistant",
            partnerEcon: "Partner Side Economics",
            proposal: "Negotiation Proposal Generator",
            executive: "Executive Summary",
            rulebook: "BD Rulebook",
            score: "Deal Score Breakdown",
            templates: "Quick Templates",
            safety: "Safety Protocol",
            glossary: "Terminal Glossary",
            scoreEngine: "Deal Score Engine",
            warnings: "Structural Warnings",
            roastMode: "Deal Roast Mode",
            breakdown: "Score Breakdown",
            scoreDesc: {
                blocked: "BLOCKED",
                safe: "SAFE",
                warn: "WARNING",
                crit: "CRITICAL"
            }
        },
        stress: {
            title: "Stress Tests",
            volDrop: "Volume -40%",
            feeComp: "Fee Compression",
            partnerGreed: "Partner Greed",
            survived: "SURVIVED",
            failed: "FAILED",
            profit: "Profit"
        },
        assistantQs: {
            title: "Ask the BD Engine",
            qSafe: "Is this deal safe?",
            qChange: "What should I change first?",
            qBreak: "Show me the break-even",
            qRisk: "How risky is this bonus?",
            qNegotiation: "Best negotiation move?",
            qRetained: "Retained per $1M volume?"
        },
        exec: {
            verdict: "DEAL VERDICT",
            strategy: "STRATEGY: {vol}M Monthly Volume",
            feeTier: "FEE TIER",
            safety: "SAFETY THRESHOLD",
            revShare: "REVENUE SHARE",
            outcome: "OUTCOME",
            blocked: "BLOCKED - SAFETY VIOLATED",
            profitable: "PROFITABLE",
            unsustainable: "UNSUSTAINABLE",
            monthlyNet: "MONTHLY NET",
            breakEven: "BREAK-EVEN",
            marginBuffer: "MARGIN BUFFER",
            riskVerdict: "RISK VERDICT",
            summary: "PROPOSAL SUMMARY:",
            summaryText: "This structure yields {pool} in partner revenue.\nThe deal remains sustainable for the exchange while maintaining\ncompetitive upside for the partner at current fee compression levels.",
            copyBtn: "Copy Text Summary"
        },
        prop: {
            variant1Title: "Community / Group",
            variant1Content: "SZYMON CRYPTO BRAIN Proposal — Community Hybrid\nTarget Volume: ${vol}M/mo\nFee Tier: {F}%\nPartner Revenue: {pool}/mo\n\nStructure: ${R} Monthly Retainer + {P}% Volume Share.\nNext Step: 14-day Trading Tournament Trial.",
            variant2Title: "Trader / Desk",
            variant2Content: "SZYMON CRYPTO BRAIN Proposal — VIP Trader\nVolume Committment: ${vol}M/mo\nNet Fee: {netFee}%\nVIP Tier: Elite\n\nStructure: Direct fee rebate of {P}% from baseline {F}% fees.\nNext Step: Onboard to API VIP Node.",
            variant3Title: "Whale / Institutional",
            variant3Content: "SZYMON CRYPTO BRAIN Proposal — Institutional\nTotal Monthly Flow: ${vol}M/mo\nEffective Discount: {P}%\nExchange Retained: {retained}\n\nStructure: ${I} Op-Cost optimization + {P}% performance split.\nNext Step: Direct Custody & Settlement Call.",
            copyBtn: "Copy Proposal"
        },
        rule: {
            r1t: "Retainer First",
            r1d: "Adjust/lower fixed retainer to lower initial break-even exposure.",
            r2t: "Tier Efficiency",
            r2d: "Use tiered fee structures instead of flat share to protect variable margin.",
            r3t: "Bonus to Tier",
            r3d: "Convert one-time bonuses into high-volume tier unlocks to incentivize flow.",
            r4t: "Sub-Split Floor",
            r4d: "Treat sub-split as the final flexibility lever; increase only after share is optimized.",
            quote: "\"Protect the baseline margin; scale the top-line volume.\""
        },
        glossTerms: {
            V: { full: "Volume", desc: "Total monthly trading volume in USD generated by the partner." },
            F: { full: "Blended Fee", desc: "Average trading fee rate (e.g., 0.035%) across all user tiers." },
            P: { full: "Partner Share", desc: "Percentage of the total fee pool allocated to the Agency/Partner." },
            S: { full: "Sub-split (KOL Share)", desc: "Percentage of Partner Share passed directly to the KOL/Creator." },
            R: { full: "Retainer", desc: "Fixed monthly payment (USD) paid to the partner regardless of volume." },
            I: { full: "Integration/Op Cost", desc: "One-time or monthly operational costs for technical setup." },
            B: { full: "Bonus", desc: "Additional cash incentive paid for every $1M of trading volume." }
        },
        tooltips: {
            V: "Monthly Trading Volume (USD)",
            F: "Blended Trading Fee (%)",
            P: "Partner/Agency Fee Share (%)",
            S: "KOL/Creator Sub-split (%) - share of partner revenue",
            R: "Fixed Monthly Retainer (USD)",
            I: "Operational/Integration Cost (USD)",
            B: "Bonus per $1M Volume (USD)",
            margin: "Safety buffer after all payouts and costs."
        },
        gloss: {
            // hover instruction removed
        },
        sim: {
            params: "PARAMETERS",
            vol: "MONTHLY VOLUME (USD)",
            fee: "BLENDED FEE (%)",
            feeNote: "Note: This is the combined avg fee across all tiers and assets.",
            share: "PARTNER SHARE (%)",
            sub: "SUB-SPLIT (%)",
            retainer: "Retainer (USD)",
            opCost: "Op Cost (USD)",
            bonus: "Bonus per 1M (USD)"
        },
        assistantAnswers: {
            qSafe: {
                blocked: "❌ BLOCKED. Margin buffer {buffer}% is below your safety threshold of {thresh}%. This deal violates minimum safety protocol. Do not proceed.",
                safe: "✅ SAFE. Deal score {score}/100 with {buffer}% margin buffer. Surplus retained: {profit} monthly. Structure is sound.",
                warn: "⚠️ WARNING. Score {score}/100. Margin buffer {buffer}% is acceptable but thin. One volume dip of 20% could flip this negative. Proceed with caution.",
                crit: "🚨 CRITICAL. Margin at {buffer}%. Vulnerable to any volume decline or fee compression. Renegotiate before signing."
            },
            qChange: {
                retainer: "🔧 Step 1 priority: Restructure retainer. Your R={val} eats {pct}% of net profit. Split into milestones: launch + 25M + 40M. Immediately reduces fixed cost exposure.",
                subSplit: "📊 Step 1 priority: Reduce sub-split from {val}% to tiered structure (30%→40%→50%) based on volume milestones instead of flat {val}%. This protects you at low volumes.",
                bonus: "🎁 Step 1 priority: Your bonus ({val}/1M = {pct}% equivalent) is a stacking risk. Replace with tier upgrade at 30M volume. Eliminates linear bonus exposure.",
                share: "⚡ Step 1 priority: Partner share {val}% is high. Try negotiating down to 50–55%. Every 5% reduction recaptures ~{recapture} monthly.",
                balanced: "✅ Your parameters look balanced. Focus on increasing volume V→{target}M to improve all metrics proportionally."
            },
            qBreak: {
                none: "⚡ No fixed costs (R=0, I=0, B=0) — break-even is at $0 volume. Every dollar of volume is profitable.",
                below: "🚨 Break-even volume: ${be}M — you are BELOW break-even at current {current}M volume. Need {gap}M MORE to stop losing money.",
                above: "📐 Break-even at ${be}M. Current volume (${current}M) is {pct}% above break-even. Comfortable buffer. Volume can drop {drop}M before you go negative."
            },
            qRisk: {
                none: "🟢 No bonus structured. Zero stacking risk. Structure remains clean and predictable.",
                high: "🔴 HIGH RISK: Bonus {val}/1M represents {pct}% of gross fees. Recommended threshold is <28.6% ($100/1M). This structure heavily compresses margins at scale. Note: The 'Freeze Rule' protects from bankruptcy but does not recover prior margin erosion.",
                elevated: "🟡 ELEVATED RISK: Bonus represents {pct}% equivalent. Threshold for caution is 15%. Transitioning to volume-based commission tiers instead of flat bonuses is recommended to protect the baseline.",
                low: "🟢 LOW RISK: Bonus {val}/1M ({pct}% equivalent) is within safe operational limits (<15%). Standard freeze rules apply if net margin turns negative."
            },
            qNegotiation: {
                move1: "♟️ Move 1 — Retainer restructure: \"I can offer the base retainer, but split as {r1} at launch, {r2} at 25M/month, {r3} at 40M/month. Aligns both parties to growth.\" This reduces your upfront risk significantly.",
                move2: "♟️ Move 2 — Tiering: \"Instead of flat {val}%, let's structure it as 30% up to 20M monthly, 40% at 20–35M, and 50% above 35M. You earn more as you bring more — fair and motivating.\" Protects you at low volumes while giving upside.",
                move3: "♟️ Move 3 — Tier over bonus: \"Rather than a per-1M bonus, how about a tier upgrade to the next commission level when you hit 35M volume? Gives you reliable upside without capping our margin at all scenarios.\"",
                move4: "♟️ Move 4 (last resort): Sub-split adjustment. Current {val}%. If needed, you can offer +3–5% S increase ONLY tied to tier qualification (2 consecutive qualifying months at target volume). Never agree to flat S increase without volume proof."
            },
            qRetained: {
                collapse: "🔴 MARGIN COLLAPSE RISK: Only ${val} retained per $1M volume. Minimum safety threshold is $80/1M. This deal does not provide enough buffer for operational variability.",
                low: "🟡 LOW MARGIN BUFFER: ${val}/1M retained. Recommended floor is $140/1M (40% of standard $350/1M gross fee). This deal is vulnerable to sudden fee compression.",
                healthy: "🟢 HEALTHY MARGIN: ${val} retained per $1M volume. You are retaining {pct}% of gross fees. Deal can withstand market fee compression down to {fee}% without going negative."
            }
        },
        topBar: {
            createdBy: "Created by",
            loadParams: "⚡ LOAD SCENARIO",
            rain: "🌧️ MAKE IT RAIN {coin}",
            score: "Score {val}/100",
            version: "MISSION RECOVERY v5.5 - SYSTEM ACTIVE",
            contact: "✈️ DM @ostryopos",
            urlCopied: "App URL copied to clipboard!"
        },
        scenarios: {
            vanilla: "Vanilla Agency",
            trap: "High Rebate Trap",
            hunter: "Aggressive Hunter",
            whale: "Whale Client (M-Tier)"
        },
        scoreLabels: {
            margin: "Margin Buffer",
            tier: "Tier Protection",
            retainer: "Retainer Safety",
            bonus: "Bonus Containment",
            fee: "Fee Compression",
            portfolio: "Portfolio Risk",
            status: "{status} STATUS"
        },
        scoreDesc: {
            blocked: "VIOLATION: Margin below safety threshold.",
            safe: "OPTIMAL: Strong margin buffer, scalable structure.",
            warn: "SUB-OPTIMAL: Respectable, but vulnerable to volume dips.",
            crit: "DANGEROUS: Margin collapse imminent. Renegotiate.",
            calculating: "CALCULATING..."
        },
        roast: {
            title: "🔥 The Roast",
            subSplitCrit: "Sub-split at {val}%? Bro literally donated the exchange to the KOL. GM ser 🫡",
            subSplitWarn: "{val}% sub-split and you're still okay with this? Bold strategy cotton.",
            subSplitChad: "Sub-split at {val}%? Based. The exchange keeps its lunch money.",
            retainerCrit: "Retainer (${val}) is bigger than net profit. Sir this is a charity.",
            retainerWarn: "Retainer eating 70%+ of profit. One bad month and you're ngmi.",
            retainerDegen: "Zero retainer. High-risk high-reward. Very degen. Very BD.",
            netCrit: "Negative net profit ({val}). This deal is literally burning money. WAGMI? No.",
            netChad: "{val} net/month. This deal is sending. Degen approved.",
            marginCrit: "Margin buffer at {val}%? One volume dip and you're eating Mcdonalds.",
            marginChad: "{val}% margin buffer. Diamond hands deal structure. Respect.",
            bonusCrit: "Bonus stacking at {val}% equivalent. One good month ruins the model. Classic bonus trap.",
            bonusWarn: "Bonus equivalent at {val}%. Getting spicy. Watch the stack.",
            bonusOk: "Bonus equivalent {val}% — contained and based. Good boy.",
            volWarn: "${val}M volume? Even my grandma trades more.",
            volChad: "${val}M volume — HUNTER TIER. This KOL is built different.",
            partnerCrit: "{val}% partner share? You're basically the KOL's employee at this point.",
            partnerOk: "{val}% partner share? Exchange-maxi energy. Frugal and disciplined.",
            retainedCrit: "Only ${val} retained per $1M volume. This is margin collapse territory. RIP.",
            scoreChad: "Deal score {val}/100. Chad structure. Screenshot this. Show your boss.",
            scoreOk: "Score {val}/100. Workable. Don't celebrate yet. Run stress tests.",
            scoreWarn: "Score {val}/100. COPE tier. This deal is one bad month from disaster.",
            scoreCrit: "Score {val}/100. NGMI. Anon this deal is structurally cursed. Renegotiate everything."
        },
        roastTiers: {
            chad: { label: "CHAD DEAL", desc: "Sir this deal is built." },
            ser: { label: "SER", desc: "Technically passable. Barely." },
            cope: { label: "COPE", desc: "We are so back? No. We are not." },
            ngmi: { label: "NGMI", desc: "This deal is structurally cooked." }
        },
        roastNegotiation: {
            title: "🎯 Negotiation Rulebook",
            move1: { title: "Adjust retainer structure", detail: "Split R into milestone tranches (launch / 25M / 40M). Reduces upfront exposure." },
            move2: { title: "Use tiered sub-split", detail: "0–20M → 30%, 20–35M → 40%, 35M+ → 50%. Align KOL incentives with volume." },
            move3: { title: "Replace bonus with tier upgrade", detail: "Bonus stacking is a trap. Offer tier promotion instead — less linear risk." },
            move4: { title: "Only then raise S", detail: "S increase is last resort. Every 10% in S needs ~20% more volume to compensate." }
        },
        roastOptimizer: {
            title: "🤖 Auto-Optimizer Suggestions",
            reduceS: "Reduce sub-split S from {val1}% to {val2}% to increase margin buffer by ~{val3}%",
            replaceB: "Replace bonus $B={val1}/1M with tier upgrade at {val2}M volume milestone",
            splitR: "Split retainer $R={val1} into milestones: launch (40%) + 25M (35%) + 40M (25%)",
            reduceP: "Negotiate partner share P down from {val1}% to {val2}%",
            perfect: "✅ Parameters are reasonable. Focus on volume growth to improve score."
        },
        charts: {
            efficiency: "💎 Margin Efficiency",
            yield: "Net Yield on Gross Volume",
            retained: "Retained",
            partner: "Partner",
            totalFees: "Total Fees",
            volLabel: "{val}M VOL"
        },
        ticker: {
            live: "⚡ EXCHANGE LIVE",
            demo: "DEMO"
        },
        whale: {
            detected: "WHALE DETECTED"
        },
        common: {
            copied: "📋 {val} copied to clipboard!",
            summary: "Executive Summary",
            proposal: "Proposal"
        }
    },
    pl: {
        title: "SZYMON CRYPTO BRAIN",
        subtitle: "Pierwszy w historii kalkulator dealów giełdowych dla Business Developerów Krypto",
        enterTerminal: "WEJDŹ DO TERMINALU",
        exitTerminal: "WYJDŹ Z TERMINALU",
        roastOn: "🔥 ROAST ON",
        roastOff: "🧊 ROAST OFF",
        shareSetup: "🔗 Udostępnij",
        tabs: {
            BD_OS: "BD OS",
            KNOWLEDGE: "Baza Wiedzy",
            ARCHITECT: "Architekt",
            HUNTER: "HUNTER",
            AGENCY: "AGENCY",
            STREAMER: "STREAMER",
            TRADER: "TRADER",
            ROAST: "ROAST",
            MODE: "TRYB"
        },
        variables: {
            title: "ZMIENNE",
            volume: "Wolumen (USD)",
            community: "Typ Społeczności",
            payout: "Udział Partnera (P)",
            subSplit: "Sub Split (S)",
            locked: "ZABLOKOWANE"
        },
        battle: {
            title: "Tryb Walki Dealów",
            massacre: "MASAKRA DEALU",
            win: "Solidna struktura.",
            loss: "Wymaga poprawy.",
            roastWin: "👑 KRÓL MARŻY. Ten deal faktycznie ma sens. Zaskakujące.",
            roastLoss: "🤡 DEAL DLA KLAUNÓW. Jesteś po prostu organizacją charytatywną dla giełdy. Doucz się."
        },
        metrics: {
            netProfit: "Miesięczny Zysk Netto",
            grossFees: "Prowizje Brutto",
            partnerPool: "Pula Partnera",
            retained: "Zatrzymane",
            marginBuffer: "Bufor Marży",
            breakEven: "WOLUMEN BREAK-EVEN",
            bonusEquivalent: "EKWIWALENT BONUSU",
            limit: "LIMIT",
            actual: "AKTUALNIE"
        },
        panels: {
            financials: "Migawka Finansowa",
            projections: "Projekcje Wolumenu",
            heatmap: "Mapa Czułości",
            assistant: "Asystent Deal-u BD",
            partnerEcon: "Ekonomia Partnera",
            proposal: "Generator Propozycji Negocjacyjnej",
            executive: "Podsumowanie Wykonawcze",
            rulebook: "Zasady BD",
            score: "Analiza Wyniku",
            templates: "Szybkie Szablony",
            safety: "Protokół Bezpieczeństwa",
            glossary: "Glosariusz Terminala",
            scoreEngine: "Silnik Wyniku Dealu",
            warnings: "Ostrzeżenia Strukturalne",
            roastMode: "Tryb Roastowania",
            breakdown: "Rozbicie Wyniku",
            scoreDesc: {
                blocked: "ZABLOKOWANE",
                safe: "BEZPIECZNE",
                warn: "OSTRZEŻENIE",
                crit: "KRYTYCZNE"
            }
        },
        stress: {
            title: "Testy Stresowe",
            volDrop: "Wolumen -40%",
            feeComp: "Kompresja Opłat",
            partnerGreed: "Chciwość Partnera",
            survived: "PRZETRWAŁ",
            failed: "POLEGŁ",
            profit: "Zysk"
        },
        assistantQs: {
            title: "Zapytaj Silnik BD",
            qSafe: "Czy ten deal jest bezpieczny?",
            qChange: "Co powinienem zmienić najpierw?",
            qBreak: "Pokaż mi punkt opłacalności",
            qRisk: "Jak ryzykowny jest ten bonus?",
            qNegotiation: "Najlepszy ruch negocjacyjny?",
            qRetained: "Utrzymane na $1M wolumenu?"
        },
        exec: {
            verdict: "WERDYKT DEALU",
            strategy: "STRATEGIA: {vol}M Miesięcznego Wolumenu",
            feeTier: "POZIOM OPŁAT",
            safety: "PRÓG BEZPIECZEŃSTWA",
            revShare: "PODZIAŁ PRZYCHODÓW",
            outcome: "WYNIK",
            blocked: "ZABLOKOWANE - NARUSZENIE BEZPIECZEŃSTWA",
            profitable: "RENTOWNE",
            unsustainable: "NIEOPŁACALNE",
            monthlyNet: "NETTO MIESIĘCZNIE",
            breakEven: "PUNKT OPŁACALNOŚCI",
            marginBuffer: "BUFOR MARŻY",
            riskVerdict: "WERDYKT RYZYKA",
            summary: "PODSUMOWANIE PROPOZYCJI:",
            summaryText: "Ta struktura generuje {pool} przychodu dla partnera.\nDeal pozostaje zrównoważony dla giełdy, jednocześnie utrzymując\nkonkurencyjny potencjał dla partnera przy obecnych poziomach kompresji opłat.",
            copyBtn: "Kopiuj Podsumowanie"
        },
        prop: {
            variant1Title: "Społeczność / Grupa",
            variant1Content: "Propozycja SZYMON CRYPTO BRAIN — Hybryda Społecznościowa\nDocelowy Wolumen: ${vol}M/msc\nPoziom Opłat: {F}%\nPrzychód Partnera: {pool}/msc\n\nStruktura: ${R} Miesięczny Retainer + {P}% Udział w Wolumenie.\nKolejny Krok: 14-dniowy Okres Próbny (Turniej).",
            variant2Title: "Trader / Biuro",
            variant2Content: "Propozycja SZYMON CRYPTO BRAIN — Trader VIP\nDeklarowany Wolumen: ${vol}M/msc\nOpłata Netto: {netFee}%\nPoziom VIP: Elita\n\nStruktura: Bezpośredni rabat {P}% od bazowych opłat {F}%.\nKolejny Krok: Podłączenie do węzła API VIP.",
            variant3Title: "Wieloryb / Instytucja",
            variant3Content: "Propozycja SZYMON CRYPTO BRAIN — Instytucjonalna\nCałkowity Przepływ Miesięczny: ${vol}M/msc\nEfektywny Rabat: {P}%\nZatrzymane przez Giełdę: {retained}\n\nStruktura: ${I} Optymalizacja Kosztów Operacyjnych + {P}% podział zysków.\nKolejny Krok: Rozmowa dotycząca Bezpośredniego Depozytu.",
            copyBtn: "Kopiuj Propozycję"
        },
        rule: {
            r1t: "Retainer Ostatni",
            r1d: "Dostosuj/obniż stały retainer, aby zmniejszyć początkowe ryzyko punktu opłacalności.",
            r2t: "Wydajność Progów",
            r2d: "Używaj struktur opartych na progach zamiast stałego udziału, aby chronić zmienną marżę.",
            r3t: "Bonus do Progu",
            r3d: "Zamień jednorazowe bonusy na odblokowania wyższych progów, aby motywować do wolumenu.",
            r4t: "Limit Sub-Split",
            r4d: "Traktuj sub-split jako ostatnią dźwignię elastyczności; zwiększaj dopiero po zoptymalizowaniu udziału.",
            quote: "\"Chroń bazową marżę; skaluj ogólny wolumen.\""
        },
        glossTerms: {
            V: { full: "Wolumen", desc: "Całkowity miesięczny wolumen w USD wygenerowany przez partnera." },
            F: { full: "Średnia Prowizja", desc: "Średnia stopa prowizji (np. 0.035%) we wszystkich poziomach użytkowników." },
            P: { full: "Udział Partnera", desc: "Procent całkowitej puli opłat przypisany Agencji/Partnerowi." },
            S: { full: "Sub-split (Udział KOL)", desc: "Procent udziału partnera przekazywany bezpośrednio twórcy (KOL)." },
            R: { full: "Retainer", desc: "Stała miesięczna płatność (USD) dla partnera niezależnie od obrotu." },
            I: { full: "Koszt Operacyjny", desc: "Jednorazowe lub miesięczne koszty operacyjne za zaplecze techniczne." },
            B: { full: "Bonus", desc: "Dodatkowa gotówka wypłacana za każdy wygenerowany $1M wolumenu." }
        },
        tooltips: {
            V: "Miesięczny Wolumen (USD)",
            F: "Średnia Prowizja (%)",
            P: "Udział Partnera z Prowizji (%)",
            S: "Udział KOL (%) - część przychodu partnera",
            R: "Stały Retainer (USD)",
            I: "Koszt Integracji/Operacyjny (USD)",
            B: "Bonus za każdy $1M Wolumenu (USD)",
            margin: "Bufor bezpieczeństwa po wszystkich wypłatach i kosztach."
        },
        gloss: {
            // hover instruction removed
        },
        sim: {
            params: "PARAMETRY",
            vol: "MIESIĘCZNY WOLUMEN (USD)",
            fee: "ŚREDNIA PROWIZJA (%)",
            feeNote: "Uwaga: Jest to połączona średnia opłata we wszystkich poziomach i aktywach.",
            share: "UDZIAŁ PARTNERA (%)",
            sub: "SUB-SPLIT (%)",
            retainer: "Retainer (USD)",
            opCost: "Koszty Operacyjne (USD)",
            bonus: "Bonus za 1M (USD)"
        },
        assistantAnswers: {
            qSafe: {
                blocked: "❌ ZABLOKOWANE. Bufor marży {buffer}% jest poniżej progu bezpieczeństwa wynoszącego {thresh}%. Ten deal narusza minimalne protokoły bezpieczeństwa. Nie kontynuuj.",
                safe: "✅ BEZPIECZNE. Wynik dealu {score}/100 z buforem marży {buffer}%. Nadwyżka: {profit} miesięcznie. Struktura jest solidna.",
                warn: "⚠️ OSTRZEŻENIE. Wynik {score}/100. Bufor marży {buffer}% jest akceptowalny, ale cienki. Jeden spadek wolumenu o 20% może przynieść stratę. Postępuj ostrożnie.",
                crit: "🚨 KRYTYCZNIE. Marża na poziomie {buffer}%. Podatność na jakikolwiek spadek wolumenu lub kompresję opłat. Renegocjuj przed podpisaniem."
            },
            qChange: {
                retainer: "🔧 Priorytet kroku 1: Zrestrukturyzuj retainer. Twój R={val} pochłania {pct}% zysku netto. Podziel na kamienie milowe: start + 25M + 40M. Natychmiast zmniejsza ekspozycję na koszty stałe.",
                subSplit: "📊 Priorytet kroku 1: Zmniejsz sub-split z {val}% na strukturę progową (30%→40%→50%) zamiast stałego {val}%. Chroni to przy niskich wolumenach.",
                bonus: "🎁 Priorytet kroku 1: Twój bonus ({val}/1M = {pct}% ekwiwalentu) to ryzyko kumulacji. Zastąp upgrade'em progu przy 30M wolumenu.",
                share: "⚡ Priorytet kroku 1: Udział partnera {val}% jest wysoki. Spróbuj wynegocjować 50–55%. Każda redukcja o 5% odzyskuje ~{recapture} miesięcznie.",
                balanced: "✅ Twoje parametry wyglądają na zrównoważone. Skup się na zwiększeniu wolumenu V→{target}M, aby poprawić wszystkie wskaźniki."
            },
            qBreak: {
                none: "⚡ Brak kosztów stałych (R=0, I=0, B=0) — próg opłacalności to $0. Każdy dolar wolumenu jest zyskowny.",
                below: "🚨 Punkt opłacalności: ${be}M — jesteś PONIŻEJ progu przy obecnym wolumenie {current}M. Potrzebujesz {gap}M WIĘCEJ, by przestać tracić.",
                above: "📐 Próg opłacalności przy ${be}M. Obecny wolumen (${current}M) jest {pct}% powyżej progu. Bezpieczny bufor. Wolumen może spaść o {drop}M przed stratą."
            },
            qRisk: {
                none: "🟢 Brak ustrukturyzowanego bonusu. Zero ryzyka kumulacji. Struktura pozostaje czysta i przewidywalna.",
                high: "🔴 WYSOKIE RYZYKO: Bonus {val}/1M stanowi {pct}% prowizji brutto. Zalecany próg to <28.6% ($100/1M). Ta struktura silnie kompresuje marże przy skali.",
                elevated: "🟡 PODWYŻSZONE RYZYKO: Bonus stanowi {pct}% ekwiwalentu. Próg ostrożności to 15%. Zalecane przejście na progresywne progi prowizji.",
                low: "🟢 NISKIE RYZYKO: Bonus {val}/1M ({pct}% ekwiwalentu) mieści się w bezpiecznych granicach (<15%)."
            },
            qNegotiation: {
                move1: "♟️ Ruch 1 — Restrukturyzacja retainera: \"Mogę zaoferować bazowy retainer, ale podzielony: {r1} przy starcie, {r2} przy 25M/msc, {r3} przy 40M/msc. Łączy to interesy obu stron.\"",
                move2: "♟️ Ruch 2 — Progi: \"Zamiast stałego {val}%, wprowadźmy 30% do 20M wolumenu, 40% przy 20–35M i 50% powyżej 35M. Zarabiasz więcej, gdy przynosisz więcej.\"",
                move3: "♟️ Ruch 3 — Próg zamiast bonusu: \"Zamiast bonusu za każdy 1M, co powiesz na upgrade do następnego poziomu prowizji po osiągnięciu 35M wolumenu?\"",
                move4: "♟️ Ruch 4 (ostatnia szansa): Korekta sub-splitu. Obecnie {val}%. Możesz zaoferować +3–5% wzrostu S TYLKO po osiągnięciu celu przez 2 miesiące z rzędu."
            },
            qRetained: {
                collapse: "🔴 RYZYKO ZAPAŚCI MARŻY: Tylko ${val} zatrzymane na każde $1M wolumenu. Minimum to $80/1M. Ten deal ma zbyt mały bufor.",
                low: "🟡 NISKI BUFOR MARŻY: ${val}/1M zatrzymane. Zalecane minimum to $140/1M (40% ze standardowych $350).",
                healthy: "🟢 ZDROWA MARŻA: ${val} zatrzymane na każde $1M wolumenu. Zatrzymujesz {pct}% prowizji brutto."
            }
        },
        topBar: {
            createdBy: "Stworzone przez",
            loadParams: "⚡ ZAŁADUJ SCENARIUSZ",
            rain: "🌧️ ZRÓB DESZCZ {coin}",
            score: "Wynik {val}/100",
            version: "MISJA REKOWERY v5.5 - SYSTEM AKTYWNY",
            contact: "✈️ DM @ostryopos",
            urlCopied: "Link do aplikacji skopiowany!"
        },
        scenarios: {
            vanilla: "Standardowa Agencja",
            trap: "Pułapka Rabatu",
            hunter: "Agresywny Łowca",
            whale: "Klient Wieloryb (M-Tier)"
        },
        scoreLabels: {
            margin: "Bufor Marży",
            tier: "Ochrona Poziomów",
            retainer: "Bezpieczeństwo Retainera",
            bonus: "Kontrola Bonusu",
            fee: "Kompresja Opłat",
            portfolio: "Ryzyko Portfela",
            status: "STATUS {status}"
        },
        scoreDesc: {
            blocked: "NARUSZENIE: Marża poniżej progu bezpieczeństwa.",
            safe: "OPTYMALNIE: Silny bufor marży, skalowalna struktura.",
            warn: "SUBOPTYMALNIE: Przyzwoicie, ale wrażliwie na spadki wolumenu.",
            crit: "NIEBEZPIECZNIE: Bliska zapaść marży. Renegocjuj.",
            calculating: "OBLICZANIE..."
        },
        roast: {
            title: "🔥 Roast",
            subSplitCrit: "Sub-split na poziomie {val}%? Dosłownie oddałeś giełdę KOL-owi. GM ser 🫡",
            subSplitWarn: "{val}% sub-splitu i nadal Ci to pasuje? Odważna strategia.",
            subSplitChad: "Sub-split {val}%? Bazowane. Giełda zachowuje swoje na obiad.",
            retainerCrit: "Retainer (${val}) jest większy niż zysk netto. Ser, to jest organizacja charytatywna.",
            retainerWarn: "Retainer zjada ponad 70% zysku. Jeden słaby miesiąc i ngmi.",
            retainerDegen: "Zero retainera. Wysokie ryzyko, wysoka nagroda. Bardzo degen. Bardzo BD.",
            netCrit: "Ujemny zysk netto ({val}). Ten deal dosłownie pali pieniądze. WAGMI? Nie.",
            netChad: "{val} netto/msc. Ten deal wysyła. Degen approved.",
            marginCrit: "Bufor marży na poziomie {val}%? Jeden spadek wolumenu i jesz w Mcdonaldzie.",
            marginChad: "{val}% bufora marży. Struktura typu diamond hands. Szacunek.",
            bonusCrit: "Kumulacja bonusu na poziomie {val}% ekwiwalentu. Jeden dobry miesiąc rujnuje model. Klasyczna pułapka bonusowa.",
            bonusWarn: "Ekwiwalent bonusu na poziomie {val}%. Robi się gorąco. Pilnuj stosu.",
            bonusOk: "Ekwiwalent bonusu {val}% — opanowany i bazowany. Dobry chłopiec.",
            volWarn: "${val}M wolumenu? Nawet moja babcia ma większy obrót.",
            volChad: "${val}M wolumenu — HUNTER TIER. Ten KOL jest zbudowany inaczej.",
            partnerCrit: "{val}% udziału partnera? W tym momencie jesteś praktycznie pracownikiem KOL-a.",
            partnerOk: "{val}% udziału partnera? Energia exchange-maxi. Oszczędnie i dyscyplina.",
            retainedCrit: "Tylko ${val} zatrzymane na $1M wolumenu. To jest terytorium zapaści marży. RIP.",
            scoreChad: "Wynik dealu {val}/100. Struktura typu Chad. Zrób screena. Pokaż szefowi.",
            scoreOk: "Wynik {val}/100. Do wypracowania. Jeszcze nie świętuj. Zrób testy stresowe.",
            scoreWarn: "Wynik {val}/100. Poziom COPE. Ten deal jest o jeden zły miesiąc od katastrofy.",
            scoreCrit: "Wynik {val}/100. NGMI. Anon, ten deal jest strukturalnie przeklęty. Renegocjuj wszystko."
        },
        roastTiers: {
            chad: { label: "CHAD DEAL", desc: "Sir, ten deal jest zbudowany." },
            ser: { label: "SER", desc: "Technicznie dopuszczalne. Ledwo." },
            cope: { label: "COPE", desc: "Wracamy? Nie. Nie wracamy." },
            ngmi: { label: "NGMI", desc: "Ten deal jest strukturalnie ugotowany." }
        },
        roastNegotiation: {
            title: "🎯 Zasady Negocjacji",
            move1: { title: "Dostosuj strukturę retainera", detail: "Podziel R na transze kamieni milowych (start / 25M / 40M). Zmniejsza to początkową ekspozycję." },
            move2: { title: "Użyj progresywnego sub-splitu", detail: "0–20M → 30%, 20–35M → 40%, 35M+ → 50%. Dopasuj zachęty KOL do wolumenu." },
            move3: { title: "Zamień bonus na upgrade poziomu", detail: "Kumulacja bonusów to pułapka. Oferuj promocję poziomu — mniejsze ryzyko liniowe." },
            move4: { title: "Dopiero wtedy podnieś S", detail: "Zwiększenie S to ostateczność. Każde 10% w S wymaga ~20% więcej wolumenu dla rekompensaty." }
        },
        roastOptimizer: {
            title: "🤖 Sugestie Auto-Optymalizatora",
            reduceS: "Zmniejsz sub-split S z {val1}% do {val2}%, aby zwiększyć bufor marży o ~{val3}%",
            replaceB: "Zastąp bonus $B={val1}/1M upgrade'em poziomu przy progu {val2}M wolumenu",
            splitR: "Podziel retainer $R={val1} na kamienie milowe: start (40%) + 25M (35%) + 40M (25%)",
            reduceP: "Wynegocjuj obniżenie udziału partnera P z {val1}% do {val2}%",
            perfect: "✅ Parametry są rozsądne. Skup się na wzroście wolumenu, aby poprawić wynik."
        },
        charts: {
            efficiency: "💎 Wydajność Marży",
            yield: "Zysk Netto z Wolumenu Brutto",
            retained: "Zatrzymane",
            partner: "Partner",
            totalFees: "Suma Opłat",
            volLabel: "{val}M WOL"
        },
        ticker: {
            live: "⚡ GIEŁDA NA ŻYWO",
            demo: "DEMO"
        },
        whale: {
            detected: "WYKRYTO WIELORYBA"
        },
        common: {
            copied: "📋 {val} skopiowane do schowka!",
            summary: "Podsumowanie Wykonawcze",
            proposal: "Propozycja"
        }
    },
    es: {
        title: "SZYMON CRYPTO BRAIN",
        subtitle: "El primer calculador de acuerdos de intercambio de la historia para desarrolladores de negocios cripto",
        enterTerminal: "ENTRAR AL TERMINAL",
        exitTerminal: "SALIR DEL TERMINAL",
        roastOn: "🔥 MODO ROAST",
        roastOff: "🧊 ROAST OFF",
        shareSetup: "🔗 Compartir",
        tabs: {
            BD_OS: "BD OS",
            KNOWLEDGE: "Base de Conocimiento",
            ARCHITECT: "Arquitecto",
            HUNTER: "HUNTER",
            AGENCY: "AGENCY",
            STREAMER: "STREAMER",
            TRADER: "TRADER",
            ROAST: "ROAST",
            MODE: "MODO"
        },
        variables: {
            title: "VARIABLES",
            volume: "Volumen (USD)",
            community: "Tipo de Comunidad",
            payout: "Pago para Socios (P)",
            subSplit: "Sub Split (S)",
            locked: "BLOQUEADO"
        },
        battle: {
            title: "Modo Batalla",
            massacre: "MASACRE DE ACUERDO",
            win: "Estructura sólida.",
            loss: "Necesita mejoras.",
            roastWin: "👑 REY DEL MARGEN. Sorprendentemente, esto tiene sentido.",
            roastLoss: "🤡 ACUERDO DE PAYASO. Eres caridad para el exchange. Entrénate."
        },
        metrics: {
            netProfit: "Beneficio Neto Mensual",
            grossFees: "Comisiones Brutas",
            partnerPool: "Fondo de Socios",
            retained: "Retenido",
            marginBuffer: "Margen de Seguridad",
            breakEven: "VOLUMEN DE EQUILIBRIO",
            bonusEquivalent: "EQUIVALENTE DE BONO",
            limit: "LÍMITE",
            actual: "ACTUAL"
        },
        panels: {
            financials: "Resumen Financiero",
            projections: "Proyecciones de Volumen",
            heatmap: "Mapa de Sensibilidad",
            assistant: "Asistente BD",
            partnerEcon: "Economía del Socio",
            proposal: "Generador de Propuestas",
            executive: "Resumen Ejecutivo",
            rulebook: "Reglamento BD",
            score: "Análisis de Puntuación",
            templates: "Plantillas Rápidas",
            safety: "Protocolo de Seguridad",
            glossary: "Glosario del Terminal",
            scoreEngine: "Motor de Puntuación",
            warnings: "Advertencias Estructurales",
            roastMode: "Modo Roast",
            breakdown: "Análisis de Resultado",
            scoreDesc: {
                blocked: "BLOQUEADO",
                safe: "SEGURO",
                warn: "ADVERTENCIA",
                crit: "CRÍTICO"
            }
        },
        stress: {
            title: "Pruebas de Estrés",
            volDrop: "Volumen -40%",
            feeComp: "Compresión de Tarifas",
            partnerGreed: "Avaricia del Socio",
            survived: "SOBREVIVIÓ",
            failed: "FALLÓ",
            profit: "Beneficio"
        },
        assistantQs: {
            title: "Pregunta al Motor BD",
            qSafe: "¿Es seguro este acuerdo?",
            qChange: "¿Qué debo cambiar primero?",
            qBreak: "Muéstrame el punto de equilibrio",
            qRisk: "¿Qué tan arriesgado es este bono?",
            qNegotiation: "¿Mejor movimiento de negociación?",
            qRetained: "¿Retenido por $1M de volumen?"
        },
        exec: {
            verdict: "VEREDICTO DEL ACUERDO",
            strategy: "ESTRATEGIA: {vol}M Volumen Mensual",
            feeTier: "NIVEL DE TARIFA",
            safety: "UMBRAL DE SEGURIDAD",
            revShare: "REPARTO DE INGRESOS",
            outcome: "RESULTADO",
            blocked: "BLOQUEADO - SEGURIDAD VIOLADA",
            profitable: "RENTABLE",
            unsustainable: "INSOSOTENIBLE",
            monthlyNet: "NETO MENSUAL",
            breakEven: "PUNTO DE EQUILIBRIO",
            marginBuffer: "MARGEN DE SEGURIDAD",
            riskVerdict: "VEREDICTO DE RIESGO",
            summary: "RESUMEN DE PROPUESTA:",
            summaryText: "Esta estructura produce {pool} en ingresos para el socio.\nEl acuerdo sigue siendo sostenible para el exchange mientras mantiene\nun beneficio competitivo para el socio en los niveles actuales de compresión de tarifas.",
            copyBtn: "Copiar Resumen de Texto"
        },
        prop: {
            variant1Title: "Comunidad / Grupo",
            variant1Content: "Propuesta SZYMON CRYPTO BRAIN — Híbrido Comunitario\nVolumen Objetivo: ${vol}M/mes\nNivel de Tarifa: {F}%\nIngresos del Socio: {pool}/mes\n\nEstructura: ${R} Retenedor Mensual + {P}% Compartición de Volumen.\nPaso Siguiente: Prueba de Torneo de Trading de 14 días.",
            variant2Title: "Trader / Escritorio",
            variant2Content: "Propuesta SZYMON CRYPTO BRAIN — Trader VIP\nCompromiso de Volumen: ${vol}M/mes\nTarifa Neta: {netFee}%\nNivel VIP: Élite\n\nEstructura: Reembolso directo de tarifa de {P}% desde la tarifa base de {F}%.\nPaso Siguiente: Integración al Nodo API VIP.",
            variant3Title: "Ballena / Institucional",
            variant3Content: "Propuesta SZYMON CRYPTO BRAIN — Institucional\nFlujo Mensual Total: ${vol}M/mes\nDescuento Efectivo: {P}%\nRetenido por el Exchange: {retained}\n\nEstructura: ${I} Optimización de Costos Operativos + {P}% división de rendimiento.\nPaso Siguiente: Llamada de Custodia Directa y Liquidación.",
            copyBtn: "Copiar Propuesta"
        },
        rule: {
            r1t: "Retenedor Primero",
            r1d: "Ajuste/reduzca el retenedor fijo para reducir la exposición inicial al punto de equilibrio.",
            r2t: "Eficiencia de Niveles",
            r2d: "Use estructuras de tarifas escalonadas en lugar de una parte plana para proteger el margen variable.",
            r3t: "Bono a Nivel",
            r3d: "Convierta los bonos únicos en desbloqueos de nivel de alto volumen para incentivar el flujo.",
            r4t: "Piso de Sub-División",
            r4d: "Trate la sub-división como la palanca de flexibilidad final; aumente solo después de que se optimice la participación.",
            quote: "\"Proteja el margen base; escale el volumen total.\""
        },
        glossTerms: {
            V: { full: "Volumen", desc: "Volumen mensual de operaciones en USD generado por el socio." },
            F: { full: "Tarifa Mixta", desc: "Tasa de tarifa promedio (por ejemplo, 0.035%) en todos los niveles." },
            P: { full: "Parte del Socio", desc: "Porcentaje del fondo total asignado a la Agencia/Socio." },
            S: { full: "Subdivisión (Parte KOL)", desc: "Porcentaje de la parte del socio que va directamente al Creador." },
            R: { full: "Retenedor", desc: "Pago mensual fijo (USD) al socio independientemente del volumen." },
            I: { full: "Costo Operativo", desc: "Costos operativos únicos o mensuales para la configuración técnica." },
            B: { full: "Bono", desc: "Incentivo adicional en efectivo pagado por cada $1M de volumen." }
        },
        tooltips: {
            V: "Volumen Mensual Tranzado (USD)",
            F: "Tarifa Comercial Mixta (%)",
            P: "Participación del Socio (%)",
            S: "Subdivisión KOL (%) - parte de los ingresos del socio",
            R: "Retenedor Mensual Fijo (USD)",
            I: "Costo de Integración (USD)",
            B: "Bono por $1M de Volumen (USD)",
            margin: "Margen de seguridad después de costos."
        },
        gloss: {
            // hover instruction removed
        },
        sim: {
            params: "PARÁMETROS",
            vol: "VOLUMEN MENSUAL (USD)",
            fee: "COMISIÓN MIXTA (%)",
            feeNote: "Nota: Esta es la comisión promedio combinada en todos los niveles y activos.",
            share: "PARTICIPACIÓN DEL SOCIO (%)",
            sub: "SUB-SPLIT (%)",
            retainer: "Retenedor (USD)",
            opCost: "Costo Operativo (USD)",
            bonus: "Bono por 1M (USD)"
        },
        assistantAnswers: {
            qSafe: {
                blocked: "❌ BLOQUEADO. El margen de seguridad {buffer}% está por debajo de su umbral del {thresh}%. Este acuerdo viola el protocolo mínimo. No proceda.",
                safe: "✅ SEGURO. Puntuación {score}/100 con {buffer}% de margen. Excedente retenido: {profit} mensual. Estructura sólida.",
                warn: "⚠️ ADVERTENCIA. Puntuación {score}/100. El margen {buffer}% es aceptable pero ajustado. Una caída de volumen del 20% podría ser negativa. Tenga precaución.",
                crit: "🚨 CRÍTICO. Margen al {buffer}%. Vulnerable a declives o compresión de tarifas. Renegocie antes de firmar."
            },
            qChange: {
                retainer: "🔧 Prioridad Paso 1: Reestructurar retenedor. Su R={val} consume el {pct}% del beneficio neto. Divídalo en hitos: lanzamiento + 25M + 40M.",
                subSplit: "📊 Prioridad Paso 1: Reducir sub-división de {val}% a estructura escalonada (30%→40%→50%) según hitos en lugar de un {val}% plano.",
                bonus: "🎁 Prioridad Paso 1: Su bono ({val}/1M = {pct}% equivalente) es un riesgo acumulado. Reemplace con mejora de nivel a los 30M.",
                share: "⚡ Prioridad Paso 1: La parte del socio {val}% es alta. Intente negociar al 50–55%. Cada reducción del 5% recupera ~{recapture} mensual.",
                balanced: "✅ Sus parámetros parecen equilibrados. Enfoque en aumentar volumen V→{target}M para mejorar todas las métricas."
            },
            qBreak: {
                none: "⚡ Sin costos fijos (R=0, I=0, B=0) — equilibrio en $0 vol. Todo volumen es rentable.",
                below: "🚨 Punto de equilibrio: ${be}M — está POR DEBAJO con {current}M actuales. Necesita {gap}M MÁS para detener pérdidas.",
                above: "📐 Equilibrio a ${be}M. El volumen actual (${current}M) está {pct}% por encima. Margen cómodo. Puede caer {drop}M antes de ser negativo."
            },
            qRisk: {
                none: "🟢 Sin bono estructurado. Riesgo cero. Estructura limpia y predecible.",
                high: "🔴 ALTO RIESGO: Bono {val}/1M representa {pct}% de comisiones brutas. Umbral recomendado <28.6% ($100/1M).",
                elevated: "🟡 RIESGO ELEVADO: Bono representa {pct}% equivalente. Umbral de precaución 15%. Se recomienda transición a niveles.",
                low: "🟢 RIESGO BAJO: Bono {val}/1M ({pct}% equivalente) dentro de límites seguros (<15%)."
            },
            qNegotiation: {
                move1: "♟️ Movimiento 1 — Reestructura de retenedor: \"Puedo ofrecer el retenedor base, pero dividido en {r1} al inicio, {r2} a los 25M/mes, {r3} a los 40M/mes.\"",
                move2: "♟️ Movimiento 2 — Niveles: \"En lugar de {val}% plano, estructurémoslo como 30% hasta 20M, 40% a 20–35M, y 50% arriba de 35M.\"",
                move3: "♟️ Movimiento 3 — Nivel sobre bono: \"¿Qué tal una mejora de nivel a los 35M en lugar de un bono por cada 1M?\"",
                move4: "♟️ Movimiento 4 (ultimo recurso): Ajuste de sub-división. Actual {val}%. Ofrezca +3–5% SOLO tras 2 meses cumpliendo objetivos."
            },
            qRetained: {
                collapse: "🔴 RIESGO DE COLAPSO: Solo ${val} retenido por $1M. El umbral mínimo es $80/1M. Siente poco margen.",
                low: "🟡 MARGEN BAJO: ${val}/1M retenido. El floor recomendado es $140/1M (40% de los $350 estándar).",
                healthy: "🟢 MARGEN SALUDABLE: ${val} retenido por $1M. Retiene el {pct}% de las comisiones brutas."
            }
        },
        topBar: {
            createdBy: "Creado por",
            loadParams: "⚡ CARGAR ESCENARIO",
            rain: "🌧️ HACER QUE LLUEVA {coin}",
            score: "Puntos {val}/100",
            version: "MISIÓN RECUPERACIÓN v5.5 - SISTEMA ACTIVO",
            contact: "✈️ DM @ostryopos",
            urlCopied: "¡URL de la aplicación copiada!"
        },
        scenarios: {
            vanilla: "Agencia Estándar",
            trap: "Trampa de Reembolso",
            hunter: "Cazador Agresivo",
            whale: "Cliente Ballena (Nivel-M)"
        },
        scoreLabels: {
            margin: "Margen de Seguridad",
            tier: "Protección de Nivel",
            retainer: "Seguridad de Retenedor",
            bonus: "Contención de Bonos",
            fee: "Compresión de Tarifas",
            portfolio: "Riesgo de Cartera",
            status: "ESTADO {status}"
        },
        scoreDesc: {
            blocked: "VIOLACIÓN: Margen por debajo del umbral.",
            safe: "ÓPTIMO: Margen sólido, estructura escalable.",
            warn: "SUBÓPTIMO: Respetable, pero vulnerable.",
            crit: "PELIGROSO: Colapso inminente. Renegociar.",
            calculating: "CALCULANDO..."
        },
        roast: {
            title: "🔥 El Roast",
            subSplitCrit: "¿Sub-split al {val}%? Literalmente donaste el exchange al KOL. GM ser 🫡",
            subSplitWarn: "{val}% de sub-split y ¿sigues de acuerdo? Estrategia audaz.",
            subSplitChad: "¿Sub-split al {val}%? Basado. El exchange se queda con su comida.",
            retainerCrit: "El retenedor (${val}) es mayor que el beneficio neto. Señor, esto es caridad.",
            retainerWarn: "Retenedor consumiendo más del 70% del beneficio. Un mal mes y ngmi.",
            retainerDegen: "Sin retenedor. Alto riesgo, alta recompensa. Muy degen. Muy BD.",
            netCrit: "Beneficio neto negativo ({val}). Este acuerdo está quemando dinero. ¿WAGMI? No.",
            netChad: "{val} neto/mes. Este acuerdo está enviando. Degen aprobado.",
            marginCrit: "¿Margen al {val}%? Una caída de volumen y estarás comiendo en Mcdonalds.",
            marginChad: "{val}% de margen. Estructura de manos de diamante. Respeto.",
            bonusCrit: "Bono acumulado al {val}% equivalente. Un buen mes arruina el modelo. Trampa clásica.",
            bonusWarn: "Equivalente de bono al {val}%. Se está poniendo picante.",
            bonusOk: "Equivalente de bono {val}% — contenido y basado. Buen chico.",
            volWarn: "¿${val}M de volumen? Hasta mi abuela opera más.",
            volChad: "${val}M de volumen — NIVEL CAZADOR. Este KOL es diferente.",
            partnerCrit: "¿{val}% de parte del socio? Básicamente eres empleado del KOL ahora.",
            partnerOk: "¿{val}% de parte del socio? Energía exchange-maxi. Frugal y disciplinado.",
            retainedCrit: "Solo ${val} retenido por $1M. Territorio de colapso de margen. RIP.",
            scoreChad: "Puntuación {val}/100. Estructura Chad. Haz captura. Muéstrasela a tu jefe.",
            scoreOk: "Puntuación {val}/100. Trabajable. No celebres aún. Haz pruebas de estrés.",
            scoreWarn: "Puntuación {val}/100. Nivel COPE. A un mal mes del desastre.",
            scoreCrit: "Puntuación {val}/100. NGMI. Anon, este acuerdo está maldito. Renegocia todo."
        },
        roastTiers: {
            chad: { label: "ACUERDO CHAD", desc: "Señor, este acuerdo está construido." },
            ser: { label: "SER", desc: "Técnicamente pasable. Apenas." },
            cope: { label: "COPE", desc: "¿Hemos vuelto? No. No hemos vuelto." },
            ngmi: { label: "NGMI", desc: "Este acuerdo está estructuralmente cocinado." }
        },
        roastNegotiation: {
            title: "🎯 Reglas de Negociación",
            move1: { title: "Ajustar estructura de retenedor", detail: "Divida R en hitos (lanzamiento / 25M / 40M). Reduce exposición inicial." },
            move2: { title: "Usar sub-split escalonado", detail: "0–20M → 30%, 20–35M → 40%, 35M+ → 50%. Alinea incentivos." },
            move3: { title: "Cambiar bono por mejora de nivel", detail: "Los bonos acumulados son una trampa. Ofrezca promoción de nivel." },
            move4: { title: "Solo entonces suba S", detail: "Subir S es el último recurso. Cada 10% necesita ~20% más volumen." }
        },
        roastOptimizer: {
            title: "🤖 Sugeries del Auto-Optimizador",
            reduceS: "Reducir sub-split S de {val1}% a {val2}% para subir margen en ~{val3}%",
            replaceB: "Cambiar bono $B={val1}/1M por mejora de nivel a los {val2}M",
            splitR: "Dividir retenedor $R={val1} en hitos: inicio (40%) + 25M (35%) + 40M (25%)",
            reduceP: "Negociar parte del socio P de {val1}% a {val2}%",
            perfect: "✅ Los parámetros son razonables. Enfoque en el crecimiento del volumen."
        },
        charts: {
            efficiency: "💎 Eficiencia de Margen",
            yield: "Rendimiento Neto sobre Volumen Bruto",
            retained: "Retenido",
            partner: "Socio",
            totalFees: "Total Tarifas",
            volLabel: "{val}M VOL"
        },
        ticker: {
            live: "⚡ EXCHANGE EN VIVO",
            demo: "DEMO"
        },
        whale: {
            detected: "BALLENA DETECTADA"
        },
        common: {
            copied: "📋 {val} copiado al portapapeles!",
            summary: "Resumen Ejecutivo",
            proposal: "Propuesta"
        }
    },
    hi: {
        title: "SZYMON CRYPTO BRAIN",
        subtitle: "क्रिप्टो बिजनेस डेवलपर्स के लिए पहला एक्सचेंज डील कैलकुलेटर",
        enterTerminal: "टर्मिनल दर्ज करें",
        exitTerminal: "टर्मिनल से बाहर निकलें",
        roastOn: "🔥 रोस्ट मोड",
        roastOff: "🧊 रोस्ट बंद",
        shareSetup: "🔗 शेयर करें",
        tabs: {
            BD_OS: "BD OS",
            KNOWLEDGE: "ज्ञानकोष",
            ARCHITECT: "आर्किटेक्ट",
            HUNTER: "HUNTER",
            AGENCY: "AGENCY",
            STREAMER: "STREAMER",
            TRADER: "TRADER",
            ROAST: "ROAST",
            MODE: "मोड"
        },
        topBar: {
            createdBy: "द्वारा निर्मित",
            loadParams: "⚡ लोड परिदृश्य",
            rain: "🌧️ बारिश करें {coin}",
            score: "स्कोर {val}/100",
            version: "मिशन रिकवरी v5.5 - सिस्टम सक्रिय",
            contact: "✈️ DM @ostryopos",
            urlCopied: "ऐप URL कॉपी किया गया!"
        },
        scenarios: {
            vanilla: "वेनिला एजेंसी",
            trap: "हाई रिबेट ट्रैप",
            hunter: "आक्रामक हंटर",
            whale: "व्हेल क्लाइंट (M-टियर)"
        },
        variables: {
            title: "वेरिएबल्स",
            volume: "वॉल्यूम (USD)",
            community: "समुदाय का प्रकार",
            payout: "पार्टनर पेआउट (P)",
            subSplit: "सब स्प्लिट (S)",
            locked: "लॉक्ड"
        },
        battle: {
            title: "डील बैटल",
            massacre: "डील नरसंहार",
            win: "ठोस संरचना।",
            loss: "सुधार की आवश्यकता।",
            roastWin: "👑 मार्जिन का राजा। यह डील वास्तव में मायने रखती है। आश्चर्यजनक।",
            roastLoss: "🤡 जोकर डील। आप एक्सचेंज के लिए एक चैरिटी हैं।"
        },
        metrics: {
            netProfit: "शुद्ध मासिक लाभ",
            grossFees: "सकल शुल्क",
            partnerPool: "पार्टनर पूल",
            retained: "बरकरार रखा गया",
            marginBuffer: "मार्जिन बफर",
            breakEven: "ब्रेक-ईवन वॉल्यूम",
            bonusEquivalent: "बोनस समतुल्य",
            limit: "सीमा",
            actual: "वास्तविक"
        },
        panels: {
            financials: "वित्तीय स्नैपशॉट",
            projections: "वॉल्यूम अनुमान",
            heatmap: "संवेदनशीलता हिटमैप",
            assistant: "बीडी डील असिस्टेंट",
            partnerEcon: "पार्टनर अर्थशास्त्र",
            proposal: "प्रस्ताव जनरेटर",
            executive: "कार्यकारी सारांश",
            rulebook: "बीडी नियम पुस्तिका",
            score: "डील स्कोर",
            templates: "त्वरित टेम्प्लेट",
            safety: "सुरक्षा प्रोटोकॉल",
            glossary: "टर्मिनल ग्लोसरी",
            scoreEngine: "डील स्कोर इंजन",
            warnings: "संरचनात्मक चेतावनी",
            roastMode: "डील रोस्ट मोड",
            breakdown: "स्कोर विवरण",
            scoreDesc: {
                blocked: "अवरुद्ध",
                safe: "सुरक्षित",
                warn: "चेतावनी",
                crit: "गंभीर"
            }
        },
        stress: {
            title: "तनाव परीक्षण",
            volDrop: "वॉल्यूम -40%",
            feeComp: "शुल्क संपीड़न",
            partnerGreed: "पार्टनर लालच",
            survived: "बच गया",
            failed: "विफल",
            profit: "लाभ"
        },
        assistantQs: {
            title: "बीडी इंजन से पूछें",
            qSafe: "क्या यह सौदा सुरक्षित है?",
            qChange: "मुझे पहले क्या बदलना चाहिए?",
            qBreak: "मुझे ब्रेक-ईवन दिखाएं",
            qRisk: "यह बोनस कितना जोखिम भरा है?",
            qNegotiation: "सर्वश्रेष्ठ बातचीत कदम?",
            qRetained: "$1M वॉल्यूम प्रति रिटेन्ड?"
        },
        exec: {
            verdict: "सौदा निर्णय",
            strategy: "रणनीति: {vol}M मासिक वॉल्यूम",
            feeTier: "शुल्क टियर",
            safety: "सुरक्षा सीमा",
            revShare: "राजस्व शेयर",
            outcome: "परिणाम",
            blocked: "अवरुद्ध - सुरक्षा उल्लंघन",
            profitable: "लाभदायक",
            unsustainable: "अस्थिर",
            monthlyNet: "मासिक शुद्ध",
            breakEven: "ब्रेक-ईवन",
            marginBuffer: "मार्जिन बफर",
            riskVerdict: "जोखिम निर्णय",
            summary: "प्रस्ताव सारांश:",
            summaryText: "यह संरचना पार्टनर राजस्व में {pool} उत्पन्न करती है।\nवर्तमान शुल्क संपीड़न स्तरों पर पार्टनर के लिए प्रतिस्पर्धी लाभ बनाए रखते हुए\nएक्सचेंज के लिए यह सौदा टिकाऊ रहता है।",
            copyBtn: "पाठ सारांश कॉपी करें"
        },
        prop: {
            variant1Title: "समुदाय / समूह",
            variant1Content: "सज्मन क्रिप्टो ब्रेन प्रस्ताव — सामुदायिक हाइब्रिड\nलक्ष्य वॉल्यूम: ${vol}M/माह\nशुल्क टियर: {F}%\nपार्टनर राजस्व: {pool}/माह\n\nसंरचना: ${R} मासिक रिटेनर + {P}% वॉल्यूम शेयर।\nअगला कदम: 14-दिवसीय ट्रेडिंग टूर्नामेंट परीक्षण।",
            variant2Title: "ट्रेडर / डेस्क",
            variant2Content: "सज्मन क्रिप्टो ब्रेन प्रस्ताव — वीआईपी ट्रेडर\nवॉल्यूम प्रतिबद्धता: ${vol}M/माह\nशुद्ध शुल्क: {netFee}%\nवीआईपी टियर: एलीट\n\nसंरचना: {F}% आधार शुल्क से {P}% की सीधी शुल्क छूट।\nअगला कदम: एपीआई वीआईपी नोड पर ऑनबोर्ड।",
            variant3Title: "व्हेल / संस्थागत",
            variant3Content: "सज्मन क्रिप्टो ब्रेन प्रस्ताव — संस्थागत\nकुल मासिक प्रवाह: ${vol}M/माह\nप्रभावी छूट: {P}%\nएक्सचेंज बरकरार: {retained}\n\nसंरচনা: ${I} ऑप-कॉस्ट अनुकूलन + {P}% प्रदर्शन विभाजन।\nअगला कदम: प्रत्यक्ष कस्टडी और सेटलमेंट कॉल।",
            copyBtn: "प्रस्ताव कॉपी करें"
        },
        rule: {
            r1t: "रिटेनर पहले",
            r1d: "प्रारंभिक ब्रेक-ईवन जोखिम को कम करने के लिए निश्चित रिटेनर को समायोजित/कम करें।",
            r2t: "टियर दक्षता",
            r2d: "परिवर्तनीय मार्जिन की रक्षा करने के लिए फ्लैट शेयर के बजाय टियर शुल्क संरचनाओं का उपयोग करें।",
            r3t: "टियर को बोनस",
            r3d: "प्रवाह को प्रोत्साहित करने के लिए वन-टाइम बोनस को उच्च-वॉल्यूम टियर अनलॉक में बदलें।",
            r4t: "सब-स्प्लिट फ्लोर",
            r4d: "सब-स्प्लिट को अंतिम लचीलेपन लीवर के रूप में मानें; शेयर अनुकूलित होने के बाद ही बढ़ाएं।",
            quote: "\"बेसलाइन मार्जिन की रक्षा करें; टॉप-लाइन वॉल्यूम को बढ़ाएं।\""
        },
        glossTerms: {
            V: { full: "वॉल्यूम", desc: "पार्टनर द्वारा उत्पन्न कुल मासिक ट्रेडिंग वॉल्यूम (USD में)।" },
            F: { full: "मिश्रित शुल्क", desc: "सभी उपयोगकर्ता टियर पर औसत व्यापार शुल्क दर (उदा., 0.035%)।" },
            P: { full: "पार्टनर शेयर", desc: "एजेंसी/पार्टनर को आवंटित कुल शुल्क पूल का प्रतिशत।" },
            S: { full: "सब-स्प्लिट (KOL शेयर)", desc: "पार्टनर से KOL/निर्माता को सीधे पारित प्रतिशत।" },
            R: { full: "रिटेनर", desc: "वॉल्यूम की परवाह किए बिना पार्टनर को भुगतान की जाने वाली निश्चित राशि।" },
            I: { full: "ऑप कॉस्ट", desc: "तकनीकी सेटअप के लिए एकमुश्त या मासिक परिचालन लागत।" },
            B: { full: "बोनस", desc: "हर $1M के ट्रेडिंग वॉल्यूम के लिए नकद प्रोत्साहन।" }
        },
        tooltips: {
            V: "मासिक ट्रेडिंग वॉल्यूम (USD)",
            F: "मिश्रित ट्रेडिंग शुल्क (%)",
            P: "पार्टनर/एजेंसी शुल्क शेयर (%)",
            S: "KOL/क्रिएटर सब-स्प्लिट (%) - पार्टनर की आय का हिस्सा",
            R: "निश्चित मासिक रिटेनर (USD)",
            I: "परिचालन/एकीकरण लागत (USD)",
            B: "प्रति $1M वॉल्यूम बोनस (USD)",
            margin: "सभी पेआउट के बाद सुरक्षा बफर।"
        },
        gloss: {
            // hover instruction removed
        },
        sim: {
            params: "पैरामीटर",
            vol: "मासिक वॉल्यूम (USD)",
            fee: "मिश्रित शुल्क (%)",
            feeNote: "नोट: यह सभी स्तरों और संपत्तियों में संयुक्त औसत शुल्क है।",
            share: "पार्टनर शेयर (%)",
            sub: "सब-स्प्लिट (%)",
            retainer: "रिटेनर (USD)",
            opCost: "परिचालन लागत (USD)",
            bonus: "प्रति 1M बोनस (USD)"
        },
        assistantAnswers: {
            qSafe: {
                blocked: "❌ अवरुद्ध। मार्जिन बफर {buffer}% आपके {thresh}% के सुरक्षा सीमा से नीचे है। आगे न बढ़ें।",
                safe: "✅ सुरक्षित। {buffer}% मार्जिन के साथ {score}/100 स्कोर। मासिक लाभ: {profit}। संरचना सही है।",
                warn: "⚠️ चेतावनी। स्कोर {score}/100। मार्जिन {buffer}% स्वीकार्य है लेकिन कम है। सावधानी बरतें।",
                crit: "🚨 गंभीर। मार्जिन {buffer}% पर। वॉल्यूम में गिरावट या शुल्क दबाव के प्रति संवेदनशील। हस्ताक्षर करने से पहले बातचीत करें।"
            },
            qChange: {
                retainer: "🔧 चरण 1 प्राथमिकता: रिटेनर को पुनर्गठित करें। आपका R={val} शुद्ध लाभ का {pct}% खाता है। इसे मील के पत्थर में विभाजित करें।",
                subSplit: "📊 चरण 1 प्राथमिकता: सब-स्प्लिट को {val}% से घटाकर टियर संरचना (30%→40%→50%) में बदलें।",
                bonus: "🎁 चरण 1 प्राथमिकता: आपका बोनस ({val}/1M = {pct}% समतुल्य) एक जोखिम है। इसे टियर अपग्रेड से बदलें।",
                share: "⚡ चरण 1 प्राथमिकता: पार्टनर शेयर {val}% अधिक है। इसे 50–55% तक लाने की कोशिश करें। ~{recapture} मासिक बचत होगी।",
                balanced: "✅ आपके पैरामीटर संतुलित लग रहे हैं। सभी मैट्रिक्स को बेहतर बनाने के लिए वॉल्यूम V→{target}M बढ़ाने पर ध्यान दें।"
            },
            qBreak: {
                none: "⚡ कोई निश्चित लागत नहीं (R=0, I=0, B=0) — ब्रेक-ईवन $0 पर है। हर डॉलर लाभदायक है।",
                below: "🚨 ब्रेक-ईवन वॉल्यूम: ${be}M — आप वर्तमान {current}M वॉल्यूम पर घाटे में हैं। {gap}M और चाहिए।",
                above: "📐 ब्रेक-ईवन ${be}M पर। वर्तमान वॉल्यूम (${current}M) ब्रेक-ईवन से {pct}% ऊपर है। सुरक्षित बफर।"
            },
            qRisk: {
                none: "🟢 कोई बोनस नहीं। शून्य जोखिम। संरचना स्पष्ट और अनुमानित है।",
                high: "🔴 उच्च जोखिम: बोनस {val}/1M सकल शुल्क का {pct}% है। अनुशंसित सीमा <28.6% है।",
                elevated: "🟡 बढ़ा हुआ जोखिम: बोनस {pct}% के बराबर है। सावधानी की सीमा 15% है।",
                low: "🟢 कम जोखिम: बोनस {val}/1M ({pct}% समतुल्य) सुरक्षित सीमा (<15%) के भीतर है।"
            },
            qNegotiation: {
                move1: "♟️ कदम 1 — रिटेनर पुनर्गठन: \"मैं आधार रिटेनर दे सकता हूँ, लेकिन इसे {r1}, {r2}, {r3} में मील के पत्थर के आधार पर विभाजित करें।\"",
                move2: "♟️ कदम 2 — टियरिंग: \"फ्लैट {val}% के बजाय, इसे 20M तक 30%, 20-35M पर 40%, और उससे ऊपर 50% रखें।\"",
                move3: "♟️ कदम 3 — टियर बनाम बोनस: \"प्रति-1M बोनस के बजाय, 35M वॉल्यूम हिट करने पर टियर अपग्रेड कैसा रहेगा?\"",
                move4: "♟️ कदम 4 (अंतिम उपाय): सब-स्प्लिट समायोजन। वर्तमान {val}%। यदि आवश्यक हो, तो केवल लक्ष्य प्राप्ति पर +3–5% की वृद्धि दें।"
            },
            qRetained: {
                collapse: "🔴 मार्जिन पतन जोखिम: प्रति $1M केवल ${val} बचा। न्यूनतम सुरक्षा सीमा $80/1M है।",
                low: "🟡 कम मार्जिन बफर: ${val}/1M बचा। अनुशंसित सीमा $140/1M है।",
                healthy: "🟢 स्वस्थ मार्जिन: प्रति $1M ${val} बचा। आप सकल शुल्क का {pct}% बचा रहे हैं।"
            }
        }
    }
};

export type Language = 'en' | 'pl' | 'es' | 'hi';
