/**
 * sitemap.ts — Split sitemap (Google max: 50,000 URLs per file)
 *
 * Total URL count: ~76,700+ across 3 chunks:
 *   [0] Core + Dest×City + Trek×City + Trek×Month  (~19,500)
 *   [1] Dest×City×Month  first 50,000              (~50,000)
 *   [2] Dest×City×Month  remainder                 (~7,200)
 *
 * Next.js generates a sitemap index at /sitemap.xml pointing to
 * /sitemap/0.xml, /sitemap/1.xml, /sitemap/2.xml automatically.
 * Submit /sitemap.xml to Google Search Console.
 */

import type { MetadataRoute } from 'next';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';
import yogaData from '../../data/yoga-programs.json';

let blogData: Array<{ slug: string; published: string }> = [];
let comparisonsData: Array<{ slug: string }> = [];
let bestTimeData: Array<{ slug: string }> = [];
let trekSeasonsData: Record<string, { months: string[] }> = {};
let yatraSeasonsData: Record<string, { route_base: string; months: string[] }> = {};

try { blogData = require('../../data/blog-posts.json'); } catch {}
try { comparisonsData = require('../../data/comparisons.json'); } catch {}
try { bestTimeData = require('../../data/best-time.json'); } catch {}
try { trekSeasonsData = require('../../data/trek-seasons.json'); } catch {}
try { yatraSeasonsData = require('../../data/yatra-seasons.json'); } catch {}

const BASE = 'https://junegiriyatra.com';
const NOW  = '2026-05-18T00:00:00.000Z';
const DCM_CHUNK = 50_000; // URLs per Dest×City×Month sitemap chunk

// ── Destination routes ───────────────────────────────────────────────────────
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

// ── Pre-compute flat Dest×City×Month URL list (used in chunks 1 & 2) ─────────
function buildDCMUrls(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const [dest, data] of Object.entries(yatraSeasonsData)) {
    for (const month of data.months) {
      for (const c of citiesData as Array<{ slug: string }>) {
        out.push({
          url: `${BASE}/from/${dest}/${c.slug}/${month}/`,
          lastModified: NOW,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  }
  return out;
}

// ── generateSitemaps — tells Next.js how many chunks to create ───────────────
export function generateSitemaps() {
  const dcmTotal = Object.values(yatraSeasonsData).reduce(
    (sum, v) => sum + v.months.length * (citiesData as Array<unknown>).length,
    0
  );
  const dcmChunks = Math.ceil(dcmTotal / DCM_CHUNK);
  // chunk 0 = core, chunks 1…N = DCM pages
  return Array.from({ length: 1 + dcmChunks }, (_, i) => ({ id: i }));
}

// ── Main sitemap function ────────────────────────────────────────────────────
export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {

  // ── Chunk 0: everything except Dest×City×Month ──────────────────────────
  if (id === 0) {
    const urls: MetadataRoute.Sitemap = [];

    // Homepage
    urls.push({ url: `${BASE}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 });

    // Packages
    for (const p of packagesData as Array<{ slug: string }>) {
      urls.push({ url: `${BASE}/packages/${p.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
    }

    // Hubs (content-serving only, not redirects)
    const HUB_CONTENT_SLUGS = new Set(['taj-mahal-tours', 'uttarakhand-tours']);
    for (const h of hubsData as Array<{ slug: string }>) {
      if (HUB_CONTENT_SLUGS.has(h.slug)) {
        urls.push({ url: `${BASE}/packages/${h.slug}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 });
      }
    }

    // Destination × City pages
    for (const dest of DEST_ROUTES) {
      urls.push({ url: `${BASE}${dest.index}`, lastModified: NOW, changeFrequency: 'monthly', priority: dest.priority });
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}${dest.index}${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: dest.priority - 0.1 });
      }
    }

    // Trek × Month pages
    for (const [slug, data] of Object.entries(trekSeasonsData)) {
      for (const month of data.months) {
        urls.push({ url: `${BASE}/packages/${slug}/${month}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 });
      }
    }

    // Trek × City pages
    for (const slug of Object.keys(trekSeasonsData)) {
      urls.push({ url: `${BASE}/trek/${slug}/from/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
      for (const c of citiesData as Array<{ slug: string }>) {
        urls.push({ url: `${BASE}/trek/${slug}/from/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 });
      }
    }

    // Category hub pages
    urls.push({ url: `${BASE}/himalayan-treks/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 });
    urls.push({ url: `${BASE}/spiti-valley/`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
    urls.push({ url: `${BASE}/ladakh/`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });

    // Static pages
    urls.push({ url: `${BASE}/about/`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/contact/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/reviews/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/privacy/`, lastModified: NOW, changeFrequency: 'yearly',  priority: 0.3 });

    // Blog
    if (blogData.length > 0) {
      urls.push({ url: `${BASE}/blog/`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
      for (const p of blogData) {
        urls.push({ url: `${BASE}/blog/${p.slug}/`, lastModified: p.published, changeFrequency: 'monthly', priority: 0.7 });
      }
    }

    // Comparisons
    for (const c of comparisonsData) {
      urls.push({ url: `${BASE}/compare/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 });
    }

    // Best time
    for (const d of bestTimeData) {
      urls.push({ url: `${BASE}/best-time/${d.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    }

    // Yoga TTC pages
    urls.push({ url: `${BASE}/yoga/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 });
    for (const y of yogaData) {
      urls.push({ url: `${BASE}/yoga/${y.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 });
      for (const h of ['100hours', '200hours', '300hours']) {
        urls.push({ url: `${BASE}/yoga/${y.slug}/${h}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
      }
    }

    return urls;
  }

  // ── Chunks 1, 2 … : Dest×City×Month pages sliced to ≤ 50,000 each ──────
  const dcmUrls = buildDCMUrls();
  const chunkIndex = id - 1; // 0-based DCM chunk index
  const start = chunkIndex * DCM_CHUNK;
  const end   = start + DCM_CHUNK;
  return dcmUrls.slice(start, end);
}
