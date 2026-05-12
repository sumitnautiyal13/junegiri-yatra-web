import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy | Junegiri Yatra',
  description: 'Privacy Policy for Junegiri Yatra — how we collect, use, and protect your personal information when you book Char Dham, Kedarnath, or India tour packages.',
  alternates: { canonical: 'https://junegiriyatra.com/privacy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '35vh' }}>
        <Image src="/images/mountains1.webp" alt="Privacy Policy" fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="city-hero-h1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>Privacy Policy</h1>
          <p className="city-hero-sub">Effective date: 1 January 2025 · Last updated: 10 May 2026</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="city-section">
        <div className="container" style={{ maxWidth: 860 }}>

          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
            Junegiri Yatra (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a travel agency based in Haridwar, Uttarakhand, India.
            This Privacy Policy explains how we collect, use, and protect your personal information when you visit
            <strong> junegiriyatra.com</strong> or contact us via WhatsApp, phone, or email to book a tour.
          </p>

          {[
            {
              title: '1. Information We Collect',
              body: `We collect information you provide directly when enquiring about or booking a tour:
• Name, email address, and phone number
• Travel dates, group size, and destination preferences
• WhatsApp conversation content (for booking coordination)
• Payment confirmation details (we do not store card numbers)

We may also automatically collect:
• Browser type, device type, and IP address (via server logs)
• Pages visited and time spent on site (via analytics)
• Referring website or search query`,
            },
            {
              title: '2. How We Use Your Information',
              body: `We use your information to:
• Respond to tour enquiries and provide customised itineraries
• Confirm bookings and send pre-trip information
• Coordinate logistics (transport, hotels, permits) on your behalf
• Improve our website and services
• Send occasional updates about new packages (only if you opt in)

We do not use your data for automated profiling or AI-based decision-making.`,
            },
            {
              title: '3. Sharing of Information',
              body: `We share your data only as necessary to operate your tour:
• Hotels, transport providers, and guides involved in your trip
• Government permit portals (e.g., Char Dham registration, forest permits)
• Payment processors (for transaction confirmation only)

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
            },
            {
              title: '4. Data Retention',
              body: `We retain booking records for up to 3 years after your travel date for accounting and legal compliance. WhatsApp conversations are retained as long as necessary for customer service. You may request deletion of your data at any time by contacting us.`,
            },
            {
              title: '5. Cookies & Analytics',
              body: `Our website uses minimal cookies necessary for site functionality. We may use Google Analytics (anonymised IP) to understand how visitors use our site. You can disable cookies in your browser settings without affecting your ability to use the site.`,
            },
            {
              title: '6. Security',
              body: `We implement appropriate technical and organisational measures to protect your data, including HTTPS encryption, secure server infrastructure, and restricted staff access to personal data.`,
            },
            {
              title: '7. Your Rights',
              body: `You have the right to:
• Access the personal data we hold about you
• Correct inaccurate information
• Request deletion of your data
• Withdraw consent to marketing communications at any time

To exercise any of these rights, contact us via WhatsApp or email.`,
            },
            {
              title: '8. Children\'s Privacy',
              body: `Our services are intended for adults (18+). We do not knowingly collect personal information from children under 13 without parental consent. If you believe your child has provided us with personal data, please contact us immediately.`,
            },
            {
              title: '9. Changes to This Policy',
              body: `We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of our site after changes constitutes acceptance of the updated policy.`,
            },
            {
              title: '10. Contact Us',
              body: `If you have any questions about this Privacy Policy or your personal data:

Junegiri Yatra
Haridwar, Uttarakhand 249401, India
📞 +91 98738 97652
📲 WhatsApp: wa.me/919873897652
📧 junegiriyatra@gmail.com`,
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gold)', marginBottom: 10 }}>
                {section.title}
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
                {section.body}
              </p>
            </div>
          ))}

          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>← Back to Home</Link>
            <Link href="/contact/" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>Contact Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
