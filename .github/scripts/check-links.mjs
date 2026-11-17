#!/usr/bin/env node
/**
 * Validates every remote image and link in README.md.
 *
 *   node .github/scripts/check-links.mjs
 *
 * A profile README is mostly remote images. One dead badge renders as a broken
 * icon and undoes the polish of everything around it. This checks them all:
 *
 *   OK    2xx                       renders fine
 *   WARN  3xx / 4xx                 may still work in a browser, worth a look
 *   FAIL  5xx or network error      broken
 *
 * Exit code is 1 only on FAIL, so it can gate CI without flaking on
 * rate-limited badge services.
 *
 * Note: badge hosts often rate-limit or block datacenter IPs. A network error
 * here does not always mean the badge is dead — re-run or check manually before
 * deleting anything.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

const readme = readFileSync(resolve(root, 'README.md'), 'utf8');

const images = [...readme.matchAll(/(?:src)="(https?:\/\/[^"]+)"/g)].map((m) => m[1]);
const links = [...readme.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
const targets = [...new Set([...images, ...links])];

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'readme-link-checker' },
    });
    const type = res.headers.get('content-type') || '';
    const isImage = type.startsWith('image/');
    if (!res.ok) {
      return { url, status: 'FAIL', detail: `HTTP ${res.status}` };
    }
    if (url.includes('shields.io') || /\.(svg|png|jpg|jpeg|gif|webp)(\?|$)/i.test(url)) {
      if (!isImage && !type.includes('svg')) {
        return { url, status: 'WARN', detail: `not an image (${type || 'no content-type'})` };
      }
    }
    return { url, status: 'OK', detail: `HTTP ${res.status}${isImage ? ' image' : ''}` };
  } catch (err) {
    const reason = err.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : err.message;
    return { url, status: 'FAIL', detail: reason };
  } finally {
    clearTimeout(timer);
  }
}

async function run() {
  console.log(`Checking ${targets.length} remote targets in README.md\n`);

  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < targets.length) {
      const url = targets[cursor++];
      results.push(await probe(url));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const order = { FAIL: 0, WARN: 1, OK: 2 };
  results.sort((a, b) => order[a.status] - order[b.status]);

  const counts = { OK: 0, WARN: 0, FAIL: 0 };
  for (const r of results) {
    counts[r.status]++;
    const mark = r.status === 'OK' ? '✓' : r.status === 'WARN' ? '!' : '✗';
    console.log(`${mark} ${r.status.padEnd(4)} ${r.detail.padEnd(22)} ${r.url.slice(0, 110)}`);
  }

  console.log(`\n${counts.OK} ok · ${counts.WARN} warnings · ${counts.FAIL} failed`);

  if (counts.FAIL > 0) {
    console.error('\nSome targets failed. If every request failed identically, your network');
    console.error('or CI runner is likely blocking egress rather than the badges being dead.');
    process.exit(1);
  }
}

run();
