import { notFound } from 'next/navigation';
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

  const title = `Bali Tour Package from ${city.name} 2025 | 7D6N from $530 | Junegiri Yatra`;
  const description = `Book 7D/6N Bali, Nusa Penida & Gili Party Escape from ${city.name} from $530/person. Scuba diving, ATV ride, parasailing & Nusa Penida west tour included. WhatsApp for instant quote.`;

  return {
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
