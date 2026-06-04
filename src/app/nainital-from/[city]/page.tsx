import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const NAINITAL_CONFIG: DestinationConfig = {
  destination: 'Nainital Tour',
  destinationSlug: 'nainital',
  routeBase: '/nainital-from/',
  heroImage: '/images/mountains1.webp',
  packageSlug: 'nainital-jim-corbett-4n-5d',
  basePrice: 7500,
  duration: '3 Nights / 4 Days',
  tag: 'Popular · 3N/4D',
  overview: 'Nainital tour with Jim Corbett — the famous lake town, boating on Naini Lake, Naina Devi Temple, snow viewpoint, and optional jungle safari at Corbett.',
  highlights: [
    { name: 'Naini Lake Boating', alt: 'Day 1', desc: 'Rowing & paddleboats · 1 km long natural lake · surrounded by 7 hills · cable car ride above the lake' },
    { name: 'Snow View Point', alt: 'Day 2 Morning', desc: 'Aerial ropeway to 2,270 m · panoramic Himalayan views · Nanda Devi, Trisul, Nandakot peaks visible' },
    { name: 'Naina Devi Temple', alt: 'Day 1', desc: 'One of 51 Shakti Peethas · on the north shore of Naini Lake · ancient temple · evening aarti' },
    { name: 'Jim Corbett Safari', alt: 'Day 3 Optional', desc: "India's oldest national park · Bengal tiger territory · jeep or canter safari · bird watching" },
  ],
  inclusions: [
    '3 nights hotel (lake view property)',
    'All transfers Haridwar–Nainital–Haridwar',
    'Naini Lake boating',
    'Snow View ropeway tickets',
    'Naina Devi temple guided visit',
    'Corbett safari optional add-on',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: '4-hr drive from Haridwar via Kaladungi. Can combine with Corbett National Park for 4N/5D.',
  sectionTitle: 'Nainital — The Lake District of India',
  sectionSub: '',  // pre-computed per city in Page()
  schemaType: 'Outdoor recreation',
};

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

  const title = `Nainital Tour from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Nainital tour from ${city.name} with Junegiri Yatra — Naini Lake boating, Snow View Point & Jim Corbett. ${city.total_time}. All-inclusive from ₹7,500. WhatsApp for ${city.name} quotes.`;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `nainital tour from ${city.name.toLowerCase()}, nainital trip from ${city.name.toLowerCase()}, nainital package ${city.name.toLowerCase()}, naini lake from ${city.name.toLowerCase()}, jim corbett from ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/nainital-from/${city.slug}/`,
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

  const packages = getAllPackages();
  const pkg =
    packages.find((p) => p.slug === NAINITAL_CONFIG.packageSlug) ??
    packages.find((p) => p.slug.includes('nainital')) ??
    packages[0];

  const config: DestinationConfig = {
    ...NAINITAL_CONFIG,
    waMessage: `Namaste! I want to book Nainital Tour from ${city.name}. Please share package details.`,
    sectionSub: `Everything included in your Nainital trip from ${city.name}.`,
  };
  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
