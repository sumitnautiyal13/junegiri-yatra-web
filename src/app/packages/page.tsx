import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import packagesData from '../../../data/packages.json';

export const metadata: Metadata = {
  title: 'All Tour Packages 2026 | Treks, Yatras & Tours | Junegiri Yatra',
  description:
    'Browse all Junegiri Yatra packages — Himalayan treks, Char Dham Yatra, Rishikesh adventures, Golden Triangle, Rajasthan tours & yoga retreats. All-inclusive from ₹2,500/person.',
  alternates: { canonical: 'https://junegiriyatra.com/packages/' },
  openGraph: {
    title: 'All Tour Packages | Junegiri Yatra',
    description:
      '45+ all-inclusive India packages — treks, pilgrimages, adventures, heritage tours & yoga programs. Haridwar-based operator since 2017.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'All Tour Packages — Junegiri Yatra',
      description:
        '45+ India travel packages — Himalayan treks, Char Dham Yatra, Rishikesh adventures, Golden Triangle & Rajasthan heritage tours.',
      url: 'https://junegiriyatra.com/packages/',
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
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'All Packages', item: 'https://junegiriyatra.com/packages/' },
      ],
    },
  ],
};

// Category labels for display grouping
const CATEGORY_ORDER = [
  { key: 'trek',        label: 'Himalayan Treks',       emoji: '🏔️' },
  { key: 'pilgrimage',  label: 'Sacred Pilgrimages',    emoji: '🛕' },
  { key: 'adventure',   label: 'Adventures & Escapes',  emoji: '🌊' },
  { key: 'heritage',    label: 'Heritage Tours',        emoji: '🏯' },
  { key: 'yoga',        label: 'Yoga & Wellness',       emoji: '🧘' },
  { key: 'international', label: 'International',       emoji: '✈️' },
];

// Derive category from slug / tag / name heuristics
function getCategory(pkg: { slug: string; name: string; tag?: string }): string {
  const s = pkg.slug.toLowerCase();
  const t = (pkg.tag ?? '').toLowerCase();
  if (s.includes('trek') || s.includes('pass') || s.includes('peak') || s.includes('dun')) return 'trek';
  if (s.includes('char-dham') || s.includes('kedarnath') || s.includes('badrinath') ||
      s.includes('yatra') || s.includes('do-dham') || s.includes('gangotri') || s.includes('helicopter')) return 'pilgrimage';
  if (s.includes('rishikesh') || s.includes('adventure') || s.includes('bungee') || s.includes('rafting')) return 'adventure';
  if (s.includes('yoga') || s.includes('wellness') || s.includes('retreat') || t.includes('yoga')) return 'yoga';
  if (s.includes('bali') || s.includes('thailand') || s.includes('international') || s.includes('singapore')) return 'international';
  if (s.includes('golden-triangle') || s.includes('rajasthan') || s.includes('varanasi') ||
      s.includes('taj') || s.includes('agra') || s.includes('jaipur') || s.includes('heritage') ||
      s.includes('braj') || s.includes('ayodhya')) return 'heritage';
  return 'heritage';
}

type Package = {
  slug: string;
  name: string;
  title?: string;
  tag?: string;
  duration?: string;
  price_from?: number;
  hero_image?: string;
  hero_tagline?: string;
  difficulty?: string;
};

export default function PackagesHubPage() {
  const pkgs = packagesData as Package[];

  // Group packages by category
  const grouped: Record<string, Package[]> = {};
  for (const p of pkgs) {
    const cat = getCategory(p);
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }

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
                <li aria-current="page">All Packages</li>
              </ol>
            </nav>
            <h1 className="packages-hub-title">All Tour Packages</h1>
            <p className="packages-hub-sub">
              45+ all-inclusive India packages — treks, yatras, adventures, heritage tours & yoga programs.
              All depart from Haridwar. All prices per person, double sharing.
            </p>
          </div>
        </section>

        {/* ── PACKAGE GROUPS ─────────────────────────────────────── */}
        {CATEGORY_ORDER.map(({ key, label, emoji }) => {
          const list = grouped[key];
          if (!list || list.length === 0) return null;
          return (
            <section key={key} className="packages-hub-section">
              <div className="container">
                <h2 className="packages-hub-section-title">
                  <span className="packages-hub-emoji" aria-hidden="true">{emoji}</span>
                  {label}
                </h2>
                <div className="packages-hub-grid">
                  {list.map((pkg) => (
                    <Link
                      key={pkg.slug}
                      href={`/packages/${pkg.slug}/`}
                      className="pkg-card"
                    >
                      <div className="pkg-card-img-wrap">
                        <Image
                          src={pkg.hero_image ?? '/images/kedarnath_temple_cover.webp'}
                          alt={pkg.name}
                          fill
                          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="pkg-card-img"
                          loading="lazy"
                        />
                        {pkg.tag && <span className="pkg-card-tag">{pkg.tag}</span>}
                      </div>
                      <div className="pkg-card-body">
                        <h3 className="pkg-card-name">{pkg.name}</h3>
                        {pkg.hero_tagline && (
                          <p className="pkg-card-tagline">{pkg.hero_tagline}</p>
                        )}
                        <div className="pkg-card-meta">
                          {pkg.duration && <span className="pkg-meta-pill">{pkg.duration}</span>}
                          {pkg.difficulty && <span className="pkg-meta-pill">{pkg.difficulty}</span>}
                        </div>
                        {pkg.price_from && (
                          <p className="pkg-card-price">
                            From <strong>₹{pkg.price_from.toLocaleString('en-IN')}</strong>
                            <span className="pkg-price-suffix">/person</span>
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
        <section className="packages-hub-cta">
          <div className="container packages-hub-cta-inner">
            <h2>Can&apos;t find what you&apos;re looking for?</h2>
            <p>WhatsApp us — we&apos;ll build a custom itinerary around your dates, group size, and interests.</p>
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip"
              className="btn btn-wa btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 WhatsApp +91 98738 97652
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
