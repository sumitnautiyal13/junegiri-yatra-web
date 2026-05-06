'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllPackages } from '@/lib/data';

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
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Kedarnath_Temple.jpg/1280px-Kedarnath_Temple.jpg',
    color: '#C9923D',
  },
  {
    tag: 'High Altitude Treks',
    title: 'Himalayan Treks',
    sub: 'Kedarkantha · Valley of Flowers · Hampta Pass · Kuari Pass',
    url: '/packages/char-dham-yatra/',
    img: 'https://images.unsplash.com/photo-1585016495481-91486cc13fe5?w=900&q=80',
    color: '#5B9BD5',
  },
  {
    tag: 'Iconic India',
    title: 'Golden Triangle',
    sub: 'Delhi · Agra · Jaipur · Taj Mahal',
    url: '/packages/golden-triangle/',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg',
    color: '#C97B3D',
  },
  {
    tag: 'Active Adventures',
    title: 'Rishikesh Thrills',
    sub: 'Rafting · Bungee · Camping · Kayaking · Yoga',
    url: '/packages/char-dham-yatra/',
    img: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=900&q=80',
    color: '#3DC9A0',
  },
];

const PROMISE = [
  {
    icon: '🏔',
    title: 'Himalayan Experts',
    text: '8+ years operating across Uttarakhand. We know every mountain road, every seasonal window, every hidden gem.',
  },
  {
    icon: '💰',
    title: 'Zero Hidden Costs',
    text: 'What we quote is what you pay. Hotel, meals, transport, permits — all included. No surprises at the end.',
  },
  {
    icon: '📱',
    title: '24/7 WhatsApp Support',
    text: 'Reply within minutes during season. A dedicated guide on call throughout your journey. Never alone.',
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
    quote: 'Junegiri made our Char Dham dream come true. Every hotel, every meal, every transfer was perfectly arranged. Felt like traveling with family.',
    author: 'Rajesh & Sunita Sharma',
    loc: 'Mumbai, Maharashtra',
  },
  {
    stars: '★★★★★',
    quote: 'We were a group of 12 from the UK. The international pricing was fair and transparent. Nothing like paying inflated "tourist rates" elsewhere in India.',
    author: 'David & Sarah Mitchell',
    loc: 'London, United Kingdom',
  },
  {
    stars: '★★★★★',
    quote: 'Kedarkantha trek in December — absolutely magical. The guides were experienced, safety was top priority, and the views were beyond words.',
    author: 'Priya Nair',
    loc: 'Bengaluru, Karnataka',
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

export default function HomePage() {
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
          style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Kedarnath_Temple.jpg/1280px-Kedarnath_Temple.jpg)' }}
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
                <a
                  href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip"
                  className="btn btn-wa btn-lg"
                  target="_blank" rel="noopener noreferrer"
                >
                  📱 Plan on WhatsApp
                </a>
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
            {PROMISE.map((p) => (
              <div key={p.title} className="promise-card">
                <div className="promise-icon">{p.icon}</div>
                <div className="promise-title">{p.title}</div>
                <p className="promise-text">{p.text}</p>
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
                    <a
                      href={`https://wa.me/919873897652?text=${encodeURIComponent(pkg.wa_text)}`}
                      className="btn btn-wa"
                      target="_blank" rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
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
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip"
              className="btn btn-wa btn-lg fade-in"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex' }}
            >
              📱 Start on WhatsApp — Free
            </a>
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
              <div key={i} className="test-card fade-in">
                <div className="test-stars">{t.stars}</div>
                <p className="test-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="test-divider" />
                <div className="test-author">{t.author}</div>
                <div className="test-loc">{t.loc}</div>
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
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20an%20India%20trip%20with%20Junegiri%20Yatra"
              className="btn btn-wa btn-lg"
              target="_blank" rel="noopener noreferrer"
            >
              📱 WhatsApp +91 98738 97652
            </a>
            <Link href="/packages/char-dham-yatra/" className="btn btn-outline btn-lg">
              Browse Packages
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, color: 'var(--muted)' }} className="fade-in">
            🔒 No spam · No cold calls · Just your perfect India journey
          </p>
        </div>
      </section>

      {/* ── SCHEMA ───────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Junegiri Yatra',
            url: 'https://junegiriyatra.com',
            logo: 'https://junegiriyatra.com/assets/logo.png',
            telephone: '+919873897652',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Haridwar',
              addressRegion: 'Uttarakhand',
              addressCountry: 'IN',
            },
            description: 'India tour operator specialising in Char Dham Yatra, Himalayan treks, Golden Triangle, Rishikesh adventures and luxury India tours.',
            aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 312 },
            sameAs: ['https://www.junegiriyatra.com'],
          }),
        }}
      />
    </>
  );
}
