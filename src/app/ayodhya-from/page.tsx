import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Ayodhya Tour from Your City 2026 | Ram Mandir Darshan',
  description: 'Book Ayodhya tour from any city — Ram Mandir darshan, Ram Ki Paidi, Hanuman Garhi, Kanak Bhawan. All-inclusive from ₹5,500. Expert Haridwar operator. WhatsApp now.',
  keywords: 'ayodhya tour from mumbai, ayodhya ram mandir darshan package, ayodhya yatra from bangalore, ayodhya tour india',
  alternates: { canonical: 'https://junegiriyatra.com/ayodhya-from/' },
  openGraph: {
    title: 'Ayodhya Tour from Your City | Ram Mandir Darshan | Junegiri Yatra',
    description: 'All-inclusive Ayodhya Ram Mandir darshan packages from 100 Indian cities.',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Ayodhya Tour from Your City',
      description: 'Ayodhya Ram Mandir darshan packages with city-specific travel routes from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/ayodhya-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Ayodhya Tour', item: 'https://junegiriyatra.com/ayodhya-from/' },
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

export default function AyodhyaFromIndex() {
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
            <span>Ayodhya Tour</span>
          </nav>
          <h1 className="city-hero-h1">
            Ayodhya Tour<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Ram Mandir · Ram Ki Paidi · Hanuman Garhi · Kanak Bhawan.
            All-inclusive from{' '}
            <strong>₹5,500 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Ayodhya%20Ram%20Mandir%20darshan%20tour%20package"
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
            🛕 Ayodhya — the birthplace of Lord Ram — is home to the newly consecrated Ram Mandir (January 2024), one of the largest Hindu temples ever built. Ram Ki Paidi ghats, Hanuman Garhi, and Kanak Bhawan await. Pick your city below for train options, flight connections, and a tailored Ayodhya darshan package.
          </p>
        </div>
      </section>

      {/* CITY GRID */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Choose Your Departure City</h2>
          <p className="section-sub-left">
            {cities.length} cities covered. Click your city for travel details and a city-specific Ayodhya tour quote.
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
                        href={`/ayodhya-from/${city.slug}/`}
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
            All Ayodhya tour packages from Junegiri Yatra cover the complete darshan circuit.
          </p>
          <div className="cdf-includes-grid">
            {[
              { icon: '🛕', title: 'Ram Mandir Darshan', desc: 'Guided visit to the Ram Lalla temple — India\'s most significant new temple opened January 2024. VIP darshan slot available on request.' },
              { icon: '🙏', title: 'Ram Ki Paidi & Ghats', desc: 'Evening aarti at Ram Ki Paidi ghat on the Sarayu river — the sacred bathing ghat of Ayodhya since the Ramayana era.' },
              { icon: '⛩️', title: 'Hanuman Garhi', desc: '76-step hilltop temple dedicated to Hanuman — commanding views of Ayodhya town from the fort complex.' },
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Dedicated vehicle for the complete Ayodhya darshan circuit — all temples and ghats within the city' },
              { icon: '🏨', title: 'Hotels in Ayodhya', desc: '1–2 nights in comfortable hotels near the Ram Mandir complex — standard or deluxe options available' },
              { icon: '🧭', title: 'Certified Religious Guide', desc: 'Knowledgeable local guide with deep understanding of Ramayana mythology, temple history, and Vaishnavism' },
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
              { step: '01', title: 'Pick Your City', desc: 'Click your departure city above to see exact train connections to Ayodhya Junction, flight options, and a city-specific itinerary.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Pre-filled WhatsApp link with your location. Our Haridwar team responds within 60 minutes with your custom Ayodhya tour quote.' },
              { step: '03', title: 'Get Custom Quote', desc: 'We confirm dates, group size, VIP darshan preference, and Varanasi/Prayagraj extension options. No hidden fees.' },
              { step: '04', title: 'Book & Go', desc: 'Pay 30% advance to confirm. We handle hotel bookings, Ayodhya station transfers, temple permits, and guide — you focus on the darshan.' },
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
            <p className="city-cta-headline">Ready for Ayodhya Ram Mandir darshan?</p>
            <p className="city-cta-sub">
              WhatsApp our team — we arrange Ayodhya tours from all Indian cities since 2017.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Ayodhya%20tour"
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
