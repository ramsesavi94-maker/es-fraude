// Checks a link or email address without ever opening it: the real hostname,
// disguises (punycode, IP addresses, shorteners), free email accounts posing as
// institutions, and how old the domain is according to public RDAP records.
import { brandMatch, officialOwner, registrableDomain } from "./official.js";

export const EMAIL_RE = /(?:"?([^"<>\n@]{2,60}?)"?\s*<\s*)?([a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,})\s*>?/gi;

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "cutt.ly", "is.gd", "ow.ly", "rebrand.ly", "shorturl.at", "tiny.cc", "rb.gy",
  "goo.su", "acortar.link", "bit.do", "t.ly", "s.id", "v.gd", "short.io", "lnkd.in", "trib.al", "qrco.de",
]);

/** Cheap TLDs common in phishing campaigns; a weak signal on its own. */
const RISKY_TLDS = new Set(["xyz", "top", "click", "buzz", "icu", "cyou", "vip", "live", "online", "site", "info", "shop", "lat", "rest", "monster", "sbs", "cfd"]);

const FREE_EMAIL = new Set([
  "gmail.com", "hotmail.com", "outlook.com", "live.com", "live.com.mx", "yahoo.com", "yahoo.com.mx", "icloud.com",
  "proton.me", "protonmail.com", "aol.com", "gmx.com", "hotmail.es", "outlook.es",
]);

export interface UrlFacts {
  host: string;
  registrable: string;
  isIp: boolean;
  /** Internationalized host (xn--) or non-ASCII letters that can imitate normal ones. */
  disguised: boolean;
  shortener: boolean;
  riskyTld: string | null;
  insecure: boolean;
}

export interface EmailFacts {
  address: string;
  domain: string;
  displayName: string | null;
  freeProvider: boolean;
  /** The display name claims an institution that the address does not belong to. */
  displayMismatch: boolean;
}

export function urlFacts(raw: string): UrlFacts | null {
  let url: URL;
  try {
    url = new URL(/^[a-z]+:\/\//i.test(raw) ? raw : `http://${raw}`);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  if (!host.includes(".")) return null;
  const tld = host.split(".").at(-1)!;
  return {
    host,
    registrable: registrableDomain(host),
    isIp: /^\d{1,3}(\.\d{1,3}){3}$/.test(host),
    // URL() turns non-ASCII hostnames into punycode, so this also catches look-alike letters.
    disguised: host.split(".").some((label) => label.startsWith("xn--")),
    shortener: SHORTENERS.has(host),
    riskyTld: RISKY_TLDS.has(tld) ? tld : null,
    insecure: /^http:\/\//i.test(raw),
  };
}

export function emailFacts(address: string, displayName: string | null, claimedEntity: string | null): EmailFacts {
  const domain = address.split("@")[1].toLowerCase();
  const freeProvider = FREE_EMAIL.has(domain);
  const claimed = displayName?.trim() || null;
  const displayMismatch = Boolean(
    claimed && !freeProvider && !officialOwner(domain) && brandMatch(domain, claimed) !== "matches" && looksInstitutional(claimed, claimedEntity),
  );
  return { address: address.toLowerCase(), domain, displayName: claimed, freeProvider, displayMismatch };
}

/** A display name that names a bank, agency or company rather than a person. */
function looksInstitutional(name: string, claimedEntity: string | null): boolean {
  const n = name.toLowerCase();
  if (claimedEntity && n.includes(claimedEntity.toLowerCase())) return true;
  return /\b(sat|imss|condusef|banxico|bbva|banorte|santander|banamex|hsbc|scotiabank|bienestar|cfe|telcel|dhl|fedex|estafeta|mercado|amazon|banco|bank|soporte|seguridad|notificaci|aviso|gobierno)/i.test(n);
}

/** Splits emails out of a text so their domains are not also read as links. */
export function extractEmails(text: string): { emails: { address: string; displayName: string | null }[]; rest: string } {
  const emails: { address: string; displayName: string | null }[] = [];
  const rest = text.replace(EMAIL_RE, (_match, display: string | undefined, address: string) => {
    emails.push({ address, displayName: display?.trim() || null });
    return " ";
  });
  return { emails: [...new Map(emails.map((e) => [e.address.toLowerCase(), e])).values()], rest };
}

/**
 * Days since the domain was registered, from public RDAP data (rdap.org).
 * Returns null when the registry has no public RDAP (for example .mx) or does not answer in time.
 */
export async function domainAgeDays(domain: string, timeoutMs = 4000): Promise<{ days: number; registered: string } | null> {
  try {
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      // rdap.org rejects requests without a User-Agent.
      headers: { Accept: "application/rdap+json", "User-Agent": "es-fraude/1.0 (+https://github.com/ramsesavi94-maker/es-fraude)" },
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { events?: { eventAction: string; eventDate: string }[] };
    const registered = json.events?.find((e) => e.eventAction === "registration")?.eventDate;
    if (!registered) return null;
    const days = Math.floor((Date.now() - Date.parse(registered)) / 86_400_000);
    return Number.isFinite(days) ? { days, registered: registered.slice(0, 10) } : null;
  } catch {
    return null;
  }
}
