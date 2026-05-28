import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IntlPackageDetail, { type IntlPkg } from '@/components/IntlPackageDetail';
import type { IntlCity } from '@/components/IntlCityPage';

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgs: IntlPkg[] = require('../../../../data/international-packages.json');
  return pkgs.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgs: IntlPkg[] = require('../../../../data/international-packages.json');
  const pkg = pkgs.find((p) => p.slug === slug);
  if (!pkg) return { title: 'Not Found' };

  return {
    title: `${pkg.name} | ${pkg.duration} India Tour | Junegiri Yatra`,
    description: `${pkg.hero_tagline} ${pkg.duration} · ${pkg.destinations_short} · From $${pkg.intl_price_usd}/person. Private guide, 3-star hotels, airport transfers included.`,
    alternates: { canonical: `https://junegiriyatra.com/international/${pkg.slug}/` },
    openGraph: {
      title: `${pkg.name} | Junegiri Yatra`,
      description: `${pkg.hero_tagline} From $${pkg.intl_price_usd}/person.`,
      url: `https://junegiriyatra.com/international/${pkg.slug}/`,
      siteName: 'Junegiri Yatra',
      images: [{ url: `https://junegiriyatra.com${pkg.hero_image}`, alt: pkg.name }],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IntlPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const allPackages: IntlPkg[] = require('../../../../data/international-packages.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const allCities: IntlCity[] = require('../../../../data/international-cities.json');

  const pkg = allPackages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const related = allPackages.filter((p) => p.slug !== slug).slice(0, 3);
  const popularCities = allCities
    .filter((c) => c.popular_package_slugs.includes(slug))
    .slice(0, 6);

  // JSON-LD structured data (server-rendered)
  const faqs = pkg.faq ?? [
    { q: `How physically demanding is ${pkg.name}?`, a: `Rated ${pkg.difficulty}. Suitable for travelers with general fitness. We provide full altitude acclimatization support.` },
    { q: 'What is the best time of year?', a: 'April–June and September–November offer the best conditions. We advise based on your dates.' },
    { q: 'Can the itinerary be customized?', a: 'Yes — all packages are fully private. WhatsApp us for a custom proposal.' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: pkg.name,
        description: pkg.hero_tagline,
        touristType: 'Adventure travelers',
        provider: {
          '@type': 'TravelAgency',
          name: 'Junegiri Yatra',
          url: 'https://junegiriyatra.com',
          telephone: '+919873897652',
        },
        offers: {
          '@type': 'Offer',
          price: pkg.intl_price_usd,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'International Tours', item: 'https://junegiriyatra.com/international/' },
          { '@type': 'ListItem', position: 3, name: pkg.name, item: `https://junegiriyatra.com/international/${pkg.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IntlPackageDetail pkg={pkg} related={related} popularCities={popularCities} />
    </>
  );
}
