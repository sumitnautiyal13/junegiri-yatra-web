'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Package } from '@/types';
import PriceDisplay from '@/components/PriceDisplay';
import { formatINR } from '@/lib/currency';
import { useCurrency } from '@/contexts/CurrencyContext';
import WaLink from '@/components/WaLink';

const TOP_CITIES = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Surat', slug: 'surat' },
  { name: 'Lucknow', slug: 'lucknow' },
  { name: 'Chandigarh', slug: 'chandigarh' },
];

const CITY_ROUTE_MAP: Record<string, string> = {
  'kedarnath-yatra-3n-4d': '/kedarnath-from/',
  'do-dham-yatra-5n-6d': '/do-dham-from/',
  'badrinath-yatra-2n-3d': '/badrinath-from/',
  'char-dham-yatra-9n-10d': '/char-dham-from/',
  'char-dham-yatra-deluxe-12n-13d': '/char-dham-from/',
  'char-dham-helicopter-6n-7d': '/char-dham-from/',
  'rishikesh-adventure-pack-2n-3d': '/rishikesh-from/',
  'rishikesh-yoga-wellness-5n-6d': '/rishikesh-from/',
  'rishikesh-weekend-getaway-1n-2d': '/rishikesh-from/',
  'valley-of-flowers-trek-4n-5d': '/valley-of-flowers-from/',
  'mussoorie-dehradun-3n-4d': '/mussoorie-from/',
  'nainital-jim-corbett-4n-5d': '/nainital-from/',
  'nainital-corbett-tour-3n-4d': '/nainital-from/',
  'varanasi-prayagraj-spiritual-3n-4d': '/varanasi-from/',
  'bali-7d6n-party-escape': '/bali-from/',
};

export default function PackageDetailPage({ pkg }: { pkg: Package }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(0); // first day open by default
  const { currency } = useCurrency();
  const cityRoute = CITY_ROUTE_MAP[pkg.slug] ?? null;
  const waPhone = (pkg as Package & { wa_phone?: string }).wa_phone ?? '919873897652';

  const breadcrumbs = pkg.breadcrumbs || [
    { name: 'Home', url: '/' },
    { name: 'Packages', url: '/packages/' },
    { name: pkg.name, url: pkg.url },
  ];

  return (
    <>
      {/* HERO */}
      <section className="pkg-hero">
        <div className="pkg-hero-bg" style={{ backgroundImage: `url('${pkg.hero_image}')` }} />
        <div className="pkg-hero-content">
          <div className="container">
            <div className="pkg-quick-info">
              {pkg.tag && (
                <span className="pkg-info-pill" style={{ background: 'rgba(255,107,0,0.9)', border: 'none' }}>
                  {pkg.tag}
                </span>
              )}
              <span className="pkg-info-pill">⏱ {pkg.duration}</span>
              <span className="pkg-info-pill">🚐 {pkg.transport || 'Private Vehicle'}</span>
              <span className="pkg-info-pill">🏨 All Inclusive</span>
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: pkg.h1 }} />
            <p className="pkg-tagline">{pkg.hero_tagline}</p>
            <div className="pkg-rating-badge">
              <span className="pkg-stars">★★★★★</span>
              <span className="pkg-rating-text">4.8 <span className="pkg-rating-count">(312 reviews)</span></span>
            </div>
            {pkg.last_updated && (
              /* Visible freshness signal — AEO/E-E-A-T. Mirrors schema dateModified. */
              <p className="pkg-updated">
                Itinerary &amp; pricing last reviewed{' '}
                <time dateTime={pkg.last_updated}>
                  {new Date(pkg.last_updated + 'T00:00:00Z').toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
                  })}
                </time>{' '}
                by the Junegiri Yatra operations team
              </p>
            )}
            <div className="pkg-price-row">
              <div className="pkg-price-card">
                <div className="pkg-price-label">Starting From</div>
                {pkg.price_points && pkg.price_points.length > 0 ? (
                  <div className="pkg-price-points">
                    {pkg.price_points.map((pt) => (
                      <div className="pkg-price-point" key={pt.city}>
                        <PriceDisplay
                          inrPrice={pt.price}
                          showInrRef={false}
                          suffix="/ person"
                        />
                        <span className="pkg-price-city">from {pt.city}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <PriceDisplay
                    inrPrice={pkg.price_from}
                    usdIntlPrice={pkg.intl_price_usd}
                    usdOnly={pkg.usd_only}
                    showInrRef={true}
                    suffix="/ person"
                  />
                )}
              </div>
              <div className="pkg-cta-group">
                <WaLink
                  href={`https://wa.me/${waPhone}?text=${encodeURIComponent(pkg.wa_text)}`}
                  className="btn btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                  label={`pkg_hero_${pkg.slug}`}
                >
                  📱 WhatsApp Booking
                </WaLink>
                <a href="#enquiry" className="btn btn-outline">Get Free Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BREADCRUMB */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            {breadcrumbs.map((crumb, i) => (
              <li key={i}>
                {i < breadcrumbs.length - 1
                  ? <Link href={crumb.url}>{crumb.name}</Link>
                  : crumb.name}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* TRUST BAR */}
      <section className="trust-bar">
        <div className="container">
          <div className="trust-row">
            <div className="trust-item"><div className="num">ATOI</div><div className="lbl">LICENSED OPERATOR</div></div>
            <div className="trust-item"><div className="num">4.8/5</div><div className="lbl">312 GOOGLE REVIEWS</div></div>
            <div className="trust-item"><div className="num">100%</div><div className="lbl">SATISFACTION GUARANTEE</div></div>
            <div className="trust-item"><div className="num">8+ YRS</div><div className="lbl">INDIA TRAVEL EXPERTS</div></div>
          </div>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 0 }}>
        <div className="container">
          <div className="qi-row">
            <div className="qi-card"><div className="qi-label">DURATION</div><div className="qi-value">{pkg.duration}</div></div>
            <div className="qi-card"><div className="qi-label">DESTINATIONS</div><div className="qi-value">{pkg.destinations_short}</div></div>
            <div className="qi-card"><div className="qi-label">DEPARTURE</div><div className="qi-value">{pkg.departure}</div></div>
            <div className="qi-card"><div className="qi-label">DIFFICULTY</div><div className="qi-value">{pkg.difficulty || 'Easy'}</div></div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <h2 className="s-title">About This <em>Tour</em></h2>
          <div className="s-line" />
          <div
            className="content-section fade-in"
            style={{ maxWidth: 720, margin: '0 auto', fontSize: 15, lineHeight: 1.85, color: 'var(--muted)' }}
            dangerouslySetInnerHTML={{ __html: pkg.overview }}
          />
        </div>
      </section>

      {/* ITINERARY */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pkg.itinerary.map((day, i) => {
              const isOpen = activeDay === i;
              return (
                <div
                  key={i}
                  style={{
                    background: isOpen ? 'var(--card2)' : 'var(--bg)',
                    border: `1px solid ${isOpen ? 'rgba(201,146,61,0.4)' : 'var(--border)'}`,
                    borderRadius: 12,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Header — always visible */}
                  <button
                    onClick={() => setActiveDay(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      background: 'linear-gradient(135deg, var(--gold), var(--gold2))',
                      color: '#07051A',
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 999,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      flexShrink: 0,
                    }}>
                      DAY {i + 1}
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', flex: 1 }}>{day.title}</span>
                    {day.meta && (
                      <span style={{ fontSize: 12, color: 'var(--muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                        📍 {day.meta}
                      </span>
                    )}
                    <span style={{
                      color: 'var(--gold2)',
                      flexShrink: 0,
                      transition: 'transform 0.25s',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      display: 'inline-block',
                      fontSize: 14,
                    }}>▾</span>
                  </button>

                  {/* Body — only visible when open */}
                  {isOpen && (
                    <div style={{ padding: '0 20px 18px' }}>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8, marginBottom: day.highlights?.length ? 14 : 0 }}>
                        {day.desc}
                      </p>
                      {day.highlights && day.highlights.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {day.highlights.map((h, j) => (
                            <span key={j} className="day-hl">{h}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INCLUSIONS / EXCLUSIONS */}
      <section className="section">
        <div className="container">
          <h2 className="s-title">What&apos;s <em>Included</em></h2>
          <div className="s-line" />
          <div className="inc-grid">
            <div className="inc-box included">
              <h3>✓ Included</h3>
              {pkg.inclusions.map((item, i) => (
                <div key={i} className="inc-item"><span className="ck">✓</span> {item}</div>
              ))}
            </div>
            <div className="inc-box excluded">
              <h3>✗ Not Included</h3>
              {pkg.exclusions.map((item, i) => (
                <div key={i} className="inc-item"><span className="cr">✗</span> {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TABLE removed — pricing shown via WhatsApp quote */}

      {/* GALLERY */}
      {pkg.gallery && pkg.gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="s-title">Photo <em>Gallery</em></h2>
            <div className="s-line" />
            <div className="gallery-grid">
              {pkg.gallery.map((img, i) => (
                <div key={i} className="gallery-item">
                  <Image src={img} alt={`${pkg.name} gallery ${i + 1}`} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {pkg.testimonials && pkg.testimonials.length > 0 && (
        <section className="section" style={{ background: 'var(--card)' }}>
          <div className="container">
            <h2 className="s-title">What <em>Travelers Say</em></h2>
            <div className="s-line" />
            <div className="test-grid">
              {pkg.testimonials.map((t, i) => (
                <div key={i} className="test-card fade-in">
                  <div className="test-stars">★★★★★</div>
                  <div className="test-quote">&ldquo;{t.quote}&rdquo;</div>
                  <div className="test-author">{t.author}</div>
                  <div className="test-loc">{t.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRAVEL GUIDE — long-form SEO content */}
      {(pkg as Package & { travel_guide?: string }).travel_guide && (
        <section className="section" style={{ background: 'var(--card)' }}>
          <div className="container">
            <div
              className="content-section travel-guide fade-in"
              style={{ maxWidth: 900, margin: '0 auto' }}
              dangerouslySetInnerHTML={{
                __html: (pkg as Package & { travel_guide?: string }).travel_guide!,
              }}
            />
          </div>
        </section>
      )}

      {/* FAQ */}
      {pkg.faq && pkg.faq.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="s-title">Frequently Asked <em>Questions</em></h2>
            <div className="s-line" />
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              {pkg.faq.map((f, i) => (
                <div
                  key={i}
                  className={`faq-item${activeFaq === i ? ' active' : ''}`}
                >
                  <button
                    className="faq-q"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-arrow">▼</span>
                  </button>
                  <div
                    className="faq-a"
                    style={
                      activeFaq === i
                        ? { maxHeight: 600, padding: '0 24px 20px', overflow: 'hidden' }
                        : { maxHeight: 0, padding: 0, overflow: 'hidden' }
                    }
                  >
                    <p dangerouslySetInnerHTML={{ __html: f.a }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOOK FROM YOUR CITY */}
      {cityRoute && (
        <section className="city-links-section">
          <div className="container">
            <h2 className="section-title-left">Book from Your City</h2>
            <p className="section-sub-left">Direct packages from 20 Indian cities — flights, trains, road all covered.</p>
            <div className="city-links-grid">
              {TOP_CITIES.map(city => (
                <Link key={city.slug} href={`${cityRoute}${city.slug}/`} className="city-link-chip">
                  {city.name}
                </Link>
              ))}
            </div>
            <Link href={cityRoute} className="btn btn-outline-gold" style={{marginTop: '24px', display: 'inline-flex'}}>
              View all 20 cities →
            </Link>
          </div>
        </section>
      )}

      {/* ENQUIRY */}
      <section id="enquiry" className="section" style={{ background: 'linear-gradient(135deg,var(--s2),var(--dark))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="s-title">Ready to <em>Book?</em></h2>
          <p className="s-sub">WhatsApp us for instant confirmation, custom dates, and group pricing.</p>
          <div style={{ marginTop: 24 }}>
            <WaLink
              href={`https://wa.me/${waPhone}?text=${encodeURIComponent(pkg.wa_text)}`}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 16, padding: '18px 36px' }}
              label={`pkg_cta_${pkg.slug}`}
            >
              📱 WhatsApp {waPhone === '6282111759727' ? '+62 821-1175-9727' : '+91 98738 97652'}
            </WaLink>
          </div>
          {currency !== 'INR' && pkg.intl_price_usd && (
            <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 13 }}>
              * International pricing shown. Final quotes confirmed on WhatsApp.
            </p>
          )}
        </div>
      </section>

      {/* RELATED PACKAGES */}
      {pkg.related && pkg.related.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="s-title">You May Also <em>Like</em></h2>
            <div className="s-line" />
            <div className="rel-grid">
              {pkg.related.map((r, i) => (
                <Link key={i} href={r.url} className="rel-card">
                  <div className="rel-img" style={{ backgroundImage: `url('${r.image}')` }} />
                  <div className="rel-body">
                    <div className="rel-name">{r.name}</div>
                    <div className="rel-dur">{r.duration}</div>
                    <PriceDisplay
                      inrPrice={r.price}
                      usdIntlPrice={r.intl_price_usd}
                      showInrRef={false}
                      suffix="/person"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OPERATOR BIO — E-E-A-T ─────────────────────────────────
          Same verified credentials used on blog posts: named founders,
          Haridwar-based since 2017, Uttarakhand/ATOI licensed, first-hand
          operation. No traveller-count claims — the specific figures
          ("2,847+" etc.) were unverified and removed sitewide. */}
      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div
            style={{
              background: 'var(--card2)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <h2 className="s-title" style={{ fontSize: '1.25rem', marginBottom: 10 }}>
              Who plans this trip
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text)' }}>
              This itinerary is planned and operated by <strong>Junegiri Yatra</strong> — a
              Haridwar-based pilgrimage &amp; Himalayan trek operator running Himalayan
              circuits since 2017, run by{' '}
              <strong>Vignesh Waram</strong>, <strong>Yash Negi</strong> and{' '}
              <strong>Sumit Nautiyal</strong>, licensed by Uttarakhand Tourism (ATOI-approved).
              Our team runs the Char Dham, Valley of Flowers, Kedarnath and Himalayan trek
              circuits end-to-end, so every route, cost and timing detail on this page comes
              from first-hand operating experience.{' '}
              <Link href="/about/" style={{ color: 'var(--gold2)', fontWeight: 600 }}>
                More about the team →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TouristTrip',
                name: pkg.name,
                description: pkg.meta_description,
                url: `https://junegiriyatra.com${pkg.url}`,
                ...(pkg.last_updated ? { dateModified: pkg.last_updated } : {}),
                image: {
                  '@type': 'ImageObject',
                  url: `https://junegiriyatra.com${pkg.hero_image}`,
                  width: 1200,
                  height: 630,
                },
                touristType: 'Cultural tourism',
                itinerary: { '@type': 'ItemList', numberOfItems: pkg.itinerary.length },
                offers: {
                  '@type': 'Offer',
                  price: pkg.price_from,
                  priceCurrency: 'INR',
                  availability: 'https://schema.org/InStock',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: 4.8,
                  reviewCount: 312,
                  bestRating: 5,
                  worstRating: 1,
                },
                provider: {
                  '@type': 'TravelAgency',
                  name: 'Junegiri Yatra',
                  telephone: waPhone === '6282111759727' ? '+6282111759727' : '+919873897652',
                  url: 'https://junegiriyatra.com',
                  address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
                  sameAs: ['https://www.instagram.com/junegiriyatra', 'https://www.facebook.com/junegiriyatra'],
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: breadcrumbs.map((b, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: b.name,
                  item: b.url.startsWith('http') ? b.url : `https://junegiriyatra.com${b.url}`,
                })),
              },
            ],
          }),
        }}
      />
      {pkg.faq && pkg.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: pkg.faq.map((f) => ({
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
