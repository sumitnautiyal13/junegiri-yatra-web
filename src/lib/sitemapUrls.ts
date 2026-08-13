/**
 * Sitemap URL builders + XML serialisation, shared by the four sitemap routes.
 *
 * The sitemap is split into an index (/sitemap.xml) with three children:
 *   /sitemap-content.xml    ~400 genuinely unique content URLs
 *   /sitemap-dest-from.xml  ~6,300 /{dest}-from/{city}/ programmatic URLs
 *   /sitemap-trek-from.xml  ~6,300 /trek/{slug}/from/{city}/ programmatic URLs
 *
 * WHY SPLIT: as one flat file, Search Console reports coverage for the whole
 * site as a single number, so you cannot tell whether /compare/ indexes at a
 * different rate than /kedarnath-from/. Splitting by content type turns
 * indexation from a guess into a measurement — the prerequisite for deciding
 * what to prune and which of the two overlapping from-city systems should win.
 *
 * WHY NOT Next's generateSitemaps(): it serves children at /sitemap/{id}.xml
 * and does NOT emit an index at /sitemap.xml. robots.txt already advertises
 * /sitemap.xml and Google has it on file, so that route must keep working.
 * Hand-rolling the index keeps the known URL valid and gives predictable
 * child URLs.
 *
 * LASTMOD POLICY: every date is derived from the underlying data, never
 * hardcoded. This file used to emit a hand-edited constant that left 12,655
 * URLs (97%) stamped 2026-04-15 and 117 days stale. Google discounts lastmod
 * it finds unreliable, so where the data carries no honest timestamp the
 * element is OMITTED rather than invented.
 */

import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';
import yogaData from '../../data/yoga-programs.json';
import intlCitiesData from '../../data/international-cities.json';
import intlPackagesData from '../../data/international-packages.json';
import blogJson from '../../data/blog-posts.json';
import comparisonsJson from '../../data/comparisons.json';
import bestTimeJson from '../../data/best-time.json';
import trekSeasonsJson from '../../data/trek-seasons.json';

const blogData = blogJson as Array<{ slug: string; published: string }>;
const comparisonsData = comparisonsJson as Array<{ slug: string }>;
const bestTimeData = bestTimeJson as Array<{ slug: string }>;
const trekSeasonsData = trekSeasonsJson as unknown as Record<string, { months: string[] }>;

export const BASE = 'https://junegiriyatra.com';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
}

/* ── Real dates, derived from the data ───────────────────────────────────── */

const isDate = (v: unknown): v is string => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);

function maxDate(values: unknown[]): string | undefined {
  const dates = values.filter(isDate).sort();
  return dates.length ? dates[dates.length - 1] : undefined;
}

const typedPackages = packagesData as Array<{ slug: string; last_updated?: string }>;

/** Newest package edit — the data behind every package and city page. */
const PACKAGES_UPDATED = maxDate(typedPackages.map((p) => p.last_updated));
/** Newest blog post — drives the blog hub; posts carry their own date. */
const BLOG_UPDATED = maxDate(blogData.map((p) => p.published));
/**
 * City and trek×city pages are templates rendered from packages.json +
 * cities.json, so the honest "last modified" is when that source data changed —
 * not the day the sitemap happened to be regenerated.
 */
const CITY_PAGE_UPDATED = PACKAGES_UPDATED;

const DEST_ROUTES = [
  { index: '/char-dham-from/',            priority: 0.9 },
  { index: '/kedarnath-from/',            priority: 0.9 },
  { index: '/kedarnath-helicopter-from/', priority: 0.9 },
  { index: '/char-dham-helicopter-from/', priority: 0.9 },
  { index: '/badrinath-from/',            priority: 0.8 },
  { index: '/do-dham-from/',              priority: 0.8 },
  { index: '/rishikesh-from/',            priority: 0.8 },
  { index: '/valley-of-flowers-from/',    priority: 0.7 },
  { index: '/varanasi-from/',             priority: 0.8 },
  { index: '/mussoorie-from/',            priority: 0.7 },
  { index: '/nainital-from/',             priority: 0.7 },
  { index: '/mathura-vrindavan-from/',    priority: 0.8 },
  { index: '/ayodhya-from/',              priority: 0.8 },
  { index: '/india-tour-from/',           priority: 0.9 },
  { index: '/golden-triangle-from/',      priority: 0.9 },
  { index: '/bali-from/',                 priority: 0.8 },
  { index: '/thailand-from/',             priority: 0.7 },
  { index: '/dubai-from/',                priority: 0.7 },
  { index: '/singapore-from/',            priority: 0.7 },
];

/** Tier-3 cities are served noindex, so they must never enter the sitemap —
 *  a noindexed URL in a sitemap is a contradictory crawl signal. */
function indexableCities() {
  return (citiesData as Array<{ slug: string; tier?: string | number }>)
    .filter((c) => String(c.tier) !== '3');
}

/* ── The three children ──────────────────────────────────────────────────── */

export function contentUrls(): SitemapEntry[] {
  const urls: SitemapEntry[] = [];

  urls.push({ url: `${BASE}/`, lastmod: PACKAGES_UPDATED, changefreq: 'weekly', priority: 1.0 });
  urls.push({ url: `${BASE}/packages/`, lastmod: PACKAGES_UPDATED, changefreq: 'weekly', priority: 0.9 });

  // Packages carry their own edit date.
  for (const p of typedPackages) {
    urls.push({ url: `${BASE}/packages/${p.slug}/`, lastmod: p.last_updated, changefreq: 'monthly', priority: 0.8 });
  }

  const HUB_CONTENT_SLUGS = new Set(['taj-mahal-tours', 'uttarakhand-tours', 'char-dham-yatra', 'rishikesh-adventures', 'golden-triangle']);
  for (const h of hubsData as Array<{ slug: string }>) {
    if (HUB_CONTENT_SLUGS.has(h.slug)) {
      urls.push({ url: `${BASE}/packages/${h.slug}/`, lastmod: PACKAGES_UPDATED, changefreq: 'weekly', priority: 0.9 });
    }
  }

  // Destination index pages (their city pages live in the dest-from child).
  for (const dest of DEST_ROUTES) {
    urls.push({ url: `${BASE}${dest.index}`, lastmod: CITY_PAGE_UPDATED, changefreq: 'monthly', priority: dest.priority });
  }

  // Trek × Month
  for (const [slug, data] of Object.entries(trekSeasonsData)) {
    for (const month of data.months) {
      urls.push({ url: `${BASE}/packages/${slug}/${month}/`, lastmod: PACKAGES_UPDATED, changefreq: 'monthly', priority: 0.6 });
    }
  }

  // Trek from-index pages (their city pages live in the trek-from child).
  for (const slug of Object.keys(trekSeasonsData)) {
    urls.push({ url: `${BASE}/trek/${slug}/from/`, lastmod: PACKAGES_UPDATED, changefreq: 'monthly', priority: 0.7 });
  }

  urls.push({ url: `${BASE}/himalayan-treks/`, lastmod: PACKAGES_UPDATED, changefreq: 'monthly', priority: 0.9 });

  // No honest timestamp in the data for these — lastmod deliberately omitted.
  urls.push({ url: `${BASE}/spiti-valley/`, changefreq: 'monthly', priority: 0.8 });
  urls.push({ url: `${BASE}/ladakh/`, changefreq: 'monthly', priority: 0.8 });
  urls.push({ url: `${BASE}/about/`, changefreq: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/contact/`, changefreq: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/reviews/`, changefreq: 'monthly', priority: 0.7 });
  urls.push({ url: `${BASE}/privacy/`, changefreq: 'yearly', priority: 0.3 });

  // Blog — real per-post dates.
  if (blogData.length > 0) {
    urls.push({ url: `${BASE}/blog/`, lastmod: BLOG_UPDATED, changefreq: 'weekly', priority: 0.8 });
    for (const p of blogData) {
      urls.push({ url: `${BASE}/blog/${p.slug}/`, lastmod: p.published, changefreq: 'monthly', priority: 0.7 });
    }
  }

  urls.push({ url: `${BASE}/compare/`, changefreq: 'weekly', priority: 0.8 });
  for (const c of comparisonsData) {
    urls.push({ url: `${BASE}/compare/${c.slug}/`, changefreq: 'monthly', priority: 0.6 });
  }

  urls.push({ url: `${BASE}/best-time/`, changefreq: 'weekly', priority: 0.8 });
  for (const d of bestTimeData) {
    urls.push({ url: `${BASE}/best-time/${d.slug}/`, changefreq: 'monthly', priority: 0.7 });
  }

  urls.push({ url: `${BASE}/international/`, changefreq: 'weekly', priority: 0.9 });
  for (const p of intlPackagesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/international/${p.slug}/`, changefreq: 'monthly', priority: 0.85 });
  }
  urls.push({ url: `${BASE}/india-trek-packages/from/`, changefreq: 'monthly', priority: 0.8 });
  for (const c of intlCitiesData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/india-trek-packages/from/${c.slug}/`, changefreq: 'monthly', priority: 0.75 });
  }

  urls.push({ url: `${BASE}/yoga/`, changefreq: 'monthly', priority: 0.9 });
  for (const y of yogaData as Array<{ slug: string }>) {
    urls.push({ url: `${BASE}/yoga/${y.slug}/`, changefreq: 'monthly', priority: 0.85 });
    for (const h of ['100hours', '200hours', '300hours']) {
      urls.push({ url: `${BASE}/yoga/${y.slug}/${h}/`, changefreq: 'monthly', priority: 0.8 });
    }
  }

  return urls;
}

export function destFromUrls(): SitemapEntry[] {
  const cities = indexableCities();
  const urls: SitemapEntry[] = [];
  for (const dest of DEST_ROUTES) {
    for (const c of cities) {
      urls.push({
        url: `${BASE}${dest.index}${c.slug}/`,
        lastmod: CITY_PAGE_UPDATED,
        changefreq: 'monthly',
        priority: Number((dest.priority - 0.1).toFixed(2)),
      });
    }
  }
  return urls;
}

export function trekFromUrls(): SitemapEntry[] {
  const cities = indexableCities();
  const urls: SitemapEntry[] = [];
  for (const slug of Object.keys(trekSeasonsData)) {
    for (const c of cities) {
      urls.push({ url: `${BASE}/trek/${slug}/from/${c.slug}/`, lastmod: CITY_PAGE_UPDATED, changefreq: 'monthly', priority: 0.65 });
    }
  }
  return urls;
}

/* ── Serialisation ───────────────────────────────────────────────────────── */

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export function renderUrlset(entries: SitemapEntry[]): string {
  const body = entries
    .map((e) => {
      const parts = [`<loc>${escapeXml(e.url)}</loc>`];
      if (e.lastmod) parts.push(`<lastmod>${e.lastmod}</lastmod>`);
      if (e.changefreq) parts.push(`<changefreq>${e.changefreq}</changefreq>`);
      if (e.priority !== undefined) parts.push(`<priority>${e.priority}</priority>`);
      return `<url>${parts.join('')}</url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function renderSitemapIndex(children: Array<{ loc: string; lastmod?: string }>): string {
  const body = children
    .map((c) => {
      const parts = [`<loc>${escapeXml(c.loc)}</loc>`];
      if (c.lastmod) parts.push(`<lastmod>${c.lastmod}</lastmod>`);
      return `<sitemap>${parts.join('')}</sitemap>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

/** Newest lastmod inside a child, for the index entry. */
export function newestLastmod(entries: SitemapEntry[]): string | undefined {
  return maxDate(entries.map((e) => e.lastmod));
}

export const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800',
};
