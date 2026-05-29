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
  mumbai:    { hub: 'BOM', via: 'direct/Bangkok (BKK)',                        duration: '5–6 hrs',  fare: '₹14,000–₹28,000', airlines: 'IndiGo, Air India, Thai Airways' },
  delhi:     { hub: 'DEL', via: 'direct/Bangkok (BKK)',                        duration: '4–5 hrs',  fare: '₹12,000–₹25,000', airlines: 'IndiGo, Air India, Thai Airways' },
  bangalore: { hub: 'BLR', via: 'Singapore (SIN) or Bangkok (BKK)',            duration: '5–6 hrs',  fare: '₹14,000–₹27,000', airlines: 'IndiGo, Air Asia' },
  chennai:   { hub: 'MAA', via: 'Bangkok (BKK) direct',                        duration: '4–5 hrs',  fare: '₹12,000–₹24,000', airlines: 'IndiGo, Air Asia, Thai Airways' },
  hyderabad: { hub: 'HYD', via: 'Bangkok (BKK) via Chennai',                   duration: '6–8 hrs',  fare: '₹14,000–₹28,000', airlines: 'IndiGo, Air Asia' },
  kolkata:   { hub: 'CCU', via: 'Bangkok (BKK) direct',                        duration: '3–4 hrs',  fare: '₹10,000–₹20,000', airlines: 'IndiGo, Bangkok Airways' },
};
const DEFAULT_FLIGHT = {
  hub: 'nearest airport',
  via: 'Delhi (DEL) or Mumbai (BOM) + Bangkok (BKK)',
  duration: '7–12 hrs',
  fare: '₹18,000–₹35,000',
  airlines: 'IndiGo, Air India, Thai Airways',
};

/* ── Itinerary ───────────────────────────────────────────── */
const DAYS = [
  { day: 'DAY 1', title: 'Arrival Bangkok',                    desc: 'Suvarnabhumi Airport pickup · Hotel check-in (Baiyoke Sky area) · Welcome dinner & evening at leisure' },
  { day: 'DAY 2', title: 'Bangkok City Tour',                  desc: 'Grand Palace · Wat Pho (Reclining Buddha) · Emerald Buddha Temple · Chao Phraya River Cruise (evening)' },
  { day: 'DAY 3', title: 'Bangkok Markets & Nightlife',        desc: 'Chatuchak Weekend Market · Asiatique Riverfront night market · Tuk-tuk experience through old Bangkok' },
  { day: 'DAY 4', title: 'Bangkok → Phuket',                  desc: 'Flight/train transfer to Phuket · Patong Beach · Bangla Road night scene · hotel check-in' },
  { day: 'DAY 5', title: 'Phi Phi Islands Day Trip',           desc: 'Speed boat → Phi Phi Islands · Maya Bay · snorkelling · Monkey Beach · PP Don village tour' },
  { day: 'DAY 6', title: 'Phuket Sightseeing',                desc: 'Big Buddha · Karon Viewpoint · Old Phuket Town · Phuket Fantasea (optional, own expense)' },
  { day: 'DAY 7', title: 'Phuket → Pattaya · Coral Island',  desc: 'Flight to Pattaya · Coral Island tour · Walking Street evening' },
  { day: 'DAY 8', title: 'Pattaya & Departure',               desc: 'Nong Nooch Tropical Garden · leisure at beach · airport departure transfer' },
];

/* ── Inclusions ──────────────────────────────────────────── */
const INCLUDED = [
  'Airport transfers Bangkok/Phuket/Pattaya',
  'Hotel 7 nights (3-star standard with breakfast)',
  'Grand Palace & Wat Pho entrance tickets',
  'Chao Phraya River Cruise',
  'Phi Phi Islands day trip by speed boat',
  'Coral Island tour (Pattaya)',
  'Nong Nooch Tropical Garden',
  'All AC land transfers throughout',
];
const EXCLUDED = [
  'Airfare (book separately)',
  'Airfare (book separately — flight not included)',
  'Travel insurance',
  'Meals (except breakfast)',
  'Phuket Fantasea (optional)',
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
export default function ThailandCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Thailand 7N8D package from ${city.name}`;
  const waLink = `https://wa.me/919873897652?text=${encodeURIComponent(waText)}`;

  const faqs = [
    {
      q: `Which airport do I fly from ${city.name} to Thailand?`,
      a: `From ${city.name} (${flight.hub}), fly to Bangkok Suvarnabhumi (BKK) via ${flight.via}. Total flight time: ~${flight.duration}. Airlines: ${flight.airlines}. Return fares: ${flight.fare}.`,
    },
    {
      q: `What is the total Thailand trip cost from ${city.name}?`,
      a: `Package from $650/person (≈₹54,000). Add flights from ${city.name}: ${flight.fare} approx. Total budget per person: ₹70,000–₹1,10,000 depending on hotel upgrade, flight timing and season.`,
    },
    {
      q: `Do I need a visa for Thailand from ${city.name}?`,
      a: `Indian passport holders can get a Thailand visa on arrival or apply for an e-visa (recommended). Fee: approx ₹3,500. Apply at least 2 weeks before travel. We assist with visa guidance on WhatsApp.`,
    },
    {
      q: `What is the best time to visit Thailand from ${city.name}?`,
      a: `November–April is ideal — dry season, calm seas for Phi Phi Islands. December–February is peak but pricier. May–October = monsoon, but Phuket/Bangkok still accessible with lower fares. Package runs year-round on demand (min 2 pax).`,
    },
    {
      q: `Can I change the travel dates for this Thailand package?`,
      a: `Yes — we operate on demand for groups of min 2 pax. WhatsApp us with preferred dates and group size. We respond within 1 hour during business hours.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Thailand 7N/8D Tour Package from ${city.name} — Bangkok · Phuket · Pattaya`,
        description: `8-day Thailand tour from ${city.name}. Grand Palace, Phi Phi Islands, Coral Island, Chao Phraya Cruise from $650/person.`,
        touristType: 'Cultural & Beach travelers',
        offers: {
          '@type': 'Offer', price: '650', priceCurrency: 'USD',
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
          { '@type': 'ListItem', position: 2, name: 'Thailand Package', item: 'https://junegiriyatra.com/packages/thailand-tour-7n-8d/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/thailand-from/${city.slug}/` },
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
          src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1600&q=85&auto=format&fit=crop"
          alt={`Thailand tour package from ${city.name}`}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/thailand-tour-7n-8d/">Thailand Package</Link><span>›</span>
            <span>From {city.name}</span>
          </nav>

          <h1 className="city-hero-h1">
            Thailand Tour Package<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>

          <p className="city-hero-sub">
            Bangkok · Phuket · Pattaya · Phi Phi Islands · Coral Island 🏝️<br />
            <strong>All activities included · From $650 / person · Min 2 Pax</strong>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`thailand_hero_${city.slug}`}
              className="btn-gold-hero"
            >
              📲 WhatsApp from {city.name}
            </WaLink>
            <Link href="/packages/thailand-tour-7n-8d/" className="btn btn-outline">
              📋 View Full Package
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLIGHT HOOK BAR ──────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✈️ <strong>{city.name} ({flight.hub})</strong> → Bangkok (BKK) via {flight.via} &nbsp;·&nbsp;
            ~<strong>{flight.duration}</strong> &nbsp;·&nbsp; Return fares from <strong>{flight.fare}</strong> &nbsp;·&nbsp;
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`thailand_bar_${city.slug}`}
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
            <div className="qi-card"><div className="qi-label">Duration</div><div className="qi-value">8 Days / 7 Nights</div></div>
            <div className="qi-card"><div className="qi-label">Destinations</div><div className="qi-value">Bangkok · Phuket · Pattaya</div></div>
            <div className="qi-card"><div className="qi-label">Price</div><div className="qi-value">From $650 / person</div></div>
            <div className="qi-card"><div className="qi-label">From {city.name}</div><div className="qi-value">~{flight.duration} flight</div></div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <p className="s-sub">8 days of temples, beaches, islands &amp; nightlife</p>
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
          <h2 className="s-title">Flights from <em>{city.name}</em> to Thailand</h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="cdf-includes-grid">
              {[
                { icon: '✈️', title: 'Route', desc: `${city.name} (${flight.hub}) → Bangkok Suvarnabhumi (BKK) via ${flight.via}` },
                { icon: '⏱️', title: 'Total Flight Time', desc: `Approx ${flight.duration} including layover` },
                { icon: '💸', title: 'Return Fare Range', desc: `${flight.fare} per person (varies by season)` },
                { icon: '🛫', title: 'Airlines', desc: flight.airlines },
                { icon: '🏙️', title: 'Arrival Airport', desc: 'Suvarnabhumi (BKK) — 30–45 min to central Bangkok hotels' },
                { icon: '🛂', title: 'Thailand Visa', desc: 'Visa on arrival available or apply e-visa (~₹3,500). We guide you through the process.' },
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
              { label: 'Option 1 — Standard', hotel: '3-star hotels throughout (standard rooms)', price: '$650', badge: 'Most Popular', waMsg: `Namaste! I want to book Option 1 Thailand 7N8D from ${city.name}` },
              { label: 'Option 2 — Upgraded', hotel: '3-star superior rooms + Phuket resort upgrade', price: '$780', badge: 'Best Experience', waMsg: `Namaste! I want to book Option 2 Thailand 7N8D from ${city.name}` },
            ].map(opt => (
              <div key={opt.label} style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 16, padding: 28, position: 'relative' }}>
                <span style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', color: '#07051A', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {opt.badge}
                </span>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{opt.label}</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--heading)', marginBottom: 6, lineHeight: 1 }}>{opt.price}<span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginLeft: 4 }}>/person</span></div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22 }}>🏨 {opt.hotel}</div>
                <WaLink
                  href={`https://wa.me/919873897652?text=${encodeURIComponent(opt.waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  label={`thailand_price_${city.slug}`}
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
          <p className="section-sub-left">Thailand packages available from all major Indian cities.</p>
          <div className="city-links-grid">
            {CITY_LINKS.filter(c => c.slug !== city.slug).map(c => (
              <Link key={c.slug} href={`/thailand-from/${c.slug}/`} className="city-link-chip">
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/thailand-from/" className="btn btn-outline-gold" style={{ marginTop: 24, display: 'inline-flex' }}>
            View all cities →
          </Link>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Book Thailand from {city.name}</p>
            <p className="city-cta-sub">
              WhatsApp our Thailand team for instant quotes, flexible dates &amp; group pricing. Responds within 1 hour.
            </p>
          </div>
          <div className="city-cta-btns">
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`thailand_cta_${city.slug}`}
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
