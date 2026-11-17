# ✏️ Editing this profile

`README.md` is **generated**. Don't edit it directly — CI will fail and your change will be
overwritten on the next build.

## How it works

```text
docs/README.template.md      ← the page skeleton, lists the sections in order
sections/*.md                ← the actual content, one file per block
.github/scripts/build-readme.mjs   ← composes the two into README.md
README.md                    ← generated output (commit it)
```

Each placeholder in the template pulls in a file:

```markdown
<!-- include: sections/about.md -->
```

## Everyday commands

```bash
npm run readme        # rebuild README.md from sections/
npm run readme:check  # verify README.md matches sections/ (what CI runs)
npm run links         # validate every remote badge and link
npm run verify        # readme:check + links
```

`npm install` needs no dependencies — there aren't any.

## Adding a section

1. Create `sections/my-section.md`.
2. Add `<!-- include: sections/my-section.md -->` to `docs/README.template.md` where it belongs.
3. Run `npm run readme`.
4. If you forget step 2, the build tells you the file is unused.
   If you reference a file that doesn't exist, the build fails loudly.

## Two traps the build guards against

These both fail silently on GitHub, so the script checks for them:

1. **Markdown headings inside table cells.** `### Foo` inside a `<td>` renders as the literal
   text `### Foo`. Use `<b>Foo</b><br />` instead.
2. **Unbalanced HTML tags.** A forgotten `</td>` silently destroys the rest of the page.

## Also worth knowing

- Backticks inside raw HTML do **not** render as code on GitHub. Use `&middot;` or plain text
  inside `<sub>` tags rather than `` `code` ``.
- Every remote image is a third-party service that can die. `npm run links` finds dead ones.
- If `npm run links` fails on *every* URL at once, you're probably on a restricted network
  (CI runners and sandboxes get blocked) — it's not the badges.

## CI

`.github/workflows/readme.yml` runs on pushes and PRs that touch the README:

- rebuilds from sections and **fails if `README.md` is out of date**
- runs the link checker as advisory (badge hosts rate-limit GitHub runners, so it doesn't block)
