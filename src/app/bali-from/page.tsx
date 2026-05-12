import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCities } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Bali Tour Package from Your City 2025 | 7D6N from $530 | Junegiri Yatra',
  description: 'Book Bali 7D6N party escape from any Indian city — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune & 90+ more. Scuba diving, Nusa Penida, Gili T. From $530/person.',
  keywords: 'bali tour package from india, bali trip from mumbai, bali package from bangalore, bali holiday from delhi, nusa penida gili trawangan package india',
  alternates: { canonical: 'https://junegiriyatra.com/bali-from/' },
  openGraph: {
    title: 'Bali Tour Package from Your City | Junegiri Yatra',
    description: 'All-inclusive Bali 7D6N packages with activities from 100 Indian cities. From $530/person.',
    images: [{ url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1200&q=85&auto=format&fit=crop' }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Bali Tour Package from Your City',
      description: 'Bali 7D6N party escape packages with city-specific flight info from 100 Indian departure cities.',
      url: 'https://junegiriyatra.com/bali-from/',
      provider: {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        telephone: '+6282111759727',
        address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bali Package', item: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
        { '@type': 'ListItem', position: 3, name: 'From Your City', item: 'https://junegiriyatra.com/bali-from/' },
      ],
    },
  ],
};

const REGIONS = [
  { label: 'North & NCR', states: ['Delhi', 'Delhi NCR', 'Punjab', 'Punjab/Haryana', 'Haryana', 'Chandigarh', 'Uttarakhand', 'Jammu & Kashmir', 'Himachal Pradesh', 'Ladakh'] },
  { label: 'West India', states: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Goa'] },
  { label: 'South India', states: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Puducherry'] },
  { label: 'East & Central', states: ['West Bengal', 'Bihar', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh', 'Jharkhand', 'Odisha', 'Assam', 'Tripura', 'Meghalaya', 'Manipur'] },
];

const T = {
  teal: '#0891B2', tealDark: '#0E7490', tealLight: '#ECFEFF',
  coral: '#F97316', dark: '#0F172A', text: '#1E293B',
  muted: '#64748B', border: '#E2E8F0', white: '#FFFFFF',
  bg: '#F8FAFC', bg2: '#F0FDFD',
};

export default function BaliFromIndex() {
  const cities = getAllCities();
  const grouped = REGIONS.map(r => ({ ...r, cities: cities.filter(c => r.states.includes(c.state)) }));
  const assignedSlugs = grouped.flatMap(g => g.cities.map(c => c.slug));
  const remaining = cities.filter(c => !assignedSlugs.includes(c.slug));

  return (
    <div style={{ background: T.white, color: T.text }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85&auto=format&fit=crop"
          alt="Bali rice terraces tour packages from India"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(14,116,144,0.25) 55%, rgba(0,0,0,0) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 60 }}>
          <nav style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/packages/bali-7d6n-party-escape/" style={{ color: 'inherit', textDecoration: 'none' }}>Bali Package</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>From Your City</span>
          </nav>

          {/* Tag strip */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
            {['🏝️ Bali · Nusa Penida · Gili T', '7D / 6N', '300+ cities covered'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{b}</span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>
            Bali Tour Package<br />
            <span style={{ color: '#FCD34D' }}>from Your City</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: '0 0 30px', maxWidth: 540, lineHeight: 1.6 }}>
            7 Days · 6 Nights · Scuba Diving · Nusa Penida · Gili T Nightlife · ATV Ride · Parasailing<br />
            <strong style={{ color: '#FCD34D' }}>All-inclusive from $530 / person · Min 2 Pax</strong>
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://wa.me/6282111759727?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Bali%207D6N%20package"
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}>
              📲 WhatsApp for Departure Quote
            </a>
            <Link href="/itinerary/bali-7d6n-party-escape/"
              style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.35)', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              🖨️ View Itinerary PDF
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOOK BAR ─────────────────────────────────────── */}
      <div style={{ background: T.teal, color: '#fff', padding: '14px 0' }}>
        <div className="container">
          <p style={{ margin: 0, fontSize: 14, textAlign: 'center' }}>
            🏝️ Every city has different flight routes, fares &amp; layovers to Bali — pick yours for a city-specific guide &amp; WhatsApp quote
          </p>
        </div>
      </div>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <section style={{ background: T.bg2, padding: '32px 0', borderBottom: `1px solid ${T.border}` }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {[
              { icon: '🏝️', label: 'Destinations', value: '3 Islands' },
              { icon: '🤿', label: 'Activities', value: 'Scuba · ATV · Parasailing' },
              { icon: '💰', label: 'Starting From', value: '$530 / person' },
              { icon: '🗓️', label: 'Duration', value: '7 Days 6 Nights' },
              { icon: '👥', label: 'Group Size', value: 'Min 2 Pax' },
              { icon: '✈️', label: 'Cities Covered', value: `${cities.length}+` },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: T.teal, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.dark }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY GRID ────────────────────────────────────── */}
      <section style={{ background: T.white, padding: '56px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              Choose Your <span style={{ color: T.teal }}>Departure City</span>
            </h2>
            <p style={{ color: T.muted, margin: 0, fontSize: 15 }}>
              {cities.length} cities covered. Click your city for flight routes, fares &amp; a personalised WhatsApp quote.
            </p>
          </div>

          {[...grouped, ...(remaining.length > 0 ? [{ label: 'Other Cities', cities: remaining }] : [])].map(group =>
            group.cities.length > 0 ? (
              <div key={group.label} style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.teal, margin: '0 0 14px', paddingBottom: 8, borderBottom: `2px solid ${T.tealLight}` }}>
                  {group.label}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                  {group.cities.map(city => (
                    <Link key={city.slug} href={`/bali-from/${city.slug}/`}
                      style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', textDecoration: 'none', display: 'block', transition: 'all .18s' }}
                      className="bali-city-card">
                      <div style={{ fontWeight: 700, color: T.dark, fontSize: 14, marginBottom: 3 }}>{city.name}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginBottom: 6 }}>{city.state}</div>
                      <div style={{ fontSize: 11, color: T.teal, fontWeight: 600 }}>✈️ Fly via SIN / KUL</div>
                      <div style={{ fontSize: 11, color: T.coral, fontWeight: 600, marginTop: 4 }}>View flights →</div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────── */}
      <section style={{ background: T.bg, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              What Every Package <span style={{ color: T.teal }}>Includes</span>
            </h2>
            <p style={{ color: T.muted, margin: 0 }}>Same activities regardless of your departure city</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16, maxWidth: 960, margin: '0 auto' }}>
            {[
              { icon: '🏨', title: '6 Nights Accommodation + Breakfast', desc: 'Akmani Legian (2N) · Mad Monkey Hostel Gili T (2N) · Evitel Ubud or Pool Villa (2N)' },
              { icon: '🤿', title: 'Scuba Diving — Gili Trawangan', desc: 'Certified open-water dive for 2 pax at Gili T — one of SE Asia\'s best dive spots' },
              { icon: '🏍️', title: 'ATV Ride in Bali', desc: 'Through rice paddies and jungle terrain — thrilling 2-person ATV adventure included' },
              { icon: '🏝️', title: 'Nusa Penida West Tour', desc: 'Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay — all by speed boat' },
              { icon: '🪂', title: 'Parasailing Experience', desc: 'Pandawa or Melasti beach — soar above the Indian Ocean with the Bali coast below' },
              { icon: '🚤', title: 'All Inter-Island Speed Boats', desc: 'Bali → Nusa Penida → Gili Trawangan → Bali + private AC vehicle throughout' },
            ].map(item => (
              <div key={item.title} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 14, padding: '22px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 30, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: T.dark, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section style={{ background: T.white, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              How <span style={{ color: T.teal }}>Booking Works</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 960, margin: '0 auto' }}>
            {[
              { step: '01', icon: '🌍', title: 'Pick Your City', desc: 'Click your departure city to see flight routes, fares, and a personalised Bali itinerary.' },
              { step: '02', icon: '💬', title: 'WhatsApp Us', desc: 'Each city page has a pre-filled WhatsApp link. Our team responds within 30–60 minutes.' },
              { step: '03', icon: '📅', title: 'Lock Your Dates', desc: 'Confirm travel dates, group size (min 2), and hotel option — standard or pool villa.' },
              { step: '04', icon: '✈️', title: 'Book & Fly', desc: 'Pay advance to confirm. We handle all hotels, boats, ATV, scuba & activities.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: T.tealLight, border: `2px solid ${T.teal}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Step {s.step}</div>
                  <div style={{ fontWeight: 700, color: T.dark, fontSize: 15, marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${T.tealDark} 0%, #164E63 50%, #1E3A5F 100%)`, padding: '60px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, margin: '0 0 8px' }}>Ready to plan your Bali escape?</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: 14, maxWidth: 420 }}>
              WhatsApp for custom dates, group pricing &amp; combined flight + package quotes from your city.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://wa.me/6282111759727?text=Namaste!%20I%20want%20to%20enquire%20about%20the%20Bali%207D6N%20package"
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              📲 WhatsApp Us Now
            </a>
            <a href="tel:+6282111759727"
              style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.35)', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              📞 +62 821-1175-9727
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .bali-city-card:hover {
          background: ${T.tealLight} !important;
          border-color: ${T.teal} !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(8,145,178,0.12);
        }
      `}</style>
    </div>
  );
}
