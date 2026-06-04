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

  // Tier 3 cities (low/zero demand) get noindex to protect site-wide quality signal
  const noindex = (city as unknown as { tier?: number }).tier === 3;
  const isIntl = (city as any).is_international;
  const title = isIntl
    ? `Golden Triangle Tour from ${city.name} 2026 | Delhi Agra Jaipur | Junegiri Yatra`
    : `Golden Triangle Tour from ${city.name} 2026 | Taj Mahal Package | Junegiri Yatra`;
  const desc = `Book Golden Triangle tour (Delhi–Agra–Jaipur) from ${city.name} — all-inclusive 5N/6D from ₹18,000. Taj Mahal, Amber Fort, Old Delhi. Private vehicle, certified guide, 24/7 support. WhatsApp for a custom quote.`;
  return {
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    title,
    description: desc,
    keywords: `golden triangle tour from ${city.name.toLowerCase()}, delhi agra jaipur from ${city.name.toLowerCase()}, taj mahal tour from ${city.name.toLowerCase()}, india heritage tour from ${city.name.toLowerCase()}`,
    alternates: { canonical: `https://junegiriyatra.com/golden-triangle-from/${city.slug}/` },
    openGraph: {
      title,
      description: desc,
      images: [{ url: 'https://junegiriyatra.com/images/golden_triangle.webp' }],
    },
  };
}

const ITINERARY = [
  { day: 'Day 1', title: 'Arrival Delhi', desc: 'Airport pickup · check-in hotel · Old Delhi tour: Jama Masjid, Chandni Chowk, Red Fort (exterior) · Connaught Place dinner' },
  { day: 'Day 2', title: 'Delhi Sightseeing', desc: 'Qutub Minar (UNESCO) · Humayun\'s Tomb (UNESCO) · India Gate · Rajpath · Lotus Temple · evening free' },
  { day: 'Day 3', title: 'Delhi → Agra', desc: 'Drive to Agra (200 km · 3 hrs) · Taj Mahal at noon (or sunrise next day option) · Agra Fort (UNESCO) · hotel check-in' },
  { day: 'Day 4', title: 'Agra → Jaipur', desc: 'Optional Taj Mahal sunrise · Itmad-ud-Daulah · Fatehpur Sikri ghost city · drive to Jaipur (240 km · 4 hrs) · hotel check-in' },
  { day: 'Day 5', title: 'Jaipur Sightseeing', desc: 'Amber Fort & elephant ride · City Palace · Hawa Mahal · Jantar Mantar (UNESCO) · Johari Bazaar shopping' },
  { day: 'Day 6', title: 'Jaipur → Delhi Departure', desc: 'Optional Nahargarh Fort sunrise · drive back to Delhi (280 km · 5 hrs) · IGI Airport drop · departure' },
];

const SCHEMA = (city: NonNullable<City>) => {
  const isIntl = (city as any).is_international;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Golden Triangle Tour from ${city.name}`,
        description: `5N/6D Delhi–Agra–Jaipur Golden Triangle tour from ${city.name}. Taj Mahal, Amber Fort, Qutub Minar — all-inclusive private tour.`,
        url: `https://junegiriyatra.com/golden-triangle-from/${city.slug}/`,
        touristType: 'Heritage traveller, International tourist, Cultural explorer',
        offers: {
          '@type': 'Offer',
          price: '18000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-01-01',
          validThrough: '2026-12-31',
        },
        provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+919873897652' },
        itinerary: {
          '@type': 'ItemList',
          itemListElement: ITINERARY.map((d, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${d.day}: ${d.title}`,
            description: d.desc,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'Golden Triangle Tour', item: 'https://junegiriyatra.com/golden-triangle-from/' },
          { '@type': 'ListItem', position: 3, name: `from ${city.name}`, item: `https://junegiriyatra.com/golden-triangle-from/${city.slug}/` },
        ],
      },
      ...(isIntl ? [{
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How do I get from ${city.name} to Delhi for the Golden Triangle tour?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Fly from ${city.name} to Delhi Indira Gandhi International Airport (DEL). Travel time: ${city.total_time}. Our team picks you up directly from the airport and your Golden Triangle tour begins immediately — no hotel stops first unless you prefer to rest.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Is the Taj Mahal open for international tourists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — the Taj Mahal is open to international visitors. Entry fee for foreigners: ₹1,300 per person (approx. USD 15–16). The monument is closed on Fridays. Sunrise visits (6:00 AM) are the most atmospheric and less crowded. We manage all entry permits and timing as part of the package.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I combine the Golden Triangle with Char Dham or Rishikesh?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — this is the most popular international India itinerary. Golden Triangle (5–6 days) + Varanasi (2 days) + Rishikesh/Haridwar (2–3 days) makes a perfect 10–12 day India trip. We arrange seamless transfers between all destinations. WhatsApp us for a combined itinerary.',
            },
          },
        ],
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
  const waText = encodeURIComponent(`Namaste! I want to book a Golden Triangle tour (Delhi–Agra–Jaipur) from ${city.name}. Please share package details and dates.`);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA(city)) }} />

      {/* HERO */}
      <section className="city-hero">
        <Image src="/images/golden_triangle.webp" alt="Golden Triangle Tour" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <Link href="/golden-triangle-from/">Golden Triangle Tour</Link>
            <span>›</span>
            <span>{city.name}</span>
          </nav>
          <h1 className="city-hero-h1">
            Golden Triangle Tour<br />
            <span className="city-name-gold">from {city.name}</span>
          </h1>
          <p className="city-hero-sub">
            Delhi · Taj Mahal (Agra) · Jaipur — 5N/6D all-inclusive from{' '}
            <strong>₹18,000/person</strong>.
            Travel time from {city.name}: <strong>{city.total_time}</strong>
          </p>
          <a href={`https://wa.me/919873897652?text=${waText}`} className="btn-gold-hero" target="_blank" rel="noopener noreferrer">
            📲 WhatsApp for {city.name} Quote
          </a>
        </div>
      </section>

      {/* INTERNATIONAL INFO BAR */}
      {isIntl && (
        <section className="city-hook" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <p className="city-hook-text">
              ✈️ <strong>From {country}:</strong> Fly to <strong>Delhi (DEL)</strong> — your Golden Triangle tour starts at the airport.
              Flight: {city.flight.route} · {city.flight.duration} · {city.flight.fare_range}.
              {visaNote && <><br />🪪 <strong>Visa:</strong> {visaNote}</>}
            </p>
          </div>
        </section>
      )}

      {/* OVERVIEW */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Golden Triangle from {city.name} — Overview</h2>
          <p className="section-sub-left">
            India&apos;s most popular international tour circuit. Three cities, three UNESCO clusters, five nights — all by private vehicle with a certified English-speaking guide.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 20 }}>
            {[
              { label: 'Duration', value: '5 Nights / 6 Days' },
              { label: 'Starting Price', value: '₹18,000/person' },
              { label: 'Cities', value: 'Delhi · Agra · Jaipur' },
              { label: 'Vehicle', value: 'Private AC car/SUV' },
              { label: 'Guide', value: 'Certified English guide' },
              { label: 'Pickup', value: 'Delhi IGI Airport (DEL)' },
            ].map((s) => (
              <div key={s.label} style={{ background: 'var(--surface)', borderRadius: 8, padding: '12px 16px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.9rem', marginTop: 2 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Day-by-Day Itinerary from {city.name}</h2>
          <p className="section-sub-left light">Your Golden Triangle tour — all departures from Delhi airport.</p>
          <div style={{ marginTop: 24 }}>
            {ITINERARY.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 70, background: 'var(--gold)', color: '#000', borderRadius: 6, padding: '4px 8px', textAlign: 'center', fontWeight: 700, fontSize: '0.78rem', flexShrink: 0 }}>{d.day}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.92rem' }}>{d.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: 2, lineHeight: 1.6 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">What&apos;s Included</h2>
          <div className="cdf-includes-grid">
            {[
              { icon: '🚐', title: 'Private AC Vehicle', desc: 'Dedicated car for all 3 cities — Delhi, Agra, Jaipur, Delhi. No shared coaches.' },
              { icon: '🏨', title: '5 Nights Hotel', desc: '2 nights Delhi, 1 night Agra, 2 nights Jaipur. Standard to premium options available.' },
              { icon: '🧭', title: 'Certified English Guide', desc: 'Local expert at each city — Taj Mahal, Amber Fort, Qutub Minar, and more.' },
              { icon: '🎟️', title: 'Monument Entry Fees', desc: 'Taj Mahal, Agra Fort, Amber Fort, Qutub Minar, Humayun\'s Tomb — all included.' },
              { icon: '✈️', title: `${isIntl ? country : city.state} Pickup`, desc: `We pick you up from Delhi airport on arrival from ${city.name}. Drop-off also arranged.` },
              { icon: '📱', title: '24/7 WhatsApp Support', desc: 'On-ground support throughout — flight delays, hotel changes, itinerary adjustments.' },
            ].map((item) => (
              <div key={item.title} className="cdf-include-card">
                <span className="cdf-include-icon">{item.icon}</span>
                <div>
                  <div className="cdf-include-title">{item.title}</div>
                  <div className="cdf-include-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTEND YOUR TRIP */}
      <section className="city-section city-section-alt">
        <div className="container">
          <h2 className="section-title-left">Extend Your India Trip from {city.name}</h2>
          <p className="section-sub-left">Combine your Golden Triangle with spiritual North India — same operator, seamless transfers.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 20 }}>
            {[
              { title: '+ Varanasi', desc: 'Add 2 days · Ganga Aarti · Kashi Vishwanath · Sarnath', href: `/varanasi-from/${city.slug}/` },
              { title: '+ Rishikesh', desc: 'Add 2–3 days · Rafting · Bungee · Yoga · Himalayan foothills', href: `/rishikesh-from/${city.slug}/` },
              { title: '+ Kedarnath', desc: 'Add 4 days · Jyotirlinga at 3,584 m · Trek or helicopter', href: `/kedarnath-from/${city.slug}/` },
              { title: '+ Char Dham Yatra', desc: 'Add 10–12 days · All 4 sacred Himalayan dhams', href: `/char-dham-from/${city.slug}/` },
            ].map((ext) => (
              <Link key={ext.href} href={ext.href} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.9rem' }}>{ext.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 2 }}>{ext.desc}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--gold)', marginTop: 6 }}>View package →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Golden Triangle from {city.name} — book in 2 minutes</p>
            <p className="city-cta-sub">WhatsApp us with your travel dates and group size. We send you a full itinerary and quote within hours.</p>
          </div>
          <div className="city-cta-btns">
            <a href={`https://wa.me/919873897652?text=${waText}`} className="btn-gold-lg" target="_blank" rel="noopener noreferrer">
              📲 WhatsApp for {city.name} Quote
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">📞 +91 98738 97652</a>
          </div>
        </div>
      </section>
    </>
  );
}
