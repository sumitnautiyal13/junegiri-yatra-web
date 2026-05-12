'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City } from '@/types';
import WaLink from '@/components/WaLink';

interface Props {
  city: City;
}

/* ── Flight route data by city slug ──────────────────────── */
const FLIGHT_DATA: Record<string, {
  hub: string;
  via: string;
  duration: string;
  fare: string;
  airlines: string;
}> = {
  mumbai:     { hub: 'BOM', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹18,000–₹35,000', airlines: 'IndiGo, Air India, Singapore Airlines' },
  delhi:      { hub: 'DEL', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '9–11 hrs', fare: '₹20,000–₹38,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  bangalore:  { hub: 'BLR', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹17,000–₹32,000', airlines: 'IndiGo, Air Asia, Batik Air' },
  chennai:    { hub: 'MAA', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹16,000–₹30,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  hyderabad:  { hub: 'HYD', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–10 hrs', fare: '₹17,000–₹33,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  kolkata:    { hub: 'CCU', via: 'Singapore (SIN) or Bangkok (BKK)', duration: '8–9 hrs', fare: '₹17,000–₹32,000', airlines: 'IndiGo, Thai Airways, Singapore Airlines' },
  pune:       { hub: 'PNQ', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Mumbai' },
  ahmedabad:  { hub: 'AMD', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  surat:      { hub: 'STV', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Mumbai' },
  jaipur:     { hub: 'JAI', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  lucknow:    { hub: 'LKO', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  chandigarh: { hub: 'IXC', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  kochi:      { hub: 'COK', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '7–8 hrs', fare: '₹15,000–₹28,000', airlines: 'Air Asia, Singapore Airlines' },
  guwahati:   { hub: 'GAU', via: 'Singapore (SIN) or Bangkok (BKK)', duration: '9–10 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Singapore' },
  bhubaneswar:{ hub: 'BBI', via: 'Kolkata (CCU) + Singapore (SIN)', duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Kolkata' },
  nagpur:     { hub: 'NAG', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  indore:     { hub: 'IDR', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  patna:      { hub: 'PAT', via: 'Delhi (DEL) + Singapore (SIN)', duration: '12–14 hrs', fare: '₹24,000–₹42,000', airlines: 'IndiGo via Delhi' },
  raipur:     { hub: 'RPR', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  vadodara:   { hub: 'BDQ', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
};

const DEFAULT_FLIGHT = {
  hub: 'nearest airport',
  via: 'Mumbai (BOM) or Delhi (DEL) + Singapore (SIN)',
  duration: '10–14 hrs',
  fare: '₹22,000–₹42,000',
  airlines: 'IndiGo, Air Asia, Singapore Airlines',
};

const DAYS = [
  { num: 'D1', title: 'Arrival · Finns Beach Club', emoji: '✈️🍹', desc: 'Airport pickup · Hotel check-in · Finns Beach Club (own expense)' },
  { num: 'D2', title: 'Beaches & Water Sports', emoji: '🌊🍾', desc: 'Pandawa Beach · Parasailing ✅ · Melasti Beach · Suluban Sunset · Savaya Club' },
  { num: 'D3', title: 'Nusa Penida West Tour', emoji: '🏝️', desc: 'Speed boat to Nusa Penida · Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay' },
  { num: 'D4', title: 'Gili Trawangan & Party', emoji: '🚤🍻', desc: 'Speed boat to Gili T · Mad Monkey Hostel · Beach · Party night' },
  { num: 'D5', title: 'Scuba Diving & Nightlife', emoji: '🤿🎊', desc: 'Scuba Diving ✅ (2 Pax) · Sunset spots · Party night at Gili T' },
  { num: 'D6', title: 'Return to Bali · ATV Ride', emoji: '🏍️🌿', desc: 'Speed boat back to Bali · ATV Ride ✅ (2 Pax) · Hotel check-in' },
  { num: 'D7', title: 'Departure', emoji: '✈️', desc: 'Breakfast · Checkout · Private airport transfer' },
];

const INCLUSIONS = [
  'Airport pickup & drop', 'Private AC vehicle with driver in Bali',
  'Inter-island speed boat transfers', '6 Nights accommodation with breakfast',
  'Parasailing experience', 'Nusa Penida west tour',
  'Scuba diving — Gili T (2 Pax)', 'ATV Ride (2 Pax)',
  'Entrance fees as per itinerary', 'Daily mineral water',
];

export default function BaliCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Bali 7D6N package from ${city.name}`;
  const waLink = `https://wa.me/6282111759727?text=${encodeURIComponent(waText)}`;

  const faqs = [
    {
      q: `Which airport should I fly from ${city.name} to Bali?`,
      a: `From ${city.name} (${flight.hub}), the best route to Bali (Ngurah Rai, DPS) is via ${flight.via}. Total flight time is approximately ${flight.duration}. Airlines include ${flight.airlines}. Fare range: ${flight.fare} per person return.`,
    },
    {
      q: `What is the total cost of Bali trip from ${city.name}?`,
      a: `The Junegiri Yatra Bali package starts at $530 per person (6 nights, all activities included). Add return flights from ${city.name}: ${flight.fare} approx. Total budget per person: around ₹65,000–₹95,000 depending on hotel upgrade and flight timing.`,
    },
    {
      q: `Is a visa required for Indian passport holders going to Bali?`,
      a: `No prior visa needed. Indian passport holders get Visa on Arrival (VoA) at Ngurah Rai International Airport. Valid for 30 days (extendable by 30 more). Fee: approximately USD 35. Carry some USD cash for the VoA counter.`,
    },
    {
      q: `What is the best time to visit Bali from ${city.name}?`,
      a: `April to October is peak season — dry weather, calm seas ideal for Nusa Penida and Gili T. May and June have excellent underwater visibility for scuba diving. Avoid December–January (peak crowds + rains). This package is bookable year-round with customizable dates.`,
    },
    {
      q: `Can the package dates be changed from the listed 23–29 May?`,
      a: `Yes — the 23–29 May dates are one specific batch. WhatsApp us for your preferred dates. We run this package on demand for groups of minimum 2. Response within 1 hour.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Bali, Nusa Penida & Gili 7D/6N Tour Package from ${city.name}`,
        description: `7-day Bali party escape package from ${city.name}. Includes Nusa Penida west tour, scuba diving in Gili T, ATV ride, parasailing from $530 per person.`,
        touristType: 'Adventure travelers',
        offers: {
          '@type': 'Offer',
          price: '530',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+6282111759727' },
        },
        provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra', url: 'https://junegiriyatra.com' },
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
          { '@type': 'ListItem', position: 2, name: 'Bali Package', item: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/bali-from/${city.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="city-hero" style={{ minHeight: '62vh' }}>
        <Image src="/images/mountains1.webp" alt="" aria-hidden fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/bali-7d6n-party-escape/">Bali Package</Link><span>›</span>
            <span>From {city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            Bali Tour Package<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            7 Days · 6 Nights · Nusa Penida · Gili Trawangan · Scuba Diving · ATV · Party 🏝️<br />
            <strong>From $530 / person</strong> · Min 2 Pax · All Activities Included
          </p>
          <WaLink href={waLink} className="btn-gold-hero" target="_blank" rel="noopener noreferrer" label={`bali_hero_${city.slug}`}>
            📲 Book from {city.name} — WhatsApp
          </WaLink>
        </div>
      </section>

      {/* ── HOOK BAR ── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✈️ Flying from <strong>{city.name}</strong> to Bali via {flight.via} — approx <strong>{flight.duration}</strong> · Fares from <strong>{flight.fare}</strong> return.
            Package price ($530/person) is separate — WhatsApp for a combined {city.name}–Bali quote.
          </p>
        </div>
      </section>

      {/* ── PACKAGE OVERVIEW ── */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="qi-row">
            <div className="qi-card"><div className="qi-label">DURATION</div><div className="qi-value">7 Days / 6 Nights</div></div>
            <div className="qi-card"><div className="qi-label">DESTINATIONS</div><div className="qi-value">Bali · Nusa Penida · Gili T</div></div>
            <div className="qi-card"><div className="qi-label">PRICE</div><div className="qi-value">From $530 / person</div></div>
            <div className="qi-card"><div className="qi-label">FROM {city.name.toUpperCase()}</div><div className="qi-value">{flight.duration} flight</div></div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {DAYS.map((day, i) => (
              <div key={i} className="day-card fade-in">
                <div className="day-num">{day.num}</div>
                <div className="day-title">{day.title} {day.emoji}</div>
                <div className="day-desc">{day.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUSIONS ── */}
      <section className="section">
        <div className="container">
          <h2 className="s-title">What&apos;s <em>Included</em></h2>
          <div className="s-line" />
          <div className="inc-grid">
            <div className="inc-box included">
              <h3>✓ Included</h3>
              {INCLUSIONS.map((item, i) => (
                <div key={i} className="inc-item"><span className="ck">✓</span> {item}</div>
              ))}
            </div>
            <div className="inc-box excluded">
              <h3>✗ Not Included</h3>
              {['Airfare from ' + city.name, 'Visa & travel insurance', 'Finns / Savaya club expenses',
                'Lunch & dinner', 'Transfers inside Gili Islands', 'Gili Island tax',
                'Personal expenses', 'Tips & gratuities'].map((item, i) => (
                <div key={i} className="inc-item"><span className="cr">✗</span> {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT INFO ── */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Flights from <em>{city.name}</em> to Bali</h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="cdf-includes-grid">
              {[
                { icon: '✈️', title: 'Route', desc: `${city.name} (${flight.hub}) → Bali (DPS) via ${flight.via}` },
                { icon: '⏱️', title: 'Total Flight Time', desc: `Approx ${flight.duration} including connection` },
                { icon: '💰', title: 'Fare Range', desc: `${flight.fare} per person return (varies by season)` },
                { icon: '🛫', title: 'Airlines', desc: flight.airlines },
                { icon: '🏝️', title: 'Arrival Airport', desc: 'Ngurah Rai International Airport (DPS), South Bali — 30 min to hotel' },
                { icon: '📋', title: 'Visa', desc: 'Visa on Arrival — no pre-application. USD 35 at airport. Valid 30 days.' },
              ].map((item) => (
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

      {/* ── FAQ ── */}
      <section className="section">
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

      {/* ── CITY LINKS ── */}
      <section className="city-links-section">
        <div className="container">
          <h2 className="section-title-left">Book from Other Cities</h2>
          <p className="section-sub-left">Bali packages available from all major Indian cities.</p>
          <div className="city-links-grid">
            {[
              { name: 'Mumbai', slug: 'mumbai' }, { name: 'Delhi', slug: 'delhi' },
              { name: 'Bangalore', slug: 'bangalore' }, { name: 'Chennai', slug: 'chennai' },
              { name: 'Hyderabad', slug: 'hyderabad' }, { name: 'Kolkata', slug: 'kolkata' },
              { name: 'Pune', slug: 'pune' }, { name: 'Ahmedabad', slug: 'ahmedabad' },
              { name: 'Kochi', slug: 'kochi' }, { name: 'Jaipur', slug: 'jaipur' },
              { name: 'Chandigarh', slug: 'chandigarh' }, { name: 'Lucknow', slug: 'lucknow' },
            ].filter(c => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/bali-from/${c.slug}/`} className="city-link-chip">{c.name}</Link>
            ))}
          </div>
          <Link href="/bali-from/" className="btn btn-outline-gold" style={{ marginTop: 24, display: 'inline-flex' }}>
            View all cities →
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="enquiry" className="section" style={{ background: 'linear-gradient(135deg,var(--s2),var(--dark))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="s-title">Book Bali from <em>{city.name}</em></h2>
          <p className="s-sub">WhatsApp us for instant quotes, custom dates &amp; group pricing.</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink href={waLink} className="btn btn-wa" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 16, padding: '18px 32px' }} label={`bali_cta_${city.slug}`}>
              📱 WhatsApp +62 821-1175-9727
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/" className="btn btn-outline"
              style={{ fontSize: 16, padding: '18px 32px' }}>
              🖨️ Download PDF Itinerary
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
