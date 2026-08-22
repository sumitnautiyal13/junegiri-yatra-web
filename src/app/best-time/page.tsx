import type { Metadata } from 'next';
import { withGuidePrice } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import bestTimeData from '../../../data/best-time.json';

/**
 * The /best-time/ hub did not exist, yet every best-time guide's
 * BreadcrumbList already pointed position 2 at https://junegiriyatra.com/best-time/
 * — so all 25 guides shipped a breadcrumb whose URL 404s, and the guides
 * themselves were reachable only from the sitemap and four footer links.
 *
 * Same fix as the /compare/ hub: list everything from the data file so the
 * cluster stays linked automatically as guides are added.
 */

export const metadata: Metadata = {
  title: 'Best Time to Visit Uttarakhand & Himachal — Month Guides',
  description:
    'Month-by-month guides to Kedarnath, Char Dham, Valley of Flowers, Kedarkantha and 21 more Himalayan destinations — weather, crowds and price.',
  alternates: { canonical: 'https://junegiriyatra.com/best-time/' },
  openGraph: {
    title: 'Best Time to Visit — Month-by-Month Guides | Junegiri Yatra',
    description:
      'When to go, when to avoid: weather, crowd and price guides for 25 Himalayan treks, yatras and hill stations.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp' }],
    type: 'website',
  },
};

type Destination = {
  slug: string;
  name: string;
  h1: string;
  title: string;
  tagline: string;
  hero_image: string;
  package_price: number;
};

const destinations = (bestTimeData as Destination[]).map(withGuidePrice);

// Strip inline HTML (e.g. <em>) from the h1 for a clean card heading.
const cleanHeading = (h1: string) => h1.replace(/<[^>]+>/g, '').trim();

// Grouping gives the hub scannable sections and indexable H2s.
const GROUPS: { key: string; label: string; emoji: string; match: (s: string) => boolean }[] = [
  {
    key: 'yatra',
    label: 'Pilgrimages & Yatras',
    emoji: '🛕',
    match: (s) => /(kedarnath|badrinath|char-dham|haridwar|varanasi|braj-bhoomi)/.test(s),
  },
  {
    key: 'trek',
    label: 'Himalayan Treks',
    emoji: '🏔️',
    match: (s) => /trek|pass|peak|lake|valley-of-flowers/.test(s),
  },
  {
    key: 'other',
    label: 'Hill Stations, Snow & Tours',
    emoji: '🏞️',
    match: () => true, // catch-all for whatever remains
  },
];

function groupDestinations() {
  const remaining = [...destinations];
  const out: { key: string; label: string; emoji: string; items: Destination[] }[] = [];
  for (const g of GROUPS) {
    const items: Destination[] = [];
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (g.match(remaining[i].slug)) {
        items.unshift(remaining[i]);
        remaining.splice(i, 1);
      }
    }
    if (items.length) out.push({ key: g.key, label: g.label, emoji: g.emoji, items });
  }
  return out;
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Best Time to Visit — Junegiri Yatra',
      description:
        'Month-by-month guides on when to visit Himalayan treks, Char Dham yatras and hill stations, covering weather, crowds and price.',
      url: 'https://junegiriyatra.com/best-time/',
      provider: {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        telephone: '+919873897652',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Haridwar',
          addressRegion: 'Uttarakhand',
          addressCountry: 'IN',
        },
      },
    },
    {
      '@type': 'ItemList',
      itemListElement: destinations.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: cleanHeading(d.h1),
        url: `https://junegiriyatra.com/best-time/${d.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Best Time to Visit',
          item: 'https://junegiriyatra.com/best-time/',
        },
      ],
    },
  ],
};

export default function BestTimeHubPage() {
  const groups = groupDestinations();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <main className="packages-hub-page">
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <section className="packages-hub-hero">
          <div className="container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Best Time to Visit</li>
              </ol>
            </nav>
            <h1 className="packages-hub-title">Best Time to Visit</h1>
            <p className="packages-hub-sub">
              Going in the wrong month is the fastest way to ruin a Himalayan trip. These
              month-by-month guides cover {destinations.length} destinations — when the passes and
              temples actually open, which months bring rain or snow, when crowds and prices peak,
              and the two or three weeks we would book ourselves.
            </p>
          </div>
        </section>

        {/* ── DESTINATION GROUPS ─────────────────────────────────── */}
        {groups.map((g) => (
          <section key={g.key} className="packages-hub-section">
            <div className="container">
              <h2 className="packages-hub-section-title">
                <span className="packages-hub-emoji" aria-hidden="true">{g.emoji}</span>
                {g.label}
              </h2>
              <div className="packages-hub-grid">
                {g.items.map((d) => (
                  <Link key={d.slug} href={`/best-time/${d.slug}/`} className="pkg-card">
                    <div className="pkg-card-img-wrap">
                      <Image
                        src={d.hero_image ?? '/images/kedarnath_temple_cover.webp'}
                        alt={cleanHeading(d.h1)}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="pkg-card-img"
                        loading="lazy"
                      />
                      <span className="pkg-card-tag">Best Time</span>
                    </div>
                    <div className="pkg-card-body">
                      <h3 className="pkg-card-name">{cleanHeading(d.h1)}</h3>
                      <p className="pkg-card-tagline">{d.tagline}</p>
                      <div className="pkg-card-meta">
                        <span className="pkg-meta-pill">
                          Packages from ₹{d.package_price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
        <section className="packages-hub-cta">
          <div className="container packages-hub-cta-inner">
            <h2>Not sure which month suits your dates?</h2>
            <p>
              Tell us the window you can travel in on WhatsApp — our Haridwar-based team will tell
              you honestly what is open, what the weather will be doing, and which trip fits best.
            </p>
            <a
              href="https://wa.me/919873897652?text=Hi%20Junegiri%20Yatra!%20I%20am%20planning%20a%20trip%20and%20want%20to%20know%20the%20best%20month%20to%20travel."
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 Ask About Your Travel Dates
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
