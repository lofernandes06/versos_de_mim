/**
 * Cloudflare Worker for the static author site and newsletter endpoint.
 * Required secrets (see NEWSLETTER_SETUP.md): TURNSTILE_SITE_KEY,
 * TURNSTILE_SECRET_KEY, BREVO_API_KEY and BREVO_LIST_ID.
 */
const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff"
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function validEmail(value) {
  if (typeof value !== "string" || value.length > 254) return false;
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET_KEY || !token || typeof token !== "string" || token.length > 2048) return false;
  const data = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) data.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: data
    });
    if (!response.ok) return false;
    const result = await response.json();
    const hostname = new URL(request.url).hostname;
    return result.success === true && result.action === "newsletter" && result.hostname === hostname;
  } catch {
    return false;
  }
}

async function subscribe(request, env) {
  if (request.method !== "POST") return json({ error: "Método não permitido." }, 405);
  if (!sameOrigin(request)) return json({ error: "Não foi possível validar a origem deste pedido." }, 403);
  const contentType = request.headers.get("content-type") || "";
  const length = Number(request.headers.get("content-length") || 0);
  if (!contentType.includes("application/json") || length > 4096) {
    return json({ error: "Pedido inválido." }, 400);
  }
  if (!env.TURNSTILE_SECRET_KEY || !env.BREVO_API_KEY || !env.BREVO_LIST_ID) {
    return json({ error: "A inscrição está temporariamente indisponível. Tente novamente mais tarde." }, 503);
  }

  let body;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4096) return json({ error: "Pedido inválido." }, 400);
    body = JSON.parse(rawBody);
  } catch {
    return json({ error: "Não foi possível ler os dados enviados." }, 400);
  }
  if (body && typeof body.website === "string" && body.website.trim()) {
    // Honeypot: bots receive a neutral accepted response; no address is forwarded.
    return json({ ok: true }, 202);
  }
  if (!body || !validEmail(body.email)) return json({ error: "Informe um endereço de e-mail válido." }, 400);
  if (body.consent !== true) return json({ error: "É necessário aceitar o recebimento de novidades para se inscrever." }, 400);
  if (!await verifyTurnstile(body.turnstileToken, request, env)) {
    return json({ error: "Não foi possível confirmar a verificação de segurança. Tente novamente." }, 400);
  }

  const listId = Number(env.BREVO_LIST_ID);
  if (!Number.isInteger(listId) || listId < 1) return json({ error: "A inscrição está temporariamente indisponível." }, 503);

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: body.email.trim().toLowerCase(),
        listIds: [listId],
        updateEnabled: true
      })
    });
    if (response.ok || response.status === 201) return json({ ok: true }, 201);
    // Avoid returning or logging provider details or the submitted address.
    return json({ error: "Não foi possível concluir a inscrição agora. Tente novamente mais tarde." }, 502);
  } catch {
    return json({ error: "Não foi possível concluir a inscrição agora. Tente novamente mais tarde." }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/config" && request.method === "GET") {
      const ready = Boolean(env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY && env.BREVO_API_KEY && env.BREVO_LIST_ID);
      return json({ ready, turnstileSiteKey: ready ? env.TURNSTILE_SITE_KEY : null });
    }
    if (url.pathname === "/api/subscribe") return subscribe(request, env);
    if (url.pathname.startsWith("/api/")) return json({ error: "Rota não encontrada." }, 404);
    return env.ASSETS.fetch(request);
  }
};
