"use client";

import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

// Illustrative estimates — see the footnote in i18n.ts.
const LLM_TOKENS = 6000;
const JEV_TOKENS = 500;
const MAX = 6000;
const TICKS = [0, 2000, 4000, 6000];
// Leave room past the longest bar for its value label.
const SPAN = 85;

export function TokenComparison() {
  const { t, locale } = useLocale();
  const nf = new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US");
  const bars = [
    { label: t.tokens.llm, value: LLM_TOKENS, color: "#6b6a65" },
    { label: t.tokens.jev, value: JEV_TOKENS, color: "var(--accent)" },
  ];
  const ratio = Math.round(LLM_TOKENS / JEV_TOKENS);

  return (
    <Section title={t.tokens.title} intro={t.tokens.intro}>
      <figure className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-5xl font-semibold tracking-tight">
          {ratio}×
          <span className="ml-3 text-base font-normal tracking-normal text-ink-2">
            {t.tokens.jev} vs. {t.tokens.llm}
          </span>
        </p>

        <div aria-hidden className="mt-10 grid grid-cols-[minmax(0,9rem)_1fr] gap-x-4 gap-y-5 sm:grid-cols-[14rem_1fr]">
          {bars.map((b) => (
            <div key={b.label} className="contents">
              <div className="self-center text-sm text-ink-2">{b.label}</div>
              <div className="relative flex h-10 items-center">
                <div className="absolute inset-y-0 left-0 w-px bg-baseline" />
                <div
                  className="group relative h-6 rounded-r-[4px]"
                  style={{ width: `${(b.value / MAX) * SPAN}%`, background: b.color, minWidth: 4 }}
                >
                  {/* Hit target taller than the mark. */}
                  <div className="absolute -inset-y-2 inset-x-0" />
                  <span className="pointer-events-none absolute bottom-full left-0 z-10 mb-3 hidden rounded-md border border-border bg-surface-2 px-2 py-1 text-xs whitespace-nowrap text-ink group-hover:block">
                    {b.label}: {nf.format(b.value)} {t.tokens.unit}
                  </span>
                </div>
                <span className="ml-3 text-sm font-medium text-ink tabular-nums">{nf.format(b.value)}</span>
              </div>
            </div>
          ))}
          <div />
          <div className="relative h-6 border-t border-grid text-xs text-muted tabular-nums">
            {TICKS.map((tick) => (
              <span
                key={tick}
                className="absolute top-1.5 -translate-x-1/2"
                style={{ left: `${(tick / MAX) * SPAN}%` }}
              >
                {nf.format(tick)}
              </span>
            ))}
          </div>
        </div>

        <table className="sr-only">
          <caption>{t.tokens.title}</caption>
          <tbody>
            {bars.map((b) => (
              <tr key={b.label}>
                <th scope="row">{b.label}</th>
                <td>
                  {nf.format(b.value)} {t.tokens.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <figcaption className="mt-8 text-sm text-muted">{t.tokens.footnote}</figcaption>
      </figure>
    </Section>
  );
}
