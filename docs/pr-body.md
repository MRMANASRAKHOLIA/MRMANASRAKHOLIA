## What this does

Rebuilds the profile README from a generic generated template into a curated, professional profile.

### Before
- Generic generated layout ("About Me" boilerplate, "Proudly created with GPRM" footer)
- Broken stats URLs — a stray space inside the username parameter broke the query string
- `style=default_repocard` theme: washed out, low contrast
- Tech-stack wall of 13 badges with no grouping or narrative
- No project section — the strongest assets (DharaWatch, DrishtiWatch, Scam Radar, Ahmedabad Tech Events) were invisible

### After
- **Custom banner** (`assets/banner.jpg`, 1856x576, 140 KB) — typographic, dark, FinTech/Quant themed, and self-hosted so it cannot break
- **Animated typing header** plus jump-link navigation
- **Positioning:** Quant, FinTech and AI — structured around the CSE + MBA dual track
- **"What I'm Building"** showcase with real project cards, accurate stacks and repo links
- **Grouped tech stack** table by domain instead of an undifferentiated badge wall
- **Fixed analytics:** working stat, streak and language URLs with transparent backgrounds and a teal/indigo palette matched to the banner
- **Education and Connect** sections
- **`docs/github-cleanup.md`** — copy-paste kit for bio, repo renames, descriptions, topics and pin order

### Notes
- All HTML tags verified balanced
- No `###` headings inside table cells, since GitHub does not render markdown there
- `&middot;` used instead of backticks inside raw HTML so separators render cleanly
