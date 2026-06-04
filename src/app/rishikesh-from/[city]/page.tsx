import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const RISHIKESH_CONFIG: DestinationConfig = {
  destination: 'Rishikesh Adventure',
  destinationSlug: 'rishikesh',
  routeBase: '/rishikesh-from/',
  heroImage: '/images/rishikesh_bridge.webp',
  packageSlug: 'rishikesh-adventure-pack-2n-3d',
  basePrice: 5500,
  duration: '2 Nights / 3 Days',
  tag: 'Bestseller · 2N/3D',
  overview: 'Rishikesh adventure package — rafting, bungee jumping, camping, kayaking. All gear included, certified guides, departure from Haridwar.',
  highlights: [
    { name: 'River Rafting', alt: 'Day 1 & 2', desc: 'Shivpuri 16 km or Marine Drive 26 km · Grade III-IV rapids · certified guides' },
    { name: 'Bungee Jumping', alt: 'Day 2', desc: "83 m · India's highest · Jumpin' Heights · no experience needed" },
    { name: 'Ganga Beach Camp', alt: 'Night 1-2', desc: 'Bonfire · BBQ dinner · sleeping under stars · riverside camping' },
    { name: 'Kayaking & Cliff Jump', alt: 'Day 2', desc: 'Beginner-friendly kayaking · supervised cliff jumping · body surfing' },
  ],
  inclusions: [
    '2 nights riverside camping / budget hotel',
    'All meals (Day 1 dinner to Day 3 breakfast)',
    'Rafting with equipment',
    'Bungee jump (1 per person)',
    'Kayaking session',
    'Bonfire & bonding activities',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Rishikesh is just 30 min from Haridwar — one of the easiest Himalayan getaways.',
  sectionTitle: 'What You Do in Rishikesh',
  sectionSub: '',  // pre-computed per city in Page()
  schemaType: 'Adventure tourism',
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

  const title = `Rishikesh Trip from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Rishikesh adventure trip from ${city.name} with Junegiri Yatra — rafting, bungee jumping & riverside camping. ${city.total_time}. All-inclusive from ₹5,500. WhatsApp for ${city.name} quotes.`;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `rishikesh trip from ${city.name.toLowerCase()}, rishikesh adventure from ${city.name.toLowerCase()}, rishikesh rafting ${city.name.toLowerCase()}, rishikesh weekend ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/rishikesh_bridge.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/rishikesh-from/${city.slug}/`,
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
    packages.find((p) => p.slug === RISHIKESH_CONFIG.packageSlug) ??
    packages.find((p) => p.slug.includes('rishikesh')) ??
    packages[0];

  const config = {
    ...RISHIKESH_CONFIG,
    waMessage: `Namaste! I want to book Rishikesh adventure trip from ${city.name}. Please share details.`,
    sectionSub: `Every activity included in your Rishikesh package from ${city.name}.`,
  };
  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
