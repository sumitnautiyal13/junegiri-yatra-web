'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllPackages } from '@/lib/data';
import WaLink from '@/components/WaLink';

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const JOURNEYS = [
  {
    tag: 'Sacred Pilgrimage',
    title: 'Char Dham Yatra',
    sub: 'Kedarnath · Badrinath · Gangotri · Yamunotri',
    url: '/packages/char-dham-yatra/',
    img: '/images/kedarnath_temple_cover.jpg',
    color: '#C9923D',
  },
  {
    tag: 'High Altitude Treks',
    title: 'Himalayan Treks',
    sub: 'Kedarkantha · Valley of Flowers · Hampta Pass · Kuari Pass',
    url: '/packages/char-dham-yatra/',
    img: '/images/trek_himalaya.jpg',
    color: '#5B9BD5',
  },
  {
    tag: 'Iconic India',
    title: 'Golden Triangle',
    sub: 'Delhi · Agra · Jaipur · Taj Mahal',
    url: '/packages/golden-triangle/',
    img: '/images/temple_entrance.jpg',
    color: '#C97B3D',
  },
  {
    tag: 'Active Adventures',
    title: 'Rishikesh Thrills',
    sub: 'Rafting · Bungee · Camping · Kayaking · Yoga',
    url: '/packages/char-dham-yatra/',
    img: '/images/rishikesh_bridge.jpg',
    color: '#3DC9A0',
  },
];

const WHY_CHOOSE = [
  {
    icon: '🏔',
    title: '8+ Years in the Himalayas',
    text: 'Since 2017, operating across Uttarakhand in all seasons. We know every mountain road, every seasonal window, every shortcut that saves you 2 hours.',
    stat: '8 Years',
  },
  {
    icon: '💰',
    title: 'Zero Hidden Costs',
    text: 'What we quote is what you pay. Hotel, meals, transport, permits, guide fees — all inclusive. No "optional" extras that aren\'t optional.',
    stat: '100% Transparent',
  },
  {
    icon: '📱',
    title: 'Reply in Under 60 Minutes',
    text: 'WhatsApp us any time. During peak season we\'re available 6 AM to 10 PM. A dedicated guide stays reachable throughout your journey.',
    stat: '<60 min',
  },
  {
    icon: '🛡',
    title: 'Licensed & Insured',
    text: 'IATA registered, Uttarakhand Tourism licensed, fully insured operations. Trek guides are certified by NCRD and carry first-aid kits on every route.',
    stat: 'Fully Licensed',
  },
  {
    icon: '🌍',
    title: 'Trusted by Travelers Worldwide',
    text: 'From Bengaluru to Birmingham, 2,847+ satisfied travellers across 30+ countries. International pricing with local expertise — the best of both worlds.',
    stat: '30+ Countries',
  },
  {
    icon: '✅',
    title: 'Book With Confidence',
    text: 'Confirm with just 30% advance. Full flexibility — reschedule up to 7 days before departure. 100% refund if we cancel due to weather or government restrictions.',
    stat: '30% to Book',
  },
];

const STEPS = [
  { num: '1', title: 'WhatsApp Us', text: 'Tell us your dates, group size, and interests. We respond within 1 hour with a custom plan.' },
  { num: '2', title: 'Get Your Itinerary', text: 'Receive a fully customised, all-inclusive package with transparent pricing. No obligation.' },
  { num: '3', title: 'Journey Begins', text: 'Confirm with 30% advance. We handle everything — from pickup to your final drop.' },
];

const TESTIMONIALS = [
  {
    stars: '★★★★★',
    quote: 'Junegiri made our Char Dham dream come true. Every hotel, every meal, every transfer was perfectly arranged. Felt like travelling with family, not a tour group.',
    author: 'Rajesh & Sunita Sharma',
    loc: 'Mumbai, Maharashtra',
    trip: 'Char Dham Yatra 9N/10D',
    avatar: 'RS',
  },
  {
    stars: '★★★★★',
    quote: 'Kedarkantha in December was pure magic — knee-deep snow, clear skies, and the best summit sunrise of my life. The guides were trained, safety-first, and genuinely fun.',
    author: 'Priya Nair',
    loc: 'Bengaluru, Karnataka',
    trip: 'Kedarkantha Trek 5N/6D',
    avatar: 'PN',
  },
  {
    stars: '★★★★★',
    quote: 'As a group of 12 from the UK, we were nervous about logistics. Junegiri handled everything flawlessly — airport transfer, mountain roads, even dietary requirements for 3 vegetarians.',
    author: 'David & Sarah Mitchell',
    loc: 'London, United Kingdom',
    trip: 'Do Dham Yatra 5N/6D',
    avatar: 'DM',
  },
  {
    stars: '★★★★★',
    quote: 'Valley of Flowers in August is indescribable. Our guide knew every flower species by name. The guesthouse at Ghangaria was cosy. Hemkund Sahib brought me to tears.',
    author: 'Ananya Krishnamurthy',
    loc: 'Hyderabad, Telangana',
    trip: 'Valley of Flowers Trek 4N/5D',
    avatar: 'AK',
  },
  {
    stars: '★★★★★',
    quote: 'Booked Rishikesh adventure package just 4 days before departure. They arranged everything — river rafting, bungee jump, beachside camping. Zero stress, maximum adventure.',
    author: 'Arjun Mehta',
    loc: 'Delhi, NCR',
    trip: 'Rishikesh Adventure Pack 2N/3D',
    avatar: 'AM',
  },
  {
    stars: '★★★★★',
    quote: 'My elderly parents wanted to do Badrinath and Kedarnath. Junegiri arranged helicopter for Kedarnath and a comfortable tempo traveller. Both of them walked out with the biggest smiles.',
    author: 'Kiran Desai',
    loc: 'Ahmedabad, Gujarat',
    trip: 'Do Dham Helicopter Package',
    avatar: 'KD',
  },
  {
    stars: '★★★★★',
    quote: 'Golden Triangle in April was fantastic. Private car, knowledgeable local guides, and the Taj at sunrise — everything they promised was delivered. Already planning Rajasthan next year.',
    author: 'Meena & Suresh Pillai',
    loc: 'Chennai, Tamil Nadu',
    trip: 'Golden Triangle 5N/6D',
    avatar: 'MP',
  },
  {
    stars: '★★★★★',
    quote: 'Three generations — grandparents, parents, kids. Junegiri customised the itinerary so everyone was happy. The grandparents got their darshan, the kids got their trek. Truly special.',
    author: 'The Kapoor Family',
    loc: 'Pune, Maharashtra',
    trip: 'Char Dham Yatra (Family Group)',
    avatar: 'KF',
  },
];

const DESTINATIONS = [
  { flag: '⛰️', name: 'Kedarnath' },
  { flag: '🛕', name: 'Char Dham' },
  { flag: '🕌', name: 'Taj Mahal' },
  { flag: '🌸', name: 'Valley of Flowers' },
  { flag: '🏰', name: 'Jaipur' },
  { flag: '🌊', name: 'Rishikesh' },
  { flag: '🙏', name: 'Varanasi' },
  { flag: '🌴', name: 'Kerala' },
  { flag: '🏖', name: 'Goa' },
  { flag: '🦚', name: 'Rajasthan' },
];

const TICKER_ITEMS = [
  '🏔 8+ Years of Himalayan Expertise',
  '⭐ 4.8/5 Rating — 312 Reviews',
  '✈ 2,847+ Happy Travelers',
  '🌍 International Pricing Available',
  '📱 Reply in Under 1 Hour',
  '✅ 100% Satisfaction Guarantee',
  '💰 Zero Hidden Costs. Ever.',
  '🕌 Char Dham Season 2025 Now Open',
];

const PKG_CATEGORIES: Record<string, string> = {
  'char-dham-yatra-9n-10d':       'Pilgrimage',
  'kedarnath-yatra-3n-4d':        'Pilgrimage',
  'do-dham-yatra-5n-6d':          'Pilgrimage',
  'golden-triangle-tour-5n-6d':   'Heritage',
  'taj-mahal-day-tour-from-delhi': 'Heritage',
};

const FILTERS = ['All', 'Pilgrimage', 'Heritage', 'Treks', 'Adventure'];

export default function HomePageClient() {
  const allPackages = getAllPackages();
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  useScrollReveal();

  const filteredPackages = activeFilter === 'All'
    ? allPackages
    : allPackages.filter(p => PKG_CATEGORIES[p.slug] === activeFilter);

  useEffect(() => {
    // Parallax on hero
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Trigger hero bg loaded class
    setTimeout(() => heroBgRef.current?.classList.add('loaded'), 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── HERO ───────────────────────────────── */}
      <section className="hero">
        <div
          ref={heroBgRef}
          className="hero-bg"
          style={{ backgroundImage: 'url(/images/kedarnath_temple_cover.jpg)' }}
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="container">
            <div style={{ maxWidth: 820 }}>
              <div className="hero-badge">
                ⛰️ Himalayan Season 2025 — Seats Filling Fast
              </div>

              <h1 className="hero-h1">
                India, the way
                <em>it was meant to be.</em>
              </h1>

              <p className="hero-sub">
                Pilgrimage. Peaks. Heritage. Adventure. Crafted by Haridwar&apos;s finest since 2017.
              </p>

              <div className="hero-ctas">
                <WaLink
                  href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip"
                  className="btn btn-wa btn-lg"
                  target="_blank" rel="noopener noreferrer"
                  label="hero_homepage"
                >
                  📱 Plan on WhatsApp
                </WaLink>
                <Link href="/packages/char-dham-yatra/" className="btn btn-gold btn-lg">
                  Explore Packages →
                </Link>
              </div>

              <div className="hero-stats">
                {[
                  ['2,847+', 'Happy Travelers'],
                  ['4.8 ★', '312 Reviews'],
                  ['8+ Yrs', 'Experience'],
                  ['₹0', 'Hidden Costs'],
                ].map(([num, lbl]) => (
                  <div key={lbl} className="hero-stat">
                    <span className="num">{num}</span>
                    <span className="lbl">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      {/* ── TICKER ─────────────────────────────── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ── JOURNEYS ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="s-label fade-in">Choose Your Journey</p>
          <h2 className="s-title fade-in">Four Worlds to <em>Explore</em></h2>
          <p className="s-sub fade-in">
            Every kind of India, perfectly curated — from the sacred to the spectacular
          </p>
          <div className="s-line" />

          <div className="journeys-grid">
            {JOURNEYS.map((j) => (
              <Link key={j.title} href={j.url} className="journey-card fade-in">
                <div
                  className="journey-card-img"
                  style={{ backgroundImage: `url('${j.img}')` }}
                />
                <div className="journey-card-overlay" />
                <div className="journey-card-body">
                  <div className="journey-card-tag">{j.tag}</div>
                  <div className="journey-card-title">{j.title}</div>
                  <div className="journey-card-sub">{j.sub}</div>
                  <div className="journey-card-arrow">Explore</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROMISE ─────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="s-label fade-in">Why Travel With Us</p>
          <h2 className="s-title fade-in">The <em>Junegiri</em> Promise</h2>
          <p className="s-sub fade-in">
            8 years of trust built one journey at a time. 2,847 travelers who came back — and brought their families.
          </p>
          <div className="s-line" />

          <div className="promise-grid fade-in">
            {WHY_CHOOSE.map((w, i) => (
              <div key={i} className="promise-card fade-in">
                <div className="promise-icon">{w.icon}</div>
                <div className="promise-stat">{w.stat}</div>
                <h3 className="promise-title">{w.title}</h3>
                <p className="promise-text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ───────────────────── */}
      <section className="section">
        <div className="container">
          <p className="s-label fade-in">Most Loved Trips</p>
          <h2 className="s-title fade-in">Featured <em>Packages</em></h2>
          <p className="s-sub fade-in">
            All-inclusive — hotel, meals, transport, guide. What you see is what you pay.
          </p>
          <div className="s-line" />

          <div className="pkg-tabs">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`pkg-tab${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="pkg-grid">
            {filteredPackages.map((pkg) => (
              <div key={pkg.slug} className="pkg-card fade-in">
                <div className="pkg-img" style={{ backgroundImage: `url('${pkg.hero_image}')` }}>
                  {pkg.tag && <span className="pkg-tag">{pkg.tag}</span>}
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <p className="pkg-dur">⏱ {pkg.duration}</p>
                  <div className="pkg-price-block">
                    <span className="price-primary">₹{pkg.price_from.toLocaleString('en-IN')}</span>
                    <span className="price-suffix">/person</span>
                  </div>
                  <p className="pkg-route">{pkg.destinations_short}</p>
                  <div className="pkg-btns">
                    <Link href={pkg.url} className="btn btn-outline-gold">Details</Link>
                    <WaLink
                      href={`https://wa.me/919873897652?text=${encodeURIComponent(pkg.wa_text)}`}
                      className="btn btn-wa"
                      target="_blank" rel="noopener noreferrer"
                      label={`package_card_${pkg.slug}`}
                    >
                      WhatsApp
                    </WaLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/packages/char-dham-yatra/" className="btn btn-outline-gold btn-lg fade-in">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="s-label fade-in">Simple Process</p>
          <h2 className="s-title fade-in">How It <em>Works</em></h2>
          <p className="s-sub fade-in">From first message to mountain summit — we make it effortless</p>
          <div className="s-line" />

          <div className="steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="step-card fade-in">
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-text">{s.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <WaLink
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip"
              className="btn btn-wa btn-lg fade-in"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex' }}
              label="mid_cta_homepage"
            >
              📱 Start on WhatsApp — Free
            </WaLink>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────── */}
      <section className="section test-section">
        <div className="container">
          <p className="s-label fade-in">Real Stories</p>
          <h2 className="s-title fade-in">Words from the <em>Mountains</em></h2>
          <div className="s-line" />

          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card fade-in">
                <div className="testi-stars">{t.stars}</div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-footer">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-author">{t.author}</div>
                    <div className="testi-loc">{t.loc}</div>
                    <div className="testi-trip">✓ Verified trip: {t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <p className="s-label fade-in">We Cover All of India</p>
          <h2 className="s-title fade-in" style={{ marginBottom: 36 }}>Where Will You <em>Go?</em></h2>
          <div className="dest-strip fade-in">
            {DESTINATIONS.map((d) => (
              <div key={d.name} className="dest-pill">
                <span className="flag">{d.flag}</span>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="section cta-section">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p className="s-label fade-in">Ready?</p>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: 16 }}>
            Your India Story<br /><em>Begins Here</em>
          </h2>
          <p className="s-sub fade-in" style={{ marginBottom: 36 }}>
            Tell us where you want to go. We&apos;ll build the perfect package for your group, dates, and budget. No obligation, reply guaranteed within 1 hour.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="fade-in">
            <WaLink
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20an%20India%20trip%20with%20Junegiri%20Yatra"
              className="btn btn-wa btn-lg"
              target="_blank" rel="noopener noreferrer"
              label="footer_cta_homepage"
            >
              📱 WhatsApp +91 98738 97652
            </WaLink>
            <Link href="/packages/char-dham-yatra/" className="btn btn-outline btn-lg">
              Browse Packages
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, color: 'var(--muted)' }} className="fade-in">
            🔒 No spam · No cold calls · Just your perfect India journey
          </p>
        </div>
      </section>

      {/* Schema injected by server wrapper page.tsx */}
    </>
  );
}
