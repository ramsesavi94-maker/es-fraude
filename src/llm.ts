// Minimal client for Nebius Token Factory (OpenAI-compatible chat completions).

export const MODELS = {
  reasoning: process.env.MODEL_REASONING ?? "nvidia/Nemotron-3-Ultra-550b-a55b",
  fast: process.env.MODEL_FAST ?? "nvidia/nemotron-3-super-120b-a12b",
  vision: process.env.MODEL_VISION ?? "nvidia/Nemotron-3.5-Super-VL",
};

type ContentPart = { type: "text"; text: string } | { type: "image_url"; image_url: { url: string } };

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | ContentPart[];
}

export interface ChatResult {
  text: string;
  model: string;
  ms: number;
  tokens: number;
}

export interface ChatOptions {
  maxTokens?: number;
  temperature?: number;
  /** Constrains output to a JSON object. Reliable on Ultra; Super produced malformed output with it in testing. */
  jsonMode?: boolean;
}

// Temperature 0: the same message should get the same verdict every time.
export async function chat(model: string, messages: ChatMessage[], { maxTokens = 1500, temperature = 0, jsonMode = false }: ChatOptions = {}): Promise<ChatResult> {
  const base = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
  const started = Date.now();
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature, ...(jsonMode && { response_format: { type: "json_object" } }) }),
    // A stuck call must not leave the person waiting forever.
    signal: AbortSignal.timeout(45_000),
  });
  if (!res.ok) throw new Error(`Token Factory ${res.status} (${model}): ${(await res.text()).slice(0, 300)}`);

  const json = (await res.json()) as {
    choices: { message: { content: string | null } }[];
    usage?: { total_tokens?: number };
  };
  return { text: json.choices[0]?.message.content?.trim() ?? "", model, ms: Date.now() - started, tokens: json.usage?.total_tokens ?? 0 };
}

/**
 * Calls a model and parses its JSON reply, retrying once if the reply is not
 * valid JSON. Both attempts are reported so the trace shows the retry.
 */
export async function chatJson<T>(model: string, messages: ChatMessage[], options: ChatOptions = {}): Promise<{ data: T; calls: ChatResult[] }> {
  const calls: ChatResult[] = [];
  for (let attempt = 1; ; attempt++) {
    const r = await chat(model, messages, options);
    calls.push(r);
    try {
      return { data: parseJson<T>(r.text), calls };
    } catch (err) {
      if (attempt >= 2) throw err;
    }
  }
}

/** Parses the first JSON object in a model reply, tolerating code fences and surrounding prose. */
export function parseJson<T>(text: string): T {
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error(`No JSON object in model reply: ${text.slice(0, 200)}`);
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
}
