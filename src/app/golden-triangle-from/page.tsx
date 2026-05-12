import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Golden Triangle Tour from Your City 2026 | Delhi Agra Jaipur',
  description: 'Book Golden Triangle tour (Delhi–Agra–Jaipur) from any city worldwide — USA, UK, Australia, Canada, Europe, Middle East and 300+ cities. All-inclusive 5–7 days from ₹18,000. Taj Mahal, Amber Fort, Old Delhi. WhatsApp for a custom itinerary.',
  keywords: 'golden triangle tour from usa, golden triangle india from uk, delhi agra jaipur from australia, golden triangle tour package from canada, golden triangle india holiday from europe',
  alternates: { canonical: 'https://junegiriyatra.com/golden-triangle-from/' },
  openGraph: {
    title: 'Golden Triangle Tour from Your City | Delhi Agra Jaipur | Junegiri Yatra',
    description: 'Delhi · Taj Mahal (Agra) · Pink City (Jaipur). All-inclusive 5–7 day Golden Triangle from ₹18,000. Book from 340+ cities worldwide.',
    images: [{ url: 'https://junegiriyatra.com/images/golden_triangle.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Golden Triangle Tour from Your City',
      description: 'Golden Triangle India tour (Delhi–Agra–Jaipur) from 340+ departure cities worldwide. All-inclusive packages from ₹18,000 per person.',
      url: 'https://junegiriyatra.com/golden-triangle-from/',
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
        { '@type': 'ListItem', position: 2, name: 'Golden Triangle Tour', item: 'https://junegiriyatra.com/golden-triangle-from/' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Golden Triangle tour in India?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Golden Triangle is India\'s most popular tourist circuit connecting three UNESCO World Heritage-rich cities: Delhi (capital city — Red Fort, Qutub Minar, Humayun\'s Tomb), Agra (Taj Mahal — one of the Seven Wonders of the World, Agra Fort, Fatehpur Sikri), and Jaipur (Amber Fort, City Palace, Hawa Mahal, Jantar Mantar). The three cities form a triangle on the map, hence the name. A standard tour covers all three in 5–7 days by private vehicle.' }
        },
        {
          '@type': 'Question',
          name: 'How long does the Golden Triangle tour take?',
          acceptedAnswer: { '@type': 'Answer', text: 'The standard Golden Triangle tour takes 5–7 days: 1.5 days Delhi, 1 day Agra, 2 days Jaipur, plus travel days between cities. Distances: Delhi to Agra 200 km (3 hrs), Agra to Jaipur 240 km (4 hrs), Jaipur to Delhi 280 km (5 hrs). We can extend to 10–12 days by adding Varanasi, Udaipur, or combining with Char Dham Yatra.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best time to do the Golden Triangle tour?',
          acceptedAnswer: { '@type': 'Answer', text: 'October to March is the best time — weather is cool and pleasant (15–28°C). November–January is peak season with ideal conditions. April–June is hot (up to 45°C in Rajasthan) but doable with early morning sightseeing. July–September (monsoon) is less crowded and the landscape is green, but some outdoor attractions may be less comfortable.' }
        },
      ]
    }
  ],
};

const STOPS = [
  {
    city: 'Delhi',
    day: 'Day 1–2',
    highlights: ['Red Fort (UNESCO)', 'Qutub Minar (UNESCO)', 'Humayun\'s Tomb (UNESCO)', 'Chandni Chowk Old Bazaar', 'India Gate & Raj Path', 'Lotus Temple'],
    image: '/images/delhi_heritage.webp',
  },
  {
    city: 'Agra',
    day: 'Day 3',
    highlights: ['Taj Mahal at sunrise (7 Wonders)', 'Agra Fort (UNESCO)', 'Itmad-ud-Daulah (Baby Taj)', 'Fatehpur Sikri — Mughal ghost city', 'Mehtab Bagh sunset view of Taj'],
    image: '/images/taj_mahal.webp',
  },
  {
    city: 'Jaipur',
    day: 'Day 4–5',
    highlights: ['Amber Fort & elephant ride', 'City Palace & Chandra Mahal', 'Hawa Mahal (Palace of Winds)', 'Jantar Mantar Observatory (UNESCO)', 'Johari Bazaar gemstones & textiles'],
    image: '/images/jaipur.webp',
  },
];

const INTL_REGIONS = [
  { label: '🇺🇸 United States', countries: ['USA'] },
  { label: '🇬🇧 United Kingdom', countries: ['United Kingdom'] },
  { label: '🇦🇺 Australia & New Zealand', countries: ['Australia', 'New Zealand'] },
  { label: '🇨🇦 Canada', countries: ['Canada'] },
  { label: '🌍 Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Jordan', 'Lebanon', 'Israel', 'Oman'] },
  { label: '🌏 Southeast Asia', countries: ['Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Indonesia', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar'] },
  { label: '🌏 East Asia', countries: ['Japan', 'South Korea', 'China', 'Taiwan', 'Hong Kong'] },
  { label: '🇪🇺 Europe', countries: ['Germany', 'France', 'Netherlands', 'Switzerland', 'Austria', 'Belgium', 'Portugal', 'Spain', 'Italy', 'Sweden', 'Norway', 'Finland', 'Denmark', 'Poland', 'Czech Republic', 'Greece', 'Romania', 'Bulgaria', 'Ukraine', 'Ireland'] },
  { label: '🌍 Africa', countries: ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Morocco', 'Ethiopia', 'Tanzania', 'Tunisia', 'Zambia', 'Zimbabwe'] },
  { label: '🌎 Latin America', countries: ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Uruguay'] },
  { label: '🌏 South Asia & Others', countries: ['Sri Lanka', 'Bhutan', 'Maldives', 'Bangladesh', 'Nepal', 'Azerbaijan', 'Armenia', 'Georgia', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan'] },
];

const INDIA_REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Delhi NCR', 'Punjab', 'Punjab/Haryana', 'Haryana', 'Chandigarh', 'Uttarakhand', 'Jammu & Kashmir', 'Himachal Pradesh', 'Ladakh'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Puducherry'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh', 'Jharkhand', 'Odisha', 'Assam', 'Tripura', 'Meghalaya', 'Manipur'] },
];

export default function GoldenTriangleFromIndex() {
  const allCities = getAllCities();
  const intlCities = allCities.filter((c) => (c as any).is_international);
  const indianCities = allCities.filter((c) => !(c as any).is_international);

  const intlGrouped = INTL_REGIONS.map((r) => ({
    ...r,
    cities: intlCities.filter((c) => r.countries.includes((c as any).country || c.state)),
  }));
  const assignedIntl = intlGrouped.flatMap((g) => g.cities.map((c) => c.slug));
  const remainingIntl = intlCities.filter((c) => !assignedIntl.includes(c.slug));

  const indiaGrouped = INDIA_REGIONS.map((r) => ({
    ...r,
    cities: indianCities.filter((c) => r.states.includes(c.state)),
  }));
  const assignedIndia = indiaGrouped.flatMap((g) => g.cities.map((c) => c.slug));
  const remainingIndia = indianCities.filter((c) => !assignedIndia.includes(c.slug));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '55vh' }}>
        <Image src="/images/golden_triangle.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Golden Triangle Tour</span>
          </nav>
          <h1 className="city-hero-h1">
            Golden Triangle Tour<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Delhi · Taj Mahal · Jaipur — India&apos;s most iconic circuit.
            All-inclusive 5–7 day packages from{' '}
            <strong>₹18,000 / person</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20a%20Golden%20Triangle%20tour.%20Please%20share%20package%20details."
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for a Custom Quote
          </a>
        </div>
      </section>

      {/* HOOK */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            🏛️ The Golden Triangle connects <strong>Delhi</strong> (UNESCO heritage, Old Mughal quarter),
            <strong> Agra</strong> (Taj Mahal — one of the Seven Wonders), and
            <strong> Jaipur</strong> (Amber Fort, Pink City palaces) in one seamless circuit by private vehicle.
            This is India&apos;s most booked international tour — 5–7 days, fully guided.
            Click your city below for a flight-time estimate and pre-filled WhatsApp quote.
          </p>
        </div>
      </section>

      {/* THREE STOPS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">The Three Golden Triangle Cities</h2>
          <p className="section-sub-left light">Three UNESCO World Heritage sites, two royal capitals, one 5–7 day circuit.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginTop: 24 }}>
            {STOPS.map((stop) => (
              <div key={stop.city} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '1rem' }}>🏰 {stop.city} <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 400 }}>· {stop.day}</span></div>
                <ul style={{ margin: '8px 0 0 0', padding: '0 0 0 1rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  {stop.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">What&apos;s Included in Every Package</h2>
          <div className="cdf-includes-grid">
            {[
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Dedicated car for all 3 cities — Delhi pickup, Agra, Jaipur, Delhi drop. No shared coaches.' },
              { icon: '🏨', title: '4–6 Nights Hotel', desc: 'Standard (3★) to premium (5★) hotels in Delhi, Agra, and Jaipur. Breakfast included.' },
              { icon: '🧭', title: 'Certified English Guide', desc: 'Local guide at each city — Taj Mahal, Amber Fort, Old Delhi. Available in other languages on request.' },
              { icon: '🎟️', title: 'Monument Entry Fees', desc: 'Taj Mahal, Agra Fort, Amber Fort, Qutub Minar, and Humayun\'s Tomb — all included.' },
              { icon: '✈️', title: 'Delhi Airport Pickup', desc: 'We pick you up directly from Delhi IGI Airport (DEL) and drop you back at the end of the tour.' },
              { icon: '📱', title: '24/7 WhatsApp Support', desc: 'On-ground support throughout your trip — flight delays, hotel issues, itinerary changes covered.' },
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

      {/* INTERNATIONAL CITIES */}
      <section className="city-section city-section-alt">
        <div className="container">
          <h2 className="section-title-left">International Departure Cities</h2>
          <p className="section-sub-left">
            {intlCities.length} international cities covered. Click your city for a Golden Triangle package quote.
          </p>
          {[...intlGrouped, ...(remainingIntl.length > 0 ? [{ label: 'Other International Cities', cities: remainingIntl }] : [])].map(
            (group) => group.cities.length > 0 ? (
              <div key={group.label} className="cdf-region">
                <h3 className="cdf-region-title">{group.label}</h3>
                <div className="cdf-city-grid">
                  {group.cities.map((c) => (
                    <Link key={c.slug} href={`/golden-triangle-from/${c.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{c.name}</span>
                      <span className="cdf-city-state">{(c as any).country || c.state}</span>
                      <span className="cdf-city-time">{c.total_time}</span>
                      <span className="cdf-city-mode">✈️ Fly to Delhi</span>
                      <span className="cdf-city-arrow">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* INDIAN CITIES */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Travelling from within India?</h2>
          <p className="section-sub-left">{indianCities.length} Indian cities covered — we arrange train or flight from your city to Delhi.</p>
          {[...indiaGrouped, ...(remainingIndia.length > 0 ? [{ label: 'Other Cities', cities: remainingIndia }] : [])].map(
            (group) => group.cities.length > 0 ? (
              <div key={group.label} className="cdf-region">
                <h3 className="cdf-region-title">{group.label}</h3>
                <div className="cdf-city-grid">
                  {group.cities.map((c) => (
                    <Link key={c.slug} href={`/golden-triangle-from/${c.slug}/`} className="cdf-city-card">
                      <span className="cdf-city-name">{c.name}</span>
                      <span className="cdf-city-state">{c.state}</span>
                      <span className="cdf-city-time">{c.total_time}</span>
                      <span className="cdf-city-mode">
                        {c.best_mode === 'fly' ? '✈️ Fly recommended' : c.best_mode === 'train' ? '🚆 Train recommended' : '🚗 Drive possible'}
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

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Golden Triangle + Spiritual India — the perfect combo</p>
            <p className="city-cta-sub">Most international visitors combine Golden Triangle (5 days) with Varanasi or Char Dham Yatra. We plan it all.</p>
          </div>
          <div className="city-cta-btns">
            <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20Golden%20Triangle%20tour" className="btn-gold-lg" target="_blank" rel="noopener noreferrer">
              📲 WhatsApp for Custom Quote
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
