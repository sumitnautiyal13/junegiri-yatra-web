import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';
import packagesData from '../../../data/packages.json';

const PKG = (packagesData as Array<{ slug: string; pricing_tiers?: Array<{ group_size: string; rates: Record<string, number> }>; faq?: Array<{ q: string; a: string }> }>)
  .find((p) => p.slug === 'kedarnath-helicopter-2n-3d');

const TIERS = PKG?.pricing_tiers ?? [];
const FAQ = PKG?.faq ?? [];
const WA = 'https://wa.me/919873897652?text=' +
  encodeURIComponent('Namaste! I want to book a Kedarnath helicopter package. Please share current prices and availability.');

export const metadata: Metadata = {
  title: 'Kedarnath Helicopter Booking 2026 | Junegiri Yatra',
  description:
    'Kedarnath helicopter booking 2026 — fly from Phata, Sirsi or Guptkashi to Kedarnath in 8–10 minutes. Per-person prices, helipads, VVIP darshan and how to book with a Haridwar operator.',
  keywords:
    'kedarnath helicopter booking, kedarnath helicopter, kedarnath helicopter price, kedarnath helicopter package 2026, kedarnath by helicopter, phata to kedarnath helicopter',
  alternates: { canonical: 'https://junegiriyatra.com/kedarnath-helicopter/' },
  openGraph: {
    title: 'Kedarnath Helicopter Booking 2026 | Junegiri Yatra',
    description:
      'Fly to Kedarnath in 8–10 minutes. Per-person prices, helipads, VVIP darshan and how to book.',
    images: [{ url: 'https://junegiriyatra.com/images/kedarnath_helicopter.webp' }],
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://junegiriyatra.com/kedarnath-helicopter/',
      name: 'Kedarnath Helicopter Booking 2026',
      description:
        'Complete guide to booking a Kedarnath helicopter yatra — helipads, per-person prices, VVIP darshan and the booking process.',
      provider: {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        telephone: '+919873897652',
        url: 'https://junegiriyatra.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Haridwar',
          addressRegion: 'Uttarakhand',
          addressCountry: 'IN',
        },
      },
    },
    {
      '@type': 'Product',
      name: 'Kedarnath Helicopter Package',
      description:
        'All-inclusive Kedarnath helicopter yatra from Phata/Sirsi/Guptkashi — flight, VVIP darshan, hotel and meals.',
      image: 'https://junegiriyatra.com/images/kedarnath_helicopter.webp',
      brand: { '@type': 'Brand', name: 'Junegiri Yatra' },
      offers: {
        '@type': 'Offer',
        price: 24000,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: 'https://junegiriyatra.com/kedarnath-helicopter/',
        seller: { '@type': 'TravelAgency', name: 'Junegiri Yatra', url: 'https://junegiriyatra.com' },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Kedarnath Helicopter', item: 'https://junegiriyatra.com/kedarnath-helicopter/' },
      ],
    },
  ],
};

const HELIPADS = [
  { name: 'Phata', note: 'Busiest base — most daily sorties; ~8-minute flight to Kedarnath.' },
  { name: 'Sirsi (Sersi)', note: 'Quieter alternative close to Phata; similar flight time.' },
  { name: 'Guptkashi', note: 'Lower-altitude base, useful when upper helipads are weather-held.' },
];

const STEPS = [
  { t: 'WhatsApp your dates & group size', d: 'Send your preferred travel dates, number of passengers and departure city. Our Haridwar team replies within the hour with live helicopter availability.' },
  { t: 'Confirm helipad, hotel tier & price', d: 'We lock your sector (Phata / Sirsi / Guptkashi), hotel category and VVIP darshan slot, and send a transparent per-person quote with no hidden add-ons.' },
  { t: 'Pay the advance to secure seats', d: 'Helicopter inventory is limited and sells out first in the May–June peak — a part-advance confirms your seats; we handle permits and the full ground itinerary.' },
];

export default function KedarnathHelicopterHub() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section className="city-hero">
        <Image src="/images/kedarnath_helicopter.webp" alt="Kedarnath helicopter booking" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>›</span><span>Kedarnath Helicopter</span>
          </nav>
          <h1 className="city-hero-h1">
            Kedarnath Helicopter{' '}<br />
            <span className="city-name-gold">Booking 2026</span>
          </h1>
          <p className="city-hero-sub">
            Fly to Kedarnath in 8–10 minutes · All-inclusive from <strong>₹24,000/person</strong>
          </p>
          <WaLink href={WA} className="btn-gold-hero" label="hero_kedarnath_helicopter_hub">
            📲 Check Helicopter Availability
          </WaLink>
        </div>
      </section>

      {/* DIRECT ANSWER (AEO) */}
      <section className="city-hook">
        <div className="container">
          <p className="city-intro-text">
            <strong>Kedarnath helicopter booking</strong> lets you reach the Jyotirlinga in an
            8–10 minute flight instead of the 16–22 km trek. Helicopters run from three Garhwal
            helipads — <strong>Phata, Sirsi and Guptkashi</strong> — and an all-inclusive package
            costs <strong>₹24,000–₹55,000 per person</strong> depending on group size and hotel
            tier. Seats are weather-dependent and sell out first in the May–June peak, so the
            earlier you confirm, the better. Junegiri Yatra is a Haridwar-based operator and
            books the full yatra with VVIP darshan.
          </p>
        </div>
      </section>

      {/* PRICE TABLE */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Kedarnath Helicopter Price — Per Person</h2>
          <p>Rates are all-inclusive (helicopter both ways, hotel, meals, transfers and VVIP darshan assistance) and fall as your group size grows. Exact fares depend on the season and helipad.</p>
          <div className="price-table-wrap">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Group size</th>
                  {TIERS[0] && Object.keys(TIERS[0].rates).map((k) => <th key={k} style={{ textTransform: 'capitalize' }}>{k}</th>)}
                </tr>
              </thead>
              <tbody>
                {TIERS.map((tier) => (
                  <tr key={tier.group_size}>
                    <td><strong>{tier.group_size}</strong></td>
                    {Object.values(tier.rates).map((r, i) => (
                      <td key={i}>{r ? '₹' + r.toLocaleString('en-IN') : '—'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 14 }}>
            See the full day-by-day plan and inclusions on the{' '}
            <Link href="/packages/kedarnath-helicopter-2n-3d/">Kedarnath Helicopter Yatra 2N/3D package</Link>,
            or compare flying vs walking in our{' '}
            <Link href="/blog/kedarnath-helicopter-vs-trek/">Kedarnath helicopter vs trek guide</Link>.
          </p>
        </div>
      </section>

      {/* HELIPADS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Which Helipad You Fly From</h2>
          <div className="heli-grid">
            {HELIPADS.map((h) => (
              <div key={h.name} className="heli-card">
                <h3>{h.name}</h3>
                <p>{h.note}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, opacity: 0.85 }}>
            All three sit in the Rudraprayag district, a scenic drive from Haridwar/Dehradun. We advise
            the best base for your dates — read the full{' '}
            <Link href="/blog/kedarnath-helicopter-booking-guide/">Kedarnath helicopter booking guide</Link>.
          </p>
        </div>
      </section>

      {/* HOW TO BOOK */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How to Book a Kedarnath Helicopter</h2>
          <ol className="steps-list">
            {STEPS.map((s, i) => (
              <li key={i}>
                <span className="step-n">{i + 1}</span>
                <div><strong>{s.t}</strong><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEPARTURE CITIES / SPOKE */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Booking From Your City</h2>
          <p style={{ opacity: 0.9 }}>
            We arrange Kedarnath helicopter yatras for travellers flying in from across India. See
            flight routes, train options and transfer times for your departure city on the{' '}
            <Link href="/kedarnath-helicopter-from/">Kedarnath helicopter from your city</Link> pages,
            or for the full four-dham aerial circuit see the{' '}
            <Link href="/packages/char-dham-helicopter-7n-8d/">Char Dham helicopter package</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="city-section city-section-faq">
        <div className="container">
          <h2 className="section-title-left">Kedarnath Helicopter Booking — FAQs</h2>
          <div className="faq-list">
            {FAQ.map((f, i) => (
              <details key={i} className="faq-item">
                <summary>{f.q}</summary>
                <p dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to book your Kedarnath helicopter yatra?</h2>
          <p>Live availability and a transparent per-person quote on WhatsApp — our Haridwar team replies within the hour.</p>
          <WaLink href={WA} className="btn-gold-hero" label="cta_kedarnath_helicopter_hub">
            📲 Book on WhatsApp
          </WaLink>
        </div>
      </section>

      <style>{`
        .heli-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:8px}
        .heli-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:18px 20px}
        .heli-card h3{color:var(--gold2);margin-bottom:6px;font-size:1.1rem}
        .heli-card p{opacity:.85;font-size:.95rem;margin:0}
        .steps-list{list-style:none;display:flex;flex-direction:column;gap:16px;margin:10px 0 0;padding:0}
        .steps-list li{display:flex;gap:16px;align-items:flex-start}
        .step-n{flex:none;width:34px;height:34px;border-radius:50%;background:var(--gold);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center}
        .steps-list p{margin:4px 0 0;color:var(--text2,#6b6257);font-size:.96rem}
        .faq-list{display:flex;flex-direction:column;gap:10px;margin-top:8px}
        .faq-item{border:1px solid var(--border,#e8e0d2);border-radius:10px;padding:4px 18px;background:var(--card,#fff)}
        .faq-item summary{cursor:pointer;font-weight:600;padding:12px 0;list-style:none}
        .faq-item summary::-webkit-details-marker{display:none}
        .faq-item summary::after{content:"+";float:right;color:var(--gold)}
        .faq-item[open] summary::after{content:"−"}
        .faq-item p{padding:0 0 14px;margin:0;color:var(--text2,#6b6257)}
        .city-cta-strip{padding:60px 0;text-align:center}
        .city-cta-strip h2{margin-bottom:10px}
        .city-cta-strip p{margin-bottom:22px;color:var(--text2,#6b6257)}
      `}</style>
    </>
  );
}
