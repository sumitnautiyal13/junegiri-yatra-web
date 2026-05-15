'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City } from '@/types';
import WaLink from '@/components/WaLink';

interface Props { city: City }

/* ── Flight data ─────────────────────────────────────────── */
const FLIGHT_DATA: Record<string, {
  hub: string; via: string; duration: string; fare: string; airlines: string;
}> = {
  mumbai:    { hub: 'BOM', via: 'direct Singapore (SIN)',           duration: '5.5 hrs',  fare: '₹13,000–₹26,000', airlines: 'IndiGo, Singapore Airlines, Air India' },
  delhi:     { hub: 'DEL', via: 'direct Singapore (SIN)',           duration: '6 hrs',    fare: '₹14,000–₹28,000', airlines: 'IndiGo, Singapore Airlines, Air India' },
  bangalore: { hub: 'BLR', via: 'direct Singapore (SIN)',           duration: '5 hrs',    fare: '₹12,000–₹24,000', airlines: 'IndiGo, Singapore Airlines, Scoot' },
  chennai:   { hub: 'MAA', via: 'direct Singapore (SIN)',           duration: '4 hrs',    fare: '₹10,000–₹22,000', airlines: 'IndiGo, Singapore Airlines, Scoot' },
  hyderabad: { hub: 'HYD', via: 'direct Singapore (SIN)',           duration: '5 hrs',    fare: '₹12,000–₹24,000', airlines: 'IndiGo, Singapore Airlines' },
  kolkata:   { hub: 'CCU', via: 'direct Singapore (SIN)',           duration: '5 hrs',    fare: '₹12,000–₹24,000', airlines: 'IndiGo, Singapore Airlines' },
  kochi:     { hub: 'COK', via: 'Singapore (SIN) via Chennai',      duration: '6–7 hrs',  fare: '₹14,000–₹26,000', airlines: 'Singapore Airlines, Scoot' },
};
const DEFAULT_FLIGHT = {
  hub: 'nearest hub airport',
  via: 'nearest hub + Singapore (SIN)',
  duration: '7–12 hrs',
  fare: '₹16,000–₹32,000',
  airlines: 'IndiGo, Singapore Airlines, Scoot',
};

/* ── Itinerary ───────────────────────────────────────────── */
const DAYS = [
  { day: 'DAY 1', title: 'Arrival Singapore',                  desc: 'Changi Airport arrival · MRT/transfer to hotel (Geylang/Bugis) · Merlion Park · Marina Bay Sands Skypark (evening)' },
  { day: 'DAY 2', title: 'Gardens by the Bay & Flyer',        desc: 'Cloud Forest & Flower Dome (both conservatories) · Singapore Flyer · Clarke Quay evening' },
  { day: 'DAY 3', title: 'Sentosa Island',                     desc: 'Universal Studios Singapore · Palawan Beach · Resorts World Sentosa · iFly or Adventure Cove (optional)' },
  { day: 'DAY 4', title: 'Cultural Singapore',                 desc: 'Chinatown · Little India · Orchard Road shopping · Night Safari (optional, own expense)' },
  { day: 'DAY 5', title: 'Wildlife & Farewell',               desc: 'Singapore Zoo · Bird Paradise (Jurong) · Haw Par Villa · Farewell dinner at Newton Food Centre' },
  { day: 'DAY 6', title: 'Shopping & Departure',              desc: 'Mustafa Centre (shopping) · Changi Jewel waterfall (HSBC Rain Vortex) · Departure transfer' },
];

/* ── Inclusions ──────────────────────────────────────────── */
const INCLUDED = [
  'Airport transfers (SIN pickup & drop)',
  'Hotel 5 nights — 3-star Geylang/Bugis (with breakfast)',
  'Gardens by the Bay (Cloud Forest + Flower Dome)',
  'Singapore Flyer ticket',
  'Singapore Zoo entry',
  'City tour in AC coach (Chinatown, Little India, Orchard)',
  'MRT tourist day-pass for city transport',
  'All transfers throughout the trip',
];
const EXCLUDED = [
  'Airfare (book separately)',
  'Airfare (book separately — flight not included)',
  'Travel insurance',
  'Universal Studios tickets (own expense)',
  'Night Safari (optional, own expense)',
  'Lunch & dinner (except farewell dinner at Newton)',
  'Personal expenses & shopping',
  'Tips & gratuities',
];

const CITY_LINKS = [
  { name: 'Mumbai', slug: 'mumbai' }, { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' }, { name: 'Chennai', slug: 'chennai' },
  { name: 'Hyderabad', slug: 'hyderabad' }, { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Pune', slug: 'pune' }, { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Kochi', slug: 'kochi' }, { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Chandigarh', slug: 'chandigarh' }, { name: 'Lucknow', slug: 'lucknow' },
];

/* ─────────────────────────────────────────────────────────── */
export default function SingaporeCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Singapore 5N6D package from ${city.name}`;
  const waLink = `https://wa.me/919873897652?text=${encodeURIComponent(waText)}`;

  const faqs = [
    {
      q: `Which airport do I fly from ${city.name} to Singapore?`,
      a: `From ${city.name} (${flight.hub}), fly to Singapore Changi (SIN) via ${flight.via}. Total flight time: ~${flight.duration}. Airlines: ${flight.airlines}. Return fares: ${flight.fare}.`,
    },
    {
      q: `What is the total Singapore trip cost from ${city.name}?`,
      a: `Package from $680/person (≈₹57,000). Add flights from ${city.name}: ${flight.fare} approx. Total budget per person: ₹72,000–₹1,10,000 depending on hotel choice, flight timing and season.`,
    },
    {
      q: `Do I need a visa for Singapore from ${city.name}?`,
      a: `No visa is required for Indian passport holders visiting Singapore as tourists. You get a 30-day visa-free entry on arrival at Changi Airport. Carry a valid Indian passport (6 months validity) and return ticket.`,
    },
    {
      q: `What is the best time to visit Singapore from ${city.name}?`,
      a: `Singapore is a year-round destination — warm (25–32°C) throughout. February–April has least rainfall. November–January = more rain but also festive season (Deepavali, Christmas). Package runs year-round on demand (min 2 pax).`,
    },
    {
      q: `Can I change the travel dates for this Singapore package?`,
      a: `Yes — we operate on demand for groups of min 2 pax. WhatsApp us with preferred dates and group size. We respond within 1 hour during business hours.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Singapore 5N/6D Tour Package from ${city.name} — Gardens · Sentosa · City`,
        description: `6-day Singapore tour from ${city.name}. Gardens by the Bay, Sentosa, Singapore Zoo, no visa required from $680/person.`,
        touristType: 'Family & Cultural travelers',
        offers: {
          '@type': 'Offer', price: '680', priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+919873897652' },
        },
        provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra', url: 'https://junegiriyatra.com' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question', name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'Singapore Package', item: 'https://junegiriyatra.com/packages/singapore-tour-5n-6d/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/singapore-from/${city.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '68vh' }}>
        <Image
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop"
          alt={`Singapore tour package from ${city.name}`}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/singapore-tour-5n-6d/">Singapore Package</Link><span>›</span>
            <span>From {city.name}</span>
          </nav>

          <h1 className="city-hero-h1">
            Singapore Tour Package<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>

          <p className="city-hero-sub">
            Gardens by the Bay · Sentosa · Universal Studios · Singapore Zoo · Marina Bay 🌿<br />
            <strong>No visa required for Indians · From $680 / person · Min 2 Pax</strong>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`singapore_hero_${city.slug}`}
              className="btn-gold-hero"
            >
              📲 WhatsApp from {city.name}
            </WaLink>
            <Link href="/packages/singapore-tour-5n-6d/" className="btn btn-outline">
              📋 View Full Package
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLIGHT HOOK BAR ──────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✈️ <strong>{city.name} ({flight.hub})</strong> → Singapore Changi (SIN) via {flight.via} &nbsp;·&nbsp;
            ~<strong>{flight.duration}</strong> &nbsp;·&nbsp; Return fares from <strong>{flight.fare}</strong> &nbsp;·&nbsp;
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`singapore_bar_${city.slug}`}
              style={{ color: 'var(--gold2)', fontWeight: 700, textDecoration: 'underline' }}>
              Get combined quote →
            </WaLink>
          </p>
        </div>
      </section>

      {/* ── QUICK STATS ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="container">
          <div className="qi-row">
            <div className="qi-card"><div className="qi-label">Duration</div><div className="qi-value">6 Days / 5 Nights</div></div>
            <div className="qi-card"><div className="qi-label">Highlights</div><div className="qi-value">Gardens · Sentosa · Zoo</div></div>
            <div className="qi-card"><div className="qi-label">Price</div><div className="qi-value">From $680 / person</div></div>
            <div className="qi-card"><div className="qi-label">From {city.name}</div><div className="qi-value">~{flight.duration} flight</div></div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <p className="s-sub">6 days of gardens, wildlife, culture &amp; Sentosa</p>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {DAYS.map((d, i) => (
              <div key={i} className="day-card fade-in">
                <div className="day-num">{d.day}</div>
                <div className="day-title">{d.title}</div>
                <div className="day-desc">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUSIONS ───────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">What&apos;s <em>Included</em></h2>
          <div className="s-line" />
          <div className="inc-grid">
            <div className="inc-box included">
              <h3>✓ Included in Package</h3>
              {INCLUDED.map((item, i) => (
                <div key={i} className="inc-item"><span className="ck">✓</span> {item}</div>
              ))}
            </div>
            <div className="inc-box excluded">
              <h3>✗ Not Included</h3>
              {[`Airfare from ${city.name}`, ...EXCLUDED.slice(1)].map((item, i) => (
                <div key={i} className="inc-item"><span className="cr">✗</span> {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT INFO ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Flights from <em>{city.name}</em> to Singapore</h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="cdf-includes-grid">
              {[
                { icon: '✈️', title: 'Route', desc: `${city.name} (${flight.hub}) → Singapore Changi (SIN) via ${flight.via}` },
                { icon: '⏱️', title: 'Total Flight Time', desc: `Approx ${flight.duration} including layover (if any)` },
                { icon: '💸', title: 'Return Fare Range', desc: `${flight.fare} per person (varies by season)` },
                { icon: '🛫', title: 'Airlines', desc: flight.airlines },
                { icon: '🏙️', title: 'Arrival Airport', desc: 'Singapore Changi (SIN) — rated world\'s best airport. MRT straight to city in 30 min.' },
                { icon: '🛂', title: 'Visa Requirement', desc: 'No visa required for Indian passport holders. 30-day visa-free entry on arrival at Changi.' },
              ].map(item => (
                <div key={item.title} className="cdf-include-card">
                  <span className="cdf-include-icon">{item.icon}</span>
                  <div>
                    <div className="cdf-include-title">{item.title}</div>
                    <div className="cdf-include-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Package <em>Pricing</em></h2>
          <div className="s-line" />
          <p className="s-sub">Land package only · Flights booked separately · Min 2 Pax</p>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { label: 'Option 1 — Standard', hotel: '3-star Geylang/Bugis area (standard rooms)', price: '$680', badge: 'Most Popular', waMsg: `Namaste! I want to book Option 1 Singapore 5N6D from ${city.name}` },
              { label: 'Option 2 — Upgraded', hotel: '4-star Marina / Clarke Quay area hotel', price: '$850', badge: 'Best Experience', waMsg: `Namaste! I want to book Option 2 Singapore 5N6D from ${city.name}` },
            ].map(opt => (
              <div key={opt.label} style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 28, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', color: '#07051A', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {opt.badge}
                </span>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{opt.label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1 }}>{opt.price}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginLeft: 4 }}>/person</span></div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22 }}>🏨 {opt.hotel}</div>
                <WaLink
                  href={`https://wa.me/919873897652?text=${encodeURIComponent(opt.waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  label={`singapore_price_${city.slug}`}
                  className="btn btn-gold"
                  style={{ display: 'block', textAlign: 'center', padding: '12px 0', borderRadius: 50 }}
                >
                  📲 Book This Option
                </WaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section city-section-faq" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Frequently Asked <em>Questions</em></h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' active' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq-arrow">▼</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER CITIES ─────────────────────────────────── */}
      <section className="city-links-section">
        <div className="container">
          <h2 className="section-title-left">Book from Other Cities</h2>
          <p className="section-sub-left">Singapore packages available from all major Indian cities.</p>
          <div className="city-links-grid">
            {CITY_LINKS.filter(c => c.slug !== city.slug).map(c => (
              <Link key={c.slug} href={`/singapore-from/${c.slug}/`} className="city-link-chip">
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/singapore-from/" className="btn btn-outline-gold" style={{ marginTop: 24, display: 'inline-flex' }}>
            View all cities →
          </Link>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Book Singapore from {city.name}</p>
            <p className="city-cta-sub">
              WhatsApp our Singapore team for instant quotes, flexible dates &amp; group pricing. Responds within 1 hour.
            </p>
          </div>
          <div className="city-cta-btns">
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`singapore_cta_${city.slug}`}
              className="btn-gold-lg"
            >
              📲 WhatsApp +91 98738 97652
            </WaLink>
            <a href="tel:+919873897652" className="btn-outline-lg">
              📞 +91 98738 97652
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
