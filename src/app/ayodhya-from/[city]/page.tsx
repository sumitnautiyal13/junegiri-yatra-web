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
    title: `Ayodhya Tour from ${city.name} 2026 | Ram Mandir Darshan | Junegiri Yatra`,
    description: `Book Ayodhya Ram Mandir darshan tour from ${city.name} — all-inclusive 1N/2D from ₹5,500. Ram Ki Paidi, Hanuman Garhi, Kanak Bhawan. WhatsApp for quote.`,
    keywords: `ayodhya tour from ${city.name.toLowerCase()}, ayodhya ram mandir darshan from ${city.name.toLowerCase()}, ayodhya package ${city.name.toLowerCase()}, ram mandir tour ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/ayodhya-from/${city.slug}/` },
    openGraph: {
      title: `Ayodhya Tour from ${city.name} | Ram Mandir Darshan`,
      description: `All-inclusive Ayodhya darshan from ${city.name} — 1N/2D from ₹5,500.`,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
    },
  };
}

const AYODHYA_CONFIG: DestinationConfig = {
  destination: 'Ayodhya Ram Mandir Tour',
  destinationSlug: 'ayodhya',
  routeBase: '/ayodhya-from/',
  heroImage: '/images/mountains1.webp',
  packageSlug: 'ayodhya-tour',
  basePrice: 5500,
  duration: '1 Night / 2 Days',
  tag: 'Most Popular · 1N/2D',
  overview: 'Complete Ayodhya Ram Mandir darshan — Ram Lalla temple, Ram Ki Paidi aarti, Hanuman Garhi, Kanak Bhawan, and Nageshwarnath Temple. Private vehicle, hotel near Ram Mandir, certified guide.',
  highlights: [
    { name: 'Ram Mandir (Ram Lalla)', alt: 'Day 1', desc: 'The newly consecrated grand Ram Mandir — inaugurated January 2024 · built at the birthplace of Lord Ram · one of India\'s largest temples' },
    { name: 'Ram Ki Paidi Aarti', alt: 'Day 1 Evening', desc: 'Evening aarti at Ram Ki Paidi — 14 ghats on the sacred Sarayu river · equal in merit to bathing in the Ganga according to scripture' },
    { name: 'Hanuman Garhi', alt: 'Day 2', desc: '76 steps to the hilltop Hanuman temple · fort-like structure guarding Ayodhya · must-visit before Ram Mandir by tradition' },
    { name: 'Kanak Bhawan', alt: 'Day 2', desc: 'Gifted by Kaikeyi to Sita as a wedding present · the most ornate temple in Ayodhya · stunning interior with gold idols of Ram and Sita' },
  ],
  inclusions: ['1 night hotel (near Ram Mandir)', 'Private AC vehicle for all darshan sites', 'Certified religious guide', 'All temple entry coordination', 'VIP darshan slot (on request)', 'Driver charges & tolls'],
  waMessage: '',
  extraFromHaridwar: 'Ayodhya is 490 km from Haridwar via Lucknow — approx. 9 hrs drive or overnight train.',
  sectionTitle: 'The Sacred Sites of Ayodhya',
  sectionSub: '',
  schemaType: 'Religious pilgrimage',
};

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const pkg = getAllPackages().find((p) => p.slug === AYODHYA_CONFIG.packageSlug);
  const config = {
    ...AYODHYA_CONFIG,
    waMessage: `Namaste! I want to book Ayodhya Ram Mandir darshan tour from ${city!.name}. Please share package details.`,
    sectionSub: `The four sacred sites of Ayodhya you will visit on your pilgrimage from ${city!.name}.`,
  };
  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
