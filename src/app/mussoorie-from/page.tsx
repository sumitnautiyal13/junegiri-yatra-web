import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Mussoorie Trip from Your City 2026 | Junegiri Yatra',
  description: 'Book Mussoorie weekend getaway from any Indian city — Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune and 14 more. Kempty Falls, Gun Hill & Mall Road. All-inclusive from ₹5,500. WhatsApp for departure quotes.',
  keywords: 'mussoorie trip from mumbai, mussoorie tour from bangalore, mussoorie weekend from chennai, mussoorie hill station package india, mussoorie departure cities',
  alternates: { canonical: 'https://junegiriyatra.com/mussoorie-from/' },
  openGraph: {
    title: 'Mussoorie Tour from Your City | Junegiri Yatra',
    description: 'All-inclusive Mussoorie weekend getaway packages from 20 Indian cities. Queen of the Hills awaits.',
    images: [{ url: 'https://junegiriyatra.com/images/mountains2.jpg' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Mussoorie Tour from Your City',
      description: 'Mussoorie weekend getaway packages with city-specific travel routes from 20 Indian departure cities.',
      url: 'https://junegiriyatra.com/mussoorie-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Mussoorie Package', item: 'https://junegiriyatra.com/packages/mussoorie-dehradun-3n-4d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/mussoorie-from/' },
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

export default function MussoorieFromIndex() {
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
          backgroundImage: "url('/images/mountains2.jpg')",
          minHeight: '55vh',
        }}
      >
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/mussoorie-dehradun-3n-4d/">Mussoorie</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Mussoorie Weekend Getaway<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · Kempty Falls, Gun Hill & Mall Road.
            All-inclusive packages from{' '}
            <strong>₹5,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Mussoorie%20Tour%20package"
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
            ✨ Every city has different flight options, fares, and travel durations to Haridwar.
            Pick your city below for a tailored guide — exact flight routes, train options,
            and a WhatsApp quote pre-filled with your location.
          </p>
        </div>
      </section>

      {/* CITY GRID BY REGION */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for flight routes, fares, and a
            city-specific Mussoorie weekend package quote.
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
                        href={`/mussoorie-from/${city.slug}/`}
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
            Regardless of your departure city, the Mussoorie weekend getaway covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: '3-Star Hotel on Mall Road', desc: 'Centrally located hotel within walking distance of Mall Road, Camel Back Road, and the main Mussoorie market' },
              { icon: '🚐', title: 'All Haridwar–Mussoorie Transfers', desc: 'Private AC vehicle both ways — Haridwar railway station or Dehradun airport pickup to your hotel and back' },
              { icon: '💧', title: 'Kempty Falls Excursion', desc: 'Guided visit to Mussoorie\'s most famous multi-tier waterfall with time for swimming in the natural pools' },
              { icon: '🚡', title: 'Gun Hill Cable Car Tickets', desc: 'Return ropeway tickets to Gun Hill — Mussoorie\'s second highest peak with panoramic Himalayan views' },
              { icon: '🍳', title: 'Breakfast Both Mornings', desc: 'Full breakfast included on Day 2 and Day 3 so you can start your sightseeing days well-fuelled' },
              { icon: '🚗', title: 'Local Sightseeing by Cab', desc: 'Dedicated cab for Lal Tibba, Company Garden, Happy Valley, and other Mussoorie highlights at your pace' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight or train options, fares, and a city-specific itinerary for your Mussoorie getaway.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link with your location. Our team responds within 30 minutes.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your dates, group size, accommodation type, and whether you want to add Dehradun or Dhanaulti to the trip.' },
              { step: '04', title: 'Book & Go', desc: 'Pay a small advance to confirm. We handle transfers, hotel, cable car, Kempty Falls, and cab. You enjoy the Queen of the Hills.' },
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
            <p className="city-cta-headline">Not sure which package suits you?</p>
            <p className="city-cta-sub">
              Talk to our Haridwar team — we&apos;ve been arranging Mussoorie getaways since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Mussoorie%20Tour"
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
