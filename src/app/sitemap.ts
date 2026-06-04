/**
 * sitemap.ts — Single-file sitemap, ~19,600 URLs (well under Google's 50k limit)
 *
 * Dest×City×Month pages (~57k) are intentionally excluded here.
 * They are ISR pages discovered by Googlebot via internal month-pill links
 * on every Dest×City page — no sitemap entry needed.
 *
 * URL breakdown:
 *   Homepage + /packages/ hub + packages  ~50
 *   Hub & category pages                  ~15
 *   Trek×From index pages (17 treks)       17
 *   Trek×City (17 × 550)               9,367
 *   Trek×Month                             86
 *   Dest × City (18 × 550)             9,918
 *   Blog / yoga / static / misc           ~80
 *   TOTAL                             ~19,533
 */

import type { MetadataRoute } from 'next';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';
import yogaData from '../../data/yoga-programs.json';
import intlCitiesData from '../../data/international-cities.json';
import intlPackagesData from '../../data/international-packages.json';

let blogData: Array<{ slug: string; published: string }> = [];
let comparisonsData: Array<{ slug: string }> = [];
let bestTimeData: Array<{ slug: string }> = [];
let trekSeasonsData: Record<string, { months: string[] }> = {};

try { blogData = require('../../data/blog-posts.json'); } catch {}
try { comparisonsData = require('../../data/comparisons.json'); } catch {}
try { bestTimeData = require('../../data/best-time.json'); } catch {}
try { trekSeasonsData = require('../../data/trek-seasons.json'); } catch {}

const BASE = 'https://junegiriyatra.com';

// Normalized to YYYY-MM-DD — no milliseconds (Google prefers clean ISO dates)
// Per-type dates — update each when that content class changes significantly.
// A single uniform date for all URLs signals auto-generation to Google and dilutes trust.
const DATES = {
  homepage:   '2026-06-04', // technical SEO fixes applied
  packages:   '2026-06-04', // /packages/ hub page added; title/schema fixes
  hubs:       '2026-05-18',
  dest_index: '2026-05-01',
  dest_city:  '2026-04-15',
  trek_index: '2026-06-04', // /trek/{slug}/from/ hub pages added
  trek_city:  '2026-04-15',
  trek_month: '2026-03-01',
  static:     '2026-03-01',
  compare:    '2026-04-01',
  best_time:  '2026-04-01',
  blog_hub:   '2026-05-01',
  yoga:       '2026-04-01',
  intl:       '2026-05-01',
};

const DEST_ROUTES = [
  { index: '/char-dham-from/',            priority: 0.9 as const },
  { index: '/kedarnath-from/',            priority: 0.9 as const },
  { index: '/kedarnath-helicopter-from/', priority: 0.9 as const },
  { index: '/badrinath-from/',            priority: 0.8 as const },
  { index: '/do-dham-from/',              priority: 0.8 as const },
  { index: '/rishikesh-from/',            priority: 0.8 as const },
  { index: '/valley-of-flowers-from/',    priority: 0.7 as const },
  { index: '/varanasi-from/',             priority: 0.8 as const },
  { index: '/mussoorie-from/',            priority: 0.7 as const },
  { index: '/nainital-from/',             priority: 0.7 as const },
  { index: '/mathura-vrindavan-from/',    priority: 0.8 as const },
  { index: '/ayodhya-from/',              priority: 0.8 as const },
  { index: '/india-tour-from/',           priority: 0.9 as const },
  { index: '/golden-triangle-from/',      priority: 0.9 as const },
  { index: '/bali-from/',                 priority: 0.8 as const },
  { index: '/thailand-from/',             priority: 0.7 as const },
  { index: '/dubai-from/',                priority: 0.7 as const },
  { index: '/singapore-from/',            priority: 0.7 as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // ── Core pages ────────────────────────────────────────────────────────────
  urls.push({ url: `${BASE}/`, lastModified: DATES.homepage, changeFrequency: 'weekly', priority: 1.0 });

  // Packages hub page (new — was 404 before this release)
  urls.push({ url: `${BASE}/packages/`, lastModified: DATES.packages, changeFrequency: 'weekly', priority: 0.9 });

  // Individual package pages
  for (const p of packagesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/packages/${p.slug}/`, lastModified: DATES.packages, changeFrequency: 'monthly', priority: 0.8 });
  }

  // Hub content pages (not redirect targets)
  const HUB_CONTENT_SLUGS = new Set(['taj-mahal-tours', 'uttarakhand-tours', 'char-dham-yatra', 'rishikesh-adventures', 'golden-triangle']);
  for (const h of hubsData as Array<{ slug: string }>) {
    if (HUB_CONTENT_SLUGS.has(h.slug)) {
      urls.push({ url: `${BASE}/packages/${h.slug}/`, lastModified: DATES.hubs, changeFrequency: 'weekly', priority: 0.9 });
    }
  }

  // ── Destination × City pages (18 destinations × 550 cities) ──────────────
  for (const dest of DEST_ROUTES) {
    urls.push({ url: `${BASE}${dest.index}`, lastModified: DATES.dest_index, changeFrequency: 'monthly', priority: dest.priority });
    for (const c of citiesData as Array<{ slug: string }>) {
      urls.push({ url: `${BASE}${dest.index}${c.slug}/`, lastModified: DATES.dest_city, changeFrequency: 'monthly', priority: dest.priority - 0.1 });
    }
  }

  // ── Trek × Month pages ────────────────────────────────────────────────────
  for (const [slug, data] of Object.entries(trekSeasonsData)) {
    for (const month of data.months) {
      urls.push({ url: `${BASE}/packages/${slug}/${month}/`, lastModified: DATES.trek_month, changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  // ── Trek × City pages (17 treks × 550 cities) ────────────────────────────
  for (const slug of Object.keys(trekSeasonsData)) {
    // Trek from-index page (new — was 404 before this release)
    urls.push({ url: `${BASE}/trek/${slug}/from/`, lastModified: DATES.trek_index, changeFrequency: 'monthly', priority: 0.7 });
    for (const c of citiesData as Array<{ slug: string }>) {
      urls.push({ url: `${BASE}/trek/${slug}/from/${c.slug}/`, lastModified: DATES.trek_city, changeFrequency: 'monthly', priority: 0.65 });
    }
  }

  // NOTE: Dest×City×Month pages (~57k) intentionally omitted — discovered via
  // internal month-pill links on every Dest×City page (no sitemap entry needed).

  // ── Category & hub pages ─────────────────────────────────────────────────
  urls.push({ url: `${BASE}/himalayan-treks/`, lastModified: DATES.hubs,   changeFrequency: 'monthly', priority: 0.9 });
  urls.push({ url: `${BASE}/spiti-valley/`,    lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.8 });
  urls.push({ url: `${BASE}/ladakh/`,          lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.8 });

  // ── Static pages ──────────────────────────────────────────────────────────
  urls.push({ url: `${BASE}/about/`,   lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/contact/`, lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/reviews/`, lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/privacy/`, lastModified: DATES.static, changeFrequency: 'yearly',  priority: 0.3 });

  // ── Blog ──────────────────────────────────────────────────────────────────
  if (blogData.length > 0) {
    urls.push({ url: `${BASE}/blog/`, lastModified: DATES.blog_hub, changeFrequency: 'weekly', priority: 0.8 });
    for (const p of blogData) {
      urls.push({ url: `${BASE}/blog/${p.slug}/`, lastModified: p.published, changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  // ── Comparisons ───────────────────────────────────────────────────────────
  for (const c of comparisonsData) {
    urls.push({ url: `${BASE}/compare/${c.slug}/`, lastModified: DATES.compare, changeFrequency: 'monthly', priority: 0.6 });
  }

  // ── Best time ─────────────────────────────────────────────────────────────
  for (const d of bestTimeData) {
    urls.push({ url: `${BASE}/best-time/${d.slug}/`, lastModified: DATES.best_time, changeFrequency: 'monthly', priority: 0.7 });
  }

  // ── International ─────────────────────────────────────────────────────────
  urls.push({ url: `${BASE}/international/`, lastModified: DATES.intl, changeFrequency: 'weekly', priority: 0.9 });
  for (const p of intlPackagesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/international/${p.slug}/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.85 });
  }
  urls.push({ url: `${BASE}/india-trek-packages/from/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.8 });
  for (const c of intlCitiesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/india-trek-packages/from/${c.slug}/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.75 });
  }

  // ── Yoga TTC ──────────────────────────────────────────────────────────────
  urls.push({ url: `${BASE}/yoga/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.9 });
  for (const y of yogaData) {
    urls.push({ url: `${BASE}/yoga/${y.slug}/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.85 });
    for (const h of ['100hours', '200hours', '300hours']) {
      urls.push({ url: `${BASE}/yoga/${y.slug}/${h}/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.8 });
    }
  }

  return urls;
}
