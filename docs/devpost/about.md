## Inspiration

In Mexico, fraud is now the most common crime. INEGI estimates **8.1 million frauds in 2025**, **80.6%** of them through the internet or electronic channels, and **96.5%** never reported. From January to July 2026, CONDUSEF (Mexico's financial consumer agency) received 110,000 complaints, and about 60,000 involved scams impersonating banks, the tax authority (SAT) or digital platforms.

Every family here has a version of the same story: a text that says your bank detected a charge, a "new number" from a nephew asking for money, a loan app that threatens to shame you in front of your contacts. People ask in Facebook groups before they ask an official source, and by the time they find the right agency, the money is gone.

We did not want another awareness campaign. We wanted to answer **the message in front of you, right now**, using official Mexican sources, and then help you act on it.

## What it does

**¿Es fraude?** ("Is it a scam?") is a free, open-source, mobile-first web app in Spanish and English. You can:

- paste a message,
- upload a screenshot,
- describe a phone call,
- paste a link or email address,
- or type the name of a loan app.

In about 6–9 seconds you get:

- **A risk level** that **never says "safe"**. At most it says no clear signs were found and how to confirm through an official channel.
- **Warning signs**, each backed by a **verbatim quote** from the message or from an official page.
- **What we checked**: real hostnames against official domains, lookalike domains (`bbva-mx-seguridad.xyz`, `sat.gob.mx.validar.com`), disguised letters (punycode), link shorteners, IP addresses, free email accounts posing as institutions, **domain age from public RDAP records**, official alerts about the impersonated institution and phone numbers in official lists.
- **Report it, step by step**:
  - urgent steps if you already paid (legal deadlines to dispute a charge, what to tell your bank about a SPEI transfer, how to recover a hijacked WhatsApp account);
  - an evidence checklist;
  - your details filled in **only in your browser**, merged into a draft complaint;
  - one-tap actions for the right channel in your state: open the prosecutor's online complaint with the text already copied, email the cyber police, call 089 with a script of what to say.

## How we built it

All inference runs at request time on **Nebius Token Factory** through its OpenAI-compatible API, using three **NVIDIA Nemotron** models, each chosen for one job:

| Step | Model | Why |
|---|---|---|
| Read screenshots | Nemotron 3.5 Super VL | Transcribes sender, amounts, links and phone numbers in about 2.5 s |
| Extract facts | Nemotron 3 Super | In our tests it was faster than Nano (≈2 s vs ≈3.6 s) and more accurate: it identified "SAT" as the sender where Nano did not |
| Verdict | Nemotron 3 Ultra | Reasons over the message, the evidence and a catalog of 12 scam patterns documented by Mexican authorities, in JSON mode |

Between the models there is a deterministic layer:
- hostname and lookalike checks;
- an RDAP lookup for domain age;
- **Tavily** searches restricted to official Mexican domains (gob.mx, sat.gob.mx, condusef.gob.mx).

Tavily only ever receives institution names, domains and phone numbers, never the person's message.

The stack is TypeScript, Hono and a single HTML page, deployed for free on Vercel. A Docker image is published for Nebius Serverless.

We worked as a three-member team: Nelson (product and testing), **Claude Code** (architecture and code) and **Codex** (research). Codex investigated Mexican scam patterns, official reporting routes, legal deadlines and the evaluation sets, all with official sources.

## Challenges we ran into

- **The model invented phone numbers.** In an early test, Ultra gave a SAT phone number with no source and recommended a short code to report spam that does not exist in Mexico. For a fraud tool, that is unacceptable. We redesigned it so **the model only classifies and explains**; every phone number, step, deadline and reporting route now comes from a verified catalog with official sources.
- **False alarms on real messages.** Our first evaluation flagged legitimate messages as scams: a bank one-time code, a CFE bill notice with its real domain. We added brand-versus-lookalike domain logic and explicit criteria for normal notifications.
- **Avoiding overfitting.** Each fix came from our own test set, so we asked Codex for new sets we had never seen and measured them once, with no changes.
- **Robustness.** A message with «guillemets» broke the JSON output. We fixed it with JSON mode on Ultra, a retry, timeouts and temperature 0 for stable verdicts.
- **Reporting is confusing.** A report to the cyber police is not a criminal complaint, and not every state has online complaints. Each route in the app now says whether it is guidance, a claim or a formal complaint.

## Accomplishments that we're proud of

- **No missed scams and no false alarms** on our unseen sets. Third set: **25/25** scams detected and **15/15** legitimate messages without a false alarm, with 27 hard cases. Links-and-emails set: **18/18** and **12/12**. Same results with English answers.
- **About US$0.017 per analysis**, and we measured where the cost goes.
- A complete flow from "is this a scam?" to "I filed the report", in Spanish and English, that works on a phone.

## What we learned

- **For safety tools, grounding matters more than model size.** The model is excellent at reading and reasoning, but facts people act on must come from verified sources.
- **"Never say safe" is a product decision, not just a prompt line.** We enforce it in code.
- **Token Factory made it easy to compare models step by step** on real calls and to choose the right Nemotron for each job.

## What's next

- Test with real messages shared by families, with personal data removed.
- A **WhatsApp channel**, because that is where people already forward suspicious messages.
- Work with financial institutions and consumer agencies so the "I already paid" path connects directly to their fraud teams.

The evaluation sets are synthetic, built from official alerts. Real-world accuracy still needs to be measured with real users.
