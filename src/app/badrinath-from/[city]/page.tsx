import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const BADRINATH_CONFIG_BASE: DestinationConfig = {
  destination: 'Badrinath Yatra',
  destinationSlug: 'badrinath',
  routeBase: '/badrinath-from/',
  heroImage: '/images/badrinath_temple.jpg',
  packageSlug: 'badrinath-yatra-2n-3d',
  basePrice: 6500,
  duration: '2 Nights / 3 Days',
  tag: 'Best Value · 2N/3D',
  overview: 'Complete Badrinath Yatra from Haridwar — one of the Char Dham shrines, Mana Village (last Indian village), and Vasudhara Falls. Private vehicle, hotels, pujari guide included.',
  highlights: [
    { name: 'Badrinath Temple', alt: 'Day 2', desc: 'Lord Vishnu shrine · 3,133 m · one of 108 Divya Desams · evening aarti' },
    { name: 'Mana Village', alt: 'Day 2', desc: 'Last Indian village before Tibet · Vyas Gufa · Ganesh Gufa · Saraswati River' },
    { name: 'Vasudhara Falls', alt: 'Day 2', desc: '145 m waterfall · 3 km walk from Mana · considered sacred' },
    { name: 'Devprayag', alt: 'Drive', desc: 'Confluence of Alaknanda & Bhagirathi · where Ganga is born · photostop' },
  ],
  inclusions: [
    '2 nights hotel (Joshimath / Badrinath)',
    'All transfers by private vehicle',
    'Badrinath pujari-guide',
    'Temple entry & permits',
    'Mana village guided walk',
    'Driver charges & tolls',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Plus 8-hr drive Haridwar → Joshimath on Day 1.',
  sectionTitle: 'The Sacred Badrinath Circuit',
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

  const title = `Badrinath Yatra from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Badrinath Yatra from ${city.name} with Junegiri Yatra — all-inclusive 2N/3D from ₹6,500. Mana Village & Vasudhara Falls included. ${city.total_time}. WhatsApp for ${city.name} quotes.`;

  return {
    title,
    description,
    keywords: `badrinath yatra from ${city.name.toLowerCase()}, badrinath package from ${city.name.toLowerCase()}, badrinath tour ${city.name.toLowerCase()}, badrinath yatra booking ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/badrinath_temple.jpg' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/badrinath-from/${city.slug}/`,
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
    packages.find((p) => p.slug === BADRINATH_CONFIG_BASE.packageSlug) ??
    packages.find((p) => p.slug.includes('badrinath')) ??
    packages[0];

  const config: DestinationConfig = {
    ...BADRINATH_CONFIG_BASE,
    waMessage: `Namaste! I want to book Badrinath Yatra from ${city.name}. Please share package details.`,
    sectionSub: `Everything you will see on your Badrinath Yatra from ${city.name}.`,
  };

  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
