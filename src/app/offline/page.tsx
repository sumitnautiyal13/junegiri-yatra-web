'use client';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f6f0',
      padding: '40px 20px',
      textAlign: 'center',
      color: '#1a1a1a',
    }}>
      <p style={{ fontSize: 72, margin: '0 0 16px', lineHeight: 1 }}>🏔️</p>
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: 12, color: '#1a1a1a' }}>
        You&apos;re Offline
      </h1>
      <p style={{ color: '#666', fontSize: 16, maxWidth: 380, marginBottom: 32, lineHeight: 1.6 }}>
        Looks like you&apos;ve wandered into the Himalayas without a signal.
        Check your connection and try again.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#c9a84c',
            color: '#1a1a1a',
            border: 'none',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
        <Link href="/"
          style={{
            background: '#1a1a2e',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}>
          Go Home
        </Link>
      </div>
      <p style={{ marginTop: 40, fontSize: 13, color: '#888' }}>
        📲 Reach us on WhatsApp:{' '}
        <a href="https://wa.me/919873897652" style={{ color: '#c9a84c', fontWeight: 600 }}>
          +91 98738 97652
        </a>
      </p>
    </div>
  );
}
