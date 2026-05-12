'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface MonthData {
  month: string;
  status: 'open' | 'closed' | 'limited';
  weather: string;
  crowds: string;
  price_note: string;
  score: number;
  verdict: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface BestTimeDestination {
  slug: string;
  name: string;
  title: string;
  meta_description: string;
  h1: string;
  tagline: string;
  hero_image: string;
  overview: string;
  package_slug: string;
  package_price: number;
  months: MonthData[];
  quick_facts: QuickFact[];
  faq: FAQ[];
}

interface Props {
  destination: BestTimeDestination;
}

const WA_NUMBER = '919897702777';

function ScoreStars({ score }: { score: number }) {
  if (score === 0) return <span style={{ color: 'var(--muted)', fontSize: '13px' }}>—</span>;
  return (
    <span style={{ fontSize: '13px', letterSpacing: '1px' }}>
      {'⭐'.repeat(score)}
    </span>
  );
}

function StatusBadge({ status }: { status: MonthData['status'] }) {
  const styles: Record<MonthData['status'], React.CSSProperties> = {
    open: {
      background: 'rgba(94,189,122,0.15)',
      border: '1px solid rgba(94,189,122,0.4)',
      color: '#5EBD7A',
      padding: '3px 10px',
      borderRadius: '50px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
    closed: {
      background: 'rgba(229,115,115,0.15)',
      border: '1px solid rgba(229,115,115,0.4)',
      color: '#E57373',
      padding: '3px 10px',
      borderRadius: '50px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
    limited: {
      background: 'rgba(255,193,7,0.15)',
      border: '1px solid rgba(255,193,7,0.4)',
      color: '#FFC107',
      padding: '3px 10px',
      borderRadius: '50px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    },
  };
  const labels: Record<MonthData['status'], string> = { open: 'Open', closed: 'Closed', limited: 'Limited' };
  return <span style={styles[status]}>{labels[status]}</span>;
}

export default function BestTimePage({ destination }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const bestMonths = destination.months.filter((m) => m.score === 5);
  const waMessage = encodeURIComponent(
    `Hi! I want to enquire about the best time to visit ${destination.name} and book a package.`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: destination.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
      { '@type': 'ListItem', position: 2, name: 'Best Time to Visit', item: 'https://junegiriyatra.com/best-time/' },
      { '@type': 'ListItem', position: 3, name: destination.name, item: `https://junegiriyatra.com/best-time/${destination.slug}/` },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          marginTop: '84px',
        }}
      >
        {/* background */}
        <Image
          src={destination.hero_image}
          alt={destination.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(7,5,26,0.2) 0%, rgba(7,5,26,0.5) 40%, rgba(7,5,26,0.95) 80%, var(--bg) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: '56px' }}>
          {/* breadcrumb */}
          <nav className="breadcrumb" style={{ background: 'transparent', border: 'none', padding: '0 0 16px', fontSize: '12px' }}>
            <ol style={{ display: 'flex', listStyle: 'none', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: 'rgba(255,248,238,0.5)' }}>Home</Link> <span style={{ color: 'rgba(255,248,238,0.3)' }}>›</span></li>
              <li><span style={{ color: 'rgba(255,248,238,0.5)' }}>Best Time to Visit</span> <span style={{ color: 'rgba(255,248,238,0.3)' }}>›</span></li>
              <li style={{ color: '#fff', fontWeight: 500 }}>{destination.name}</li>
            </ol>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(201,146,61,0.18)',
              border: '1px solid rgba(201,146,61,0.4)',
              color: 'var(--gold2)',
              padding: '6px 18px',
              borderRadius: '50px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            🗓 Best Time to Visit
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '14px',
              maxWidth: '820px',
            }}
            dangerouslySetInnerHTML={{ __html: destination.h1 }}
          />

          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(255,248,238,0.75)',
              marginBottom: '28px',
              maxWidth: '600px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {destination.tagline}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Check Availability
            </a>
            <Link href={`/packages/${destination.package_slug}/`} className="btn btn-outline">
              View Package →
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS GRID ─────────────────────── */}
      <section className="section" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            {destination.quick_facts.map((fact) => (
              <div
                key={fact.label}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '18px 16px',
                  textAlign: 'center',
                  transition: 'border-color .2s',
                }}
                className="qi-card"
              >
                <div className="qi-label">{fact.label}</div>
                <div className="qi-value">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────── */}
      <section style={{ paddingBottom: '56px' }}>
        <div className="container">
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text)',
              lineHeight: 1.9,
              maxWidth: '860px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderLeft: '4px solid var(--gold)',
              borderRadius: '0 12px 12px 0',
              padding: '20px 24px',
            }}
          >
            {destination.overview}
          </p>
        </div>
      </section>

      {/* ── BEST TIME HIGHLIGHT ───────────────────── */}
      {bestMonths.length > 0 && (
        <section style={{ paddingBottom: '56px' }}>
          <div className="container">
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(201,146,61,0.12), rgba(232,170,80,0.06))',
                border: '1px solid var(--border2)',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0,
                }}
              >
                ⭐
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '8px',
                  }}
                >
                  Ideal Months to Visit
                </div>
                <h2
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '12px',
                  }}
                >
                  {bestMonths.map((m) => m.month).join(' & ')}
                </h2>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {bestMonths.map((m) => (
                    <div
                      key={m.month}
                      style={{
                        background: 'rgba(13,10,38,0.6)',
                        border: '1px solid var(--border2)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        flex: 1,
                        minWidth: '200px',
                      }}
                    >
                      <div style={{ fontWeight: 700, color: 'var(--gold2)', marginBottom: '4px' }}>{m.month}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6 }}>{m.verdict}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── MONTH BY MONTH TABLE ─────────────────── */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p className="s-label">Complete Calendar</p>
            <h2 className="s-title">Month-by-Month Guide</h2>
            <div className="s-line" />
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }}>Month</th>
                  <th style={{ width: '90px' }}>Status</th>
                  <th>Weather</th>
                  <th>Crowds</th>
                  <th style={{ width: '110px' }}>Price</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Score</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {destination.months.map((m) => (
                  <tr
                    key={m.month}
                    style={
                      m.score === 5
                        ? { background: 'rgba(201,146,61,0.07)' }
                        : m.score === 0
                        ? { opacity: 0.55 }
                        : undefined
                    }
                  >
                    <td style={{ fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{m.month}</td>
                    <td><StatusBadge status={m.status} /></td>
                    <td style={{ fontSize: '12.5px' }}>{m.weather}</td>
                    <td style={{ fontSize: '12.5px' }}>{m.crowds}</td>
                    <td style={{ fontSize: '12.5px', color: 'var(--muted)' }}>{m.price_note}</td>
                    <td style={{ textAlign: 'center' }}><ScoreStars score={m.score} /></td>
                    <td style={{ fontSize: '12.5px', color: m.score === 5 ? 'var(--gold2)' : 'var(--text)' }}>
                      {m.verdict}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '16px', justifyContent: 'center' }}>
            {[
              { status: 'open' as const, label: 'Open — recommended travel' },
              { status: 'limited' as const, label: 'Limited — possible with caution' },
              { status: 'closed' as const, label: 'Closed — do not visit' },
            ].map((l) => (
              <div key={l.status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                <StatusBadge status={l.status} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGE CTA ──────────────────────────── */}
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '44px',
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 0% 50%, rgba(201,146,61,0.07) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <div className="s-label" style={{ textAlign: 'left', marginBottom: '10px' }}>Ready to Visit?</div>
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '10px',
                  lineHeight: 1.2,
                }}
              >
                Book Your {destination.name} Package
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '0' }}>
                Starting from{' '}
                <span style={{ color: 'var(--gold2)', fontWeight: 800, fontSize: '1.1rem' }}>
                  ₹{destination.package_price.toLocaleString('en-IN')}
                </span>{' '}
                per person · All-inclusive · Expert guide
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', position: 'relative' }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link href={`/packages/${destination.package_slug}/`} className="btn btn-outline btn-lg">
                View Package Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p className="s-label">Common Questions</p>
            <h2 className="s-title">
              Frequently Asked <em>Questions</em>
            </h2>
            <div className="s-line" />
          </div>

          {destination.faq.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item${openFaq === idx ? ' active' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <button className="faq-q">
                {item.q}
                <span className="faq-arrow">▼</span>
              </button>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ─────────────────────── */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '20px' }}>
            Planning your trip to {destination.name}? Our travel experts know every season personally.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Ask Our Travel Expert
          </a>
        </div>
      </section>
    </>
  );
}
