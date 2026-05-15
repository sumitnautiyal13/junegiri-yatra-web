import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Dubai Tour Package from Your City 2025 | 5N/6D from $750 | Junegiri Yatra',
  description: 'Book Dubai 5N/6D — Burj Khalifa · Desert Safari · Marina from any Indian city — Mumbai, Delhi, Bangalore, Chennai, Hyderabad & 90+ more. From $750/person.',
  keywords: 'dubai tour package from india, dubai trip from mumbai, dubai package from bangalore, burj khalifa desert safari tour india, dubai holiday from india',
  alternates: { canonical: 'https://junegiriyatra.com/dubai-from/' },
  openGraph: {
    title: 'Dubai Tour Package from Your City | Junegiri Yatra',
    description: 'Dubai 5N/6D — Burj Khalifa, Desert Safari, Dhow Cruise, Marina packages with city-specific flight info from 100 Indian cities. From $750/person.',
    images: [{ url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85&auto=format&fit=crop' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Dubai Tour Package from Your City',
      description: 'Dubai 5N/6D — Burj Khalifa, Desert Safari, Dhow Cruise packages with city-specific flight info from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/dubai-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Dubai Package', item: 'https://junegiriyatra.com/packages/dubai-tour-5n-6d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/dubai-from/' },
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

export default function DubaiFromIndex() {
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
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85&auto=format&fit=crop"
          alt="Dubai tour packages from India"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/dubai-tour-5n-6d/">Dubai Package</Link><span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Dubai Tour Package<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            6 Days · 5 Nights · Burj Khalifa · Desert Safari · Marina · Dhow Cruise 🏙️<br />
            <strong>Pick your departure city · All activities included · From $750 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Dubai%205N6D%20package"
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
            🏙️ Most Indian cities have direct flights to Dubai — often under 4 hours.
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
                    <Link key={city.slug} href={`/dubai-from/${city.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{city.name}</span>
                      <span className="cdf-city-state">{city.state}</span>
                      <span className="cdf-city-time">✈️ Direct to Dubai (DXB)</span>
                      <span className="cdf-city-mode">🏙️ Dubai in {city.total_time}</span>
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
          <p className="section-sub-left light">Same experiences regardless of your departure city.</p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: '5 Nights Hotel + Breakfast', desc: 'Bur Dubai / Deira area 3-star hotels — central location, excellent transport links' },
              { icon: '🗼', title: 'Burj Khalifa (At the Top)', desc: 'Level 124 observation deck — breathtaking panoramic views of Dubai from the world\'s tallest tower' },
              { icon: '🏜️', title: 'Desert Safari — Full Package', desc: 'Dune bashing · Camel ride · Sand boarding · Belly dancing · BBQ dinner under the stars' },
              { icon: '⛵', title: 'Dhow Cruise Dinner', desc: 'Traditional dhow cruise along Dubai Creek with dinner, live entertainment and stunning city views' },
              { icon: '🖼️', title: 'Dubai Frame + City Tour', desc: 'Dubai Frame observation bridge · AC coach city tour of Downtown, Marina, Palm Jumeirah viewpoint' },
              { icon: '🚌', title: 'All Airport & Hotel Transfers', desc: 'DXB airport pickup/drop + AC transfers throughout — Gold Souk, Spice Souk, Al Fahidi, JBR' },
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
              { step: '01', title: 'Pick Your City',    desc: 'Click your departure city above to see exact flight routes to Dubai, fares, and a city-specific Dubai itinerary.' },
              { step: '02', title: 'WhatsApp Us',       desc: 'Each city page has a pre-filled WhatsApp link. Our Dubai team responds within 30–60 minutes.' },
              { step: '03', title: 'Lock Your Dates',   desc: 'Confirm travel dates, group size (min 2), and hotel preference. We also assist with UAE visa guidance.' },
              { step: '04', title: 'Book & Fly',        desc: 'Pay advance to confirm. We handle all hotels, Desert Safari, Burj Khalifa, Dhow Cruise & transfers. You just fly.' },
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
            <p className="city-cta-headline">Ready to plan your Dubai escape?</p>
            <p className="city-cta-sub">
              WhatsApp for custom dates, group pricing &amp; combined flight + package quotes from your city.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Dubai%205N6D%20package"
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
