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
  mumbai:     { hub: 'BOM', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs',   fare: '₹18,000–₹35,000', airlines: 'IndiGo, Air India, Singapore Airlines' },
  delhi:      { hub: 'DEL', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '9–11 hrs',  fare: '₹20,000–₹38,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  bangalore:  { hub: 'BLR', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs',   fare: '₹17,000–₹32,000', airlines: 'IndiGo, Air Asia, Batik Air' },
  chennai:    { hub: 'MAA', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs',   fare: '₹16,000–₹30,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  hyderabad:  { hub: 'HYD', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–10 hrs',  fare: '₹17,000–₹33,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  kolkata:    { hub: 'CCU', via: 'Singapore (SIN) or Bangkok (BKK)',       duration: '8–9 hrs',   fare: '₹17,000–₹32,000', airlines: 'IndiGo, Thai Airways, Singapore Airlines' },
  pune:       { hub: 'PNQ', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Mumbai' },
  ahmedabad:  { hub: 'AMD', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  surat:      { hub: 'STV', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Mumbai' },
  jaipur:     { hub: 'JAI', via: 'Delhi (DEL) + Singapore (SIN)',          duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  lucknow:    { hub: 'LKO', via: 'Delhi (DEL) + Singapore (SIN)',          duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  chandigarh: { hub: 'IXC', via: 'Delhi (DEL) + Singapore (SIN)',          duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  kochi:      { hub: 'COK', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '7–8 hrs',   fare: '₹15,000–₹28,000', airlines: 'Air Asia, Singapore Airlines' },
  guwahati:   { hub: 'GAU', via: 'Singapore (SIN) or Bangkok (BKK)',       duration: '9–10 hrs',  fare: '₹20,000–₹36,000', airlines: 'IndiGo via Singapore' },
  bhubaneswar:{ hub: 'BBI', via: 'Kolkata (CCU) + Singapore (SIN)',        duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Kolkata' },
  nagpur:     { hub: 'NAG', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  indore:     { hub: 'IDR', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  patna:      { hub: 'PAT', via: 'Delhi (DEL) + Singapore (SIN)',          duration: '12–14 hrs', fare: '₹24,000–₹42,000', airlines: 'IndiGo via Delhi' },
  raipur:     { hub: 'RPR', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  vadodara:   { hub: 'BDQ', via: 'Mumbai (BOM) + Singapore (SIN)',         duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
};
const DEFAULT_FLIGHT = {
  hub: 'nearest airport',
  via: 'Mumbai (BOM) or Delhi (DEL) + Singapore (SIN)',
  duration: '10–14 hrs',
  fare: '₹22,000–₹42,000',
  airlines: 'IndiGo, Air Asia, Singapore Airlines',
};

/* ── Itinerary ───────────────────────────────────────────── */
const DAYS = [
  { day: 'DAY 1', title: 'Arrival · Finns Beach Club',       desc: 'Airport pickup · Hotel check-in (Akmani Legian — Grand Deluxe) · Evening at Finns Beach Club (own expense)' },
  { day: 'DAY 2', title: 'Beaches & Water Sports',           desc: 'Pandawa Beach · Parasailing ✅ · Melasti Beach · Suluban Sunset · Savaya Club (own expense)' },
  { day: 'DAY 3', title: 'Nusa Penida West Tour',            desc: 'Speed boat → Nusa Penida · Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay' },
  { day: 'DAY 4', title: 'Gili Trawangan · Party Night',     desc: 'Speed boat to Gili T · Mad Monkey Hostel check-in · Beach day · Party night' },
  { day: 'DAY 5', title: 'Scuba Diving & Nightlife',         desc: 'Scuba Diving ✅ (2 Pax) · Sunset sessions · Party night at Gili Trawangan' },
  { day: 'DAY 6', title: 'Return to Bali · ATV Ride',        desc: 'Speed boat back to Bali · ATV Ride ✅ (2 Pax) · Hotel check-in (Evitel Ubud / Pool Villa)' },
  { day: 'DAY 7', title: 'Departure',                        desc: 'Breakfast · Leisurely checkout · Private airport transfer to Ngurah Rai (DPS)' },
];

/* ── Inclusions ──────────────────────────────────────────── */
const INCLUDED = [
  'Airport pickup & drop (DPS)',
  'Private AC vehicle with driver in Bali',
  'Inter-island speed boat transfers',
  '6 Nights accommodation with breakfast',
  'Parasailing experience (Day 2)',
  'Nusa Penida west tour (Day 3)',
  'Scuba diving — Gili T, 2 Pax (Day 5)',
  'ATV Ride, 2 Pax (Day 6)',
  'Entrance fees as per itinerary',
  'Daily mineral water in vehicle',
];
const EXCLUDED = [
  'Airfare (book separately)',
  'Visa on Arrival (~USD 35)',
  'Travel insurance',
  'Finns / Savaya club expenses',
  'Lunch & dinner',
  'Gili Island tax (~IDR 25,000)',
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
export default function BaliCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Bali 7D6N package from ${city.name}`;
  const waLink = `https://wa.me/6282111759727?text=${encodeURIComponent(waText)}`;

  const faqs = [
    {
      q: `Which airport do I fly from ${city.name} to Bali?`,
      a: `From ${city.name} (${flight.hub}), fly to Bali Ngurah Rai (DPS) via ${flight.via}. Total flight time: ~${flight.duration}. Airlines: ${flight.airlines}. Return fares: ${flight.fare}.`,
    },
    {
      q: `What is the total Bali trip cost from ${city.name}?`,
      a: `Package from $530/person (≈₹44,500). Add flights from ${city.name}: ${flight.fare} approx. Total budget per person: ₹65,000–₹1,00,000 depending on hotel upgrade, flight timing and season.`,
    },
    {
      q: `Do I need a visa for Bali from ${city.name}?`,
      a: `No prior visa required. Indian passport holders get Visa on Arrival (VoA) at DPS airport. Fee: ~USD 35. Valid 30 days, extendable by 30 more. Carry USD cash for the VoA counter.`,
    },
    {
      q: `What is the best time to visit Bali from ${city.name}?`,
      a: `April–October is ideal — dry weather, calm seas for Nusa Penida & Gili T. May–June have the best underwater visibility for scuba. December–January = peak crowds + monsoon. Package runs year-round on demand (min 2 pax).`,
    },
    {
      q: `Can I change the travel dates for this Bali package?`,
      a: `Yes — we operate on demand for groups of min 2 pax. WhatsApp us with preferred dates and group size. We respond within 1 hour during business hours.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Bali, Nusa Penida & Gili 7D/6N Tour Package from ${city.name}`,
        description: `7-day Bali party escape from ${city.name}. Nusa Penida west tour, scuba diving Gili T, ATV ride, parasailing from $530/person.`,
        touristType: 'Adventure travelers',
        offers: {
          '@type': 'Offer', price: '530', priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+6282111759727' },
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
          { '@type': 'ListItem', position: 2, name: 'Bali Package', item: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/bali-from/${city.slug}/` },
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
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=85&auto=format&fit=crop"
          alt={`Bali tour package from ${city.name}`}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
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
            Scuba diving · ATV ride · Nusa Penida west tour · Gili T nightlife · Parasailing 🏝️<br />
            <strong>All activities included · From $530 / person · Min 2 Pax</strong>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`bali_hero_${city.slug}`}
              className="btn-gold-hero"
            >
              📲 WhatsApp from {city.name}
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/" className="btn btn-outline">
              🖨️ View PDF Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLIGHT HOOK BAR ──────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✈️ <strong>{city.name} ({flight.hub})</strong> → Bali (DPS) via {flight.via} &nbsp;·&nbsp;
            ~<strong>{flight.duration}</strong> &nbsp;·&nbsp; Return fares from <strong>{flight.fare}</strong> &nbsp;·&nbsp;
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`bali_bar_${city.slug}`}
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
            <div className="qi-card"><div className="qi-label">Duration</div><div className="qi-value">7 Days / 6 Nights</div></div>
            <div className="qi-card"><div className="qi-label">Destinations</div><div className="qi-value">Bali · Nusa Penida · Gili T</div></div>
            <div className="qi-card"><div className="qi-label">Price</div><div className="qi-value">From $530 / person</div></div>
            <div className="qi-card"><div className="qi-label">From {city.name}</div><div className="qi-value">~{flight.duration} flight</div></div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <p className="s-sub">7 days of beaches, islands, scuba &amp; nightlife</p>
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
          <h2 className="s-title">Flights from <em>{city.name}</em> to Bali</h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="cdf-includes-grid">
              {[
                { icon: '✈️', title: 'Route', desc: `${city.name} (${flight.hub}) → Bali (DPS) via ${flight.via}` },
                { icon: '⏱️', title: 'Total Flight Time', desc: `Approx ${flight.duration} including layover` },
                { icon: '💸', title: 'Return Fare Range', desc: `${flight.fare} per person (varies by season)` },
                { icon: '🛫', title: 'Airlines', desc: flight.airlines },
                { icon: '🏖️', title: 'Arrival Airport', desc: 'Ngurah Rai Intl (DPS) — 30 min to South Bali hotels' },
                { icon: '🛂', title: 'Visa on Arrival', desc: 'No pre-application needed. ~USD 35 at DPS airport. Valid 30 days.' },
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
          <p className="s-sub">Two hotel options · All activities same · Min 2 Pax</p>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { label: 'Option 1 — Standard', hotel: 'Evitel Ubud (last night)', price: '$530', badge: 'Most Popular', waMsg: `Namaste! I want to book Option 1 Bali 7D6N from ${city.name}` },
              { label: 'Option 2 — Pool Villa', hotel: 'Private Pool Villa (last night)', price: '$560', badge: 'Best Experience', waMsg: `Namaste! I want to book Option 2 Bali 7D6N from ${city.name}` },
            ].map(opt => (
              <div key={opt.label} style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 28, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', color: '#07051A', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {opt.badge}
                </span>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{opt.label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--heading)', marginBottom: 6, lineHeight: 1 }}>{opt.price}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginLeft: 4 }}>/person</span></div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22 }}>🏨 {opt.hotel}</div>
                <WaLink
                  href={`https://wa.me/6282111759727?text=${encodeURIComponent(opt.waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  label={`bali_price_${city.slug}`}
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
          <p className="section-sub-left">Bali packages available from all major Indian cities.</p>
          <div className="city-links-grid">
            {CITY_LINKS.filter(c => c.slug !== city.slug).map(c => (
              <Link key={c.slug} href={`/bali-from/${c.slug}/`} className="city-link-chip">
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/bali-from/" className="btn btn-outline-gold" style={{ marginTop: 24, display: 'inline-flex' }}>
            View all cities →
          </Link>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Book Bali from {city.name}</p>
            <p className="city-cta-sub">
              WhatsApp our Bali team for instant quotes, flexible dates &amp; group pricing. Responds within 1 hour.
            </p>
          </div>
          <div className="city-cta-btns">
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`bali_cta_${city.slug}`}
              className="btn-gold-lg"
            >
              📲 WhatsApp +62 821-1175-9727
            </WaLink>
            <a href="tel:+6282111759727" className="btn-outline-lg">
              📞 +62 821-1175-9727
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
