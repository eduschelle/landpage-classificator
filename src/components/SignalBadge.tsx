"use client";

import type { SignalKey } from "@/content/i18n";
import { useLocale } from "./LocaleProvider";

const styles: Record<SignalKey, { color: string; icon: string }> = {
  strong: { color: "var(--sig-strong)", icon: "▲" },
  neutral: { color: "var(--sig-neutral)", icon: "●" },
  weak: { color: "var(--sig-weak)", icon: "▼" },
};

// Identity is carried by label + icon; the colored swatch is secondary, and text stays in ink.
export function SignalBadge({ signal }: { signal: SignalKey }) {
  const { t } = useLocale();
  const { color, icon } = styles[signal];

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 py-1 pr-3 pl-1 text-sm font-medium whitespace-nowrap text-ink">
      <span
        aria-hidden
        className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-[9px] leading-none text-white"
        style={{ background: color }}
      >
        {icon}
      </span>
      {t.signals[signal]}
    </span>
  );
}
