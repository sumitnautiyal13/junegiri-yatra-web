import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Singapore Tour Package from Your City 2025 | 5N/6D from $680 | Junegiri Yatra',
  description: 'Book Singapore 5N/6D — Gardens by the Bay · Sentosa · Universal Studios from any Indian city — Mumbai, Delhi, Bangalore, Chennai & 90+ more. No visa required for Indians. From $680/person.',
  keywords: 'singapore tour package from india, singapore trip from mumbai, singapore package from bangalore, universal studios sentosa from india, singapore holiday from india',
  alternates: { canonical: 'https://junegiriyatra.com/singapore-from/' },
  openGraph: {
    title: 'Singapore Tour Package from Your City | Junegiri Yatra',
    description: 'Singapore 5N/6D — Gardens by the Bay, Sentosa, Singapore Zoo packages with city-specific flight info from 100 Indian cities. No visa required. From $680/person.',
    images: [{ url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=85&auto=format&fit=crop' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Singapore Tour Package from Your City',
      description: 'Singapore 5N/6D — Gardens by the Bay, Sentosa, Singapore Zoo packages with city-specific flight info from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/singapore-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Singapore Package', item: 'https://junegiriyatra.com/packages/singapore-tour-5n-6d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/singapore-from/' },
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

export default function SingaporeFromIndex() {
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
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&q=85&auto=format&fit=crop"
          alt="Singapore tour packages from India"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <Link href="/packages/singapore-tour-5n-6d/">Singapore Package</Link><span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Singapore Tour Package<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            6 Days · 5 Nights · Gardens by the Bay · Sentosa · Universal Studios · Singapore Zoo 🌿<br />
            <strong>No visa required for Indians · From $680 / person · Pick your departure city</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Singapore%205N6D%20package"
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
            🌿 Indian passport holders do <strong>not need a visa</strong> for Singapore (on valid passport).
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
                    <Link key={city.slug} href={`/singapore-from/${city.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{city.name}</span>
                      <span className="cdf-city-state">{city.state}</span>
                      <span className="cdf-city-time">✈️ Direct to Singapore (SIN)</span>
                      <span className="cdf-city-mode">🌿 Singapore in {city.total_time}</span>
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
              { icon: '🏨', title: '5 Nights Hotel + Breakfast', desc: 'Geylang/Bugis area 3-star hotels — excellent MRT access, close to Little India & Chinatown' },
              { icon: '🌿', title: 'Gardens by the Bay', desc: 'Cloud Forest + Flower Dome (both conservatories included) — Singapore\'s most spectacular attraction' },
              { icon: '🎡', title: 'Singapore Flyer', desc: 'One of the world\'s largest observation wheels — 165m high with panoramic views of city & Marina Bay' },
              { icon: '🐯', title: 'Singapore Zoo', desc: 'Award-winning open-concept zoo — see over 300 species in naturalistic habitats; breakfast with orangutans option' },
              { icon: '🚇', title: 'MRT Tourist Day-Pass', desc: 'Unlimited MRT travel for hassle-free city exploration — Orchard, Chinatown, Little India, Marina Bay' },
              { icon: '🚌', title: 'Airport & Hotel Transfers', desc: 'Changi Airport (SIN) pickup/drop + AC coach city tour through Chinatown, Little India, Orchard Road' },
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
              { step: '01', title: 'Pick Your City',    desc: 'Click your departure city above to see exact flight routes to Singapore, fares, and a city-specific itinerary.' },
              { step: '02', title: 'WhatsApp Us',       desc: 'Each city page has a pre-filled WhatsApp link. Our Singapore team responds within 30–60 minutes.' },
              { step: '03', title: 'Lock Your Dates',   desc: 'Confirm travel dates, group size (min 2), and hotel preference. No visa hassle — Indians enter Singapore visa-free.' },
              { step: '04', title: 'Book & Fly',        desc: 'Pay advance to confirm. We handle all hotels, Gardens by the Bay, Singapore Zoo, Flyer & transfers. You just fly.' },
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
            <p className="city-cta-headline">Ready to plan your Singapore escape?</p>
            <p className="city-cta-sub">
              WhatsApp for custom dates, group pricing &amp; combined flight + package quotes from your city.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Singapore%205N6D%20package"
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
