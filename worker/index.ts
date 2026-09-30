// Cloudflare Worker: serves the static export in out/ and handles POST /api/contact.
// Static files are served directly by Workers Static Assets; this script only runs for /api/*
// (see run_worker_first in wrangler.jsonc).
//
// /api/contact validates the contact form and forwards it by email through the Resend REST API.
//
// Environment variables (Cloudflare → Worker → Settings → Variables and Secrets, or .dev.vars locally):
//   RESEND_API_KEY  (required, secret)
//   CONTACT_TO      (optional, default schelle.eng@gmail.com)
//   CONTACT_FROM    (optional, default onboarding@resend.dev until the domain is verified)

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const field = (data: Record<string, unknown>, key: string) =>
  typeof data[key] === "string" ? (data[key] as string).trim() : "";

async function handleContact(request: Request, env: Env): Promise<Response> {
  // Only accept submissions from our own pages.
  const origin = request.headers.get("Origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: "forbidden" }, 403);
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot filled → pretend success so bots don't retry.
  if (field(data, "website")) return json({ ok: true });

  const name = field(data, "name");
  const email = field(data, "email");
  const message = field(data, "message");
  const locale = field(data, "locale") === "pt" ? "pt" : "en";

  if (!name || name.length > 200 || !EMAIL_RE.test(email) || email.length > 320 || !message || message.length > 5000) {
    return json({ error: "invalid_input" }, 422);
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return json({ error: "not_configured" }, 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `EngSchelle <${env.CONTACT_FROM || "onboarding@resend.dev"}>`,
      to: [env.CONTACT_TO || "schelle.eng@gmail.com"],
      reply_to: email,
      subject: `[engschelle.online] Contact from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\nLanguage: ${locale}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      return request.method === "POST" ? handleContact(request, env) : json({ error: "method_not_allowed" }, 405);
    }
    if (pathname.startsWith("/api/")) {
      return json({ error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
