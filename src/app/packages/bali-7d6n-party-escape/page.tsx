import type { Metadata } from 'next';
import Link from 'next/link';
import WaLink from '@/components/WaLink';

export const metadata: Metadata = {
  title: 'Bali, Nusa Penida & Gili 7D/6N Package 2025 — Junegiri Yatra',
  description: '7D6N Bali party escape — Nusa Penida west tour, scuba diving in Gili T, ATV ride, Pandawa Beach, Melasti Beach. From $530/person. Book via WhatsApp.',
  keywords: 'bali tour package 2025, nusa penida trip, gili trawangan, bali gili island tour, scuba diving bali, bali party trip india, international tour package junegiri',
  alternates: { canonical: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
  openGraph: {
    title: 'Bali, Nusa Penida & Gili Party Escape — 7D/6N from $530',
    description: 'Beaches · Scuba Diving · Nusa Penida · Gili T Nightlife · ATV Adventure. All-inclusive 7-day Bali package.',
    url: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/',
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: '7D6N Bali, Nusa Penida & Gili Party Escape',
  description: 'All-inclusive 7-day trip to Bali, Nusa Penida and Gili Trawangan. Includes scuba diving, ATV ride, Nusa Penida west tour, parasailing and more.',
  touristType: 'Adventure Travelers',
  itinerary: {
    '@type': 'ItemList',
    numberOfItems: 7,
  },
  offers: {
    '@type': 'Offer',
    price: '530',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  provider: {
    '@type': 'TravelAgency',
    name: 'Junegiri Yatra',
    url: 'https://junegiriyatra.com',
    telephone: '+919873897652',
  },
};

const WA_TEXT = 'Namaste! I want to enquire about the Bali 7D6N Party Escape package (23-29 May)';

export default function BaliPackagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />

      <style>{`
        .bali-hero {
          background: linear-gradient(160deg, #0a1f44 0%, #0d4a6b 50%, #0e7490 100%);
          color: white;
          padding: 80px 24px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bali-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('/images/mountains1.webp') center/cover no-repeat;
          opacity: 0.12;
        }
        .bali-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .bali-badge {
          display: inline-block;
          background: rgba(201,168,76,0.2);
          border: 1px solid rgba(201,168,76,0.4);
          color: #c9a84c;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 6px 16px;
          border-radius: 100px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .bali-hero h1 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          font-family: var(--font-playfair), Georgia, serif;
        }
        .bali-hero h1 em { font-style: italic; color: #c9a84c; }
        .bali-lede {
          font-size: 17px;
          color: rgba(255,255,255,0.8);
          max-width: 580px;
          margin: 0 auto 28px;
          line-height: 1.6;
        }
        .bali-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 32px;
        }
        .bali-pill {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 7px 16px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
        }
        .bali-cta-row {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-gold {
          background: #c9a84c;
          color: #1a1a2e;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-gold:hover { background: #b8943e; color: #1a1a2e; text-decoration: none; }
        .btn-outline {
          background: transparent;
          color: white;
          border: 1.5px solid rgba(255,255,255,0.3);
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.6); color: white; text-decoration: none; }

        /* Pricing */
        .pricing-wrap {
          background: #f9f6f0;
          padding: 56px 24px;
        }
        .pricing-inner { max-width: 860px; margin: 0 auto; }
        .section-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .section-heading {
          font-size: 30px;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 28px;
          font-family: var(--font-playfair), Georgia, serif;
        }
        .pricing-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 620px) { .pricing-cards { grid-template-columns: 1fr; } }
        .p-card {
          background: white;
          border: 2px solid #e8e4da;
          border-radius: 16px;
          padding: 28px 26px;
          position: relative;
        }
        .p-card.featured {
          border-color: #c9a84c;
        }
        .p-card-badge {
          position: absolute;
          top: -11px; left: 20px;
          background: #c9a84c;
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 12px;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .p-card-label { font-size: 13px; font-weight: 600; color: #888; margin-bottom: 6px; }
        .p-card-price { font-size: 40px; font-weight: 800; color: #1a1a2e; line-height: 1; }
        .p-card-price sup { font-size: 18px; vertical-align: top; margin-top: 8px; }
        .p-card-per { font-size: 13px; color: #888; margin-bottom: 4px; }
        .p-card-min { font-size: 12px; color: #aaa; margin-bottom: 20px; }
        .p-card-divider { border: none; border-top: 1px solid #eee; margin: 16px 0; }
        .p-card-hotels { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .p-card-hotels li { font-size: 13px; color: #444; padding-left: 14px; position: relative; line-height: 1.5; }
        .p-card-hotels li::before { content: '🏨'; position: absolute; left: -2px; font-size: 11px; top: 1px; }
        .p-card-hotels li strong { color: #1a1a2e; display: block; font-weight: 600; }
        .p-card-hotels li span { color: #777; font-size: 12px; }

        /* Itinerary */
        .itinerary-wrap { padding: 56px 24px; background: white; }
        .itinerary-inner { max-width: 760px; margin: 0 auto; }
        .day-row {
          display: flex;
          gap: 20px;
          margin-bottom: 0;
        }
        .day-aside {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 48px;
          flex-shrink: 0;
        }
        .day-num {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #1a1a2e;
          color: white;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .day-thread { flex: 1; width: 2px; background: #eee; min-height: 16px; }
        .day-body { flex: 1; padding-bottom: 32px; padding-top: 6px; }
        .day-tag { font-size: 11px; font-weight: 700; color: #c9a84c; letter-spacing: 1px; text-transform: uppercase; }
        .day-title { font-size: 17px; font-weight: 700; color: #1a1a2e; margin: 4px 0 10px; }
        .day-acts { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
        .day-act {
          font-size: 14px;
          color: #444;
          padding-left: 16px;
          position: relative;
          line-height: 1.55;
        }
        .day-act::before { content: '›'; position: absolute; left: 2px; color: #c9a84c; font-weight: 700; font-size: 16px; }
        .day-act strong { color: #1a1a2e; font-weight: 600; }
        .day-act.muted { color: #777; font-style: italic; font-size: 13px; }
        .day-act.muted::before { color: #ccc; }
        .day-stay {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0f4ff;
          border: 1px solid #dce3f5;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 12px;
          color: #1a1a2e;
          font-weight: 500;
        }

        /* Inc/Exc */
        .inc-wrap { background: #f9f6f0; padding: 56px 24px; }
        .inc-inner { max-width: 860px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media (max-width: 620px) { .inc-inner { grid-template-columns: 1fr; } }
        .inc-box { border-radius: 16px; padding: 26px 24px; }
        .inc-box.green { background: #f0fff8; border: 1px solid #b2e8cc; }
        .inc-box.red { background: #fff5f5; border: 1px solid #f5c0c0; }
        .inc-title { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
        .inc-box.green .inc-title { color: #0a7a40; }
        .inc-box.red .inc-title { color: #c0392b; }
        .inc-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .inc-list li { font-size: 13.5px; color: #333; padding-left: 20px; position: relative; line-height: 1.5; }
        .inc-box.green .inc-list li::before { content: '✓'; position: absolute; left: 0; color: #0a7a40; font-weight: 700; }
        .inc-box.red .inc-list li::before { content: '✕'; position: absolute; left: 0; color: #c0392b; font-weight: 700; }

        /* Notes */
        .notes-wrap { padding: 0 24px 56px; background: #f9f6f0; }
        .notes-inner { max-width: 860px; margin: 0 auto; }
        .notes-box { background: #fffbee; border: 1px solid #f0dc8a; border-radius: 14px; padding: 22px 24px; }
        .notes-title { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7a5c00; margin-bottom: 12px; }
        .notes-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .notes-list li { font-size: 13.5px; color: #5a4a00; padding-left: 24px; position: relative; line-height: 1.55; }
        .notes-list li::before { content: '⚠️'; position: absolute; left: 0; font-size: 11px; top: 2px; }

        /* CTA */
        .cta-wrap { background: linear-gradient(135deg, #1a1a2e 0%, #0a2540 100%); padding: 64px 24px; text-align: center; }
        .cta-inner { max-width: 600px; margin: 0 auto; }
        .cta-wrap h2 { font-size: 32px; font-weight: 800; color: white; margin-bottom: 12px; font-family: var(--font-playfair), Georgia, serif; }
        .cta-wrap p { font-size: 16px; color: rgba(255,255,255,0.65); margin-bottom: 28px; line-height: 1.6; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
      `}</style>

      {/* ── HERO ── */}
      <section className="bali-hero">
        <div className="bali-hero-inner">
          <div className="bali-badge">🌍 New International Package</div>
          <h1>Bali, <em>Nusa Penida</em><br />&amp; Gili Party Escape</h1>
          <p className="bali-lede">
            7 Days · 6 Nights of beaches, scuba diving, island nightlife,
            Nusa Penida west tour, and ATV adventures — curated for young explorers.
          </p>
          <div className="bali-pills">
            <span className="bali-pill">📅 23 – 29 May 2025</span>
            <span className="bali-pill">👥 Min 2 Pax</span>
            <span className="bali-pill">💵 From $530 / person</span>
            <span className="bali-pill">🏝️ Bali · Nusa Penida · Gili T</span>
            <span className="bali-pill">🤿 Scuba Diving Included</span>
          </div>
          <div className="bali-cta-row">
            <WaLink
              href={`https://wa.me/919873897652?text=${encodeURIComponent(WA_TEXT)}`}
              className="btn-gold"
              target="_blank"
              rel="noopener noreferrer"
              label="bali_hero"
            >
              💬 Book on WhatsApp
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/" className="btn-outline">
              🖨️ Download PDF Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing-wrap">
        <div className="pricing-inner">
          <p className="section-label">Stay Options</p>
          <h2 className="section-heading">Choose Your Package</h2>
          <div className="pricing-cards">

            <div className="p-card">
              <p className="p-card-label">Option 1</p>
              <p className="p-card-price"><sup>$</sup>530</p>
              <p className="p-card-per">per person</p>
              <p className="p-card-min">Minimum 2 Pax</p>
              <hr className="p-card-divider" />
              <ul className="p-card-hotels">
                <li>
                  <strong>Akmani Legian — 2 Nights</strong>
                  <span>Grand Deluxe with Bathtub &amp; Balcony</span>
                </li>
                <li>
                  <strong>Semuh Sunset by Pramana — 1 Night</strong>
                  <span>Deluxe Room</span>
                </li>
                <li>
                  <strong>Mad Monkey Hostel, Gili T — 2 Nights</strong>
                  <span>Party Hostel</span>
                </li>
                <li>
                  <strong>Evitel Ubud — 1 Night</strong>
                  <span>Superior Room</span>
                </li>
              </ul>
            </div>

            <div className="p-card featured">
              <div className="p-card-badge">Upgrade</div>
              <p className="p-card-label">Option 2</p>
              <p className="p-card-price"><sup>$</sup>560</p>
              <p className="p-card-per">per person</p>
              <p className="p-card-min">Minimum 2 Pax</p>
              <hr className="p-card-divider" />
              <ul className="p-card-hotels">
                <li>
                  <strong>Akmani Legian — 2 Nights</strong>
                  <span>Grand Deluxe with Bathtub &amp; Balcony</span>
                </li>
                <li>
                  <strong>Semuh Sunset by Pramana — 1 Night</strong>
                  <span>Deluxe Room</span>
                </li>
                <li>
                  <strong>Mad Monkey Hostel, Gili T — 2 Nights</strong>
                  <span>Party Hostel</span>
                </li>
                <li>
                  <strong>Private Pool Villa ✨ — 1 Night</strong>
                  <span>Exclusive pool villa upgrade</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ITINERARY ── */}
      <section className="itinerary-wrap">
        <div className="itinerary-inner">
          <p className="section-label">Day-Wise Plan</p>
          <h2 className="section-heading">Your 7-Day Itinerary</h2>

          {[
            {
              num: 'D1', tag: 'Day 01', title: 'Arrival · Finns Beach Club ✈️🍹',
              acts: [
                { text: 'Pickup from <strong>Ngurah Rai International Airport</strong>' },
                { text: 'Hotel check-in &amp; refresh' },
                { text: 'Evening at <strong>Finns Beach Club</strong> (own expense)', muted: true },
              ],
              stay: 'South Bali',
              line: true,
            },
            {
              num: 'D2', tag: 'Day 02', title: 'Beaches, Water Sports & Nightlife 🌊🍾',
              acts: [
                { text: 'Visit <strong>Pandawa Beach</strong>' },
                { text: '<strong>Parasailing Experience</strong> ✅ Included' },
                { text: 'Visit <strong>Melasti Beach</strong>' },
                { text: 'Sunset at <strong>Suluban Beach</strong>' },
                { text: 'Evening at <strong>Savaya Beach Club</strong> (own expense)', muted: true },
              ],
              stay: 'South Bali',
              line: true,
            },
            {
              num: 'D3', tag: 'Day 03', title: 'Nusa Penida West Escape 🏝️🌊',
              acts: [
                { text: 'Morning free / leisure time' },
                { text: 'Afternoon transfer to <strong>Sanur Harbor</strong>' },
                { text: 'Speed boat to <strong>Nusa Penida</strong>' },
                { text: '<strong>Nusa Penida West Tour:</strong> Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay' },
              ],
              stay: 'Nusa Penida',
              line: true,
            },
            {
              num: 'D4', tag: 'Day 04', title: 'Transfer to Gili T · Party Night 🚤🍻',
              acts: [
                { text: 'Speed boat to <strong>Gili Trawangan</strong>' },
                { text: 'Check-in at <strong>Mad Monkey Hostel</strong>' },
                { text: 'Beach time &amp; island exploration' },
                { text: 'Nightlife &amp; party experience 🎉' },
              ],
              stay: 'Mad Monkey Hostel — Gili T',
              line: true,
            },
            {
              num: 'D5', tag: 'Day 05', title: 'Scuba Diving · Island Party 🤿🍾',
              acts: [
                { text: '<strong>Scuba Diving Experience</strong> ✅ Included (2 Pax)' },
                { text: 'Free time — island cafés &amp; sunset spots' },
                { text: 'Party night in Gili Trawangan 🎊' },
              ],
              stay: 'Mad Monkey Hostel — Gili T',
              line: true,
            },
            {
              num: 'D6', tag: 'Day 06', title: 'Return to Bali · ATV Adventure 🏍️🌿',
              acts: [
                { text: 'Speed boat back to Bali' },
                { text: '<strong>ATV Ride Experience</strong> ✅ Included (2 Pax)' },
                { text: 'Hotel check-in &amp; relax' },
              ],
              stay: 'South Bali / Ubud',
              line: true,
            },
            {
              num: 'D7', tag: 'Day 07', title: 'Departure ✈️',
              acts: [
                { text: 'Breakfast &amp; checkout' },
                { text: 'Private airport transfer' },
              ],
              stay: null,
              line: false,
            },
          ].map((day) => (
            <div className="day-row" key={day.num}>
              <div className="day-aside">
                <div className="day-num" style={day.num === 'D7' ? { background: '#c9a84c' } : {}}>
                  {day.num}
                </div>
                {day.line && <div className="day-thread" />}
              </div>
              <div className="day-body">
                <p className="day-tag">{day.tag}</p>
                <p className="day-title">{day.title}</p>
                <div className="day-acts">
                  {day.acts.map((act, i) => (
                    <p
                      key={i}
                      className={`day-act${'muted' in act && act.muted ? ' muted' : ''}`}
                      dangerouslySetInnerHTML={{ __html: act.text }}
                    />
                  ))}
                </div>
                {day.stay && (
                  <span className="day-stay">🏨 {day.stay}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INCLUSIONS / EXCLUSIONS ── */}
      <section className="inc-wrap">
        <div className="inc-inner">
          <div className="inc-box green">
            <p className="inc-title">✅ Inclusions</p>
            <ul className="inc-list">
              {[
                'Airport pickup & drop',
                'Private AC vehicle with driver in Bali',
                'Inter-island speed boat transfers',
                '6 Nights accommodation with breakfast',
                'Parasailing experience',
                'Nusa Penida west tour',
                'Scuba diving session in Gili T (2 Pax)',
                'ATV Ride (2 Pax)',
                'Entrance fees as per itinerary',
                'Parking & toll charges',
                'Daily mineral water',
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="inc-box red">
            <p className="inc-title">❌ Exclusions</p>
            <ul className="inc-list">
              {[
                'Airfare',
                'Visa & travel insurance',
                'Finns / Savaya / club expenses',
                'Lunch & dinner',
                'Transfers inside Gili Islands',
                'Gili Island tax',
                'Personal expenses',
                'Optional activities',
                'Tips & gratuities',
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── NOTES ── */}
      <section className="notes-wrap">
        <div className="notes-inner">
          <div className="notes-box">
            <p className="notes-title">⚠️ Important Notes</p>
            <ul className="notes-list">
              <li>Party hostel environment at Gili T — ideal for young &amp; adventurous travelers</li>
              <li>Boat transfers subject to sea / weather conditions</li>
              <li>Scuba diving depends on weather &amp; ocean conditions on the day</li>
              <li>Designed for party lovers + island explorers + adventure travelers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-wrap">
        <div className="cta-inner">
          <h2>Ready to Escape to Bali? 🏝️</h2>
          <p>
            WhatsApp us with your travel dates and group size.
            We&apos;ll send a custom quote within 1 hour.
          </p>
          <div className="cta-btns">
            <WaLink
              href={`https://wa.me/919873897652?text=${encodeURIComponent(WA_TEXT)}`}
              className="btn-gold"
              target="_blank"
              rel="noopener noreferrer"
              label="bali_cta"
            >
              💬 Book on WhatsApp
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/" className="btn-outline">
              🖨️ Download Itinerary PDF
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
