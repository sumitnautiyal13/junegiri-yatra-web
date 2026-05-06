import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const MUSSOORIE_CONFIG: DestinationConfig = {
  destination: 'Mussoorie Tour',
  destinationSlug: 'mussoorie',
  routeBase: '/mussoorie-from/',
  heroImage: '/images/mountains2.jpg',
  packageSlug: 'mussoorie-dehradun-3n-4d',
  basePrice: 5500,
  duration: '2 Nights / 3 Days',
  tag: 'Weekend Getaway · 2N/3D',
  overview: 'Mussoorie weekend getaway from Haridwar — Queen of the Hills, Kempty Falls, Gun Hill, Mall Road. Perfect family or couple retreat.',
  highlights: [
    { name: 'Kempty Falls', alt: 'Day 1', desc: 'Stunning multi-tier waterfall · 15 km from Mussoorie · swim in natural pools · surrounded by mountains' },
    { name: 'Gun Hill & Cable Car', alt: 'Day 2 Morning', desc: 'Second highest peak in Mussoorie · ropeway ride · 360° Himalayan views on clear days' },
    { name: 'Mall Road & Camel Back', alt: 'Day 2', desc: 'Iconic promenade · shopping · local eateries · evening stroll · colonial architecture' },
    { name: 'Lal Tibba', alt: 'Day 2', desc: 'Highest point in Mussoorie · spectacular sunrise views · Doon Valley panorama · Himalayan peaks visible' },
  ],
  inclusions: [
    '2 nights hotel (3-star, Mall Road area)',
    'All transfers Haridwar–Mussoorie–Haridwar',
    'Kempty Falls excursion',
    'Gun Hill cable car tickets',
    'Breakfast both mornings',
    'Local sightseeing by cab',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Just 90 min from Haridwar — easiest Himalayan hill station escape from the plains.',
  sectionTitle: 'Mussoorie — Queen of the Hills',
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

  const title = `Mussoorie Trip from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Mussoorie weekend getaway from ${city.name} with Junegiri Yatra — Kempty Falls, Gun Hill & Mall Road. ${city.total_time}. All-inclusive from ₹5,500. WhatsApp for ${city.name} quotes.`;

  return {
    title,
    description,
    keywords: `mussoorie trip from ${city.name.toLowerCase()}, mussoorie tour from ${city.name.toLowerCase()}, mussoorie weekend ${city.name.toLowerCase()}, kempty falls from ${city.name.toLowerCase()}, mussoorie package ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/mountains2.jpg' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/mussoorie-from/${city.slug}/`,
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
    packages.find((p) => p.slug === MUSSOORIE_CONFIG.packageSlug) ??
    packages.find((p) => p.slug.includes('mussoorie')) ??
    packages[0];

  const config: DestinationConfig = {
    ...MUSSOORIE_CONFIG,
    waMessage: `Namaste! I want to book Mussoorie Tour from ${city.name}. Please share package details.`,
    sectionSub: `Everything included in your Mussoorie weekend trip from ${city.name}.`,
  };
  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
