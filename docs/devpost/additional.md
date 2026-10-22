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
