import type { Metadata } from 'next';
import PrintBar from './PrintBar';

export const metadata: Metadata = {
  title: 'Bali, Nusa Penida & Gili 7D/6N Itinerary — Junegiri Yatra',
  description: 'Day-wise itinerary for 7D6N Bali, Nusa Penida & Gili Party Escape — beaches, scuba diving, Nusa Penida west tour, Gili T nightlife & ATV adventure.',
  robots: { index: false, follow: false },
};

export default function BaliItineraryPDF() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f5f5f5; }

        .pdf-wrap {
          font-family: 'Inter', system-ui, sans-serif;
          color: #1a1a2e;
          max-width: 820px;
          margin: 0 auto;
          background: #fff;
          min-height: 100vh;
        }

        /* ── HEADER ── */
        .pdf-header {
          background: linear-gradient(135deg, #0a2540 0%, #1a4a7a 60%, #0f6b8e 100%);
          padding: 40px 48px 32px;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .pdf-header::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
        }
        .pdf-header::after {
          content: '';
          position: absolute;
          bottom: -40px; left: 30%;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(201,168,76,0.08);
        }
        .pdf-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }
        .pdf-brand-name {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #c9a84c;
          text-transform: uppercase;
        }
        .pdf-brand-tagline {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          margin-top: 2px;
        }
        .pdf-divider {
          width: 1px;
          height: 32px;
          background: rgba(255,255,255,0.15);
        }
        .pdf-contact {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
        }
        .pdf-contact a { color: #c9a84c; text-decoration: none; }

        .pdf-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }
        .pdf-title em {
          font-style: italic;
          color: #c9a84c;
        }

        .pdf-meta-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-top: 16px;
          position: relative;
          z-index: 1;
        }
        .pdf-meta-pill {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── PRICING SECTION ── */
        .pricing-section {
          background: #fafbff;
          border-bottom: 1px solid #eef0f5;
          padding: 28px 48px;
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .pricing-card {
          border: 2px solid #e8ecf5;
          border-radius: 14px;
          padding: 20px 22px;
          transition: border-color 0.2s;
          position: relative;
        }
        .pricing-card.featured {
          border-color: #c9a84c;
          background: #fffef5;
        }
        .pricing-card-badge {
          position: absolute;
          top: -10px;
          left: 18px;
          background: #c9a84c;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 100px;
          text-transform: uppercase;
        }
        .pricing-card-title {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
        }
        .pricing-card-price {
          font-size: 26px;
          font-weight: 800;
          color: #0a2540;
          margin-bottom: 2px;
        }
        .pricing-card-price span {
          font-size: 13px;
          font-weight: 500;
          color: #666;
        }
        .pricing-card-note {
          font-size: 11px;
          color: #888;
          margin-bottom: 14px;
        }
        .pricing-card-hotels {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .pricing-card-hotels li {
          font-size: 11.5px;
          color: #444;
          padding-left: 14px;
          position: relative;
          line-height: 1.5;
        }
        .pricing-card-hotels li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #c9a84c;
          font-weight: 700;
        }
        .pricing-card-hotels li strong {
          color: #1a1a2e;
        }

        /* ── ITINERARY ── */
        .itinerary-section {
          padding: 36px 48px;
        }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #c9a84c;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .day-block {
          margin-bottom: 0;
          display: flex;
          gap: 0;
        }
        .day-timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 52px;
          flex-shrink: 0;
        }
        .day-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0a2540;
          color: white;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }
        .day-line {
          width: 2px;
          flex: 1;
          background: #e8ecf5;
          min-height: 20px;
        }
        .day-content {
          flex: 1;
          padding-bottom: 28px;
          padding-top: 4px;
        }
        .day-header {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .day-label {
          font-size: 11px;
          font-weight: 700;
          color: #c9a84c;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .day-title {
          font-size: 15px;
          font-weight: 700;
          color: #0a2540;
        }
        .day-emoji {
          font-size: 14px;
        }
        .day-activities {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 10px;
        }
        .day-activity {
          font-size: 13px;
          color: #3a3a5c;
          padding-left: 14px;
          position: relative;
          line-height: 1.55;
        }
        .day-activity::before {
          content: '›';
          position: absolute;
          left: 2px;
          color: #c9a84c;
          font-weight: 700;
          font-size: 14px;
        }
        .day-activity strong {
          color: #0a2540;
          font-weight: 600;
        }
        .day-activity.note {
          color: #777;
          font-style: italic;
          font-size: 12px;
        }
        .day-activity.note::before { color: #bbb; }
        .day-stay {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f0f4ff;
          border: 1px solid #dce3f5;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 11.5px;
          color: #0a2540;
          font-weight: 500;
          margin-top: 2px;
        }

        /* ── INCLUSIONS / EXCLUSIONS ── */
        .inc-exc-section {
          padding: 0 48px 36px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .inc-card {
          border-radius: 14px;
          padding: 20px 22px;
        }
        .inc-card.green {
          background: #f0fff8;
          border: 1px solid #b2e8cc;
        }
        .inc-card.red {
          background: #fff5f5;
          border: 1px solid #f5c0c0;
        }
        .inc-card-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .inc-card.green .inc-card-title { color: #0a7a40; }
        .inc-card.red .inc-card-title { color: #c0392b; }
        .inc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .inc-list li {
          font-size: 12px;
          color: #333;
          padding-left: 18px;
          position: relative;
          line-height: 1.5;
        }
        .inc-list li::before {
          position: absolute;
          left: 0;
          font-size: 11px;
          top: 1px;
        }
        .inc-card.green .inc-list li::before { content: '✓'; color: #0a7a40; font-weight: 700; }
        .inc-card.red .inc-list li::before { content: '✕'; color: #c0392b; font-weight: 700; }

        /* ── NOTES ── */
        .notes-section {
          padding: 0 48px 36px;
        }
        .notes-box {
          background: #fffbee;
          border: 1px solid #f0dc8a;
          border-radius: 12px;
          padding: 18px 22px;
        }
        .notes-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #7a5c00;
          margin-bottom: 10px;
        }
        .notes-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .notes-list li {
          font-size: 12px;
          color: #5a4a00;
          padding-left: 18px;
          position: relative;
          line-height: 1.5;
        }
        .notes-list li::before {
          content: '⚠️';
          position: absolute;
          left: 0;
          font-size: 10px;
          top: 2px;
        }

        /* ── FOOTER ── */
        .pdf-footer {
          background: #0a2540;
          padding: 28px 48px;
          color: rgba(255,255,255,0.6);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pdf-footer-brand {
          font-size: 14px;
          font-weight: 700;
          color: #c9a84c;
          letter-spacing: 2px;
        }
        .pdf-footer-contact {
          font-size: 12px;
          line-height: 1.8;
          text-align: right;
        }
        .pdf-footer-contact a {
          color: #c9a84c;
          text-decoration: none;
        }

        /* ── PRINT BUTTON (screen only) ── */
        .print-btn-wrap {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 24px;
          background: #f5f5f5;
        }
        .print-btn {
          background: #0a2540;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .wa-btn {
          background: #25d366;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 28px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── PRINT STYLES ── */
        @media print {
          body { background: white; }
          .print-btn-wrap { display: none; }
          .pdf-wrap { max-width: 100%; box-shadow: none; }
          .day-block { break-inside: avoid; }
          .pricing-grid { break-inside: avoid; }
          .inc-exc-section { break-inside: avoid; }
          @page {
            margin: 0;
            size: A4;
          }
        }
      `}</style>

      {/* Print Button — screen only */}
      <PrintBar />

      <div className="pdf-wrap">

        {/* ── HEADER ── */}
        <div className="pdf-header">
          <div className="pdf-brand">
            <div>
              <div className="pdf-brand-name">Junegiri Yatra</div>
              <div className="pdf-brand-tagline">Trusted Travel Partner · Since 2017 · Haridwar</div>
            </div>
            <div className="pdf-divider" />
            <div className="pdf-contact">
              <div>📞 <a href="tel:+6282111759727">+62 821-1175-9727</a></div>
              <div>✉️ <a href="mailto:info@junegiriyatra.com">info@junegiriyatra.com</a></div>
            </div>
          </div>

          <h1 className="pdf-title">
            7D 6N <em>Bali, Nusa Penida</em><br />
            &amp; Gili Party Escape 🏝️
          </h1>

          <div className="pdf-meta-row">
            <div className="pdf-meta-pill">👥 2 Pax</div>
            <div className="pdf-meta-pill">📅 23 – 29 May 2025</div>
            <div className="pdf-meta-pill">💵 From $530 / person</div>
            <div className="pdf-meta-pill">🏝️ Bali · Nusa Penida · Gili T</div>
          </div>
        </div>

        {/* ── PRICING ── */}
        <div className="pricing-section">
          <div className="section-title">Stay Options</div>
          <div className="pricing-grid">

            {/* Option 1 */}
            <div className="pricing-card">
              <div className="pricing-card-title">Option 1</div>
              <div className="pricing-card-price">$530 <span>/ person</span></div>
              <div className="pricing-card-note">Min 2 Pax</div>
              <ul className="pricing-card-hotels">
                <li><strong>2N — Akmani Legian</strong><br />Grand Deluxe · Bathtub &amp; Balcony</li>
                <li><strong>1N — Semuh Sunset by Pramana</strong><br />Deluxe Room</li>
                <li><strong>2N — Mad Monkey Hostel, Gili T</strong></li>
                <li><strong>1N — Evitel Ubud</strong><br />Superior Room</li>
              </ul>
            </div>

            {/* Option 2 */}
            <div className="pricing-card featured">
              <div className="pricing-card-badge">Upgrade</div>
              <div className="pricing-card-title">Option 2</div>
              <div className="pricing-card-price">$560 <span>/ person</span></div>
              <div className="pricing-card-note">Min 2 Pax</div>
              <ul className="pricing-card-hotels">
                <li><strong>2N — Akmani Legian</strong><br />Grand Deluxe · Bathtub &amp; Balcony</li>
                <li><strong>1N — Semuh Sunset by Pramana</strong><br />Deluxe Room</li>
                <li><strong>2N — Mad Monkey Hostel, Gili T</strong></li>
                <li><strong>1N — Private Pool Villa</strong> ✨</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── ITINERARY ── */}
        <div className="itinerary-section">
          <div className="section-title">Day-Wise Itinerary</div>

          {/* DAY 1 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D1</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 01</span>
                <span className="day-title">Arrival · Finns Beach Club</span>
                <span className="day-emoji">✈️🍹</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Pickup from <strong>Ngurah Rai International Airport</strong></div>
                <div className="day-activity">Hotel check-in &amp; refresh</div>
                <div className="day-activity note">Evening visit to <strong>Finns Beach Club</strong> (own expense)</div>
              </div>
              <div className="day-stay">🏨 Stay in South Bali</div>
            </div>
          </div>

          {/* DAY 2 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D2</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 02</span>
                <span className="day-title">Beaches, Water Sports &amp; Nightlife</span>
                <span className="day-emoji">🌊🌅🍾</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Visit <strong>Pandawa Beach</strong></div>
                <div className="day-activity"><strong>Parasailing Experience</strong> ✅ Included</div>
                <div className="day-activity">Visit <strong>Melasti Beach</strong></div>
                <div className="day-activity">Sunset at <strong>Suluban Beach</strong></div>
                <div className="day-activity note">Evening at <strong>Savaya Beach Club</strong> (own expense)</div>
              </div>
              <div className="day-stay">🏨 Stay in South Bali</div>
            </div>
          </div>

          {/* DAY 3 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D3</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 03</span>
                <span className="day-title">Nusa Penida West Escape</span>
                <span className="day-emoji">🏝️🌊</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Morning free / leisure time</div>
                <div className="day-activity">Afternoon transfer to <strong>Sanur Harbor</strong></div>
                <div className="day-activity">Speed boat to <strong>Nusa Penida</strong></div>
                <div className="day-activity"><strong>Nusa Penida West Tour:</strong></div>
                <div className="day-activity" style={{paddingLeft: '28px'}}>Kelingking Beach · Broken Beach · Angel&apos;s Billabong · Crystal Bay</div>
              </div>
              <div className="day-stay">🏨 Stay in Nusa Penida</div>
            </div>
          </div>

          {/* DAY 4 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D4</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 04</span>
                <span className="day-title">Transfer to Gili T · Party Night</span>
                <span className="day-emoji">🚤🍻</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Speed boat transfer to <strong>Gili Trawangan</strong></div>
                <div className="day-activity">Check-in at <strong>Mad Monkey Hostel</strong></div>
                <div className="day-activity">Relax &amp; beach time</div>
                <div className="day-activity">Nightlife &amp; party experience 🎉</div>
              </div>
              <div className="day-stay">🏨 Mad Monkey Hostel — Gili T</div>
            </div>
          </div>

          {/* DAY 5 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D5</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 05</span>
                <span className="day-title">Scuba Diving · Island Party</span>
                <span className="day-emoji">🤿🌊🍾</span>
              </div>
              <div className="day-activities">
                <div className="day-activity"><strong>Scuba Diving Experience</strong> ✅ Included (2 Pax)</div>
                <div className="day-activity">Free time for island cafés &amp; sunset spots</div>
                <div className="day-activity">Party night in Gili Trawangan 🎊</div>
              </div>
              <div className="day-stay">🏨 Mad Monkey Hostel — Gili T</div>
            </div>
          </div>

          {/* DAY 6 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot">D6</div>
              <div className="day-line" />
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 06</span>
                <span className="day-title">Return to Bali · ATV Adventure</span>
                <span className="day-emoji">🏍️🌿</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Speed boat transfer back to Bali</div>
                <div className="day-activity"><strong>ATV Ride Experience</strong> ✅ Included (2 Pax)</div>
                <div className="day-activity">Hotel check-in &amp; relax</div>
              </div>
              <div className="day-stay">🏨 Stay in South Bali / Ubud</div>
            </div>
          </div>

          {/* DAY 7 */}
          <div className="day-block">
            <div className="day-timeline">
              <div className="day-dot" style={{background:'#c9a84c'}}>D7</div>
            </div>
            <div className="day-content">
              <div className="day-header">
                <span className="day-label">Day 07</span>
                <span className="day-title">Departure</span>
                <span className="day-emoji">✈️</span>
              </div>
              <div className="day-activities">
                <div className="day-activity">Breakfast</div>
                <div className="day-activity">Hotel checkout</div>
                <div className="day-activity">Private airport transfer</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── INCLUSIONS / EXCLUSIONS ── */}
        <div className="inc-exc-section">
          <div className="inc-card green">
            <div className="inc-card-title">✅ Inclusions</div>
            <ul className="inc-list">
              <li>Airport pickup &amp; drop</li>
              <li>Private AC vehicle with driver in Bali</li>
              <li>Inter-island speed boat transfers</li>
              <li>6 Nights accommodation with breakfast</li>
              <li>Parasailing experience</li>
              <li>Nusa Penida west tour</li>
              <li>Scuba diving session in Gili T (2 Pax)</li>
              <li>ATV Ride (2 Pax)</li>
              <li>Entrance fees as per itinerary</li>
              <li>Parking &amp; toll charges</li>
              <li>Daily mineral water</li>
            </ul>
          </div>
          <div className="inc-card red">
            <div className="inc-card-title">❌ Exclusions</div>
            <ul className="inc-list">
              <li>Airfare</li>
              <li>Visa &amp; travel insurance</li>
              <li>Finns / Savaya / club expenses</li>
              <li>Lunch &amp; dinner</li>
              <li>Transfers inside Gili Islands</li>
              <li>Gili Island tax</li>
              <li>Personal expenses</li>
              <li>Optional activities</li>
              <li>Tips &amp; gratuities</li>
            </ul>
          </div>
        </div>

        {/* ── NOTES ── */}
        <div className="notes-section">
          <div className="notes-box">
            <div className="notes-title">⚠️ Important Notes</div>
            <ul className="notes-list">
              <li>Party hostel environment in Gili T — ideal for young &amp; adventurous travelers</li>
              <li>Boat transfers subject to sea / weather conditions</li>
              <li>Scuba diving depends on weather &amp; ocean conditions</li>
              <li>Designed for party lovers + island explorers + adventure travelers</li>
            </ul>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="pdf-footer">
          <div>
            <div className="pdf-footer-brand">JUNEGIRI YATRA</div>
            <div style={{fontSize:'11px', marginTop:'4px', color:'rgba(255,255,255,0.45)'}}>
              India&apos;s Trusted Travel Partner · Since 2017
            </div>
          </div>
          <div className="pdf-footer-contact">
            <div>📞 <a href="tel:+6282111759727">+62 821-1175-9727</a></div>
            <div>✉️ <a href="mailto:info@junegiriyatra.com">info@junegiriyatra.com</a></div>
            <div>🌐 <a href="https://junegiriyatra.com">junegiriyatra.com</a></div>
          </div>
        </div>

      </div>

    </>
  );
}
