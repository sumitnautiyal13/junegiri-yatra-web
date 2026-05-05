import Link from 'next/link';
import { getAllPackages, getAllHubs } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Junegiri Yatra — India Tour Packages | Char Dham, Treks, Golden Triangle',
  description: 'India\'s most trusted travel company — Char Dham Yatra, Kedarnath, Himalayan treks, Golden Triangle, Kerala tours. All-inclusive packages from Haridwar, Uttarakhand.',
  alternates: { canonical: 'https://junegiriyatra.com/' },
};

export default function HomePage() {
  const packages = getAllPackages().slice(0, 3);
  const hubs = getAllHubs();

  return (
    <>
      {/* HERO */}
      <section style={{
        minHeight: '85vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0d3b12 50%, #0a0a0a 100%)',
        display: 'flex',
        alignItems: 'center',
        marginTop: 84,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://junegiriyatra.com/assets/images/kedarnath_temple_cover.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{
              background: 'rgba(255,107,0,0.9)', color: '#fff', padding: '6px 18px',
              borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: 2,
            }}>
              🇮🇳 INDIA&apos;S TRUSTED TRAVEL PARTNER
            </span>
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: 20, lineHeight: 1.15 }}>
            Sacred Journeys &amp; <em style={{ fontStyle: 'normal', color: '#FFC107' }}>Grand Adventures</em><br />
            Across India
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.85)', maxWidth: 700, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Char Dham Yatra · Golden Triangle · Himalayan Treks · Rishikesh Adventures · Kerala Backwaters · Rajasthan Palaces
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20my%20India%20trip" className="btn btn-wa" target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, padding: '18px 36px' }}>
              📱 Plan My Trip on WhatsApp
            </a>
            <Link href="/packages/char-dham-yatra/" className="btn btn-outline" style={{ fontSize: 16, padding: '18px 36px' }}>
              View Packages
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
            {[['2,847+', 'Happy Travelers'], ['4.8/5', '312 Reviews'], ['8+ Yrs', 'Experience'], ['100%', 'Satisfaction']].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFC107', fontFamily: 'Poppins, sans-serif' }}>{num}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="section">
        <div className="container">
          <h2 className="s-title">Explore <em>India</em></h2>
          <p className="s-sub">Every kind of journey — sacred pilgrimages, mountain treks, royal heritage, coastal paradise</p>
          <div className="s-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { title: 'Char Dham Yatra', sub: 'Sacred Pilgrimage', url: '/packages/char-dham-yatra/', img: 'https://junegiriyatra.com/assets/images/kedarnath_temple_cover.jpg', tag: 'Most Popular' },
              { title: 'Golden Triangle', sub: 'Delhi · Agra · Jaipur', url: '/packages/golden-triangle/', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg', tag: 'Iconic India' },
              { title: 'Taj Mahal Tours', sub: 'Day Trips & Multi-Day', url: '/packages/taj-mahal-tours/', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg', tag: 'Bestseller' },
            ].map((cat) => (
              <Link key={cat.url} href={cat.url} style={{ display: 'block', borderRadius: 14, overflow: 'hidden', position: 'relative', height: 280, textDecoration: 'none' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${cat.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform .4s' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                  <span style={{ background: 'rgba(255,107,0,0.9)', color: '#fff', padding: '3px 12px', borderRadius: 50, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{cat.tag}</span>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Poppins, sans-serif', marginTop: 8 }}>{cat.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{cat.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PACKAGES */}
      <section className="section" style={{ background: 'var(--card)' }}>
        <div className="container">
          <h2 className="s-title">Featured <em>Packages</em></h2>
          <p className="s-sub">All-inclusive packages — hotel, meals, transport. No hidden costs.</p>
          <div className="s-line" />
          <div className="pkg-grid">
            {packages.map((pkg) => (
              <div key={pkg.slug} className="pkg-card fade-in">
                <div className="pkg-img" style={{ backgroundImage: `url('${pkg.hero_image}')` }}>
                  {pkg.tag && <span className="pkg-tag">{pkg.tag}</span>}
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <p className="pkg-dur">{pkg.duration}</p>
                  <div className="pkg-price-block">
                    <span className="price-primary" style={{ fontSize: '1.4rem' }}>₹{pkg.price_from.toLocaleString('en-IN')}</span>
                    <span className="price-suffix">/person</span>
                  </div>
                  <p className="pkg-route">{pkg.destinations_short}</p>
                  <div className="pkg-btns">
                    <Link href={pkg.url} className="btn btn-outline">View Details</Link>
                    <a href={`https://wa.me/919873897652?text=${encodeURIComponent(pkg.wa_text)}`} className="btn btn-wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JUNEGIRI */}
      <section className="section">
        <div className="container">
          <h2 className="s-title">Why <em>Junegiri Yatra?</em></h2>
          <p className="s-sub">8 years of trust. 2,847+ happy travellers. Haridwar-based, Himalaya-expert.</p>
          <div className="s-line" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[
              { icon: '🏔', title: 'Himalayan Experts', desc: '8+ years operating in Uttarakhand. We know every mountain road.' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'All-inclusive pricing. No hidden costs. INR for India, international rates for global visitors.' },
              { icon: '📱', title: 'WhatsApp Support', desc: '24/7 support on WhatsApp. Reply within minutes during season.' },
              { icon: '✅', title: '100% Satisfaction', desc: 'Guaranteed quality on hotels, food, and transport. Or we refund.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: '#fff' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg,var(--s2),var(--dark))', textAlign: 'center' }}>
        <div className="container">
          <h2 className="s-title">Start Planning Your <em>India Journey</em></h2>
          <p className="s-sub">Tell us where you want to go. We&apos;ll build the perfect package for your group, dates, and budget.</p>
          <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20plan%20an%20India%20trip%20with%20Junegiri%20Yatra" className="btn btn-wa" target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, padding: '18px 36px', marginTop: 24, display: 'inline-flex' }}>
            📱 WhatsApp +91 98738 97652
          </a>
        </div>
      </section>

      {/* SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        url: 'https://junegiriyatra.com',
        logo: 'https://junegiriyatra.com/assets/logo.png',
        telephone: '+919873897652',
        address: { '@type': 'PostalAddress', addressLocality: 'Haridwar', addressRegion: 'Uttarakhand', addressCountry: 'IN' },
        description: 'India tour operator offering Char Dham Yatra, Golden Triangle, Himalayan treks and adventure tourism.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 312 },
      }) }} />
    </>
  );
}
