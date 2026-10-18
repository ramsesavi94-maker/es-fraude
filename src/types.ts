import type { Channel } from "./catalog.js";
import type { Lang } from "./i18n.js";

export type InputKind = "message" | "screenshot" | "call" | "app";

export interface AnalysisInput {
  kind: InputKind;
  /** Message text, call description or app name. */
  text?: string;
  /** Screenshot as a data URL (data:image/png;base64,...). */
  image?: string;
  /** Language of the answer; quotes and the complaint draft stay in Spanish. Default "es". */
  lang?: Lang;
}

/** Facts pulled out of the input before any judgement. */
export interface Extraction {
  text: string;
  channel: string | null;
  claimedEntity: string | null;
  entityType: "institucion" | "empresa" | "persona" | "desconocido";
  urls: string[];
  phones: string[];
  amounts: string[];
  requests: string[];
  urgency: boolean;
}

export interface Check {
  check: string;
  result: string;
  /** Pages that back the result, when it came from a search. */
  evidence?: { title: string; url: string; excerpt: string }[];
}

export type Risk = "alto" | "medio" | "sin_senales";

/** What the model is allowed to decide. */
export interface ModelVerdict {
  risk: Risk;
  summary: string;
  patternIds: string[];
  signals: { signal: string; quote: string }[];
  reportDraft: string | null;
}

export type RouteType = "orientacion" | "reclamacion" | "denuncia_penal" | "reporte_plataforma";
export type RouteChannel = "form" | "email" | "phone" | "in_app";

/** One verified place to report, with everything the page needs to act on it. */
export interface ReportRoute {
  id: string;
  name: string;
  type: RouteType;
  channel: RouteChannel;
  /** URL, email address or phone number. */
  target: string;
  /** When this route applies, in one line. */
  when: string;
  source: string;
  /** Only for routes tied to one state (e.g. a state prosecutor's online complaint). */
  state?: string;
  /** For phone routes: what to have ready and say. */
  script?: string[];
}

export interface ReportPlan {
  /** Steps for people who already paid, gave data or a code. */
  urgent: { text: string; source: string }[];
  evidence: string[];
  routes: ReportRoute[];
}

/** What the person sees: model judgement plus verified steps and contacts from the catalog. */
export interface Verdict {
  risk: Risk;
  summary: string;
  patterns: { id: string; name: string; sources: string[] }[];
  signals: { signal: string; quote: string }[];
  whatToDo: string[];
  channels: Channel[];
  reportDraft: string | null;
  /** Step-by-step reporting help; null when there are no warning signs. */
  report: ReportPlan | null;
}

export interface Analysis {
  extraction: Extraction;
  checks: Check[];
  verdict: Verdict;
  trace: { step: string; model?: string; ms: number; tokens?: number }[];
}
