import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage from '@/components/DestinationCityPage';
import type { DestinationConfig } from '@/components/DestinationCityPage';

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  // Tier 3 cities (low/zero demand) get noindex to protect site-wide quality signal
  const noindex = (city as unknown as { tier?: number }).tier === 3;
  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title: `Kedarnath Yatra from ${city.name} 2026 | Junegiri Yatra`,
    description: `Book Kedarnath Yatra from ${city.name} — all-inclusive 3N/4D from ₹8,500. Haridwar-based operator. Helicopter option available. WhatsApp for quote.`,
    keywords: `kedarnath yatra from ${city.name.toLowerCase()}, kedarnath package from ${city.name.toLowerCase()}, kedarnath tour ${city.name.toLowerCase()}, kedarnath yatra booking ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/kedarnath-from/${city.slug}/` },
    openGraph: { title: `Kedarnath Yatra from ${city.name}`, description: `All-inclusive Kedarnath package from ${city.name} — 3N/4D from ₹8,500.`, images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp' }] },
  };
}

const KEDARNATH_CONFIG: DestinationConfig = {
  destination: 'Kedarnath Yatra',
  destinationSlug: 'kedarnath',
  routeBase: '/kedarnath-from/',
  heroImage: '/images/kedarnath_temple_cover.webp',
  packageSlug: 'kedarnath-yatra-3n-4d',
  basePrice: 8500,
  duration: '3 Nights / 4 Days',
  tag: 'Most Popular · 3N/4D',
  overview: 'Complete Kedarnath Yatra from Haridwar — private vehicle, hotels, guide, all permits included. Trek or helicopter to the Jyotirlinga.',
  highlights: [
    { name: 'Kedarnath Temple', alt: 'Day 2', desc: 'One of 12 Jyotirlingas · 3,584 m altitude · 22 km trek from Gaurikund or helicopter' },
    { name: 'Gaurikund', alt: 'Trek Base', desc: 'Hot springs · Gauri Devi Temple · start of Kedarnath trek · altitude 1,982 m' },
    { name: 'Guptkashi', alt: 'Overnight', desc: 'Night halt · Vishwanath Temple · Ardhnarishwar shrine · scenic valley' },
    { name: 'Sonprayag', alt: 'Day 2', desc: 'Confluence of Mandakini & Songanga · holy dip spot · last motorable point' },
  ],
  inclusions: ['2 nights hotel (Guptkashi / Sonprayag)', 'All transfers by private vehicle', 'Kedarnath trek guide', 'Forest & temple permits', 'Biometric registration', 'Driver charges & tolls'],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Plus 6-hr drive Haridwar → Guptkashi/Sonprayag on Day 1.',
  sectionTitle: 'The Sacred Kedarnath Circuit',
  sectionSub: '',  // pre-computed per city in Page()
  schemaType: 'Religious pilgrimage',
};

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const pkg = getAllPackages().find((p) => p.slug === KEDARNATH_CONFIG.packageSlug);
  const config = {
    ...KEDARNATH_CONFIG,
    waMessage: `Namaste! I want to book Kedarnath Yatra from ${city!.name}. Please share package details.`,
    sectionSub: `Everything you will see on your Kedarnath Yatra from ${city!.name}.`,
  };
  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
