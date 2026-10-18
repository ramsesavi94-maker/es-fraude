// Verified reporting routes, urgent steps and evidence for scam victims in Mexico.
// Every target and deadline comes from docs/research/rutas-denuncia.md; routes the
// research could not confirm (for example CERT-MX's inbox) are left out.
import type { Lang } from "./i18n.js";
import type { Extraction, ReportPlan, ReportRoute, RouteChannel, RouteType } from "./types.js";

interface RouteDef {
  type: RouteType;
  channel: RouteChannel;
  target: string;
  source: string;
  state?: string;
  es: { name: string; when: string; script?: string[] };
  en: { name: string; when: string; script?: string[] };
}

const SCRIPT_089_ES = [
  "Qué pasó y cómo te contactaron (llamada, mensaje, app).",
  "Cuándo y dónde ocurrió.",
  "El número o perfil que te contactó.",
  "Cuánto te pidieron y cuánto entregaste, si fue el caso.",
  "Banco y cuenta o CLABE a la que te pidieron depositar.",
];
const SCRIPT_089_EN = [
  "What happened and how they contacted you (call, message, app).",
  "When and where it happened.",
  "The phone number or profile that contacted you.",
  "How much they asked for and how much you paid, if any.",
  "Bank and account or CLABE they asked you to pay into.",
];

const ROUTES: Record<string, RouteDef> = {
  cdmx_denuncia_digital: {
    type: "denuncia_penal", channel: "form", target: "https://denunciadigital.cdmx.gob.mx/", state: "Ciudad de México",
    source: "https://fgjcdmx.gob.mx/nuestros-servicios/en-linea",
    es: { name: "Denuncia Digital CDMX (Fiscalía)", when: "Denuncia penal en línea; incluye fraude. Se entra con Llave CDMX." },
    en: { name: "Mexico City Digital Complaint (Prosecutor's Office)", when: "Online criminal complaint; fraud is included. Sign in with Llave CDMX." },
  },
  edomex_predenuncia: {
    type: "denuncia_penal", channel: "form", target: "https://fgjem.edomex.gob.mx/pre-denuncia-en-linea", state: "Estado de México",
    source: "https://sseguridad.edomex.gob.mx/fraude-extorsion-telefonico",
    es: { name: "Predenuncia en línea Edomex (Fiscalía)", when: "Inicia la denuncia penal en línea; después sigue las indicaciones del Ministerio Público." },
    en: { name: "State of Mexico online pre-complaint (Prosecutor's Office)", when: "Starts the criminal complaint online; then follow the public prosecutor's instructions." },
  },
  nuevo_leon_video: {
    type: "denuncia_penal", channel: "form", target: "https://denuncia.fiscalia-nl.gob.mx:8443/Bienvenida.html", state: "Nuevo León",
    source: "https://infonl.mx/denuncia/",
    es: { name: "Video Denuncia Nuevo León (Fiscalía)", when: "Atención por video con el Ministerio Público. Ten a la mano tu identificación y tu relato." },
    en: { name: "Nuevo León Video Complaint (Prosecutor's Office)", when: "Video session with the public prosecutor. Have your ID and account of events ready." },
  },
  cdmx_cibernetica_correo: {
    type: "orientacion", channel: "email", target: "policia.cibernetica@ssc.cdmx.gob.mx", state: "Ciudad de México",
    source: "https://www.ssc.cdmx.gob.mx/organizacion-policial/subsecretaria-de-inteligencia-e-investigacion-policial/policia-cibernetica",
    es: { name: "Policía Cibernética CDMX", when: "Reporte y apoyo por fraudes digitales. No sustituye la denuncia penal." },
    en: { name: "Mexico City Cyber Police", when: "Report and support for online fraud. Not a substitute for a criminal complaint." },
  },
  jalisco_cibernetica: {
    type: "orientacion", channel: "email", target: "policia.cibernetica@jalisco.gob.mx", state: "Jalisco",
    source: "https://fiscalia.jalisco.gob.mx/policia-cibernetica/orientacion-y-contacto/",
    es: { name: "Policía Cibernética Jalisco", when: "Orientación sobre fraude digital; para la denuncia formal, acude al Ministerio Público." },
    en: { name: "Jalisco Cyber Police", when: "Guidance on online fraud; for a formal complaint, go to the public prosecutor." },
  },
  denuncia_anonima_089: {
    type: "orientacion", channel: "phone", target: "089",
    source: "https://www.gob.mx/sspc/prensa/sesnsp-lanza-campana-de-difusion-del-numero-nacional-de-denuncia-anonima-089?idiom=es",
    es: { name: "Denuncia anónima 089", when: "Anónima; especialmente útil ante extorsión. No sustituye tu denuncia como víctima.", script: SCRIPT_089_ES },
    en: { name: "Anonymous report line 089", when: "Anonymous; especially useful for extortion. Not a substitute for your complaint as a victim.", script: SCRIPT_089_EN },
  },
  guardia_nacional_088: {
    type: "orientacion", channel: "phone", target: "088",
    source: "https://www.gob.mx/gncertmx/articulos/en-caso-de-ser-victima-de-algun-ciberdelito-llama-al-088-atencion-ciudadana",
    es: { name: "Guardia Nacional 088", when: "Te orienta para denunciar ciberdelitos." },
    en: { name: "National Guard 088", when: "Guidance to report cybercrime." },
  },
  condusef_fraudes: {
    type: "orientacion", channel: "form", target: "https://phpapps.condusef.gob.mx/fraudes_financieros/index.php",
    source: "https://www.condusef.gob.mx/?idc=360&p=contenido",
    es: { name: "Portal de Fraudes Financieros (CONDUSEF)", when: "Reporta teléfonos, perfiles, correos y páginas falsas para alertar a otros. No sustituye la denuncia." },
    en: { name: "Financial Fraud Portal (CONDUSEF)", when: "Report fake phone numbers, profiles, emails and sites to warn others. Not a substitute for a complaint." },
  },
  condusef_queja: {
    type: "reclamacion", channel: "form", target: "https://tramites.condusef.gob.mx/QuejaElectronica/registro.php",
    source: "https://www.condusef.gob.mx/index.php?idc=2793&idcat=3&p=contenido",
    es: { name: "Queja electrónica CONDUSEF", when: "Reclamación contra tu banco o financiera si no resolvió tu aclaración. Pide identificación y comprobantes." },
    en: { name: "CONDUSEF online complaint", when: "Claim against your bank or lender if it did not resolve your dispute. Requires ID and receipts." },
  },
  condusef_orientacion: {
    type: "orientacion", channel: "phone", target: "55 5340 0999",
    source: "https://www.condusef.gob.mx/uau/",
    es: { name: "CONDUSEF", when: "Orientación sobre aclaraciones, cargos no reconocidos y robo de identidad." },
    en: { name: "CONDUSEF", when: "Guidance on disputes, unrecognized charges and identity theft." },
  },
  sat_correos_falsos: {
    type: "orientacion", channel: "email", target: "denuncias@sat.gob.mx",
    source: "https://www.sat.gob.mx/minisitio/BuscadorCorreosFalsos/buscador.html",
    es: { name: "SAT: reportar correos falsos", when: "Incluye el remitente, el mensaje y el enlace. No sustituye la denuncia penal." },
    en: { name: "SAT: report fake emails", when: "Include the sender, the message and the link. Not a substitute for a criminal complaint." },
  },
  bienestar_linea: {
    type: "orientacion", channel: "phone", target: "800 639 4264",
    source: "https://www.gob.mx/bienestar/prensa/bienestar-no-entrega-prestamos-ni-creditos-a-cuenta-de-los-programas-del-bienestar?idiom=es",
    es: { name: "Línea de Bienestar", when: "Confirma programas y reporta ofertas falsas a nombre de Bienestar." },
    en: { name: "Bienestar hotline", when: "Confirm programs and report fake offers using the Bienestar name." },
  },
  profeco_concilianet: {
    type: "reclamacion", channel: "form", target: "https://concilianet.profeco.gob.mx/Concilianet/",
    source: "https://concilianet.profeco.gob.mx/Concilianet/requisitos.jsp",
    es: { name: "PROFECO Concilianet", when: "Si compraste a una tienda o proveedor identificable que participa en Concilianet." },
    en: { name: "PROFECO Concilianet", when: "If you bought from an identifiable store or provider that takes part in Concilianet." },
  },
  ciberguia_estatal: {
    type: "orientacion", channel: "in_app", target: "https://www.gob.mx/sspc/documentos/ciberguia?idioma=es",
    source: "https://www.gob.mx/sspc/prensa/sspc-emite-recomendaciones-para-prevenir-fraudes-en-inversiones-y-plataformas-financieras-irregulares",
    es: { name: "Policía cibernética de tu estado", when: "Directorio oficial (Ciberguía de la SSPC) con la unidad de cada estado." },
    en: { name: "Your state's cyber police", when: "Official directory (SSPC Ciberguía) with each state's unit." },
  },
  whatsapp_reportar: {
    type: "reporte_plataforma", channel: "in_app", target: "https://faq.whatsapp.com/1142481766359885/",
    source: "https://faq.whatsapp.com/1142481766359885/",
    es: { name: "Reportar en WhatsApp", when: "En el chat: toca el nombre o número → Reportar. Guarda capturas antes, porque el chat puede borrarse." },
    en: { name: "Report on WhatsApp", when: "In the chat: tap the name or number → Report. Take screenshots first, since the chat may be deleted." },
  },
  facebook_reportar: {
    type: "reporte_plataforma", channel: "in_app", target: "https://www.facebook.com/help/123884166448529/",
    source: "https://www.facebook.com/help/123884166448529/",
    es: { name: "Reportar en Facebook o Marketplace", when: "Desde el perfil o la publicación: menú de opciones → Reportar." },
    en: { name: "Report on Facebook or Marketplace", when: "From the profile or listing: options menu → Report." },
  },
};

/** Routes to show for each scam pattern, most relevant first; general routes are added after. */
const BY_PATTERN: Record<string, string[]> = {
  sat_impersonation: ["sat_correos_falsos"],
  bank_impersonation: ["condusef_orientacion", "condusef_queja", "condusef_fraudes"],
  virtual_kidnapping: ["denuncia_anonima_089"],
  phone_extortion: ["denuncia_anonima_089"],
  loan_app_extortion: ["denuncia_anonima_089", "condusef_fraudes"],
  fake_job_offer: [],
  fake_delivery: [],
  fake_prize: ["condusef_fraudes"],
  family_impersonation: ["whatsapp_reportar"],
  fake_government_aid: ["bienestar_linea"],
  fake_traffic_fine: [],
  marketplace_scam: ["facebook_reportar", "profeco_concilianet"],
};
const STATE_ROUTES = ["cdmx_denuncia_digital", "edomex_predenuncia", "nuevo_leon_video", "cdmx_cibernetica_correo", "jalisco_cibernetica"];
const GENERAL_ROUTES = ["denuncia_anonima_089", "guardia_nacional_088", "ciberguia_estatal"];

interface Urgent {
  es: string;
  en: string;
  source: string;
  /** Only shown for these patterns; all patterns when omitted. */
  only?: string[];
}

const URGENT: Urgent[] = [
  {
    es: "Llama a tu banco al número que viene en tu tarjeta (o usa su app oficial): bloquea la tarjeta y la banca en línea, cambia tu contraseña y pide un folio.",
    en: "Call your bank on the number on your card (or use its official app): block the card and online banking, change your password and ask for a folio number.",
    source: "https://revista.condusef.gob.mx/usuario-inteligente/tu-bolsillo/2023/03/los-fraudes-ciberneticos-se-actualizan/",
  },
  {
    es: "Si hay cargos que no hiciste, presenta la aclaración en el banco. Tienes 90 días naturales para reclamar y el banco debe responder en máximo 45 días. Guarda el folio.",
    en: "If there are charges you did not make, file a dispute with the bank. You have 90 calendar days to claim and the bank must answer within 45 days. Keep the folio number.",
    source: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LTOSF.pdf",
  },
  {
    es: "Si tú transferiste por engaño, díselo así al banco desde el que enviaste: pide que registre el fraude y gestione el apoyo o la devolución con el banco receptor. Ten a la mano la clave de rastreo y el comprobante (CEP) de banxico.org.mx/cep. No hay devolución garantizada.",
    en: "If you transferred money because you were deceived, tell the sending bank exactly that: ask it to log the fraud and request support or a refund from the receiving bank. Have the tracking key and the transfer receipt (CEP) from banxico.org.mx/cep. Refunds are not guaranteed.",
    source: "https://www.banxico.org.mx/servicios/mi-spei_-transferencias-ban.html",
  },
  {
    es: "Si diste el código de WhatsApp: abre WhatsApp, vuelve a registrar tu número y escribe el código que te llegue; eso cierra la sesión del estafador. No reportes tu propia cuenta.",
    en: "If you shared your WhatsApp code: open WhatsApp, register your number again and enter the code you receive; that logs the scammer out. Do not report your own account.",
    source: "https://faq.whatsapp.com/1131652977717250/",
    only: ["family_impersonation", "fake_delivery", "fake_job_offer", "fake_prize"],
  },
  {
    es: "Si diste contraseñas o tu identificación: cambia contraseñas (primero correo y banco), activa la verificación en dos pasos y revisa tu reporte de crédito por créditos que no pediste.",
    en: "If you shared passwords or your ID: change passwords (email and bank first), turn on two-step verification and check your credit report for loans you did not take.",
    source: "https://www.condusef.gob.mx/documentos/com71_reclamaciones-robo-identidad.pdf",
  },
];

const EVIDENCE: { es: string; en: string }[] = [
  { es: "Capturas de los mensajes, correos o del perfil, con fecha y hora visibles", en: "Screenshots of the messages, emails or profile, with date and time visible" },
  { es: "El número de teléfono, perfil o enlace completo que te contactó", en: "The phone number, profile or full link that contacted you" },
  { es: "Comprobantes de pago: monto, fecha, banco, cuenta o CLABE y el CEP si fue transferencia", en: "Payment receipts: amount, date, bank, account or CLABE, and the CEP if it was a transfer" },
  { es: "Folios de tu banco o de la tienda, si ya reportaste", en: "Folio numbers from your bank or the store, if you already reported" },
  { es: "Tu identificación oficial (la piden para la denuncia formal)", en: "Your official ID (required for a formal complaint)" },
];

function route(id: string, lang: Lang): ReportRoute {
  const d = ROUTES[id];
  const text = d[lang];
  return { id, name: text.name, type: d.type, channel: d.channel, target: d.target, when: text.when, source: d.source, state: d.state, script: text.script };
}

/** Builds the reporting plan for a verdict, entirely from verified data. */
export function reportPlan(patternIds: string[], extraction: Extraction, lang: Lang): ReportPlan {
  const ids = [...patternIds.flatMap((p) => BY_PATTERN[p] ?? [])];
  if (extraction.channel === "whatsapp") ids.push("whatsapp_reportar");
  ids.push(...STATE_ROUTES, ...GENERAL_ROUTES);
  if (!patternIds.length) ids.push("condusef_fraudes");

  return {
    urgent: URGENT.filter((u) => !u.only || u.only.some((p) => patternIds.includes(p)) || extraction.channel === "whatsapp").map((u) => ({ text: u[lang], source: u.source })),
    evidence: EVIDENCE.map((e) => e[lang]),
    routes: [...new Set(ids)].map((id) => route(id, lang)),
  };
}
