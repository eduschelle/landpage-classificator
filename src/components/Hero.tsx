"use client";

import type { SignalKey } from "@/content/i18n";
import { SignalBadge } from "./SignalBadge";
import { useLocale } from "./LocaleProvider";

const scale: SignalKey[] = ["strongBuy", "buy", "hold", "sell", "strongSell"];

export function Hero() {
  const { t } = useLocale();

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(57,135,229,0.22),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 sm:pt-32">
        <p className="text-sm font-medium tracking-wide text-ink-2 uppercase">{t.hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">{t.hero.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t.hero.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a78d6]">
            {t.hero.ctaPrimary}
          </a>
          <a href="#how" className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink hover:bg-surface">
            {t.hero.ctaSecondary}
          </a>
        </div>
        <ul className="mt-14 flex flex-wrap gap-3" aria-label={t.nav.demo}>
          {scale.map((s) => (
            <li key={s}>
              <SignalBadge signal={s} />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{t.hero.poweredBy}</p>
      </div>
    </section>
  );
}
