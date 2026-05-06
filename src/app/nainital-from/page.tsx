import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Nainital Tour from Your City 2026 | Junegiri Yatra',
  description: 'Book Nainital tour from any Indian city — Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune and 14 more. Naini Lake, Snow View, Jim Corbett. All-inclusive from ₹7,500. WhatsApp for departure quotes.',
  keywords: 'nainital trip from mumbai, nainital tour from bangalore, nainital from chennai, nainital package india, nainital corbett tour',
  alternates: { canonical: 'https://junegiriyatra.com/nainital-from/' },
  openGraph: {
    title: 'Nainital Tour from Your City | Junegiri Yatra',
    description: 'All-inclusive Nainital 3N/4D tour packages from 20 Indian cities. Naini Lake boating, Snow View & optional Corbett safari.',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.jpg' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Nainital Tour from Your City',
      description: 'Nainital tour packages with city-specific travel routes from 20 Indian departure cities.',
      url: 'https://junegiriyatra.com/nainital-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Nainital Package', item: 'https://junegiriyatra.com/packages/nainital-corbett-tour-3n-4d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/nainital-from/' },
      ],
    },
  ],
};

const REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Punjab', 'Haryana', 'Chandigarh', 'Uttarakhand'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh'] },
];

export default function NainitalFromIndex() {
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
      <section
        className="city-hero"
        style={{ backgroundImage: "url('/images/mountains1.jpg')", minHeight: '55vh' }}
      >
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/nainital-corbett-tour-3n-4d/">Nainital</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Nainital Tour — Lake District of India<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · Naini Lake, Snow View & Jim Corbett.
            All-inclusive 3N/4D from{' '}
            <strong>₹7,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Nainital%20Tour%20package"
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for Departure Quote
          </a>
        </div>
      </section>

      {/* HOOK */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            ✨ Nainital is only 4 hrs from Haridwar — making it the perfect add-on to a Char Dham
            Yatra or a standalone hill station escape. Pick your city below for exact routes and fares.
          </p>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for flight routes, train options, and a
            city-specific Nainital tour quote.
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
                        href={`/nainital-from/${city.slug}/`}
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

      {/* INCLUSIONS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">What Every Package Includes</h2>
          <p className="section-sub-left light">
            All Nainital packages include these regardless of your departure city.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: 'Lake View Hotel (3-Star)', desc: 'Centrally located hotel near Naini Lake — walk to the ghats, Mall Road, and Naina Devi Temple' },
              { icon: '🚐', title: 'All Transfers Haridwar–Nainital', desc: 'Private AC vehicle pickup from Haridwar station or Dehradun airport, straight to your Nainital hotel and back' },
              { icon: '⛵', title: 'Naini Lake Boating', desc: 'Rowing or paddleboat ride on the iconic 1 km natural lake surrounded by the Kumaon hills' },
              { icon: '🚡', title: 'Snow View Ropeway Tickets', desc: 'Return cable car to 2,270 m with panoramic views of Nanda Devi, Trisul, and Nandakot peaks on clear days' },
              { icon: '🛕', title: 'Naina Devi Temple Visit', desc: 'Guided visit to one of India\'s 51 Shakti Peethas, right on the north shore of Naini Lake' },
              { icon: '🐯', title: 'Corbett Safari (Optional)', desc: 'Half-day jeep safari at Jim Corbett National Park — India\'s oldest tiger reserve, 60 km from Nainital' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight or train options, drive time, and a city-specific Nainital itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Pre-filled WhatsApp message with your location. Our Haridwar team responds within 30 minutes during business hours.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm dates, group size, hotel preference, and whether you want to add the Jim Corbett safari.' },
              { step: '04', title: 'Book & Go', desc: 'Pay 30% advance to confirm. We handle transfers, hotel, boating, ropeway, and all local cab arrangements.' },
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
            <p className="city-cta-headline">Ready to plan your Nainital trip?</p>
            <p className="city-cta-sub">
              Haridwar-based team — arranging Nainital tours and Corbett safaris since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Nainital%20Tour"
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
