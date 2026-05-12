import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const VOF_CONFIG: DestinationConfig = {
  destination: 'Valley of Flowers Trek',
  destinationSlug: 'valley-of-flowers',
  routeBase: '/valley-of-flowers-from/',
  heroImage: '/images/valley_flowers.webp',
  packageSlug: 'valley-of-flowers-trek-4n-5d',
  basePrice: 8500,
  duration: '4 Nights / 5 Days',
  tag: 'UNESCO World Heritage · Jul–Sep',
  overview: 'Valley of Flowers 4N/5D from Haridwar — UNESCO heritage site, 500+ wildflower species, Hemkund Sahib Gurudwara. All permits and accommodation included.',
  highlights: [
    { name: 'Valley of Flowers', alt: 'Day 3', desc: 'UNESCO World Heritage · 3,658 m · 500+ wildflower species · Bhyundar Valley' },
    { name: 'Hemkund Sahib', alt: 'Day 4', desc: "Sacred Sikh Gurudwara · 4,329 m · glacial lake · world's highest gurudwara" },
    { name: 'Ghangaria', alt: 'Base Camp', desc: 'Trek base camp · 3,050 m · last accommodation point · helicopter available' },
    { name: 'Govindghat', alt: 'Day 2', desc: 'Entry point · holy sangam of Alaknanda & Lakshman Ganga · scenic drive from Haridwar' },
  ],
  inclusions: [
    '4 nights accommodation (Ghangaria guesthouses)',
    'All meals on trek',
    'Govindghat–Ghangaria trek guide',
    'Valley of Flowers entry permit',
    'Hemkund Sahib day visit',
    'Transport Haridwar–Govindghat–Haridwar',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Plus 10-hr drive Haridwar → Govindghat (Day 1). Trek starts Day 2.',
  sectionTitle: 'The Valley of Flowers Trek Highlights',
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

  const title = `Valley of Flowers Trek from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Valley of Flowers trek from ${city.name} with Junegiri Yatra — UNESCO heritage, 500+ wildflower species, Hemkund Sahib. ${city.total_time}. All-inclusive from ₹8,500. Open July–September.`;

  return {
    title,
    description,
    keywords: `valley of flowers trek from ${city.name.toLowerCase()}, valley of flowers ${city.name.toLowerCase()}, hemkund sahib from ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/valley_flowers.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/valley-of-flowers-from/${city.slug}/`,
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
    packages.find((p) => p.slug === VOF_CONFIG.packageSlug) ??
    packages.find((p) => p.slug.includes('valley')) ??
    packages[0];

  const config = {
    ...VOF_CONFIG,
    waMessage: `Namaste! I want to book Valley of Flowers Trek from ${city!.name}. Please share 2026 details.`,
    sectionSub: `What you see on the Valley of Flowers trek from ${city!.name}.`,
  };
  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
