import { OFFICIAL_DOMAINS } from "./catalog.js";

export function hostOf(url: string): string | null {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

const SECOND_LEVEL = new Set(["com", "gob", "org", "net", "edu"]);

/** The part of a host a company actually registers: `app.cfe.mx` → `cfe.mx`, `www.bbva.com.mx` → `bbva.com.mx`. */
export function registrableDomain(host: string): string {
  const parts = host.split(".");
  const take = parts.length >= 3 && SECOND_LEVEL.has(parts.at(-2)!) && parts.at(-1)!.length === 2 ? 3 : 2;
  return parts.slice(-take).join(".");
}

const strip = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const NOISE = new Set(["mexico", "sa", "de", "cv", "the", "grupo", "banco", "bank", "servicio", "s.a."]);

export type BrandMatch = "matches" | "imitates" | "unrelated";

/**
 * Compares a link with the company the message claims to come from. A domain
 * whose name is exactly the brand (`estafeta.com` for Estafeta) "matches"; one
 * that contains the brand plus other words (`bbva-mx-seguridad.com`) "imitates".
 */
export function brandMatch(host: string, claimedEntity: string | null): BrandMatch {
  if (!claimedEntity) return "unrelated";
  const label = strip(registrableDomain(host).split(".")[0]);
  const tokens = strip(claimedEntity).split(/[^a-z0-9]+/).filter((t) => t.length >= 3 && !NOISE.has(t));
  const joined = tokens.join("");
  if (tokens.includes(label) || label === joined) return "matches";
  if (tokens.some((t) => label.includes(t)) || host.includes(`${joined}.`)) return "imitates";
  return "unrelated";
}

/**
 * Finds which official entity owns a host. Compares the real hostname, so
 * `sat.gob.mx.example.com` belongs to `example.com`, not to the SAT.
 */
export function officialOwner(host: string): string | null {
  for (const [entity, domains] of Object.entries(OFFICIAL_DOMAINS)) {
    if (domains.some((d) => host === d || host.endsWith(`.${d}`))) return entity;
  }
  return null;
}
