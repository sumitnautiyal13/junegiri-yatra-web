import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kedarnath Helicopter Tour from Your City 2026 | Skip the Trek',
  description: 'Book Kedarnath helicopter darshan from any Indian city — Mumbai, Bangalore, Chennai, Delhi, Hyderabad, Pune and 95 more. Skip the trek. 2N/3D from ₹14,500. Phata / Sirsi helipad. WhatsApp for slots.',
  keywords: 'kedarnath helicopter tour from mumbai, kedarnath helicopter package from bangalore, kedarnath helicopter booking, kedarnath by helicopter 2026',
  alternates: { canonical: 'https://junegiriyatra.com/kedarnath-helicopter-from/' },
  openGraph: {
    title: 'Kedarnath Helicopter Tour from Your City | Junegiri Yatra',
    description: 'Skip the trek — fly to Kedarnath by helicopter. All-inclusive 2N/3D from ₹14,500. Book from 100+ cities.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_helicopter.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Kedarnath Helicopter Tour from Your City',
      description: 'Kedarnath helicopter packages from 100 Indian departure cities — skip the 22 km trek, fly directly to the Jyotirlinga.',
      url: 'https://junegiriyatra.com/kedarnath-helicopter-from/',
      provider: {
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
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Kedarnath Helicopter', item: 'https://junegiriyatra.com/packages/kedarnath-helicopter-2n-3d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/kedarnath-helicopter-from/' },
      ],
    },
  ],
};

const REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Delhi NCR', 'Punjab', 'Punjab/Haryana', 'Haryana', 'Chandigarh', 'Uttarakhand', 'Jammu & Kashmir', 'Himachal Pradesh', 'Ladakh'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Puducherry'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh', 'Jharkhand', 'Odisha', 'Assam', 'Tripura', 'Meghalaya', 'Manipur'] },
];

export default function KedarnathHelicopterFromIndex() {
  const cities = getAllCities();

  const grouped = REGIONS.map((region) => ({
    ...region,
    cities: cities.filter((c) => region.states.includes(c.state)),
  }));

  const assignedSlugs = grouped.flatMap((g) => g.cities.map((c) => c.slug));
  const remaining = cities.filter((c) => !assignedSlugs.includes(c.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '55vh' }}>
        <Image src="/images/kedarnath_helicopter.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/kedarnath-helicopter-2n-3d/">Kedarnath Helicopter</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Kedarnath Helicopter<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Skip the 22 km trek — fly directly to Kedarnath helipad at 3,584 m.
            All-inclusive 2N/3D packages from{' '}
            <strong>₹14,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Kedarnath%20helicopter%20tour"
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for Helicopter Slot
          </a>
        </div>
      </section>

      {/* WHY HELICOPTER */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            🚁 Kedarnath helicopter service operates from Phata, Sirsi, Guptkashi, and Agustmuni helipads.
            A return helicopter ticket saves the 22 km, 6–7 hour trek — ideal for elderly pilgrims, families
            with children, or anyone with limited time. Pick your city below for a pre-filled WhatsApp booking.
          </p>
        </div>
      </section>

      {/* CITY GRID BY REGION */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for flight routes, fares, and a
            city-specific Kedarnath helicopter package quote.
          </p>

          {[...grouped, ...(remaining.length > 0 ? [{ label: 'Other Cities', cities: remaining }] : [])].map(
            (group) =>
              group.cities.length > 0 ? (
                <div key={group.label} className="cdf-region">
                  <h3 className="cdf-region-title">{group.label}</h3>
                  <div className="cdf-city-grid">
                    {group.cities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/kedarnath-helicopter-from/${city.slug}/`}
                        className="cdf-city-card"
                      >
                        <span className="cdf-city-name">{city.name}</span>
                        <span className="cdf-city-state">{city.state}</span>
                        <span className="cdf-city-time">{city.total_time}</span>
                        <span className="cdf-city-mode">
                          {city.best_mode === 'fly' ? '✈️ Fly recommended' : city.best_mode === 'train' ? '🚆 Train recommended' : '🚗 Drive possible'}
                        </span>
                        <span className="cdf-city-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null
          )}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">What the Helicopter Package Includes</h2>
          <p className="section-sub-left light">
            Every city package covers the full helicopter Kedarnath circuit from Haridwar.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🚁', title: 'Return Helicopter Flight', desc: 'Return helicopter from Phata or Sirsi to Kedarnath helipad — saves the 22 km trek both ways' },
              { icon: '🏨', title: '2 Nights Hotel', desc: 'Accommodation at Guptkashi / near Phata helipad — standard, deluxe, or premium options' },
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Airport/station pickup, Haridwar to Guptkashi to Phata helipad and back — dedicated vehicle' },
              { icon: '📋', title: 'Biometric & Permits', desc: 'Biometric registration, helicopter slot booking, and temple darshan coordination — fully managed' },
              { icon: '🧭', title: 'Certified Guide', desc: 'Religious guide at Kedarnath for temple darshan, aarti timings, and pilgrimage significance' },
              { icon: '🏥', title: 'Safety Protocol', desc: 'Altitude sickness protocol, oxygen kit, and emergency contact — every group covered' },
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
      </section>

      {/* HELIPADS INFO */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Kedarnath Helipads — Which One You Use</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
            {[
              { pad: 'Phata Helipad', km: '13 km from Kedarnath', time: '7 min flight', note: 'Most popular departure point · operates April–November' },
              { pad: 'Sirsi Helipad', km: '18 km from Kedarnath', time: '10 min flight', note: 'Less crowded · good availability in peak season' },
              { pad: 'Guptkashi Helipad', km: '25 km from Kedarnath', time: '12 min flight', note: 'Convenient if staying in Guptkashi town' },
              { pad: 'Agustmuni Helipad', km: '31 km from Kedarnath', time: '15 min flight', note: 'Private operators · charter options available' },
            ].map((h) => (
              <div key={h.pad} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.95rem' }}>🚁 {h.pad}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>{h.km} · {h.time}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{h.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Kedarnath helicopter slots fill weeks in advance</p>
            <p className="city-cta-sub">
              Book early — May and June 2026 slots are already filling up. WhatsApp us now.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Kedarnath%20helicopter%20tour"
              className="btn-gold-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              📲 Book Helicopter Slot
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
