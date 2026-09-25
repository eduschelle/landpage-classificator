"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/content/i18n";

const STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

// Tiny external store over localStorage. The static HTML is rendered in English
// (server snapshot); after hydration the saved choice or browser language wins.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "pt") return saved;
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

const getServerSnapshot = (): Locale => "en";

function setLocale(next: Locale) {
  localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((l) => l());
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const { meta } = dictionaries[locale];
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
