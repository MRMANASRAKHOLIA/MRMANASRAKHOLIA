## What this does

Fixes the two broken analytics cards, then layers animation on top of the profile — using
only services verified reachable, plus SVGs that live in this repo so they cannot rot.

### 1. Why stats + top languages were broken

Both cards came from `github-readme-stats.vercel.app`. That deployment is **paused**:

```
GET https://github-readme-stats.vercel.app/api?username=MRMANASRAKHOLIA
503 SERVICE_UNAVAILABLE · code: DEPLOYMENT_PAUSED
```

The project itself is now **deprecated** — the repo's own README carries a `[!CAUTION]`
pointing at a successor. `github-profile-summary-cards.vercel.app` (the third card on the
page) is in the same state: it answers `HTTP 500` and its project is abandoned.

**Fix:** moved to the maintained successor, `github-stats-extended.vercel.app` (same API
contract — it is the drop-in fork the deprecation notice recommends). Verified live before
shipping. Dropped the dead summary-cards card.

### 2. Host audit before shipping anything

Every remaining host was probed, because "just pick a popular one" is how the page broke
in the first place.

| Service | Result |
| :--- | :--- |
| `github-stats-extended.vercel.app` | ✅ live — **now used** for stats, top langs, pins |
| `streak-stats.demolab.com` | ✅ live — kept |
| `github-readme-activity-graph.vercel.app` | ✅ live — kept |
| `ghchart.rshah.org` | ✅ live — kept |
| `readme-typing-svg.demolab.com` | ✅ live — kept, second one added |
| `capsule-render.vercel.app` | ✅ live — kept, now drives header **and** footer |
| `skillicons.dev` | ✅ live — **new** stack icon row |
| `github-profile-trophy.vercel.app` | ❌ `DEPLOYMENT_PAUSED` — not used |
| `github-contributor-stats.vercel.app` | ❌ `DEPLOYMENT_PAUSED` — not used |
| `github-readme-quotes` | ❌ dead — not used |
| `go-skill-icons` | ❌ 404 — not used |
| `github-readme-stats-git-master.vercel.app` | ❌ 404, no such deployment |

The link checker's own docstring warns that a total failure means blocked egress rather than
dead badges. True for image hosts here (this sandbox 500s even on `github.com/<user>.png`),
which is why the audit distinguishes: **HTML endpoints that answered real Vercel status pages
proved the cards dead**; everything else was confirmed by landing-page response.

### 3. Animations — five hand-built SVGs, zero external dependency

GitHub renders profile READMEs with CSS stripped and JavaScript disabled, so "animation"
means animated SVG or a GIF. Third-party generators are exactly what broke in §1, so the
new effects are authored here and served by GitHub from this repo:

| File | Effect |
| :--- | :--- |
| `assets/svg/aurora-band.svg` | three drifting blurred gradient orbs + a light pulse sweeping a rail |
| `assets/svg/ticker.svg` | seamless scrolling "LIVE" ticker of focus areas, masked at both edges |
| `assets/svg/signal-bars.svg` | 44-bar equaliser, staggered phases, travelling highlight dots |
| `assets/svg/circuit-grid.svg` | dot-matrix board with pulses running two traces in opposite directions |
| `assets/svg/divider.svg` | divider rail with a glowing comet pulse and blinking nodes |

All are static-valid XML, SMIL-only (no CSS, no JS), and were **rendered to PNG and visually
inspected** during review — which caught two real defects: the ticker had uneven item spacing
(a visible jump at loop point) and the equaliser only filled the left fifth of its canvas.
Both were rebuilt.

### 4. Corrected numbers

The old snapshot claimed **21+ contributions · 8 repos**. Pulled from the GraphQL API:

```
repositories.totalCount = 8        contributionCalendar.totalContributions = 33
```

Snapshot now says **33 contributions · 8 public repos**, contribution year moved to
**Building since 2025**. Also removed the pre-existing double `---` after `stack.md`.

### 5. Pinned cards for work that had none

`DharaWatch` and `DrishtiWatch` are linked from the body but never had a card. Pins now cover
the two owned projects plus `Pearlin-Tech/DHARAWATCH`, each wrapped in a link.

### 6. Tooling updates

- `check-links.mjs` now also verifies **local** images (`assets/**`) exist on disk, and treats
  the snake SVG's 404 as a warning — it 404s until `snake.yml` first runs on `main`.
- New `.github/workflows/snake.yml` (Platane/snk → `output` branch) powers the snake animation.
- `sections/analytics.md` and `docs/EDITING.md` document which host serves what and why the
  dead projects were dropped, so this doesn't regress.

### Verification

- `npm run readme:check` → **README.md is up to date**
- build guards pass: no headings in `<td>`, all tags balanced
- all 5 SVGs parse as valid XML; animation/`repeatCount`/gradient-reference coverage checked
- visual render check of all 5 effects

> Sandbox limitation: no egress here, so `npm run links` cannot run against the live hosts.
> Dead-vs-alive calls came from the checks above, not from that script.
