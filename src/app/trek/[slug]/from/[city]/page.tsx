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

  return {
    title: `${trekName} from ${city.name} — Trek Package | Junegiri Yatra`,
    description:
      pkg?.meta_description ??
      `Book ${trekName} from ${city.name} — all-inclusive trek package from ₹${price.toLocaleString('en-IN')}. Haridwar-based operator with expert guides. WhatsApp for a custom quote.`,
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
