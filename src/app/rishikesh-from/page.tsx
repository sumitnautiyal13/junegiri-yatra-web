import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Rishikesh Trip from Your City 2026 | Junegiri Yatra',
  description: 'Book Rishikesh adventure from any city — rafting, bungee jumping, camping, kayaking. All-inclusive from ₹2,500/person. Haridwar-based operator. WhatsApp for quote.',
  keywords: 'rishikesh trip from mumbai, rishikesh adventure from bangalore, rishikesh rafting from delhi, rishikesh weekend getaway, rishikesh package india',
  alternates: { canonical: 'https://junegiriyatra.com/rishikesh-from/' },
  openGraph: {
    title: 'Rishikesh Trip from Your City 2026 | Junegiri Yatra',
    description: 'All-inclusive Rishikesh adventure packages with rafting, bungee & camping from 100 Indian cities.',
    images: [{ url: 'https://junegiriyatra.com/images/rishikesh_bridge.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Rishikesh Trip from Your City',
      description: 'Rishikesh adventure packages with city-specific travel routes from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/rishikesh-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Rishikesh Adventure', item: 'https://junegiriyatra.com/packages/rishikesh-adventure-pack-2n-3d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/rishikesh-from/' },
      ],
    },
  ],
};

// Group cities by region for better UX
const REGIONS = [
  { label: "North \& NCR", states: ["Delhi", "Delhi NCR", "Punjab", "Punjab/Haryana", "Haryana", "Chandigarh", "Uttarakhand", "Jammu \& Kashmir", "Himachal Pradesh", "Ladakh"] },
  { label: "West India", states: ["Maharashtra", "Gujarat", "Rajasthan", "Goa"] },
  { label: "South India", states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala", "Puducherry"] },
  { label: "East \& Central", states: ["West Bengal", "Bihar", "Madhya Pradesh", "Chhattisgarh", "Uttar Pradesh", "Jharkhand", "Odisha", "Assam", "Tripura", "Meghalaya", "Manipur"] },
];

export default function RishikeshFromIndex() {
  const cities = getAllCities();

  // Group by region
  const grouped = REGIONS.map((region) => ({
    ...region,
    cities: cities.filter((c) => region.states.includes(c.state)),
  }));

  // Any cities not in a region group (catch-all)
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
        <Image src="/images/rishikesh_bridge.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/rishikesh-adventure-pack-2n-3d/">Rishikesh Adventure</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Rishikesh Trip<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · Rafting, bungee &amp; riverside camping.
            Weekend escapes from{' '}
            <strong>₹2,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Rishikesh%20adventure%20trip"
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for Departure Quote
          </a>
        </div>
      </section>

      {/* WHY THIS PAGE EXISTS */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✨ Rishikesh is just 30 min from Haridwar — one of India&apos;s easiest Himalayan weekend escapes.
            Pick your city below for exact travel options, fares, and a WhatsApp quote pre-filled with your location.
          </p>
        </div>
      </section>

      {/* CITY GRID BY REGION */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for travel routes, fares, and a
            city-specific Rishikesh adventure package quote.
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
                        href={`/rishikesh-from/${city.slug}/`}
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

      {/* WHAT'S INCLUDED IN ALL CITY PACKAGES */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">What Every Package Includes</h2>
          <p className="section-sub-left light">
            Regardless of your departure city, the Rishikesh adventure package covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏕️', title: 'Riverside Camping', desc: '2 nights Ganga beach camp — bonfire, BBQ dinner, sleeping under stars next to the river' },
              { icon: '🚣', title: 'River Rafting', desc: 'Shivpuri 16 km or Marine Drive 26 km · Grade III-IV rapids · certified guides · all gear' },
              { icon: '🪂', title: 'Bungee Jumping', desc: "83 m India's highest bungee at Jumpin' Heights — no prior experience needed, 1 jump per person" },
              { icon: '🛶', title: 'Kayaking & Cliff Jump', desc: 'Beginner-friendly kayaking session · supervised cliff jumping · body surfing in the Ganga' },
              { icon: '🍽️', title: 'All Meals', desc: 'Day 1 dinner through Day 3 breakfast — wholesome camp food included throughout the trip' },
              { icon: '🦺', title: 'Safety Gear', desc: 'Life jackets, helmets, and all rafting & adventure equipment provided · certified instructors' },
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

      {/* HOW IT WORKS */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How Booking Works</h2>
          <div className="cdf-steps">
            {[
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact travel options, fares, and a city-specific Rishikesh adventure itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link with your location. Our team responds within 30 minutes.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your dates, group size, adventure activities, and accommodation preference — camp or budget hotel.' },
              { step: '04', title: 'Book & Enjoy', desc: 'Pay a small advance to confirm. We handle Haridwar transfers, camp bookings, activity slots, and guides. You just show up.' },
            ].map((s) => (
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

      {/* BOTTOM CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready for your Rishikesh weekend?</p>
            <p className="city-cta-sub">
              Talk to our Haridwar team — we&apos;ve been running Rishikesh adventures for groups from every corner of India since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Rishikesh%20adventure%20trip"
              className="btn-gold-lg"
              target="_blank"
              rel="noopener noreferrer"
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
