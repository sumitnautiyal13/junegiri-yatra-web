import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment & Bank Details | Junegiri Yatra',
  description:
    'Bank account details to pay for your Junegiri Yatra trip — Char Dham Yatra, Himalayan treks and India tours. Account name, number and IFSC for NEFT, IMPS, RTGS',
  alternates: { canonical: 'https://junegiriyatra.com/payment/' },
  openGraph: {
    title: 'Payment & Bank Details | Junegiri Yatra',
    description:
      'Bank account details to pay for your Junegiri Yatra trip via NEFT, IMPS, RTGS or UPI.',
    url: 'https://junegiriyatra.com/payment/',
    images: [{ url: 'https://junegiriyatra.com/images/mountains1.webp', width: 1200, height: 630 }],
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
    { '@type': 'ListItem', position: 2, name: 'Payment', item: 'https://junegiriyatra.com/payment/' },
  ],
};

const BANK = [
  { label: 'Account Name', value: 'Junegiri Farms Pvt. Ltd' },
  { label: 'Account Number', value: '92602001843109', mono: true },
  { label: 'IFSC Code', value: 'UTIB0000156', mono: true },
  { label: 'Bank', value: 'Axis Bank' },
];

const WA = 'https://wa.me/919873897652?text=' +
  encodeURIComponent('Namaste! I have made a payment for my trip — sharing the transaction details.');

export default function PaymentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* HERO */}
      <section className="city-hero" style={{ minHeight: '45vh' }}>
        <Image src="/images/mountains1.webp" alt="" aria-hidden fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner">
          <nav className="city-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>›</span>
            <span>Payment</span>
          </nav>
          <h1 className="city-hero-h1">
            How to <span className="city-name-gold">Pay</span>
          </h1>
          <p className="city-hero-sub">
            Bank account details to confirm your trip — NEFT, IMPS, RTGS or UPI
          </p>
        </div>
      </section>

      {/* BANK DETAILS + QR */}
      <section className="city-section">
        <div className="container">
          <h2 className="section-title-left">Pay by Bank Transfer or UPI / QR</h2>
          <p className="section-sub-left">
            Scan the QR with any UPI or banking app, or transfer to the account below via
            NEFT, IMPS, RTGS or UPI to book your trip.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 28,
              alignItems: 'flex-start',
            }}
          >
            {/* Bank account card */}
            <div
              className="cdf-include-card"
              style={{
                flexDirection: 'column',
                gap: 0,
                width: '100%',
                maxWidth: 520,
                padding: 0,
                overflow: 'hidden',
              }}
            >
              {BANK.map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                  }}
                >
                  <span style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      color: 'var(--heading)',
                      fontWeight: 700,
                      fontSize: row.mono ? 17 : 15,
                      fontFamily: row.mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
                      letterSpacing: row.mono ? 1 : 0,
                      textAlign: 'right',
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Scan-to-pay QR card */}
            <div
              className="cdf-include-card"
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                padding: 24,
                width: '100%',
                maxWidth: 300,
              }}
            >
              <span style={{ color: 'var(--muted)', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                Scan &amp; Pay
              </span>
              <div style={{ background: '#fff', padding: 12, borderRadius: 12, border: '1px solid var(--border)' }}>
                <Image
                  src="/images/junegiri-bharatqr.png"
                  alt="BharatQR code to pay Junegiri Farms Pvt. Ltd via any UPI or banking app"
                  width={232}
                  height={232}
                  style={{ display: 'block', width: 232, height: 232 }}
                />
              </div>
              <span style={{ color: 'var(--heading)', fontWeight: 700, fontSize: 14, textAlign: 'center' }}>
                Junegiri Farms Pvt. Ltd
              </span>
              <span style={{ color: 'var(--muted)', fontSize: 12.5, textAlign: 'center', lineHeight: 1.5 }}>
                Axis Bank · BharatQR — works with GPay, PhonePe, Paytm, BHIM &amp; all banking apps
              </span>
            </div>
          </div>

          <p style={{ marginTop: 18, color: 'var(--muted)', fontSize: 14, maxWidth: 520 }}>
            Junegiri Yatra is operated by <strong>Junegiri Farms Pvt. Ltd</strong>. The account
            and QR above belong to the same company — please confirm the name shows as
            <strong> Junegiri Farms Private</strong> in your app before paying.
          </p>
        </div>
      </section>

      {/* AFTER PAYMENT */}
      <section className="city-section city-section-dark">
        <div className="container">
          <h2 className="section-title-left light">After You Pay</h2>
          <p className="section-sub-left light">
            Share your payment confirmation on WhatsApp and we&apos;ll lock in your booking right away.
          </p>
          <a
            href={WA}
            className="btn-gold-lg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block' }}
          >
            💬 Share Payment on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
