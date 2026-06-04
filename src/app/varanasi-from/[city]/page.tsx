import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllCities, getCityBySlug, getAllPackages } from '@/lib/data';
import DestinationCityPage, { type DestinationConfig } from '@/components/DestinationCityPage';

/* ── Destination config ─────────────────────────────────── */
const VARANASI_CONFIG: DestinationConfig = {
  destination: 'Varanasi Spiritual Tour',
  destinationSlug: 'varanasi',
  routeBase: '/varanasi-from/',
  heroImage: '/images/braj_varanasi.webp',
  packageSlug: 'varanasi-prayagraj-spiritual-3n-4d',
  basePrice: 7500,
  duration: '2 Nights / 3 Days',
  tag: 'Spiritual · 2N/3D',
  overview: 'Varanasi spiritual tour — Ganga aarti at Dashashwamedh Ghat, Kashi Vishwanath Temple, Sarnath, sunrise boat ride. The holiest city on earth in 3 days.',
  highlights: [
    { name: 'Ganga Aarti', alt: 'Evening Day 1', desc: 'Dashashwamedh Ghat · 7 priests · fire rituals · 1,000-year tradition · most spiritual experience in India' },
    { name: 'Kashi Vishwanath', alt: 'Day 2 Morning', desc: 'One of 12 Jyotirlingas · 2,000+ year old temple · newly renovated Vishwanath Corridor · early morning darshan' },
    { name: 'Sunrise Boat Ride', alt: 'Day 2 Dawn', desc: 'Row along the 84 ghats at sunrise · witness morning rituals · photographers paradise' },
    { name: 'Sarnath', alt: 'Day 2', desc: 'Where Buddha gave his first sermon · Dhamek Stupa · Sarnath Museum · 10 km from Varanasi' },
  ],
  inclusions: [
    '2 nights hotel near ghats',
    'AC transfers from/to airport or station',
    'Ganga aarti guided visit',
    'Sunrise boat ride',
    'Kashi Vishwanath temple guide',
    'Sarnath half-day tour',
  ],
  waMessage: '',  // pre-computed per city in Page()
  extraFromHaridwar: 'Varanasi is 7 hrs by train from Haridwar — combine with Char Dham for the ultimate Uttarakhand + UP spiritual circuit.',
  sectionTitle: 'Varanasi — The Eternal City',
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

  // Tier 3 cities (low/zero demand) get noindex to protect site-wide quality signal
  const noindex = (city as unknown as { tier?: number }).tier === 3;

  const title = `Varanasi Tour from ${city.name} 2026 | Junegiri Yatra`;
  const description = `Book Varanasi spiritual tour from ${city.name} with Junegiri Yatra — Ganga aarti, Kashi Vishwanath & sunrise boat ride. ${city.total_time}. All-inclusive from ₹7,500. WhatsApp for ${city.name} quotes.`;

  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description,
    keywords: `varanasi tour from ${city.name.toLowerCase()}, varanasi trip from ${city.name.toLowerCase()}, kashi vishwanath from ${city.name.toLowerCase()}, ganga aarti ${city.name.toLowerCase()}, varanasi package ${city.name.toLowerCase()}`,
    openGraph: {
      title,
      description,
      images: [{ url: 'https://junegiriyatra.com/images/braj_varanasi.webp' }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/varanasi-from/${city.slug}/`,
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
    packages.find((p) => p.slug === VARANASI_CONFIG.packageSlug) ??
    packages.find((p) => p.slug.includes('varanasi')) ??
    packages[0];

  const config: DestinationConfig = {
    ...VARANASI_CONFIG,
    waMessage: `Namaste! I want to book Varanasi Spiritual Tour from ${city.name}. Please share package details.`,
    sectionSub: `Everything you will experience on your Varanasi tour from ${city.name}.`,
  };
  return <DestinationCityPage city={city} pkg={pkg} config={config} />;
}
