# EngSchelle — landing page (engschelle.online)

Static landing page for an asset classifier (B3 stocks, FIIs, fixed income and funds) that emits discrete signals — Strong Buy, Buy, Hold, Sell, Strong Sell — using embeddings from the Jev model (TypeSafe AI) instead of LLM-generated text analysis.

- **Next.js 16** with `output: "export"` → fully static site in `out/`
- **Tailwind CSS v4** + TypeScript
- **Bilingual** EN (default) / PT-BR, switched client-side (`localStorage`); all copy lives in `src/content/i18n.ts`
- **Contact form** → Cloudflare Worker `worker/index.ts` (`/api/contact`) → Resend REST API → schelle.eng@gmail.com
- **Hosting**: Cloudflare Workers with Static Assets (`wrangler.jsonc`) — the Worker only runs for `/api/*`, everything else is served straight from `out/`

## Project layout

```
src/content/site.ts      brand, legal name/CNPJ (empty until incorporation), email, founder
src/content/i18n.ts      EN/PT dictionaries for every section
src/app/                 layout (SEO metadata), page, globals.css, icon.svg, opengraph-image.tsx
src/components/          one component per section + LocaleProvider/LanguageToggle
worker/index.ts          Cloudflare Worker: /api/contact (the only server-side code), falls back to static assets
wrangler.jsonc           Worker config: assets dir out/, build command, worker name
public/                  robots.txt, sitemap.xml, _headers (Cloudflare headers)
```

To change the brand, legal name, CNPJ or founder info, edit **`src/content/site.ts`** only.
`legalName` and `cnpj` are empty strings while incorporation is pending; `Footer.tsx` falls back to
`brand` and omits the `· CNPJ …` segment, so nothing placeholder-looking is ever rendered. Filling
them in is all that is needed once the CNPJ exists.

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
3. Build settings (**Settings → Build → Build configuration**):
   - Build command: *(must stay empty)* — `wrangler deploy` already runs `npm run build` itself (see `build` in
     `wrangler.jsonc`). If the dashboard field is also set, every deploy runs `next build` **twice**; the tell is two
     `next build` runs in the Workers Builds log.
   - Deploy command: `npx wrangler deploy`
   - Build variable `NODE_VERSION` = `22`
4. **Settings → Variables and Secrets** → add `RESEND_API_KEY` (type *Secret*). Optionally `CONTACT_TO` / `CONTACT_FROM`.
5. **Settings → Domains & Routes → Add → Custom domain** → `engschelle.online`, then again for `www.engschelle.online`.
   Cloudflare creates the DNS records and issues the TLS certificate automatically.

   This only works once the zone is **Active** in Cloudflare — the domain has to use Cloudflare's nameservers, not the
   registrar's. `engschelle.online` is registered at GoDaddy, so: Cloudflare → **Add a site** → `engschelle.online`
   (Free plan) → copy the two nameservers it assigns → GoDaddy → **My Products → Domains → engschelle.online → DNS →
   Nameservers → Change → I'll use my own** → enter both. Propagation is usually minutes, up to 24h. Check with
   `nslookup -type=ns engschelle.online` (expect `*.ns.cloudflare.com`) and `curl -I https://engschelle.online`
   (expect `200` and `server: cloudflare`).

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
- [x] Working contact form (needs `RESEND_API_KEY` set as a Worker secret **and a redeploy**, or `/api/contact` answers `not_configured`)
- [x] No crypto/blockchain content (crypto association makes the company ineligible)
- [x] Investment disclaimer (not investment advice, CVM)
- [x] Founder named with a public profile link (`founder` in `src/content/site.ts`)
- [ ] Site live on HTTPS at engschelle.online (needs the nameserver switch + custom domain above)
- [ ] Company incorporated (CNPJ): fill `legalName` / `cnpj` in `src/content/site.ts`

The CNPJ is the only remaining hard blocker — the application cannot be submitted without incorporation.

## Notes

- Signal demo and token figures are **illustrative** and labeled as such on the page.
- `opengraph-image` is generated at build time; `public/_headers` makes Cloudflare serve it as `image/png` (Workers Static Assets honors `_headers`).
- Building on Windows can fail if Smart App Control blocks Next's native SWC binary (`An Application Control policy has blocked this file`). Build in WSL with a Linux Node (`nvm install`) instead.
