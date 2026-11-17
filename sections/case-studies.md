## 🔬 Selected Work

Three systems where the interesting problem wasn't the model — it was making the output **trustworthy**.

<br />

<table>
<tr>
<td width="50%" valign="top">

<b>🛰️ DharaWatch</b><br />
<sub><b>Reconciling ground truth with satellite truth</b></sub>

<br />

**The problem.** Field observations and satellite readings frequently disagree. An officer photographs a restored pond; the spectral index says bare soil. Whichever one you trust blindly, you are wrong some of the time.

**The approach.** Every photo is hashed (SHA-256), stripped for EXIF GPS and timestamp, then matched against a satellite composite for the same footprint — NDVI, NDWI, NDMI and NDBI computed over cloud-free median imagery. The system then scores **field ↔ satellite agreement** and emits an immutable *Evidence Passport* carrying the full provenance chain. Watershed context resolves through HydroBASINS.

**Why it matters.** Disagreement becomes a signal, not a bug. A low agreement score flags a site for review rather than silently selecting one source.

<sub>Earth Engine &middot; Sentinel-2 MSI &middot; HydroBASINS &middot; Express &middot; React &middot; Gemini</sub>

</td>
<td width="50%" valign="top">

<b>🛡️ Scam Radar</b><br />
<sub><b>Refusing to ship a black box</b></sub>

<br />

**The problem.** Fraud classifiers output a probability. A probability is useless to a person deciding whether to pay a registration fee — they need the *reason*.

**The approach.** TF-IDF plus logistic regression gives an interpretable baseline whose coefficients map cleanly onto language features. The API returns a graded risk band (Low / Medium / High) **and** the extracted triggers behind it — payment or UPI mentions, manufactured urgency, pressure to move to Telegram or WhatsApp.

**Why it matters.** Explainability here is an architectural constraint, not a reporting afterthought. The response schema is designed so a reason can never be omitted.

<sub>FastAPI &middot; scikit-learn &middot; TF-IDF &middot; Pydantic &middot; Python</sub>

</td>
</tr>
<tr>
<td width="50%" valign="top">

<b>📅 Ahmedabad Tech Events</b><br />
<sub><b>Ingestion that survives the web changing</b></sub>

<br />

**The problem.** Event data is scattered across GDG chapters, university pages, startup calendars, TEDx sites and community boards — every source with different markup, and every one free to change it.

**The approach.** One scraper adapter per source behind a shared interface, so a broken site is an isolated failure rather than an outage. Playwright handles JavaScript-rendered pages. A GitHub Actions cron runs the full sweep every 30 minutes, writing through Supabase, with an admin review layer for moderation.

**Why it matters.** Treating scraping as a data-engineering problem — adapters, idempotent writes, scheduled runs — is what makes it a platform rather than a script.

<sub>Next.js 16 &middot; TypeScript &middot; Playwright &middot; Supabase &middot; GitHub Actions</sub>

</td>
<td width="50%" valign="top">

<b>👁️ DrishtiWatch</b><br />
<sub><b>Temporal comparison as a first-class feature</b></sub>

<br />

**The problem.** A single satellite image tells you what a place looks like. It does not tell you what changed — which is usually the actual question.

**The approach.** Users drag two independent timeline handles across 2019–2026 to define any date range; the backend builds cloud-free median composites for each endpoint and computes real spectral deltas. Split, difference and flicker view modes let the eye catch change the numbers might understate.

**Why it matters.** Grounding the comparison in genuine Sentinel-2 reflectance — rather than pre-rendered tiles — means the deltas are measurements, not illustrations.

<sub>Earth Engine &middot; Sentinel-2 &middot; NDVI &middot; NDWI &middot; Express &middot; Vite</sub>

</td>
</tr>
</table>

<br />

> **A note on scale.** These are student-built systems with real data pipelines, real credentials and real failure modes — including a Netlify deployment path for DharaWatch. They are not demos that only run on the author's machine.

---

