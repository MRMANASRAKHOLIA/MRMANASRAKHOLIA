## What this does

Round two. Turns a single hand-edited README into a maintainable, verified build — and adds the depth that separates a student profile from an engineer's.

### 1. Modular build pipeline
`README.md` was one 237-line file. It is now **generated** from 9 section files:

```
docs/README.template.md   → page skeleton
sections/*.md             → content, one file per block
.github/scripts/build-readme.mjs → composes them into README.md
```

Verified by rebuild round-trip: the composed output was diffed against the original and matched exactly before new content was added.

### 2. Build guards for silent failures
The script parses each `<td>` cell individually and fails the build on:
- markdown headings inside table cells (GitHub renders them as literal `###`)
- unbalanced HTML tags (one stray `</td>` destroys the rest of the page)

Both guards were tested by deliberately injecting the bug and confirming the build fails. The first version of the cell check had a false positive from a greedy regex spanning `</td>` — that is fixed.

### 3. Selected Work case studies
Four projects expanded into problem / approach / why-it-matters blocks, written from reading the actual source — DharaWatch's SHA-256 evidence hashing, EXIF extraction, NDVI/NDWI/NDMI/NDBI spectral indices, HydroBASINS resolution and field↔satellite agreement scoring; Scam Radar's interpretable TF-IDF + logistic regression design; the scraper-adapter architecture behind Ahmedabad Tech Events; DrishtiWatch's temporal comparison over 2019–2026.

### 4. Analytics that don't embarrass at low commit counts
The account has **21 commits, 8 repos, 2 contribution years**. A contribution calendar would render as an empty grid, so it is not used. Added a profile-summary card and a plain snapshot table reporting real figures.

### 5. Link checker
`check-links.mjs` validates all 41 remote targets, distinguishing 2xx / 3xx-4xx / failures, with a note that datacenter IPs get rate-limited so a total failure means blocked egress, not dead badges.

> Sandbox limitation: this environment blocks all badge hosts (`shields.io`, `vercel`, `demolab`), so the 41 URLs could not be verified here. The checker's logic was validated against reachable hosts (200 vs 404). CI will run it with real egress.

### 6. CI and docs
`.github/workflows/readme.yml` rebuilds from sections and **fails if `README.md` is out of date**; link checking runs advisory so runner rate limits don't flake the build. Added `docs/EDITING.md` and `package.json` scripts (`readme`, `readme:check`, `links`, `verify`). No dependencies.

### Verification
- `npm run readme:check` → passes; fails correctly when README is drifted
- All tags balanced: div 11/11, table 4/4, tr 7/7, td 16/16, b 37/37, sub 25/25
- Zero literal `###`, zero backticks inside raw HTML, zero missing includes
