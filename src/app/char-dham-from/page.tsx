import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Char Dham Yatra from Your City 2026 | Junegiri Yatra',
  description: 'Book Char Dham Yatra from any city — Mumbai, Bangalore, Delhi, Chennai, Hyderabad, Pune & 90+ more. All-inclusive from ₹19,800. Haridwar-based operator. WhatsApp now.',
  keywords: 'char dham yatra from mumbai, char dham yatra from bangalore, char dham yatra from chennai, char dham package from india, char dham yatra departure cities',
  alternates: { canonical: 'https://junegiriyatra.com/char-dham-from/' },
  openGraph: {
    title: 'Char Dham Yatra from Your City | Junegiri Yatra',
    description: 'All-inclusive Char Dham packages with flights & transfers from 100 Indian cities.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Char Dham Yatra from Your City',
      description: 'Char Dham Yatra packages with city-specific travel routes from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/char-dham-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Char Dham Packages', item: 'https://junegiriyatra.com/packages/char-dham-yatra/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/char-dham-from/' },
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

export default function CharDhamFromIndex() {
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
        <Image src="/images/kedarnath_temple_cover.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/char-dham-yatra/">Char Dham</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Char Dham Yatra<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · We handle flights, transfers &amp; everything in between.
            All-inclusive packages from{' '}
            <strong>₹19,800 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Char%20Dham%20Yatra%20package"
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
            city-specific Char Dham package quote.
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
                        href={`/char-dham-from/${city.slug}/`}
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
            Regardless of your departure city, the Char Dham package covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: 'Hotels & Dharamshalas', desc: 'All accommodation throughout the 9-night circuit — standard, deluxe, or premium options' },
              { icon: '🍽️', title: 'Daily Meals', desc: 'Breakfast and dinner included every day. Wholesome local food along the Char Dham route' },
              { icon: '🚐', title: 'AC Vehicle', desc: 'Private AC Tempo Traveller or SUV for the entire Char Dham circuit from Haridwar onwards' },
              { icon: '🧭', title: 'Local Expert Guide', desc: 'Haridwar-based guide with 10+ years of experience on the Char Dham route' },
              { icon: '📋', title: 'All Permits', desc: 'Biometric registration, forest permits, and temple entry — we handle the paperwork' },
              { icon: '🏥', title: 'Safety Kit', desc: 'First-aid box, oxygen cylinder, and altitude-sickness protocol on every vehicle' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight options, fares, and a city-specific itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link with your location. Our team responds within 30 minutes.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your dates, group size, accommodation preference, and helicopter vs. trek choice at Kedarnath.' },
              { step: '04', title: 'Book & Go', desc: 'Pay a small advance to confirm. We handle airport transfers, hotels, permits, and guide. You travel stress-free.' },
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
              Talk to our Haridwar team — we&apos;ve planned Char Dham for pilgrims from every corner of India since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Char%20Dham%20Yatra"
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
