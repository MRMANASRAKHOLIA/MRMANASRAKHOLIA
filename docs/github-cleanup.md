# 🧹 GitHub Profile Cleanup Kit

Your profile README is done. This file handles everything **outside** the README — the things
recruiters actually see in the first 5 seconds: repo names, descriptions, topics, and pins.

> ⏱️ Total time: ~10 minutes. Every block below is copy-paste ready.

---

## 1. Fix your bio (30 seconds)

`github.com/settings/profile` → **Bio**. GitHub allows 160 characters — use them all.

```text
Integrated B.Tech CSE + MBA '30 @ Nirma University · Building at the intersection of Quant, Finance & AI · Explainable ML for real-world risk
```

Also set:

| Field | Value |
| :--- | :--- |
| **Name** | `Manas Rakholia` (not all-caps — reads as more professional) |
| **Company** | `@Pearlin-Tech` |
| **Location** | `Ahmedabad, India` |
| **Website** | Your best live deploy, e.g. `https://dharawatch.vercel.app` |
| **Social links** | Add Instagram + LinkedIn |

> ⚠️ A missing **location** and **website** are two of the loudest "unfinished profile" signals.
> Right now both are empty on your account.

---

## 2. Rename messy repos (2 minutes)

Two repos currently work against you. GitHub **auto-redirects old links**, so nothing breaks.

| Current name | New name | Why |
| :--- | :--- | :--- |
| `PYTON` | `python-practice` | A typo in a repo name is the single most visible red flag |
| `AI-based-Fake-Job-Scam-Detector-India-Focused-Explainable-NLP-System-` | `scam-radar` | 75 characters, ends in a trailing hyphen, unreadable in a repo list |
| `ahmedabadevents` | **delete it** | It's empty (0 commits, 0 files) and duplicates `ahmedabad-tech-events-live` |

How: repo → **Settings** → **Rename**. For the empty repo: **Settings** → scroll to **Delete this repository**.

---

## 3. Add descriptions + topics (4 minutes)

Click the ⚙️ next to **About** on each repo. Descriptions and topics are what make a repo list
look curated instead of accidental.

### `scam-radar`
**Description**
```text
Explainable NLP system that scores fake-job and payment scams — returns a risk level plus the reasons behind it, not just a probability.
```
**Topics**
```text
nlp machine-learning fastapi scikit-learn explainable-ai fraud-detection fintech python
```

### `ahmedabad-tech-events-live`
**Description**
```text
Next.js platform aggregating Ahmedabad tech events via scheduled multi-source scrapers, with search, filtering and an admin review flow.
```
**Topics**
```text
nextjs typescript supabase playwright web-scraping data-engineering tailwindcss
```

### `python-practice` (currently `PYTON`)
**Description**
```text
Python fundamentals, DSA warm-ups and small automation scripts — my daily practice log.
```
**Topics**
```text
python dsa learning algorithms practice
```

### `LeetCode`
**Description**
```text
Algorithmic problem solving log — C++ and Python solutions organised by topic and difficulty.
```
**Topics**
```text
leetcode algorithms dsa cpp python problem-solving
```

### `Pearlin-Tech/DHARAWATCH`
**Description** (already good — just add topics)
```text
topics: earth-engine sentinel-2 geospatial remote-sensing watershed google-earth-engine satellite-imagery nodejs
```

### `Pearlin-Tech/DRISHTIWATCH`
**Description** (already good — just add topics)
```text
topics: earth-engine satellite-imagery geospatial temporal-analysis google-earth-engine express monitoring
```

---

## 4. Pin the right 6 repos (1 minute)

`github.com/MRMANASRAKHOLIA` → **Customize your pins** → pick these **in this order**:

| # | Repo | Why it's pinned here |
| :-- | :--- | :--- |
| 1 | `@Pearlin-Tech/DHARAWATCH` | Most impressive: real satellite data, live deploy, 1 star |
| 2 | `scam-radar` | Your clearest AI/ML story with explainability |
| 3 | `ahmedabad-tech-events-live` | Shows full-stack + CI + scraping architecture |
| 4 | `@Pearlin-Tech/DRISHTIWATCH` | Second flagship, shows team/org work |
| 5 | `LeetCode` | Signals consistent problem-solving discipline |
| 6 | `python-practice` | Shows learning in public |

**Never pin:** empty repos, `ahmedabadevents`, or anything with zero commits.

---

## 5. Non-code settings that matter

- **Pin count:** 6 max. Fill all six — fewer looks inactive.
- **Profile picture:** a real, well-lit headshot beats a logo for a student profile. Consistent with Instagram.
- **Available for hire:** turn it on if you want internship inbound.
- **Pinned repo descriptions** appear only if the repo has a description — that's why step 3 matters.
- **Contribution consistency:** aim for commits on most weeks. A green graph is read as discipline.
- **Archive dead repos** rather than leaving them half-finished (Settings → Archive).
