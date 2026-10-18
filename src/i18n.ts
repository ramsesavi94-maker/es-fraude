// Text the app writes itself, in Spanish (default) and English (for judges and
// visitors). Quotes from the message and the complaint draft stay in Spanish:
// they are evidence and a document for Mexican authorities.

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

export interface Messages {
  link: (host: string) => string;
  officialDomain: (owner: string) => string;
  imitates: (entity: string | null, real: string) => string;
  brandMatches: (entity: string | null) => string;
  unrelatedDomain: (real: string) => string;
  lenderCheck: (entity: string) => string;
  lenderFound: (n: number) => string;
  lenderNotFound: string;
  lenderReports: (entity: string) => string;
  lenderReportsFound: (n: number) => string;
  lenderReportsNotFound: string;
  entityAlerts: (entity: string) => string;
  entityAlertsFound: (n: number, entity: string) => string;
  entityAlertsNotFound: (entity: string) => string;
  domainReports: (host: string) => string;
  domainReportsFound: (n: number) => string;
  domainReportsNotFound: string;
  phoneCheck: (phone: string) => string;
  phoneFound: string;
  phoneNotFound: string;
  noSignalsSummary: string;
  generalSteps: string[];
  unverifiedAppSummary: string;
  unverifiedAppSteps: string[];
  /** Instruction appended to the verdict prompt. */
  outputLanguage: string;
}

export const MESSAGES: Record<Lang, Messages> = {
  es: {
    link: (h) => `Enlace ${h}`,
    officialDomain: (o) => `Pertenece a un dominio oficial de ${o}.`,
    imitates: (e, r) => `Imita el nombre de ${e}, pero no es su dominio: el dominio real es ${r}. Es una técnica común de fraude.`,
    brandMatches: (e) => `El dominio coincide con el nombre de ${e}. No está en nuestra lista verificada; aun así, lo más seguro es entrar tú mismo escribiendo la dirección.`,
    unrelatedDomain: (r) => `El dominio (${r}) no corresponde a la institución que firma el mensaje ni a un banco o dependencia de gobierno verificados.`,
    lenderCheck: (e) => `Registro y alertas de "${e}"`,
    lenderFound: (n) => `Encontré ${n} páginas oficiales que mencionan esta app o empresa; revisa qué dicen. Aparecer en un sitio oficial no la hace confiable.`,
    lenderNotFound: "No encontré menciones en sitios oficiales. Busca su razón social en SIPRES de CONDUSEF antes de pedir un préstamo.",
    lenderReports: (e) => `Reportes públicos sobre "${e}"`,
    lenderReportsFound: (n) => `Encontré ${n} reportes o noticias públicas que vinculan esta app con quejas o extorsión.`,
    lenderReportsNotFound: "No encontré reportes públicos de extorsión con este nombre. Eso no la hace confiable.",
    entityAlerts: (e) => `Alertas oficiales sobre suplantación de "${e}"`,
    entityAlertsFound: (n, e) => `Hay ${n} avisos oficiales sobre fraudes que mencionan a ${e}.`,
    entityAlertsNotFound: (e) => `No encontré avisos oficiales recientes sobre suplantación de ${e}.`,
    domainReports: (h) => `Reportes del dominio ${h}`,
    domainReportsFound: (n) => `Encontré ${n} reportes públicos que mencionan este dominio.`,
    domainReportsNotFound: "No encontré reportes públicos de este dominio. Los dominios de fraude suelen ser nuevos, así que eso no lo hace confiable.",
    phoneCheck: (p) => `Número ${p} en listas oficiales`,
    phoneFound: "Este número aparece en una fuente oficial relacionada con fraudes.",
    phoneNotFound: "Este número no aparece en las listas oficiales que revisé. Eso no lo hace confiable.",
    noSignalsSummary:
      "No encontré señales claras de fraude. Eso no garantiza que sea seguro: si te piden datos, pagos o algo urgente, confírmalo directamente con la institución por un canal que busques tú.",
    generalSteps: ["Si tienes dudas, confirma directamente con la institución por un número o sitio que busques tú, no por los datos del mensaje."],
    unverifiedAppSummary:
      "No pude verificar que esta app o empresa esté registrada como financiera. Antes de darle tus datos o aceptar un préstamo, busca su razón social en SIPRES de CONDUSEF; las apps de préstamo sin registro son la vía más común de los montadeudas.",
    unverifiedAppSteps: [
      "Busca la razón social de la empresa (no solo el nombre de la app) en SIPRES de CONDUSEF.",
      "No le des acceso a tus contactos, fotos ni galería.",
      "Si ya te están amenazando, guarda capturas y repórtalo al 089.",
    ],
    outputLanguage: "Escribe summary y cada signal en español claro, para cualquier persona, sin tecnicismos.",
  },
  en: {
    link: (h) => `Link ${h}`,
    officialDomain: (o) => `Belongs to an official ${o} domain.`,
    imitates: (e, r) => `Imitates the name of ${e} but is not its domain: the real domain is ${r}. This is a common scam technique.`,
    brandMatches: (e) => `The domain matches the name of ${e}. It is not on our verified list; to be safe, type the address yourself.`,
    unrelatedDomain: (r) => `The domain (${r}) does not belong to the sender named in the message, nor to a verified bank or government agency.`,
    lenderCheck: (e) => `Registration and alerts for "${e}"`,
    lenderFound: (n) => `Found ${n} official pages that mention this app or company; check what they say. Being mentioned on an official site does not make it trustworthy.`,
    lenderNotFound: "No mentions on official sites. Look up its legal name in CONDUSEF's SIPRES registry before borrowing.",
    lenderReports: (e) => `Public reports about "${e}"`,
    lenderReportsFound: (n) => `Found ${n} public reports or news items linking this app to complaints or extortion.`,
    lenderReportsNotFound: "No public extortion reports under this name. That does not make it trustworthy.",
    entityAlerts: (e) => `Official impersonation alerts about "${e}"`,
    entityAlertsFound: (n, e) => `There are ${n} official alerts about scams that mention ${e}.`,
    entityAlertsNotFound: (e) => `No recent official alerts about impersonation of ${e}.`,
    domainReports: (h) => `Reports about the domain ${h}`,
    domainReportsFound: (n) => `Found ${n} public reports that mention this domain.`,
    domainReportsNotFound: "No public reports about this domain. Scam domains are usually new, so this does not make it trustworthy.",
    phoneCheck: (p) => `Number ${p} in official lists`,
    phoneFound: "This number appears in an official source about scams.",
    phoneNotFound: "This number is not in the official lists we checked. That does not make it trustworthy.",
    noSignalsSummary:
      "No clear signs of fraud were found. That is not a guarantee: if you are asked for data, payments or something urgent, confirm directly with the institution through a channel you look up yourself.",
    generalSteps: ["If in doubt, confirm directly with the institution through a number or website you look up yourself, not the details in the message."],
    unverifiedAppSummary:
      "We could not verify that this app or company is registered as a lender. Before sharing your data or taking a loan, look up its legal name in CONDUSEF's SIPRES registry; unregistered loan apps are the most common route for loan-shark extortion (montadeudas).",
    unverifiedAppSteps: [
      "Look up the company's legal name (not just the app name) in CONDUSEF's SIPRES registry.",
      "Do not give it access to your contacts, photos or gallery.",
      "If you are already being threatened, keep screenshots and report it to 089.",
    ],
    outputLanguage:
      "Write summary and every signal in clear English for a non-expert reader. Keep each quote verbatim in its original language. Write reportDraft in Spanish, because it is filed with Mexican authorities.",
  },
};

/** English names, steps and channel descriptions for the verified catalog. */
export const PATTERNS_EN: Record<string, { name: string; steps: string[] }> = {
  sat_impersonation: {
    name: "Fake SAT (tax authority)",
    steps: ["Do not open the link or reply.", "Go to sat.gob.mx yourself and check your Buzón Tributario (tax mailbox).", "Look up the sender in SAT's fake email finder and report it to denuncias@sat.gob.mx."],
  },
  bank_impersonation: {
    name: "Fake bank / unrecognized charge",
    steps: ["Hang up or do not reply; no bank asks for passwords, PINs or codes.", "Open your bank's app yourself or call the number on your card.", "Report any charge you do not recognize to your bank and get a folio number; if unresolved, go to CONDUSEF."],
  },
  virtual_kidnapping: {
    name: "Virtual kidnapping",
    steps: ["Hang up and try to reach your relative another way (call, another person, their work or school).", "Do not deposit money or follow instructions.", "Report it to 089; if there is immediate danger or you cannot reach your relative, call 911."],
  },
  phone_extortion: {
    name: "Phone extortion",
    steps: ["Hang up without giving information.", "Keep the number, messages and payment details they asked for.", "Check the situation yourself and report it to 089; if there is an immediate threat, call 911."],
  },
  loan_app_extortion: {
    name: "Loan-app extortion (montadeudas)",
    steps: ["Look up the company's legal name in CONDUSEF's SIPRES registry.", "Keep screenshots of the threats and charges.", "Report the extortion to 089, ask the cyber police for guidance and file a complaint with the prosecutor's office."],
  },
  fake_job_offer: {
    name: "Fake job offer",
    steps: ["Confirm the vacancy with the company through a contact you find yourself.", "Do not transfer money to get the job or unlock earnings.", "Keep the conversations and ask the cyber police for guidance."],
  },
  fake_delivery: {
    name: "Fake parcel or delivery",
    steps: ["Track the parcel on the courier's website, opened by you.", "Do not share codes or pay from the message.", "If you shared bank details, call your bank right away."],
  },
  fake_prize: {
    name: "Fake prize or raffle",
    steps: ["Do not share data or open the link.", "Confirm with the organizer through a channel you look up yourself."],
  },
  family_impersonation: {
    name: "Relative impersonated on WhatsApp",
    steps: ["Call the number you already had for that person or check with someone else.", "Do not transfer money based only on a photo and name.", "Report the account on WhatsApp and keep the evidence."],
  },
  fake_government_aid: {
    name: "Fake social program or government aid",
    steps: ["Never pay to sign up for a program.", "Confirm on gob.mx/bienestar or the Bienestar hotline."],
  },
  fake_traffic_fine: {
    name: "Fake traffic or camera fine",
    steps: ["Do not pay from the link.", "Look up the fine on your state or city's official portal, typing the address yourself."],
  },
  marketplace_scam: {
    name: "Fake marketplace sale",
    steps: ["Verify the seller and the product before paying.", "Keep the listing, conversations and receipts."],
  },
};

/** English overrides for channel name, use and non-numeric contact text. */
export const CHANNELS_EN: Record<string, { name?: string; use: string; contact?: string }> = {
  "089": { name: "Anonymous report line", use: "Report extortion and crimes to investigate" },
  "911": { name: "Emergencies", use: "Immediate danger" },
  "088": { name: "National Guard", use: "Guidance to report cybercrime" },
  condusef: { use: "Guidance on financial services (consumer protection agency)" },
  condusef_queja: { name: "CONDUSEF online complaint", use: "File a complaint against a financial institution", contact: "Online" },
  sipres: { name: "CONDUSEF SIPRES registry", use: "Check whether a lender is registered", contact: "Online lookup by name or legal name" },
  ciberpolicia_cdmx: { name: "Mexico City Cyber Police", use: "Guidance and reports of online fraud" },
  ciberpolicias_estatales: { name: "State cyber police", use: "Find the cyber police unit in your state", contact: "Online directory" },
  sat: { use: "Confirm tax procedures and report fake emails" },
  sat_correos_falsos: { name: "SAT fake-email finder", use: "Check whether a sender was already reported", contact: "Online lookup" },
  profeco: { use: "Consumer complaints" },
  bienestar: { name: "Bienestar hotline", use: "Confirm social programs and pensions" },
  juegos_sorteos: { name: "Games and Raffles Office (SEGOB)", use: "Check raffle permits", contact: "Online lookup" },
};
