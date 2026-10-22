# Devpost: remaining fields

## Track

Best Apps and Agents

## Feedback on Nebius Token Factory, AI Cloud and NVIDIA tools

What worked well
- The OpenAI-compatible API made integration trivial: one fetch call, no SDK, and switching models per step was a one-line change. That let us compare Nemotron models on real requests and pick one per job.
- Nemotron 3 Ultra in JSON mode (response_format: json_object) was reliable for structured verdicts, including messages with unusual characters such as «guillemets» that had broken our parsing before.
- Nemotron 3.5 Super VL read phone screenshots (sender, amounts, links, phone numbers) accurately in about 2.5 s.
- Latency was good for an interactive app: median 6–8 s for a full analysis with two or three model calls plus web searches.

What could be better
- JSON mode behaves differently across models: with Nemotron 3 Super, response_format json_object returned malformed output, while the same request without it was fine. A per-model note on JSON mode and structured-output support would save time.
- Model IDs are inconsistent in casing and format (nvidia/Nemotron-3-Ultra-550b-a55b, nvidia/nemotron-3-super-120b-a12b, nvidia/Nemotron-3_5-Lightning), which caused one configuration error for us (a missing letter in a deploy variable surfaced only as a 404). Consistent IDs, or a clearer 404 message listing close matches, would help.
- In our tests Nemotron 3 Super was both faster (~2 s vs ~3.6 s) and more accurate than Nano for short extraction, which was counterintuitive. Published latency/quality guidance per model and task type would help builders choose.
- Under concurrency (3 parallel requests) some calls took 35–50 s instead of 6–9 s. Documented rate limits or queueing behavior would help size a public demo.
- Most of our Ultra prompt is a fixed catalog (~2.5k tokens) repeated on every call. Prompt caching for repeated system prompts would cut cost and latency for grounded apps like ours.
- Usage visibility: a per-model breakdown of tokens and cost by day in the dashboard would make it easier to keep a free public demo within credits.

## If the project existed before the Submission Period

Not applicable: the project was created from scratch during the Submission Period (first commit on October 18, 2026).

## Public code repository

https://github.com/ramsesavi94-maker/es-fraude

## Working demo

https://es-fraude-seven.vercel.app/?lang=en

## Which model(s) did you use, and why did you choose that size/variant?

We use three NVIDIA Nemotron models on Nebius Token Factory, one per job:

- Nemotron 3 Ultra (nvidia/Nemotron-3-Ultra-550b-a55b) for the verdict. It reasons over the message, the search evidence and a catalog of 12 scam patterns documented by Mexican authorities, and must decide between "high risk", "warning signs" and "no clear signs" without false alarms. That is the hardest step, so we use the largest reasoning model there, in JSON mode at temperature 0 for stable, structured verdicts.
- Nemotron 3 Super (nvidia/nemotron-3-super-120b-a12b) for fact extraction: who the message claims to be, links, phone numbers, amounts and what it asks for. We first tried Nemotron 3 Nano (30B-A3B) because it is smaller, but in our tests Super was faster (about 2 s vs 3.6 s) and more accurate: it identified "SAT" as the sender where Nano returned "pending refund". So we chose Super for the fast, everyday call.
- Nemotron 3.5 Super VL (nvidia/Nemotron-3.5-Super-VL) to read phone screenshots, because most victims only have a screenshot. It transcribes sender, amounts, links and phone numbers in about 2.5 s.

Using the right size per step keeps a full analysis at about 6–9 seconds and about US$0.017, while Ultra is spent only where reasoning matters.

## How would you rate Nemotron's output quality for your use case?

8/10.

What worked well:
- Reasoning over evidence: Nemotron 3 Ultra combined the message, our deterministic checks and official search results into consistent verdicts. On our unseen test sets it caught 25/25 scams and 18/18 malicious links with no false alarms.
- Spanish and Mexican context: it understood informal Mexican SMS and WhatsApp style, misspellings, and local institutions (SAT, CONDUSEF, Bienestar, SPEI) without extra training.
- Multilingual output: it reads Spanish messages and explains them in English for the English version, keeping quotes verbatim.
- Instruction following: Ultra in JSON mode reliably returned our schema, and Nemotron 3.5 Super VL read phone screenshots accurately.

What fell short:
- Factual hallucination of contact details: early on, Ultra gave a SAT phone number with no source and recommended a spam-reporting short code that does not exist in Mexico. For a fraud tool this is critical, so phone numbers, steps and routes now come only from a verified catalog.
- Language drift: with English output requested, it sometimes wrote explanations in Spanish when the message was in Spanish, until we repeated the language instruction at the end of the prompt.
- Quote discipline: it sometimes quoted our own verification text as if it were the message, so we filter those quotes in code.
- It was initially over-cautious with legitimate bank alerts, which we fixed with explicit criteria for normal notifications.

## Did you fine-tune, prompt-engineer, or use Nemotron out of the box?

No fine-tuning. We used prompt engineering plus grounding and code-level guardrails:

1. Grounded system prompt: a catalog of 12 scam patterns written from official Mexican alerts (CONDUSEF, SAT, SSPC, state cyber police), with explicit criteria for what normal, legitimate notifications look like.
2. Evidence first: deterministic checks (real hostname vs official domains, lookalike detection, domain age via RDAP) and Tavily searches restricted to official Mexican sites are computed before the model runs and passed in as evidence.
3. Constrained output: Ultra returns only a risk level, a summary, catalog pattern IDs and quoted signals, in JSON mode at temperature 0. It is told not to write phone numbers, emails or steps.
4. Guardrails in code: the app adds verified steps and contacts from the catalog, never says "safe", and drops quotes that do not come from the message or an official page.
5. Evaluation-driven iteration: we tuned on one synthetic set, then measured unseen sets once with no changes, to avoid overfitting the prompt.

## How did Nemotron's performance compare to other models you've used for similar tasks?

We did not run a head-to-head benchmark against other providers inside the product, so we cannot claim a measured comparison with them. Inside the Nemotron family we did compare on real requests:

- For short fact extraction, Nemotron 3 Super beat Nemotron 3 Nano on both speed (about 2 s vs 3.6 s) and accuracy, which surprised us; Nano mislabeled the sender in a fake-tax-authority SMS.
- For the verdict we use Nemotron 3 Ultra; with grounding and our criteria it reached no false alarms on unseen sets while catching every scam.
- Nemotron 3 Super did not handle JSON mode well in our tests (malformed output), while Ultra did, so we use JSON mode only on Ultra.

Overall, for a grounded Spanish-language safety task, the Nemotron 3 family on Token Factory was accurate and fast enough for an interactive app at about US$0.017 per analysis.

## Which Nebius platform capabilities were most valuable to your project and how?

Nebius Token Factory was the core of the project. We did not provision GPU instances or manage any model deployment: every analysis calls Nemotron through Token Factory's serverless, OpenAI-compatible API at request time.

- API access: one HTTPS endpoint (api.tokenfactory.nebius.com/v1) with a bearer key, called with plain fetch from a Node/TypeScript app. No SDK, no GPU setup, no model hosting.
- Model choice per step: the same API exposes several Nemotron variants, so we route each step to the right size — Nemotron 3.5 Super VL for screenshots, Nemotron 3 Super for fast extraction and Nemotron 3 Ultra for the verdict. Switching or A/B-testing a model is a one-line change, which is how we found that Super beat Nano for extraction.
- Structured output: JSON mode (response_format: json_object) on Ultra gave us valid, machine-readable verdicts we could enforce rules on.
- Scaling without ops: the app runs as stateless functions on a free Vercel plan; inference capacity comes entirely from Token Factory, so the public demo scales with no GPUs on our side. We added timeouts, a retry on malformed JSON, and per-IP and daily limits to stay within credits.
- Cost: pay-per-token pricing let us measure the real cost per analysis (about US$0.017) and plan for production.

We also publish a Docker image (ghcr.io/ramsesavi94-maker/es-fraude) ready for Nebius Serverless AI endpoints; for the hackathon we kept hosting on a free tier and used Token Factory for all inference.

## How likely are you to recommend running Nemotron on Nebius to other developers?

9/10.

Why: going from an idea to a working, public, multi-model app took days, not weeks. The OpenAI-compatible API meant zero integration friction, having several Nemotron sizes behind one endpoint made it easy to pick the right model per step, and latency (6–9 s for a full analysis with up to three model calls) was good enough for an interactive consumer app at about US$0.017 per analysis.

What would make it a 10:
- Per-model notes on JSON mode and structured output (it worked on Ultra but not on Super in our tests).
- Consistent model IDs, or a 404 that suggests the closest model name.
- Documented rate limits and behavior under concurrency (some calls took 35–50 s with 3 parallel requests).
- Prompt caching for long, repeated system prompts.
- A per-model daily usage and cost view in the dashboard.

## How would you rate your experience running Nemotron inference on Nebius compared to previous cloud or local development environments?

9/10.

Running these models ourselves was not an option: Nemotron 3 Ultra (550B total parameters) and Super (120B) are far beyond what a laptop without a GPU can run, and renting and operating GPU instances would have taken time and budget a small team does not have during a hackathon. With Token Factory, inference was simply an HTTPS call: no drivers, no model downloads, no serving stack, no scaling work. We spent our time on the product, the grounding and the evaluation instead of infrastructure.

The point we would improve is predictability under load: single requests were fast (about 2–4 s per model call), but with three parallel requests some calls took 35–50 s, and we found no documented limits to plan around.

## What additional features or improvements would have made the Nemotron on Nebius experience more effective for your project?

- Schema-enforced structured output (JSON Schema, not only json_object) that behaves the same across all Nemotron sizes; JSON mode worked on Ultra but returned malformed output on Super in our tests.
- Prompt caching for long, repeated system prompts. Most of our Ultra prompt is a fixed catalog of about 2.5k tokens sent on every call.
- Documented rate limits and concurrency behavior, plus a status or queue indicator.
- Consistent model IDs, and a 404 that suggests the closest model name (a one-letter typo in a deploy variable cost us debugging time).
- A dashboard view of tokens, latency and cost per model per day.
- Published guidance on which Nemotron size to use for which task, with latency numbers; in our case Super beat Nano on both speed and accuracy, which we only learned by testing.

## What do you most hope to see from the Nemotron team next?

- Stronger grounding behavior: a mode or training focus where the model refuses to state facts (phone numbers, URLs, deadlines) that are not in the provided context. This was our biggest risk for a safety app and the reason we moved all contacts out of the model.
- Better Spanish and Latin American coverage, including evaluation results for Spanish and for regional, informal text such as SMS and WhatsApp messages.
- A smaller, faster vision-language model for screenshot reading on mobile-first apps.
- Safety and guardrail models (for example scam and fraud classification) available directly on Token Factory, so builders can combine them with Nemotron reasoning.
- Reliable language control: answering in the requested language even when the input is in another one.
