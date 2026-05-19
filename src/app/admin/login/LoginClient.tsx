'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

/* ─── Styles ──────────────────────────────────────────────────────────────── */

const S = {
  page: {
    minHeight: '100vh',
    background: '#07051A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'Inter, system-ui, sans-serif',
  } as React.CSSProperties,

  card: {
    background: '#0D0A26',
    border: '1px solid rgba(201,146,61,0.2)',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  } as React.CSSProperties,

  brandRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '28px',
  } as React.CSSProperties,

  brandEmoji: { fontSize: '28px', lineHeight: 1 } as React.CSSProperties,

  brandText: {
    color: '#C9923D',
    fontSize: '17px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    fontFamily: 'Poppins, Inter, sans-serif',
  } as React.CSSProperties,

  heading: {
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '6px',
    fontFamily: 'Poppins, Inter, sans-serif',
    lineHeight: 1.2,
  } as React.CSSProperties,

  subheading: {
    color: 'rgba(255,248,238,0.48)',
    fontSize: '13.5px',
    textAlign: 'center' as const,
    marginBottom: '32px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  label: {
    display: 'block',
    color: 'rgba(255,248,238,0.7)',
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '8px',
    letterSpacing: '0.02em',
  } as React.CSSProperties,

  inputWrapper: { marginBottom: '20px' } as React.CSSProperties,

  input: {
    width: '100%',
    background: '#13102E',
    border: '1px solid rgba(201,146,61,0.2)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: 'rgba(255,248,238,0.88)',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
    fontFamily: 'Inter, system-ui, sans-serif',
  } as React.CSSProperties,

  button: {
    width: '100%',
    background: '#E05C00',
    border: 'none',
    borderRadius: '8px',
    padding: '13px 24px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'opacity 0.2s',
    marginTop: '4px',
    fontFamily: 'Inter, system-ui, sans-serif',
  } as React.CSSProperties,

  buttonDisabled: {
    opacity: 0.55,
    cursor: 'not-allowed',
  } as React.CSSProperties,

  successBox: {
    background: 'rgba(37,211,102,0.08)',
    border: '1px solid rgba(37,211,102,0.22)',
    borderRadius: '10px',
    padding: '24px 20px',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  successIcon: { fontSize: '32px', marginBottom: '12px', display: 'block' } as React.CSSProperties,

  successTitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
  } as React.CSSProperties,

  successText: {
    color: 'rgba(255,248,238,0.55)',
    fontSize: '13px',
    lineHeight: 1.6,
  } as React.CSSProperties,

  errorBox: {
    background: 'rgba(220,38,38,0.08)',
    border: '1px solid rgba(220,38,38,0.22)',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fca5a5',
    fontSize: '13px',
    marginBottom: '20px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  privacyNote: {
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(201,146,61,0.1)',
    color: 'rgba(255,248,238,0.28)',
    fontSize: '11.5px',
    textAlign: 'center' as const,
    lineHeight: 1.5,
  } as React.CSSProperties,
};

/* ─── Login form (inner) ──────────────────────────────────────────────────── */

function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setError('This email is not authorized. Contact the Junegiri Yatra team.');
    } else if (errorParam === 'auth_callback_failed') {
      setError('Login link expired or invalid. Please try again.');
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      window.location.href = '/admin';
    }
  }

  return (
    <div style={S.page}>
      <div style={S.card}>
        {/* Brand */}
        <div style={S.brandRow}>
          <span style={S.brandEmoji}>🏔</span>
          <span style={S.brandText}>Junegiri Yatra</span>
        </div>

        <h1 style={S.heading}>Team Access</h1>
        <p style={S.subheading}>Sign in with your team credentials</p>

        {/* Error */}
        {error && <div style={S.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div style={S.inputWrapper}>
            <label htmlFor="email" style={S.label}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              placeholder="you@junegiriyatra.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={S.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,146,61,0.55)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,146,61,0.2)';
              }}
            />
          </div>

          <div style={S.inputWrapper}>
            <label htmlFor="password" style={S.label}>Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={S.input}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,146,61,0.55)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201,146,61,0.2)'; }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            style={{
              ...S.button,
              ...(loading || !email || !password ? S.buttonDisabled : {}),
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {/* Privacy note */}
        <p style={S.privacyNote}>
          Access restricted to Junegiri Yatra team members.
        </p>
      </div>
    </div>
  );
}

/* ─── Page export (Suspense wrapper for useSearchParams) ──────────────────── */

export default function AdminLoginClient() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            background: '#07051A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'rgba(255,248,238,0.4)', fontFamily: 'Inter, sans-serif' }}>
            Loading…
          </span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
