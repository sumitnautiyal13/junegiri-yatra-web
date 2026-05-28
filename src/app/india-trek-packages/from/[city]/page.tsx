import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IntlCityPage, { type IntlCity, type IntlPackage, type TrekPackage } from '@/components/IntlCityPage';
import intlCitiesData from '../../../../../data/international-cities.json';
import allPackagesData from '../../../../../data/packages.json';
import trekSeasonsData from '../../../../../data/trek-seasons.json';

export async function generateStaticParams() {
  return (intlCitiesData as IntlCity[]).map((city) => ({ city: city.slug }));
}

// Canonical set of trek slugs — only these appear on this page
const TREK_SLUGS = new Set(Object.keys(trekSeasonsData));

// Curated display order for international travelers: most iconic / accessible first
const FEATURED_ORDER = [
  'kedarkantha-trek-5n-6d',
  'valley-of-flowers-trek-4n-5d',
  'har-ki-dun-trek-5n-6d',
  'kuari-pass-trek-4n-5d',
  'hamta-pass-trek-4n-5d',
  'roopkund-trek-7n-8d',
  'chopta-tungnath-trek-3n-4d',
  'pangarchulla-peak-5n-6d',
  'rupin-pass-trek-8n-9d',
  'bhrigu-lake-trek-3n-4d',
  'indrahar-pass-trek-3n-4d',
  'kanamo-peak-5n-6d',
  'pin-parvati-pass-10n-11d',
  'triund-trek-1n-2d',
  'kareri-lake-trek-3n-4d',
  'chandrakhani-pass-trek-3n-4d',
  'beas-kund-trek-2n-3d',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = (intlCitiesData as IntlCity[]).find((c) => c.slug === citySlug);

  if (!city) {
    return { title: 'Not Found' };
  }

  return {
    title: `India Trek Packages from ${city.name} | Himalayan Tours | Junegiri Yatra`,
    description: `${TREK_SLUGS.size} Himalayan trek packages from ${city.name}. ${city.flight_hours_to_delhi}h flight to Delhi. ${city.visa_type} in ${city.visa_processing_days} days. Private guide & transport included. Kedarkantha, Valley of Flowers, Har Ki Dun & more.`,
    alternates: {
      canonical: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/`,
    },
    openGraph: {
      title: `India Trek Packages from ${city.name} | Junegiri Yatra`,
      description: `${TREK_SLUGS.size} Himalayan treks for travelers from ${city.name}. ${city.flight_hours_to_delhi}h flight · ${city.visa_type} · Kedarkantha, Valley of Flowers, Har Ki Dun & more.`,
      url: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/`,
      siteName: 'Junegiri Yatra',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = (intlCitiesData as IntlCity[]).find((c) => c.slug === citySlug);

  if (!city) notFound();

  let intlPackages: IntlPackage[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    intlPackages = require('../../../../../data/international-packages.json');
  } catch {
    // data file may not exist yet — page renders with empty packages
  }

  // Individual trek packages: ONLY canonical treks from trek-seasons.json
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trekPackages: TrekPackage[] = (allPackagesData as any[])
    .filter((p) => TREK_SLUGS.has(p.slug) && p.intl_price_usd && p.intl_price_usd > 0)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      duration: p.duration,
      intl_price_usd: p.intl_price_usd,
      difficulty: p.difficulty,
      tag: p.tag,
      hero_image: p.hero_image,
      destinations_short: p.destinations_short,
      hero_tagline: p.hero_tagline,
      price_from: p.price_from,
      pricing_tiers: p.pricing_tiers ?? [],
    }))
    // Sort: curated featured order, with city popular slugs bumped to top if any match
    .sort((a, b) => {
      const cityAi = city.popular_package_slugs.indexOf(a.slug);
      const cityBi = city.popular_package_slugs.indexOf(b.slug);
      if (cityAi !== -1 && cityBi !== -1) return cityAi - cityBi;
      if (cityAi !== -1) return -1;
      if (cityBi !== -1) return 1;
      const featuredAi = FEATURED_ORDER.indexOf(a.slug);
      const featuredBi = FEATURED_ORDER.indexOf(b.slug);
      if (featuredAi === -1 && featuredBi === -1) return 0;
      if (featuredAi === -1) return 1;
      if (featuredBi === -1) return -1;
      return featuredAi - featuredBi;
    });

  // Sort bundled packages: popular_package_slugs first, then original order
  const sortedPackages = [...intlPackages].sort((a, b) => {
    const ai = city.popular_package_slugs.indexOf(a.slug);
    const bi = city.popular_package_slugs.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return <IntlCityPage city={city} packages={sortedPackages} treks={trekPackages} />;
}
