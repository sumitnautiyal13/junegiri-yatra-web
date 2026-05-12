'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City, Package } from '@/types';

interface Props {
  city: City;
  charDhamPkg: Package;
}

const WA_BASE =
  'https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20Char%20Dham%20Yatra%20from%20';

const DHAM_NAMES = ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath'];

const INCLUSIONS = [
  'All accommodation (hotels + dharamshalas)',
  'Daily breakfast & dinner',
  'AC Tempo Traveller / SUV throughout',
  'Experienced local guide',
  'All forest & temple permits',
  'First-aid & oxygen cylinder',
];

export default function CityPage({ city, charDhamPkg }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const waLink = `${WA_BASE}${encodeURIComponent(city.name)}`;
  const basePrice = charDhamPkg?.price_from ?? 19800;

  /* ── JSON-LD ─────────────────────────────────────────── */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Char Dham Yatra from ${city.name}`,
        description: `Complete Char Dham Yatra package from ${city.name} covering Yamunotri, Gangotri, Kedarnath and Badrinath with Junegiri Yatra.`,
        touristType: 'Religious pilgrim',
        itinerary: {
          '@type': 'ItemList',
          itemListElement: DHAM_NAMES.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: d,
          })),
        },
        offers: {
          '@type': 'Offer',
          price: basePrice,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-04-01',
          validThrough: '2026-11-15',
          seller: {
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
        provider: {
          '@type': 'TravelAgency',
          name: 'Junegiri Yatra',
          url: 'https://junegiriyatra.com',
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
          { '@type': 'ListItem', position: 2, name: 'Char Dham Yatra', item: 'https://junegiriyatra.com/char-dham-from/' },
          {
            '@type': 'ListItem',
            position: 3,
            name: `From ${city.name}`,
            item: `https://junegiriyatra.com/char-dham-from/${city.slug}/`,
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to Book Char Dham Yatra from ${city.name}`,
        description: `Step-by-step guide to booking an all-inclusive Char Dham Yatra from ${city.name} with Junegiri Yatra.`,
        totalTime: 'PT30M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'INR', value: `${basePrice}` },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'WhatsApp Your Travel Dates',
            text: `Send a WhatsApp message to +91 98738 97652 with your preferred travel dates, group size, and departure city (${city.name}). Our Haridwar team responds within 60 minutes.`,
            url: `https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Char%20Dham%20Yatra%20from%20${encodeURIComponent(city.name)}`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Receive Your Custom Itinerary',
            text: 'Get a fully customised Char Dham Yatra itinerary with transparent all-inclusive pricing — hotel, meals, transport, guide, and all permits. No hidden costs. No booking fee.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Confirm With 30% Advance',
            text: `Pay 30% advance to confirm your seats. We handle all arrangements from your ${city.name} departure to the final drop — flights/train advice, Haridwar hotel, all 4 dhams, and return transfer.`,
          },
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

      {/* ── HERO — next/image fill+priority for LCP ─────── */}
      <section className="city-hero">
        <Image src={city.hero_image} alt="Char Dham Yatra" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/">Packages</Link>
            <span>›</span>
            <span>Char Dham from {city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            Char Dham Yatra<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            {city.total_time} &nbsp;·&nbsp; All-inclusive from{' '}
            <strong>₹{basePrice.toLocaleString('en-IN')}/person</strong>
          </p>
          <a href={waLink} className="btn-gold-hero" target="_blank" rel="noopener noreferrer">
            📲 Get {city.name} Quote on WhatsApp
          </a>
        </div>
      </section>

      {/* ── CULTURAL HOOK ────────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">✨ {city.cultural_hook}</p>
        </div>
      </section>

      {/* ── TRAVEL ROUTES TABLE ──────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            How to Reach Haridwar from {city.name}
          </h2>
          <p className="section-sub-left">
            Your Char Dham Yatra starts from Haridwar. Here&apos;s every route from{' '}
            {city.name} ({city.state}).
          </p>

          <div className="route-cards">
            {/* FLIGHT */}
            <div className="route-card route-best">
              <div className="route-card-header">
                <span className="route-icon">✈️</span>
                <span className="route-mode">By Flight</span>
                {city.best_mode === 'fly' && (
                  <span className="route-badge">Recommended</span>
                )}
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>Route</td><td>{city.flight.route}</td></tr>
                  <tr><td>Duration</td><td>{city.flight.duration}</td></tr>
                  <tr><td>Airlines</td><td>{city.flight.airlines}</td></tr>
                  <tr><td>Frequency</td><td>{city.flight.frequency}</td></tr>
                  <tr><td>Fare</td><td>{city.flight.fare_range}</td></tr>
                  <tr><td>+Transfer</td><td>{city.haridwar_transfer}</td></tr>
                </tbody>
              </table>
            </div>

            {/* TRAIN */}
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
                  <tr><td>Train</td><td>{city.train.name}</td></tr>
                  <tr><td>From</td><td>{city.train.from}</td></tr>
                  <tr><td>To</td><td>{city.train.to}</td></tr>
                  <tr><td>Duration</td><td>{city.train.duration}</td></tr>
                  <tr><td>+Transfer</td><td>{city.haridwar_transfer}</td></tr>
                </tbody>
              </table>
            </div>

            {/* ROAD */}
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
                  <tr><td>Distance</td><td>{city.distance_km != null ? city.distance_km.toLocaleString('en-IN') + ' km' : 'N/A (fly to Delhi)'}</td></tr>
                  <tr><td>Drive time</td><td>{city.road_hours && city.road_hours < 9999 ? `~${city.road_hours} hours` : 'Not applicable'}</td></tr>
                  <tr><td>Via</td><td>NH-58 / NH-334</td></tr>
                  <tr><td>Best for</td><td>Groups with private car</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="route-tip">
            💡 <strong>Pro tip:</strong> We can arrange airport / railway station pick-up from Haridwar or
            Dehradun and get you to your hotel before the evening Ganga Aarti.
          </p>
        </div>
      </section>

      {/* ── CHAR DHAM OVERVIEW ───────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">
            The Four Sacred Dhams
          </h2>
          <p className="section-sub-left light">
            All four shrines in a single seamless circuit from {city.name}.
          </p>
          <div className="dham-grid">
            {[
              { name: 'Yamunotri', alt: 'Day 1–2', desc: 'Origin of River Yamuna · 3,293 m altitude · Trek 6 km from Janki Chatti' },
              { name: 'Gangotri', alt: 'Day 3–4', desc: 'Source of the Ganga · 3,100 m · Drive-up temple, no trek required' },
              { name: 'Kedarnath', alt: 'Day 5–7', desc: 'Lord Shiva\'s abode · 3,584 m · Helicopter or 16 km trek from Gaurikund' },
              { name: 'Badrinath', alt: 'Day 8–9', desc: 'Lord Vishnu\'s shrine · 3,133 m · Drive-up, closes after Diwali' },
            ].map((d) => (
              <div key={d.name} className="dham-card">
                <span className="dham-tag">{d.alt}</span>
                <h3 className="dham-name">{d.name}</h3>
                <p className="dham-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGE CTA CARD ─────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Our Char Dham Package from {city.name}
          </h2>
          <div className="city-pkg-card">
            <div className="city-pkg-info">
              <div className="city-pkg-tag">Most Popular · 9 Nights / 10 Days</div>
              <h3 className="city-pkg-name">{charDhamPkg?.name ?? 'Char Dham Yatra Package'}</h3>
              <p className="city-pkg-overview">
                Complete Yamunotri · Gangotri · Kedarnath · Badrinath circuit departing from Haridwar.
                All ground transport, hotels, meals and permits included. You fly from {city.name}, we take care of everything else.
              </p>
              <ul className="city-pkg-incl">
                {INCLUSIONS.map((inc) => (
                  <li key={inc}>✓ {inc}</li>
                ))}
              </ul>
              <div className="city-pkg-price">
                Starting from{' '}
                <strong>₹{basePrice.toLocaleString('en-IN')}</strong>
                <span>/person</span>
                <em> · Groups of 6+ get 10% off</em>
              </div>
            </div>
            <div className="city-pkg-cta">
              <a
                href={waLink}
                className="btn-gold-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                📲 WhatsApp for {city.name} Quote
              </a>
              <a href="tel:+919873897652" className="btn-outline-lg">
                📞 Call +91 98738 97652
              </a>
              <p className="city-pkg-note">
                Free itinerary · No booking fee · Pay after confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">
            Char Dham Yatra from {city.name} — FAQs
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

      {/* ── ALSO EXPLORE FROM THIS CITY ──────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Also Explore from {city.name}</h2>
          <p className="section-sub-left">More pilgrimages & adventures from {city.name} — same Haridwar-based team.</p>
          <div className="cross-dest-grid">
            {[
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
            ].map((dest) => (
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

      {/* ── BOTTOM CTA STRIP ─────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">
              Ready to plan your Char Dham Yatra from {city.name}?
            </p>
            <p className="city-cta-sub">
              Talk to our Haridwar-based team — we&apos;ve been arranging this circuit since 2017.
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
