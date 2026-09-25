"use client";

import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

export function Roadmap() {
  const { t } = useLocale();

  return (
    <Section id="roadmap" title={t.roadmap.title}>
      <ol className="grid gap-8 border-l border-baseline pl-8 md:grid-cols-4 md:border-t md:border-l-0 md:pt-8 md:pl-0">
        {t.roadmap.items.map((item, i) => (
          <li key={item.phase} className="relative">
            <span
              aria-hidden
              className={`absolute top-1 -left-[37px] h-2.5 w-2.5 rounded-full ring-4 ring-page md:-top-[37px] md:left-0 ${
                i === 0 ? "bg-accent" : "bg-muted"
              }`}
            />
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{item.phase}</p>
            <h3 className="mt-2 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
