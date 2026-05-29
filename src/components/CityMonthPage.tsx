'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City, Package } from '@/types';
import WaLink from '@/components/WaLink';

/* ── All destinations for cross-linking ────────────────────────── */
const ALL_DESTINATIONS = [
  { slug: 'char-dham', label: 'Char Dham Yatra', route: '/char-dham-from/', icon: '🛕', price: '₹19,800', tag: '9N/10D' },
  { slug: 'kedarnath', label: 'Kedarnath Yatra', route: '/kedarnath-from/', icon: '⛰️', price: '₹8,500', tag: '3N/4D' },
  { slug: 'kedarnath-helicopter', label: 'Kedarnath Helicopter', route: '/kedarnath-helicopter-from/', icon: '🚁', price: '₹14,500', tag: '2N/3D' },
  { slug: 'badrinath', label: 'Badrinath Yatra', route: '/badrinath-from/', icon: '🙏', price: '₹6,500', tag: '2N/3D' },
  { slug: 'do-dham', label: 'Do Dham Yatra', route: '/do-dham-from/', icon: '🕉️', price: '₹13,500', tag: '5N/6D' },
  { slug: 'rishikesh', label: 'Rishikesh Adventure', route: '/rishikesh-from/', icon: '🚣', price: '₹5,500', tag: '2N/3D' },
  { slug: 'valley-of-flowers', label: 'Valley of Flowers', route: '/valley-of-flowers-from/', icon: '🌸', price: '₹8,500', tag: '4N/5D' },
  { slug: 'mussoorie', label: 'Mussoorie Tour', route: '/mussoorie-from/', icon: '🏔️', price: '₹5,500', tag: '2N/3D' },
  { slug: 'nainital', label: 'Nainital Tour', route: '/nainital-from/', icon: '🚣', price: '₹7,500', tag: '3N/4D' },
  { slug: 'varanasi', label: 'Varanasi Tour', route: '/varanasi-from/', icon: '🪔', price: '₹7,500', tag: '2N/3D' },
  { slug: 'mathura-vrindavan', label: 'Mathura Vrindavan', route: '/mathura-vrindavan-from/', icon: '🪈', price: '₹6,500', tag: '2N/3D' },
  { slug: 'ayodhya', label: 'Ayodhya Ram Mandir', route: '/ayodhya-from/', icon: '🕯️', price: '₹5,500', tag: '1N/2D' },
  { slug: 'golden-triangle', label: 'Golden Triangle Tour', route: '/golden-triangle-from/', icon: '🏛️', price: '₹18,000', tag: '5N/6D' },
  { slug: 'india-tour', label: 'All India Packages', route: '/india-tour-from/', icon: '🇮🇳', price: '₹8,500', tag: 'Custom' },
];

/* ── Month label map ────────────────────────────────────────────── */
const MONTH_LABELS: Record<string, string> = {
  january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
  may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
  september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
};

/* ── Types ──────────────────────────────────────────────────────── */
export interface MonthData {
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

interface Props {
  city: City;
  destSlug: string;
  destination: string;
  routeBase: string;
  basePrice: number;
  duration: string;
  heroImage: string;
  month: string;
  monthData: MonthData;
  allMonths: string[];
  pkg?: Package;
}

export default function CityMonthPage({
  city,
  destSlug,
  destination,
  routeBase,
  basePrice,
  duration,
  heroImage,
  month,
  monthData,
  allMonths,
  pkg,
}: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waMessage = `Namaste! I want to book ${destination} from ${city.name} in ${monthData.label} ${monthData.year}. Please share details.`;
  const waLink = `https://wa.me/919873897652?text=${encodeURIComponent(waMessage)}`;

  /* ── JSON-LD Schema ─────────────────────────────────────────── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `${destination} from ${city.name} in ${monthData.label} ${monthData.year}`,
        description: `${destination} package from ${city.name} in ${monthData.label} with Junegiri Yatra — Haridwar-based operator. ${monthData.weather}`,
        touristType: 'Religious pilgrimage',
        offers: {
          '@type': 'Offer',
          price: basePrice,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: `${monthData.year}-01-01`,
          seller: {
            '@type': 'TravelAgency',
            name: 'Junegiri Yatra',
            telephone: '+919873897652',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: monthData.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: destination, item: `https://junegiriyatra.com/from/${destSlug}/` },
          { '@type': 'ListItem', position: 3, name: `from ${city.name}`, item: `https://junegiriyatra.com/from/${destSlug}/${city.slug}/` },
          { '@type': 'ListItem', position: 4, name: `in ${monthData.label}`, item: `https://junegiriyatra.com/from/${destSlug}/${city.slug}/${month}/` },
        ],
      },
    ],
  };

  const otherDests = ALL_DESTINATIONS.filter((d) => d.slug !== destSlug);

  /* ── Styles ─────────────────────────────────────────────────── */
  const S = {
    condCard: {
      background: 'var(--card)',
      border: '1.5px solid var(--gold)',
      borderRadius: '16px',
      padding: '28px 32px',
      marginBottom: '32px',
    } as React.CSSProperties,
    condHeader: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--heading)',
      marginBottom: '20px',
    } as React.CSSProperties,
    condGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '20px',
    } as React.CSSProperties,
    condCell: {
      textAlign: 'center' as const,
    },
    condIcon: {
      fontSize: '1.4rem',
      display: 'block',
      marginBottom: '4px',
    },
    condLabel: {
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase' as const,
      color: 'var(--muted)',
      display: 'block',
      marginBottom: '4px',
    },
    condValue: {
      fontSize: '13px',
      color: 'rgba(255,248,238,0.88)',
      fontWeight: 600,
      display: 'block',
    },
    tagline: {
      fontStyle: 'italic' as const,
      color: 'var(--gold2)',
      fontSize: '0.95rem',
      marginBottom: '16px',
      display: 'block',
    },
    highlightList: {
      listStyle: 'none',
      padding: 0,
      margin: '16px 0',
    } as React.CSSProperties,
    highlightItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '6px 0',
      fontSize: '14px',
      color: 'rgba(255,248,238,0.82)',
      borderBottom: '1px solid rgba(201,146,61,0.1)',
    } as React.CSSProperties,
    bookingTip: {
      background: 'rgba(245, 177, 67, 0.12)',
      border: '1px solid rgba(245,177,67,0.3)',
      borderRadius: '10px',
      padding: '14px 18px',
      fontSize: '13.5px',
      color: 'rgba(255,248,238,0.88)',
      marginTop: '16px',
    } as React.CSSProperties,
    monthPills: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '10px',
      marginTop: '16px',
    },
    pill: (isCurrent: boolean) => ({
      padding: '8px 18px',
      borderRadius: '50px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      border: isCurrent ? '2px solid var(--gold)' : '1.5px solid rgba(201,146,61,0.3)',
      background: isCurrent ? 'rgba(201,146,61,0.2)' : 'transparent',
      color: isCurrent ? 'var(--gold2)' : 'rgba(255,248,238,0.6)',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.2s',
    } as React.CSSProperties),
  };

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── A. HERO ──────────────────────────────────────────────── */}
      <section className="city-hero">
        <Image
          src={heroImage}
          alt={`${destination} from ${city.name}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href={routeBase}>{destination}</Link>
            <span>›</span>
            <Link href={`${routeBase}${city.slug}/`}>from {city.name}</Link>
            <span>›</span>
            <span>{monthData.label} {monthData.year}</span>
          </nav>
          <h1 className="city-hero-h1">
            {destination} from {city.name}
            <br />
            <span className="city-name-gold">in {monthData.label} {monthData.year}</span>
          </h1>
          <p className="city-hero-sub">
            {city.total_time}&nbsp;·&nbsp;from{' '}
            <strong>₹{basePrice.toLocaleString('en-IN')}/person</strong>
          </p>
          <WaLink href={waLink} className="btn-gold-hero" label={`city_month_hero_${destSlug}_${month}`}>
            📲 Get {city.name} Quote on WhatsApp
          </WaLink>
        </div>
      </section>

      {/* ── B. MONTH CONDITIONS CARD ─────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <div style={S.condCard}>
            <p style={S.condHeader}>📅 {monthData.label} {monthData.year} — What to Expect</p>
            <div style={S.condGrid}>
              <div style={S.condCell}>
                <span style={S.condIcon}>🌤️</span>
                <span style={S.condLabel}>Weather</span>
                <span style={S.condValue}>{monthData.weather}</span>
              </div>
              <div style={S.condCell}>
                <span style={S.condIcon}>👥</span>
                <span style={S.condLabel}>Crowd</span>
                <span style={S.condValue}>{monthData.crowd}</span>
              </div>
              <div style={S.condCell}>
                <span style={S.condIcon}>🛕</span>
                <span style={S.condLabel}>Status</span>
                <span style={S.condValue}>{monthData.status}</span>
              </div>
              <div style={S.condCell}>
                <span style={S.condIcon}>💰</span>
                <span style={S.condLabel}>Pricing</span>
                <span style={S.condValue}>{monthData.price_tag}</span>
              </div>
            </div>
            <span style={S.tagline}>"{monthData.tagline}"</span>
            <ul style={S.highlightList}>
              {monthData.highlights.map((h, i) => (
                <li key={i} style={S.highlightItem}>
                  <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✦</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div style={S.bookingTip}>
              💡 <strong>Booking Tip:</strong> {monthData.booking_tip}
            </div>
          </div>
        </div>
      </section>

      {/* ── C. PACKAGE CTA CARD ──────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Our {destination} Package from {city.name}</h2>
          <div className="city-pkg-card">
            <div className="city-pkg-info">
              <div className="city-pkg-tag">{duration}</div>
              <h3 className="city-pkg-name">{pkg?.name ?? `${destination} Package`}</h3>
              <p className="city-pkg-overview">
                All-inclusive {destination} from {city.name} — hotel, meals, AC transport, guide, permits, and Haridwar pickup.
                Travel in {monthData.label} {monthData.year}: {monthData.status}.
              </p>
              <ul className="city-pkg-incl">
                <li>✓ AC transport from {city.name} or Haridwar pickup</li>
                <li>✓ All hotels (twin sharing, with meals)</li>
                <li>✓ Experienced registered guide</li>
                <li>✓ All pilgrimage permits and entry fees</li>
                <li>✓ {monthData.label} specific advice & alerts</li>
              </ul>
              <div className="city-pkg-price">
                Starting from <strong>₹{basePrice.toLocaleString('en-IN')}</strong>
                <span>/person</span>
                <em>Groups of 6+ get 10% off</em>
              </div>
            </div>
            <div className="city-pkg-cta">
              <WaLink href={waLink} className="btn-gold-lg" label={`city_month_pkg_${destSlug}_${month}`}>
                📲 WhatsApp for {city.name} Quote
              </WaLink>
              <a href="tel:+919873897652" className="btn-outline-lg">📞 Call +91 98738 97652</a>
              <p className="city-pkg-note">Free itinerary · No booking fee · Pay after confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── D. HOW TO REACH ──────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How to Reach from {city.name}</h2>
          <p className="section-sub-left">
            Your journey starts at Haridwar. Here&apos;s how to get there from {city.name}.
          </p>
          <div className="route-cards">
            <div className={`route-card${city.best_mode === 'fly' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">✈️</span>
                <span className="route-mode">By Flight</span>
                {city.best_mode === 'fly' && <span className="route-badge">Recommended</span>}
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>Route</td><td>{city.flight.route}</td></tr>
                  <tr><td>Duration</td><td>{city.flight.duration}</td></tr>
                  <tr><td>Airlines</td><td>{city.flight.airlines}</td></tr>
                  <tr><td>Fare</td><td>{city.flight.fare_range}</td></tr>
                  <tr><td>+Transfer</td><td>{city.haridwar_transfer}</td></tr>
                </tbody>
              </table>
            </div>
            <div className={`route-card${city.best_mode === 'train' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">🚆</span>
                <span className="route-mode">By Train</span>
                {city.best_mode === 'train' && <span className="route-badge">Recommended</span>}
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>Train</td><td>{city.train.name}</td></tr>
                  <tr><td>From → To</td><td>{city.train.from} → {city.train.to}</td></tr>
                  <tr><td>Duration</td><td>{city.train.duration}</td></tr>
                  <tr><td>+Transfer</td><td>{city.haridwar_transfer}</td></tr>
                </tbody>
              </table>
            </div>
            <div className={`route-card${city.best_mode === 'road' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">🚗</span>
                <span className="route-mode">By Road</span>
                {city.best_mode === 'road' && <span className="route-badge">Recommended</span>}
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>Distance</td><td>{city.distance_km != null ? city.distance_km.toLocaleString('en-IN') + ' km' : 'N/A (fly to Delhi)'}</td></tr>
                  <tr><td>Drive time</td><td>{city.road_hours && city.road_hours < 9999 ? `~${city.road_hours} hrs` : 'Not applicable'}</td></tr>
                  <tr><td>Via</td><td>NH-58 / NH-334</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="route-tip">💡 <strong>Pro tip:</strong> We arrange airport/station pick-up from Haridwar or Dehradun and get you to the hotel before evening aarti.</p>
        </div>
      </section>

      {/* ── E. MONTH FAQs ────────────────────────────────────────── */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">
            {destination} from {city.name} in {monthData.label} — FAQs
          </h2>
          <div className="faq-list">
            {monthData.faq.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="faq-chevron">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── F. OTHER MONTHS ──────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Other months to visit {destination}</h2>
          <p className="section-sub-left">
            Plan around your schedule — {destination} has different character each season.
          </p>
          <div style={S.monthPills}>
            {allMonths.map((m) => (
              <Link
                key={m}
                href={`/from/${destSlug}/${city.slug}/${m}/`}
                style={S.pill(m === month)}
              >
                {MONTH_LABELS[m] ?? m.charAt(0).toUpperCase() + m.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── G. ALSO EXPLORE FROM THIS CITY ──────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Also Explore from {city.name}</h2>
          <p className="section-sub-left light">
            More Uttarakhand & India experiences — same trusted team, same Haridwar base.
          </p>
          <div className="cross-dest-grid">
            {otherDests.map((dest) => (
              <Link key={dest.slug} href={`${dest.route}${city.slug}/`} className="cross-dest-card">
                <span className="cross-dest-icon">{dest.icon}</span>
                <div className="cross-dest-info">
                  <span className="cross-dest-name">{dest.label}</span>
                  <span className="cross-dest-meta">{dest.tag} · from {dest.price}/person</span>
                </div>
                <span className="cross-dest-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── H. CTA STRIP ─────────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">
              Ready to plan your {destination} from {city.name} in {monthData.label}?
            </p>
            <p className="city-cta-sub">Haridwar-based team — arranging pilgrimages & treks since 2017.</p>
          </div>
          <div className="city-cta-btns">
            <WaLink href={waLink} className="btn-gold-lg" label={`city_month_strip_${destSlug}_${month}`}>
              📲 WhatsApp Us Now
            </WaLink>
            <a href="tel:+919873897652" className="btn-outline-lg light">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
