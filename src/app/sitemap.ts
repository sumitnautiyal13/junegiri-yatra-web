/**
 * sitemap.ts — Sitemap index with 5 sub-sitemaps (~4,000 URLs each)
 *
 * Next.js generates /sitemap.xml as an index pointing to:
 *   /sitemap/0.xml  — Core pages (~250 URLs)
 *   /sitemap/1.xml  — Dest × City part 1 (9 routes × 550 cities ~4,960)
 *   /sitemap/2.xml  — Dest × City part 2 (9 routes × 550 cities ~4,958)
 *   /sitemap/3.xml  — Trek × City part 1 (9 treks × 550 cities ~4,960)
 *   /sitemap/4.xml  — Trek × City part 2 (8 treks × 550 cities + trek-months ~4,500)
 *
 * Dest×City×Month pages (~57k) intentionally excluded — discovered by Googlebot
 * via internal month-pill links on every Dest×City page.
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

// Normalized to YYYY-MM-DD (no milliseconds — Google prefers clean ISO dates)
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

// Split dest routes into two halves for sitemaps 1 & 2
const DEST_HALF_1 = DEST_ROUTES.slice(0, 9);
const DEST_HALF_2 = DEST_ROUTES.slice(9);

// Split trek slugs into two halves for sitemaps 3 & 4
function getTrekHalves(): [string[], string[]] {
  const slugs = Object.keys(trekSeasonsData);
  const mid = Math.ceil(slugs.length / 2);
  return [slugs.slice(0, mid), slugs.slice(mid)];
}

// ── Tell Next.js there are 5 sub-sitemaps ────────────────────────────────────
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
}

// ── Each sitemap shard ───────────────────────────────────────────────────────
export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // ── SHARD 0: Core pages ──────────────────────────────────────────────────
  if (id === 0) {
    // Homepage
    urls.push({ url: `${BASE}/`, lastModified: DATES.homepage, changeFrequency: 'weekly', priority: 1.0 });

    // Packages hub + individual packages
    urls.push({ url: `${BASE}/packages/`, lastModified: DATES.packages, changeFrequency: 'weekly', priority: 0.9 });
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

    // Category hubs
    urls.push({ url: `${BASE}/himalayan-treks/`, lastModified: DATES.hubs,   changeFrequency: 'monthly', priority: 0.9 });
    urls.push({ url: `${BASE}/spiti-valley/`,    lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.8 });
    urls.push({ url: `${BASE}/ladakh/`,          lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.8 });

    // Static pages
    urls.push({ url: `${BASE}/about/`,   lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/contact/`, lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/reviews/`, lastModified: DATES.static, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/privacy/`, lastModified: DATES.static, changeFrequency: 'yearly',  priority: 0.3 });

    // Blog
    if (blogData.length > 0) {
      urls.push({ url: `${BASE}/blog/`, lastModified: DATES.blog_hub, changeFrequency: 'weekly', priority: 0.8 });
      for (const p of blogData) {
        urls.push({ url: `${BASE}/blog/${p.slug}/`, lastModified: p.published, changeFrequency: 'monthly', priority: 0.7 });
      }
    }

    // Comparisons
    for (const c of comparisonsData) {
      urls.push({ url: `${BASE}/compare/${c.slug}/`, lastModified: DATES.compare, changeFrequency: 'monthly', priority: 0.6 });
    }

    // Best time
    for (const d of bestTimeData) {
      urls.push({ url: `${BASE}/best-time/${d.slug}/`, lastModified: DATES.best_time, changeFrequency: 'monthly', priority: 0.7 });
    }

    // International
    urls.push({ url: `${BASE}/international/`, lastModified: DATES.intl, changeFrequency: 'weekly', priority: 0.9 });
    for (const p of intlPackagesData as Array<{ slug: string }>) {
      urls.push({ url: `${BASE}/international/${p.slug}/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.85 });
    }
    urls.push({ url: `${BASE}/india-trek-packages/from/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.8 });
    for (const c of intlCitiesData as Array<{ slug: string }>) {
      urls.push({ url: `${BASE}/india-trek-packages/from/${c.slug}/`, lastModified: DATES.intl, changeFrequency: 'monthly', priority: 0.75 });
    }

    // Yoga TTC
    urls.push({ url: `${BASE}/yoga/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.9 });
    for (const y of yogaData) {
      urls.push({ url: `${BASE}/yoga/${y.slug}/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.85 });
      for (const h of ['100hours', '200hours', '300hours']) {
        urls.push({ url: `${BASE}/yoga/${y.slug}/${h}/`, lastModified: DATES.yoga, changeFrequency: 'monthly', priority: 0.8 });
      }
    }

    // Destination index pages (18 hub pages)
    for (const dest of DEST_ROUTES) {
      urls.push({ url: `${BASE}${dest.index}`, lastModified: DATES.dest_index, changeFrequency: 'monthly', priority: dest.priority });
    }

    // Trek × Month pages + trek from-index pages
    for (const [slug, data] of Object.entries(trekSeasonsData)) {
      urls.push({ url: `${BASE}/trek/${slug}/from/`, lastModified: DATES.trek_index, changeFrequency: 'monthly', priority: 0.7 });
      for (const month of data.months) {
        urls.push({ url: `${BASE}/packages/${slug}/${month}/`, lastModified: DATES.trek_month, changeFrequency: 'monthly', priority: 0.6 });
      }
    }
  }

  // ── SHARD 1: Dest × City — first 9 routes ───────────────────────────────
  if (id === 1) {
    for (const dest of DEST_HALF_1) {
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}${dest.index}${c.slug}/`, lastModified: DATES.dest_city, changeFrequency: 'monthly', priority: dest.priority - 0.1 });
      }
    }
  }

  // ── SHARD 2: Dest × City — last 9 routes ────────────────────────────────
  if (id === 2) {
    for (const dest of DEST_HALF_2) {
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}${dest.index}${c.slug}/`, lastModified: DATES.dest_city, changeFrequency: 'monthly', priority: dest.priority - 0.1 });
      }
    }
  }

  // ── SHARD 3: Trek × City — first half of treks ──────────────────────────
  if (id === 3) {
    const [firstHalf] = getTrekHalves();
    for (const slug of firstHalf) {
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}/trek/${slug}/from/${c.slug}/`, lastModified: DATES.trek_city, changeFrequency: 'monthly', priority: 0.65 });
      }
    }
  }

  // ── SHARD 4: Trek × City — second half of treks ─────────────────────────
  if (id === 4) {
    const [, secondHalf] = getTrekHalves();
    for (const slug of secondHalf) {
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}/trek/${slug}/from/${c.slug}/`, lastModified: DATES.trek_city, changeFrequency: 'monthly', priority: 0.65 });
      }
    }
  }

  return urls;
}
