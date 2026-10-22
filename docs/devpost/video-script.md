# Demo video script (target 2:40, hard limit 3:00)

Record the live app at https://es-fraude-seven.vercel.app/?lang=en in a browser at phone size, or on your phone. Read the voiceover in English. Every example below is built into the app, so nothing needs to be typed during the recording.

| Time | On screen | Voiceover (English) |
|---|---|---|
| 0:00–0:15 | Gallery image `01-cover.jpg`, or the app's home page | "In Mexico, fraud is now the most common crime: 8.1 million cases in 2025, and 96.5% are never reported. Every family gets these messages. ¿Es fraude? gives you a second opinion before you fall for one." |
| 0:15–0:45 | Tap the **Fake tax authority (SAT)** example. Show the progress steps, then the high-risk verdict and the warning signs | "Here is a real-style SMS pretending to be the tax authority. NVIDIA Nemotron 3 Super extracts who it claims to be, the link and what it asks for. Then Nemotron 3 Ultra, on Nebius Token Factory, weighs it against twelve scam patterns documented by Mexican authorities. Every warning sign quotes the message itself." |
| 0:45–1:05 | Scroll to **What we checked**: the lookalike domain and the official SAT alerts found by Tavily | "We do not just ask a model. The app compares the real domain with official ones, sat-devoluciones-mx is not the SAT, and Tavily finds official alerts about this exact scam on government sites. Tavily never receives the person's message." |
| 1:05–1:25 | Tap the **Screenshot** tab, upload `samples/sms-falso-banco.png`, show the fake bank verdict | "Most people only have a screenshot. Nemotron 3.5 Super VL reads it: sender, amount, link and phone number. A fake bank alert, detected in seconds." |
| 1:25–1:40 | Tap the **Email "from SAT"** example | "Links and emails are checked without ever opening them: lookalike domains, shorteners, disguised letters, domain age, and free Gmail accounts pretending to be the tax authority." |
| 1:40–2:10 | Back on the SAT result, open **Report it, step by step**: tap **Yes**, show the urgent steps, check one evidence item, choose **Ciudad de México**, show the routes | "Detection is only half the job. If you already paid, you get verified urgent steps: 90 days to dispute a charge, what to tell your bank about a transfer. Your details stay in your browser and become a draft complaint. Then the right channel for your state, one tap away: the online prosecutor complaint, the cyber police, or 089 with a script of what to say." |
| 2:10–2:25 | Tap **Real bank alert**: show **No clear warning signs** | "And it does not cry wolf. A real bank alert gets no alarm, but the app never says 'safe'. That rule is enforced in code. Phone numbers and steps come only from a verified catalog, never from the model." |
| 2:25–2:40 | Gallery image `06-evaluation.jpg` | "On sets we had never seen, it detected 25 of 25 scams and 18 of 18 malicious links, with no false alarms, at about two cents per analysis. ¿Es fraude? is free and open source, built with NVIDIA Nemotron on Nebius Token Factory and Tavily." |

## Recording tips

- **Screen recorder:** on Windows, Xbox Game Bar (Win + Alt + R) records the active window; OBS Studio also works and is free.
- **Phone size in the browser:** press F12 → device toolbar (Ctrl + Shift + M) → choose a phone such as "iPhone 12 Pro".
- **Voice:** record the voiceover separately if that is easier, or read it while recording. Speak slowly; 2:40 leaves a margin under 3:00.
- **No copyrighted music:** use no music, or a track from the YouTube Audio Library.
- **Upload to YouTube as Public** (the rules ask for a publicly visible video). Copy the link into "Demo video URL".
