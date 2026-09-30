# EngSchelle — landing page (engschelle.online)

Static landing page for an asset classifier (B3 stocks, FIIs, fixed income and funds) that emits discrete signals — Strong Buy, Buy, Hold, Sell, Strong Sell — using embeddings from the Jev model (TypeSafe AI) instead of LLM-generated text analysis.

- **Next.js 16** with `output: "export"` → fully static site in `out/`
- **Tailwind CSS v4** + TypeScript
- **Bilingual** EN (default) / PT-BR, switched client-side (`localStorage`); all copy lives in `src/content/i18n.ts`
- **Contact form** → Cloudflare Worker `worker/index.ts` (`/api/contact`) → Resend REST API → schelle.eng@gmail.com
- **Hosting**: Cloudflare Workers with Static Assets (`wrangler.jsonc`) — the Worker only runs for `/api/*`, everything else is served straight from `out/`

## Project layout

```
src/content/site.ts      brand, legal name/CNPJ placeholders, email, founder
src/content/i18n.ts      EN/PT dictionaries for every section
src/app/                 layout (SEO metadata), page, globals.css, icon.svg, opengraph-image.tsx
src/components/          one component per section + LocaleProvider/LanguageToggle
worker/index.ts          Cloudflare Worker: /api/contact (the only server-side code), falls back to static assets
wrangler.jsonc           Worker config: assets dir out/, build command, worker name
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
npm run dev        # http://localhost:3000 (/api/contact is NOT available here)
npm run lint
npm run build      # static export → out/
```

To test the site **and** the contact endpoint together, use Wrangler:

```bash
cp .dev.vars.example .dev.vars   # put your real RESEND_API_KEY in it (never commit .dev.vars)
npm run preview                  # wrangler dev: builds, then serves out/ + the Worker → http://localhost:8787
```

Submit the form at `/#contact`, and the email should arrive at schelle.eng@gmail.com.

## Environment variables (Worker)

| Name             | Required | Default                  | Notes                                             |
|------------------|----------|--------------------------|---------------------------------------------------|
| `RESEND_API_KEY` | yes      | —                        | Secret. Create at resend.com → API Keys.          |
| `CONTACT_TO`     | no       | `schelle.eng@gmail.com`  | Recipient.                                        |
| `CONTACT_FROM`   | no       | `onboarding@resend.dev`  | Set to e.g. `contact@engschelle.online` once the domain is verified in Resend. |

> With the default `onboarding@resend.dev` sender, Resend only delivers to the email address of the Resend account owner. Sign up for Resend with schelle.eng@gmail.com, or verify the domain (below).

## Deploy to Cloudflare (Workers)

The repo includes `wrangler.jsonc`, so Cloudflare deploys it as a Worker with Static Assets. Without that file, Cloudflare auto-detects Next.js and tries OpenNext, which does not support `output: "export"`.

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** → pick this repo.
2. The Worker name **must match** `"name"` in `wrangler.jsonc` (`landpage-classificator`). Rename one of them if they differ.
3. Build settings:
   - Build command: *(leave empty)* — `wrangler deploy` runs `npm run build` itself (see `build` in `wrangler.jsonc`)
   - Deploy command: `npx wrangler deploy`
   - Build variable `NODE_VERSION` = `22`
4. **Settings → Variables and Secrets** → add `RESEND_API_KEY` (type *Secret*). Optionally `CONTACT_TO` / `CONTACT_FROM`.
5. **Settings → Domains & Routes → Add → Custom domain** → `engschelle.online` (and `www.engschelle.online` if you want). The domain's DNS must be on Cloudflare: add the site in Cloudflare and switch the nameservers at your registrar to the two Cloudflare gives you. HTTPS is issued automatically.

You can also deploy from the CLI: `npx wrangler login` then `npm run deploy`.

### Resend domain verification (sender @engschelle.online)

1. resend.com → **Domains → Add domain** → `engschelle.online` (region of your choice).
2. Resend shows DNS records. Add them in Cloudflare DNS, **DNS only** (grey cloud):
   - `TXT` on `resend._domainkey` → DKIM public key
   - `MX` on `send` → `feedback-smtp.<region>.amazonses.com` (priority 10)
   - `TXT` on `send` → `v=spf1 include:amazonses.com ~all`
   - Optional: `TXT` on `_dmarc` → `v=DMARC1; p=none;`
3. Click **Verify** and wait until the status is *Verified*.
4. Set `CONTACT_FROM=contact@engschelle.online` in the Worker's variables and redeploy.

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
- `opengraph-image` is generated at build time; `public/_headers` makes Cloudflare serve it as `image/png` (Workers Static Assets honors `_headers`).
- Building on Windows can fail if Smart App Control blocks Next's native SWC binary (`An Application Control policy has blocked this file`). Build in WSL with a Linux Node (`nvm install`) instead.
