import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import CityPage from './CityPage';

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

  const title = `Char Dham Yatra from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Char Dham Yatra from ${city.name} — all-inclusive packages from ₹19,800. Travel time: ${city.total_time}. Haridwar-based operator, 4.8★ rated. WhatsApp for a quote.`;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `char dham yatra from ${city.name.toLowerCase()}, char dham package from ${city.name.toLowerCase()}, kedarnath from ${city.name.toLowerCase()}, badrinath from ${city.name.toLowerCase()}, do dham from ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: `https://junegiriyatra.com${city.hero_image}` }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/char-dham-from/${city.slug}/`,
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

  // Pick the Char Dham flagship package for the CTA card
  const packages = getAllPackages();
  const charDhamPkg =
    packages.find((p) => p.slug === 'char-dham-yatra') ??
    packages.find((p) => p.slug.includes('char-dham')) ??
    packages[0];

  return <CityPage city={city} charDhamPkg={charDhamPkg} />;
}
