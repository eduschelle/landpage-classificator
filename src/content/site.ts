// Single source of truth for brand and legal data.
// Replace the placeholders once the company is incorporated (CNPJ).
export const site = {
  brand: "EngSchelle",
  url: "https://engschelle.online",
  legalName: "[Razão social — pending incorporation]",
  cnpj: "[CNPJ — pending]",
  city: "Brazil",
  email: "schelle.eng@gmail.com",
  founder: {
    name: "[Founder name]",
    role: { en: "Founder & Lead Developer", pt: "Fundador e Desenvolvedor Principal" },
    linkedin: "",
    github: "",
  },
  jev: {
    name: "Jev",
    vendor: "TypeSafe AI",
    url: "",
  },
} as const;

export type Site = typeof site;
