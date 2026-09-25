"use client";

import { site } from "@/content/site";
import { Section } from "./Section";
import { useLocale } from "./LocaleProvider";

export function Team() {
  const { t, locale } = useLocale();
  const { founder } = site;
  const initials = founder.name
    .replace(/[^\p{L} ]/gu, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Section id="team" title={t.team.title} intro={t.team.intro}>
      <div className="flex max-w-lg items-center gap-5 rounded-2xl border border-border bg-surface p-6">
        <div
          aria-hidden
          className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-surface-2 text-lg font-semibold text-ink-2"
        >
          {initials || "?"}
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{founder.name}</p>
          <p className="text-sm text-ink-2">{founder.role[locale]}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-accent">
            {founder.linkedin && (
              <a href={founder.linkedin} className="hover:underline">
                LinkedIn
              </a>
            )}
            {founder.github && (
              <a href={founder.github} className="hover:underline">
                GitHub
              </a>
            )}
            <a href={`mailto:${site.email}`} className="break-all hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
