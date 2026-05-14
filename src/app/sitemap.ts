import type { MetadataRoute } from 'next';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';
import yogaData from '../../data/yoga-programs.json';

// Import optional data files only if they exist
let blogData: Array<{ slug: string; published: string }> = [];
let comparisonsData: Array<{ slug: string }> = [];
let bestTimeData: Array<{ slug: string }> = [];
let trekSeasonsData: Record<string, { months: string[] }> = {};

try { blogData = require('../../data/blog-posts.json'); } catch {}
try { comparisonsData = require('../../data/comparisons.json'); } catch {}
try { bestTimeData = require('../../data/best-time.json'); } catch {}
try { trekSeasonsData = require('../../data/trek-seasons.json'); } catch {}

const BASE = 'https://junegiriyatra.com';
// Stable date — only update manually when content changes significantly.
// Using new Date() on every build floods Search Console with spurious lastModified signals.
const NOW = '2026-05-10T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Homepage
  urls.push({ url: `${BASE}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 });

  // Packages + hubs
  for (const p of packagesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/packages/${p.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
  }
  for (const h of hubsData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/packages/${h.slug}/`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 });
  }

  // Destination × City pages (14 destinations × 346 cities = ~4,844 city pages)
  const DEST_ROUTES = [
    { index: '/char-dham-from/', priority: 0.9 as const },
    { index: '/kedarnath-from/', priority: 0.9 as const },
    { index: '/kedarnath-helicopter-from/', priority: 0.9 as const },
    { index: '/badrinath-from/', priority: 0.8 as const },
    { index: '/do-dham-from/', priority: 0.8 as const },
    { index: '/rishikesh-from/', priority: 0.8 as const },
    { index: '/valley-of-flowers-from/', priority: 0.7 as const },
    { index: '/varanasi-from/', priority: 0.8 as const },
    { index: '/mussoorie-from/', priority: 0.7 as const },
    { index: '/nainital-from/', priority: 0.7 as const },
    { index: '/mathura-vrindavan-from/', priority: 0.8 as const },
    { index: '/ayodhya-from/', priority: 0.8 as const },
    { index: '/india-tour-from/', priority: 0.9 as const },
    { index: '/golden-triangle-from/', priority: 0.9 as const },
    { index: '/bali-from/', priority: 0.8 as const },
  ];

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

  // Category hub pages
  urls.push({ url: `${BASE}/himalayan-treks/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 });
  // Note: /bali-from/ and its city pages are included in DEST_ROUTES loop above

  // Static pages
  urls.push({ url: `${BASE}/about/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/contact/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/reviews/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/privacy/`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 });

  // Blog
  if (blogData.length > 0) {
    urls.push({ url: `${BASE}/blog/`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.8 });
    for (const p of blogData) {
      urls.push({ url: `${BASE}/blog/${p.slug}/`, lastModified: p.published, changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  // Compare
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
