import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCityBySlug, getAllPackages } from '@/lib/data';
import CityMonthPage from '@/components/CityMonthPage';
import yatraSeasons from '../../../../../../data/yatra-seasons.json';

/* ── ISR — rely entirely on on-demand generation + revalidation ── */
export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return [];
}

/* ── Types ──────────────────────────────────────────────────────── */
type SeasonEntry = {
  destination: string;
  route_base: string;
  package_slug: string;
  base_price: number;
  hero_image: string;
  duration: string;
  months: string[];
  best_months: string[];
  month_data: Record<
    string,
    {
      label: string;
      year: string;
      weather: string;
      crowd: string;
      status: string;
      price_tag: string;
      tagline: string;
      highlights: string[];
      booking_tip: string;
      faq: { q: string; a: string }[];
    }
  >;
};

const seasons = yatraSeasons as Record<string, SeasonEntry>;

/* ── Metadata ───────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ dest: string; city: string; month: string }>;
}): Promise<Metadata> {
  const { dest, city: citySlug, month } = await params;

  const destData = seasons[dest];
  if (!destData) return {};

  const monthData = destData.month_data[month];
  if (!monthData) return {};

  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `${destData.destination} from ${city.name} in ${monthData.label} ${monthData.year} | Junegiri Yatra`;
  const bookingTipFirst = monthData.booking_tip.split('.')[0] + '.';
  const description = `Book ${destData.destination} from ${city.name} in ${monthData.label} ${monthData.year} — ${monthData.weather} All-inclusive from ₹${destData.base_price.toLocaleString('en-IN')}. ${bookingTipFirst}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `https://junegiriyatra.com${destData.hero_image}` }],
      type: 'website',
    },
    alternates: {
      canonical: `https://junegiriyatra.com/from/${dest}/${citySlug}/${month}/`,
    },
  };
}

/* ── Page ───────────────────────────────────────────────────────── */
export default async function Page({
  params,
}: {
  params: Promise<{ dest: string; city: string; month: string }>;
}) {
  const { dest, city: citySlug, month } = await params;

  const destData = seasons[dest];
  if (!destData) notFound();

  const monthData = destData.month_data[month];
  if (!monthData) notFound();

  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const packages = getAllPackages();
  const pkg =
    packages.find((p) => p.slug === destData.package_slug) ??
    packages.find((p) => p.slug.includes(dest)) ??
    undefined;

  return (
    <CityMonthPage
      city={city}
      destSlug={dest}
      destination={destData.destination}
      routeBase={destData.route_base}
      basePrice={pkg?.price_from ?? destData.base_price}
      duration={destData.duration}
      heroImage={destData.hero_image}
      month={month}
      monthData={monthData}
      allMonths={destData.months}
      pkg={pkg}
    />
  );
}
