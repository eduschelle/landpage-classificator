import type { Metadata } from "next";
import { dictionaries } from "@/content/i18n";
import { site } from "@/content/site";
import "./globals.css";

const { meta } = dictionaries.en;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.brand,
    title: meta.title,
    description: meta.description,
    locale: "en_US",
    alternateLocale: ["pt_BR"],
  },
  // og:image and the favicon come from app/opengraph-image.tsx and app/icon.svg.
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
