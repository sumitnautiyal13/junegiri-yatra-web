'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Hub } from '@/types';
import PriceDisplay from '@/components/PriceDisplay';
import { formatINR } from '@/lib/currency';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function HubPage({ hub }: { hub: Hub }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { currency } = useCurrency();

  return (
    <>
      {/* HERO */}
      <section className="hub-hero">
        <div className="hub-hero-bg" style={{ backgroundImage: `url('${hub.hero_image}')` }} />
        <div className="hub-hero-content">
          <div className="container">
            <h1 dangerouslySetInnerHTML={{ __html: hub.h1 }} />
            <p className="hub-tagline">{hub.hero_tagline}</p>
            {hub.stats && (
              <div className="hub-stats">
                {hub.stats.map((stat, i) => (
                  <div key={i} className="hub-stat">
                    <div className="num">{stat.num}</div>
                    <div className="lbl">{stat.lbl}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PACKAGE GRID */}
      <section className="section">
        <div className="container">
          <h2
            className="s-title fade-in"
            dangerouslySetInnerHTML={{ __html: hub.grid_title || 'All <em>Packages</em>' }}
          />
          <p className="s-sub fade-in">
            {hub.grid_subtitle || 'Choose from our curated collection — all-inclusive, no hidden costs'}
          </p>
          <div className="s-line" />
          <div className="pkg-grid">
            {hub.packages.map((p, i) => (
              <div key={i} className="pkg-card fade-in">
                <div className="pkg-img" style={{ backgroundImage: `url('${p.image}')` }}>
                  {p.tag && <span className="pkg-tag">{p.tag}</span>}
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-name">{p.name}</h3>
                  <p className="pkg-dur">
                    {p.duration}{p.from_city ? ` · From ${p.from_city}` : ''}
                  </p>
                  <div className="pkg-price-block">
                    <PriceDisplay
                      inrPrice={p.price}
                      usdIntlPrice={p.intl_price_usd}
                      showInrRef={currency !== 'INR'}
                      suffix="/person"
                    />
                  </div>
                  <p className="pkg-route">{p.route}</p>
                  <div className="pkg-btns">
                    <Link href={p.url} className="btn btn-outline">View Details</Link>
                    <a
                      href={`https://wa.me/919873897652?text=${encodeURIComponent(p.wa_text || p.name + ' package details chahiye')}`}
                      className="btn btn-wa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT GUIDE */}
      {hub.content && (
        <section className="section" style={{ background: 'var(--card)' }}>
          <div className="container">
            <h2
              className="s-title fade-in"
              dangerouslySetInnerHTML={{ __html: hub.content_title || 'Complete <em>Guide</em>' }}
            />
            <div className="s-line" />
            <div
              className="content-section fade-in"
              dangerouslySetInnerHTML={{ __html: hub.content }}
            />
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {hub.comparison_rows && hub.comparison_headers && (
        <section className="section">
          <div className="container">
            <h2 className="s-title fade-in"><em>Compare</em> All Packages</h2>
            <p className="s-sub fade-in">Quick comparison to help you choose the right package</p>
            <div className="s-line" />
            <div className="comparison-table-wrap fade-in">
              <table className="comparison-table">
                <thead>
                  <tr>
                    {hub.comparison_headers.map((h, i) => <th key={i}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {hub.comparison_rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        if (cell.is_price && cell.value) {
                          return (
                            <td key={j}>
                              <span className="pv">₹{formatINR(cell.value)}</span>
                              {currency !== 'INR' && (
                                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block' }}>
                                  <PriceDisplay
                                    inrPrice={cell.value}
                                    usdIntlPrice={cell.usd}
                                    showInrRef={false}
                                    suffix=""
                                  />
                                </span>
                              )}
                            </td>
                          );
                        }
                        if (cell.is_link && cell.url) {
                          return (
                            <td key={j}>
                              <Link href={cell.url} style={{ color: 'var(--p)', fontWeight: 600 }}>
                                {cell.text}
                              </Link>
                            </td>
                          );
                        }
                        return <td key={j}>{cell.text}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TRAVEL GUIDE — long-form SEO content */}
      {(hub as Hub & { travel_guide?: string }).travel_guide && (
        <section className="section">
          <div className="container">
            <div
              className="content-section travel-guide fade-in"
              dangerouslySetInnerHTML={{
                __html: (hub as Hub & { travel_guide?: string }).travel_guide!,
              }}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      {hub.faq && hub.faq.length > 0 && (
        <section className="section" style={{ background: 'var(--card)' }}>
          <div className="container">
            <h2 className="s-title fade-in">Frequently Asked <em>Questions</em></h2>
            <div className="s-line" />
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              {hub.faq.map((f, i) => (
                <div key={i} className={`faq-item${activeFaq === i ? ' active' : ''}`}>
                  <button
                    className="faq-q"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-arrow">▼</span>
                  </button>
                  <div className="faq-a">
                    <p dangerouslySetInnerHTML={{ __html: f.a }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg,var(--s2),var(--dark))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="s-title fade-in">Ready to Plan Your <em>Trip?</em></h2>
          <p className="s-sub fade-in">Custom dates, group sizes, and budget options. WhatsApp for instant quote.</p>
          <div className="fade-in" style={{ marginTop: 24 }}>
            <a
              href={`https://wa.me/919873897652?text=${encodeURIComponent('Namaste! I want to enquire about ' + hub.name)}`}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 16, padding: '18px 36px' }}
            >
              📱 WhatsApp +91 98738 97652
            </a>
          </div>
        </div>
      </section>

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: hub.name,
            description: hub.meta_description,
            url: `https://junegiriyatra.com${hub.url}`,
            numberOfItems: hub.packages.length,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '47',
              bestRating: '5',
              worstRating: '1',
            },
            itemListElement: hub.packages.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              url: `https://junegiriyatra.com${p.url}`,
            })),
          }),
        }}
      />
      {hub.faq && hub.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: hub.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
              })),
            }),
          }}
        />
      )}
    </>
  );
}
