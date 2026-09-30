// Single source of truth for brand and legal data.
// `legalName` and `cnpj` stay empty until the company is incorporated — Footer.tsx
// falls back to `brand` and drops the CNPJ segment while they are empty strings.
export const site = {
  brand: "EngSchelle",
  url: "https://engschelle.online",
  legalName: "",
  cnpj: "",
  city: "Brazil",
  email: "schelle.eng@gmail.com",
  founder: {
    name: "Eduardo Schelle",
    role: { en: "Founder & Lead Developer", pt: "Fundador e Desenvolvedor Principal" },
    linkedin: "",
    github: "https://github.com/eduschelle",
  },
  jev: {
    name: "Jev",
    vendor: "TypeSafe AI",
    url: "",
  },
} as const;

export type Site = typeof site;
