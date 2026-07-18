import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import comparisonsData from '../../../data/comparisons.json';

export const metadata: Metadata = {
  title: 'Compare Treks & Yatras 2026 | Uttarakhand Trip Comparisons',
  description:
    'Can’t decide between two Himalayan treks or Char Dham options? Compare Kedarnath vs Badrinath, Kedarkantha vs Brahmatal, helicopter vs road and more — side-by-side cost, difficulty, season and views.',
  alternates: { canonical: 'https://junegiriyatra.com/compare/' },
  openGraph: {
    title: 'Compare Treks & Yatras | Junegiri Yatra',
    description:
      'Side-by-side comparisons to help you choose the right Himalayan trek, Char Dham yatra or hill-station trip — cost, difficulty, season and views.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp' }],
    type: 'website',
  },
};

type Comparison = {
  slug: string;
  title: string;
  h1: string;
  tagline: string;
  hero_image: string;
};

const comparisons = comparisonsData as Comparison[];

// Strip inline HTML (e.g. <em>) from the h1 for a clean card heading.
const cleanHeading = (h1: string) => h1.replace(/<[^>]+>/g, '').trim();

// Light grouping so the hub has scannable sections and indexable H2s.
const GROUPS: { key: string; label: string; emoji: string; match: (s: string) => boolean }[] = [
  {
    key: 'yatra',
    label: 'Pilgrimages & Yatras',
    emoji: '🛕',
    match: (s) =>
      /(kedarnath|badrinath|do-dham|char-dham|helicopter|varanasi|ayodhya|rishikesh-vs-haridwar)/.test(s) &&
      !/(kedarkantha)/.test(s),
  },
  {
    key: 'trek',
    label: 'Himalayan Treks',
    emoji: '🏔️',
    match: (s) =>
      /(kedarkantha|brahmatal|valley-of-flowers|har-ki-dun|chopta|kuari|roopkund|dayara|hamta|pass)/.test(s),
  },
  {
    key: 'other',
    label: 'Hill Stations, Snow & Tours',
    emoji: '🏞️',
    match: () => true, // catch-all for whatever remains
  },
];

function groupComparisons() {
  const remaining = [...comparisons];
  const out: { key: string; label: string; emoji: string; items: Comparison[] }[] = [];
  for (const g of GROUPS) {
    const items: Comparison[] = [];
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
      name: 'Compare Treks & Yatras — Junegiri Yatra',
      description:
        'Side-by-side comparisons of Himalayan treks, Char Dham yatras and hill-station trips to help travellers choose the right option.',
      url: 'https://junegiriyatra.com/compare/',
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
      itemListElement: comparisons.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: cleanHeading(c.h1),
        url: `https://junegiriyatra.com/compare/${c.slug}/`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://junegiriyatra.com/compare/' },
      ],
    },
  ],
};

export default function CompareHubPage() {
  const groups = groupComparisons();

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
                <li aria-current="page">Compare</li>
              </ol>
            </nav>
            <h1 className="packages-hub-title">Compare Treks &amp; Yatras</h1>
            <p className="packages-hub-sub">
              Torn between two trips? These side-by-side guides compare cost, difficulty, season and
              views so you can pick the right Himalayan trek, Char Dham yatra or hill-station escape —
              then book on WhatsApp in minutes.
            </p>
          </div>
        </section>

        {/* ── COMPARISON GROUPS ──────────────────────────────────── */}
        {groups.map((g) => (
          <section key={g.key} className="packages-hub-section">
            <div className="container">
              <h2 className="packages-hub-section-title">
                <span className="packages-hub-emoji" aria-hidden="true">{g.emoji}</span>
                {g.label}
              </h2>
              <div className="packages-hub-grid">
                {g.items.map((c) => (
                  <Link key={c.slug} href={`/compare/${c.slug}/`} className="pkg-card">
                    <div className="pkg-card-img-wrap">
                      <Image
                        src={c.hero_image ?? '/images/kedarnath_temple_cover.webp'}
                        alt={cleanHeading(c.h1)}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="pkg-card-img"
                        loading="lazy"
                      />
                      <span className="pkg-card-tag">Compare</span>
                    </div>
                    <div className="pkg-card-body">
                      <h3 className="pkg-card-name">{cleanHeading(c.h1)}</h3>
                      <p className="pkg-card-tagline">{c.tagline}</p>
                      <div className="pkg-card-meta">
                        <span className="pkg-meta-pill">Side-by-side guide</span>
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
            <h2>Still not sure which trip is right?</h2>
            <p>
              Tell us your dates, group and budget on WhatsApp — our Haridwar-based team will
              recommend the best-fit trek or yatra and share an all-inclusive quote.
            </p>
            <a
              href="https://wa.me/919873897652?text=Hi%20Junegiri%20Yatra!%20I%20was%20comparing%20trips%20on%20your%20site%20and%20would%20like%20a%20recommendation."
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 Get a Recommendation on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
