'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPackages } from '@/lib/data';
import WaLink from '@/components/WaLink';

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Data ──────────────────────────────────────────────────────────────────────

const JOURNEYS = [
  {
    tag: 'Sacred Pilgrimage',
    title: 'Char Dham Yatra',
    sub: 'Kedarnath · Badrinath · Gangotri · Yamunotri',
    url: '/packages/char-dham-yatra/',
    img: '/images/kedarnath_temple_cover.webp',
  },
  {
    tag: 'High Altitude Treks',
    title: 'Himalayan Treks',
    sub: 'Kedarkantha · Valley of Flowers · Roopkund · Kuari Pass',
    url: '/himalayan-treks/',
    img: '/images/kedarkantha_1.webp',
  },
  {
    tag: 'Active Adventures',
    title: 'Rishikesh Thrills',
    sub: 'Rafting · Bungee · Camping · Kayaking · Yoga',
    url: '/rishikesh-from/',
    img: '/images/rishikesh_rafting.webp',
  },
  {
    tag: 'Iconic India',
    title: 'Heritage & Culture',
    sub: 'Delhi · Agra · Jaipur · Varanasi · Rajasthan',
    url: '/packages/golden-triangle-tour-5n-6d/',
    img: '/images/golden_triangle.webp',
  },
];

const PKG_TABS = [
  {
    label: 'Pilgrimages',
    slugs: ['char-dham-yatra-9n-10d', 'kedarnath-yatra-3n-4d', 'do-dham-yatra-5n-6d'],
  },
  {
    label: 'Treks',
    slugs: ['kedarkantha-trek-5n-6d', 'valley-of-flowers-trek-4n-5d', 'roopkund-trek-7n-8d'],
  },
  {
    label: 'Adventures & Escapes',
    slugs: ['rishikesh-adventure-pack-2n-3d', 'rishikesh-yoga-retreat-5n-6d', 'auli-snow-trip-3n-4d'],
  },
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
];

const FEATURED_QUOTE = {
  quote: 'Three generations — grandparents, parents, kids. Junegiri customised the itinerary so everyone was happy. The grandparents got their darshan, the kids got their trek. Truly special.',
  author: 'The Kapoor Family',
  loc: 'Pune, Maharashtra',
  trip: 'Char Dham Yatra — Family Group of 11',
};

const WHY_CHOOSE = [
  { icon: '🏔', stat: '8+ Years', title: 'Himalayan Expertise', text: 'Operating since 2017 across Uttarakhand in every season. We know every route, every shortcut, every weather window.' },
  { icon: '💰', stat: '₹0 Hidden', title: 'Zero Hidden Costs', text: 'Hotel, meals, transport, permits, guide fees — all inclusive. What we quote is what you pay. No fine print.' },
  { icon: '📱', stat: '< 60 min', title: 'Always Reachable', text: 'WhatsApp us any time. A dedicated guide stays reachable throughout your journey, 6 AM to 10 PM.' },
  { icon: '🌍', stat: 'Worldwide', title: 'Indian & International Guests', text: 'We host travellers from across India and overseas — international pricing with local expertise, the best of both worlds.' },
];

const STEPS = [
  { num: '01', title: 'WhatsApp Us', text: 'Tell us your dates, group size, and what calls to you. We reply within 1 hour with a custom plan.' },
  { num: '02', title: 'Get Your Plan', text: 'Receive a fully tailored, all-inclusive itinerary with transparent pricing. Zero obligation.' },
  { num: '03', title: 'Journey Begins', text: 'Confirm with 30% advance. We handle everything — from airport pickup to your final drop.' },
];

const TICKER_ITEMS = [
  '🏔 8+ Years of Himalayan Expertise',
  '⭐ 4.8/5 Rating — 312 Reviews',
  '✅ Uttarakhand Tourism Licensed (ATOI)',
  '🌍 International Pricing Available',
  '📱 Reply in Under 1 Hour',
  '✅ 100% Satisfaction Guarantee',
  '💰 Zero Hidden Costs. Ever.',
  '🕌 Char Dham Season 2026 — Open Now',
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function HomePageClient() {
  const allPackages = getAllPackages();
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  useScrollReveal();

  const tabPackages = PKG_TABS[activeTab].slugs
    .map(slug => allPackages.find(p => p.slug === slug))
    .filter(Boolean) as typeof allPackages;

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(1.05) translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    setTimeout(() => heroBgRef.current?.classList.add('loaded'), 100);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div ref={heroBgRef} className="hero-bg" style={{ background: 'none' }}>
          <Image
            src="/images/kedarnath_temple_cover.webp"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="container">
            <div style={{ maxWidth: 860 }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Est. 2017 · Haridwar, Uttarakhand
                </span>
              </div>

              <h1 className="hero-h1">
                India, exactly as it{' '}<br />
                <em>was meant to be.</em>
              </h1>

              <p className="hero-sub" style={{ fontSize: 17, maxWidth: 600 }}>
                Char Dham pilgrimages. Himalayan treks. Rishikesh adventures.
                Crafted privately for your group — no compromises.
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
                <Link href="/packages/" className="btn btn-outline btn-lg">
                  Explore Packages →
                </Link>
              </div>

              <div className="hero-stats">
                {[
                  ['4.8 ★', '312 Reviews'],
                  ['8+ Yrs', 'Experience'],
                  ['ATOI', 'Licensed'],
                  ['24×7', 'On-Trip Support'],
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

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
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

      {/* ── CHOOSE YOUR JOURNEY ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="s-label fade-in">Choose Your Journey</p>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Four Worlds to <em>Explore</em>
          </h2>
          <p className="s-sub fade-in">Every kind of India, perfectly curated — from the sacred to the spectacular</p>
          <div className="s-line" />

          {/* Editorial 2-col layout: 1 tall feature + 3 stacked */}
          <div className="ed-journeys fade-in">
            {/* Feature card — Char Dham */}
            <Link href={JOURNEYS[0].url} className="journey-card ed-feature">
              <div className="journey-card-img" style={{ backgroundImage: `url('${JOURNEYS[0].img}')` }} />
              <div className="journey-card-overlay" />
              <div className="journey-card-body" style={{ padding: '32px 28px' }}>
                <div className="journey-card-tag">{JOURNEYS[0].tag}</div>
                <div className="journey-card-title" style={{ fontSize: '1.7rem', marginBottom: 8 }}>{JOURNEYS[0].title}</div>
                <div className="journey-card-sub" style={{ maxHeight: 60, fontSize: 13, color: 'rgba(255,248,238,0.7)' }}>{JOURNEYS[0].sub}</div>
                <div className="journey-card-arrow" style={{ opacity: 1, transform: 'none', marginTop: 16 }}>Explore</div>
              </div>
            </Link>

            {/* Side 3 stacked cards */}
            <div className="ed-side">
              {JOURNEYS.slice(1).map((j) => (
                <Link key={j.title} href={j.url} className="journey-card ed-side-card">
                  <div className="journey-card-img" style={{ backgroundImage: `url('${j.img}')` }} />
                  <div className="journey-card-overlay" />
                  <div className="journey-card-body" style={{ padding: '18px 20px' }}>
                    <div className="journey-card-tag">{j.tag}</div>
                    <div className="journey-card-title" style={{ fontSize: '1.05rem' }}>{j.title}</div>
                    <div className="journey-card-sub">{j.sub}</div>
                    <div className="journey-card-arrow">Explore</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES WITH TABS ───────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="s-label fade-in">Most Loved Trips</p>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Find Your <em>Perfect Trip</em>
          </h2>
          <p className="s-sub fade-in">
            All-inclusive — hotel, meals, transport, guide &amp; permits. What you see is what you pay.
          </p>
          <div className="s-line" />

          {/* Category Tabs */}
          <div className="hp-tabs fade-in">
            {PKG_TABS.map((tab, i) => (
              <button
                key={tab.label}
                className={`hp-tab${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Package Cards — 3 per tab */}
          <div className="pkg-grid">
            {tabPackages.map((pkg) => (
              <div key={pkg.slug} className="pkg-card fade-in">
                <div className="pkg-img" style={{ backgroundImage: `url('${pkg.hero_image}')`, height: 240 }}>
                  {pkg.tag && <span className="pkg-tag">{pkg.tag}</span>}
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <p className="pkg-dur">⏱ {pkg.duration}</p>
                  <div className="pkg-price-block">
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginRight: 4 }}>From</span>
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

          <div style={{ textAlign: 'center', marginTop: 52 }} className="fade-in">
            <Link href="/packages/" className="btn btn-outline-gold btn-lg">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '96px 0', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        {/* Background number */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(180px, 20vw, 280px)', fontWeight: 900, color: 'rgba(201,146,61,0.04)', whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none', letterSpacing: '-10px' }}>
          ★★★★★
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 32 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: '#F5C842', fontSize: 20 }}>★</span>
            ))}
          </div>
          <blockquote className="fade-in" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', fontWeight: 700, color: 'var(--heading)', lineHeight: 1.6, maxWidth: 860, margin: '0 auto 36px', letterSpacing: '-0.3px' }}>
            &ldquo;{FEATURED_QUOTE.quote}&rdquo;
          </blockquote>
          <div className="fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#07051A', flexShrink: 0 }}>
              KF
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: 'var(--heading)', fontSize: 15 }}>{FEATURED_QUOTE.author}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{FEATURED_QUOTE.loc} · ✓ {FEATURED_QUOTE.trip}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p className="s-label fade-in">Simple Process</p>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            From Message to <em>Mountain</em>
          </h2>
          <p className="s-sub fade-in">We make it effortless — you just show up and experience</p>
          <div className="s-line" />

          <div className="steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="step-card fade-in">
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold), var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 20, fontWeight: 900, color: '#07051A', letterSpacing: '-1px', boxShadow: '0 8px 28px rgba(201,146,61,0.35)' }}>
                  {s.num}
                </div>
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
              📱 Start Planning — Free
            </WaLink>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="s-label fade-in">Real Stories</p>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Words from the <em>Mountains</em>
          </h2>
          <p className="s-sub fade-in">4.8 stars across 312 verified reviews</p>
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
                    <div className="testi-trip">✓ Verified: {t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JUNEGIRI — IMAGE + REASONS ───────────────────────────────── */}
      <section className="section" style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="why-split fade-in">

            {/* Left — image */}
            <div className="why-img-wrap">
              <div style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src="/images/kedarnath2.webp"
                  alt="Kedarnath — Junegiri Yatra"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                />
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(13,10,38,0.9) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>Est. 2017 · Haridwar</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                  Born in the shadow of the Himalayas.<br />Built on trust.
                </div>
              </div>
            </div>

            {/* Right — reasons */}
            <div className="why-reasons">
              <p className="s-label" style={{ textAlign: 'left' }}>Why Travel With Us</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'var(--heading)', marginBottom: 8, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                The <em style={{ fontStyle: 'normal', color: 'var(--gold2)' }}>Junegiri</em> Promise
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 40, lineHeight: 1.7 }}>
                Operating from Haridwar since 2017. Every single journey crafted with the same care we&apos;d give our own family.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {WHY_CHOOSE.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(201,146,61,0.12)', border: '1px solid rgba(201,146,61,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {w.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, color: 'var(--heading)', fontSize: 15 }}>{w.title}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(201,146,61,0.1)', border: '1px solid rgba(201,146,61,0.25)', padding: '2px 8px', borderRadius: 50 }}>{w.stat}</span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{w.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="section cta-section">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>Ready to go?</span>
            <span style={{ width: 32, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
          </div>
          <h2 className="s-title fade-in" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', marginBottom: 16 }}>
            Your India Story<br /><em>Begins Here</em>
          </h2>
          <p className="s-sub fade-in" style={{ marginBottom: 40, fontSize: 16 }}>
            Tell us where you want to go. We&apos;ll build the perfect package<br className="hide-sm" /> for your group, dates, and budget. No obligation — reply in under 1 hour.
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
            <Link href="/packages/" className="btn btn-outline btn-lg">
              Browse All Packages
            </Link>
          </div>
          <p style={{ marginTop: 28, fontSize: 12, color: 'var(--muted)' }} className="fade-in">
            🔒 No spam · No cold calls · Just your perfect India journey
          </p>
        </div>
      </section>
    </>
  );
}
