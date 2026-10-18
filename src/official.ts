// Official domains used to compare links in a message. Provisional list; it is
// replaced by the verified catalog in knowledge/ once reviewed.

export const OFFICIAL_DOMAINS: Record<string, string[]> = {
  SAT: ["sat.gob.mx"],
  IMSS: ["imss.gob.mx"],
  CONDUSEF: ["condusef.gob.mx"],
  Banxico: ["banxico.org.mx"],
  "Gobierno de México": ["gob.mx"],
  BBVA: ["bbva.mx"],
  Banorte: ["banorte.com"],
  Santander: ["santander.com.mx"],
  Banamex: ["banamex.com"],
  HSBC: ["hsbc.com.mx"],
  Scotiabank: ["scotiabank.com.mx"],
};

export const DEFAULT_CHANNEL = {
  name: "CONDUSEF",
  contact: "55 5340 0999",
  url: "https://www.condusef.gob.mx",
};

export function hostOf(url: string): string | null {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Finds which official entity, if any, owns a host (exact domain or subdomain). */
export function officialOwner(host: string): string | null {
  for (const [entity, domains] of Object.entries(OFFICIAL_DOMAINS)) {
    if (domains.some((d) => host === d || host.endsWith(`.${d}`))) return entity;
  }
  return null;
}
