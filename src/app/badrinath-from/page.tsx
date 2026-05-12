import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Badrinath Yatra from Your City 2026 | Junegiri Yatra',
  description: 'Book Badrinath Yatra from any Indian city — Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune and 14 more. Haridwar-based operator, all-inclusive from ₹6,500. Mana Village & Vasudhara Falls included. WhatsApp for departure quotes.',
  keywords: 'badrinath yatra from mumbai, badrinath yatra from bangalore, badrinath yatra from chennai, badrinath package from india, badrinath yatra departure cities',
  alternates: { canonical: 'https://junegiriyatra.com/badrinath-from/' },
  openGraph: {
    title: 'Badrinath Yatra from Your City | Junegiri Yatra',
    description: 'All-inclusive Badrinath Yatra packages from 100 Indian cities. Lord Vishnu shrine, Mana Village & Vasudhara Falls.',
    images: [{ url: 'https://junegiriyatra.com/images/badrinath_temple.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Badrinath Yatra from Your City',
      description: 'Badrinath Yatra packages with city-specific travel routes from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/badrinath-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Badrinath Packages', item: 'https://junegiriyatra.com/packages/badrinath-yatra-2n-3d/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/badrinath-from/' },
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

export default function BadrinathFromIndex() {
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
        <Image src="/images/badrinath_temple.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/packages/badrinath-yatra-2n-3d/">Badrinath</Link>
            <span>›</span>
            <span>From Your City</span>
          </nav>
          <h1 className="city-hero-h1">
            Badrinath Yatra<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Pick your departure city · Lord Vishnu shrine at 3,133 m · Mana Village & Vasudhara Falls.
            All-inclusive packages from{' '}
            <strong>₹6,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Badrinath%20Yatra%20package"
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
            city-specific Badrinath Yatra package quote.
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
                        href={`/badrinath-from/${city.slug}/`}
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
            Regardless of your departure city, the Badrinath Yatra package covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏨', title: 'Hotels', desc: 'Accommodation at Joshimath and/or Badrinath — standard, deluxe, or premium options available' },
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Dedicated private vehicle for the entire Badrinath circuit from Haridwar and back' },
              { icon: '🧭', title: 'Pujari Guide', desc: 'Experienced Badrinath pujari-guide for temple darshan, Mana Village walk, and Vasudhara Falls' },
              { icon: '📋', title: 'All Permits & Entry', desc: 'Temple entry, forest permits, and darshan registration — fully managed by our team' },
              { icon: '🏔️', title: 'Mana Village Walk', desc: 'Guided walk through India\'s last village before Tibet — Vyas Gufa, Ganesh Gufa, Saraswati River' },
              { icon: '🌊', title: 'Vasudhara Falls', desc: '145 m sacred waterfall — 3 km guided walk from Mana Village included in the package' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight options, fares, and a city-specific itinerary for Badrinath Yatra.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link with your location. Our team responds within 30 minutes.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your dates, group size, accommodation preference, and finalize your Badrinath Yatra itinerary.' },
              { step: '04', title: 'Book & Go', desc: 'Pay a small advance to confirm. We handle airport transfers, hotels, permits, pujari guide, and Mana Village walk. You focus on the pilgrimage.' },
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
              Talk to our Haridwar team — we&apos;ve been guiding pilgrims to Badrinath since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Badrinath%20Yatra"
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
