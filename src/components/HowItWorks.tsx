"use client";

import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <Section id="how" title={t.how.title} intro={t.how.intro}>
      <ol className="grid gap-6 md:grid-cols-4">
        {t.how.steps.map((s, i) => (
          <li key={s.title} className="relative rounded-2xl border border-border bg-surface p-6">
            <span className="text-sm font-semibold text-accent tabular-nums">0{i + 1}</span>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            {i < t.how.steps.length - 1 && (
              <span aria-hidden className="absolute top-1/2 -right-5 hidden text-muted md:block">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
