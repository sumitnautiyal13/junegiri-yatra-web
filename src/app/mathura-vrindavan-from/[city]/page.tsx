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
    title: `Mathura Vrindavan Tour from ${city.name} 2026 | Junegiri Yatra`,
    description: `Book Braj Bhoomi Yatra from ${city.name} — Mathura, Vrindavan, Govardhan, Nandgaon & Barsana. All-inclusive 2N/3D from ₹6,500. Haridwar-based operator. WhatsApp for quote.`,
    keywords: `mathura vrindavan tour from ${city.name.toLowerCase()}, braj bhoomi yatra from ${city.name.toLowerCase()}, mathura tour ${city.name.toLowerCase()}, vrindavan tour ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/mathura-vrindavan-from/${city.slug}/` },
    openGraph: {
      title: `Mathura Vrindavan Tour from ${city.name}`,
      description: `All-inclusive Braj Bhoomi Yatra from ${city.name} — 2N/3D from ₹6,500.`,
      images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
    },
  };
}

const MATHURA_CONFIG: DestinationConfig = {
  destination: 'Mathura Vrindavan Yatra',
  destinationSlug: 'mathura-vrindavan',
  routeBase: '/mathura-vrindavan-from/',
  heroImage: '/images/mountains1.webp',
  packageSlug: 'braj-bhoomi-yatra',
  basePrice: 6500,
  duration: '2 Nights / 3 Days',
  tag: 'Most Popular · 2N/3D',
  overview: 'Complete Braj Bhoomi Yatra — Mathura, Vrindavan, Govardhan Parikrama, Nandgaon & Barsana. Private vehicle, hotels, certified Braj guide, all temple visits.',
  highlights: [
    { name: 'Krishna Janmabhoomi', alt: 'Day 1', desc: 'The exact birthplace of Lord Krishna · Katra Keshav Dev temple complex · adjacent Dwarkadhish Temple and Vishram Ghat aarti' },
    { name: 'Vrindavan Temples', alt: 'Day 2', desc: 'Banke Bihari · ISKCON · Prem Mandir · Radha Raman · Nidhivan — the five essential Vrindavan temples with a certified Braj guide' },
    { name: 'Govardhan Hill', alt: 'Day 2', desc: 'Sacred hill lifted by Krishna to protect Braj from Indra\'s rain · 21 km Govardhan Parikrama · Mansi Ganga kund' },
    { name: 'Nandgaon & Barsana', alt: 'Day 3', desc: 'Nandgaon — Nanda Bhavan temple (Krishna\'s foster father\'s village) · Barsana — Radha Rani Temple · famous for Lathmar Holi' },
  ],
  inclusions: ['2 nights hotel (Mathura / Vrindavan)', 'Private AC vehicle for all 5 towns', 'Certified Braj Cultural Guide', 'Govardhan Parikrama assistance', 'All temple entry coordination', 'Driver charges & tolls'],
  waMessage: '',
  extraFromHaridwar: 'Mathura is 200 km from Haridwar via NH-58 — approx. 4.5 hrs drive.',
  sectionTitle: 'The Sacred Land of Braj',
  sectionSub: '',
  schemaType: 'Religious pilgrimage',
};

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();
  const pkg = getAllPackages().find((p) => p.slug === MATHURA_CONFIG.packageSlug);
  const config = {
    ...MATHURA_CONFIG,
    waMessage: `Namaste! I want to book Mathura Vrindavan Braj Bhoomi Yatra from ${city!.name}. Please share package details.`,
    sectionSub: `The five sacred towns of Braj you will visit on your yatra from ${city!.name}.`,
  };
  return <DestinationCityPage city={city!} pkg={pkg} config={config} />;
}
