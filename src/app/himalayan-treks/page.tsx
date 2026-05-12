import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Himalayan Treks 2025–26 | Kedarkantha · Valley of Flowers · Kuari Pass | Junegiri Yatra',
  description: 'Book Himalayan treks from ₹6,500/person — Kedarkantha, Valley of Flowers, Har Ki Dun, Kuari Pass, Roopkund & Chopta-Tungnath. Expert guides, all permits, NCRD-certified. From Haridwar.',
  keywords: 'himalayan treks india, kedarkantha trek, valley of flowers trek, kuari pass trek, har ki dun trek, roopkund trek, chopta tungnath trek, uttarakhand trekking packages',
  alternates: { canonical: 'https://junegiriyatra.com/himalayan-treks/' },
  openGraph: {
    title: 'Himalayan Treks 2025–26 | Junegiri Yatra',
    description: 'Expert-guided Himalayan treks from ₹6,500 — 6 routes, all difficulty levels, all-inclusive from Haridwar.',
    images: [{ url: 'https://junegiriyatra.com/images/trek_himalaya.webp' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Himalayan Treks — Junegiri Yatra',
      description: 'Guided Himalayan trek packages from Haridwar — Kedarkantha, Valley of Flowers, Har Ki Dun, Kuari Pass, Roopkund, Chopta-Tungnath.',
      url: 'https://junegiriyatra.com/himalayan-treks/',
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
        { '@type': 'ListItem', position: 2, name: 'Himalayan Treks', item: 'https://junegiriyatra.com/himalayan-treks/' },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Himalayan Trek Packages',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Kedarkantha Trek 5N/6D', url: 'https://junegiriyatra.com/packages/kedarkantha-trek-5n-6d/' },
        { '@type': 'ListItem', position: 2, name: 'Valley of Flowers Trek 4N/5D', url: 'https://junegiriyatra.com/packages/valley-of-flowers-trek-4n-5d/' },
        { '@type': 'ListItem', position: 3, name: 'Har Ki Dun Trek 5N/6D', url: 'https://junegiriyatra.com/packages/har-ki-dun-trek-5n-6d/' },
        { '@type': 'ListItem', position: 4, name: 'Chopta–Tungnath Trek 3N/4D', url: 'https://junegiriyatra.com/packages/chopta-tungnath-trek-3n-4d/' },
        { '@type': 'ListItem', position: 5, name: 'Kuari Pass Trek 4N/5D', url: 'https://junegiriyatra.com/packages/kuari-pass-trek-4n-5d/' },
        { '@type': 'ListItem', position: 6, name: 'Roopkund Trek 7N/8D', url: 'https://junegiriyatra.com/packages/roopkund-trek-7n-8d/' },
      ],
    },
  ],
};

const TREKS = [
  {
    slug: 'kedarkantha-trek-5n-6d',
    name: 'Kedarkantha Trek',
    duration: '5 Nights / 6 Days',
    price: '₹9,500',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    tag: 'Bestseller',
    tagColor: '#C9923D',
    altitude: '12,500 ft',
    season: 'Dec–Apr (Snow) · Oct–Nov',
    highlights: ['360° Himalayan summit views', 'Camping at Juda Ka Talab', 'Snow trek in winter'],
    image: '/images/kedarkantha_trek.webp',
    desc: 'India\'s most popular winter trek. Gradual ascent through pine forests to a snow-capped summit with panoramic views of Swargarohini, Bandarpunch, and Kedarnath peaks.',
  },
  {
    slug: 'valley-of-flowers-trek-4n-5d',
    name: 'Valley of Flowers Trek',
    duration: '4 Nights / 5 Days',
    price: '₹8,500',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'UNESCO Heritage',
    tagColor: '#5B9BD5',
    altitude: '14,100 ft',
    season: 'Jul–Sep',
    highlights: ['300+ Himalayan wildflower species', 'Hemkund Sahib Gurudwara', 'UNESCO World Heritage Site'],
    image: '/images/valley_of_flowers.webp',
    desc: 'A blooming UNESCO World Heritage Site in Chamoli district. The valley transforms into a carpet of rare alpine flowers every monsoon — one of the most visually stunning treks in India.',
  },
  {
    slug: 'har-ki-dun-trek-5n-6d',
    name: 'Har Ki Dun Trek',
    duration: '5 Nights / 6 Days',
    price: '₹10,500',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'Heritage Trek',
    tagColor: '#9B5BD5',
    altitude: '11,680 ft',
    season: 'Apr–Jun · Sep–Nov',
    highlights: ['Cradle of civilisation valley', 'Ancient Osla village', 'Views of Swargarohini peak'],
    image: '/images/solo_trek_uttarakhand.webp',
    desc: 'The "Valley of Gods" in the Govind Wildlife Sanctuary. Ancient villages, wooden temples, and Himalayan meadows make this one of Uttarakhand\'s most culturally rich treks.',
  },
  {
    slug: 'chopta-tungnath-trek-3n-4d',
    name: 'Chopta–Tungnath Trek',
    duration: '3 Nights / 4 Days',
    price: '₹6,500',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    tag: 'Weekend Trek',
    tagColor: '#3DC9A0',
    altitude: '12,073 ft',
    season: 'Mar–Jun · Sep–Nov',
    highlights: ['Highest Shiva temple in the world', 'Chandrashila summit sunrise', 'Deoriatal lake reflections'],
    image: '/images/trek_mountain_path.webp',
    desc: 'Uttarakhand\'s "Mini Switzerland." A short but spectacular trek through rhododendron forests to Tungnath (world\'s highest Shiva temple) and Chandrashila summit for 360° Himalayan views.',
  },
  {
    slug: 'kuari-pass-trek-4n-5d',
    name: 'Kuari Pass Trek',
    duration: '4 Nights / 5 Days',
    price: '₹9,000',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'Scenic Trek',
    tagColor: '#5B9BD5',
    altitude: '12,516 ft',
    season: 'Oct–Apr',
    highlights: ['Views of Nanda Devi & Dronagiri', 'Lord Curzon\'s Trail', 'Auli ski resort base'],
    image: '/images/himalaya_altitude.webp',
    desc: 'The "Lord Curzon Trail" — one of the finest ridge walks in the Garhwal Himalayas. Passes through oak forests, alpine meadows, and offers unobstructed views of 13 Himalayan peaks including Nanda Devi.',
  },
  {
    slug: 'roopkund-trek-7n-8d',
    name: 'Roopkund Trek',
    duration: '7 Nights / 8 Days',
    price: '₹14,500',
    difficulty: 'Difficult',
    diffColor: '#E05C00',
    tag: 'Mystery Lake',
    tagColor: '#E05C00',
    altitude: '15,750 ft',
    season: 'May–Jun · Sep–Oct',
    highlights: ['Skeleton lake at 15,750 ft', 'Ali & Bedni Bugyal meadows', 'Trishul & Nanda Ghunti views'],
    image: '/images/trek_lake.webp',
    desc: 'Trek to the famous "Skeleton Lake" — a glacial lake filled with 9th-century human skeletons, still a scientific mystery. Passes through India\'s most beautiful high-altitude meadows.',
  },
];

const STATS = [
  { val: '6', label: 'Trek Routes' },
  { val: '3–8', label: 'Days Duration' },
  { val: '11,680–15,750', label: 'Altitude Range (ft)' },
  { val: '₹6,500', label: 'Starting Price' },
];

const FEATURES = [
  { icon: '🎒', title: 'All-Inclusive Packages', desc: 'Transport from Haridwar, accommodation (tent/guesthouse), all meals on trek, trek permits, NCRD-certified guide, first-aid kit.' },
  { icon: '🏔️', title: 'NCRD-Certified Guides', desc: 'All trek guides hold National Certification for Rescue & Disaster Management and are trained in altitude sickness response.' },
  { icon: '⛺', title: 'Quality Camping Gear', desc: 'High-altitude tents, sleeping bags rated to -10°C, insulated sleeping mats, and mess tent with warm meals provided.' },
  { icon: '🚐', title: 'Haridwar Base Camp', desc: 'All treks depart from Haridwar. We arrange pickup from Haridwar railway/bus station and return drop at trip end.' },
  { icon: '📋', title: 'Permits Handled', desc: 'Forest entry permits, wildlife sanctuary fees, and Uttarakhand tourism registrations all managed by our team.' },
  { icon: '🏥', title: 'Altitude Safety Protocol', desc: 'Acclimatisation schedules built into every itinerary. Pulse oximeters on all treks. Medical evacuation protocol in place.' },
];

export default function HimalayanTreksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '65vh' }}>
        <Image
          src="/images/trek_himalaya.webp"
          alt="Himalayan Treks from Haridwar"
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span>
            <span>Himalayan Treks</span>
          </nav>
          <h1 className="city-hero-h1">
            Himalayan Treks<br />
            <span className="city-name-gold">Uttarakhand 2025–26</span>
          </h1>
          <p className="city-hero-sub">
            6 Routes · 3 to 8 Days · 11,680–15,750 ft · All Difficulty Levels 🏔️<br />
            <strong>All permits · NCRD guides · Transport from Haridwar · From ₹6,500</strong>
          </p>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20know%20more%20about%20Himalayan%20Trek%20packages"
            className="btn-gold-hero"
            target="_blank" rel="noopener noreferrer"
          >
            📲 WhatsApp for Trek Quote
          </a>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ padding: '28px 16px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--gold2)', fontFamily: 'var(--font-poppins)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TREK CARDS ───────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            All <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Trek Packages</em>
          </h2>
          <p className="section-sub-left">Click any trek to see full itinerary, inclusions, pricing &amp; availability.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24, marginTop: 32 }}>
            {TREKS.map((trek) => (
              <Link key={trek.slug} href={`/packages/${trek.slug}/`} style={{ display: 'block', textDecoration: 'none' }}>
                <div className="qi-card" style={{ overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(201,146,61,0.18)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <Image
                      src={trek.image}
                      alt={trek.name}
                      fill sizes="(max-width:768px) 100vw, 400px"
                      style={{ objectFit: 'cover', transition: 'transform 0.4s' }}
                    />
                    {/* Tag badge */}
                    <span style={{
                      position: 'absolute', top: 12, left: 12,
                      background: trek.tagColor, color: '#fff',
                      fontSize: 11, fontWeight: 700, padding: '4px 10px',
                      borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>{trek.tag}</span>
                    {/* Difficulty badge */}
                    <span style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(0,0,0,0.65)', color: trek.diffColor,
                      fontSize: 11, fontWeight: 600, padding: '4px 10px',
                      borderRadius: 20, border: `1px solid ${trek.diffColor}40`,
                    }}>{trek.difficulty}</span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 22px 22px' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{trek.name}</h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 14 }}>{trek.desc}</p>

                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        🕐 {trek.duration}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        ⛰️ Max {trek.altitude}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        📅 {trek.season}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: 16 }}>
                      {trek.highlights.map((h) => (
                        <div key={h} style={{ fontSize: 12.5, color: 'var(--text)', marginBottom: 4, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                          <span style={{ color: 'var(--gold2)', marginTop: 1, flexShrink: 0 }}>✓</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>From</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold2)' }}>{trek.price}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>per person</div>
                      </div>
                      <span style={{
                        background: 'var(--gold)',
                        color: '#07051A',
                        fontSize: 13,
                        fontWeight: 700,
                        padding: '10px 18px',
                        borderRadius: 8,
                      }}>
                        View Trek →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BOOK WITH US ─────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">
            Why Book With <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Junegiri Yatra</em>
          </h2>
          <p className="section-sub-left light">Everything handled — from Haridwar pickup to summit and back.</p>
          <div className="cdf-includes-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="cdf-include-card">
                <span className="cdf-include-icon">{f.icon}</span>
                <div>
                  <div className="cdf-include-title">{f.title}</div>
                  <div className="cdf-include-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFFICULTY GUIDE ─────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Choose by <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Difficulty</em>
          </h2>
          <p className="section-sub-left">Pick the right trek for your fitness level and experience.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 28 }}>
            {[
              {
                level: 'Easy–Moderate',
                color: '#3DC9A0',
                icon: '🥾',
                desc: 'No prior trekking experience needed. Moderate daily walking (6–10 km). Good for beginners, families, and first-time Himalayan trekkers.',
                treks: ['Kedarkantha Trek (5N/6D)', 'Chopta–Tungnath Trek (3N/4D)'],
              },
              {
                level: 'Moderate',
                color: '#E8AA50',
                icon: '⛰️',
                desc: 'Basic fitness required. Daily walking 8–14 km with altitude gain. Ideal for regular walkers and those with some hiking experience.',
                treks: ['Valley of Flowers Trek (4N/5D)', 'Har Ki Dun Trek (5N/6D)', 'Kuari Pass Trek (4N/5D)'],
              },
              {
                level: 'Difficult',
                color: '#E05C00',
                icon: '🏔️',
                desc: 'Good fitness and prior trekking experience required. High altitude (15,000+ ft), steep terrain, unpredictable weather.',
                treks: ['Roopkund Trek (7N/8D)'],
              },
            ].map((d) => (
              <div key={d.level} style={{
                background: 'var(--card)',
                border: `1px solid ${d.color}30`,
                borderRadius: 14,
                padding: '24px 22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{d.icon}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: d.color }}>{d.level}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.6 }}>{d.desc}</p>
                <div style={{ borderTop: `1px solid ${d.color}20`, paddingTop: 12 }}>
                  {d.treks.map((t) => (
                    <div key={t} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: d.color }}>›</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">How <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Booking Works</em></h2>
          <div className="cdf-steps">
            {[
              { step: '01', title: 'Choose Your Trek', desc: 'Browse the 6 routes above. Check difficulty, duration, and season. WhatsApp us if you\'re unsure which trek suits you.' },
              { step: '02', title: 'WhatsApp Us', desc: 'Share your preferred trek, travel dates, group size, and fitness level. We respond within 60 minutes with availability and pricing.' },
              { step: '03', title: 'Confirm & Pay Advance', desc: 'Confirm dates and group size. Pay a ₹2,000 advance per person to lock your slot. Balance payable at Haridwar base camp.' },
              { step: '04', title: 'Meet at Haridwar', desc: 'Report to our Haridwar base camp. Gear briefing, safety orientation, then we head to the trailhead together.' },
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

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready for your Himalayan adventure?</p>
            <p className="city-cta-sub">
              WhatsApp for group pricing, custom dates &amp; gear guidance. We respond in under 60 minutes.
            </p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20know%20more%20about%20Himalayan%20Trek%20packages"
              className="btn-gold-lg"
              target="_blank" rel="noopener noreferrer"
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
