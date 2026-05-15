import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Thailand Tour Package from Your City 2025 | 7N/8D from $650 | Junegiri Yatra',
  description: 'Book Thailand 7N/8D Bangkok · Phuket · Pattaya from any Indian city — Mumbai, Delhi, Bangalore, Chennai, Hyderabad & 90+ more. Phi Phi Islands, Grand Palace, Coral Island. From $650/person.',
  keywords: 'thailand tour package from india, thailand trip from mumbai, thailand package from bangalore, bangkok phuket pattaya tour india, phi phi islands package india',
  alternates: { canonical: 'https://junegiriyatra.com/thailand-from/' },
  openGraph: {
    title: 'Thailand Tour Package from Your City | Junegiri Yatra',
    description: 'Thailand 7N/8D Bangkok · Phuket · Pattaya packages with city-specific flight info from 100 Indian cities. From $650/person.',
    images: [{ url: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1200&q=85&auto=format&fit=crop' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Thailand Tour Package from Your City',
      description: 'Thailand 7N/8D Bangkok · Phuket · Pattaya packages with city-specific flight info from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/thailand-from/',
      provider: {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        telephone: '+919873897652',
        address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Thailand Package', item: 'https://junegiriyatra.com/packages/thailand-tour-7n-8d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/thailand-from/' },
      ],
    },
  ],
};

const REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Delhi NCR', 'Punjab', 'Punjab/Haryana', 'Haryana', 'Chandigarh', 'Uttarakhand', 'Jammu & Kashmir', 'Himachal Pradesh', 'Ladakh'] },
  { label: 'West India',  states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Puducherry'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh', 'Jharkhand', 'Odisha', 'Assam', 'Tripura', 'Meghalaya', 'Manipur'] },
];

export default function ThailandFromIndex() {
  const cities = getAllCities();
  const grouped = REGIONS.map(r => ({ ...r, cities: cities.filter(c => r.states.includes(c.state)) }));
  const assignedSlugs = grouped.flatMap(g => g.cities.map(c => c.slug));
  const remaining = cities.filter(c => !assignedSlugs.includes(c.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '60vh' }}>
        <Image
          src="https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1600&q=85&auto=format&fit=crop"
          alt="Thailand tour packages from India"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/thailand-tour-7n-8d/">Thailand Package</Link><span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Thailand Tour Package<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            8 Days · 7 Nights · Bangkok · Phuket · Pattaya · Phi Phi Islands 🏝️<br />
            <strong>Pick your departure city · Grand Palace · Coral Island · From $650 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Thailand%207N8D%20package"
            className="btn-gold-hero"
            target="_blank" rel="noopener noreferrer"
          >
            📲 WhatsApp for Departure Quote
          </a>
        </div>
      </section>

      {/* ── HOOK BAR ─────────────────────────────────────── */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            🏝️ Every city has different flight routes, fares &amp; layovers to Bangkok.
            Pick your city below for exact flight info &amp; a pre-filled WhatsApp quote.
          </p>
        </div>
      </section>

      {/* ── CITY GRID ────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Departure City</em></h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for flight routes, fares &amp; a personalised WhatsApp quote.
          </p>

          {[...grouped, ...(remaining.length > 0 ? [{ label: 'Other Cities', cities: remaining }] : [])].map(group =>
            group.cities.length > 0 ? (
              <div key={group.label} className="cdf-region">
                <h3 className="cdf-region-title">{group.label}</h3>
                <div className="cdf-city-grid">
                  {group.cities.map(city => (
                    <Link key={city.slug} href={`/thailand-from/${city.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{city.name}</span>
                      <span className="cdf-city-state">{city.state}</span>
                      <span className="cdf-city-time">✈️ Fly to Bangkok (BKK)</span>
                      <span className="cdf-city-mode">🏝️ Thailand in {city.total_time}</span>
                      <span className="cdf-city-arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">What Every Package <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Includes</em></h2>
          <p className="section-sub-left light">Same activities regardless of your departure city.</p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: '7 Nights Accommodation + Breakfast', desc: 'Bangkok (3N) · Phuket (3N) · Pattaya (1N) — 3-star hotels in prime areas' },
              { icon: '🏯', title: 'Grand Palace & Wat Pho', desc: 'Bangkok\'s most iconic temples — Grand Palace, Emerald Buddha & the famous Reclining Buddha at Wat Pho' },
              { icon: '🛶', title: 'Chao Phraya River Cruise', desc: 'Evening cruise along Bangkok\'s historic river with stunning views of the illuminated skyline' },
              { icon: '🏝️', title: 'Phi Phi Islands Day Trip', desc: 'Maya Bay · snorkelling · Monkey Beach · PP Don village — by speed boat from Phuket' },
              { icon: '🐠', title: 'Coral Island Tour Pattaya', desc: 'Speed boat to Coral Island — beach day, snorkelling, parasailing option included in tour' },
              { icon: '🚌', title: 'All Land Transfers', desc: 'AC coach transfers Bangkok/Phuket/Pattaya + airport pickups & drops throughout the trip' },
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
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Booking Works</em></h2>
          <div className="cdf-steps">
            {[
              { step: '01', title: 'Pick Your City',    desc: 'Click your departure city above to see exact flight routes to Bangkok, fares, and a city-specific Thailand itinerary.' },
              { step: '02', title: 'WhatsApp Us',       desc: 'Each city page has a pre-filled WhatsApp link. Our Thailand team responds within 30–60 minutes.' },
              { step: '03', title: 'Lock Your Dates',   desc: 'Confirm travel dates, group size (min 2), and hotel preference — standard 3-star or upgrade options.' },
              { step: '04', title: 'Book & Fly',        desc: 'Pay advance to confirm. We handle all hotels, Phi Phi tour, Coral Island, Grand Palace & transfers. You just fly.' },
            ].map(s => (
              <div key={s.step} className="cdf-step">
                <div className="cdf-step-num">{s.step}</div>
                <div>
                  <div className="cdf-step-title">{s.title}</div>
                  <div className="cdf-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready to plan your Thailand escape?</p>
            <p className="city-cta-sub">
              WhatsApp for custom dates, group pricing &amp; combined flight + package quotes from your city.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Thailand%207N8D%20package"
              className="btn-gold-lg"
              target="_blank" rel="noopener noreferrer"
            >
              📲 WhatsApp Us Now
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">
              📞 +91 98738 97652
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
