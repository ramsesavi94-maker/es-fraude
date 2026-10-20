// Tavily search, limited to what the app needs. Only entity names, domains and
// phone numbers are ever sent, never the person's message.

export const OFFICIAL_SEARCH_DOMAINS = ["gob.mx", "sat.gob.mx", "condusef.gob.mx", "ssc.cdmx.gob.mx", "imss.gob.mx", "banxico.org.mx"];

export interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export function tavilyEnabled(): boolean {
  return Boolean(process.env.TAVILY_API_KEY);
}

export async function search(query: string, { includeDomains, maxResults = 3 }: { includeDomains?: string[]; maxResults?: number } = {}): Promise<SearchResult[]> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.TAVILY_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, search_depth: "basic", max_results: maxResults, include_domains: includeDomains }),
    // Searches are optional evidence; a slow one is dropped rather than delaying the answer.
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = (await res.json()) as { results?: SearchResult[] };
  return (json.results ?? []).map(({ title, url, content }) => ({ title, url, content }));
}
