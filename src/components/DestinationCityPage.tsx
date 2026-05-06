'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { City, Package } from '@/types';
import WaLink from '@/components/WaLink';

/* ─── Config type ────────────────────────────────────────── */
export interface DestinationHighlight {
  name: string;
  alt: string;    // e.g. "Day 1"
  desc: string;
}

export interface DestinationConfig {
  destination: string;          // "Kedarnath"
  destinationSlug: string;      // "kedarnath"
  routeBase: string;            // "/kedarnath-from/"
  heroImage: string;
  packageSlug: string;          // slug to find in packages array
  basePrice: number;
  duration: string;             // "3 Nights / 4 Days"
  tag: string;                  // "Most Popular · 3N/4D"
  overview: string;             // 1-2 sentence description
  highlights: DestinationHighlight[];
  inclusions: string[];
  /** Pre-computed at server page — full WA message string (city name already substituted) */
  waMessage: string;
  extraFromHaridwar: string;    // "Plus 6-hr drive to Gaurikund"
  sectionTitle: string;         // "The Sacred Kedarnath"
  /** Pre-computed at server page — subtitle with city name already substituted */
  sectionSub: string;
  schemaType: string;           // "Religious pilgrimage" | "Outdoor recreation"
}

interface Props {
  city: City;
  pkg: Package | undefined;
  config: DestinationConfig;
}

export default function DestinationCityPage({ city, pkg, config }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const basePrice = pkg?.price_from ?? config.basePrice;
  const waLink = `https://wa.me/919873897652?text=${encodeURIComponent(config.waMessage)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `${config.destination} from ${city.name}`,
        description: `${config.destination} package from ${city.name} with Junegiri Yatra — Haridwar based operator.`,
        touristType: config.schemaType,
        itinerary: {
          '@type': 'ItemList',
          itemListElement: config.highlights.map((h, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: h.name,
          })),
        },
        offers: {
          '@type': 'Offer',
          price: basePrice,
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
          { '@type': 'ListItem', position: 2, name: config.destination, item: `https://junegiriyatra.com${config.routeBase}` },
          { '@type': 'ListItem', position: 3, name: `from ${city.name}`, item: `https://junegiriyatra.com${config.routeBase}${city.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="city-hero" style={{ backgroundImage: `url('${config.heroImage}')` }}>
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href={config.routeBase}>{config.destination}</Link>
            <span>›</span>
            <span>from {city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            {config.destination}<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            {city.total_time}&nbsp;·&nbsp;All-inclusive from{' '}
            <strong>₹{basePrice.toLocaleString('en-IN')}/person</strong>
          </p>
          <WaLink href={waLink} className="btn-gold-hero" target="_blank" rel="noopener noreferrer"
            label={`city_hero_${config.destinationSlug}`}>
            📲 Get {city.name} Quote on WhatsApp
          </WaLink>
        </div>
      </section>

      {/* CULTURAL HOOK */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">✨ {city.cultural_hook}</p>
        </div>
      </section>

      {/* TRAVEL ROUTES */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How to Reach from {city.name}</h2>
          <p className="section-sub-left">
            Your journey starts at Haridwar. Here&apos;s how to get there from {city.name}.
            {config.extraFromHaridwar && <><br /><strong>{config.extraFromHaridwar}</strong></>}
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
                  <tr><td>Distance</td><td>{city.distance_km.toLocaleString('en-IN')} km</td></tr>
                  <tr><td>Drive time</td><td>~{city.road_hours} hrs</td></tr>
                  <tr><td>Via</td><td>NH-58 / NH-334</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="route-tip">💡 <strong>Pro tip:</strong> We arrange airport / station pick-up from Haridwar or Dehradun and get you to the hotel before evening aarti.</p>
        </div>
      </section>

      {/* DESTINATION HIGHLIGHTS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">{config.sectionTitle}</h2>
          <p className="section-sub-left light">{config.sectionSub}</p>
          <div className="dham-grid">
            {config.highlights.map((h) => (
              <div key={h.name} className="dham-card">
                <span className="dham-tag">{h.alt}</span>
                <h3 className="dham-name">{h.name}</h3>
                <p className="dham-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGE CTA */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Our {config.destination} Package from {city.name}</h2>
          <div className="city-pkg-card">
            <div className="city-pkg-info">
              <div className="city-pkg-tag">{config.tag}</div>
              <h3 className="city-pkg-name">{pkg?.name ?? `${config.destination} Package`}</h3>
              <p className="city-pkg-overview">{config.overview}</p>
              <ul className="city-pkg-incl">
                {config.inclusions.map((inc) => <li key={inc}>✓ {inc}</li>)}
              </ul>
              <div className="city-pkg-price">
                Starting from <strong>₹{basePrice.toLocaleString('en-IN')}</strong>
                <span>/person</span>
                <em> · Groups of 6+ get 10% off</em>
              </div>
            </div>
            <div className="city-pkg-cta">
              <WaLink href={waLink} className="btn-gold-lg" target="_blank" rel="noopener noreferrer"
                label={`city_pkg_cta_${config.destinationSlug}`}>
                📲 WhatsApp for {city.name} Quote
              </WaLink>
              <a href="tel:+919873897652" className="btn-outline-lg">📞 Call +91 98738 97652</a>
              <p className="city-pkg-note">Free itinerary · No booking fee · Pay after confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">{config.destination} from {city.name} — FAQs</h2>
          <div className="faq-list">
            {city.faq.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="faq-chevron">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
                {openFaq === i && <div className="faq-a"><p>{f.a}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready to plan your {config.destination} from {city.name}?</p>
            <p className="city-cta-sub">Haridwar-based team — arranging pilgrimages & treks since 2017.</p>
          </div>
          <div className="city-cta-btns">
            <WaLink href={waLink} className="btn-gold-lg" target="_blank" rel="noopener noreferrer"
              label={`city_strip_${config.destinationSlug}`}>📲 WhatsApp Us Now</WaLink>
            <a href="tel:+919873897652" className="btn-outline-lg light">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
