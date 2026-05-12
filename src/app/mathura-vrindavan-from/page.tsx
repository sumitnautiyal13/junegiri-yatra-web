import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Mathura Vrindavan Tour from Your City 2026 | Junegiri Yatra',
  description: 'Book Mathura Vrindavan tour from any Indian city — Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune and 95 more. Braj Bhoomi Yatra — Mathura, Vrindavan, Govardhan, Nandgaon, Barsana. All-inclusive from ₹6,500. WhatsApp for quote.',
  keywords: 'mathura vrindavan tour from mumbai, braj bhoomi yatra package, mathura vrindavan package india, mathura vrindavan from bangalore',
  alternates: { canonical: 'https://junegiriyatra.com/mathura-vrindavan-from/' },
  openGraph: {
    title: 'Mathura Vrindavan Tour from Your City | Junegiri Yatra',
    description: 'All-inclusive Braj Bhoomi Yatra packages from 100 Indian cities — Mathura, Vrindavan, Govardhan, Nandgaon & Barsana.',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Mathura Vrindavan Tour from Your City',
      description: 'Braj Bhoomi Yatra packages with city-specific travel routes from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/mathura-vrindavan-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Mathura Vrindavan', item: 'https://junegiriyatra.com/mathura-vrindavan-from/' },
      ],
    },
  ],
};

const REGIONS = [
  { label: "North & NCR", states: ["Delhi", "Delhi NCR", "Punjab", "Punjab/Haryana", "Haryana", "Chandigarh", "Uttarakhand", "Jammu & Kashmir", "Himachal Pradesh", "Ladakh"] },
  { label: "West India", states: ["Maharashtra", "Gujarat", "Rajasthan", "Goa"] },
  { label: "South India", states: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Telangana", "Kerala", "Puducherry"] },
  { label: "East & Central", states: ["West Bengal", "Bihar", "Madhya Pradesh", "Chhattisgarh", "Uttar Pradesh", "Jharkhand", "Odisha", "Assam", "Tripura", "Meghalaya", "Manipur"] },
];

export default function MathuraVrindavanFromIndex() {
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
        <Image src="/images/mountains1.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Mathura Vrindavan</span>
          </nav>
          <h1 className="city-hero-h1">
            Mathura Vrindavan Tour<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Braj Bhoomi Yatra — Mathura · Vrindavan · Govardhan · Nandgaon · Barsana.
            All-inclusive from{' '}
            <strong>₹6,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Mathura%20Vrindavan%20Braj%20Bhoomi%20Yatra%20package"
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
            🛕 Braj Bhoomi — the sacred land of Krishna — spans Mathura (birthplace), Vrindavan (childhood leelas), Govardhan Hill (the sacred hill Krishna lifted), and Radha&apos;s hometown Barsana. Pick your city below for flight routes, train options, and a tailored Braj Bhoomi package.
          </p>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for travel details and a city-specific Braj Bhoomi Yatra quote.
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
                        href={`/mathura-vrindavan-from/${city.slug}/`}
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
          <h2 className="section-title-left light">What Every Package Includes</h2>
          <p className="section-sub-left light">
            Regardless of your departure city, the Braj Bhoomi Yatra package covers all of this.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🛕', title: 'Krishna Janmabhoomi', desc: 'Guided visit to the exact birthplace of Krishna at Mathura, including Dwarkadhish Temple and Vishram Ghat' },
              { icon: '🙏', title: 'Vrindavan Temples', desc: 'ISKCON, Banke Bihari, Prem Mandir, Radha Raman, and Nidhivan — all 5 major temples with a certified Braj guide' },
              { icon: '⛰️', title: 'Govardhan Parikrama', desc: '21 km parikrama of Govardhan Hill — on foot, by bicycle, or by rickshaw based on your preference' },
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Dedicated vehicle for Mathura, Vrindavan, Govardhan, Nandgaon, and Barsana with a knowledgeable driver' },
              { icon: '🏨', title: 'Hotels in Mathura/Vrindavan', desc: '2 nights in clean, comfortable hotels near the temple complex — standard or deluxe options' },
              { icon: '🧭', title: 'Braj Cultural Guide', desc: 'Certified guide with deep knowledge of Braj mythology, temple history, and Vaishnavism — English and Hindi' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact flight options, train connections to Mathura, and a city-specific Braj Bhoomi itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link. Our Haridwar team responds within 60 minutes with your custom quote.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm your dates, group size, and whether you want to add Agra/Vrindavan extensions. Transparent pricing, no hidden fees.' },
              { step: '04', title: 'Book & Go', desc: 'Pay a 30% advance to confirm. We handle hotel bookings, Mathura arrival transfers, temple permits, and guide — you focus on the yatra.' },
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
            <p className="city-cta-headline">Ready for Braj Bhoomi Yatra?</p>
            <p className="city-cta-sub">
              WhatsApp our Haridwar team — we plan Mathura Vrindavan tours from all Indian cities.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Mathura%20Vrindavan%20Yatra"
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
