"use client";

import type { SignalKey } from "@/content/i18n";
import { Section } from "./Section";
import { SignalBadge } from "./SignalBadge";
import { useLocale } from "./LocaleProvider";

// Snapshot from a recent run on public fundamentals — not real-time, not a recommendation.
const rows: { asset: string; grade: string; score: number; signal: SignalKey }[] = [
  { asset: "PETR4", grade: "B", score: 77.8, signal: "strong" },
  { asset: "VALE3", grade: "B", score: 68.8, signal: "strong" },
  { asset: "ITUB4", grade: "B", score: 65.8, signal: "neutral" },
  { asset: "SMTO3", grade: "C", score: 54.6, signal: "neutral" },
  { asset: "WEGE3", grade: "C", score: 55.5, signal: "weak" },
  { asset: "MGLU3", grade: "D", score: 40.2, signal: "weak" },
];

export function SignalDemo() {
  const { t, locale } = useLocale();
  const nf = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <Section id="demo" title={t.demo.title} intro={t.demo.intro}>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">{t.demo.note}</caption>
          <thead className="border-b border-border text-xs tracking-wide text-muted uppercase">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.asset}</th>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.grade}</th>
              <th scope="col" className="px-6 py-4 text-right font-medium">{t.demo.columns.score}</th>
              <th scope="col" className="px-6 py-4 font-medium">{t.demo.columns.signal}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.asset} className="border-b border-grid last:border-0">
                <th scope="row" className="px-6 py-4 font-semibold">{r.asset}</th>
                <td className="px-6 py-4 text-ink-2 tabular-nums">{r.grade}</td>
                <td className="px-6 py-4 text-right text-ink-2 tabular-nums">{nf.format(r.score)}</td>
                <td className="px-6 py-4"><SignalBadge signal={r.signal} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">{t.demo.note}</p>
    </Section>
  );
}
