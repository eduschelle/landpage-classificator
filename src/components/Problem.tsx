"use client";

import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

export function Problem() {
  const { t } = useLocale();

  return (
    <Section title={t.problem.title} intro={t.problem.intro}>
      <div className="grid gap-6 md:grid-cols-3">
        {t.problem.points.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
