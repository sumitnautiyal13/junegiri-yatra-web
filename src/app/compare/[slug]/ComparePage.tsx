'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface ComparisonItem {
  name: string;
  slug: string;
  price: number;
  duration: string;
  difficulty: string;
  best_for: string;
  pros: string[];
  cons: string[];
}

export interface ComparisonTableRow {
  aspect: string;
  a: string;
  b: string;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface Comparison {
  slug: string;
  title: string;
  meta_description: string;
  h1: string;
  tagline: string;
  hero_image: string;
  item_a: ComparisonItem;
  item_b: ComparisonItem;
  comparison_table: ComparisonTableRow[];
  verdict: string;
  faq: ComparisonFaq[];
}

interface Props {
  comparison: Comparison;
}

export default function ComparePage({ comparison }: Props) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const { item_a, item_b } = comparison;

  const waText = encodeURIComponent(
    `Hi Junegiri Yatra! I was reading your comparison page for "${comparison.title}" and would like more information.`
  );
  const waLink = `https://wa.me/919873897652?text=${waText}`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://junegiriyatra.com/compare/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: comparison.title,
        item: `https://junegiriyatra.com/compare/${comparison.slug}/`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '80px 0 60px',
        }}
      >
        {/* background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${comparison.hero_image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
        {/* dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(7,5,26,0.88) 0%, rgba(7,5,26,0.72) 100%)',
            zIndex: 1,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p
            className="s-label"
            style={{ marginBottom: 14 }}
          >
            Complete Comparison Guide 2026
          </p>
          <h1
            className="s-title"
            dangerouslySetInnerHTML={{ __html: comparison.h1 }}
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', maxWidth: 760, margin: '0 auto 14px' }}
          />
          <p
            className="s-sub"
            style={{ marginBottom: 32, fontSize: 17 }}
          >
            {comparison.tagline}
          </p>
          <a
            href={waLink}
            className="btn btn-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 Ask Us on WhatsApp
          </a>
        </div>
      </section>

      {/* ── BREADCRUMB ───────────────────────────────────── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/compare/">Compare</Link></li>
            <li>{comparison.title}</li>
          </ol>
        </div>
      </nav>

      {/* ── AT A GLANCE CARDS ────────────────────────────── */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <p className="s-label">At a Glance</p>
          <h2 className="s-title">Side-by-Side <em>Overview</em></h2>
          <div className="s-line" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {/* Card A */}
            <GlanceCard item={item_a} label="Option A" accentColor="var(--gold)" />
            {/* Card B */}
            <GlanceCard item={item_b} label="Option B" accentColor="#7C9EF8" />
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────── */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="s-label">Head-to-Head</p>
          <h2 className="s-title">Detailed <em>Comparison</em></h2>
          <div className="s-line" />

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{item_a.name}</th>
                  <th>{item_b.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparison_table.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: 'rgba(255,248,238,0.75)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
                      {row.aspect}
                    </td>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── VERDICT BOX ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 10, paddingBottom: 60 }}>
        <div className="container">
          <div
            style={{
              background: 'rgba(201,146,61,0.10)',
              borderLeft: '4px solid var(--gold)',
              padding: 24,
              borderRadius: 8,
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 10,
              }}
            >
              Our Verdict
            </p>
            <p style={{ fontSize: 16, color: 'rgba(255,248,238,0.9)', lineHeight: 1.75 }}>
              {comparison.verdict}
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container">
          <p className="s-label">Common Questions</p>
          <h2 className="s-title">Frequently Asked <em>Questions</em></h2>
          <div className="s-line" />

          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {comparison.faq.map((item, i) => (
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

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, var(--card2), var(--card))',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2 className="s-title">Still Not Sure? <em>Ask Our Experts</em></h2>
          <p className="s-sub" style={{ marginBottom: 32 }}>
            Our travel experts have helped thousands of pilgrims and adventurers choose the perfect trip.
            WhatsApp us for a free, no-obligation recommendation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={waLink}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 WhatsApp Us Now
            </a>
            <Link href="/packages/" className="btn btn-outline">
              Browse All Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Glance Card Sub-component ── */
function GlanceCard({
  item,
  label,
  accentColor,
}: {
  item: ComparisonItem;
  label: string;
  accentColor: string;
}) {
  return (
    <div
      className="inc-box"
      style={{
        borderColor: accentColor,
        borderTopWidth: 3,
        borderTopStyle: 'solid',
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: accentColor,
            display: 'block',
            marginBottom: 4,
          }}
        >
          {label}
        </span>
        <h3
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: '#fff',
            margin: 0,
            paddingBottom: 12,
            borderBottom: '1px solid var(--border)',
          }}
        >
          {item.name}
        </h3>
      </div>

      {/* Key stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 18 }}>
        <Stat label="Price from" value={`₹${item.price.toLocaleString('en-IN')}`} accent={accentColor} />
        <Stat label="Duration" value={item.duration} accent={accentColor} />
        <Stat label="Difficulty" value={item.difficulty} accent={accentColor} />
        <Stat label="Best For" value={item.best_for} accent={accentColor} />
      </div>

      {/* Pros */}
      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#5EBD7A', marginBottom: 8 }}>
          Pros
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {item.pros.map((p, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#5EBD7A', flexShrink: 0 }}>✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#E57373', marginBottom: 8 }}>
          Cons
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {item.cons.map((c, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#E57373', flexShrink: 0 }}>✗</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, fontWeight: 600, color: accent }}>
        {value}
      </p>
    </div>
  );
}
