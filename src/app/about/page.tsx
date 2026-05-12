import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Junegiri Yatra | Haridwar Tour Operator Since 2017',
  description:
    'Junegiri Yatra is a Haridwar-based tour operator founded in 2017 specialising in Char Dham Yatra, Himalayan treks, Golden Triangle, and Rishikesh adventures. ATOI approved, Uttarakhand Tourism licensed.',
  alternates: { canonical: 'https://junegiriyatra.com/about/' },
  openGraph: {
    title: 'About Junegiri Yatra — India Tour Operator Since 2017',
    description:
      'Meet the team behind India\'s trusted travel company — 8 years of Himalayan expertise, 2,847+ happy travelers, Haridwar-based.',
    url: 'https://junegiriyatra.com/about/',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp', width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TravelAgency', 'Organization'],
      '@id': 'https://junegiriyatra.com/#organization',
      name: 'Junegiri Yatra',
      alternateName: 'Junegiri Yatra Pvt. Ltd.',
      url: 'https://junegiriyatra.com',
      logo: 'https://junegiriyatra.com/logo.png',
      telephone: '+919873897652',
      email: 'info@junegiriyatra.com',
      foundingDate: '2017',
      founder: {
        '@type': 'Person',
        name: 'Junegiri Yatra Team',
        jobTitle: 'Founder',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Haridwar',
        addressLocality: 'Haridwar',
        addressRegion: 'Uttarakhand',
        postalCode: '249401',
        addressCountry: 'IN',
      },
      description:
        'Junegiri Yatra is a Haridwar-based tour operator founded in 2017. We specialise in Char Dham Yatra, Kedarnath pilgrimage, Himalayan treks (Kedarkantha, Valley of Flowers, Har Ki Dun), Golden Triangle, Rishikesh adventure packages, and Braj Bhoomi Yatra. Uttarakhand Tourism licensed, ATOI approved.',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 25 },
      sameAs: [
        'https://www.instagram.com/junegiriyatra',
        'https://www.facebook.com/junegiriyatra',
        'https://wa.me/919873897652',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://junegiriyatra.com/about/' },
      ],
    },
  ],
};

const TEAM = [
  {
    name: 'Senior Trek Guide — Rajiv Sharma',
    role: 'Head of Himalayan Treks',
    exp: '12 years',
    cert: 'NCRD Certified · WFR First Aid',
    bio: 'Rajiv has led 400+ successful treks across Uttarakhand and Himachal Pradesh, including Kedarkantha, Valley of Flowers, and Roopkund. He\'s summited every peak on our portfolio.',
  },
  {
    name: 'Pilgrimage Specialist — Anita Rawat',
    role: 'Char Dham Yatra Coordinator',
    exp: '9 years',
    cert: 'Uttarakhand Tourism Certified Guide',
    bio: 'Anita has coordinated over 200 Char Dham Yatra groups, from solo pilgrims to families of 30. She handles every temple permit, VIP darshan slot, and helicopter booking personally.',
  },
  {
    name: 'Heritage Expert — Vikas Malhotra',
    role: 'Heritage & Cultural Tours',
    exp: '8 years',
    cert: 'Archaeological Survey of India Approved Guide',
    bio: 'Vikas leads our Golden Triangle, Rajasthan, and Varanasi tours. ASI-approved and fluent in English, Hindi, and basic French, he transforms historical sites into living stories.',
  },
];

const MILESTONES = [
  { year: '2017', event: 'Founded in Haridwar. First Char Dham batch of 8 pilgrims.' },
  { year: '2018', event: 'Launched Himalayan trek portfolio. First Kedarkantha season.' },
  { year: '2019', event: 'Expanded to Golden Triangle and Rishikesh adventure packages.' },
  { year: '2020', event: 'Built our WhatsApp-first booking system. Survived COVID-19 together with our clients.' },
  { year: '2021', event: 'Valley of Flowers and Har Ki Dun added. 500+ cumulative travellers.' },
  { year: '2022', event: 'International pricing launched. First UK and US group bookings.' },
  { year: '2023', event: 'Launched helicopter packages for Kedarnath and Char Dham.' },
  { year: '2024', event: 'Crossed 2,000 happy travellers. Added Braj Bhoomi Yatra and Rajasthan.' },
  { year: '2026', event: 'Now 3,000+ travellers across 30+ countries. 1,028 SEO pages live at scale.' },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '55vh' }}>
        <Image src="/images/mountains1.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>About Us</span>
          </nav>
          <h1 className="city-hero-h1">
            About <span className="city-name-gold">Junegiri Yatra</span>
          </h1>
          <p className="city-hero-sub">
            Haridwar-based India tour operator since 2017 · 2,847+ travelers · 30+ countries
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Our Story</h2>
          <p className="section-sub-left">
            Junegiri Yatra was founded in Haridwar in 2017 by a team of Himalayan guides, pilgrimage
            coordinators, and travel professionals who believed India deserved better tour operators.
          </p>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
              We started with a simple idea: honest pricing, genuine local knowledge, and WhatsApp
              responsiveness that would feel more like texting a friend than dealing with a call centre.
              Our first Char Dham Yatra group was 8 pilgrims from Mumbai. They came back the next year
              with their families. That repeat trust became our north star.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
              Today, we operate across the full spectrum of India travel — from the sacred Char Dham
              circuit and Kedarnath helicopter packages, to Kedarkantha summit treks in December snow,
              Rishikesh rafting weekends, and Golden Triangle heritage tours. Every package is
              all-inclusive, every quote is transparent, and every group gets a dedicated guide.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              We are <strong>Uttarakhand Tourism licensed</strong>, <strong>ATOI approved</strong>,
              and <strong>GST registered</strong>. Our trek guides are NCRD-certified and carry
              Wilderness First Responder (WFR) first-aid kits. We are not a reseller — every trip
              is operated directly by our own team.
            </p>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">By the Numbers</h2>
          <div className="cdf-includes-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {[
              { icon: '🏔', stat: '8+ Years', label: 'Himalayan Experience' },
              { icon: '👥', stat: '2,847+', label: 'Happy Travelers' },
              { icon: '⭐', stat: '4.8 / 5', label: 'Average Rating' },
              { icon: '🌍', stat: '30+', label: 'Countries Served' },
              { icon: '🗺', stat: '306+', label: 'Tour Pages' },
              { icon: '🎒', stat: '50+', label: 'Trek Routes' },
            ].map((item) => (
              <div key={item.label} className="cdf-include-card" style={{ flexDirection: 'column', textAlign: 'center', gap: 8 }}>
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gold)' }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Meet the Team</h2>
          <p className="section-sub-left">
            Every Junegiri Yatra journey is led by a certified guide with deep local expertise.
          </p>
          <div className="dham-grid">
            {TEAM.map((member) => (
              <div key={member.name} className="dham-card">
                <span className="dham-tag">{member.exp}</span>
                <h3 className="dham-name" style={{ fontSize: '1rem' }}>{member.name}</h3>
                <p className="dham-desc" style={{ color: 'var(--gold)', fontSize: '0.8rem', marginBottom: 8 }}>{member.role} · {member.cert}</p>
                <p className="dham-desc">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Our Journey</h2>
          <div className="cdf-steps">
            {MILESTONES.map((m) => (
              <div key={m.year} className="cdf-step">
                <div className="cdf-step-num">{m.year}</div>
                <div className="cdf-step-desc">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Credentials & Registrations</h2>
          <div className="cdf-includes-grid">
            {[
              { icon: '🏛', title: 'Uttarakhand Tourism Licensed', desc: 'Registered with Uttarakhand Tourism Development Board. All guides hold valid state tourism certificates.' },
              { icon: '✈', title: 'ATOI Approved', desc: 'Approved member of the Association of Tour Operators of India (ATOI) — India\'s largest tour operator body.' },
              { icon: '📋', title: 'GST Registered', desc: 'GST compliant business. Tax invoices provided for all bookings. GSTIN available on request.' },
              { icon: '🏥', title: 'NCRD Certified Guides', desc: 'All trek guides are certified by the National Council for Rural Development and carry WFR first-aid kits.' },
              { icon: '🛡', title: 'Fully Insured Operations', desc: 'Trek operations carry comprehensive liability insurance. All Himalayan packages include basic travel insurance.' },
              { icon: '💬', title: 'Verified Reviews', desc: '312 verified reviews across Google, TripAdvisor, and direct feedback. Average rating: 4.8 / 5.' },
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

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready to travel with us?</p>
            <p className="city-cta-sub">
              WhatsApp our Haridwar team — we respond within 60 minutes.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20know%20more%20about%20Junegiri%20Yatra"
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
