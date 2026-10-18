import { OFFICIAL_DOMAINS } from "./catalog.js";

export function hostOf(url: string): string | null {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
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
