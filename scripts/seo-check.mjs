#!/usr/bin/env node
/**
 * seo-check.mjs — pre-deploy SEO regression guard.
 *
 * WHY THIS EXISTS
 * The same defect has shipped four separate times: a hardcoded link or a
 * BreadcrumbList entry pointing at a URL nobody ever built.
 *   1. /compare/            — breadcrumbs referenced a hub that did not exist
 *   2. /best-time/          — same
 *   3. /from/{dest}/…       — ~28,000 schema references into 404s
 *   4. /packages/{thailand,dubai,singapore}-tour-*  — ~1,000 pages, incl. a live CTA
 * Each was found by hand, after shipping. This finds them before.
 *
 * It runs against a BUILT site (.next/server/app/**.html), so it needs no server
 * and sees exactly what a crawler would.
 *
 *   node scripts/seo-check.mjs            # sample (fast, for CI on every PR)
 *   node scripts/seo-check.mjs --all      # every prerendered page
 *
 * Exit 1 on any violation.
 */

import { readFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';

const ORIGIN = 'https://junegiriyatra.com';
const TITLE_MAX = 60;
const DESC_MAX = 160;
const SAMPLE_PER_ROUTE = 3;          // keeps the default run quick but broad
const ALL = process.argv.includes('--all');

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');

const rx = {
  title: /<title>([\s\S]*?)<\/title>/,
  desc: /<meta name="description" content="([\s\S]*?)"/,
  canonical: /<link rel="canonical" href="([^"]*)"/,
  robots: /<meta name="robots" content="([^"]*)"/,
  h1: /<h1[\s>]/g,
  // Strict: only real JSON-LD script tags. A loose regex also matches escaped
  // "application/ld+json" inside Next's __next_f hydration payload and reports
  // a false parse failure — that cost time once already.
  jsonld: /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  href: /href="(\/[^"#?]*)"/g,
};

const files = [];
for await (const f of glob('.next/server/app/**/*.html')) files.push(f);
if (!files.length) {
  console.error('✖ no prerendered HTML found — run `next build` first.');
  process.exit(1);
}

// Sample evenly across route families so every template is represented.
let targets = files;
if (!ALL) {
  const byRoute = new Map();
  for (const f of files) {
    const key = f.replace('.next/server/app/', '').split('/')[0];
    if (!byRoute.has(key)) byRoute.set(key, []);
    byRoute.get(key).push(f);
  }
  targets = [...byRoute.values()].flatMap((v) => v.slice(0, SAMPLE_PER_ROUTE));
}

// Every internal URL the build actually produced.
const built = new Set();
for (const f of files) {
  const p = f.replace('.next/server/app', '').replace(/\.html$/, '');
  built.add(p === '/index' ? '/' : `${p}/`);
}

// ── ISR routes ────────────────────────────────────────────────────────────
// Prerendered output alone is NOT the source of truth. Routes like
// /trek/{slug}/from/{city}/ prerender only tier-1 cities and generate the rest
// on demand, so a link to an ISR page looks "missing" at build time while
// returning 200 in production. Checking the params against the source data is
// what separates a genuine dead link from a page that simply has not been
// generated yet — and it still catches slugs that exist nowhere, which is how
// /packages/nainital-corbett-tour-3n-4d/ was found.
const load = (f) => JSON.parse(readFileSync(`data/${f}`, 'utf8'));
const slugsOf = (v) => new Set((Array.isArray(v) ? v : Object.keys(v)).map((x) => (typeof x === 'string' ? x : x.slug)).filter(Boolean));

const CITIES = slugsOf(load('cities.json'));
const INTL_CITIES = slugsOf(load('international-cities.json'));
const TREKS = slugsOf(load('trek-seasons.json'));
const PACKAGES = slugsOf(load('packages.json'));
const HUBS = slugsOf(load('hubs.json'));

/** Route patterns whose params are validated against source data. */
const ISR = [
  { re: /^\/trek\/([^/]+)\/from\/([^/]+)\/$/, ok: (a, b) => TREKS.has(a) && CITIES.has(b) },
  { re: /^\/([a-z-]+)-from\/([^/]+)\/$/,          ok: (_a, b) => CITIES.has(b) },
  { re: /^\/india-trek-packages\/from\/([^/]+)\/$/, ok: (a) => INTL_CITIES.has(a) },
  { re: /^\/packages\/([^/]+)\/$/,                ok: (a) => PACKAGES.has(a) || HUBS.has(a) },
  { re: /^\/packages\/([^/]+)\/([^/]+)\/$/,       ok: (a) => PACKAGES.has(a) || TREKS.has(a) },
];

const resolves = (path) => {
  if (built.has(path)) return true;
  for (const { re, ok } of ISR) {
    const m = path.match(re);
    if (m) return ok(...m.slice(1));
  }
  return false;
};

const violations = [];
const add = (file, rule, detail) => violations.push({ file, rule, detail });

for (const file of targets) {
  const html = readFileSync(file, 'utf8');
  let page = file.replace('.next/server/app', '').replace(/\.html$/, '') || '/';
  if (page === '/index') page = '/';

  // Framework internals and offline shells are never indexed — skip them.
  if (/^\/(_global-error|_not-found|offline)$/.test(page)) continue;

  const noindex = (html.match(rx.robots)?.[1] || '').includes('noindex');

  const title = decode(html.match(rx.title)?.[1]?.trim() ?? '');
  if (!title) add(page, 'title-missing', '');
  else if (title.length > TITLE_MAX) add(page, 'title-too-long', `${title.length} chars — ${title}`);

  const desc = decode(html.match(rx.desc)?.[1]?.trim() ?? '');
  if (!desc) add(page, 'description-missing', '');
  else if (desc.length > DESC_MAX) add(page, 'description-too-long', `${desc.length} chars`);

  const h1s = (html.match(rx.h1) || []).length;
  if (h1s !== 1) add(page, 'h1-count', `found ${h1s}, expected 1`);

  // Un-interpolated template placeholders and stringified nothings. A single-quoted
  // '${PRICE}' shipped to production in seven route titles because it never
  // interpolated, and four hub pages once rendered "undefined | Junegiri Yatra".
  // Both were invisible to length and link checks.
  for (const [label, value] of [['title', title], ['description', desc]]) {
    if (!value) continue;
    if (/\$\{[^}]*\}/.test(value)) add(page, 'uninterpolated-placeholder', `${label}: ${value}`);
    if (/\b(undefined|null|NaN)\b/.test(value)) add(page, 'placeholder-value', `${label}: ${value}`);
  }

  const canonical = html.match(rx.canonical)?.[1];
  if (!canonical) { if (!noindex) add(page, 'canonical-missing', ''); }
  else {
    const want = `${ORIGIN}${page === '/' ? '/' : page.endsWith('/') ? page : `${page}/`}`;
    if (canonical.replace(/\/$/, '') !== want.replace(/\/$/, '')) {
      add(page, 'canonical-mismatch', `${canonical} ≠ ${want}`);
    }
  }

  // BreadcrumbList items must resolve. This is the check that would have caught
  // all four historical occurrences.
  for (const m of html.matchAll(rx.jsonld)) {
    let parsed;
    try { parsed = JSON.parse(m[1].trim()); }
    catch { add(page, 'jsonld-invalid', 'block failed to parse'); continue; }
    const nodes = Array.isArray(parsed) ? parsed : (parsed['@graph'] ?? [parsed]);
    for (const node of nodes) {
      if (node?.['@type'] !== 'BreadcrumbList') continue;
      for (const item of node.itemListElement ?? []) {
        const url = typeof item.item === 'string' ? item.item : item.item?.['@id'];
        if (!url || !url.startsWith(ORIGIN)) continue;
        const path = url.slice(ORIGIN.length) || '/';
        if (!resolves(path.endsWith('/') ? path : `${path}/`)) {
          add(page, 'breadcrumb-404', `position ${item.position} → ${url}`);
        }
      }
    }
  }

  // Internal <a href> targets that the build never produced.
  for (const m of html.matchAll(rx.href)) {
    const h = m[1];
    if (/^\/(_next|icons|images|favicon|manifest|api|admin|p)\b/.test(h)) continue;
    if (/\.[a-z0-9]{2,5}$/i.test(h)) continue;          // static assets
    const path = h.endsWith('/') ? h : `${h}/`;
    if (!resolves(path)) add(page, 'internal-link-404', h);
  }
}

const grouped = new Map();
for (const v of violations) {
  const k = v.rule;
  if (!grouped.has(k)) grouped.set(k, []);
  grouped.get(k).push(v);
}

console.log(`seo-check — ${targets.length} of ${files.length} prerendered pages (${ALL ? 'full' : 'sample'})\n`);
if (!violations.length) {
  console.log('✓ no violations');
  process.exit(0);
}
for (const [rule, list] of [...grouped].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`✖ ${rule} — ${list.length}`);
  for (const v of list.slice(0, 8)) console.log(`    ${v.file}${v.detail ? `  ${v.detail}` : ''}`);
  if (list.length > 8) console.log(`    … ${list.length - 8} more`);
  console.log();
}
console.log(`${violations.length} violation(s).`);
process.exit(1);
