import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Junegiri Yatra — WhatsApp +91 98738 97652 | Haridwar Tour Operator',
  description:
    'Contact Junegiri Yatra — WhatsApp +91 98738 97652, email info@junegiriyatra.com. Haridwar-based India tour operator. We respond within 60 minutes. Book Char Dham Yatra, Himalayan treks & India tours.',
  alternates: { canonical: 'https://junegiriyatra.com/contact/' },
  openGraph: {
    title: 'Contact Junegiri Yatra | WhatsApp +91 98738 97652',
    description:
      'Get in touch with our Haridwar team for Char Dham Yatra, Himalayan treks, and India tours. Reply guaranteed within 60 minutes.',
    url: 'https://junegiriyatra.com/contact/',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.jpg', width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TravelAgency', 'LocalBusiness'],
      '@id': 'https://junegiriyatra.com/#organization',
      name: 'Junegiri Yatra',
      url: 'https://junegiriyatra.com',
      telephone: '+919873897652',
      email: 'info@junegiriyatra.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Haridwar',
        addressRegion: 'Uttarakhand',
        postalCode: '249401',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.9457,
        longitude: 78.1642,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/junegiriyatra',
        'https://www.facebook.com/junegiriyatra',
        'https://wa.me/919873897652',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://junegiriyatra.com/contact/' },
      ],
    },
  ],
};

const CONTACT_METHODS = [
  {
    icon: '💬',
    title: 'WhatsApp (Fastest)',
    value: '+91 98738 97652',
    action: 'https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package',
    label: 'Open WhatsApp',
    note: 'Response in under 60 minutes · Available 8 AM–10 PM IST',
  },
  {
    icon: '📞',
    title: 'Phone Call',
    value: '+91 98738 97652',
    action: 'tel:+919873897652',
    label: 'Call Now',
    note: 'Mon–Sat 8 AM–8 PM · Sun 9 AM–6 PM IST',
  },
  {
    icon: '📧',
    title: 'Email',
    value: 'info@junegiriyatra.com',
    action: 'mailto:info@junegiriyatra.com',
    label: 'Send Email',
    note: 'Response within 24 hours · Attach your travel brief',
  },
  {
    icon: '📸',
    title: 'Instagram',
    value: '@junegiriyatra',
    action: 'https://instagram.com/junegiriyatra',
    label: 'Follow Us',
    note: 'Travel inspiration · Trip updates · Reels from the Himalayas',
  },
];

const TOPICS = [
  { q: 'Char Dham Yatra', wa: 'I want to book Char Dham Yatra package' },
  { q: 'Kedarnath Yatra', wa: 'I want to book Kedarnath Yatra package' },
  { q: 'Himalayan Treks', wa: 'I want to enquire about Himalayan trek packages' },
  { q: 'Rishikesh Adventures', wa: 'I want to book Rishikesh adventure package' },
  { q: 'Golden Triangle', wa: 'I want to book Golden Triangle tour' },
  { q: 'Kedarnath Helicopter', wa: 'I want to book Kedarnath helicopter package' },
  { q: 'Group Booking (6+)', wa: 'I have a group of 6+ people for a tour package' },
  { q: 'Custom Itinerary', wa: 'I need a custom tour itinerary' },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section
        className="city-hero"
        style={{ backgroundImage: "url('/images/mountains1.jpg')", minHeight: '45vh' }}
      >
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Contact</span>
          </nav>
          <h1 className="city-hero-h1">
            Contact <span className="city-name-gold">Junegiri Yatra</span>
          </h1>
          <p className="city-hero-sub">
            WhatsApp us — we respond within 60 minutes · Haridwar, Uttarakhand
          </p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Get in Touch</h2>
          <p className="section-sub-left">
            Choose the channel that works best for you. WhatsApp is fastest — most bookings start with
            a simple message.
          </p>
          <div className="cdf-includes-grid">
            {CONTACT_METHODS.map((method) => (
              <div key={method.title} className="cdf-include-card" style={{ flexDirection: 'column', gap: 12 }}>
                <span style={{ fontSize: 32 }}>{method.icon}</span>
                <div>
                  <div className="cdf-include-title">{method.title}</div>
                  <div style={{ color: 'var(--gold)', fontWeight: 600, marginBottom: 4 }}>{method.value}</div>
                  <div className="cdf-include-desc" style={{ marginBottom: 10 }}>{method.note}</div>
                  <a
                    href={method.action}
                    className="btn-gold-lg"
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ display: 'inline-block', fontSize: '0.85rem', padding: '8px 16px' }}
                  >
                    {method.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK WA TOPICS */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Quick WhatsApp Links</h2>
          <p className="section-sub-left light">
            Pre-filled WhatsApp messages — tap your topic and we know exactly how to help.
          </p>
          <div className="cdf-city-grid">
            {TOPICS.map((t) => (
              <a
                key={t.q}
                href={`https://wa.me/919873897652?text=${encodeURIComponent('Namaste! ' + t.wa)}`}
                className="cdf-city-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="cdf-city-name">💬 {t.q}</span>
                <span className="cdf-city-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE & NAP */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Our Office</h2>
          <div className="cdf-steps" style={{ maxWidth: 600 }}>
            <div className="cdf-step">
              <div className="cdf-step-num">📍</div>
              <div>
                <div className="cdf-step-title">Junegiri Yatra</div>
                <div className="cdf-step-desc">
                  Haridwar, Uttarakhand — 249401, India<br />
                  <strong>Phone:</strong> <a href="tel:+919873897652">+91 98738 97652</a><br />
                  <strong>Email:</strong> <a href="mailto:info@junegiriyatra.com">info@junegiriyatra.com</a>
                </div>
              </div>
            </div>
            <div className="cdf-step">
              <div className="cdf-step-num">⏰</div>
              <div>
                <div className="cdf-step-title">Business Hours</div>
                <div className="cdf-step-desc">
                  Monday – Saturday: 8:00 AM – 8:00 PM IST<br />
                  Sunday: 9:00 AM – 6:00 PM IST<br />
                  WhatsApp support available till 10:00 PM during peak pilgrimage season
                </div>
              </div>
            </div>
            <div className="cdf-step">
              <div className="cdf-step-num">🏛</div>
              <div>
                <div className="cdf-step-title">Registrations</div>
                <div className="cdf-step-desc">
                  Uttarakhand Tourism Licensed · ATOI Approved · GST Registered<br />
                  NCRD-Certified Trek Guides · Fully Insured Operations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">Common Questions</h2>
          <div className="cdf-steps">
            {[
              { q: 'How quickly do you respond?', a: 'We respond within 60 minutes on WhatsApp during business hours (8 AM–8 PM IST). During peak Char Dham season (May–June), we\'re available until 10 PM.' },
              { q: 'Do you offer free itinerary planning?', a: 'Yes, absolutely. WhatsApp us your dates, group size, and interests and we\'ll send you a fully customised, all-inclusive itinerary with transparent pricing — with zero obligation.' },
              { q: 'Can you arrange international flights?', a: 'We don\'t book international flights, but we coordinate seamlessly from your arrival at Delhi or Mumbai airport. We handle all India-based transport, hotels, guides, and permits.' },
              { q: 'What is your cancellation policy?', a: 'Full flexibility up to 7 days before departure for a full refund. Between 7 and 3 days — 50% refund. Less than 3 days — no refund. If we cancel due to weather or government restrictions, 100% refund.' },
            ].map((faq) => (
              <div key={faq.q} className="cdf-step">
                <div className="cdf-step-num">?</div>
                <div>
                  <div className="cdf-step-title">{faq.q}</div>
                  <div className="cdf-step-desc">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
