import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found | Junegiri Yatra',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="city-hero">
        <Image src="/images/mountains1.webp" alt="Page not found" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
      <div className="city-hero-overlay" />
      <div className="container city-hero-inner" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 80, margin: 0, lineHeight: 1 }}>🏔</p>
        <h1 className="city-hero-h1" style={{ marginTop: 16 }}>
          Page Not Found
        </h1>
        <p className="city-hero-sub" style={{ maxWidth: 480, margin: '12px auto 32px' }}>
          The page you&apos;re looking for has moved or doesn&apos;t exist.
          Let us help you find your perfect India journey.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/919873897652?text=Namaste!%20I%20need%20help%20finding%20a%20tour%20package"
            className="btn-gold-hero"
            target="_blank"
            rel="noopener noreferrer"
          >
            📲 WhatsApp for Help
          </a>
          <Link href="/" className="btn-outline-lg" style={{ color: '#fff', borderColor: '#fff' }}>
            ← Back to Home
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40 }}>
          <Link href="/packages/char-dham-yatra-9n-10d/" style={{ color: 'var(--gold)' }}>Char Dham Yatra</Link>
          <Link href="/packages/kedarnath-yatra-3n-4d/" style={{ color: 'var(--gold)' }}>Kedarnath Yatra</Link>
          <Link href="/packages/kedarkantha-trek-5n-6d/" style={{ color: 'var(--gold)' }}>Kedarkantha Trek</Link>
          <Link href="/blog/" style={{ color: 'var(--gold)' }}>Travel Blog</Link>
          <Link href="/contact/" style={{ color: 'var(--gold)' }}>Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
