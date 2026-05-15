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
  mumbai:    { hub: 'BOM', via: 'direct Dubai (DXB)',    duration: '3 hrs',     fare: '₹8,000–₹18,000',  airlines: 'IndiGo, Air Arabia, Air India, Emirates' },
  delhi:     { hub: 'DEL', via: 'direct Dubai (DXB)',    duration: '3.5 hrs',   fare: '₹9,000–₹20,000',  airlines: 'IndiGo, Air Arabia, Air India, Emirates' },
  bangalore: { hub: 'BLR', via: 'direct Dubai (DXB)',    duration: '4 hrs',     fare: '₹9,000–₹19,000',  airlines: 'IndiGo, Air Arabia, Emirates' },
  chennai:   { hub: 'MAA', via: 'direct Dubai (DXB)',    duration: '4 hrs',     fare: '₹8,000–₹18,000',  airlines: 'IndiGo, Air Arabia, Emirates' },
  hyderabad: { hub: 'HYD', via: 'direct Dubai (DXB)',    duration: '3.5 hrs',   fare: '₹9,000–₹20,000',  airlines: 'IndiGo, Air Arabia, Emirates' },
  kochi:     { hub: 'COK', via: 'direct Dubai (DXB)',    duration: '3 hrs',     fare: '₹7,000–₹16,000',  airlines: 'Air Arabia, IndiGo, Emirates' },
};
const DEFAULT_FLIGHT = {
  hub: 'nearest metro airport',
  via: 'nearest hub + Dubai (DXB)',
  duration: '5–9 hrs',
  fare: '₹14,000–₹28,000',
  airlines: 'IndiGo, Air Arabia, Emirates',
};

/* ── Itinerary ───────────────────────────────────────────── */
const DAYS = [
  { day: 'DAY 1', title: 'Arrival Dubai',                      desc: 'DXB airport pickup · Hotel check-in (Bur Dubai/Deira area) · Dinner at Dubai Mall food court · Dubai Fountain show (evening)' },
  { day: 'DAY 2', title: 'Dubai City Tour',                    desc: 'Burj Khalifa (At the Top — Level 124) · Dubai Mall · Dubai Fountain · Downtown Dubai · Dubai Frame' },
  { day: 'DAY 3', title: 'Desert Safari',                      desc: 'Evening Desert Safari · Dune bashing in 4x4 · Camel ride · Sand boarding · Belly dancing show · BBQ dinner under stars' },
  { day: 'DAY 4', title: 'Palm & Marina',                      desc: 'Palm Jumeirah viewpoint · Atlantis Aquaventure (optional) · Dubai Marina Walk · JBR Beach · Marina Cruise (evening)' },
  { day: 'DAY 5', title: 'Old Dubai & Dhow Cruise',           desc: 'Gold Souk · Spice Souk · Al Fahidi Historical District · Dhow Cruise dinner along Dubai Creek with live entertainment' },
  { day: 'DAY 6', title: 'Shopping & Departure',              desc: 'Mall of Emirates or Outlet Mall (leisure shopping) · Airport departure transfer' },
];

/* ── Inclusions ──────────────────────────────────────────── */
const INCLUDED = [
  'Airport transfers (DXB pickup & drop)',
  'Hotel 5 nights — 3-star Bur Dubai (with breakfast)',
  'Burj Khalifa (At the Top) tickets',
  'Desert Safari — full package (dune bashing, camel ride, BBQ)',
  'Dhow Cruise dinner with live entertainment',
  'Dubai Frame entrance ticket',
  'City tour in AC coach (Downtown, Marina, Palm viewpoint)',
  'All transfers throughout the trip',
];
const EXCLUDED = [
  'Airfare (book separately)',
  'UAE visa (₹5,500–₹8,000)',
  'Travel insurance',
  'Atlantis Aquaventure entry',
  'Lunch & dinner except Desert Safari BBQ and Dhow Cruise',
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
export default function DubaiCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Dubai 5N6D package from ${city.name}`;
  const waLink = `https://wa.me/919873897652?text=${encodeURIComponent(waText)}`;

  const faqs = [
    {
      q: `Which airport do I fly from ${city.name} to Dubai?`,
      a: `From ${city.name} (${flight.hub}), fly to Dubai International (DXB) via ${flight.via}. Total flight time: ~${flight.duration}. Airlines: ${flight.airlines}. Return fares: ${flight.fare}.`,
    },
    {
      q: `What is the total Dubai trip cost from ${city.name}?`,
      a: `Package from $750/person (≈₹63,000). Add flights from ${city.name}: ${flight.fare} approx. Total budget per person: ₹75,000–₹1,15,000 depending on hotel choice, flight timing and season.`,
    },
    {
      q: `Do I need a UAE visa from ${city.name}?`,
      a: `Yes, Indian passport holders need a UAE tourist visa. Cost: ₹5,500–₹8,000 approx for 30 days. We assist with visa documentation and guidance — WhatsApp us to get started.`,
    },
    {
      q: `What is the best time to visit Dubai from ${city.name}?`,
      a: `October–April is ideal — pleasant temperatures (18–30°C), perfect for Desert Safari and outdoor activities. May–September is peak summer (40°C+) but fares are cheaper. December–January is peak tourist season. Package runs year-round on demand (min 2 pax).`,
    },
    {
      q: `Can I change the travel dates for this Dubai package?`,
      a: `Yes — we operate on demand for groups of min 2 pax. WhatsApp us with preferred dates and group size. We respond within 1 hour during business hours.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Dubai 5N/6D Tour Package from ${city.name} — Burj Khalifa · Desert Safari · Marina`,
        description: `6-day Dubai tour from ${city.name}. Burj Khalifa, Desert Safari, Dhow Cruise, Dubai Frame from $750/person.`,
        touristType: 'Luxury & Cultural travelers',
        offers: {
          '@type': 'Offer', price: '750', priceCurrency: 'USD',
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
          { '@type': 'ListItem', position: 2, name: 'Dubai Package', item: 'https://junegiriyatra.com/packages/dubai-tour-5n-6d/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/dubai-from/${city.slug}/` },
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
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85&auto=format&fit=crop"
          alt={`Dubai tour package from ${city.name}`}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/dubai-tour-5n-6d/">Dubai Package</Link><span>›</span>
            <span>From {city.name}</span>
          </nav>

          <h1 className="city-hero-h1">
            Dubai Tour Package<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>

          <p className="city-hero-sub">
            Burj Khalifa · Desert Safari · Dhow Cruise · Dubai Marina · Old Dubai 🏙️<br />
            <strong>All activities included · From $750 / person · Min 2 Pax</strong>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`dubai_hero_${city.slug}`}
              className="btn-gold-hero"
            >
              📲 WhatsApp from {city.name}
            </WaLink>
            <Link href="/packages/dubai-tour-5n-6d/" className="btn btn-outline">
              📋 View Full Package
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLIGHT HOOK BAR ──────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✈️ <strong>{city.name} ({flight.hub})</strong> → Dubai (DXB) via {flight.via} &nbsp;·&nbsp;
            ~<strong>{flight.duration}</strong> &nbsp;·&nbsp; Return fares from <strong>{flight.fare}</strong> &nbsp;·&nbsp;
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`dubai_bar_${city.slug}`}
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
            <div className="qi-card"><div className="qi-label">Highlights</div><div className="qi-value">Burj Khalifa · Desert · Marina</div></div>
            <div className="qi-card"><div className="qi-label">Price</div><div className="qi-value">From $750 / person</div></div>
            <div className="qi-card"><div className="qi-label">From {city.name}</div><div className="qi-value">~{flight.duration} flight</div></div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <p className="s-sub">6 days of skylines, desert, souks &amp; luxury</p>
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
          <h2 className="s-title">Flights from <em>{city.name}</em> to Dubai</h2>
          <div className="s-line" />
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="cdf-includes-grid">
              {[
                { icon: '✈️', title: 'Route', desc: `${city.name} (${flight.hub}) → Dubai International (DXB) via ${flight.via}` },
                { icon: '⏱️', title: 'Total Flight Time', desc: `Approx ${flight.duration} including layover (if any)` },
                { icon: '💸', title: 'Return Fare Range', desc: `${flight.fare} per person (varies by season)` },
                { icon: '🛫', title: 'Airlines', desc: flight.airlines },
                { icon: '🏙️', title: 'Arrival Airport', desc: 'Dubai International (DXB) — 20–30 min to Bur Dubai/Deira hotels' },
                { icon: '🛂', title: 'UAE Visa', desc: 'Tourist visa required — ₹5,500–₹8,000 approx. We assist with documentation and application.' },
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
              { label: 'Option 1 — Standard', hotel: '3-star Bur Dubai (standard rooms)', price: '$750', badge: 'Most Popular', waMsg: `Namaste! I want to book Option 1 Dubai 5N6D from ${city.name}` },
              { label: 'Option 2 — Upgraded', hotel: '4-star Downtown / DIFC area hotel', price: '$950', badge: 'Best Experience', waMsg: `Namaste! I want to book Option 2 Dubai 5N6D from ${city.name}` },
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
                  label={`dubai_price_${city.slug}`}
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
          <p className="section-sub-left">Dubai packages available from all major Indian cities.</p>
          <div className="city-links-grid">
            {CITY_LINKS.filter(c => c.slug !== city.slug).map(c => (
              <Link key={c.slug} href={`/dubai-from/${c.slug}/`} className="city-link-chip">
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/dubai-from/" className="btn btn-outline-gold" style={{ marginTop: 24, display: 'inline-flex' }}>
            View all cities →
          </Link>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Book Dubai from {city.name}</p>
            <p className="city-cta-sub">
              WhatsApp our Dubai team for instant quotes, UAE visa guidance, flexible dates &amp; group pricing. Responds within 1 hour.
            </p>
          </div>
          <div className="city-cta-btns">
            <WaLink
              href={waLink} target="_blank" rel="noopener noreferrer"
              label={`dubai_cta_${city.slug}`}
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
