'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City, Package } from '@/types';
import WABookingCard from '@/components/WABookingCard';
import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';

interface TrekData {
  months: string[];
  season_label: string;
  best_months: string[];
}

interface Props {
  city: City;
  slug: string;
  pkg: Package | undefined;
  trekData: TrekData;
}

// 5 popular treks to cross-link from every Trek×City page
const POPULAR_TREKS = [
  { slug: 'kedarkantha-trek-5n-6d', name: 'Kedarkantha Trek', tag: '5N/6D', icon: '❄️', price: '₹9,500' },
  { slug: 'valley-of-flowers-trek-4n-5d', name: 'Valley of Flowers', tag: '4N/5D', icon: '🌸', price: '₹8,500' },
  { slug: 'har-ki-dun-trek-5n-6d', name: 'Har Ki Dun Trek', tag: '5N/6D', icon: '🏔️', price: '₹10,500' },
  { slug: 'chopta-tungnath-trek-3n-4d', name: 'Chopta Tungnath', tag: '3N/4D', icon: '⛰️', price: '₹7,500' },
  { slug: 'kuari-pass-trek-4n-5d', name: 'Kuari Pass Trek', tag: '4N/5D', icon: '🌄', price: '₹9,000' },
];

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function TrekCityPage({ city, slug, pkg, trekData }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currency, geo } = useCurrency();

  const trekName = pkg?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const heroImage = pkg?.hero_image ?? '/images/trek_himalaya.webp';
  const price = pkg?.price_from ?? 9500;
  const duration = pkg?.duration ?? '';

  // Geo-aware price for hero display
  const displayPrice = geo.isLoading
    ? `₹${price.toLocaleString('en-IN')}`
    : formatPrice(price, currency, pkg?.intl_price_usd);

  // Legacy plain WA link (used for non-card CTAs like hero button)
  const waText = encodeURIComponent(
    `Namaste! I want to book ${trekName} from ${city.name}. Please share package details and available dates.`
  );
  const waLink = `https://wa.me/919873897652?text=${waText}`;

  // ── JSON-LD ─────────────────────────────────────────────────────────────
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `${trekName} from ${city.name}`,
        description: `${trekName} package from ${city.name} — ${trekData.season_label}. All-inclusive with expert guides from Haridwar.`,
        touristType: 'Outdoor recreation',
        itinerary: pkg?.itinerary
          ? {
              '@type': 'ItemList',
              itemListElement: pkg.itinerary.map((day, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: day.title,
              })),
            }
          : undefined,
        offers: {
          '@type': 'Offer',
          price: price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'TravelAgency',
            name: 'Junegiri Yatra',
            telephone: '+919873897652',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: city.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: trekName, item: `https://junegiriyatra.com/trek/${slug}/from/` },
          { '@type': 'ListItem', position: 3, name: `from ${city.name}`, item: `https://junegiriyatra.com/trek/${slug}/from/${city.slug}/` },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to Book ${trekName} from ${city.name}`,
        description: `Step-by-step guide to booking an all-inclusive ${trekName} package from ${city.name} with Junegiri Yatra.`,
        totalTime: 'PT30M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: `${price}` },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'WhatsApp Your Travel Dates',
            text: `Send a WhatsApp to +91 98738 97652 with your preferred trekking dates, group size, and departure city (${city.name}). Our team responds within 60 minutes.`,
            url: waLink,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Receive Your Custom Trek Itinerary',
            text: `Get a detailed ${trekName} itinerary with transparent all-inclusive pricing — accommodation, meals, guides, permits, and transport. No hidden costs.`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Confirm With 30% Advance',
            text: `Pay 30% advance to lock your dates. We handle all arrangements including your ${city.name} departure advice, Haridwar transfers, and complete on-ground logistics.`,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="city-hero">
        <Image
          src={heroImage}
          alt={trekName}
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
            <Link href="/himalayan-treks/">Himalayan Treks</Link>
            <span>›</span>
            <Link href={`/trek/${slug}/from/`}>{trekName}</Link>
            <span>›</span>
            <span>from {city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            {trekName}
            <br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            {city.total_time}&nbsp;·&nbsp;All-inclusive from{' '}
            <strong>{displayPrice}/person</strong>
            {duration && <>&nbsp;·&nbsp;{duration}</>}
          </p>
          <a
            href={waLink}
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 Get {city.name} Trek Quote on WhatsApp
          </a>
        </div>
      </section>

      {/* ── CULTURAL HOOK ─────────────────────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">✨ {city.cultural_hook}</p>
        </div>
      </section>

      {/* ── SEASON OVERVIEW ───────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            {trekName} — Season Overview
          </h2>
          <p className="section-sub-left">
            <strong>{trekData.season_label}</strong> — this trek operates across{' '}
            {trekData.months.length} months of the year.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>Best months:</span>
            {trekData.best_months.map((m) => (
              <Link
                key={m}
                href={`/packages/${slug}/${m}/`}
                className="route-badge"
                style={{ marginRight: '0.5rem', display: 'inline-block', marginBottom: '0.4rem' }}
              >
                {capitalize(m)}
              </Link>
            ))}
          </div>
          <div>
            <span style={{ fontWeight: 600, marginRight: '0.5rem' }}>All months:</span>
            {trekData.months.map((m) => (
              <Link
                key={m}
                href={`/packages/${slug}/${m}/`}
                style={{
                  display: 'inline-block',
                  marginRight: '0.5rem',
                  marginBottom: '0.4rem',
                  padding: '0.25rem 0.75rem',
                  border: '1px solid #d4a843',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  color: '#d4a843',
                  textDecoration: 'none',
                  background: trekData.best_months.includes(m) ? 'rgba(212,168,67,0.12)' : 'transparent',
                }}
              >
                {capitalize(m)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REACH ──────────────────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">How to Reach from {city.name}</h2>
          <p className="section-sub-left light">
            Your trek starts at Haridwar/Rishikesh. Here&apos;s how to get there from{' '}
            {city.name}.
          </p>
          <div className="route-cards">
            {/* Flight */}
            <div className={`route-card${city.best_mode === 'fly' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">✈️</span>
                <span className="route-mode">By Flight</span>
                {city.best_mode === 'fly' && (
                  <span className="route-badge">Recommended</span>
                )}
              </div>
              <table className="route-table">
                <tbody>
                  <tr>
                    <td>Route</td>
                    <td>{city.flight.route}</td>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <td>{city.flight.duration}</td>
                  </tr>
                  <tr>
                    <td>Airlines</td>
                    <td>{city.flight.airlines}</td>
                  </tr>
                  <tr>
                    <td>Fare</td>
                    <td>{city.flight.fare_range}</td>
                  </tr>
                  <tr>
                    <td>+Transfer</td>
                    <td>{city.haridwar_transfer}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Train */}
            <div className={`route-card${city.best_mode === 'train' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">🚆</span>
                <span className="route-mode">By Train</span>
                {city.best_mode === 'train' && (
                  <span className="route-badge">Recommended</span>
                )}
              </div>
              <table className="route-table">
                <tbody>
                  <tr>
                    <td>Train</td>
                    <td>{city.train.name}</td>
                  </tr>
                  <tr>
                    <td>From → To</td>
                    <td>
                      {city.train.from} → {city.train.to}
                    </td>
                  </tr>
                  <tr>
                    <td>Duration</td>
                    <td>{city.train.duration}</td>
                  </tr>
                  <tr>
                    <td>+Transfer</td>
                    <td>{city.haridwar_transfer}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Road */}
            <div className={`route-card${city.best_mode === 'road' ? ' route-best' : ''}`}>
              <div className="route-card-header">
                <span className="route-icon">🚗</span>
                <span className="route-mode">By Road</span>
                {city.best_mode === 'road' && (
                  <span className="route-badge">Recommended</span>
                )}
              </div>
              <table className="route-table">
                <tbody>
                  <tr>
                    <td>Distance</td>
                    <td>
                      {city.distance_km != null
                        ? city.distance_km.toLocaleString('en-IN') + ' km'
                        : 'N/A (fly to Delhi)'}
                    </td>
                  </tr>
                  <tr>
                    <td>Drive time</td>
                    <td>
                      {city.road_hours && city.road_hours < 9999
                        ? `~${city.road_hours} hrs`
                        : 'Not applicable'}
                    </td>
                  </tr>
                  <tr>
                    <td>Via</td>
                    <td>NH-58 / NH-334</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="route-tip">
            💡 <strong>Pro tip:</strong> We arrange airport / station pick-up from Haridwar or
            Dehradun and get you to the trek base village in time.
          </p>
        </div>
      </section>

      {/* ── PACKAGE CTA CARD ──────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Our {trekName} Package from {city.name}
          </h2>
          <div className="city-pkg-card">
            <div className="city-pkg-info">
              {pkg?.tag && <div className="city-pkg-tag">{pkg.tag}</div>}
              <h3 className="city-pkg-name">{pkg?.name ?? trekName}</h3>
              <p className="city-pkg-overview">
                {pkg?.overview ??
                  `All-inclusive ${trekName} with expert Himalayan guides. Accommodation, meals, permits, and transfers included from Haridwar base.`}
              </p>
              {pkg?.inclusions && pkg.inclusions.length > 0 && (
                <ul className="city-pkg-incl">
                  {pkg.inclusions.slice(0, 6).map((inc) => (
                    <li key={inc}>✓ {inc}</li>
                  ))}
                </ul>
              )}
              <div className="city-pkg-price">
                Starting from{' '}
                <strong>{displayPrice}</strong>
                <span>/person</span>
                <em> · Groups of 6+ get 10% off</em>
              </div>
            </div>
            <div className="city-pkg-cta">
              {pkg && (
                <WABookingCard
                  pkg={pkg}
                  cityName={city.name}
                  trekName={trekName}
                  variant="card"
                />
              )}
              <a href="tel:+919873897652" className="btn-outline-lg" style={{ marginTop: 12 }}>
                📞 Call +91 98738 97652
              </a>
              <p className="city-pkg-note">
                Free itinerary · No booking fee · Pay after confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CITY FAQ ACCORDION ────────────────────────────────────────── */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">
            {trekName} from {city.name} — FAQs
          </h2>
          <div className="faq-list">
            {city.faq.map((f, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' open' : ''}`}
              >
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className="faq-chevron"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALSO EXPLORE FROM CITY ────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Also Explore from {city.name}</h2>
          <p className="section-sub-left">
            More Himalayan treks — same trusted team, same Haridwar base.
          </p>
          <div className="cross-dest-grid">
            {POPULAR_TREKS.filter((t) => t.slug !== slug).map((trek) => (
              <Link
                key={trek.slug}
                href={`/trek/${trek.slug}/from/${city.slug}/`}
                className="cross-dest-card"
              >
                <span className="cross-dest-icon">{trek.icon}</span>
                <div className="cross-dest-info">
                  <span className="cross-dest-name">{trek.name}</span>
                  <span className="cross-dest-meta">
                    {trek.tag} · from {trek.price}/person
                  </span>
                </div>
                <span className="cross-dest-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">
              Ready to plan your {trekName} from {city.name}?
            </p>
            <p className="city-cta-sub">
              Haridwar-based team — expert Himalayan guides since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href={waLink}
              className="btn-gold-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              📲 WhatsApp Us Now
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg light">
              📞 +91 98738 97652
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
