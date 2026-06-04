import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCityBySlug, getPackageBySlug } from '@/lib/data';
import TrekCityPage from '@/components/TrekCityPage';

// Dynamic ISR — rendered on demand, cached at CDN for 24 h
export const dynamic = 'force-dynamic';
export const revalidate = 86400;

// ── Trek seasons data (loaded at module level for server-side use) ──────────
let trekSeasonsData: Record<string, { months: string[]; season_label: string; best_months: string[] }> = {};
try {
  trekSeasonsData = require('../../../../../../data/trek-seasons.json');
} catch {}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const trekData = trekSeasonsData[slug];
  if (!city || !trekData) return {};

  const pkg = getPackageBySlug(slug);
  const trekName = pkg?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const price = pkg?.price_from ?? 9500;

  // Tier 3 cities (low/zero search demand) get noindex to protect site-wide quality signal
  const noindex = (city as unknown as { tier?: number }).tier === 3;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title: `${trekName} from ${city.name} — Trek Package | Junegiri Yatra`,
    // Always city-specific — never the generic package meta_description.
    // Prevents 9,367 city-from pages sharing the same description across city variants.
    description: `Book ${trekName} from ${city.name} — ${trekData.season_label} trek from ₹${price.toLocaleString('en-IN')}. Best: ${trekData.best_months.slice(0, 2).map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}. All-inclusive, expert guides. WhatsApp for a quote.`,
    keywords: `${trekName.toLowerCase()} from ${city.name.toLowerCase()}, ${slug} from ${city.name.toLowerCase()}, himalayan trek from ${city.name.toLowerCase()}, trek package ${city.name.toLowerCase()}`,
    alternates: {
      canonical: `https://junegiriyatra.com/trek/${slug}/from/${city.slug}/`,
    },
    openGraph: {
      title: `${trekName} from ${city.name} | Junegiri Yatra`,
      description: `${trekData.season_label} trek — best months: ${trekData.best_months.join(', ')}. All-inclusive from ₹${price.toLocaleString('en-IN')}/person.`,
      images: [{ url: pkg?.hero_image ?? 'https://junegiriyatra.com/images/trek_himalaya.webp' }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city: citySlug } = await params;

  // Validate both slug and city exist
  const trekData = trekSeasonsData[slug];
  if (!trekData) notFound();

  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const pkg = getPackageBySlug(slug);

  return (
    <TrekCityPage
      city={city}
      slug={slug}
      pkg={pkg}
      trekData={trekData}
    />
  );
}
