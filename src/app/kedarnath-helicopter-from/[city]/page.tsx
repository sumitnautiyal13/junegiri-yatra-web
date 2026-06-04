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
    title: `Kedarnath Helicopter Tour from ${city.name} 2026 | Skip the Trek | Junegiri Yatra`,
    description: `Book Kedarnath helicopter darshan from ${city.name} — all-inclusive 2N/3D from ₹14,500. Fly from Phata or Sirsi helipad. Ideal for elderly, families, and short trips. WhatsApp for slots.`,
    keywords: `kedarnath helicopter from ${city.name.toLowerCase()}, kedarnath helicopter tour ${city.name.toLowerCase()}, kedarnath by helicopter from ${city.name.toLowerCase()}, kedarnath helicopter booking ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/kedarnath-helicopter-from/${city.slug}/` },
    openGraph: {
      title: `Kedarnath Helicopter Tour from ${city.name} | Skip the Trek`,
      description: `All-inclusive Kedarnath helicopter darshan from ${city.name} — 2N/3D from ₹14,500. Fly to the Jyotirlinga at 3,584 m.`,
      images: [{ url: 'https://junegiriyatra.com/images/kedarnath_helicopter.webp' }],
    },
  };
}

const HELI_CONFIG: DestinationConfig = {
  destination: 'Kedarnath Helicopter Darshan',
  destinationSlug: 'kedarnath-helicopter',
  routeBase: '/kedarnath-helicopter-from/',
  heroImage: '/images/kedarnath_helicopter.webp',
  packageSlug: 'kedarnath-helicopter-2n-3d',
  basePrice: 14500,
  duration: '2 Nights / 3 Days',
  tag: 'Skip the Trek · 2N/3D',
  overview: 'Fly directly to Kedarnath by helicopter — skip the 22 km trek. Return helicopter from Phata or Sirsi helipad, 2 nights hotel at Guptkashi, private vehicle, certified guide, and biometric registration. Ideal for elderly pilgrims, families, and anyone with limited time or mobility.',
  highlights: [
    { name: 'Kedarnath Helipad Arrival', alt: 'Day 2 Morning', desc: 'Fly from Phata or Sirsi helipad to Kedarnath at 3,584 m — 7–10 minute flight over the Mandakini valley · skip the 22 km trek both ways' },
    { name: 'Kedarnath Temple Darshan', alt: 'Day 2', desc: 'One of the 12 Jyotirlingas · Pancha Kedar of the Garhwal Himalayas · the temple was built by the Pandavas and restored by Adi Shankaracharya in the 8th century' },
    { name: 'Sandhya Aarti', alt: 'Day 2 Evening', desc: 'The evening aarti inside Kedarnath temple is one of the most atmospheric spiritual experiences in India · drums, incense, and Vedic chanting in the high Himalayas' },
    { name: 'Bhairavnath Temple', alt: 'Day 2', desc: 'The guardian deity of Kedarnath — a short walk from the main temple · Bhairav is worshipped before leaving the valley · important stop for completing the Kedarnath circuit' },
  ],
  inclusions: [
    'Return helicopter ticket (Phata or Sirsi to Kedarnath)',
    '2 nights hotel at Guptkashi (standard/deluxe options)',
    'Private AC vehicle from Haridwar to helipad and back',
    'Certified religious guide at Kedarnath',
    'Biometric registration and helicopter slot coordination',
    'Driver charges, tolls, and helipad transfer',
    '24/7 WhatsApp support',
  ],
  waMessage: '',
  extraFromHaridwar: 'Phata helipad is 200 km from Haridwar via Rishikesh and Rudraprayag — approx. 7 hrs drive. We pick up from Haridwar, Rishikesh, or Jolly Grant Airport.',
  sectionTitle: 'Your Kedarnath Helicopter Darshan Circuit',
  sectionSub: '',
  schemaType: 'Religious pilgrimage',
};

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const pkg = getAllPackages().find((p) => p.slug === HELI_CONFIG.packageSlug);
  const config = {
    ...HELI_CONFIG,
    waMessage: `Namaste! I want to book Kedarnath helicopter darshan from ${city!.name}. Please share package and slot details.`,
    sectionSub: `The four stops on your Kedarnath helicopter darshan circuit — experienced from ${city!.name}.`,
  };
  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
