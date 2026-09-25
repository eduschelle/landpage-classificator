"use client";

import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

export function Tech() {
  const { t } = useLocale();

  return (
    <Section id="tech" title={t.tech.title} intro={t.tech.intro}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.tech.items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
