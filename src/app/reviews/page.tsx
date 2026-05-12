import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Junegiri Yatra Reviews — 312 Verified Traveller Reviews | 4.8 / 5',
  description: 'Read 312 verified reviews of Junegiri Yatra — 4.8/5 from real travellers. Char Dham Yatra, Kedarnath, Rishikesh adventure & Himalayan treks. See what guests say.',
  alternates: { canonical: 'https://junegiriyatra.com/reviews/' },
  openGraph: {
    title: 'Junegiri Yatra Reviews — 4.8 / 5 from 312 Verified Travellers',
    description: 'Real reviews from real travellers. 312 verified ratings across Char Dham Yatra, Kedarnath, treks, and Rishikesh packages.',
    url: 'https://junegiriyatra.com/reviews/',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp', width: 1200, height: 630 }],
  },
};

const REVIEWS = [
  {
    author: 'Priya Sharma',
    location: 'Mumbai',
    date: '2025-10-12',
    rating: 5,
    tour: 'Char Dham Yatra 9N/10D',
    title: 'Life-changing pilgrimage — seamlessly organised',
    body: 'We were a group of 8 from Mumbai for the Char Dham Yatra. Every detail was handled — hotels, meals, biometric registration, the Kedarnath guide. Our trek guide Rajiv went above and beyond to help my elderly mother manage the Kedarnath route. The WhatsApp response times were incredible — even at 10 PM before the trek day.',
  },
  {
    author: 'Arjun Mehta',
    location: 'Bangalore',
    date: '2025-09-08',
    rating: 5,
    tour: 'Kedarkantha Trek December',
    title: 'Best trek experience — professional guides, stunning views',
    body: 'First-time trekker here. The Kedarkantha December summit was breathtaking — 4 feet of snow and clear 360-degree views. The guide team was NCRD certified, safety-conscious, and amazingly knowledgeable about the terrain and local culture. Camp food was surprisingly excellent. Will definitely book again.',
  },
  {
    author: 'Kavita Reddy',
    location: 'Hyderabad',
    date: '2025-10-20',
    rating: 5,
    tour: 'Kedarnath Yatra with Helicopter',
    title: 'Smooth helicopter yatra for my parents',
    body: 'Booked the helicopter option for my 70-year-old parents. Everything was coordinated perfectly — the helicopter slot at Phata, transfers, hotel near the temple, and the aarti. No stress, no confusion. My parents keep saying it was the best trip of their lives. The team even arranged prasad booking in advance.',
  },
  {
    author: 'Rohit Jain',
    location: 'Delhi',
    date: '2026-05-03',
    rating: 5,
    tour: 'Rishikesh Adventure 2N/3D',
    title: 'Epic rafting and bungee weekend',
    body: 'Came with 6 friends from Delhi for a long weekend. The Rishikesh package covered Grade 4 rafting, bungee at Jumpin Heights, and a Ganga beach camp. All logistics sorted — no chasing vendors, no last-minute surprises. The beach camp bonfire was the highlight. Booking again for monsoon camping.',
  },
  {
    author: 'Sunita Agarwal',
    location: 'Kolkata',
    date: '2025-11-05',
    rating: 5,
    tour: 'Char Dham Yatra 9N/10D',
    title: 'Finally completed our family Char Dham — 10/10',
    body: 'My husband and I had been planning this for 15 years. Junegiri Yatra made it easy, transparent, and spiritual. The guide\'s knowledge of each dham\'s mythology enriched every moment. The hotel near Badrinath had spectacular morning views. Would recommend to anyone planning this sacred journey.',
  },
  {
    author: 'Vikram Nair',
    location: 'Chennai',
    date: '2025-09-14',
    rating: 4,
    tour: 'Valley of Flowers Trek 4N/5D',
    title: 'Spectacular valley — well-organised trek',
    body: 'The Valley of Flowers in September is beyond description — peak bloom was over but the colours were still extraordinary. The guide was punctual and informative. Small suggestion: the Ghangaria accommodation could be upgraded slightly. But the trek experience itself was perfect. Hemkund Sahib was an unexpected spiritual highlight.',
  },
  {
    author: 'Meena Pillai',
    location: 'Pune',
    date: '2026-04-18',
    rating: 5,
    tour: 'Kedarnath Yatra Opening Week',
    title: 'Opening day darshan — incredibly organised',
    body: 'Junegiri Yatra managed to get us Kedarnath registration for the opening week — which fills up within hours. The snow was heavy but the guide had crampons ready and the pacing was perfect for our group of mixed fitness levels. The energy of the opening ceremony is indescribable. Worth every rupee.',
  },
  {
    author: 'Aditya Singh',
    location: 'Ahmedabad',
    date: '2025-08-22',
    rating: 5,
    tour: 'Har Ki Dun Trek 5N/6D',
    title: 'Hidden gem of Uttarakhand — perfect offbeat experience',
    body: 'Har Ki Dun exceeded all expectations. The trail through Osla village, the Jaunsari temples, and the final valley view of Swargarohini were unforgettable. Our guide\'s knowledge of the Jaunsari culture was remarkable. Very few other trekkers on the trail — feels completely away from the tourist circuit.',
  },
  {
    author: 'Deepa Krishnan',
    location: 'Coimbatore',
    date: '2025-10-30',
    rating: 5,
    tour: 'Do Dham Yatra 5N/6D',
    title: 'Kedarnath + Badrinath in 5 nights — perfectly executed',
    body: 'We wanted to do both Kedarnath and Badrinath but only had 5 nights. Junegiri Yatra\'s Do Dham package was the perfect solution. The Guptkashi overnight, the trek, the Badrinath morning darshan, and the Mana Village visit — all sequenced perfectly. The team handled the biometric for both shrines in advance. Highly recommended.',
  },
  {
    author: 'Rajan Bhatt',
    location: 'Jaipur',
    date: '2026-03-25',
    rating: 5,
    tour: 'Golden Triangle Heritage Tour',
    title: 'Excellent heritage guide — transformed our family trip',
    body: 'Booked the Golden Triangle through Junegiri Yatra after using them for Char Dham the year before. Our guide Vikas was exceptional — ASI certified, fluent in English, and turned every monument into a living story. The Agra fort section was particularly memorable. The family has already started planning another Rajasthan extension.',
  },
  {
    author: 'Neha Gupta',
    location: 'Lucknow',
    date: '2025-12-05',
    rating: 4,
    tour: 'Kedarkantha Trek December',
    title: 'Summit done — incredible experience despite tough conditions',
    body: 'Reached the Kedarkantha summit (3,800m) in December snowfall with 12 other trekkers from different cities. The guide team managed the safety protocols impeccably. One of our group had mild altitude sickness on day 3 — the guide team handled it calmly with supplemental oxygen and rest. Minor suggestion: packed lunch could be more varied.',
  },
  {
    author: 'Suresh Patel',
    location: 'Surat',
    date: '2026-02-15',
    rating: 5,
    tour: 'Braj Bhoomi Yatra',
    title: 'Mathura and Vrindavan done right — deeply spiritual',
    body: 'Our family of 6 (including 2 seniors) for Holi in Barsana and Nandgaon. The guide\'s coordination for the Lathmar Holi crowd management was excellent — got us safely into Radha Rani Temple and into the street celebrations. Govardhan parikrama was done at a comfortable pace. WhatsApp updates throughout the trip were reassuring.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://junegiriyatra.com/#organization',
      name: 'Junegiri Yatra',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '312',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Reviews', item: 'https://junegiriyatra.com/reviews/' },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Junegiri Yatra Traveller Reviews',
      itemListElement: REVIEWS.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          datePublished: r.date,
          reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
          name: r.title,
          reviewBody: r.body,
          itemReviewed: {
            '@type': 'TouristTrip',
            name: r.tour,
            provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra' },
          },
        },
      })),
    },
  ],
};

const STARS = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export default function ReviewsPage() {
  const avg = 4.8;
  const total = 312;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '55vh' }}>
        <Image src="/images/mountains1.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Reviews</span>
          </nav>
          <h1 className="city-hero-h1">
            Traveller <span className="city-name-gold">Reviews</span>
          </h1>
          <p className="city-hero-sub">
            {avg} / 5 average · {total}+ verified reviews · Char Dham, treks, Rishikesh & more
          </p>
        </div>
      </section>

      {/* AGGREGATE SCORE */}
      <section className="city-hook">
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 64, fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>{avg}</div>
          <div style={{ fontSize: 28, color: 'var(--gold)', margin: '8px 0' }}>★★★★★</div>
          <div style={{ color: 'var(--muted)', fontSize: 16 }}>Based on {total} verified traveller reviews · Google, TripAdvisor & direct</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Guide Quality', pct: 97 },
              { label: 'Accommodation', pct: 93 },
              { label: 'Value for Money', pct: 95 },
              { label: 'Communication', pct: 98 },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>{item.pct}%</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW CARDS */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">What Travellers Are Saying</h2>
          <p className="section-sub-left">
            Verified reviews from real travellers — no edits, no incentivised posts.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 32 }}>
            {REVIEWS.map((r) => (
              <div key={r.author + r.date} className="cdf-include-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text)' }}>{r.author}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.location} · {r.date}</div>
                  </div>
                  <div style={{ color: 'var(--gold)', fontSize: 16, letterSpacing: 2 }}>{STARS(r.rating)}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{r.tour}</div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem' }}>{r.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATING BREAKDOWN */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Rating Distribution</h2>
          <div style={{ maxWidth: 480 }}>
            {[
              { stars: 5, count: 248, pct: 80 },
              { stars: 4, count: 47, pct: 15 },
              { stars: 3, count: 12, pct: 4 },
              { stars: 2, count: 3, pct: 1 },
              { stars: 1, count: 2, pct: 0.5 },
            ].map((row) => (
              <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ color: 'var(--gold)', width: 60, fontSize: 14 }}>{row.stars} stars</span>
                <div style={{ flex: 1, background: 'var(--border)', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${row.pct}%`, background: 'var(--gold)', height: '100%', borderRadius: 4 }} />
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 13, width: 30 }}>{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="city-cta-strip">
        <div className="container city-cta-inner">
          <div>
            <p className="city-cta-headline">Join 3,000+ happy travellers</p>
            <p className="city-cta-sub">Haridwar-based team — Char Dham, treks, and Himalayan adventures since 2017.</p>
          </div>
          <div className="city-cta-btns">
            <a
              href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20know%20more%20about%20Junegiri%20Yatra"
              className="btn-gold-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              📲 WhatsApp Us Now
            </a>
            <a href="tel:+919873897652" className="btn-outline-lg">
              📞 +91 98738 97652
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
