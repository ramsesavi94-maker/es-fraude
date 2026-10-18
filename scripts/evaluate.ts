// Runs the evaluation set and reports how well the app separates scams from legitimate messages.
// Usage: npx tsx --env-file=.env scripts/evaluate.ts [eval/cases.json] [--only f01,l03]
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";
import { analyze } from "../src/analyze.js";
import type { InputKind, Risk } from "../src/types.js";

interface Case {
  id: string;
  kind: InputKind;
  text: string;
  expected: "fraude" | "legitimo";
  expectedPatterns: string[];
  source: string;
  note: string;
}

interface Outcome {
  id: string;
  expected: Case["expected"];
  risk: Risk | "error";
  correct: boolean;
  patternHit: boolean | null;
  predictedPatterns: string[];
  ms: number;
  error?: string;
}

const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const only = onlyIdx !== -1 ? new Set(args.splice(onlyIdx, 2)[1].split(",")) : null;
const file = args[0] ?? "eval/cases.json";
const cases = (JSON.parse(await readFile(file, "utf8")) as Case[]).filter((c) => !only || only.has(c.id));
const CONCURRENCY = 3;

async function runCase(c: Case): Promise<Outcome> {
  const started = Date.now();
  try {
    const { verdict } = await analyze({ kind: c.kind, text: c.text });
    const flagged = verdict.risk !== "sin_senales";
    const predictedPatterns = verdict.patterns.map((p) => p.id);
    return {
      id: c.id,
      expected: c.expected,
      risk: verdict.risk,
      correct: c.expected === "fraude" ? flagged : !flagged,
      // Only scored when the case names an expected pattern; out-of-catalog scams have none.
      patternHit: c.expected === "fraude" && c.expectedPatterns.length ? c.expectedPatterns.some((p) => predictedPatterns.includes(p)) : null,
      predictedPatterns,
      ms: Date.now() - started,
    };
  } catch (err) {
    return { id: c.id, expected: c.expected, risk: "error", correct: false, patternHit: null, predictedPatterns: [], ms: Date.now() - started, error: (err as Error).message };
  }
}

const outcomes: Outcome[] = [];
const queue = [...cases];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let c = queue.shift(); c; c = queue.shift()) {
      const o = await runCase(c);
      outcomes.push(o);
      console.log(`${o.correct ? "✓" : "✗"} ${o.id} esperado=${o.expected} riesgo=${o.risk} patrones=${o.predictedPatterns.join(",") || "-"} ${o.ms}ms${o.error ? ` ERROR ${o.error}` : ""}`);
    }
  }),
);

outcomes.sort((a, b) => a.id.localeCompare(b.id));
const frauds = outcomes.filter((o) => o.expected === "fraude");
const legit = outcomes.filter((o) => o.expected === "legitimo");
const pct = (n: number, d: number) => (d ? `${((100 * n) / d).toFixed(1)}%` : "n/a");
const ms = outcomes.map((o) => o.ms).sort((a, b) => a - b);

const summary = {
  cases: outcomes.length,
  fraudDetected: `${frauds.filter((o) => o.correct).length}/${frauds.length} (${pct(frauds.filter((o) => o.correct).length, frauds.length)})`,
  patternMatch: (() => {
    const scored = frauds.filter((o) => o.patternHit !== null);
    const hits = scored.filter((o) => o.patternHit).length;
    return `${hits}/${scored.length} (${pct(hits, scored.length)}) of scams with a catalog pattern`;
  })(),
  legitimateWithoutFalseAlarm: `${legit.filter((o) => o.correct).length}/${legit.length} (${pct(legit.filter((o) => o.correct).length, legit.length)})`,
  falseAlarms: legit.filter((o) => !o.correct).map((o) => `${o.id}:${o.risk}`),
  missedFrauds: frauds.filter((o) => !o.correct).map((o) => o.id),
  wrongPattern: frauds.filter((o) => o.correct && o.patternHit === false).map((o) => `${o.id}:${o.predictedPatterns.join("+") || "-"}`),
  errors: outcomes.filter((o) => o.error).map((o) => o.id),
  latencyMs: { median: ms[Math.floor(ms.length / 2)], p90: ms[Math.floor(ms.length * 0.9)] },
};

console.log("\n" + JSON.stringify(summary, null, 2));
if (!only) {
  const name = basename(file, ".json") === "cases" ? "results.json" : `results-${basename(file, ".json")}.json`;
  await writeFile(`eval/${name}`, JSON.stringify({ date: new Date().toISOString(), summary, outcomes }, null, 2));
}
