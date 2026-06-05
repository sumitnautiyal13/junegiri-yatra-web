import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const noindex = (city as unknown as { tier?: number }).tier === 3;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title: `Char Dham Yatra by Helicopter from ${city.name} 2026 | All 4 Dhams by Air`,
    description: `Book Char Dham Yatra by helicopter from ${city.name} — all 4 dhams (Yamunotri, Gangotri, Kedarnath, Badrinath) by air. 7N/8D from ₹2,50,000/person. VVIP darshan, luxury hotels. WhatsApp for slots.`,
    keywords: `char dham helicopter from ${city.name.toLowerCase()}, char dham by helicopter ${city.name.toLowerCase()}, char dham helicopter yatra from ${city.name.toLowerCase()}, helicopter yatra ${city.name.toLowerCase()}`,
    alternates: {
      canonical: `https://junegiriyatra.com/char-dham-helicopter-from/${city.slug}/`,
    },
    openGraph: {
      title: `Char Dham Helicopter Yatra from ${city.name} | Junegiri Yatra`,
      description: `All 4 Char Dhams by helicopter from ${city.name} — 7N/8D from ₹2,50,000/person. Luxury pilgrimage with VVIP darshan.`,
      images: [{ url: 'https://junegiriyatra.com/images/kedarnath2.webp' }],
    },
  };
}

const CHAR_DHAM_HELI_CONFIG: DestinationConfig = {
  destination: 'Char Dham Yatra by Helicopter',
  destinationSlug: 'char-dham-helicopter',
  routeBase: '/char-dham-helicopter-from/',
  heroImage: '/images/kedarnath2.webp',
  packageSlug: 'char-dham-helicopter-7n-8d',
  basePrice: 250000,
  duration: '7 Nights / 8 Days',
  tag: 'All 4 Dhams · Helicopter · VVIP',
  overview: 'Experience all four Char Dhams — Yamunotri, Gangotri, Kedarnath, and Badrinath — entirely by helicopter in 8 days. The ultimate luxury pilgrimage with VVIP darshan slots, 5-star hotels, dedicated coordinator, and zero trekking. Ideal for senior citizens, VIP pilgrims, and international devotees.',
  highlights: [
    { name: 'Yamunotri by Helicopter', alt: 'Day 2', desc: 'Fly to Yamunotri — source of Yamuna river · sacred Surya Kund hot spring · first Dham completed without the 14 km trek' },
    { name: 'Gangotri Darshan', alt: 'Day 3', desc: 'Helicopter to Gangotri at 3,048m — source of Ganga river · Bhagirathi Shila · Vishwanath temple darshan' },
    { name: 'Kedarnath by Helicopter', alt: 'Day 5', desc: 'Fly from Phata/Sitapur to Kedarnath Jyotirlinga at 3,583m — no 16 km trek · VVIP darshan slot pre-booked · Bhairavnath temple' },
    { name: 'Badrinath Darshan', alt: 'Day 7', desc: 'Badrinarayan Vishnu temple at 3,133m · Tapt Kund sacred hot spring · Brahma Kapal · Mana village — India\'s last village' },
  ],
  inclusions: [
    'Return helicopter tickets for all 4 Dhams',
    '7 nights luxury hotel accommodation',
    'All meals (Day 1 dinner to Day 8 breakfast)',
    'VVIP pre-booked darshan slots at all 4 shrines',
    'Dedicated pilgrimage coordinator throughout',
    'Private luxury vehicle for all ground transfers',
    'All helipad fees and permits',
    'Travel insurance (helicopter-grade)',
  ],
  waMessage: '',
  extraFromHaridwar: 'The Char Dham Helicopter circuit departs from Dehradun (Sahastradhara helipad) or Haridwar. We arrange pickup from your city, Haridwar, Rishikesh, or Jolly Grant Airport (Dehradun). All helipad transfers included.',
  sectionTitle: 'Your Char Dham Helicopter Pilgrimage Circuit',
  sectionSub: '',
  schemaType: 'Religious pilgrimage',
};

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const pkg = getAllPackages().find((p) => p.slug === CHAR_DHAM_HELI_CONFIG.packageSlug);
  const config: DestinationConfig = {
    ...CHAR_DHAM_HELI_CONFIG,
    waMessage: `Namaste! I want to book Char Dham Yatra by helicopter from ${city!.name}. Please share slot availability and pricing.`,
    sectionSub: `All four sacred Char Dhams covered by helicopter — experienced from ${city!.name}.`,
  };

  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
