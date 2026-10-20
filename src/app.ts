import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { analyze } from "./analyze.js";
import { LANGS, type Lang } from "./i18n.js";
import type { InputKind } from "./types.js";

const PUBLIC_DIR = join(import.meta.dirname, "..", "public");
const KINDS: InputKind[] = ["message", "screenshot", "call", "app", "link"];
const MAX_TEXT = 4000;

// Keeps a public demo within free credits: N analyses per IP per hour, and a
// daily cap per server instance.
const LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR ?? 30);
const LIMIT_PER_DAY = Number(process.env.DAILY_LIMIT ?? 300);
const hits = new Map<string, number[]>();
let day = "";
let todayCount = 0;

function allowed(ip: string): "ok" | "ip" | "day" {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    todayCount = 0;
  }
  if (todayCount >= LIMIT_PER_DAY) return "day";

  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= LIMIT_PER_HOUR) return "ip";
  recent.push(now);
  hits.set(ip, recent);
  todayCount++;
  return "ok";
}

const app = new Hono();

const ERRORS: Record<Lang, Record<"tooBig" | "ip" | "day" | "empty" | "failed", string>> = {
  es: {
    tooBig: "La imagen es demasiado grande.",
    ip: "Hiciste muchas consultas seguidas. Intenta de nuevo en un rato.",
    day: "La demo llegó a su límite de consultas de hoy. Vuelve mañana.",
    empty: "Escribe el mensaje o sube una captura.",
    failed: "No pude completar el análisis. Intenta de nuevo en unos segundos.",
  },
  en: {
    tooBig: "The image is too large.",
    ip: "Too many checks in a row. Please try again in a while.",
    day: "The demo reached today's limit. Please come back tomorrow.",
    empty: "Paste the message or upload a screenshot.",
    failed: "The analysis could not be completed. Please try again in a few seconds.",
  },
};

// Locally the page is read from public/; on Vercel the CDN serves public/index.html.
app.get("/", async (c) => {
  try {
    return c.html(await readFile(join(PUBLIC_DIR, "index.html"), "utf8"));
  } catch {
    const query = new URL(c.req.url).search;
    return c.redirect(`/index.html${query}`);
  }
});
app.get("/health", (c) => c.json({ ok: true }));

app.post("/api/analyze", bodyLimit({ maxSize: 6 * 1024 * 1024, onError: (c) => c.json({ error: ERRORS.es.tooBig }, 413) }), async (c) => {
  const body = await c.req.json<{ kind?: string; text?: string; image?: string; lang?: string }>().catch(() => null);
  const lang = LANGS.find((l) => l === body?.lang) ?? "es";
  const t = ERRORS[lang];

  const ip = c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = allowed(ip);
  if (limit !== "ok") return c.json({ error: t[limit] }, 429);

  const kind = KINDS.find((k) => k === body?.kind);
  const text = body?.text?.trim().slice(0, MAX_TEXT);
  const image = body?.image?.startsWith("data:image/") ? body.image : undefined;
  if (!kind || (!text && !image)) return c.json({ error: t.empty }, 400);

  try {
    return c.json(await analyze({ kind, text, image, lang }));
  } catch (err) {
    const message = (err as Error).message;
    console.error("analyze failed:", message);
    // Provider and status only (e.g. "Token Factory 404 (nvidia/...)"), never keys or message content.
    const code = /^(Token Factory|Tavily) \d{3}(?: \([^)]*\))?/.exec(message)?.[0] ?? (err as Error).name;
    return c.json({ error: t.failed, code }, 502);
  }
});

export default app;
