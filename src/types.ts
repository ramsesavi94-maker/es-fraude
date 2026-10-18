import type { Channel } from "./catalog.js";

export type InputKind = "message" | "screenshot" | "call" | "app";

export interface AnalysisInput {
  kind: InputKind;
  /** Message text, call description or app name. */
  text?: string;
  /** Screenshot as a data URL (data:image/png;base64,...). */
  image?: string;
}

/** Facts pulled out of the input before any judgement. */
export interface Extraction {
  text: string;
  channel: string | null;
  claimedEntity: string | null;
  urls: string[];
  phones: string[];
  amounts: string[];
  requests: string[];
  urgency: boolean;
}

export interface Check {
  check: string;
  result: string;
  sourceUrl?: string;
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

/** What the person sees: model judgement plus verified steps and contacts from the catalog. */
export interface Verdict {
  risk: Risk;
  summary: string;
  patterns: { id: string; name: string; sources: string[] }[];
  signals: { signal: string; quote: string }[];
  whatToDo: string[];
  channels: Channel[];
  reportDraft: string | null;
}

export interface Analysis {
  extraction: Extraction;
  checks: Check[];
  verdict: Verdict;
  trace: { step: string; model?: string; ms: number; tokens?: number }[];
}
