'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';

export interface IntlCity {
  slug: string;
  name: string;
  country: string;
  country_slug: string;
  nationality: string;
  flag: string;
  continent: string;
  region?: string;
  nearest_airport: string;
  airport_code: string;
  flight_hours_to_delhi: number;
  direct_flights: boolean;
  airlines: string[];
  ist_offset: string;
  currency_code: string;
  currency_symbol: string;
  usd_to_local: number;
  visa_type: string;
  visa_processing_days: number;
  visa_cost_usd: number;
  best_travel_months: string[];
  avoid_months: string[];
  peak_booking_months: string[];
  popular_package_slugs: string[];
  travel_note: string;
  typical_holiday_days: number;
  search_volume_index: number;
}

export interface IntlPackage {
  slug: string;
  name: string;
  duration: string;
  intl_price_usd: number;
  difficulty: string;
  tag?: string;
  hero_image: string;
  destinations_short: string;
  hero_tagline: string;
}

export interface PricingTier {
  group_size: string;
  rates: { standard: number; deluxe: number; 'super deluxe': number; luxury: number };
}

export interface TrekPackage extends IntlPackage {
  price_from?: number;
  pricing_tiers?: PricingTier[];
}

interface Props {
  city: IntlCity;
  packages: IntlPackage[];
  treks: TrekPackage[];
}

const WA_NUMBER = '919873897652';

function buildWaLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DIFFICULTY_COLORS: Record<string, { bg: string; color: string }> = {
  Easy: { bg: 'rgba(34,197,94,0.18)', color: '#4ade80' },
  Moderate: { bg: 'rgba(234,179,8,0.18)', color: '#fbbf24' },
  'Easy to Moderate': { bg: 'rgba(234,179,8,0.18)', color: '#fbbf24' },
  'Easy–Moderate': { bg: 'rgba(234,179,8,0.18)', color: '#fbbf24' },
  'Moderate–Difficult': { bg: 'rgba(249,115,22,0.18)', color: '#fb923c' },
  Challenging: { bg: 'rgba(249,115,22,0.18)', color: '#fb923c' },
  Difficult: { bg: 'rgba(239,68,68,0.18)', color: '#f87171' },
  Hard: { bg: 'rgba(239,68,68,0.18)', color: '#f87171' },
};

export default function IntlCityPage({ city, packages, treks }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroWaText = `Hello! I'm from ${city.name} and interested in India trek packages. Please share details and available dates.`;
  const heroWaLink = buildWaLink(heroWaText);

  const localPrice = (usdPrice: number) => Math.round(usdPrice * city.usd_to_local);

  const faqs = [
    {
      q: `Can I fly direct from ${city.name} to India?`,
      a: city.direct_flights
        ? `Yes! There are direct flights from ${city.nearest_airport} (${city.airport_code}) to Delhi (DEL). Flight time is approximately ${city.flight_hours_to_delhi} hours. Airlines include ${city.airlines.join(', ')}.`
        : `${city.name} doesn't have direct flights to India, but connecting options via major hubs are available. Total journey from ${city.nearest_airport} (${city.airport_code}) to Delhi is approximately ${city.flight_hours_to_delhi} hours. Airlines like ${city.airlines.join(', ')} operate these routes.`,
    },
    {
      q: `What is the visa process for ${city.nationality} citizens?`,
      a: `${city.nationality} passport holders can apply for an ${city.visa_type} for India. Processing typically takes ${city.visa_processing_days} business days and costs approximately $${city.visa_cost_usd} USD. We recommend applying at least 2 weeks before travel. We'll guide you through the entire application process — just WhatsApp us.`,
    },
    {
      q: `What are the best months to visit India from ${city.name}?`,
      a: `The best months to travel from ${city.name} to the Indian Himalayas are ${city.best_travel_months.join(', ')}. These months offer ideal trekking conditions with clear skies and accessible trails. We recommend avoiding ${city.avoid_months.join(', ')} due to monsoon/peak summer conditions. ${city.travel_note}`,
    },
    {
      q: `How do I pay for the package in ${city.currency_code}?`,
      a: `All our international packages are priced in USD for simplicity. The approximate equivalent in ${city.currency_code} is shown alongside USD prices (at current exchange rates). We accept bank transfers, PayPal, Wise, and major debit/credit cards. A 30% deposit confirms your booking, with the balance due 2 weeks before departure. ${city.currency_symbol}1 ≈ $${(1 / city.usd_to_local).toFixed(2)} USD at current rates.`,
    },
    {
      q: `Is it safe for solo travelers from ${city.country}?`,
      a: `Absolutely. We operate exclusively private group tours — no shared transport with strangers. Your package includes a dedicated English-speaking ITMB-certified Himalayan guide, private SUV transfers, and 24/7 WhatsApp support from our Haridwar base. Our team has guided travelers from ${city.country} since 2017.`,
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `India Trek Packages from ${city.name}`,
        description: `Premium Himalayan trek packages for travelers from ${city.name}, ${city.country}. ${city.flight_hours_to_delhi}h flight to Delhi. ${city.visa_type} for ${city.nationality} citizens. From $2,000/person.`,
        touristType: 'Adventure travelers',
        provider: {
          '@type': 'TravelAgency',
          name: 'Junegiri Yatra',
          url: 'https://junegiriyatra.com',
          telephone: `+${WA_NUMBER}`,
        },
        offers: { '@type': 'Offer', price: '2000', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'International Packages', item: 'https://junegiriyatra.com/international/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="city-hero">
        <Image
          src="/images/kedarkantha_trek.webp"
          alt={`India trek packages from ${city.name}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/international/">International Packages</Link>
            <span>›</span>
            <span>India Treks from {city.name}</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,146,61,0.18)', border: '1px solid rgba(201,146,61,0.4)', borderRadius: 50, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--gold2)', marginBottom: 18 }}>
            <span>{city.flag}</span>
            <span>{city.name}, {city.country}</span>
            <span style={{ color: 'var(--muted)', margin: '0 4px' }}>·</span>
            <span>{city.flight_hours_to_delhi}h to Delhi</span>
          </div>
          <h1 className="city-hero-h1">
            India Trek Packages{' '}<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            {city.flight_hours_to_delhi}h flight · {city.visa_type} for {city.nationality} citizens · Private guide &amp; SUV · Treks from <strong>{city.currency_symbol}{localPrice(80)}/person</strong>
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <WaLink
              href={heroWaLink}
              label={`intl_city_hero_${city.slug}`}
              className="btn-gold-hero"
            >
              📲 WhatsApp from {city.name}
            </WaLink>
            <a href="#treks" className="btn btn-outline" style={{ borderRadius: 50, padding: '12px 26px', fontSize: '0.95rem' }}>
              Browse Treks ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS BAR ───────────────────────────────────────────── */}
      <div className="city-hook">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 36px', fontSize: '0.9rem' }}>
            <span>✈️ <strong style={{ color: 'var(--heading)' }}>{city.flight_hours_to_delhi}h</strong> flight to Delhi</span>
            <span style={{ color: 'var(--border2)' }}>|</span>
            <span>🛂 <strong style={{ color: 'var(--heading)' }}>{city.visa_type}</strong> · {city.visa_processing_days} days</span>
            <span style={{ color: 'var(--border2)' }}>|</span>
            <span>📅 Best: <strong style={{ color: 'var(--heading)' }}>{city.best_travel_months.slice(0, 3).join(', ')}</strong></span>
            <span style={{ color: 'var(--border2)' }}>|</span>
            <span>💰 Treks from <strong style={{ color: 'var(--gold2)' }}>{city.currency_symbol}{localPrice(80).toLocaleString()}</strong> <span style={{ color: 'var(--muted)', fontSize: '0.8em' }}>($80)</span></span>
          </div>
        </div>
      </div>

      {/* ── CURATED MULTI-DAY TOURS ───────────────────────────────────── */}
      <section id="packages" className="city-section">
        <div className="container">
          <h2 className="section-title-left">
            {city.flag} Curated Multi-Day India Tours
          </h2>
          <p className="section-sub-left">
            All-inclusive packages designed for {city.nationality} travelers — flights from {city.name} + India hotels + guide + transport
          </p>
          <div className="pkg-grid">
            {packages.map((pkg) => {
              const isPopular = city.popular_package_slugs.includes(pkg.slug);
              const pkgWaText = `Hello! I'm from ${city.name} and interested in the "${pkg.name}" package. Please share availability and pricing.`;
              const pkgWaLink = buildWaLink(pkgWaText);
              const localAmt = localPrice(pkg.intl_price_usd);
              const diff = DIFFICULTY_COLORS[pkg.difficulty] ?? { bg: 'rgba(100,116,139,0.2)', color: 'var(--muted)' };

              return (
                <div key={pkg.slug} className="pkg-card" style={isPopular ? { borderColor: 'var(--gold)', boxShadow: '0 0 0 1px rgba(201,146,61,0.25), 0 20px 60px rgba(0,0,0,.5)' } : {}}>
                  {(isPopular || pkg.tag) && (
                    <div className="pkg-tag" style={isPopular ? {} : { background: 'var(--card3)', color: 'var(--gold2)', border: '1px solid var(--border2)' }}>
                      {isPopular ? `Popular from ${city.name}` : pkg.tag}
                    </div>
                  )}
                  <div className="pkg-img">
                    <Image src={pkg.hero_image} alt={pkg.name} fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="pkg-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: diff.bg, color: diff.color }}>
                        {pkg.difficulty}
                      </span>
                      <span className="pkg-dur">{pkg.duration}</span>
                    </div>
                    <div className="pkg-name">{pkg.name}</div>
                    <div className="pkg-route">{pkg.destinations_short}</div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 16 }}>{pkg.hero_tagline}</p>
                    <div className="pkg-price-block">
                      <span className="price-primary">{city.currency_symbol}{localAmt.toLocaleString()}</span>
                      <span className="price-suffix">/person</span>
                      <span className="price-inr-ref">≈ ${pkg.intl_price_usd} USD · bookings confirmed in USD</span>
                    </div>
                    <div className="pkg-btns">
                      <WaLink
                        href={pkgWaLink}
                        label={`intl_city_pkg_${city.slug}_${pkg.slug}`}
                        className="btn btn-wa"
                      >
                        📲 WhatsApp for Quote
                      </WaLink>
                      <Link href={`/international/${pkg.slug}/`} className="btn btn-outline-gold">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HIMALAYAN TREKS ───────────────────────────────────────────── */}
      <section id="treks" className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">
            🏔️ Himalayan Trek Packages from {city.name}
          </h2>
          <p className="section-sub-left light">
            {treks.length} treks available · {city.flight_hours_to_delhi}h to Delhi · Private transport to trailhead · ITMB-certified guide included
          </p>
          <div className="pkg-grid">
            {treks.map((trek) => {
              const isPopular = city.popular_package_slugs.includes(trek.slug);
              const trekWaText = `Hello! I'm from ${city.name} and interested in the "${trek.name}". Please share dates and availability.`;
              const trekWaLink = buildWaLink(trekWaText);
              const localAmt = localPrice(trek.intl_price_usd);
              const diff = DIFFICULTY_COLORS[trek.difficulty] ?? { bg: 'rgba(100,116,139,0.2)', color: 'var(--muted)' };

              return (
                <div key={trek.slug} className="pkg-card" style={isPopular ? { borderColor: 'var(--gold)', boxShadow: '0 0 0 1px rgba(201,146,61,0.25), 0 20px 60px rgba(0,0,0,.5)' } : {}}>
                  {(isPopular || trek.tag) && (
                    <div className="pkg-tag" style={isPopular ? {} : { background: 'var(--card3)', color: 'var(--gold2)', border: '1px solid var(--border2)' }}>
                      {isPopular ? `Popular from ${city.name}` : trek.tag}
                    </div>
                  )}
                  <div className="pkg-img">
                    <Image src={trek.hero_image} alt={trek.name} fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="pkg-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: diff.bg, color: diff.color }}>
                        {trek.difficulty}
                      </span>
                      <span className="pkg-dur">{trek.duration}</span>
                    </div>
                    <div className="pkg-name">{trek.name}</div>
                    <div className="pkg-route">{trek.destinations_short}</div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 16 }}>{trek.hero_tagline}</p>
                    <div className="pkg-price-block">
                      <span className="price-primary">{city.currency_symbol}{localAmt.toLocaleString()}</span>
                      <span className="price-suffix">/person</span>
                      <span className="price-inr-ref">≈ ${trek.intl_price_usd} USD · all-inclusive from Delhi</span>
                    </div>
                    {/* Group pricing removed — pricing via WhatsApp quote only */}
                    <div className="pkg-btns">
                      <WaLink
                        href={trekWaLink}
                        label={`intl_city_trek_${city.slug}_${trek.slug}`}
                        className="btn btn-wa"
                      >
                        📲 WhatsApp for Quote
                      </WaLink>
                      <Link href={`/packages/${trek.slug}/`} className="btn btn-outline-gold">
                        View Trek
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GETTING THERE ─────────────────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Getting There from {city.name}</h2>
          <p className="section-sub-left light">
            {city.nearest_airport} ({city.airport_code}) → Delhi (DEL). Our team picks you up and drives you straight to Haridwar.
          </p>
          <div className="route-cards" style={{ gridTemplateColumns: 'repeat(2,1fr)', maxWidth: 780 }}>
            <div className="route-card">
              <div className="route-card-header">
                <span className="route-icon">✈️</span>
                <span className="route-mode">By Air</span>
                {city.direct_flights && <span className="route-badge">Direct</span>}
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>From</td><td>{city.nearest_airport} ({city.airport_code})</td></tr>
                  <tr><td>To</td><td>Delhi Indira Gandhi (DEL)</td></tr>
                  <tr><td>Flight time</td><td>~{city.flight_hours_to_delhi} hours</td></tr>
                  <tr><td>Type</td><td>{city.direct_flights ? 'Direct flights available' : 'Via 1 connecting hub'}</td></tr>
                </tbody>
              </table>
            </div>
            <div className="route-card">
              <div className="route-card-header">
                <span className="route-icon">🛫</span>
                <span className="route-mode">Airlines</span>
              </div>
              <table className="route-table">
                <tbody>
                  {city.airlines.map((airline) => (
                    <tr key={airline}><td>✓</td><td>{airline}</td></tr>
                  ))}
                  <tr><td>IST offset</td><td>{city.ist_offset} from India</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="route-tip" style={{ maxWidth: 780 }}>
            💡 <strong>Travel tip:</strong> {city.travel_note} We arrange private airport transfer from Delhi (DEL) to Haridwar / Rishikesh — your trek starting point.
          </p>
        </div>
      </section>

      {/* ── VISA INFO ─────────────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">India Visa for {city.nationality} Citizens</h2>
          <p className="section-sub-left">Apply online — no embassy visit required for most nationalities.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 640, marginBottom: 24 }}>
            {[
              { label: 'Visa Type', value: city.visa_type },
              { label: 'Processing', value: `${city.visa_processing_days} days` },
              { label: 'Application Fee', value: `$${city.visa_cost_usd} USD` },
            ].map((item) => (
              <div key={item.label} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '22px 20px', textAlign: 'center' }}>
                <div className="price-primary" style={{ fontSize: '1.4rem' }}>{item.value}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', maxWidth: 560, marginBottom: 16 }}>
            As a {city.nationality} citizen, you qualify for India&apos;s {city.visa_type}. Apply at least {city.visa_processing_days + 5} days before travel. We&apos;ll guide you through the process — just ask on WhatsApp.
          </p>
          <a href="https://indianvisaonline.gov.in/evisa/tvoa.html" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--gold2)', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}>
            Apply for India e-Visa →
          </a>
        </div>
      </section>

      {/* ── BEST TIME ─────────────────────────────────────────────────── */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Best Time to Visit from {city.name}</h2>
          <p className="section-sub-left light">
            Peak booking from {city.name}: <strong style={{ color: 'var(--gold2)' }}>{city.peak_booking_months.join(', ')}</strong> — book early for your preferred dates.
          </p>
          <div style={{ maxWidth: 680 }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>
                Best months to trek
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_MONTHS.filter((m) => city.best_travel_months.includes(m)).map((month) => (
                  <span key={month} style={{ padding: '6px 16px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 999, fontSize: '0.82rem', fontWeight: 700, color: '#4ade80' }}>
                    ✓ {month}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>
                Months to avoid
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_MONTHS.filter((m) => city.avoid_months.includes(m)).map((month) => (
                  <span key={month} style={{ padding: '6px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 999, fontSize: '0.82rem', color: '#f87171' }}>
                    ✗ {month}
                  </span>
                ))}
              </div>
            </div>
            <p className="route-tip">
              📅 <strong>Holiday planning tip:</strong> Most travelers from {city.name} take {city.typical_holiday_days} days for India. Our {city.best_travel_months[0]}–{city.best_travel_months[city.best_travel_months.length - 1]} season packages are built around {city.typical_holiday_days}-day holidays.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY JUNEGIRI ──────────────────────────────────────────────── */}
      <section className="city-section">
        <div className="container">
          <h2 className="s-title">Why Choose <em>Junegiri Yatra</em></h2>
          <p className="s-sub">Built for international travelers. No surprises. No shared groups.</p>
          <div className="s-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, maxWidth: 1040, margin: '0 auto' }}>
            {[
              { icon: '🚗', title: 'Private Transport', desc: 'Dedicated SUV for your group — no shared jeeps, no strangers.' },
              { icon: '🏨', title: '3-Star Hotels', desc: 'Curated stays with attached bathroom, hot water, and WiFi.' },
              { icon: '🧭', title: 'English Guide', desc: 'ITMB-certified Himalayan guide. Fluent English. Safety-first.' },
              { icon: '📲', title: '24/7 WhatsApp', desc: 'Direct line to our Haridwar team. Real humans. Fast replies.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r2)', padding: '28px 22px', textAlign: 'center', transition: 'border-color .2s' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 14 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--heading)', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">Frequently Asked Questions — {city.name}</h2>
          <div className="faq-list" style={{ maxWidth: 780, marginTop: 32 }}>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="faq-chevron">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="faq-a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────────── */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Ready to trek the Himalayas from {city.name}?</p>
            <p className="city-cta-sub">Our Haridwar team responds within 60 mins · Free itinerary · No booking fee · Pay after confirmation</p>
          </div>
          <div className="city-cta-btns">
            <WaLink
              href={heroWaLink}
              label={`intl_city_cta_${city.slug}`}
              className="btn-gold-lg"
            >
              📲 WhatsApp Us Now
            </WaLink>
            <a href="tel:+919873897652" className="btn-outline-lg light">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA (hidden on desktop via inline media style) ── */}
      <style>{`.intl-sticky-cta { display: none; } @media (max-width: 768px) { .intl-sticky-cta { display: flex; } }`}</style>
      <div className="intl-sticky-cta" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <WaLink
          href={heroWaLink}
          label={`intl_city_sticky_${city.slug}`}
          style={{ flex: 1, background: 'var(--wa)', color: '#fff', fontWeight: 700, padding: '15px 0', fontSize: '0.95rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          📲 WhatsApp us to plan your India trek →
        </WaLink>
      </div>
    </>
  );
}
