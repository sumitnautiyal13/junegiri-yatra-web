import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IntlCityPage, { type IntlCity, type IntlPackage } from '@/components/IntlCityPage';
import intlCitiesData from '../../../../../data/international-cities.json';

export async function generateStaticParams() {
  return (intlCitiesData as IntlCity[]).map((city) => ({ city: city.slug }));
}

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

  let minPrice = 820;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkgs: IntlPackage[] = require('../../../../../data/international-packages.json');
    if (pkgs.length > 0) {
      minPrice = Math.min(...pkgs.map((p) => p.intl_price_usd));
    }
  } catch {
    // data file may not exist yet
  }

  return {
    title: `India Trek Packages from ${city.name} | Himalayan Tours | Junegiri Yatra`,
    description: `Premium Himalayan trek packages from ${city.name}. ${city.flight_hours_to_delhi}h flight to Delhi. ${city.visa_type} in ${city.visa_processing_days} days. Private guide, 3-star hotels. From $${minPrice}/person.`,
    alternates: {
      canonical: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/`,
    },
    openGraph: {
      title: `India Trek Packages from ${city.name} | Junegiri Yatra`,
      description: `Himalayan trekking packages for travelers from ${city.name}. ${city.flight_hours_to_delhi}h flight · ${city.visa_type} · From $${minPrice}/person.`,
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

  // Sort packages: popular_package_slugs first, then remainder in original order
  const sortedPackages = [...intlPackages].sort((a, b) => {
    const ai = city.popular_package_slugs.indexOf(a.slug);
    const bi = city.popular_package_slugs.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return <IntlCityPage city={city} packages={sortedPackages} />;
}
