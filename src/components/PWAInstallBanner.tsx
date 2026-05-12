'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Platform = 'ios' | 'android' | 'other';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null;

export default function PWAInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already running as installed PWA — don't show banner
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }
    // Dismissed before — don't nag (for 7 days)
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // Detect platform
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream;
    const isAndroid = /Android/.test(ua);
    setPlatform(isIOS ? 'ios' : isAndroid ? 'android' : 'other');

    // Capture Android install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show banner after 2 seconds on all devices
    const timer = setTimeout(() => setVisible(true), 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  function dismiss() {
    localStorage.setItem('pwa-banner-dismissed', String(Date.now()));
    setVisible(false);
    setShowIOSGuide(false);
  }

  async function handleInstall() {
    if (platform === 'ios') {
      setShowIOSGuide(true);
      return;
    }
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') dismiss();
      deferredPrompt = null;
      return;
    }
    // Fallback for desktop / unsupported browsers — show iOS-style guide
    setShowIOSGuide(true);
  }

  if (!visible || installed) return null;

  return (
    <>
      {/* ── iOS step-by-step guide modal ── */}
      {showIOSGuide && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: '20px 20px 0 0',
              padding: '28px 24px 40px', width: '100%', maxWidth: 480,
              color: '#1a1a1a',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>📲 Install Junegiri App</h3>
              <button onClick={() => setShowIOSGuide(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888', lineHeight: 1 }}>×</button>
            </div>
            {[
              { step: '1', icon: '⬆️', text: 'Tap the Share button at the bottom of Safari' },
              { step: '2', icon: '➕', text: 'Scroll down and tap "Add to Home Screen"' },
              { step: '3', icon: '✅', text: 'Tap "Add" — the app icon will appear on your home screen!' },
            ].map(({ step, icon, text }) => (
              <div key={step} style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#c9a84c', color: '#1a1a1a',
                  fontWeight: 800, fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{step}</div>
                <div style={{ paddingTop: 5 }}>
                  <span style={{ marginRight: 6 }}>{icon}</span>
                  <span style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{text}</span>
                </div>
              </div>
            ))}
            {/* Arrow pointing down to Safari share bar */}
            <div style={{ textAlign: 'center', marginTop: 8, color: '#888', fontSize: 13 }}>
              👇 Look for the share icon in your Safari toolbar
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Banner ── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000,
        background: '#1a1a2e',
        borderTop: '2px solid #c9a84c',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.3)',
      }}>
        {/* App icon */}
        <Image src="/icons/icon-192.png" alt="Junegiri App" width={44} height={44}
          style={{ borderRadius: 10, flexShrink: 0 }} />

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
            Get the Junegiri App
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>
            Book yatras & treks · Works offline · Free
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleInstall}
          style={{
            background: '#c9a84c',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: 8,
            padding: '9px 16px',
            fontWeight: 800,
            fontSize: 13,
            cursor: 'pointer',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {platform === 'ios' ? '🍎 Install' : '📲 Install'}
        </button>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          style={{
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 20, cursor: 'pointer',
            padding: '4px 2px', lineHeight: 1, flexShrink: 0,
          }}
          aria-label="Dismiss"
        >×</button>
      </div>
    </>
  );
}
