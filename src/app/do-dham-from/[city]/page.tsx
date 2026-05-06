import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const DO_DHAM_CONFIG_BASE: DestinationConfig = {
  destination: 'Do Dham Yatra',
  destinationSlug: 'do-dham',
  routeBase: '/do-dham-from/',
  heroImage: '/images/kedarnath_temple_cover.jpg',
  packageSlug: 'do-dham-yatra-5n-6d',
  basePrice: 13500,
  duration: '5 Nights / 6 Days',
  tag: 'Complete · 5N/6D',
  overview: 'Do Dham Yatra — Kedarnath & Badrinath in one trip from Haridwar. Both Jyotirlinga + Vishnu shrine. Private vehicle, 5 hotels, guides, all permits.',
  highlights: [
    { name: 'Kedarnath Temple', alt: 'Day 3', desc: 'Lord Shiva Jyotirlinga · 3,584 m · 22 km trek from Gaurikund · helicopter option' },
    { name: 'Gaurikund', alt: 'Trek Base', desc: 'Hot springs · Gauri Devi Temple · start of Kedarnath trek · altitude 1,982 m' },
    { name: 'Badrinath Temple', alt: 'Day 5', desc: 'Lord Vishnu shrine · 3,133 m · evening aarti · Tapt Kund hot springs nearby' },
    { name: 'Mana Village', alt: 'Day 5', desc: 'Last Indian village · Vyas Gufa · Bhim Pul · Saraswati River · scenic meadows' },
  ],
  inclusions: [
    '5 nights hotels (Haridwar / Guptkashi / Kedarnath / Joshimath / Badrinath)',
    'All transfers by private vehicle',
    'Kedarnath trek guide + Badrinath pujari',
    'All temple permits & biometric',
    'Driver charges & tolls',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: '6 days covering both shrines — best combined pilgrimage from Haridwar.',
  sectionTitle: 'Kedarnath & Badrinath — Do Dham Circuit',
  sectionSub: '',  // pre-computed per city in Page()
  schemaType: 'Religious pilgrimage',
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

  const title = `Do Dham Yatra from ${city.name} 2026 | Kedarnath + Badrinath | Junegiri Yatra`;
  const description = `Book Do Dham Yatra (Kedarnath + Badrinath) from ${city.name} — all-inclusive 5N/6D from ₹13,500. Both Jyotirlinga + Vishnu shrine in one trip. ${city.total_time}. WhatsApp for ${city.name} quotes.`;

  return {
    title,
    description,
    keywords: `do dham yatra from ${city.name.toLowerCase()}, kedarnath badrinath from ${city.name.toLowerCase()}, do dham package ${city.name.toLowerCase()}, char dham tour ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.jpg' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/do-dham-from/${city.slug}/`,
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
    packages.find((p) => p.slug === DO_DHAM_CONFIG_BASE.packageSlug) ??
    packages.find((p) => p.slug.includes('do-dham')) ??
    packages[0];

  const config: DestinationConfig = {
    ...DO_DHAM_CONFIG_BASE,
    waMessage: `Namaste! I want to book Do Dham Yatra (Kedarnath + Badrinath) from ${city.name}. Please share details.`,
    sectionSub: `Both sacred shrines you will visit on Do Dham Yatra from ${city.name}.`,
  };

  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
