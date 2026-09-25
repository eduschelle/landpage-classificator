"use client";

import { locales } from "@/content/i18n";
import { useLocale } from "./LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-border p-0.5 text-xs font-medium">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === l ? "bg-ink text-page" : "text-ink-2 hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
