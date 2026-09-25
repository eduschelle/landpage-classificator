"use client";

import type { SignalKey } from "@/content/i18n";
import { Section } from "./Section";
import { SignalBadge } from "./SignalBadge";
import { useLocale } from "./LocaleProvider";

type AssetType = "stock" | "fii" | "fixed" | "fund";

// Illustrative sample only — not model output, not a recommendation.
const rows: { asset: string; type: AssetType; signal: SignalKey; confidence: number }[] = [
  { asset: "WEGE3", type: "stock", signal: "buy", confidence: 0.71 },
  { asset: "ITUB4", type: "stock", signal: "hold", confidence: 0.64 },
  { asset: "PETR4", type: "stock", signal: "sell", confidence: 0.58 },
  { asset: "HGLG11", type: "fii", signal: "strongBuy", confidence: 0.82 },
  { asset: "MXRF11", type: "fii", signal: "hold", confidence: 0.6 },
  { asset: "Tesouro IPCA+ 2035", type: "fixed", signal: "buy", confidence: 0.77 },
  { asset: "CDB 100% CDI", type: "fixed", signal: "hold", confidence: 0.69 },
  { asset: "Multimercado XYZ", type: "fund", signal: "strongSell", confidence: 0.66 },
];

export function SignalDemo() {
  const { t, locale } = useLocale();
  const pct = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", { style: "percent" });

  return (
    <Section id="demo" title={t.demo.title} intro={t.demo.intro}>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">{t.demo.note}</caption>
          <thead className="border-b border-border text-xs tracking-wide text-muted uppercase">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.asset}</th>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.type}</th>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.signal}</th>
              <th scope="col" className="px-6 py-4 text-right font-medium">{t.demo.columns.confidence}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.asset} className="border-b border-grid last:border-0">
                <th scope="row" className="px-6 py-4 font-semibold">{r.asset}</th>
                <td className="px-6 py-4 text-ink-2">{t.demo.types[r.type]}</td>
                <td className="px-6 py-4"><SignalBadge signal={r.signal} /></td>
                <td className="px-6 py-4 text-right text-ink-2 tabular-nums">{pct.format(r.confidence)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{t.demo.note}</p>
    </Section>
  );
}
