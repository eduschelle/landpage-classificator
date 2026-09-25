# EngSchelle — landing page (engschelle.online)

Static landing page for an asset classifier (B3 stocks, FIIs, fixed income and funds) that emits discrete signals — Strong Buy, Buy, Hold, Sell, Strong Sell — using embeddings from the Jev model (TypeSafe AI) instead of LLM-generated text analysis.

- **Next.js 16** with `output: "export"` → fully static site in `out/`
- **Tailwind CSS v4** + TypeScript
- **Bilingual** EN (default) / PT-BR, switched client-side (`localStorage`); all copy lives in `src/content/i18n.ts`
- **Contact form** → Cloudflare Pages Function `functions/api/contact.ts` → Resend REST API → schelle.eng@gmail.com

## Project layout

```
src/content/site.ts      brand, legal name/CNPJ placeholders, email, founder
src/content/i18n.ts      EN/PT dictionaries for every section
src/app/                 layout (SEO metadata), page, globals.css, icon.svg, opengraph-image.tsx
src/components/          one component per section + LocaleProvider/LanguageToggle
functions/api/contact.ts Cloudflare Pages Function (the only server-side code)
public/                  robots.txt, sitemap.xml, _headers (Cloudflare headers)
```

To change the brand, legal name, CNPJ or founder info, edit **`src/content/site.ts`** only.

## Setup (WSL2 + nvm)

```bash
# Tip: clone inside the Linux filesystem (~/projects) — node_modules on /mnt/c is slow.
nvm install        # reads .nvmrc (Node 22 LTS)
nvm use
npm install
```

## Development

```bash
npm run dev        # http://localhost:3000 (the /api/contact function is NOT available here)
npm run lint
npm run build      # static export → out/
```

To test the site **and** the contact function together, use Wrangler:

```bash
cp .dev.vars.example .dev.vars   # put your real RESEND_API_KEY in it (never commit .dev.vars)
npm run preview                  # build + wrangler pages dev out → http://localhost:8788
```

Submit the form at `/#contact`, and the email should arrive at schelle.eng@gmail.com.

## Environment variables (Pages Function)

| Name             | Required | Default                  | Notes                                             |
|------------------|----------|--------------------------|---------------------------------------------------|
| `RESEND_API_KEY` | yes      | —                        | Secret. Create at resend.com → API Keys.          |
| `CONTACT_TO`     | no       | `schelle.eng@gmail.com`  | Recipient.                                        |
| `CONTACT_FROM`   | no       | `onboarding@resend.dev`  | Set to e.g. `contact@engschelle.online` once the domain is verified in Resend. |

> With the default `onboarding@resend.dev` sender, Resend only delivers to the email address of the Resend account owner. Sign up for Resend with schelle.eng@gmail.com, or verify the domain (below).

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: *None* (or Next.js (Static HTML Export))
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variable `NODE_VERSION` = `22` (it also reads `.nvmrc`)
4. **Settings → Variables and Secrets** → add `RESEND_API_KEY` (type *Secret*) for Production (and Preview if you want).
   Redeploy after adding variables.
5. The `functions/` directory is picked up automatically and `/api/contact` becomes a Pages Function.
6. **Custom domains** → add `engschelle.online` (and `www.engschelle.online` if you want). If the domain's DNS is on Cloudflare, the records are created automatically; otherwise point the nameservers to Cloudflare first. HTTPS is issued automatically.

You can also deploy from the CLI: `npx wrangler login` then `npm run deploy`. That creates or uses the Pages project `engschelle`. Rename it in `package.json` if you prefer another name.

### Resend domain verification (sender @engschelle.online)

1. resend.com → **Domains → Add domain** → `engschelle.online` (region of your choice).
2. Resend shows DNS records. Add them in Cloudflare DNS, **DNS only** (grey cloud):
   - `TXT` on `resend._domainkey` → DKIM public key
   - `MX` on `send` → `feedback-smtp.<region>.amazonses.com` (priority 10)
   - `TXT` on `send` → `v=spf1 include:amazonses.com ~all`
   - Optional: `TXT` on `_dmarc` → `v=DMARC1; p=none;`
3. Click **Verify** and wait until the status is *Verified*.
4. Set `CONTACT_FROM=contact@engschelle.online` in Cloudflare Pages and redeploy.

## NVIDIA Inception checklist

- [x] Functional website with a clear product and mission description
- [x] Team section with at least one developer
- [x] Working contact form
- [x] No crypto/blockchain content (crypto association makes the company ineligible)
- [x] Investment disclaimer (not investment advice, CVM)
- [ ] Site live on HTTPS at engschelle.online
- [ ] Company incorporated (CNPJ): fill `legalName` / `cnpj` in `src/content/site.ts`
- [ ] Replace `[Founder name]` and add LinkedIn/GitHub in `src/content/site.ts`

## Notes

- Signal demo and token figures are **illustrative** and labeled as such on the page.
- `opengraph-image` is generated at build time; `public/_headers` makes Cloudflare serve it as `image/png`.
