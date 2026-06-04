import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPackageBySlug } from '@/lib/data';

// ── Trek seasons data ────────────────────────────────────────────────────────
let trekSeasonsData: Record<string, { months: string[]; season_label: string; best_months: string[] }> = {};
let citiesData: Array<{ slug: string; name: string; state?: string; country?: string; tier?: number }> = [];
try { trekSeasonsData = require('../../../../../data/trek-seasons.json'); } catch {}
try { citiesData = require('../../../../../data/cities.json'); } catch {}

export async function generateStaticParams() {
  return Object.keys(trekSeasonsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trekData = trekSeasonsData[slug];
  if (!trekData) return {};

  const pkg = getPackageBySlug(slug);
  const trekName = pkg?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const price = pkg?.price_from ?? 9500;

  return {
    title: `${trekName} from Your City — Departure Points | Junegiri Yatra`,
    description: `Book ${trekName} from any city in India — all-inclusive ${trekData.season_label.toLowerCase()} trek from ₹${price.toLocaleString('en-IN')}. Pick your departure city for tailored travel info, routes & quotes.`,
    alternates: {
      canonical: `https://junegiriyatra.com/trek/${slug}/from/`,
    },
    openGraph: {
      title: `${trekName} — Choose Your Departure City`,
      description: `All-inclusive ${trekData.season_label.toLowerCase()} trek from ₹${price.toLocaleString('en-IN')}/person. Select your city for routes, travel time & custom quotes.`,
      images: [{ url: pkg?.hero_image ?? 'https://junegiriyatra.com/images/trek_himalaya.webp' }],
    },
  };
}

export default async function TrekFromIndexPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trekData = trekSeasonsData[slug];
  if (!trekData) notFound();

  const pkg = getPackageBySlug(slug);
  const trekName = pkg?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const price = pkg?.price_from ?? 9500;

  // Show tier-1 and tier-2 cities only (skip tier-3 / noindex cities)
  const t1Cities = citiesData.filter((c) => (c.tier ?? 2) === 1);
  const t2Cities = citiesData.filter((c) => (c.tier ?? 2) === 2);

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${trekName} from Your City`,
        description: `Book ${trekName} from cities across India — all-inclusive packages from ₹${price.toLocaleString('en-IN')}/person.`,
        url: `https://junegiriyatra.com/trek/${slug}/from/`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'Himalayan Treks', item: 'https://junegiriyatra.com/himalayan-treks/' },
          { '@type': 'ListItem', position: 3, name: trekName, item: `https://junegiriyatra.com/packages/${slug}/` },
          { '@type': 'ListItem', position: 4, name: 'From Your City', item: `https://junegiriyatra.com/trek/${slug}/from/` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <main className="trek-from-index-page">
        <div className="container">
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/himalayan-treks/">Himalayan Treks</Link></li>
              <li><Link href={`/packages/${slug}/`}>{trekName}</Link></li>
              <li aria-current="page">From Your City</li>
            </ol>
          </nav>

          <h1 className="trek-from-index-title">
            {trekName} — Choose Your Departure City
          </h1>
          <p className="trek-from-index-sub">
            All-inclusive {trekData.season_label.toLowerCase()} trek from{' '}
            <strong>₹{price.toLocaleString('en-IN')}/person</strong>.
            Select your city for travel routes, journey time, and a free custom quote.
          </p>
          <p className="trek-from-index-seasons">
            <strong>Best months:</strong>{' '}
            {trekData.best_months.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}
            {' '}·{' '}
            <strong>Season:</strong> {trekData.season_label}
          </p>

          {/* Tier-1 major cities */}
          <section className="trek-from-cities-section">
            <h2 className="trek-from-cities-heading">Major Cities</h2>
            <ul className="trek-from-cities-grid">
              {t1Cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/trek/${slug}/from/${city.slug}/`} className="trek-from-city-link">
                    {city.name}
                    {city.state && city.state !== city.name && (
                      <span className="trek-from-city-state">, {city.state}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Tier-2 cities */}
          {t2Cities.length > 0 && (
            <section className="trek-from-cities-section">
              <h2 className="trek-from-cities-heading">More Departure Cities</h2>
              <ul className="trek-from-cities-grid trek-from-cities-grid--t2">
                {t2Cities.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/trek/${slug}/from/${city.slug}/`} className="trek-from-city-link trek-from-city-link--sm">
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="trek-from-cta">
            <p>Don&apos;t see your city?</p>
            <a
              href={`https://wa.me/919873897652?text=I%20want%20to%20book%20${encodeURIComponent(trekName)}%20from%20my%20city`}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 WhatsApp for a custom quote
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
