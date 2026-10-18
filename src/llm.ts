// Minimal client for Nebius Token Factory (OpenAI-compatible chat completions).

export const MODELS = {
  reasoning: process.env.MODEL_REASONING ?? "nvidia/Nemotron-3-Ultra-550b-a55b",
  fast: process.env.MODEL_FAST ?? "nvidia/NVIDIA-Nemotron-3-Nano-30B-A3B",
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

export async function chat(model: string, messages: ChatMessage[], { maxTokens = 1500, temperature = 0.2 } = {}): Promise<ChatResult> {
  const base = process.env.NEBIUS_BASE_URL ?? "https://api.tokenfactory.nebius.com/v1";
  const started = Date.now();
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.NEBIUS_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature }),
  });
  if (!res.ok) throw new Error(`Token Factory ${res.status} (${model}): ${(await res.text()).slice(0, 300)}`);

  const json = (await res.json()) as {
    choices: { message: { content: string | null } }[];
    usage?: { total_tokens?: number };
  };
  return { text: json.choices[0]?.message.content?.trim() ?? "", model, ms: Date.now() - started, tokens: json.usage?.total_tokens ?? 0 };
}

/** Parses the first JSON object in a model reply, tolerating code fences and surrounding prose. */
export function parseJson<T>(text: string): T {
  const cleaned = text.replace(/<think>[\s\S]*?<\/think>/g, "");
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error(`No JSON object in model reply: ${text.slice(0, 200)}`);
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
}
