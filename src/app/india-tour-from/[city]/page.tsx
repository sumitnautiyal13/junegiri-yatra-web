import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCities, getCityBySlug } from '@/lib/data';

type City = ReturnType<typeof getCityBySlug>;

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const isIntl = (city as any).is_international;
  const title = isIntl
    ? `India Tour Packages from ${city.name} 2026 | Char Dham, Kedarnath, Golden Triangle`
    : `India Tour Packages from ${city.name} 2026 | Junegiri Yatra`;
  const desc = isIntl
    ? `Book India tour packages from ${city.name} — Char Dham Yatra, Kedarnath, Golden Triangle, Rishikesh adventures. All-inclusive from ₹8,500. Expert Haridwar-based operator. WhatsApp for a custom itinerary.`
    : `Book India spiritual & adventure tour packages from ${city.name} — Char Dham, Kedarnath, Rishikesh, Varanasi, Mathura. All-inclusive from ₹8,500. WhatsApp for departure details.`;
  return {
    title,
    description: desc,
    keywords: `india tour packages from ${city.name.toLowerCase()}, india holiday from ${city.name.toLowerCase()}, char dham yatra from ${city.name.toLowerCase()}, kedarnath tour from ${city.name.toLowerCase()}, golden triangle from ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/india-tour-from/${city.slug}/` },
    openGraph: {
      title,
      description: desc,
      images: [{ url: 'https://junegiriyatra.com/images/char_dham_yatra.webp' }],
    },
  };
}

const PACKAGES = [
  { icon: '🕉️', title: 'Char Dham Yatra', route: '/char-dham-from/', price: '₹28,000', duration: '10–12 Days', desc: 'All 4 dhams — Yamunotri · Gangotri · Kedarnath · Badrinath' },
  { icon: '⛰️', title: 'Kedarnath Yatra', route: '/kedarnath-from/', price: '₹8,500', duration: '3–4 Days', desc: 'Jyotirlinga at 3,584 m · trek or helicopter' },
  { icon: '🚁', title: 'Kedarnath Helicopter', route: '/kedarnath-helicopter-from/', price: '₹14,500', duration: '2–3 Days', desc: 'Skip the 22 km trek · fly from Phata helipad' },
  { icon: '🏛️', title: 'Golden Triangle Tour', route: '/golden-triangle-from/', price: '₹18,000', duration: '5–7 Days', desc: 'Delhi · Taj Mahal (Agra) · Pink City (Jaipur)' },
  { icon: '🌸', title: 'Do Dham Yatra', route: '/do-dham-from/', price: '₹14,500', duration: '5–6 Days', desc: 'Kedarnath + Badrinath — twin Dham circuit' },
  { icon: '🌊', title: 'Rishikesh Adventure', route: '/rishikesh-from/', price: '₹3,500', duration: '2–3 Days', desc: 'Rafting · Bungee · Yoga · Beach camping' },
  { icon: '🌺', title: 'Valley of Flowers', route: '/valley-of-flowers-from/', price: '₹12,000', duration: '5–6 Days', desc: 'UNESCO World Heritage · 500 wildflower species' },
  { icon: '🪔', title: 'Varanasi Pilgrimage', route: '/varanasi-from/', price: '₹6,500', duration: '2–3 Days', desc: 'Kashi Vishwanath · Ganga Aarti · Sarnath Buddha' },
  { icon: '🏔️', title: 'Mussoorie Tour', route: '/mussoorie-from/', price: '₹5,500', duration: '2–3 Days', desc: 'Queen of Hills · Kempty Falls · Lal Tibba viewpoint' },
  { icon: '🚣', title: 'Nainital Tour', route: '/nainital-from/', price: '₹7,500', duration: '3–4 Days', desc: 'Naini Lake · Naina Devi Temple · Corbett National Park' },
  { icon: '🪈', title: 'Mathura Vrindavan', route: '/mathura-vrindavan-from/', price: '₹4,500', duration: '1–2 Days', desc: 'Birthplace of Krishna · Banke Bihari · Holi capital' },
  { icon: '🕯️', title: 'Ayodhya Tour', route: '/ayodhya-from/', price: '₹5,500', duration: '1–2 Days', desc: 'Ram Lalla temple · Sarayu Ghat Aarti · Ram Path' },
];

const SCHEMA = (city: NonNullable<City>) => {
  const isIntl = (city as any).is_international;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `India Tour Packages from ${city.name}`,
        description: `India pilgrimage, adventure and heritage tour packages departing from ${city.name}. Char Dham Yatra, Kedarnath, Golden Triangle and more — operated by Junegiri Yatra, Haridwar.`,
        url: `https://junegiriyatra.com/india-tour-from/${city.slug}/`,
        provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+919873897652' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'India Tour Packages', item: 'https://junegiriyatra.com/india-tour-from/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/india-tour-from/${city.slug}/` },
        ],
      },
      ...(isIntl ? [{
        '@type': 'FAQPage',
        mainEntity: ((city as any).faq || []).map((f: { q: string; a: string }) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }] : []),
    ],
  };
};

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const isIntl = (city as any).is_international;
  const country = (city as any).country;
  const visaNote = (city as any).visa_note;
  const faq = (city as any).faq || [];
  const waText = encodeURIComponent(`Namaste! I want to book an India tour package from ${city.name}. Please share options and details.`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA(city)) }} />

      {/* HERO */}
      <section className="city-hero">
        <Image src="/images/char_dham_yatra.webp" alt="India Tour" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/india-tour-from/">India Tour Packages</Link>
            <span>›</span>
            <span>{city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            India Tour Packages<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            Spiritual journeys · Himalayan treks · Heritage circuits.
            Travel time from {city.name}: <strong>{city.total_time}</strong>
          </p>
          <a href={`https://wa.me/919873897652?text=${waText}`} className="btn-gold-hero" target="_blank" rel="noopener noreferrer">
            📲 WhatsApp for Custom Itinerary
          </a>
        </div>
      </section>

      {/* INTERNATIONAL TRAVEL INFO */}
      {isIntl && (
        <section className="city-hook" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <p className="city-hook-text">
              ✈️ <strong>Travelling from {country}?</strong> Fly to <strong>Delhi Indira Gandhi International Airport (DEL)</strong> — the closest hub to all North India and Himalayan destinations.
              From Delhi, our team picks you up and transfers you to Haridwar (220 km · 5 hrs) or directly to your destination.
              {visaNote && <><br />🪪 <strong>Visa:</strong> {visaNote}</>}
            </p>
          </div>
        </section>
      )}

      {/* HOW TO REACH */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">How to Reach India from {city.name}</h2>
          <p className="section-sub-left">
            {isIntl
              ? `Fly to Delhi (DEL), then transfer to Haridwar — the gateway to all Uttarakhand and North India tours.`
              : `Your journey to North India starts at Haridwar. Here's how to get there from ${city.name}.`}
          </p>
          <div className="route-cards">
            <div className="route-card route-best">
              <div className="route-card-header">
                <span className="route-icon">✈️</span>
                <span className="route-mode">By Flight</span>
                <span className="route-badge">Recommended</span>
              </div>
              <table className="route-table">
                <tbody>
                  <tr><td>Route</td><td>{city.flight.route}</td></tr>
                  <tr><td>Duration</td><td>{city.flight.duration}</td></tr>
                  <tr><td>Airlines</td><td>{city.flight.airlines}</td></tr>
                  <tr><td>Fare</td><td>{city.flight.fare_range}</td></tr>
                  <tr><td>+Transfer</td><td>{city.haridwar_transfer}</td></tr>
                </tbody>
              </table>
            </div>
            {!isIntl && (
              <div className={`route-card${city.best_mode === 'train' ? ' route-best' : ''}`}>
                <div className="route-card-header">
                  <span className="route-icon">🚆</span>
                  <span className="route-mode">By Train</span>
                  {city.best_mode === 'train' && <span className="route-badge">Recommended</span>}
                </div>
                <table className="route-table">
                  <tbody>
                    <tr><td>Train</td><td>{city.train.name}</td></tr>
                    <tr><td>Duration</td><td>{city.train.duration}</td></tr>
                    <tr><td>Station</td><td>Haridwar Junction (HW)</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PACKAGE GRID */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">India Tour Packages — All Starting from {city.name}</h2>
          <p className="section-sub-left light">Click any package for city-specific travel details, itinerary, and WhatsApp booking.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
            {PACKAGES.map((pkg) => (
              <Link key={pkg.route} href={`${pkg.route}${city.slug}/`} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{pkg.icon}</div>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.95rem' }}>{pkg.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2 }}>{pkg.desc}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 4 }}>
                  From <strong style={{ color: 'var(--gold)' }}>{pkg.price}</strong> · {pkg.duration}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: 6 }}>View {city.name} package →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (international cities have richer FAQs) */}
      {faq.length > 0 && (
        <section className="city-section">
          <div className="container">
            <h2 className="section-title-left">India Travel — FAQ from {city.name}</h2>
            <div className="faq-list">
              {faq.map((f: { q: string; a: string }, i: number) => (
                <details key={i} className="faq-item">
                  <summary className="faq-question">{f.q}</summary>
                  <p className="faq-answer">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Plan your India journey from {city.name}</p>
            <p className="city-cta-sub">We handle flights coordination, Delhi pickup, permits, hotels, and all on-ground logistics.</p>
          </div>
          <div className="city-cta-btns">
            <a href={`https://wa.me/919873897652?text=${waText}`} className="btn-gold-lg" target="_blank" rel="noopener noreferrer">
              📲 WhatsApp for Free Itinerary
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
