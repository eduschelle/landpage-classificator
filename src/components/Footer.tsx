"use client";

import { site } from "@/content/site";
import { useLocale } from "./LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border py-12 text-sm text-muted">
      <div className="mx-auto grid max-w-6xl gap-4 px-6">
        <p className="max-w-3xl leading-relaxed">{t.footer.disclaimer}</p>
        <p>{t.footer.jev}</p>
        <p>
          © {new Date().getFullYear()} {site.legalName || site.brand}
          {site.cnpj && ` · CNPJ ${site.cnpj}`} · {site.city} · {t.footer.rights}
        </p>
        <p>
          <a href={`mailto:${site.email}`} className="text-ink-2 hover:text-ink">
            {site.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
