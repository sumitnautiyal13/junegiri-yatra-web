import { notFound } from 'next/navigation';
import { fitTitle, fitDescription } from '@/lib/seoMeta';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug } from '@/lib/data';
import BaliCityPage from './CityPage';

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

  const title = fitTitle(`Bali Tour Package from ${city.name}`, ['2026', '— 7D/6N from $530']);
  const description = fitDescription(`Book 7D/6N Bali, Nusa Penida & Gili from ${city.name} from $530/person.`, ['Scuba diving, ATV ride & parasailing included.', 'WhatsApp for an instant quote.']);

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `bali tour package from ${city.name.toLowerCase()}, bali trip from ${city.name.toLowerCase()}, bali holiday from ${city.name.toLowerCase()}, nusa penida tour from ${city.name.toLowerCase()}, gili island package from india`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/bali-from/${city.slug}/`,
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

  return <BaliCityPage city={city} />;
}
