'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Package } from '@/types';
import PriceDisplay from '@/components/PriceDisplay';
import trekSeasons from '../../../../../data/trek-seasons.json';

export interface MonthData {
  title: string;
  meta_description: string;
  h1: string;
  tagline: string;
  weather: string;
  trail_condition: string;
  crowd_level: string;
  price: number;
  highlights: string[];
  what_to_pack: string[];
  faq: { q: string; a: string }[];
}

interface Props {
  pkg: Package;
  month: string;
  monthData: MonthData;
}

const MONTH_LABELS: Record<string, string> = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
};

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function MonthPage({ pkg, month, monthData }: Props) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const monthLabel = MONTH_LABELS[month] ?? cap(month);

  // Derive related months for this trek
  const trekEntry = (trekSeasons as Record<string, { months: string[]; best_months: string[] }>)[pkg.slug];
  const otherMonths = trekEntry?.months.filter((m) => m !== month) ?? [];
  const bestMonths = new Set(trekEntry?.best_months ?? []);

  // JSON-LD schemas
  const touristTripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: monthData.title,
    description: monthData.meta_description,
    touristType: 'Adventure',
    image: pkg.hero_image,
    offers: {
      '@type': 'Offer',
      price: monthData.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://junegiriyatra.com/packages/${pkg.slug}/${month}/`,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Junegiri Yatra',
      url: 'https://junegiriyatra.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: monthData.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const waText = `Hi, I'm interested in the ${pkg.name} in ${monthLabel}. Please share details and availability.`;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── 1. HERO ── */}
      <section className="pkg-hero">
        <div
          className="pkg-hero-bg"
          style={{ backgroundImage: `url('${pkg.hero_image}')` }}
        />
        <div className="pkg-hero-content">
          <div className="container">
            <div className="pkg-quick-info">
              <span className="pkg-info-pill">⏱ {pkg.duration}</span>
              <span className="pkg-info-pill">📅 {monthLabel}</span>
              <span className="pkg-info-pill">🏔 {pkg.difficulty}</span>
              <span className="pkg-info-pill">🏨 All Inclusive</span>
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: monthData.h1 }} />
            <p className="pkg-tagline">{monthData.tagline}</p>
            <div className="pkg-price-row">
              <div className="pkg-price-card">
                <div className="pkg-price-label">Starting From</div>
                <PriceDisplay
                  inrPrice={monthData.price}
                  usdIntlPrice={pkg.intl_price_usd}
                  showInrRef={true}
                  suffix="/ person"
                />
              </div>
              <div className="pkg-cta-group">
                <a
                  href={`https://wa.me/919873897652?text=${encodeURIComponent(waText)}`}
                  className="btn btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 WhatsApp Booking
                </a>
                <Link href={pkg.url} className="btn btn-outline">
                  Full Itinerary
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href={pkg.url}>{pkg.name}</Link></li>
            <li>{monthLabel}</li>
          </ol>
        </div>
      </nav>

      {/* ── 2. WEATHER CARD ROW ── */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: 28,
              color: '#fff',
            }}
          >
            {monthLabel} Conditions at a Glance
          </h2>
          <div className="qi-row">
            <div className="qi-card">
              <div className="qi-label">🌡 Weather</div>
              <div className="qi-value" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {monthData.weather}
              </div>
            </div>
            <div className="qi-card">
              <div className="qi-label">🥾 Trail Condition</div>
              <div className="qi-value" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {monthData.trail_condition}
              </div>
            </div>
            <div className="qi-card">
              <div className="qi-label">👥 Crowd Level</div>
              <div className="qi-value" style={{ fontSize: 13, lineHeight: 1.5 }}>
                {monthData.crowd_level}
              </div>
            </div>
            <div className="qi-card">
              <div className="qi-label">💰 Price</div>
              <div className="qi-value">
                <PriceDisplay
                  inrPrice={monthData.price}
                  usdIntlPrice={pkg.intl_price_usd}
                  showInrRef={false}
                  suffix="/ person"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT TO EXPECT — HIGHLIGHTS ── */}
      <section
        className="section"
        style={{
          paddingTop: 0,
          paddingBottom: 56,
          background: 'var(--card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              paddingTop: 56,
              marginBottom: 28,
              color: '#fff',
            }}
          >
            What to Expect in {monthLabel}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {monthData.highlights.map((hl, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card2)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '20px 22px',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    color: 'var(--gold2)',
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                    lineHeight: 1.4,
                  }}
                >
                  ✦
                </span>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>
                  {hl}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHAT TO PACK ── */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: 28,
              color: '#fff',
            }}
          >
            What to Pack for {monthLabel}
          </h2>
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '28px 32px',
              maxWidth: 680,
            }}
          >
            {monthData.what_to_pack.map((item, i) => (
              <div
                key={i}
                className="inc-item"
                style={{ borderBottom: i < monthData.what_to_pack.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: 10, marginBottom: 10 }}
              >
                <span className="ck">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PACKAGE CTA ── */}
      <section
        className="section cta-section"
        style={{
          paddingTop: 56,
          paddingBottom: 56,
          background: 'var(--card2)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 800,
              marginBottom: 12,
              color: '#fff',
            }}
          >
            Ready to Trek in {monthLabel}?
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 15,
              maxWidth: 560,
              margin: '0 auto 32px',
              lineHeight: 1.7,
            }}
          >
            Secure your spot for {pkg.name} in {monthLabel}. Limited group sizes — book early
            to avoid missing out.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={`https://wa.me/919873897652?text=${encodeURIComponent(waText)}`}
              className="btn btn-wa btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 Book via WhatsApp
            </a>
            <Link href={pkg.url} className="btn btn-outline-gold btn-lg">
              View Full Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ACCORDION ── */}
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: 28,
              color: '#fff',
            }}
          >
            Frequently Asked Questions — {monthLabel}
          </h2>
          <div style={{ maxWidth: 800 }}>
            {monthData.faq.map((item, i) => (
              <div
                key={i}
                className={`faq-item${activeFaq === i ? ' active' : ''}`}
              >
                <button
                  className="faq-q"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  aria-expanded={activeFaq === i}
                >
                  {item.q}
                  <span className="faq-arrow">▾</span>
                </button>
                <div className="faq-a">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RELATED MONTHS ── */}
      {otherMonths.length > 0 && (
        <section
          className="section"
          style={{
            paddingTop: 56,
            paddingBottom: 72,
            background: 'var(--card)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="container">
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: 8,
                color: '#fff',
              }}
            >
              Other Months for {pkg.name}
            </h2>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: 14,
                marginBottom: 28,
              }}
            >
              This trek runs across multiple seasons — explore other windows.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {otherMonths.map((m) => {
                const isBest = bestMonths.has(m);
                return (
                  <Link
                    key={m}
                    href={`/packages/${pkg.slug}/${m}/`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      borderRadius: 50,
                      border: `1px solid ${isBest ? 'var(--gold)' : 'var(--border)'}`,
                      background: isBest
                        ? 'rgba(201,146,61,0.12)'
                        : 'var(--card2)',
                      color: isBest ? 'var(--gold2)' : 'var(--text)',
                      fontSize: 13,
                      fontWeight: isBest ? 700 : 500,
                      transition: 'all .2s',
                      textDecoration: 'none',
                    }}
                  >
                    {MONTH_LABELS[m] ?? cap(m)}
                    {isBest && (
                      <span
                        style={{
                          background: 'var(--gold)',
                          color: '#07051A',
                          fontSize: 10,
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: 20,
                          letterSpacing: 0.5,
                        }}
                      >
                        BEST
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
