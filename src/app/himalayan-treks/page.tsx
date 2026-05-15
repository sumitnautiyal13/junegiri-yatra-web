import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Himalayan Treks 2026 | Uttarakhand & Himachal Pradesh | Junegiri Yatra',
  description: 'Book Himalayan treks from ₹6,500/person — Kedarkantha, Valley of Flowers, Hamta Pass, Triund, Kuari Pass, Roopkund & 16 more routes. Expert guides, all permits. Uttarakhand & Himachal Pradesh.',
  keywords: 'himalayan treks india, kedarkantha trek, valley of flowers trek, hamta pass trek, triund trek, kuari pass trek, himachal pradesh treks, uttarakhand trekking packages 2025',
  alternates: { canonical: 'https://junegiriyatra.com/himalayan-treks/' },
  openGraph: {
    title: 'Himalayan Treks 2026 | Junegiri Yatra',
    description: '16 Himalayan trek routes — Uttarakhand & Himachal Pradesh. All difficulty levels, all-inclusive from ₹6,500.',
    images: [{ url: 'https://junegiriyatra.com/images/trek_himalaya.webp' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Himalayan Treks — Uttarakhand & Himachal Pradesh',
      description: 'Guided Himalayan trek packages — 16 routes across Uttarakhand and Himachal Pradesh. All difficulty levels, all-inclusive from Haridwar.',
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
  ],
};

/* ── UTTARAKHAND TREKS (have package pages) ─────────────────── */
const UK_TREKS = [
  {
    slug: 'kedarkantha-trek-5n-6d',
    name: 'Kedarkantha Trek',
    duration: '5N / 6D',
    price: '₹9,500',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    tag: 'Bestseller',
    tagColor: '#C9923D',
    altitude: '3,810m / 12,500 ft',
    season: 'Dec–Apr · Oct–Nov',
    highlights: ['360° Himalayan panorama from summit', 'Camping at Juda Ka Talab lake', 'Snow trek in winter'],
    image: '/images/kedarkantha_trek.webp',
    desc: "India's most popular winter trek. Gradual ascent through pine forests to a snow-capped summit with panoramic views of Swargarohini, Bandarpunch, and Kedarnath peaks.",
    hasPage: true,
  },
  {
    slug: 'valley-of-flowers-trek-4n-5d',
    name: 'Valley of Flowers',
    duration: '4N / 5D',
    price: '₹8,500',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'UNESCO Heritage',
    tagColor: '#5B9BD5',
    altitude: '3,658m / 12,000 ft',
    season: 'Jul–Sep',
    highlights: ['300+ Himalayan wildflower species', 'Hemkund Sahib Gurudwara at 4,329m', 'UNESCO World Heritage Site'],
    image: '/images/valley_of_flowers.webp',
    desc: 'A blooming UNESCO World Heritage Site. The valley transforms into a carpet of rare alpine flowers every monsoon — one of the most visually stunning treks in India.',
    hasPage: true,
  },
  {
    slug: 'har-ki-dun-trek-5n-6d',
    name: 'Har Ki Dun Trek',
    duration: '5N / 6D',
    price: '₹10,500',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'Heritage Trek',
    tagColor: '#9B5BD5',
    altitude: '3,566m / 11,700 ft',
    season: 'Apr–Jun · Sep–Nov',
    highlights: ['Ancient Osla village & wooden temples', 'Views of Swargarohini peak', 'Govind Wildlife Sanctuary'],
    image: '/images/solo_trek_uttarakhand.webp',
    desc: "The 'Valley of Gods' in Govind Wildlife Sanctuary. Ancient villages, wooden temples, and Himalayan meadows make this Uttarakhand's most culturally rich trek.",
    hasPage: true,
  },
  {
    slug: 'chopta-tungnath-trek-3n-4d',
    name: 'Chopta–Tungnath',
    duration: '3N / 4D',
    price: '₹6,500',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    tag: 'Weekend Trek',
    tagColor: '#3DC9A0',
    altitude: '3,680m / 12,073 ft',
    season: 'Mar–Jun · Sep–Nov',
    highlights: ["World's highest Shiva temple", 'Chandrashila summit sunrise', 'Deoriatal lake reflections'],
    image: '/images/trek_mountain_path.webp',
    desc: "Uttarakhand's 'Mini Switzerland.' Trek through rhododendron forests to Tungnath (world's highest Shiva temple) and Chandrashila for 360° Himalayan views.",
    hasPage: true,
  },
  {
    slug: 'kuari-pass-trek-4n-5d',
    name: 'Kuari Pass Trek',
    duration: '4N / 5D',
    price: '₹9,000',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    tag: 'Scenic Trek',
    tagColor: '#5B9BD5',
    altitude: '3,812m / 12,516 ft',
    season: 'Oct–Apr',
    highlights: ['Views of Nanda Devi & Dronagiri', "Lord Curzon's Trail", 'Auli ski resort base'],
    image: '/images/himalaya_altitude.webp',
    desc: "The 'Lord Curzon Trail' — finest ridge walk in the Garhwal Himalayas. Unobstructed views of 13 peaks including Nanda Devi across oak forests and alpine meadows.",
    hasPage: true,
  },
  {
    slug: 'roopkund-trek-7n-8d',
    name: 'Roopkund Trek',
    duration: '7N / 8D',
    price: '₹14,500',
    difficulty: 'Difficult',
    diffColor: '#E05C00',
    tag: 'Mystery Lake',
    tagColor: '#E05C00',
    altitude: '4,800m / 15,750 ft',
    season: 'May–Jun · Sep–Oct',
    highlights: ['Skeleton lake at 15,750 ft', 'Ali & Bedni Bugyal meadows', 'Trishul & Nanda Ghunti views'],
    image: '/images/trek_lake.webp',
    desc: "Trek to the famous 'Skeleton Lake' — a glacial lake filled with 9th-century human skeletons. Passes through India's most beautiful high-altitude meadows.",
    hasPage: true,
  },
];

/* ── HIMACHAL PRADESH TREKS (WhatsApp enquiry) ──────────────── */
const HP_EASY: Array<{
  name: string; altitude: string; duration: string; highlight: string; price?: string;
  difficulty: string; diffColor: string; image: string; waMsg: string; packageUrl?: string;
}> = [
  {
    name: 'Triund Trek',
    altitude: '2,875m / 9,432 ft',
    duration: '1N / 2D',
    price: '₹3,500',
    highlight: "One of Himachal's most popular beginner treks. Stunning views of the Dhauladhar snow wall and Kangra Valley. Perfect for first-timers.",
    difficulty: 'Easy',
    diffColor: '#3DC9A0',
    image: 'https://images.unsplash.com/photo-1571970261658-dce98bc0e9f0?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Triund Trek in Himachal Pradesh',
    packageUrl: '/packages/triund-trek-1n-2d/',
  },
  {
    name: 'Kareri Lake Trek',
    altitude: '2,950m / 9,678 ft',
    duration: '3N / 4D',
    price: '₹7,500',
    highlight: 'Pristine alpine lake above Dharamshala. Multiple river crossings, oak and rhododendron forest, total wilderness camping.',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Kareri Lake Trek in Himachal Pradesh',
    packageUrl: '/packages/kareri-lake-trek-3n-4d/',
  },
  {
    name: 'Beas Kund Trek',
    altitude: '3,700m / 12,139 ft',
    duration: '2N / 3D',
    price: '₹6,500',
    highlight: 'Source of the sacred Beas river — glacial lake at 3,700m with Hanuman Tibba and Shitidhar glacier above. Perfect beginner trek from Manali.',
    difficulty: 'Easy',
    diffColor: '#3DC9A0',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Beas Kund Trek near Manali',
    packageUrl: '/packages/beas-kund-trek-2n-3d/',
  },
  {
    name: 'Bhrigu Lake Trek',
    altitude: '4,300m / 14,107 ft',
    duration: '3N / 4D',
    price: '₹9,500',
    highlight: 'High-altitude sacred lake near Manali. Panoramic views of Rohtang, Deo Tibba and Kullu peaks. Often partially frozen in June.',
    difficulty: 'Easy–Moderate',
    diffColor: '#3DC9A0',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Bhrigu Lake Trek near Manali',
    packageUrl: '/packages/bhrigu-lake-trek-3n-4d/',
  },
];

const HP_MODERATE: Array<{
  name: string; altitude: string; duration: string; highlight: string; price?: string;
  difficulty: string; diffColor: string; image: string; waMsg: string; packageUrl?: string;
}> = [
  {
    name: 'Hamta Pass Trek',
    altitude: '4,270m / 14,009 ft',
    duration: '4N / 5D',
    price: '₹11,500',
    highlight: 'Cross from lush Kullu valley to barren Spiti in one dramatic pass. Chandrataal moon lake included. Best HP moderate trek.',
    difficulty: 'Moderate',
    diffColor: '#E8AA50',
    image: 'https://images.unsplash.com/photo-1585506942812-e72b29cef752?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Hamta Pass Trek in Himachal Pradesh',
    packageUrl: '/packages/hamta-pass-trek-4n-5d/',
  },
  {
    name: 'Indrahar Pass Trek',
    altitude: '4,342m / 14,245 ft',
    duration: '3N / 4D',
    price: '₹8,500',
    highlight: 'Breathtaking views of the Pir Panjal range and Dhauladhar mountains. One of the best adventure treks in Himachal Pradesh.',
    difficulty: 'Moderate–Difficult',
    diffColor: '#E8AA50',
    image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Indrahar Pass Trek in Himachal Pradesh',
    packageUrl: '/packages/indrahar-pass-trek-3n-4d/',
  },
  {
    name: 'Chandrakhani Pass Trek',
    altitude: '3,660m / 12,008 ft',
    duration: '3N / 4D',
    price: '₹7,500',
    highlight: 'Lush forests, apple orchards, and panoramic Himalayan views. Connects Naggar to Malana village.',
    difficulty: 'Moderate–Difficult',
    diffColor: '#E8AA50',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Chandrakhani Pass Trek in Himachal Pradesh',
    packageUrl: '/packages/chandrakhani-pass-trek-3n-4d/',
  },
  {
    name: 'Rupin Pass Trek',
    altitude: '4,650m / 15,256 ft',
    duration: '8N / 9D',
    price: '₹16,500',
    highlight: 'Best in May–June. Trails filled with snow bridges and melting glaciers. Multi-state Uttarakhand → Himachal crossover.',
    difficulty: 'Moderate–Difficult',
    diffColor: '#E8AA50',
    image: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Rupin Pass Trek',
    packageUrl: '/packages/rupin-pass-trek-8n-9d/',
  },
  {
    name: 'Kanamo Peak',
    altitude: '5,964m / 19,567 ft',
    duration: '5N / 6D',
    price: '₹19,500',
    highlight: "Among the highest non-technical summit climbs in India. Cold desert Spiti Valley. Book well in advance — limited slots.",
    difficulty: 'Difficult',
    diffColor: '#E05C00',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about Kanamo Peak trek in Spiti Valley',
    packageUrl: '/packages/kanamo-peak-5n-6d/',
  },
  {
    name: 'Pin Parvati Pass Trek',
    altitude: '5,319m / 17,457 ft',
    duration: '10N / 11D',
    price: '₹22,000',
    highlight: 'Challenging, remote crossover from Kullu to Spiti. Glacier crossings, high camp, one of India\'s most adventurous HP routes.',
    difficulty: 'Difficult',
    diffColor: '#E05C00',
    image: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=600&q=80&auto=format&fit=crop',
    waMsg: 'Namaste! I want to enquire about the Pin Parvati Pass Trek',
    packageUrl: '/packages/pin-parvati-pass-10n-11d/',
  },
];

const MONTHLY = [
  {
    month: 'May',
    color: '#5B9BD5',
    treks: ['Triund', 'Kareri Lake', 'Bhrigu Lake', 'Beas Kund', 'Har Ki Dun', 'Roopkund (early)', 'Kuari Pass', 'Rupin Pass', 'Hamta Pass'],
  },
  {
    month: 'June',
    color: '#3DC9A0',
    treks: ['Valley of Flowers (opens Jun 1)', 'Hemkund Sahib (opens Jun)', 'Kedarkantha (summer)', 'Chandrashila', 'Kanamo Peak', 'All Himachal moderate trails'],
  },
  {
    month: 'Sep–Oct',
    color: '#E8AA50',
    treks: ['Kedarkantha', 'Har Ki Dun', 'Valley of Flowers (closing)', 'Kuari Pass', 'Roopkund', 'Hamta Pass', 'Indrahar Pass'],
  },
  {
    month: 'Dec–Apr',
    color: '#C9923D',
    treks: ['Kedarkantha (snow)', 'Kuari Pass (winter)', 'Chopta–Tungnath', 'Triund (snow camping)'],
  },
];

const FEATURES = [
  { icon: '🎒', title: 'All-Inclusive Packages', desc: 'Transport from Haridwar, accommodation, all meals on trek, permits, NCRD-certified guide, first-aid kit.' },
  { icon: '🏔️', title: 'NCRD-Certified Guides', desc: 'All guides hold National Certification for Rescue & Disaster Management, trained in altitude sickness response.' },
  { icon: '⛺', title: 'Quality Camping Gear', desc: 'High-altitude tents, sleeping bags rated to -10°C, insulated mats, and mess tent with warm meals.' },
  { icon: '🚐', title: 'Haridwar Base', desc: 'All Uttarakhand treks depart from Haridwar. Pickup from Haridwar railway/bus station included.' },
  { icon: '📋', title: 'All Permits Handled', desc: 'Forest entry permits, wildlife sanctuary fees, and Uttarakhand tourism registrations managed by us.' },
  { icon: '🏥', title: 'Altitude Safety Protocol', desc: 'Acclimatisation built into every itinerary. Pulse oximeters on all treks. Medical evacuation protocol in place.' },
];

/* cardBase moved to CSS class .trek-card-hover in globals.css */

export default function HimalayanTreksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="city-hero" style={{ minHeight: '65vh' }}>
        <Image
          src="/images/trek_himalaya.webp"
          alt="Himalayan Treks — Uttarakhand & Himachal Pradesh"
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
            <span className="city-name-gold">Uttarakhand &amp; Himachal 2025–26</span>
          </h1>
          <p className="city-hero-sub">
            16 Trek Routes · 2 to 11 Days · 2,875m–5,964m · All Difficulty Levels 🏔️<br />
            <strong>NCRD-certified guides · All permits · Transport from Haridwar · From ₹6,500</strong>
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
            {[
              { val: '16', label: 'Trek Routes' },
              { val: '2–11', label: 'Days Duration' },
              { val: '2,875–5,964m', label: 'Altitude Range' },
              { val: '₹6,500', label: 'Starting Price' },
            ].map((s) => (
              <div key={s.label} style={{ padding: '28px 16px', textAlign: 'center', borderRight: '1px solid var(--border)' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold2)', fontFamily: 'var(--font-poppins)' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          UTTARAKHAND TREKS
      ══════════════════════════════════════════════════════ */}
      <section className="city-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,146,61,0.12)', padding: '4px 12px', borderRadius: 20 }}>Uttarakhand</span>
          </div>
          <h2 className="section-title-left">
            Garhwal &amp; Kumaon <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Trek Packages</em>
          </h2>
          <p className="section-sub-left">
            6 fully-packaged treks departing from Haridwar — itinerary, inclusions, pricing &amp; booking all on the trek page.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24, marginTop: 28 }}>
            {UK_TREKS.map((trek) => (
              <Link key={trek.slug} href={`/packages/${trek.slug}/`} className="trek-card-hover" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="trek-card-inner">
                  <div style={{ position: 'relative', height: 190 }}>
                    <Image src={trek.image} alt={trek.name} fill sizes="400px" style={{ objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 12, left: 12, background: trek.tagColor, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{trek.tag}</span>
                    <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: trek.diffColor, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{trek.difficulty}</span>
                  </div>
                  <div style={{ padding: '18px 20px 20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{trek.name}</h3>
                    <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12, flexGrow: 1 }}>{trek.desc}</p>
                    <div style={{ display: 'flex', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>🕐 {trek.duration}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>⛰️ {trek.altitude}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>📅 {trek.season}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>From</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold2)' }}>{trek.price}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>/person</span></div>
                      </div>
                      <span style={{ background: 'var(--gold)', color: '#07051A', fontSize: 12, fontWeight: 700, padding: '9px 16px', borderRadius: 8 }}>View Trek →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HIMACHAL PRADESH TREKS
      ══════════════════════════════════════════════════════ */}
      <section className="city-section" style={{ background: 'var(--card)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5B9BD5', background: 'rgba(91,155,213,0.12)', padding: '4px 12px', borderRadius: 20 }}>Himachal Pradesh</span>
          </div>
          <h2 className="section-title-left">
            Himachal Pradesh <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Trek Routes</em>
          </h2>
          <p className="section-sub-left">
            10 trek routes from Manali, Dharamshala &amp; Spiti. WhatsApp us for custom packages, transport &amp; dates.
          </p>

          {/* Easy–Moderate */}
          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3DC9A0', display: 'inline-block', flexShrink: 0 }} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#3DC9A0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Easy – Moderate</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {HP_EASY.map((trek) => (
                <div key={trek.name} className="trek-card-hover">
                  <div className="trek-card-inner">
                    <div style={{ position: 'relative', height: 160 }}>
                      <Image src={trek.image} alt={trek.name} fill sizes="320px" style={{ objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.65)', color: trek.diffColor, fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>{trek.difficulty}</span>
                      {trek.price && <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'var(--gold)', color: '#1a1200', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>From {trek.price}</span>}
                    </div>
                    <div style={{ padding: '16px 18px 18px' }}>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{trek.name}</h4>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>⛰️ {trek.altitude}</span>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>🕐 {trek.duration}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12 }}>{trek.highlight}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {trek.packageUrl
                          ? <Link href={trek.packageUrl} style={{ flex: 1, textAlign: 'center', background: 'var(--gold)', color: '#1a1200', fontSize: 12, fontWeight: 700, padding: '8px 0', borderRadius: 6, textDecoration: 'none' }}>View Package →</Link>
                          : <a href={`https://wa.me/919873897652?text=${encodeURIComponent(trek.waMsg)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, color: '#25D366', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}><span>💬</span> WhatsApp for Dates →</a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Moderate–Difficult */}
          <div style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E8AA50', display: 'inline-block', flexShrink: 0 }} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#E8AA50', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Moderate – Difficult</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {HP_MODERATE.map((trek) => (
                <div key={trek.name} className="trek-card-hover">
                  <div className="trek-card-inner">
                    <div style={{ position: 'relative', height: 160 }}>
                      <Image src={trek.image} alt={trek.name} fill sizes="320px" style={{ objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.65)', color: trek.diffColor, fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20 }}>{trek.difficulty}</span>
                      {trek.price && <span style={{ position: 'absolute', bottom: 10, left: 10, background: 'var(--gold)', color: '#1a1200', fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20 }}>From {trek.price}</span>}
                    </div>
                    <div style={{ padding: '16px 18px 18px' }}>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{trek.name}</h4>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>⛰️ {trek.altitude}</span>
                        <span style={{ fontSize: 11, color: 'var(--muted)' }}>🕐 {trek.duration}</span>
                      </div>
                      <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12 }}>{trek.highlight}</p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {trek.packageUrl
                          ? <Link href={trek.packageUrl} style={{ flex: 1, textAlign: 'center', background: 'var(--gold)', color: '#1a1200', fontSize: 12, fontWeight: 700, padding: '8px 0', borderRadius: 6, textDecoration: 'none' }}>View Package →</Link>
                          : <a href={`https://wa.me/919873897652?text=${encodeURIComponent(trek.waMsg)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, color: '#25D366', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}><span>💬</span> WhatsApp for Dates →</a>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          QUICK REFERENCE BY MONTH
      ══════════════════════════════════════════════════════ */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            Best Treks by <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Month</em>
          </h2>
          <p className="section-sub-left">
            Plan your trek around the ideal window — weather, trail access, and crowd levels all vary significantly by season.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginTop: 28 }}>
            {MONTHLY.map((m) => (
              <div key={m.month} style={{ background: 'var(--card)', border: `1px solid ${m.color}30`, borderRadius: 14, padding: '22px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}18`, border: `1px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 16 }}>📅</span>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: m.color }}>{m.month}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {m.treks.map((t) => (
                    <div key={t} style={{ fontSize: 12.5, color: 'var(--text)', display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                      <span style={{ color: m.color, marginTop: 2, flexShrink: 0 }}>✓</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pro tip callout */}
          <div style={{ marginTop: 28, background: 'var(--card2)', border: '1px solid rgba(201,146,61,0.2)', borderRadius: 14, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
            <div>
              <span style={{ fontWeight: 700, color: 'var(--gold2)', fontSize: 14 }}>Pro Tip: </span>
              <span style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.6 }}>
                May to June marks the prime trekking season — pleasant weather with clear skies. Rivers run slightly high due to snowmelt, but trails are at their greenest and least crowded before monsoon hits in July.
              </span>
            </div>
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

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready for your Himalayan adventure?</p>
            <p className="city-cta-sub">
              WhatsApp for group pricing, custom dates, Himachal packages &amp; gear guidance. Responds in under 60 minutes.
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
