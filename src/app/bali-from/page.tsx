import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Bali Tour Package from Your City 2025 | 7D6N from $530 | Junegiri Yatra',
  description: 'Book Bali 7D6N party escape from any Indian city — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune & 90+ more. Scuba diving, Nusa Penida, Gili T. From $530/person.',
  keywords: 'bali tour package from india, bali trip from mumbai, bali package from bangalore, bali holiday from delhi, nusa penida gili trawangan package india',
  alternates: { canonical: 'https://junegiriyatra.com/bali-from/' },
  openGraph: {
    title: 'Bali Tour Package from Your City | Junegiri Yatra',
    description: 'All-inclusive Bali 7D6N packages with activities from 100 Indian cities. From $530/person.',
    images: [{ url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=85&auto=format&fit=crop' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Bali Tour Package from Your City',
      description: 'Bali 7D6N party escape packages with city-specific flight info from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/bali-from/',
      provider: {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        telephone: '+6282111759727',
        address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bali Package', item: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/bali-from/' },
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

export default function BaliFromIndex() {
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
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85&auto=format&fit=crop"
          alt="Bali tour packages from India"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/bali-7d6n-party-escape/">Bali Package</Link><span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Bali Tour Package<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            7 Days · 6 Nights · Nusa Penida · Gili Trawangan · Scuba Diving · ATV · Parasailing 🏝️<br />
            <strong>Pick your departure city · All activities included · From $530 / person</strong>
          </p>
          <a
            href="https://wa.me/6282111759727?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Bali%207D6N%20package"
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
            🏝️ Every city has different flight routes, fares &amp; layovers to Bali.
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
                    <Link key={city.slug} href={`/bali-from/${city.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{city.name}</span>
                      <span className="cdf-city-state">{city.state}</span>
                      <span className="cdf-city-time">✈️ Fly via SIN / KUL</span>
                      <span className="cdf-city-mode">🏝️ Bali in {city.total_time}</span>
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
              { icon: '🏨', title: '6 Nights Accommodation + Breakfast', desc: 'Akmani Legian (2N) · Mad Monkey Hostel Gili T (2N) · Evitel Ubud or Private Pool Villa (2N)' },
              { icon: '🤿', title: 'Scuba Diving — Gili Trawangan',       desc: 'Certified open-water dive for 2 pax at Gili T — crystal clear waters, vibrant marine life' },
              { icon: '🏍️', title: 'ATV Ride in Bali',                    desc: 'Through rice paddies and jungle terrain — 2-person ATV adventure included in package price' },
              { icon: '🏝️', title: 'Nusa Penida West Tour',               desc: 'Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay — all by speed boat' },
              { icon: '🪂', title: 'Parasailing Experience',              desc: 'Pandawa or Melasti beach parasailing — soar above the Bali coastline, included in package' },
              { icon: '🚤', title: 'All Inter-Island Speed Boats',        desc: 'Bali → Nusa Penida → Gili T → Bali + private AC vehicle with driver throughout' },
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
              { step: '01', title: 'Pick Your City',    desc: 'Click your departure city above to see exact flight routes, fares, and a city-specific Bali itinerary.' },
              { step: '02', title: 'WhatsApp Us',       desc: 'Each city page has a pre-filled WhatsApp link. Our Bali team responds within 30–60 minutes.' },
              { step: '03', title: 'Lock Your Dates',   desc: 'Confirm travel dates, group size (min 2), and hotel preference — standard or private pool villa.' },
              { step: '04', title: 'Book & Fly',        desc: 'Pay advance to confirm. We handle all hotels, speed boats, ATV, scuba &amp; activities. You just fly.' },
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
            <p className="city-cta-headline">Ready to plan your Bali escape?</p>
            <p className="city-cta-sub">
              WhatsApp for custom dates, group pricing &amp; combined flight + package quotes from your city.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/6282111759727?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Bali%207D6N%20package"
              className="btn-gold-lg"
              target="_blank" rel="noopener noreferrer"
            >
              📲 WhatsApp Us Now
            </a>
            <a href="tel:+6282111759727" className="btn-outline-lg">
              📞 +62 821-1175-9727
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
