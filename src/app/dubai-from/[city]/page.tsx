import { notFound } from 'next/navigation';
import { fitTitle, fitDescription } from '@/lib/seoMeta';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug } from '@/lib/data';
import DubaiCityPage from './CityPage';

/* ── Static generation ─────────────────────────────────── */
export async function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

/* ── Per-page metadata ──────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  // Tier 3 cities (low/zero demand) get noindex to protect site-wide quality signal
  const noindex = (city as unknown as { tier?: number }).tier === 3;

  const title = fitTitle(`Dubai Tour Package from ${city.name}`, ['2026', '— 5N/6D from $750']);
  const description = fitDescription(`Book 5N/6D Dubai from ${city.name} from $750/person.`, ['Burj Khalifa, Desert Safari and Dhow Cruise, with UAE visa assistance.', 'WhatsApp for an instant quote.']);

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `dubai tour package from ${city.name.toLowerCase()}, dubai trip from ${city.name.toLowerCase()}, burj khalifa desert safari from ${city.name.toLowerCase()}, dubai holiday from ${city.name.toLowerCase()}, uae tour from india`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/dubai-from/${city.slug}/`,
    },
  };
}

/* ── Page component ─────────────────────────────────────── */
export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return <DubaiCityPage city={city} />;
}
