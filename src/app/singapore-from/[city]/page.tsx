import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug } from '@/lib/data';
import SingaporeCityPage from './CityPage';

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

  const title = `Singapore Tour Package from ${city.name} 2026 | 5N/6D from $680 | Junegiri Yatra`;
  const description = `Book 5N/6D Singapore — Gardens by the Bay, Sentosa, Singapore Zoo from ${city.name} from $680/person. No visa required for Indians. WhatsApp for instant quote.`;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `singapore tour package from ${city.name.toLowerCase()}, singapore trip from ${city.name.toLowerCase()}, gardens by the bay sentosa from ${city.name.toLowerCase()}, singapore holiday from ${city.name.toLowerCase()}, singapore tour from india no visa`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/singapore-from/${city.slug}/`,
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

  return <SingaporeCityPage city={city} />;
}
