# ¿Es fraude? — a second opinion before you fall for a scam

**Paste a suspicious text, upload a screenshot, describe a phone call or type the name of a loan app. In a few seconds you get the warning signs (quoted from the message), what official Mexican sources say, what to do, where to confirm or report, and a draft complaint.** Free, no sign-up, in Spanish, built for Mexico.

> Live demo: _pending deployment_ · Built for the Nebius x NVIDIA Global AI Hackathon (Best Apps and Agents track)

## Why

- Fraud is now **the most frequent crime in Mexico**: an estimated **8.1 million frauds in 2025**, and **80.6%** of them involved the internet or electronic channels ([UNODC-INEGI, ENVIPE 2026](https://www.cdeunodc.inegi.org.mx/unodc/index.php/2026/09/10/envipe-2026-el-fraude-se-consolida-como-el-delito-mas-frecuente-en-mexico-y-revela-una-victimizacion-crecientemente-digital/index.htm)).
- **96.5%** of frauds and **97.5%** of extortions go unreported or never become an investigation (same source).
- CONDUSEF, Mexico's financial consumer agency, received **110,000 complaints** from January to July 2026; about **60,000** relate to possible fraud impersonating banks, the tax authority (SAT) or digital platforms ([DPL News](https://dplnews.com/?p=329509)).
- Victims look for help in Facebook groups before they reach an official channel ([Publimetro](https://www.publimetro.com.mx/noticias/2026/08/18/mexicanos-corren-a-facebook-antes-de-denunciar-fraudes-de-montadeudas/)).

People do not need another awareness campaign. They need an answer about **the message in front of them, right now**, grounded in official sources and ending in a concrete next step.

## What it does

| Input | Example |
|---|---|
| Message | SMS, WhatsApp or email text |
| Screenshot | A photo of the chat or SMS; read by a vision model |
| Phone call | "They said they were from my bank and asked for the code I got by SMS…" |
| Loan app | Just the app or lender name |

The answer always includes:

- **Risk level**: high, medium or "no clear signs". It **never says a message is safe**; at most it says no signs were found and tells you how to confirm through an official channel.
- **Warning signs**, each one backed by a **verbatim quote** from the message or from an official page.
- **What was checked**: links compared with official domains, lookalike domains, official alerts about the impersonated institution, phone numbers in official lists, and lender registration searches.
- **What to do**, plus **where to confirm or report**, with tap-to-call numbers.
- **A draft complaint** you can copy.

## How it works

```
input (text | screenshot | call description | app name)
  │
  ├─ 1. Read      Nemotron 3.5 Super VL transcribes screenshots
  │               Nemotron 3 Super extracts facts: who it claims to be, links,
  │               phone numbers, amounts, what it asks for, urgency
  ├─ 2. Verify    deterministic: real hostname vs official domains, lookalike
  │               detection (bbva-mx-seguridad.com imitates BBVA)
  │               Tavily: official alerts, domain reports, phone numbers in
  │               official lists, lender mentions on CONDUSEF
  ├─ 3. Reason    Nemotron 3 Ultra weighs content + evidence against a catalog
  │               of 12 scam patterns documented by Mexican authorities
  │               → structured verdict (JSON mode)
  └─ 4. Compose   product rules + verified steps and contacts from the catalog
```

### NVIDIA Nemotron on Nebius Token Factory

**All inference runs at request time on [Nebius Token Factory](https://tokenfactory.nebius.com)** through its OpenAI-compatible API (`https://api.tokenfactory.nebius.com/v1`). Every analysis makes two or three model calls:

| Step | Model | Why this model |
|---|---|---|
| Read screenshots | `nvidia/Nemotron-3.5-Super-VL` | Transcribes sender, amounts, links and phone numbers from phone screenshots in about 2.5 s |
| Extract facts | `nvidia/nemotron-3-super-120b-a12b` | In our tests it was faster (≈2 s vs ≈3.6 s) and more accurate than Nano: it identified "SAT" as the sender where Nano returned "pending refund" |
| Verdict | `nvidia/Nemotron-3-Ultra-550b-a55b` | Reasoning over the message, the search evidence and the pattern catalog; JSON mode keeps the output valid even when messages contain unusual quotes |

Token Factory let us swap models per step, compare speed and accuracy on real calls, and keep the whole pipeline at about **6–7 seconds per analysis** (median) without hosting any GPU ourselves.

### Grounding and safety rules

- **The model never writes phone numbers, emails or next steps.** In early tests Ultra invented a SAT phone number and a reporting short code that does not exist in Mexico. Contacts and steps now come only from a verified catalog (`src/catalog.ts`), each with an official source.
- **Hostnames are compared, not text**: `sat.gob.mx.validacion.com` belongs to `validacion.com`, not to the SAT.
- **No false reassurance**: when there are no signs, the summary is a fixed text that says this is not a guarantee.
- **Not finding a lender is not proof it is illegal**: the app asks you to check its legal name in CONDUSEF's registry (SIPRES) instead of accusing it.
- **Privacy**: messages and screenshots are not stored. Tavily only receives institution names, domains and phone numbers, never the message.
- **Abuse protection**: per-IP hourly limit and a daily cap, so the public demo stays within free credits.

## Evaluation

Three sets of synthetic cases written from official alerts (CONDUSEF, SAT, SSPC, SSC CDMX, PROFECO, Bienestar, state governments). Each set includes legitimate messages designed to look suspicious, such as a real bank alert asking you to call the number on your card, or a relative asking for a ride.

| Set | Cases | Scams detected | Legitimate, no false alarm | Notes |
|---|---|---|---|---|
| `eval/cases.json` | 45 | 30/30 | 15/15 | Used to tune the rules |
| `eval/holdout.json` | 40 | 25/25 | 15/15 | First run before tuning: 24/25 and 14/15 |
| `eval/third.json` | 40 | **25/25** | **15/15** | **Unseen, measured once with no changes**; 27 hard cases; pattern correct 15/15 |

Median latency 5.7–6.8 s, p90 7.2–10.1 s. The cases are synthetic; testing with real messages from real people is the next step.

Run it yourself:

```bash
npx tsx --env-file=.env scripts/evaluate.ts eval/third.json
```

## Run it

Requirements: Node.js 22 or later, a Nebius Token Factory API key and a Tavily API key (both available through the Nebius Builder Program).

```bash
git clone https://github.com/ramsesavi94-maker/es-fraude
cd es-fraude
npm install
cp .env.example .env   # add NEBIUS_API_KEY and TAVILY_API_KEY
npm run dev            # http://localhost:8787
```

Other commands:

```bash
npm test                                                   # unit tests
npx tsx --env-file=.env scripts/try.ts "message text"      # one analysis in the terminal
npx tsx --env-file=.env scripts/try.ts --image file.png    # analyze a screenshot
npx tsx --env-file=.env scripts/samples.ts                 # four sample cases
```

Without `TAVILY_API_KEY` the app still works, using only the deterministic checks and the model.

### Deploy

- **Vercel** (what the demo uses): import the repo; `src/app.ts` exports the Hono app and is detected with zero configuration. Add the environment variables from `.env.example`.
- **Container**: every push to `main` publishes `ghcr.io/ramsesavi94-maker/es-fraude:latest` (port 8787), which can run on Nebius Serverless AI endpoints or any container host.

## Project structure

| Path | What it is |
|---|---|
| `src/analyze.ts` | The pipeline: read, extract, verify, reason, compose |
| `src/catalog.ts` | Verified scam patterns, official channels and domains |
| `src/official.ts` | Hostname and lookalike-domain checks |
| `src/tavily.ts` | Search limited to names, domains and phone numbers |
| `src/llm.ts` | Token Factory client |
| `src/app.ts` | HTTP API and limits |
| `public/index.html` | Mobile-first page |
| `eval/` | Evaluation sets and results |
| `docs/research/` | Source research behind the catalog |

## Team

Built by Nelson Ramses Aviles with two AI teammates: **Claude Code** (architecture and code) and **Codex** (research on Mexican scam patterns and official sources, evaluation sets and second opinions).

This is guidance, not legal advice. If you are in danger, call 911.

## License

[MIT](LICENSE)
