"use client";

import { site } from "@/content/site";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";

export function Header() {
  const { t } = useLocale();
  const links = [
    ["#how", t.nav.how],
    ["#demo", t.nav.demo],
    ["#tech", t.nav.tech],
    ["#roadmap", t.nav.roadmap],
    ["#team", t.nav.team],
    ["#contact", t.nav.contact],
  ] as const;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-page/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md bg-accent text-sm text-white">
            E
          </span>
          {site.brand}
        </a>
        <nav aria-label="Main" className="hidden gap-6 text-sm text-ink-2 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
        <LanguageToggle />
      </div>
    </header>
  );
}
