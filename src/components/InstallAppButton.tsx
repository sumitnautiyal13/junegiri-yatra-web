'use client';
import { useEffect, useState } from 'react';

type Platform = 'ios' | 'android' | 'other';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let installPrompt: any = null;

export default function InstallAppButton({ style }: { style?: React.CSSProperties }) {
  const [platform, setPlatform] = useState<Platform>('other');
  const [ready, setReady] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    // Already installed — hide button
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) && !(window as Window & { MSStream?: unknown }).MSStream;
    const isAndroid = /Android/.test(ua);
    setPlatform(isIOS ? 'ios' : isAndroid ? 'android' : 'other');
    setReady(true);

    const handler = (e: Event) => {
      e.preventDefault();
      installPrompt = e;
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleClick() {
    if (platform === 'ios') {
      setShowGuide(true);
      return;
    }
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') setReady(false);
      installPrompt = null;
      return;
    }
    setShowGuide(true); // fallback
  }

  if (!ready) return null;

  return (
    <>
      <button onClick={handleClick} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'inherit', textAlign: 'left', padding: 0, fontSize: 'inherit',
        display: 'flex', alignItems: 'center', gap: 6,
        ...style,
      }}>
        📲 Install App
      </button>

      {/* iOS Guide Modal */}
      {showGuide && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
          onClick={() => setShowGuide(false)}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#fff', borderRadius: '20px 20px 0 0',
            padding: '28px 24px 44px', width: '100%', maxWidth: 480,
            color: '#1a1a1a',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 4 }}>📲</div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Install Junegiri App</h3>
              </div>
              <button onClick={() => setShowGuide(false)}
                style={{ background: '#f3f3f3', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ×
              </button>
            </div>

            {platform === 'ios' ? (
              <>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
                  Follow these 3 steps in Safari to add the app to your home screen:
                </p>
                {[
                  { icon: '⬆️', text: 'Tap the Share button at the bottom of Safari' },
                  { icon: '➕', text: 'Scroll down and tap "Add to Home Screen"' },
                  { icon: '✅', text: 'Tap "Add" — done! App icon appears on your home screen' },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: '#c9a84c', color: '#1a1a1a',
                      fontWeight: 800, fontSize: 13,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{i + 1}</div>
                    <div style={{ paddingTop: 6, fontSize: 14, color: '#333', lineHeight: 1.5 }}>
                      <span style={{ marginRight: 6 }}>{icon}</span>{text}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 8, padding: '12px 16px', background: '#f9f6f0', borderRadius: 10, fontSize: 13, color: '#888', textAlign: 'center' }}>
                  👇 Look for the share icon in your Safari toolbar
                </div>
              </>
            ) : (
              <>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
                  To install in Chrome on Android or desktop:
                </p>
                {[
                  { icon: '⋮', text: 'Tap the three-dot menu (⋮) in Chrome' },
                  { icon: '📲', text: 'Tap "Add to Home Screen" or "Install App"' },
                  { icon: '✅', text: 'Tap "Install" — app is added instantly!' },
                ].map(({ icon, text }, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: '#c9a84c', color: '#1a1a1a',
                      fontWeight: 800, fontSize: 13,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{i + 1}</div>
                    <div style={{ paddingTop: 6, fontSize: 14, color: '#333', lineHeight: 1.5 }}>
                      <span style={{ marginRight: 6 }}>{icon}</span>{text}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
