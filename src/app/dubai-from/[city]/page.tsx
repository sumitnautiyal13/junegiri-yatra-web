import { notFound } from 'next/navigation';
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

  const title = `Dubai Tour Package from ${city.name} 2026 | 5N/6D from $750 | Junegiri Yatra`;
  const description = `Book 5N/6D Dubai — Burj Khalifa, Desert Safari, Dhow Cruise from ${city.name} from $750/person. Direct flights available. UAE visa assistance included. WhatsApp for instant quote.`;

  return {
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
