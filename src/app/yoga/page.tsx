import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import WaLink from '@/components/WaLink';
import yogaData from '../../../data/yoga-programs.json';

export const metadata: Metadata = {
  title: 'Yoga Teacher Training in India & Bali | 100hr 200hr 300hr TTC | Junegiri Yatra',
  description:
    'Yoga Alliance certified Teacher Training Courses (TTC) in Rishikesh, Bali & Goa. 100hr, 200hr & 300hr programs — multi-style Hatha, Ashtanga, Vinyasa. All-inclusive. Book with India\'s trusted travel partner.',
  keywords: [
    'yoga teacher training India',
    'yoga TTC Rishikesh',
    '200 hour yoga teacher training',
    'yoga TTC Bali',
    'yoga teacher training Goa',
    'Yoga Alliance certified TTC',
    '300 hour yoga teacher training India',
    'RYT 200 Rishikesh',
    'yoga teacher training course 2026',
  ],
  alternates: { canonical: 'https://junegiriyatra.com/yoga/' },
  openGraph: {
    title: 'Yoga Teacher Training — Rishikesh, Bali & Goa | Junegiri Yatra',
    description: 'Yoga Alliance certified 100hr, 200hr & 300hr TTC programs in the world\'s top yoga destinations.',
    url: 'https://junegiriyatra.com/yoga/',
    images: [{ url: 'https://junegiriyatra.com/images/rishikesh_bridge.webp' }],
    type: 'website',
  },
};

const LOCATION_CONFIG = [
  {
    slug: 'rishikesh',
    country: 'India',
    flag: '🇮🇳',
    icon: '🕉️',
    tagline: 'Birthplace of Yoga · Himalayas · Ganges',
    price100: '₹45,000',
    price200: '₹95,000',
    price300: '₹1,25,000',
    highlights: ['Authentic Vedic lineage', 'Ashram discipline', 'Himalayan setting', 'Most affordable'],
  },
  {
    slug: 'bali',
    country: 'Indonesia',
    flag: '🇮🇩',
    icon: '🌺',
    tagline: 'Island of the Gods · Tropical Villas · UNESCO Terraces',
    price100: '$749',
    price200: '$1,799',
    price300: '$2,499',
    highlights: ['Villa accommodation', 'Aerial & Yin yoga', 'Balinese ceremonies', 'International cohort'],
  },
  {
    slug: 'goa',
    country: 'India',
    flag: '🇮🇳',
    icon: '🏖️',
    tagline: 'Arabian Sea · Beach Shalahs · Portuguese Heritage',
    price100: '₹52,000',
    price200: '₹1,09,000',
    price300: '₹1,45,000',
    highlights: ['Beachside practice', 'Sunrise ocean sessions', 'Ayurveda focus', 'Oct–May season'],
  },
];

const WHY_US = [
  { icon: '🏆', title: 'Yoga Alliance Registered', body: 'All 200hr & 300hr programs are accredited by Yoga Alliance — RYT 200 and RYT 500 eligible certificates accepted worldwide.' },
  { icon: '🧘', title: 'Multi-Style Curriculum', body: 'We teach Hatha, Ashtanga, Vinyasa, Yin and Restorative — you graduate as a well-rounded teacher, not locked into a single style.' },
  { icon: '🌍', title: 'International Community', body: 'Students join from UK, USA, Australia, Canada, Europe and across India — diverse, inspiring cohorts of 8–15 students maximum.' },
  { icon: '🏡', title: 'All-Inclusive Packages', body: 'Accommodation, all meals, course materials, yoga kit, certification and airport transfers — everything in one transparent price.' },
  { icon: '📜', title: 'Recognised Certification', body: 'Your RYT 200 or RYT 500 certificate is recognised by studios, gyms, hospitals and wellness centres across the globe.' },
  { icon: '📞', title: 'Lifetime Support', body: 'Questions before, during or after training — our team is on WhatsApp 7 days a week to support your yoga journey.' },
];

const yogaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Yoga Teacher Training Programs — Rishikesh, Bali & Goa',
  description: 'Yoga Alliance certified 100hr, 200hr & 300hr Teacher Training Courses in Rishikesh, Bali and Goa.',
  url: 'https://junegiriyatra.com/yoga/',
  numberOfItems: 9,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Yoga TTC Rishikesh', url: 'https://junegiriyatra.com/yoga/rishikesh/' },
    { '@type': 'ListItem', position: 2, name: 'Yoga TTC Bali', url: 'https://junegiriyatra.com/yoga/bali/' },
    { '@type': 'ListItem', position: 3, name: 'Yoga TTC Goa', url: 'https://junegiriyatra.com/yoga/goa/' },
  ],
  provider: {
    '@type': 'Organization',
    name: 'Junegiri Yatra',
    url: 'https://junegiriyatra.com',
    logo: { '@type': 'ImageObject', url: 'https://junegiriyatra.com/logo.png' },
    telephone: '+919873897652',
    address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
    sameAs: ['https://www.instagram.com/junegiriyatra', 'https://www.facebook.com/junegiriyatra'],
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
    { '@type': 'ListItem', position: 2, name: 'Yoga Teacher Training', item: 'https://junegiriyatra.com/yoga/' },
  ],
};

export default function YogaHubPage() {
  return (
    <>
      <Script id="yoga-hub-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(yogaJsonLd)}
      </Script>
      <Script id="yoga-hub-breadcrumb" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    <div style={{ color: '#1a1a1a' }}>
      {/* ── HERO ── */}
      <section className="city-hero">
        <Image
          src="/images/rishikesh_bridge.webp"
          alt="Yoga Teacher Training — Rishikesh, Bali & Goa"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 56, margin: 0, lineHeight: 1 }}>🧘</p>
          <h1 className="city-hero-h1" style={{ marginTop: 12 }}>
            Yoga Teacher Training<br />Rishikesh · Bali · Goa
          </h1>
          <p className="city-hero-sub" style={{ maxWidth: 600, margin: '16px auto 32px' }}>
            Yoga Alliance certified 100hr, 200hr & 300hr programs.
            Multi-style: Hatha · Ashtanga · Vinyasa · Yin.
            All-inclusive — accommodation, meals & certification.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20Yoga%20Teacher%20Training%20programs"
              className="btn-gold-hero"
              target="_blank" rel="noopener noreferrer"
              label="yoga_hub_hero_wa"
            >
              📲 WhatsApp to Enquire
            </WaLink>
            <a href="#locations" className="btn-outline-lg" style={{ color: '#fff', borderColor: '#fff' }}>
              View Programs ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION BADGES ── */}
      <section style={{ background: '#f9f6f0', padding: '28px 0', borderBottom: '1px solid #e8e0d0' }}>
        <div className="container" style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'Yoga Alliance Registered', sub: 'RYT 200 & RYT 500 Eligible' },
            { label: '100hr · 200hr · 300hr', sub: 'All Program Levels' },
            { label: 'Multi-Style TTC', sub: 'Hatha · Ashtanga · Vinyasa · Yin' },
            { label: '3 World-Class Locations', sub: 'Rishikesh · Bali · Goa' },
          ].map((b) => (
            <div key={b.label} style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 15 }}>{b.label}</div>
              <div style={{ color: '#666', fontSize: 13 }}>{b.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOCATION CARDS ── */}
      <section id="locations" style={{ padding: '72px 0', background: '#fff', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 12, color: '#1a1a1a' }}>
            Choose Your Training Location
          </h2>
          <p style={{ textAlign: 'center', color: '#666', maxWidth: 560, margin: '0 auto 48px', fontSize: 16 }}>
            Same Yoga Alliance curriculum, three radically different experiences.
            Pick the setting that speaks to your soul.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {LOCATION_CONFIG.map((loc) => {
              const data = yogaData.find((d) => d.slug === loc.slug)!;
              return (
                <div key={loc.slug} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8e0d0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ position: 'relative', height: 200, background: '#1a1a2e', overflow: 'hidden' }}>
                    <Image
                      src={data.hero_image}
                      alt={`Yoga Teacher Training in ${data.location}`}
                      fill sizes="400px"
                      style={{ objectFit: 'cover', opacity: 0.7 }}
                    />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 20px 16px' }}>
                      <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 6 }}>{loc.icon}</div>
                      <h3 style={{ color: '#fff', margin: 0, fontSize: '1.3rem' }}>
                        {loc.flag} {loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.85)', margin: '4px 0 0', fontSize: 13 }}>{loc.tagline}</p>
                    </div>
                  </div>
                  <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12, background: '#fff' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {loc.highlights.map((h) => (
                        <span key={h} style={{ background: '#f5f0e8', borderRadius: 20, padding: '3px 10px', fontSize: 12, color: '#1a1a1a' }}>✓ {h}</span>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 4 }}>
                      {[
                        { label: '100hr', price: loc.price100 },
                        { label: '200hr', price: loc.price200 },
                        { label: '300hr', price: loc.price300 },
                      ].map((p) => (
                        <div key={p.label} style={{ background: '#f9f6f0', borderRadius: 8, padding: '8px 6px', textAlign: 'center' }}>
                          <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>{p.label}</div>
                          <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a' }}>From {p.price}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                      <Link href={`/yoga/${loc.slug}/`}
                        style={{ flex: 1, textAlign: 'center', background: '#1a1a2e', color: '#fff', padding: '11px 0', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        View Programs
                      </Link>
                      <WaLink
                        href={`https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20Yoga%20TTC%20in%20${loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}`}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#25d366', color: '#fff', padding: '11px 14px', borderRadius: 8, fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}
                        target="_blank" rel="noopener noreferrer"
                        label={`yoga_hub_${loc.slug}_wa`}
                      >
                        📲
                      </WaLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROGRAM COMPARISON TABLE ── */}
      <section style={{ padding: '72px 0', background: '#f9f6f0', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 8, color: '#1a1a1a' }}>
            Which Program Is Right for You?
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 40 }}>
            Choose by your experience level, certification goals and available time.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
              <thead>
                <tr style={{ background: '#1a1a2e', color: '#fff' }}>
                  <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 600 }}>100-Hour</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 600, background: '#c9a84c', color: '#1a1a1a' }}>200-Hour ⭐</th>
                  <th style={{ padding: '14px 18px', textAlign: 'center', fontWeight: 600 }}>300-Hour</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Certification', 'School Certificate', 'Yoga Alliance RYT 200', 'Yoga Alliance RYT 500'],
                  ['Duration', '12–15 days', '21–25 days', '27–28 days'],
                  ['For whom', 'Dedicated practitioners & beginners', 'Anyone wanting to teach yoga', 'Qualified RYT 200 teachers'],
                  ['Prerequisite', 'None', '3–6 months yoga practice', 'Yoga Alliance RYT 200 required'],
                  ['Styles taught', 'Hatha · Vinyasa · Pranayama', 'Hatha · Ashtanga · Vinyasa · Yin', 'Advanced + Yin · Restorative · Nidra'],
                  ['Can teach professionally?', 'No (school cert only)', 'Yes — worldwide', 'Yes — advanced level'],
                  ['Price from (Rishikesh)', '₹45,000 / $549', '₹95,000 / $1,149', '₹1,25,000 / $1,499'],
                  ['Price from (Bali)', '$749', '$1,799', '$2,499'],
                  ['Price from (Goa)', '₹52,000 / $625', '₹1,09,000 / $1,299', '₹1,45,000 / $1,749'],
                ].map(([feature, h100, h200, h300], i) => (
                  <tr key={feature} style={{ background: i % 2 === 0 ? '#fff' : '#f9f6f0' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 600, color: '#1a1a1a', fontSize: 14 }}>{feature}</td>
                    <td style={{ padding: '12px 18px', textAlign: 'center', fontSize: 14, color: '#555' }}>{h100}</td>
                    <td style={{ padding: '12px 18px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#1a1a1a', borderLeft: '2px solid #c9a84c', borderRight: '2px solid #c9a84c' }}>{h200}</td>
                    <td style={{ padding: '12px 18px', textAlign: 'center', fontSize: 14, color: '#555' }}>{h300}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── WHY JUNEGIRI ── */}
      <section style={{ padding: '72px 0', background: '#fff', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 48, color: '#1a1a1a' }}>
            Why Train with Junegiri Yatra?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {WHY_US.map((item) => (
              <div key={item.title} style={{ padding: '24px 22px', border: '1px solid #e8e0d0', borderRadius: 12, background: '#fff' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: '1rem', marginBottom: 8, fontWeight: 700, color: '#1a1a1a' }}>{item.title}</h3>
                <p style={{ color: '#555', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '72px 0', background: '#f9f6f0', color: '#1a1a1a' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: 40, color: '#1a1a1a' }}>
            Frequently Asked Questions
          </h2>
          {[
            { q: 'Is Yoga Alliance certification recognised worldwide?', a: 'Yes. Yoga Alliance is the globally accepted professional standard for yoga teachers. Studios, gyms, retreats, hospitals and wellness centres in the UK, USA, Australia, Canada, Europe and Asia require or prefer RYT 200 or RYT 500 certification when hiring yoga instructors.' },
            { q: 'Can I join from UK, USA, Australia or Europe?', a: 'Absolutely. Most of our students are international. For Rishikesh and Goa you\'ll need an Indian e-Visa (easy to obtain online). For Bali, most Western nationalities receive visa-on-arrival at Denpasar airport. We assist with arrival logistics, airport transfers and local orientation.' },
            { q: 'What is the difference between 200hr and 300hr?', a: 'The 200-hour program earns you the Yoga Alliance RYT 200 — the global standard for beginning yoga teachers. The 300-hour is an advanced program for existing RYT 200 holders; upon completion, you earn RYT 500 — the highest standalone Yoga Alliance credential.' },
            { q: 'Do I need to be flexible or advanced?', a: 'No. Yoga teacher training is a learning process, not a performance. Beginners and intermediate practitioners regularly complete 200hr TTC. You do not need to do splits or advanced inversions on day one. The training builds your practice systematically over the course.' },
            { q: 'How do I book and what is the deposit?', a: 'WhatsApp or email us with your preferred location, program level and batch dates. We\'ll send a booking confirmation and request a deposit of 20–30% to secure your seat. Full payment is due 30 days before the course start date.' },
            { q: 'What food is provided?', a: 'All meals are sattvic (pure) vegetarian — no meat, fish, eggs, onion or garlic. Meals are freshly cooked, nutritious and designed to support an intensive yoga practice schedule. We accommodate vegan, gluten-free and other dietary requirements with advance notice.' },
          ].map(({ q, a }) => (
            <details key={q} style={{ borderBottom: '1px solid #ddd', padding: '16px 0' }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '1rem', color: '#1a1a1a' }}>{q}</summary>
              <p style={{ margin: '12px 0 0', color: '#555', lineHeight: 1.7, fontSize: 15 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#1a1a2e', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 12 }}>
            Ready to Begin Your Teaching Journey?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 32px', fontSize: 16 }}>
            WhatsApp us with your preferred location and batch — we&apos;ll help you choose the right program and secure your spot.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20Yoga%20Teacher%20Training%20programs%20(Rishikesh%20%2F%20Bali%20%2F%20Goa)"
              className="btn-gold-hero"
              target="_blank" rel="noopener noreferrer"
              label="yoga_hub_bottom_wa"
            >
              📲 WhatsApp to Book
            </WaLink>
            <a href="tel:+919873897652" className="btn-outline-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }}>
              📞 Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
