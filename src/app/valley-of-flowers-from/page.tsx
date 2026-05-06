import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Valley of Flowers Trek from Your City 2026 | Junegiri Yatra',
  description: 'Book Valley of Flowers trek from any Indian city — UNESCO heritage site, 500+ wildflower species, Hemkund Sahib. Haridwar-based operator, all-inclusive from ₹8,500/person. Open July–September.',
  keywords: 'valley of flowers trek from mumbai, valley of flowers from bangalore, valley of flowers trek india, hemkund sahib trek, valley of flowers package',
  alternates: { canonical: 'https://junegiriyatra.com/valley-of-flowers-from/' },
  openGraph: {
    title: 'Valley of Flowers Trek from Your City 2026 | Junegiri Yatra',
    description: 'All-inclusive Valley of Flowers 4N/5D trek packages from 20 Indian cities. UNESCO heritage site, open July–September.',
    images: [{ url: 'https://junegiriyatra.com/images/valley_flowers.jpg' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Valley of Flowers Trek from Your City',
      description: 'Valley of Flowers trek packages with city-specific travel routes from 20 Indian departure cities.',
      url: 'https://junegiriyatra.com/valley-of-flowers-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Valley of Flowers Trek', item: 'https://junegiriyatra.com/packages/valley-of-flowers-trek-4n-5d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/valley-of-flowers-from/' },
      ],
    },
  ],
};

// Group cities by region for better UX
const REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Punjab', 'Haryana', 'Chandigarh', 'Uttarakhand'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh'] },
];

export default function ValleyOfFlowersFromIndex() {
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
      <section
        className="city-hero"
        style={{
          backgroundImage: "url('/images/valley_flowers.jpg')",
          minHeight: '55vh',
        }}
      >
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/valley-of-flowers-trek-4n-5d/">Valley of Flowers Trek</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <div className="city-hero-season-badge">Open July – September</div>
          <h1 className="city-hero-h1">
            Valley of Flowers Trek<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · UNESCO World Heritage · 500+ wildflower species.
            All-inclusive treks from{' '}
            <strong>₹8,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Valley%20of%20Flowers%20Trek%202026"
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
            ✨ The Valley of Flowers blooms only July–September. Every city has different trains and flight options to Haridwar — the gateway to Govindghat.
            Pick your city below for a tailored guide, exact travel routes, and a WhatsApp quote pre-filled with your location.
          </p>
        </div>
      </section>

      {/* CITY GRID BY REGION */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for travel routes, fares, and a
            city-specific Valley of Flowers trek package quote.
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
                        href={`/valley-of-flowers-from/${city.slug}/`}
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
            Regardless of your departure city, the Valley of Flowers trek package covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏡', title: 'Ghangaria Guesthouses', desc: '4 nights accommodation at Ghangaria (3,050 m) — the last settlement before the Valley' },
              { icon: '🍽️', title: 'All Meals on Trek', desc: 'Breakfast, lunch, and dinner included every day throughout the 4-night trek' },
              { icon: '🧭', title: 'Expert Trek Guide', desc: 'Govindghat to Ghangaria and Valley of Flowers certified guide with flora knowledge' },
              { icon: '📋', title: 'Valley Entry Permit', desc: 'Valley of Flowers National Park entry permit and Hemkund Sahib day visit included' },
              { icon: '🚐', title: 'Haridwar Transfers', desc: 'Round-trip transport Haridwar–Govindghat–Haridwar in AC vehicle included' },
              { icon: '🚁', title: 'Helicopter Option', desc: 'Govindghat–Ghangaria helicopter available as paid upgrade for those who prefer it' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight/train options, fares, and a city-specific Valley of Flowers itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link with your location. Our team responds within 30 minutes.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your 2026 dates, group size, trek vs. helicopter preference, and guesthouse type at Ghangaria.' },
              { step: '04', title: 'Book & Trek', desc: 'Pay a small advance to confirm. We handle Haridwar pickup, permits, guesthouses, and guide. You trek stress-free.' },
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
            <p className="city-cta-headline">The Valley blooms for just 10 weeks — plan early.</p>
            <p className="city-cta-sub">
              Talk to our Haridwar team — we&apos;ve been running Valley of Flowers treks since 2017. Slots fill up by May.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Valley%20of%20Flowers%20Trek%202026"
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
