// Runs the app as a long-lived Node server (local development and the container image).
// On Vercel, src/app.ts is picked up directly and this file is not used.
import { serve } from "@hono/node-server";
import app from "./app.js";

const port = Number(process.env.PORT ?? 8787);
serve({ fetch: app.fetch, port }, () => console.log(`¿Es fraude? → http://localhost:${port}`));
