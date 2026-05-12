import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'India Tour Packages from Your City 2026 | Junegiri Yatra',
  description: 'Book India tour packages from any city worldwide — USA, UK, Australia, Canada, Europe, Middle East and 200+ cities. Char Dham, Kedarnath, Golden Triangle, Rishikesh. All-inclusive from ₹8,500. WhatsApp for a custom itinerary.',
  keywords: 'india tour packages from usa, india tour from london, india holiday packages from australia, india travel packages from canada, char dham yatra from abroad, kedarnath tour from overseas',
  alternates: { canonical: 'https://junegiriyatra.com/india-tour-from/' },
  openGraph: {
    title: 'India Tour Packages from Your City | Junegiri Yatra',
    description: 'Spiritual, adventure & heritage India tours from 340+ cities worldwide. Char Dham, Kedarnath, Golden Triangle, Rishikesh.',
    images: [{ url: 'https://junegiriyatra.com/images/char_dham_yatra.webp' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'India Tour Packages from Your City',
      description: 'India tour packages for international travellers — Char Dham Yatra, Kedarnath, Golden Triangle, Rishikesh adventure, Varanasi pilgrimage and more. Departure from 340+ cities worldwide.',
      url: 'https://junegiriyatra.com/india-tour-from/',
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
        { '@type': 'ListItem', position: 2, name: 'India Tour Packages', item: 'https://junegiriyatra.com/india-tour-from/' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I travel from abroad to Haridwar for Char Dham Yatra?',
          acceptedAnswer: { '@type': 'Answer', text: 'Fly to Delhi Indira Gandhi International Airport (DEL) — the closest international hub. From Delhi, Haridwar is 220 km (5 hrs by road or 4.5 hrs on the Shatabdi express). Jolly Grant Airport (Dehradun) has limited international connections and is 50 km from Haridwar. We arrange airport pickup and private vehicle transfers.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best time to visit India for a spiritual or Himalayan tour?',
          acceptedAnswer: { '@type': 'Answer', text: 'May–June for Char Dham Yatra (temples open in April/May). September–October for clear Himalayan views and trekking. November–February for Golden Triangle (Delhi–Agra–Jaipur) and Varanasi. Avoid July–August for Himalayan treks (monsoon and landslide risk).' }
        },
        {
          '@type': 'Question',
          name: 'Do I need a visa to travel to India?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most nationalities can apply for an Indian e-Visa at indianvisaonline.gov.in — approval in 3–5 business days. Tourist e-Visa valid for 30 days (single entry) or up to 1 year (multiple entry). Citizens of Pakistan, Bangladesh (some cases), and a few others must apply at the Embassy. We advise you check your specific nationality requirements before booking.' }
        },
      ]
    }
  ],
};

const INDIA_PACKAGES = [
  { icon: '🕉️', title: 'Char Dham Yatra', desc: 'Yamunotri · Gangotri · Kedarnath · Badrinath', price: '₹28,000', duration: '10–12 Days', href: '/char-dham-from/' },
  { icon: '⛰️', title: 'Kedarnath Yatra', desc: '12 Jyotirlinga · 3,584 m · Trek or Helicopter', price: '₹8,500', duration: '3–4 Days', href: '/kedarnath-from/' },
  { icon: '🚁', title: 'Kedarnath Helicopter', desc: 'Skip the trek · Fly from Phata helipad', price: '₹14,500', duration: '2–3 Days', href: '/kedarnath-helicopter-from/' },
  { icon: '🏛️', title: 'Golden Triangle', desc: 'Delhi · Agra · Jaipur — India\'s iconic circuit', price: '₹18,000', duration: '5–7 Days', href: '/golden-triangle-from/' },
  { icon: '🌸', title: 'Do Dham Yatra', desc: 'Kedarnath + Badrinath — twin Dham circuit', price: '₹14,500', duration: '5–6 Days', href: '/do-dham-from/' },
  { icon: '🌊', title: 'Rishikesh Adventure', desc: 'Rafting · Bungee · Yoga · Camping', price: '₹3,500', duration: '2–3 Days', href: '/rishikesh-from/' },
  { icon: '🌺', title: 'Valley of Flowers', desc: 'UNESCO site · 500 Himalayan species', price: '₹12,000', duration: '5–6 Days', href: '/valley-of-flowers-from/' },
  { icon: '🏰', title: 'Varanasi Pilgrimage', desc: 'Kashi Vishwanath · Ganga Aarti · Sarnath', price: '₹6,500', duration: '2–3 Days', href: '/varanasi-from/' },
  { icon: '🙏', title: 'Mathura Vrindavan', desc: 'Birthplace of Krishna · Holi festival capital', price: '₹4,500', duration: '1–2 Days', href: '/mathura-vrindavan-from/' },
  { icon: '🕌', title: 'Ayodhya Tour', desc: 'Ram Lalla temple · Sarayu Aarti · Ram Path', price: '₹5,500', duration: '1–2 Days', href: '/ayodhya-from/' },
];

const INTL_REGIONS = [
  { label: '🇺🇸 United States', countries: ['USA'] },
  { label: '🇬🇧 United Kingdom', countries: ['United Kingdom'] },
  { label: '🇦🇺 Australia & New Zealand', countries: ['Australia', 'New Zealand'] },
  { label: '🇨🇦 Canada', countries: ['Canada'] },
  { label: '🌍 Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Jordan', 'Lebanon', 'Israel', 'Oman'] },
  { label: '🌏 Southeast Asia', countries: ['Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Indonesia', 'Vietnam', 'Cambodia', 'Laos', 'Myanmar'] },
  { label: '🌏 East Asia', countries: ['Japan', 'South Korea', 'China', 'Taiwan', 'Hong Kong'] },
  { label: '🇪🇺 Western Europe', countries: ['Germany', 'France', 'Netherlands', 'Switzerland', 'Austria', 'Belgium', 'Portugal', 'Spain', 'Italy'] },
  { label: '🌍 Nordic Europe', countries: ['Sweden', 'Norway', 'Finland', 'Denmark'] },
  { label: '🌍 Eastern Europe', countries: ['Poland', 'Czech Republic', 'Greece', 'Romania', 'Bulgaria', 'Ukraine'] },
  { label: '🌍 Africa', countries: ['South Africa', 'Kenya', 'Nigeria', 'Ghana', 'Morocco', 'Ethiopia', 'Tanzania', 'Tunisia', 'Zambia', 'Zimbabwe'] },
  { label: '🌎 Latin America', countries: ['Brazil', 'Mexico', 'Argentina', 'Colombia', 'Peru', 'Chile', 'Uruguay'] },
  { label: '🌏 South Asia', countries: ['Sri Lanka', 'Bhutan', 'Maldives', 'Bangladesh', 'Nepal'] },
  { label: '🌏 Central Asia & Caucasus', countries: ['UAE', 'Azerbaijan', 'Armenia', 'Georgia', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan'] },
];

const INDIA_REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Delhi NCR', 'Punjab', 'Punjab/Haryana', 'Haryana', 'Chandigarh', 'Uttarakhand', 'Jammu & Kashmir', 'Himachal Pradesh', 'Ladakh'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Puducherry'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh', 'Jharkhand', 'Odisha', 'Assam', 'Tripura', 'Meghalaya', 'Manipur'] },
];

export default function IndiaTourFromIndex() {
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
        <Image src="/images/char_dham_yatra.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>India Tour Packages</span>
          </nav>
          <h1 className="city-hero-h1">
            India Tour Packages<br />
            <span className="city-name-gold">from Your City</span>
          </h1>
          <p className="city-hero-sub">
            Spiritual journeys · Himalayan adventures · Heritage circuits.
            All-inclusive India packages from{' '}
            <strong>340+ cities worldwide</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20an%20India%20tour%20package.%20Please%20share%20options."
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for Custom Itinerary
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="city-hook">
        <div className="container">
          <p className="city-hook-text">
            🇮🇳 Junegiri Yatra is a Haridwar-based operator specialising in Uttarakhand pilgrimages, Himalayan treks, and North India tours.
            We handle everything from Delhi airport pickup to Char Dham permits, helicopter slots, and Himalayan lodges.
            Click your city below for flight routes, travel time, and a pre-filled WhatsApp quote.
          </p>
        </div>
      </section>

      {/* PACKAGE GRID */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Popular India Tour Packages</h2>
          <p className="section-sub-left light">All packages depart from Haridwar. We arrange pickup from Delhi airport or railway station.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
            {INDIA_PACKAGES.map((pkg) => (
              <Link key={pkg.href} href={pkg.href} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{pkg.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.95rem' }}>{pkg.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>{pkg.desc}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 4 }}>
                  From <strong style={{ color: 'var(--gold)' }}>{pkg.price}</strong> · {pkg.duration}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: 6 }}>View city packages →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL CITIES */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">International Departure Cities</h2>
          <p className="section-sub-left">
            {intlCities.length} international cities covered. Click your city for India travel time, visa info, and a WhatsApp quote.
          </p>
          {[...intlGrouped, ...(remainingIntl.length > 0 ? [{ label: 'Other International Cities', cities: remainingIntl }] : [])].map(
            (group) => group.cities.length > 0 ? (
              <div key={group.label} className="cdf-region">
                <h3 className="cdf-region-title">{group.label}</h3>
                <div className="cdf-city-grid">
                  {group.cities.map((c) => (
                    <Link key={c.slug} href={`/india-tour-from/${c.slug}/`} className="cdf-city-card">
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
      <section className="city-section city-section-alt">
        <div className="container">
          <h2 className="section-title-left">Indian Departure Cities</h2>
          <p className="section-sub-left">
            Travelling from within India? {indianCities.length} cities covered with train, flight, and drive options.
          </p>
          {[...indiaGrouped, ...(remainingIndia.length > 0 ? [{ label: 'Other Cities', cities: remainingIndia }] : [])].map(
            (group) => group.cities.length > 0 ? (
              <div key={group.label} className="cdf-region">
                <h3 className="cdf-region-title">{group.label}</h3>
                <div className="cdf-city-grid">
                  {group.cities.map((c) => (
                    <Link key={c.slug} href={`/india-tour-from/${c.slug}/`} className="cdf-city-card">
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

      {/* BOTTOM CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Plan your India journey with a local expert</p>
            <p className="city-cta-sub">
              We handle flights coordination, Delhi pickup, permits, and on-ground logistics. WhatsApp us for a free itinerary.
            </p>
          </div>
          <div className="city-cta-btns">
            <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20an%20India%20tour" className="btn-gold-lg" target="_blank" rel="noopener noreferrer">
              📲 WhatsApp for Free Itinerary
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
