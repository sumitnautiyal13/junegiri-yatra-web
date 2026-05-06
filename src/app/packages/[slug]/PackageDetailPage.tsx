'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Package } from '@/types';
import PriceDisplay from '@/components/PriceDisplay';
import { formatINR } from '@/lib/currency';
import { useCurrency } from '@/contexts/CurrencyContext';

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
};

export default function PackageDetailPage({ pkg }: { pkg: Package }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { currency } = useCurrency();
  const cityRoute = CITY_ROUTE_MAP[pkg.slug] ?? null;

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
              <span className="pkg-rating-text">4.8 <span className="pkg-rating-count">(47 reviews)</span></span>
            </div>
            <div className="pkg-price-row">
              <div className="pkg-price-card">
                <div className="pkg-price-label">Starting From</div>
                <PriceDisplay
                  inrPrice={pkg.price_from}
                  usdIntlPrice={pkg.intl_price_usd}
                  showInrRef={true}
                  suffix="/ person"
                />
              </div>
              <div className="pkg-cta-group">
                <a
                  href={`https://wa.me/919873897652?text=${encodeURIComponent(pkg.wa_text)}`}
                  className="btn btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📱 WhatsApp Booking
                </a>
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
            <div className="trust-item"><div className="num">2,847+</div><div className="lbl">HAPPY TRAVELERS</div></div>
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
            style={{ maxWidth: 900, margin: '0 auto' }}
            dangerouslySetInnerHTML={{ __html: pkg.overview }}
          />
        </div>
      </section>

      {/* ITINERARY */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Day-by-Day <em>Itinerary</em></h2>
          <div className="s-line" />
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {pkg.itinerary.map((day, i) => (
              <div key={i} className="day-card fade-in">
                <div className="day-num">DAY {i + 1}</div>
                <div className="day-title">{day.title}</div>
                <div className="day-meta">📍 {day.meta}</div>
                <div className="day-desc">{day.desc}</div>
                <div className="day-hls">
                  {day.highlights.map((h, j) => (
                    <span key={j} className="day-hl">{h}</span>
                  ))}
                </div>
              </div>
            ))}
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

      {/* PRICING TABLE */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Package <em>Pricing</em></h2>
          <p className="s-sub">All prices in Indian Rupees (INR) · International visitors see converted price above</p>
          <div className="s-line" />
          <div className="price-table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Group Size</th>
                  {Object.keys(pkg.pricing_tiers[0]?.rates || {}).map((tier) => (
                    <th key={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pkg.pricing_tiers.map((tier, i) => (
                  <tr key={i}>
                    <td><strong>{tier.group_size}</strong></td>
                    {Object.values(tier.rates).map((price, j) => (
                      <td key={j}>
                        {price > 0
                          ? <span className="pv">₹{formatINR(price)}</span>
                          : <span style={{ color: 'var(--muted)' }}>—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {pkg.gallery && pkg.gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="s-title">Photo <em>Gallery</em></h2>
            <div className="s-line" />
            <div className="gallery-grid">
              {pkg.gallery.map((img, i) => (
                <div key={i} className="gallery-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${pkg.name} gallery ${i + 1}`} loading="lazy" />
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
                  <div className="faq-a">
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
            <a
              href={`https://wa.me/919873897652?text=${encodeURIComponent(pkg.wa_text)}`}
              className="btn btn-wa"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 16, padding: '18px 36px' }}
            >
              📱 WhatsApp +91 98738 97652
            </a>
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

      {/* JSON-LD SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: pkg.name,
            description: pkg.meta_description,
            url: `https://junegiriyatra.com${pkg.url}`,
            image: pkg.hero_image,
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
              ratingValue: '4.8',
              reviewCount: '47',
              bestRating: '5',
              worstRating: '1',
            },
            provider: {
              '@type': 'TravelAgency',
              name: 'Junegiri Yatra',
              telephone: '+919873897652',
              address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressCountry: 'IN' },
            },
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
