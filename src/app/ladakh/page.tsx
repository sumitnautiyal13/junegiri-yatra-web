import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ladakh Travel Guide 2026 | Pangong Lake · Nubra Valley · Leh | Junegiri Yatra',
  description: 'Complete Ladakh travel guide — Pangong Tso, Nubra Valley, Khardung La, Leh Palace, Diskit Monastery. Expert-guided tours from Leh. Plan your Ladakh trip with Junegiri Yatra.',
  alternates: { canonical: 'https://junegiriyatra.com/ladakh/' },
  openGraph: {
    title: 'Ladakh Travel Guide 2026 | Pangong Lake · Nubra Valley · Leh | Junegiri Yatra',
    description: 'Land of high passes — Pangong Tso, Nubra Valley Bactrian camels, Magnetic Hill, Khardung La. Expert-guided Ladakh tours from Leh city.',
    images: [{ url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80&auto=format&fit=crop' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Ladakh Travel Guide — Pangong Lake, Nubra Valley & Leh Tours',
      description: 'Complete Ladakh travel guide covering Pangong Tso, Nubra Valley, Khardung La, Leh Palace, Diskit Monastery, and Magnetic Hill. Expert-guided tours by Junegiri Yatra.',
      url: 'https://junegiriyatra.com/ladakh/',
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
        { '@type': 'ListItem', position: 2, name: 'Ladakh', item: 'https://junegiriyatra.com/ladakh/' },
      ],
    },
  ],
};

const KEY_FACTS = [
  { label: 'Altitude', value: '3,500m avg' },
  { label: 'Season', value: 'Jun–Sep' },
  { label: 'Temperature', value: '−5 to 25°C' },
  { label: 'Base', value: 'Leh city' },
];

const HIGHLIGHTS = [
  {
    icon: '🏞️',
    title: 'Pangong Tso Lake',
    desc: 'The iconic 134km-long high-altitude lake straddling India and China at 4,350m. Its waters shift from sapphire blue to turquoise to silver depending on the time of day — one of the most photographed landscapes in Asia.',
  },
  {
    icon: '🐪',
    title: 'Nubra Valley & Bactrian Camels',
    desc: 'A high-altitude desert valley beyond Khardung La with sand dunes, double-humped Bactrian camels, and the confluence of the Shyok and Nubra rivers. Diskit Monastery watches over it all from a desert cliff.',
  },
  {
    icon: '🧲',
    title: 'Magnetic Hill',
    desc: 'A fascinating optical illusion on the Leh–Kargil highway where vehicles appear to move uphill on their own. The surrounding barren landscape adds to the surreal experience — a popular stop on every Ladakh road trip.',
  },
  {
    icon: '🏯',
    title: 'Leh Palace',
    desc: 'A 17th-century nine-storey royal palace modelled after the Potala Palace in Lhasa, Tibet. Rising dramatically above Leh town at 3,524m, it offers panoramic views of the Indus Valley and Stok Kangri (6,153m).',
  },
  {
    icon: '🕌',
    title: 'Diskit Monastery',
    desc: 'The oldest and largest monastery in Nubra Valley, perched on a rocky cliff at 3,048m. A 32-metre Maitreya Buddha statue faces towards Pakistan — a symbol of peace presiding over the sand dunes below.',
  },
  {
    icon: '🛣️',
    title: 'Khardung La',
    desc: 'One of the world\'s highest motorable passes at 5,359m, connecting Leh to the Nubra Valley. A classic Ladakh road trip milestone with breathtaking panoramas of the Karakoram and Ladakh ranges on a clear day.',
  },
];

const BEST_TIME = [
  { month: 'Jun', crowd: 'Low', sky: '☀️', note: 'Season opens. Roads fully clear. Cool temperatures, Pangong Tso at its most pristine.' },
  { month: 'Jul', crowd: 'High', sky: '☀️', note: 'Peak summer — warm days, all guesthouses open, Nubra Valley festivals.' },
  { month: 'Aug', crowd: 'High', sky: '☀️', note: 'Peak season. Best time for Pangong camping and Nubra Valley camel safari.' },
  { month: 'Sep', crowd: 'Medium', sky: '🌤️', note: 'Best month — clear skies, manageable crowds, pleasant temperatures, harvest season.' },
  { month: 'Oct', crowd: 'Low', sky: '🌥️', note: 'Closing window. Cold nights, first snow on high passes. Spangmik road may close.' },
  { month: 'Nov–May', crowd: '—', sky: '❄️', note: 'Most roads and passes closed. Frozen Pangong Tso in Jan–Feb for ice adventure seekers.' },
];

export default function LadakhPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '70vh' }}>
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80&auto=format&fit=crop"
          alt="Ladakh — land of high passes with Pangong Tso lake and barren Himalayan ranges"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 50%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <span>Ladakh</span>
          </nav>
          <h1 className="city-hero-h1">
            Ladakh<br />
            <span className="city-name-gold">Land of High Passes — India&apos;s Last Frontier</span>
          </h1>
          <p className="city-hero-sub">
            Where the Himalayas meet the Karakoram in a vast high-altitude cold desert of turquoise lakes,
            ancient Buddhist monasteries, and passes that touch the sky. Pangong Tso, Nubra Valley,
            Khardung La — Ladakh is unlike anywhere else on Earth.<br />
            <strong>Expert-guided tours · Packages from Leh · Season: Jun–Sep</strong>
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20Ladakh%20tour%20package"
              className="btn-gold-hero"
              target="_blank" rel="noopener noreferrer"
            >
              📲 WhatsApp for Ladakh Quote
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
            How to <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Reach Ladakh</em>
          </h2>
          <p className="section-sub-left">
            Ladakh is accessible by air year-round and by two epic mountain highways during summer — each a journey worth taking in itself.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 28 }}>
            {/* By Air */}
            <div style={{ background: 'var(--card)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>✈️</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--heading)' }}>By Air</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Leh Kushok Bakula Rimpochee Airport</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>From Delhi</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold2)' }}>~1.5 hrs</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Altitude</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--gold2)' }}>3,256m</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Season</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>Year-round</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                IndiGo, Air India, and SpiceJet operate daily flights from Delhi to Leh. The approach through the Himalayan peaks is one of aviation&apos;s most spectacular journeys. Mandatory acclimatisation rest on Day 1 and 2 after arrival is essential — do not attempt high-altitude sites immediately.
              </p>
            </div>

            {/* Manali–Leh Highway */}
            <div style={{ background: 'var(--card)', border: '1px solid rgba(91,155,213,0.2)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(91,155,213,0.12)', border: '1px solid rgba(91,155,213,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚗</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--heading)' }}>Manali–Leh Highway</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>NH3 — The Epic Mountain Road</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Distance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#5B9BD5' }}>479 km</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Duration</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#5B9BD5' }}>2 days</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Season</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>Jun–Oct</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                One of the world&apos;s greatest road journeys. Manali → Rohtang Pass → Baralacha La (4,890m) → Lachung La → Tanglang La (5,328m) → Leh. Overnight halt at Jispa or Sarchu. The road is open June–October and provides natural acclimatisation over 2 days.
              </p>
            </div>

            {/* Srinagar–Leh Highway */}
            <div style={{ background: 'var(--card)', border: '1px solid rgba(61,201,160,0.2)', borderRadius: 16, padding: '28px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(61,201,160,0.12)', border: '1px solid rgba(61,201,160,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🛣️</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--heading)' }}>Srinagar–Leh Highway</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>NH1 — Via Kargil & Zoji La</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 20, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Distance</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>~434 km</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Duration</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>2 days</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Season</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#3DC9A0' }}>May–Nov</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
                The second great Ladakh highway via Srinagar and Kargil. Passes through Zoji La (3,528m), Drass (the second coldest inhabited place on Earth), and Kargil War Memorial at Drass. Longer season than Manali route — opens May and closes November.
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
            Tour Packages <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>to Ladakh</em>
          </h2>
          <p className="section-sub-left">
            Fully planned Ladakh tours with airport transfers, hotel stays, sightseeing, and permits handled. WhatsApp us for group rates and custom itineraries.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 28 }}>
            {/* Ladakh Coming Soon Card */}
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20Ladakh%20tour%20package"
              target="_blank" rel="noopener noreferrer"
              className="trek-card-hover"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div className="trek-card-inner">
                <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, #0d1a2e 0%, #07051A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>🏔️</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Coming Soon</div>
                  </div>
                  <span style={{ position: 'absolute', top: 12, left: 12, background: '#5B9BD5', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Enquire Now</span>
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: 'var(--gold)', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>Jun–Sep</span>
                </div>
                <div style={{ padding: '20px 22px 22px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--heading)', marginBottom: 8 }}>Ladakh Tour — Pangong &amp; Nubra</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 14, flexGrow: 1 }}>
                    Classic Ladakh circuit: Leh city, Pangong Tso overnight camp, Nubra Valley with Bactrian camel safari, Khardung La, and Magnetic Hill. Full package with flights, hotels, and permits.
                  </p>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>🕐 5–7 days</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>⛰️ 3,500m avg</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>📅 Jun–Sep</span>
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

      {/* ── LADAKH HIGHLIGHTS ────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Ladakh <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Highlights</em>
          </h2>
          <p className="section-sub-left">
            Six iconic experiences that define Ladakh — from its legendary lake to its ancient monasteries and record-breaking high passes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginTop: 28 }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 22px' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{h.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--heading)', marginBottom: 8 }}>{h.title}</h3>
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
            Best Time to <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Visit Ladakh</em>
          </h2>
          <p className="section-sub-left">
            Ladakh is open June–September. September is the sweet spot — crystal clear skies, manageable crowds, and harvest-season local colour.
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
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: row.month === 'Sep' ? 'var(--gold2)' : 'var(--heading)', fontSize: 14 }}>{row.month}{row.month === 'Sep' ? ' ⭐' : ''}</td>
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
              <strong style={{ color: 'var(--gold2)' }}>Pro Tip:</strong> Spend your first 2 days in Leh town (3,524m) without strenuous activity — acclimatisation is critical at Ladakh&apos;s altitudes. Attempting Khardung La or Pangong on Day 1 is dangerous. September offers the ideal combination of clear skies, lower prices, and thinner crowds for a perfect Ladakh experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA BANNER ───────────────────────────── */}
      <section style={{ background: '#07051A', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>🏔️</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 10, fontFamily: 'var(--font-poppins)' }}>
            Planning a Ladakh Trip?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            Get a custom Ladakh itinerary, permit guidance, acclimatisation schedule, and expert advice on the best route for your group and travel dates.
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20Ladakh%20tour%20package"
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
            WhatsApp Us for Ladakh
          </a>
          <div style={{ marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Responds within 60 minutes · Available 8 AM–10 PM IST
          </div>
        </div>
      </section>
    </>
  );
}
