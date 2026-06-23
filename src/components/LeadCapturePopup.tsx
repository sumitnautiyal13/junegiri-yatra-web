'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'jgy_popup_dismissed';
const DELAY_MS = 12000; // show after 12s
const SCROLL_PCT = 0.55; // or after 55% scroll

export default function LeadCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [interest, setInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    let fired = false;
    const show = () => {
      if (fired) return;
      fired = true;
      setVisible(true);
    };

    const timer = setTimeout(show, DELAY_MS);

    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct >= SCROLL_PCT) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/popup-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          interest,
          page: window.location.pathname,
        }),
      });
    } catch {}

    setDone(true);
    setSubmitting(false);

    // Open WhatsApp after short delay
    const msg = encodeURIComponent(
      `Namaste! I'm ${name.trim()} 🙏\n\nI'm interested in: ${interest || 'India travel packages'}\n\nCould you help me plan my trip?`
    );
    setTimeout(() => {
      window.open(`https://wa.me/919873897652?text=${msg}`, '_blank');
      dismiss();
    }, 1200);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
          zIndex: 9998, backdropFilter: 'blur(2px)',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Get a custom travel quote"
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999, width: 'min(480px, 94vw)',
          background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
      >
        {/* Gold header bar */}
        <div style={{
          background: 'linear-gradient(135deg, #E07A1F 0%, #C9923D 100%)',
          padding: '22px 24px 18px',
          position: 'relative',
        }}>
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              position: 'absolute', top: 12, right: 14,
              background: 'rgba(255,255,255,0.2)', border: 'none',
              borderRadius: '50%', width: 28, height: 28,
              cursor: 'pointer', color: '#fff', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🏔️</div>
          <h2 style={{ color: '#fff', fontSize: 19, fontWeight: 800, margin: 0 }}>
            Plan Your Dream India Trip
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 13, marginTop: 4 }}>
            Get a custom quote from our Haridwar team — within 60 minutes on WhatsApp
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '22px 24px 24px' }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#33291E', marginBottom: 6 }}>
                Opening WhatsApp…
              </p>
              <p style={{ color: '#7a6a56', fontSize: 13 }}>
                Our team will reply within 60 minutes!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A3D2E', marginBottom: 5 }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Rahul / Sarah"
                  required
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid rgba(60,40,15,0.18)', fontSize: 14,
                    color: '#33291E', background: '#FBF7F1', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A3D2E', marginBottom: 5 }}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  placeholder="+91 98765 43210 or +44 7700 900000"
                  required
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid rgba(60,40,15,0.18)', fontSize: 14,
                    color: '#33291E', background: '#FBF7F1', outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A3D2E', marginBottom: 5 }}>
                  What interests you?
                </label>
                <select
                  value={interest}
                  onChange={e => setInterest(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px', borderRadius: 8,
                    border: '1.5px solid rgba(60,40,15,0.18)', fontSize: 14,
                    color: '#33291E', background: '#FBF7F1', outline: 'none',
                  }}
                >
                  <option value="">Select a trip type…</option>
                  <option value="Char Dham Yatra">Char Dham Yatra</option>
                  <option value="Kedarnath Yatra">Kedarnath Yatra</option>
                  <option value="Himalayan Trek">Himalayan Trek</option>
                  <option value="Rishikesh Adventure">Rishikesh Adventure</option>
                  <option value="Golden Triangle Tour">Golden Triangle Tour</option>
                  <option value="International Package">International Package (Bali/Thailand/Dubai)</option>
                  <option value="Custom Trip">Custom Trip</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting || !name.trim() || !whatsapp.trim()}
                style={{
                  width: '100%', padding: '13px 20px',
                  background: submitting ? '#aaa' : '#25D366',
                  color: '#fff', border: 'none', borderRadius: 10,
                  fontSize: 15, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                <span>💬</span>
                <span>{submitting ? 'Connecting…' : 'Get My Free Quote on WhatsApp'}</span>
              </button>

              <p style={{ textAlign: 'center', fontSize: 11, color: '#9a8a7a', marginTop: 10 }}>
                No spam. We&apos;ll only contact you about your trip.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
