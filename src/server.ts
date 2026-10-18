import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { analyze } from "./analyze.js";
import type { InputKind } from "./types.js";

const PUBLIC_DIR = join(import.meta.dirname, "..", "public");
const KINDS: InputKind[] = ["message", "screenshot", "call", "app"];
const MAX_TEXT = 4000;

// Keeps a public demo from burning through credits: N analyses per IP per hour.
const LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR ?? 30);
const hits = new Map<string, number[]>();
function allowed(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (recent.length >= LIMIT_PER_HOUR) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const app = new Hono();

app.get("/", async (c) => c.html(await readFile(join(PUBLIC_DIR, "index.html"), "utf8")));
app.get("/health", (c) => c.json({ ok: true }));

app.post("/api/analyze", bodyLimit({ maxSize: 6 * 1024 * 1024, onError: (c) => c.json({ error: "La imagen es demasiado grande." }, 413) }), async (c) => {
  const ip = c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowed(ip)) return c.json({ error: "Hiciste muchas consultas seguidas. Intenta de nuevo en un rato." }, 429);

  const body = await c.req.json<{ kind?: string; text?: string; image?: string }>().catch(() => null);
  const kind = KINDS.find((k) => k === body?.kind);
  const text = body?.text?.trim().slice(0, MAX_TEXT);
  const image = body?.image?.startsWith("data:image/") ? body.image : undefined;
  if (!kind || (!text && !image)) return c.json({ error: "Escribe el mensaje o sube una captura." }, 400);

  try {
    return c.json(await analyze({ kind, text, image }));
  } catch (err) {
    console.error("analyze failed:", (err as Error).message);
    return c.json({ error: "No pude completar el análisis. Intenta de nuevo en unos segundos." }, 502);
  }
});

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, () => console.log(`¿Es fraude? → http://localhost:${port}`));
