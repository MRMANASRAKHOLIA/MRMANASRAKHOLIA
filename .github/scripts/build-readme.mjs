#!/usr/bin/env node
/**
 * Composes README.md from modular section files.
 *
 * The README is a generated artifact. Edit the files in `sections/`, not README.md.
 *
 *   node .github/scripts/build-readme.mjs           # write README.md
 *   node .github/scripts/build-readme.mjs --check   # verify README.md is up to date (CI)
 *
 * Why: a single 240-line README becomes unreviewable. Split into sections and
 * compose on commit so the rendered result stays identical while edits stay small.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const templatePath = join(root, 'docs', 'README.template.md');
const outputPath = join(root, 'README.md');

const INCLUDE = /^<!--\s*include:\s*(\S+)\s*-->$/gm;

function render() {
  const template = readFileSync(templatePath, 'utf8');
  const used = [];
  const missing = [];

  const out = template.replace(INCLUDE, (_, relPath) => {
    const abs = join(root, relPath);
    try {
      const content = readFileSync(abs, 'utf8').replace(/\s+$/, '');
      used.push(relPath);
      return content;
    } catch {
      missing.push(relPath);
      return `<!-- MISSING INCLUDE: ${relPath} -->`;
    }
  });

  if (missing.length) {
    console.error('✗ Missing includes:');
    for (const m of missing) console.error(`   - ${m}`);
    process.exit(1);
  }

  // Guard against the two GitHub markdown traps that silently break layout.
  const problems = [];

  // Scan each table cell individually. A naive /<td[\s\S]*?^#/m regex will run
  // past </td> into the next section and report a false positive, so cells are
  // matched as bounded blocks first.
  const cells = out.match(/<td[^>]*>([\s\S]*?)<\/td>/g) || [];
  cells.forEach((cell, i) => {
    const heading = cell.match(/^[ \t]*#{1,6}[ \t]+\S/m);
    if (heading) {
      problems.push(
        `markdown heading "${heading[0].trim()}" inside table cell #${i + 1} — GitHub renders it as literal text`
      );
    }
  });
  const unbalanced = ['div', 'table', 'tr', 'td', 'b', 'sub', 'details', 'summary'].filter((tag) => {
    const open = (out.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
    const close = (out.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    return open !== close;
  });
  if (unbalanced.length) {
    problems.push(`unbalanced HTML tags: ${unbalanced.join(', ')}`);
  }

  return { out, used, problems };
}

const { out, used, problems } = render();

if (problems.length) {
  console.error('✗ Structural problems detected:');
  for (const p of problems) console.error(`   - ${p}`);
  process.exit(1);
}

if (process.argv.includes('--check')) {
  const current = readFileSync(outputPath, 'utf8');
  if (current !== out) {
    console.error('✗ README.md is out of date. Run: node .github/scripts/build-readme.mjs');
    process.exit(1);
  }
  console.log('✓ README.md is up to date');
  process.exit(0);
}

writeFileSync(outputPath, out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(1);
console.log(`✓ README.md built — ${used.length} sections, ${kb} KB, ${out.split('\n').length} lines`);
for (const u of used) console.log(`   · ${u}`);

const unused = readdirSync(join(root, 'sections'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => `sections/${f}`)
  .filter((f) => !used.includes(f));
if (unused.length) {
  console.log(`\n⚠ Not included by the template: ${unused.join(', ')}`);
}
