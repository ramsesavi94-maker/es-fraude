import { CHANNELS, type ChannelId, GENERAL_CHANNELS, GENERAL_STEPS, PATTERNS } from "./catalog.js";
import { chat, MODELS, parseJson } from "./llm.js";
import { hostOf, officialOwner } from "./official.js";
import type { Analysis, AnalysisInput, Check, Extraction, ModelVerdict, Verdict } from "./types.js";

const URL_RE = /\b(?:https?:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s)]*)?/gi;
const PHONE_RE = /(?:\+?52[\s-]?)?(?:\(?\d{2,3}\)?[\s-]?)\d{3,4}[\s-]?\d{4}\b/g;

type Trace = Analysis["trace"];

/** Step 1: turn the input into plain text plus the facts a scam check needs. */
async function extract(input: AnalysisInput, trace: Trace): Promise<Extraction> {
  let text = input.text?.trim() ?? "";

  if (input.image) {
    const r = await chat(MODELS.vision, [
      {
        role: "user",
        content: [
          { type: "text", text: "Transcribe todo el texto visible en esta captura, tal cual. Después, en una línea que empiece con 'CONTEXTO:', di qué app o canal parece (SMS, WhatsApp, correo, red social) y quién aparece como remitente." },
          { type: "image_url", image_url: { url: input.image } },
        ],
      },
    ]);
    trace.push({ step: "leer captura", model: r.model, ms: r.ms, tokens: r.tokens });
    text = [text, r.text].filter(Boolean).join("\n\n");
  }

  const r = await chat(MODELS.fast, [
    {
      role: "system",
      content:
        "Extraes datos de mensajes que una persona en México recibió y le parecen sospechosos. No juzgas si es fraude. Responde solo con JSON válido.",
    },
    {
      role: "user",
      content: `Tipo de entrada: ${input.kind}\n\nContenido:\n"""\n${text}\n"""\n\nDevuelve JSON con estas claves:
{"channel": "sms|whatsapp|correo|llamada|red_social|app|desconocido",
 "claimedEntity": "institución o persona que dice ser el remitente, o null",
 "amounts": ["montos mencionados"],
 "requests": ["lo que pide hacer: pagar, dar datos, dar código, descargar app, depositar, llamar, etc."],
 "urgency": true|false}`,
    },
  ]);
  trace.push({ step: "extraer datos", model: r.model, ms: r.ms, tokens: r.tokens });
  const facts = parseJson<Partial<Extraction>>(r.text);

  return {
    text,
    channel: facts.channel ?? null,
    claimedEntity: facts.claimedEntity ?? null,
    urls: [...new Set(text.match(URL_RE) ?? [])].filter((u) => hostOf(u)?.includes(".")),
    phones: [...new Set(text.match(PHONE_RE) ?? [])],
    amounts: facts.amounts ?? [],
    requests: facts.requests ?? [],
    urgency: Boolean(facts.urgency),
  };
}

/** Step 2: checks that do not depend on the model's judgement. */
function verify(extraction: Extraction): Check[] {
  const checks: Check[] = [];
  for (const url of extraction.urls) {
    const host = hostOf(url);
    if (!host) continue;
    const owner = officialOwner(host);
    checks.push(
      owner
        ? { check: `Enlace ${host}`, result: `Pertenece a un dominio oficial de ${owner}.` }
        : { check: `Enlace ${host}`, result: "No pertenece a ningún dominio oficial conocido de bancos o gobierno." },
    );
  }
  return checks;
}

const CATALOG_PROMPT = PATTERNS.map((p) => `- ${p.id} (${p.name}): ${p.signals}${p.caveat ? ` Ojo: ${p.caveat}` : ""}`).join("\n");

const VERDICT_RULES = `Eres "¿Es fraude?", un asistente que da una segunda opinión a personas en México sobre mensajes, llamadas o apps sospechosas.
Reglas:
- Basa cada señal en una cita textual del contenido. No inventes datos que no estén en el contenido o en las verificaciones.
- Nunca digas que algo es seguro, legítimo o confiable. Si no hay señales, usa risk "sin_senales".
- Las instituciones reales no piden contraseñas, NIP, códigos de verificación ni depósitos a cuentas personales por mensaje o llamada.
- Clasifica solo con los patrones del catálogo; si ninguno aplica, deja patternIds vacío.
- No escribas teléfonos, correos, sitios ni pasos a seguir: la app los agrega desde fuentes oficiales verificadas.
- Escribe en español claro, para cualquier persona, sin tecnicismos. No des asesoría legal ni financiera.

Catálogo de patrones de fraude documentados por autoridades mexicanas:
${CATALOG_PROMPT}`;

/** Step 3: Nemotron Ultra weighs the content and the checks against the catalog. */
async function reason(extraction: Extraction, checks: Check[], trace: Trace): Promise<ModelVerdict> {
  const r = await chat(
    MODELS.reasoning,
    [
      { role: "system", content: VERDICT_RULES },
      {
        role: "user",
        content: `Contenido recibido:\n"""\n${extraction.text}\n"""\n\nDatos extraídos:\n${JSON.stringify({ ...extraction, text: undefined }, null, 2)}\n\nVerificaciones:\n${checks.map((c) => `- ${c.check}: ${c.result}`).join("\n") || "- (ninguna)"}\n\nResponde solo con JSON:
{"risk": "alto|medio|sin_senales",
 "summary": "una o dos frases para la persona",
 "patternIds": ["ids del catálogo que aplican"],
 "signals": [{"signal": "explicación breve", "quote": "cita textual del contenido"}],
 "reportDraft": "si el riesgo es alto o medio, borrador breve de los hechos para presentar una denuncia (qué llegó, cuándo, qué pidieron, qué datos de contacto o pago aparecen), sin datos de contacto de autoridades; si no, null"}`,
      },
    ],
    { maxTokens: 2500 },
  );
  trace.push({ step: "razonar veredicto", model: r.model, ms: r.ms, tokens: r.tokens });
  return parseJson<ModelVerdict>(r.text);
}

const NO_SIGNALS_SUMMARY =
  "No encontré señales claras de fraude. Eso no garantiza que sea seguro: si te piden datos, pagos o algo urgente, confírmalo directamente con la institución por un canal que busques tú.";

/** Step 4: applies the product rules and adds verified steps and contacts from the catalog. */
function compose(v: ModelVerdict): Verdict {
  const risk = (["alto", "medio", "sin_senales"] as const).includes(v.risk) ? v.risk : "medio";
  const summary =
    risk === "sin_senales"
      ? NO_SIGNALS_SUMMARY
      : (v.summary ?? "").replace(/\b(es |parece |luce )?(segur[oa]|leg[ií]tim[oa]|confiable|aut[eé]ntic[oa])\b/gi, "");
  const patterns = PATTERNS.filter((p) => (v.patternIds ?? []).includes(p.id));

  const steps = [...new Set([...patterns.flatMap((p) => p.steps), ...GENERAL_STEPS])];
  const channelIds = [...new Set<ChannelId>([...patterns.flatMap((p) => p.channels), ...GENERAL_CHANNELS])];

  return {
    risk,
    summary,
    patterns: patterns.map((p) => ({ id: p.id, name: p.name, sources: p.sources })),
    signals: (v.signals ?? []).filter((s) => s.quote?.trim()),
    whatToDo: risk === "sin_senales" ? GENERAL_STEPS : steps,
    channels: channelIds.map((id) => CHANNELS[id]),
    reportDraft: risk === "sin_senales" ? null : (v.reportDraft ?? null),
  };
}

export async function analyze(input: AnalysisInput): Promise<Analysis> {
  const trace: Trace = [];
  const extraction = await extract(input, trace);
  const checks = verify(extraction);
  const verdict = compose(await reason(extraction, checks, trace));
  return { extraction, checks, verdict, trace };
}
