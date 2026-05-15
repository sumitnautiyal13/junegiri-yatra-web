import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Spiti Valley Travel Guide 2026 | Trek, Monastery & Adventure Tours | Junegiri Yatra',
  description: 'Complete Spiti Valley travel guide — Hamta Pass crossover, Chandrataal, Pin Parvati Pass, Key Monastery, Chandratal. Packages from Manali. Expert-guided tours from ₹11,500.',
  alternates: { canonical: 'https://junegiriyatra.com/spiti-valley/' },
  openGraph: {
    title: 'Spiti Valley Travel Guide 2026 | Junegiri Yatra',
    description: 'Cold desert moonscape at 3,800m+. Hamta Pass, Chandrataal, Key Monastery, Kaza. Expert-guided packages from ₹11,500.',
    images: [{ url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1400&q=80' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Spiti Valley Travel Guide — Treks, Monasteries & Adventure Tours',
      description: 'Complete Spiti Valley travel guide covering Hamta Pass trek, Chandrataal, Key Monastery, Kaza town, Pin Valley and more. Packages from Manali by Junegiri Yatra.',
      url: 'https://junegiriyatra.com/spiti-valley/',
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
        { '@type': 'ListItem', position: 2, name: 'Spiti Valley', item: 'https://junegiriyatra.com/spiti-valley/' },
      ],
    },
  ],
};

const KEY_FACTS = [
  { label: 'Altitude', value: '3,800–4,500m avg' },
  { label: 'Season', value: 'Jun–Oct' },
  { label: 'Temperature', value: '−5 to 25°C' },
  { label: 'Base', value: 'Manali or Shimla' },
];

const HIGHLIGHTS = [
  {
    icon: '🏔️',
    title: 'Chandrataal (Moon Lake)',
    desc: 'Sapphire-blue glacial lake at 4,300m. Camping on its banks under a star-filled sky is one of Spiti\'s most unforgettable experiences.',
  },
  {
    icon: '🕌',
    title: 'Key Monastery',
    desc: 'A 1,000-year-old Tibetan Buddhist monastery perched at 4,166m on a dramatic cliff — the spiritual heart of Spiti Valley.',
  },
  {
    icon: '🌄',
    title: 'Kaza Town',
    desc: 'Spiti\'s main commercial town and traveller hub. Gateway to Pin Valley, Kibber, and the Pin–Bhaba pass trek routes.',
  },
  {
    icon: '🦅',
    title: 'Kibber Village',
    desc: 'One of the world\'s highest motorable villages at 4,270m. Snow leopard territory with panoramic views of the Spiti River gorge.',
  },
  {
    icon: '🌊',
    title: 'Pin River Valley',
    desc: 'A pristine side valley with the spectacular Dhankar Monastery perched vertiginously on a cliff above the confluence of Spiti and Pin rivers.',
  },
  {
    icon: '🏕️',
    title: 'Langza & Komic',
    desc: 'Fossil villages at 4,400m+ with ancient Buddha statues standing sentinel over fields where marine fossils surface from the earth.',
  },
];

const BEST_TIME = [
  { month: 'Jun', crowd: 'Low', sky: '⛅', note: 'Road opens via Rohtang/Atal Tunnel. Cooler temps, occasional snow.' },
  { month: 'Jul', crowd: 'High', sky: '☀️', note: 'Peak summer — warm days, green valleys, all guesthouses open.' },
  { month: 'Aug', crowd: 'High', sky: '☀️', note: 'Peak season. Best for Chandrataal and monastery festivals.' },
  { month: 'Sep', crowd: 'Medium', sky: '🌤️', note: 'Best month — crystal clear skies, fewer crowds, pleasant days.' },
  { month: 'Oct', crowd: 'Low', sky: '🌥️', note: 'Closing window. Cold nights, early snow. Roads may shut after mid-Oct.' },
  { month: 'Nov–May', crowd: '—', sky: '❄️', note: 'Road closed via Manali. Accessible only via Shimla–Kinnaur if at all.' },
];

export default function SpitiValleyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '70vh' }}>
        <Image
          src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1400&q=80"
          alt="Spiti Valley — barren Himalayan cold desert moonscape"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <span>Spiti Valley</span>
          </nav>
          <h1 className="city-hero-h1">
            Spiti Valley<br />
            <span className="city-name-gold">Cold Desert Moonscape of Himachal Pradesh</span>
          </h1>
          <p className="city-hero-sub">
            A high-altitude cold desert at 3,800m+ where barren lunar landscapes meet ancient Buddhist monasteries.
            Chandrataal, Key Monastery, Hamta Pass crossover — the Himalayas at their most raw and spectacular.<br />
            <strong>Expert-guided tours · Packages from ₹11,500 · Base: Manali or Shimla</strong>
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20a%20Spiti%20Valley%20trip"
              className="btn-gold-hero"
              target="_blank" rel="noopener noreferrer"
            >
              📲 WhatsApp for Spiti Quote
            </a>
            <a href="#packages" className="btn-outline-lg" style={{ alignSelf: 'center' }}>
              Explore Packages ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── KEY FACTS STRIP ──────────────────────────────── */}
      <section style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {KEY_FACTS.map((f) => (
              <div key={f.label} style={{ padding: '28px 16px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold2)', fontFamily: 'var(--font-poppins)' }}>{f.value}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REACH ─────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            How to <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Reach Spiti Valley</em>
          </h2>
          <p className="section-sub-left">
            Two routes connect the outside world to this remote high-altitude valley — each with its own character and seasonal constraints.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 28 }}>
            {/* Route 1 */}
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚗</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Via Manali</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Rohtang / Atal Tunnel Route</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Distance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold2)' }}>~200 km</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Duration</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold2)' }}>8–10 hrs</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Season</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>Jun–Oct</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                The classic summer route. Manali → Atal Tunnel (bypasses Rohtang) → Gramphoo → Losar → Kaza. Shorter and more scenic, but closed by November snowfall. Ideal for first-time visitors.
              </p>
            </div>

            {/* Route 2 */}
            <div style={{ background: 'var(--card)', border: '1px solid rgba(91,155,213,0.2)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(91,155,213,0.12)', border: '1px solid rgba(91,155,213,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🛣️</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Via Shimla</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Kinnaur Valley Route</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Distance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#5B9BD5' }}>~415 km</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Duration</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#5B9BD5' }}>15–18 hrs</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Season</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>All-season*</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                Shimla → Narkanda → Reckong Peo (Kinnaur) → Nako → Tabo → Kaza. Longer but largely all-season. Passes through dramatic Kinnaur gorges and the ancient Tabo Monastery en route.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ─────────────────────────────────────── */}
      <section id="packages" className="city-section" style={{ background: 'var(--card)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,168,76,0.12)', padding: '4px 12px', borderRadius: 20 }}>Junegiri Yatra Packages</span>
          </div>
          <h2 className="section-title-left">
            Trek Packages <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>into Spiti</em>
          </h2>
          <p className="section-sub-left">
            Fully packaged expeditions with expert guides, all camping gear, and transport from Manali. WhatsApp us for group rates and custom dates.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 28 }}>
            {/* Hamta Pass Card */}
            <Link href="/packages/hamta-pass-trek-4n-5d/" className="trek-card-hover" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="trek-card-inner">
                <div style={{ position: 'relative', height: 200 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=600&q=80"
                    alt="Hamta Pass Trek — crossing from Kullu to Spiti"
                    fill sizes="400px"
                    style={{ objectFit: 'cover' }}
                  />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: '#C9923D', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bestseller</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: '#E8AA50', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>Moderate</span>
                </div>
                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Hamta Pass Trek</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14, flexGrow: 1 }}>
                    Cross from the lush green Kullu Valley to the barren lunar landscapes of Spiti in one dramatic high-altitude pass. Chandrataal Moon Lake included.
                  </p>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>🕐 4N / 5D</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>⛰️ 4,270m / 14,009 ft</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>📅 Jun–Sep</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>From</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold2)' }}>₹11,500<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>/person</span></div>
                    </div>
                    <span style={{ background: 'var(--gold)', color: '#07051A', fontSize: 12, fontWeight: 700, padding: '10px 18px', borderRadius: 8 }}>View Trek →</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Pin Parvati Placeholder */}
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20Pin%20Parvati%20Pass%20Trek%20in%20Spiti%20Valley"
              target="_blank" rel="noopener noreferrer"
              className="trek-card-hover"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div className="trek-card-inner">
                <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, #1a1040 0%, #0d0824 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Coming Soon</div>
                  </div>
                  <span style={{ position: 'absolute', top: 12, left: 12, background: '#5B9BD5', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Enquire Now</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: '#E05C00', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>Difficult</span>
                </div>
                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Pin Parvati Pass Trek</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14, flexGrow: 1 }}>
                    One of the most challenging and remote treks in India — crossing from Kullu&apos;s Parvati Valley into the austere landscape of Pin Valley, Spiti. A true wilderness crossing.
                  </p>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>🕐 10–11 days</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>⛰️ 5,319m / 17,457 ft</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>📅 Jul–Sep</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic' }}>Full package details coming soon</div>
                    </div>
                    <span style={{ background: '#25D366', color: '#fff', fontSize: 12, fontWeight: 700, padding: '10px 18px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>💬 WhatsApp →</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── SPITI HIGHLIGHTS ─────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Spiti Valley <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Highlights</em>
          </h2>
          <p className="section-sub-left">
            Six must-visit places that define the Spiti experience — from glacial lakes to cliff-hanging monasteries and fossil villages.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginTop: 28 }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 22px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{h.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{h.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST TIME TABLE ──────────────────────────────── */}
      <section className="city-section" style={{ background: 'var(--card)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <h2 className="section-title-left">
            Best Time to <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Visit Spiti</em>
          </h2>
          <p className="section-sub-left">
            The Spiti window is narrow — roads open in June and close by October. September is the sweet spot.
          </p>

          <div style={{ marginTop: 28, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Month</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Crowd</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sky</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {BEST_TIME.map((row, i) => (
                  <tr key={row.month} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: row.month === 'Sep' ? 'var(--gold2)' : '#fff', fontSize: 14 }}>{row.month}{row.month === 'Sep' ? ' ⭐' : ''}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--muted)' }}>{row.crowd}</td>
                    <td style={{ padding: '14px 16px', fontSize: 18 }}>{row.sky}</td>
                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 20, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, margin: 0 }}>
              <strong style={{ color: 'var(--gold2)' }}>Pro Tip:</strong> September is widely considered the best month for Spiti — skies are crystal clear after the brief monsoon influence, temperatures are comfortable, guesthouses are less crowded, and Chandrataal is at its most photogenic.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA BANNER ───────────────────────────── */}
      <section style={{ background: '#07051A', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>🏔️</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 10, fontFamily: 'var(--font-poppins)' }}>
            Planning a Spiti Valley Trip?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            Get a custom itinerary, group rates, and expert guidance on the best route, season, and acclimatisation schedule for your Spiti adventure.
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20a%20Spiti%20Valley%20trip"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              fontSize: 16, fontWeight: 700, padding: '16px 32px',
              borderRadius: 10, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
          >
            <span style={{ fontSize: 20 }}>💬</span>
            WhatsApp Us for Spiti Valley
          </a>
          <div style={{ marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Responds within 60 minutes · Available 8 AM–10 PM IST
          </div>
        </div>
      </section>
    </>
  );
}
