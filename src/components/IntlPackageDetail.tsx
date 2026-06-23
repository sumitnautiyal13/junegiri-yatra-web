'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';
import type { IntlCity } from '@/components/IntlCityPage';

// ─── Types (exported so page.tsx can use them) ────────────────────────────────

export interface PricingRow { label: string; usd: number; note?: string }
export interface ItineraryDay { day: string; title: string; desc: string }

export interface IntlPkg {
  slug: string;
  name: string;
  duration: string;
  tag?: string;
  difficulty: string;
  intl_price_usd: number;
  hero_image: string;
  destinations_short: string;
  hero_tagline: string;
  overview?: string;
  highlights?: string[];
  route_stops?: string[];
  itinerary?: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  pricing?: PricingRow[];
  faq?: { q: string; a: string }[];
  testimonials?: { quote: string; author: string; location: string; flag: string }[];
  guide_name?: string;
  guide_credentials?: string;
  guide_experience_years?: number;
}

interface Props {
  pkg: IntlPkg;
  related: IntlPkg[];
  popularCities: IntlCity[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const WA_NUMBER = '919873897652';
const buildWaLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const DIFF_STYLE: Record<string, { bg: string; color: string }> = {
  Easy:        { bg: 'rgba(34,197,94,0.18)',  color: '#4ade80' },
  Moderate:    { bg: 'rgba(201,146,61,0.18)', color: 'var(--gold2)' },
  Challenging: { bg: 'rgba(249,115,22,0.18)', color: '#fb923c' },
  Difficult:   { bg: 'rgba(239,68,68,0.18)',  color: '#f87171' },
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function IntlPackageDetail({ pkg, related, popularCities }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroWaLink = buildWaLink(
    `Hello! I'm interested in the "${pkg.name}" (${pkg.duration}). Please share availability and pricing.`,
  );

  const highlights = pkg.highlights ?? [
    `${pkg.duration} curated itinerary`,
    'Private AC Innova Crysta for all transfers',
    'ITMB-certified English-speaking guide',
    '3-star hotels with breakfast included',
    'All permits & entrance fees',
    '24/7 WhatsApp support from Haridwar',
  ];

  const included = pkg.included ?? [
    'Delhi airport pickup & drop',
    'All inter-city transfers in private AC SUV',
    '3-star hotel accommodation with breakfast',
    'ITMB-certified English guide throughout',
    'All trek/site entry permits',
    'Basic first-aid & altitude kit on trek',
    '24/7 WhatsApp operations support',
  ];

  const excluded = pkg.excluded ?? [
    'International flights to/from Delhi',
    'Indian visa fees (we guide the process)',
    'Travel insurance (mandatory)',
    'Personal expenses & shopping',
    'Lunches & dinners unless specified',
    'Tips & gratuities',
  ];

  const pricing: PricingRow[] = pkg.pricing ?? [
    { label: 'Solo traveler',  usd: Math.round(pkg.intl_price_usd * 1.25), note: 'Single supplement applies' },
    { label: 'Couple (2 pax)', usd: pkg.intl_price_usd,                    note: 'Per person' },
    { label: 'Group 3–4 pax',  usd: Math.round(pkg.intl_price_usd * 0.92), note: 'Per person' },
    { label: 'Group 5+ pax',   usd: Math.round(pkg.intl_price_usd * 0.85), note: 'Per person · best value' },
  ];

  const faqs = pkg.faq ?? [
    {
      q: `How physically demanding is ${pkg.name}?`,
      a: `Rated ${pkg.difficulty}. ${pkg.difficulty === 'Easy' ? 'Suitable for average fitness — moderate walking on well-maintained paths.' : pkg.difficulty === 'Moderate' ? 'Some uphill sections. Regular walkers handle this well. Altitude acclimatization included.' : 'Designed for trekkers with prior hiking experience. 4–6 weeks of fitness prep recommended.'}`,
    },
    { q: 'What is the best time of year?', a: 'April–June and September–November offer clear skies and stable weather. We advise the ideal window based on your dates.' },
    { q: 'What should I pack?', a: 'We send a detailed packing list post-booking. Essentials: layered clothing, good trekking shoes, personal meds, daypack. Heavy gear carried by our support team.' },
    { q: 'How do I get from my country to the trek start?', a: 'Fly to Delhi (DEL). Our driver meets you at arrivals with a name board. Guide joins at Haridwar/Rishikesh.' },
    { q: 'Can the itinerary be customized?', a: 'Yes — all packages are fully private. We can adjust duration, add extension days, or combine destinations. WhatsApp us for a custom proposal.' },
  ];

  const testimonials = pkg.testimonials ?? [
    { quote: 'An absolutely transformative experience. The guide was exceptional and everything was handled perfectly.', author: 'James T.', location: 'Sydney, Australia', flag: '🇦🇺' },
    { quote: "Worth every dollar. Private vehicle made all the difference. India's Himalayas are something else.", author: 'Mia H.', location: 'Amsterdam, Netherlands', flag: '🇳🇱' },
    { quote: "Booked solo, felt safe throughout. WhatsApp support is real — they replied at 11pm. Exceptional.", author: 'Fatima R.', location: 'Dubai, UAE', flag: '🇦🇪' },
  ];

  const diff = DIFF_STYLE[pkg.difficulty] ?? { bg: 'rgba(100,116,139,0.2)', color: 'var(--muted)' };

  return (
    <>
      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '10px 0' }}>
        <div className="container">
          <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
            <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/international/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>International Tours</Link>
            <span>›</span>
            <span style={{ color: 'var(--text)' }}>{pkg.name}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="city-hero">
        <Image
          src={pkg.hero_image}
          alt={pkg.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          {pkg.tag && (
            <div style={{ display: 'inline-block', background: 'var(--gold)', color: '#07051A', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 14 }}>
              {pkg.tag}
            </div>
          )}
          <h1 className="city-hero-h1">{pkg.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 999, background: diff.bg, color: diff.color }}>{pkg.difficulty}</span>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>📅 {pkg.duration}</span>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>📍 {pkg.destinations_short}</span>
          </div>
          <p className="city-hero-sub">{pkg.hero_tagline}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <div>
              <span style={{ fontSize: 36, fontWeight: 900, color: 'var(--gold2)' }}>${pkg.intl_price_usd}</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', marginLeft: 6 }}>/person</span>
            </div>
            <WaLink href={heroWaLink} label={`intl_pkg_hero_${pkg.slug}`} className="btn-gold-hero">
              📲 WhatsApp for Quote
            </WaLink>
            <Link href="/international/" className="btn btn-outline" style={{ borderRadius: 50, padding: '12px 24px' }}>
              ← All Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS BAR ─────────────────────────────────────────────── */}
      <div className="city-hook">
        <div className="container">
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>Package Highlights</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px 24px' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
                <span style={{ color: 'var(--gold2)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── OVERVIEW ───────────────────────────────────────────────────── */}
      {pkg.overview && (
        <section className="city-section">
          <div className="container">
            <h2 className="s-title">What to <em>Expect</em></h2>
            <div className="s-line" />
            <p style={{ maxWidth: 760, margin: '0 auto', fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, textAlign: 'center' }}>{pkg.overview}</p>
          </div>
        </section>
      )}

      {/* ── ROUTE OVERVIEW ─────────────────────────────────────────────── */}
      {pkg.route_stops && pkg.route_stops.length > 0 && (
        <section className="city-section city-section-dark">
          <div className="container">
            <h2 className="s-title">Route <em>Overview</em></h2>
            <div className="s-line" />
            <div style={{ maxWidth: 540, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              {pkg.route_stops.map((stop, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--gold),var(--gold2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#07051A', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    {i < pkg.route_stops!.length - 1 && (
                      <div style={{ width: 2, height: 28, background: 'rgba(201,146,61,0.25)', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: 24 }}>
                    <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: 15 }}>{stop}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ITINERARY ──────────────────────────────────────────────────── */}
      {pkg.itinerary && pkg.itinerary.length > 0 && (
        <section className="city-section">
          <div className="container">
            <h2 className="s-title">Detailed <em>Itinerary</em></h2>
            <div className="s-line" />
            <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pkg.itinerary.map((day, i) => (
                <ItineraryItem key={i} day={day} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INCLUDED / EXCLUDED ────────────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="s-title">What&apos;s <em>Included</em></h2>
          <div className="s-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, maxWidth: 860, margin: '0 auto', textAlign: 'left' }}>
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#4ade80', fontSize: 13, marginBottom: 16 }}>✓ Included in Package</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {included.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
                    <span style={{ color: '#4ade80', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#f87171', fontSize: 13, marginBottom: 16 }}>✗ Not Included</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {excluded.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
                    <span style={{ color: '#f87171', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ──────────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="s-title">Package <em>Pricing</em></h2>
          <p className="s-sub">All prices in USD · 30% deposit to confirm booking</p>
          <div className="s-line" />
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(201,146,61,0.08)', borderBottom: '1px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Group Size</th>
                    <th style={{ textAlign: 'right', padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Price / Person</th>
                    <th style={{ textAlign: 'right', padding: '12px 20px', fontSize: 11, fontWeight: 700, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < pricing.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{row.label}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: 'var(--gold2)' }}>${row.usd}</span>
                      </td>
                      <td style={{ padding: '14px 20px', textAlign: 'right', fontSize: 12, color: 'var(--muted)' }}>{row.note ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 16 }}>
              <WaLink href={heroWaLink} label={`intl_pkg_pricing_${pkg.slug}`} className="btn btn-wa">
                📲 Get Custom Quote on WhatsApp
              </WaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDE ──────────────────────────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="s-title">Your <em>Guide</em></h2>
          <div className="s-line" />
          <div style={{ background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, maxWidth: 540, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(201,146,61,0.12)', border: '2px solid rgba(201,146,61,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                🧭
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>
                  {pkg.guide_name ?? 'ITMB-Certified Himalayan Guide'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--gold2)', marginBottom: 10 }}>
                  {pkg.guide_experience_years ? `${pkg.guide_experience_years}+ years` : '10+ years'} Himalayan experience
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
                  {pkg.guide_credentials ?? 'ITMB-certified, wilderness first-aid trained, and fluent in English. Every trail, altitude challenge, and emergency protocol is second nature.'}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['ITMB Certified', 'Wilderness First Aid', 'Fluent English', 'Local Expert'].map((b) => (
                    <span key={b} style={{ fontSize: 11, background: 'rgba(201,146,61,0.1)', border: '1px solid var(--border)', color: 'var(--muted)', padding: '3px 10px', borderRadius: 999 }}>{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="s-title">What <em>Travelers Say</em></h2>
          <div className="s-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, maxWidth: 900, margin: '0 auto', textAlign: 'left' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="pkg-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 12 }}>❝</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>{t.quote}</p>
                <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{t.flag} {t.author}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="s-title">Frequently Asked <em>Questions</em></h2>
          <div className="s-line" />
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => (
              <div key={i} className="faq-item" style={{ background: openFaq === i ? 'var(--card2)' : 'var(--card)', borderColor: openFaq === i ? 'rgba(201,146,61,0.4)' : undefined }}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '16px 20px', color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                  <span>{f.q}</span>
                  <span style={{ color: 'var(--gold2)', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
                </button>
                {openFaq === i && (
                  <div className="faq-a" style={{ padding: '0 20px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPARTURE CITIES ───────────────────────────────────────────── */}
      {popularCities.length > 0 && (
        <section className="city-section">
          <div className="container">
            <h2 className="s-title">Book from <em>Your City</em></h2>
            <p className="s-sub">Personalised flight info, visa details & local pricing for your city.</p>
            <div className="s-line" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, maxWidth: 860, margin: '0 auto' }}>
              {popularCities.map((city) => (
                <Link key={city.slug} href={`/india-trek-packages/from/${city.slug}/`} style={{ textDecoration: 'none' }}>
                  <div className="route-card" style={{ textAlign: 'center', padding: '16px 12px' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{city.flag}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{city.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{city.flight_hours_to_delhi}h flight</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED ────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="city-section city-section-dark">
          <div className="container">
            <h2 className="s-title">You Might <em>Also Like</em></h2>
            <div className="s-line" />
            <div className="pkg-grid">
              {related.map((rp) => {
                const rpDiff = DIFF_STYLE[rp.difficulty] ?? { bg: 'rgba(100,116,139,0.2)', color: 'var(--muted)' };
                return (
                  <div key={rp.slug} className="pkg-card">
                    <div className="pkg-img">
                      <Image src={rp.hero_image} alt={rp.name} fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="pkg-body">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: rpDiff.bg, color: rpDiff.color }}>{rp.difficulty}</span>
                        <span className="pkg-dur">{rp.duration}</span>
                      </div>
                      <div className="pkg-name">{rp.name}</div>
                      <div className="pkg-price-block">
                        <span className="price-primary">${rp.intl_price_usd}</span>
                        <span className="price-suffix">/person</span>
                      </div>
                      <div className="pkg-btns">
                        <Link href={`/international/${rp.slug}/`} className="btn btn-outline-gold">View Details</Link>
                        <WaLink href={buildWaLink(`Hello! Interested in "${rp.name}". Please share details.`)} label={`intl_pkg_related_${rp.slug}`} className="btn btn-wa">📲 WhatsApp</WaLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="city-section" style={{ background: 'linear-gradient(135deg,rgba(201,146,61,0.1) 0%,rgba(201,146,61,0.03) 100%)', textAlign: 'center', borderTop: '1px solid rgba(201,146,61,0.2)' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏔️</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>Ready to book {pkg.name}?</h2>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 28 }}>
            WhatsApp us with your travel dates and group size. Custom quote within 60 minutes — free, no obligation.
          </p>
          <WaLink href={heroWaLink} label={`intl_pkg_cta_${pkg.slug}`} className="btn-gold-hero" style={{ fontSize: 16 }}>
            📲 WhatsApp for Custom Quote
          </WaLink>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14 }}>Free itinerary · No booking fee · 30% deposit to confirm dates</p>
        </div>
      </section>
    </>
  );
}

// ─── Itinerary accordion item ─────────────────────────────────────────────────

function ItineraryItem({ day }: { day: ItineraryDay }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ background: open ? 'var(--card2)' : 'var(--card)', borderColor: open ? 'rgba(201,146,61,0.4)' : undefined }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ background: 'linear-gradient(135deg,var(--gold),var(--gold2))', color: '#07051A', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '1px', flexShrink: 0 }}>
          {day.day}
        </span>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', flex: 1 }}>{day.title}</span>
        <span style={{ color: 'var(--gold2)', flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 16px', fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{day.desc}</div>
      )}
    </div>
  );
}
