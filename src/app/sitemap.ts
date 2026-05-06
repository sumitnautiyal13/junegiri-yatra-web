import type { MetadataRoute } from 'next';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';

// Import optional data files only if they exist
let blogData: Array<{ slug: string; published: string }> = [];
let comparisonsData: Array<{ slug: string }> = [];
let bestTimeData: Array<{ slug: string }> = [];

try { blogData = require('../../data/blog-posts.json'); } catch {}
try { comparisonsData = require('../../data/comparisons.json'); } catch {}
try { bestTimeData = require('../../data/best-time.json'); } catch {}

const BASE = 'https://junegiriyatra.com';
const NOW = new Date().toISOString();

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

  // Char Dham from cities
  urls.push({ url: `${BASE}/char-dham-from/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
  for (const c of citiesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/char-dham-from/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/kedarnath-from/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/rishikesh-from/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });
    urls.push({ url: `${BASE}/valley-of-flowers-from/${c.slug}/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 });
  }
  urls.push({ url: `${BASE}/kedarnath-from/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
  urls.push({ url: `${BASE}/rishikesh-from/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 });
  urls.push({ url: `${BASE}/valley-of-flowers-from/`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 });

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

  return urls;
}
