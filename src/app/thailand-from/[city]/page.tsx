import { notFound } from 'next/navigation';
import { fitTitle, fitDescription } from '@/lib/seoMeta';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug } from '@/lib/data';
import ThailandCityPage from './CityPage';

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

  const title = fitTitle(`Thailand Tour Package from ${city.name}`, ['2026', '— from $650']);
  const description = fitDescription(`Book 7N/8D Thailand from ${city.name} from $650/person.`, ['Bangkok, Phuket & Pattaya — Grand Palace, Phi Phi Islands & Coral Island.', 'WhatsApp for an instant quote.']);

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `thailand tour package from ${city.name.toLowerCase()}, thailand trip from ${city.name.toLowerCase()}, bangkok phuket pattaya from ${city.name.toLowerCase()}, phi phi islands tour from ${city.name.toLowerCase()}, thailand holiday from india`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/thailand-from/${city.slug}/`,
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

  return <ThailandCityPage city={city} />;
}
