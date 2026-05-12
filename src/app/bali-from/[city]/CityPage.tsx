'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { City } from '@/types';
import WaLink from '@/components/WaLink';

interface Props { city: City }

/* ── Tropical palette ─────────────────────────────────────── */
const T = {
  teal:       '#0891B2',
  tealDark:   '#0E7490',
  tealLight:  '#ECFEFF',
  coral:      '#F97316',
  coralLight: '#FFF7ED',
  gold:       '#F59E0B',
  goldLight:  '#FFFBEB',
  green:      '#059669',
  dark:       '#0F172A',
  text:       '#1E293B',
  muted:      '#64748B',
  border:     '#E2E8F0',
  white:      '#FFFFFF',
  bg:         '#F8FAFC',
  bg2:        '#F0FDFD',
};

/* ── Flight data ──────────────────────────────────────────── */
const FLIGHT_DATA: Record<string, {
  hub: string; via: string; duration: string; fare: string; airlines: string;
}> = {
  mumbai:     { hub: 'BOM', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹18,000–₹35,000', airlines: 'IndiGo, Air India, Singapore Airlines' },
  delhi:      { hub: 'DEL', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '9–11 hrs', fare: '₹20,000–₹38,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  bangalore:  { hub: 'BLR', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹17,000–₹32,000', airlines: 'IndiGo, Air Asia, Batik Air' },
  chennai:    { hub: 'MAA', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–9 hrs', fare: '₹16,000–₹30,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  hyderabad:  { hub: 'HYD', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '8–10 hrs', fare: '₹17,000–₹33,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' },
  kolkata:    { hub: 'CCU', via: 'Singapore (SIN) or Bangkok (BKK)', duration: '8–9 hrs', fare: '₹17,000–₹32,000', airlines: 'IndiGo, Thai Airways, Singapore Airlines' },
  pune:       { hub: 'PNQ', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Mumbai' },
  ahmedabad:  { hub: 'AMD', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  surat:      { hub: 'STV', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Mumbai' },
  jaipur:     { hub: 'JAI', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  lucknow:    { hub: 'LKO', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  chandigarh: { hub: 'IXC', via: 'Delhi (DEL) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹40,000', airlines: 'IndiGo via Delhi' },
  kochi:      { hub: 'COK', via: 'Singapore (SIN) or Kuala Lumpur (KUL)', duration: '7–8 hrs', fare: '₹15,000–₹28,000', airlines: 'Air Asia, Singapore Airlines' },
  guwahati:   { hub: 'GAU', via: 'Singapore (SIN) or Bangkok (BKK)', duration: '9–10 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Singapore' },
  bhubaneswar:{ hub: 'BBI', via: 'Kolkata (CCU) + Singapore (SIN)', duration: '10–12 hrs', fare: '₹20,000–₹36,000', airlines: 'IndiGo via Kolkata' },
  nagpur:     { hub: 'NAG', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  indore:     { hub: 'IDR', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  patna:      { hub: 'PAT', via: 'Delhi (DEL) + Singapore (SIN)', duration: '12–14 hrs', fare: '₹24,000–₹42,000', airlines: 'IndiGo via Delhi' },
  raipur:     { hub: 'RPR', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
  vadodara:   { hub: 'BDQ', via: 'Mumbai (BOM) + Singapore (SIN)', duration: '11–13 hrs', fare: '₹22,000–₹38,000', airlines: 'IndiGo via Mumbai' },
};
const DEFAULT_FLIGHT = { hub: 'nearest airport', via: 'Mumbai (BOM) or Delhi (DEL) + Singapore (SIN)', duration: '10–14 hrs', fare: '₹22,000–₹42,000', airlines: 'IndiGo, Air Asia, Singapore Airlines' };

/* ── Itinerary ──────────────────────────────────────────── */
const DAYS = [
  { num: 'D1', title: 'Arrival · Finns Beach Club', icon: '✈️', color: T.teal,   desc: 'Airport pickup · Hotel check-in (Akmani Legian — Grand Deluxe) · Evening at Finns Beach Club (own expense)' },
  { num: 'D2', title: 'Beaches & Water Sports',      icon: '🌊', color: T.coral,  desc: 'Pandawa Beach · Parasailing ✅ · Melasti Beach · Suluban Sunset · Savaya Club (own expense)' },
  { num: 'D3', title: 'Nusa Penida West Tour',        icon: '🏝️', color: T.green,  desc: 'Speed boat → Nusa Penida · Kelingking Beach · Broken Beach · Angel\'s Billabong · Crystal Bay' },
  { num: 'D4', title: 'Gili Trawangan · Party Night', icon: '🚤', color: '#7C3AED', desc: 'Speed boat to Gili T · Mad Monkey Hostel check-in · Beach day · Party night' },
  { num: 'D5', title: 'Scuba Diving & Nightlife',     icon: '🤿', color: T.teal,   desc: 'Scuba Diving ✅ (2 Pax) · Sunset sessions · Party night at Gili T' },
  { num: 'D6', title: 'Return to Bali · ATV Ride',   icon: '🏍️', color: T.coral,  desc: 'Speed boat back to Bali · ATV Ride ✅ (2 Pax) · Hotel check-in (Evitel Ubud / Pool Villa)' },
  { num: 'D7', title: 'Departure',                    icon: '🌅', color: T.gold,   desc: 'Breakfast · Leisurely checkout · Private airport transfer to Ngurah Rai (DPS)' },
];

/* ── Inclusions ──────────────────────────────────────────── */
const INCLUDED = [
  'Airport pickup & drop (DPS)', 'Private AC vehicle with driver in Bali',
  'Inter-island speed boat transfers', '6 Nights accommodation with breakfast',
  'Parasailing experience (Day 2)', 'Nusa Penida west tour (Day 3)',
  'Scuba diving — Gili T, 2 Pax (Day 5)', 'ATV Ride, 2 Pax (Day 6)',
  'Entrance fees as per itinerary', 'Daily mineral water in vehicle',
];
const EXCLUDED = [
  'Airfare from departure city', 'Visa on Arrival (~USD 35)',
  'Travel insurance', 'Finns / Savaya club expenses',
  'Lunch & dinner', 'Gili Island tax (~IDR 25,000)',
  'Personal expenses & shopping', 'Tips & gratuities',
];

/* ── FAQs ──────────────────────────────────────────────── */
function buildFaqs(city: City, flight: typeof DEFAULT_FLIGHT) {
  return [
    { q: `Which airport do I fly from ${city.name} to Bali?`, a: `From ${city.name} (${flight.hub}), fly to Bali Ngurah Rai (DPS) via ${flight.via}. Total flight time: ~${flight.duration}. Airlines: ${flight.airlines}. Return fares: ${flight.fare}.` },
    { q: `What is the total Bali trip cost from ${city.name}?`, a: `Package from $530/person (≈₹44,500). Add flights from ${city.name}: ${flight.fare} approx. Total budget per person: ₹65,000–₹1,00,000 depending on hotel upgrade, flight timing and season.` },
    { q: `Do I need a visa for Bali from ${city.name}?`, a: `No prior visa required. Indian passport holders get Visa on Arrival (VoA) at DPS airport. Fee: USD ~35. Valid 30 days, extendable by 30 more. Carry USD cash for the VoA counter.` },
    { q: `What is the best time to go to Bali from ${city.name}?`, a: `April–October is ideal — dry weather, calm seas for Nusa Penida & Gili T, excellent visibility for scuba diving. May–June offer best underwater clarity. December–January = peak crowds + rains. Package runs year-round on demand (min 2 pax).` },
    { q: `Can I customize the travel dates for this package?`, a: `Yes. WhatsApp us with your preferred dates — we operate on demand for groups of min 2 pax. Most clients book 2–4 weeks in advance. We respond within 1 hour during business hours.` },
  ];
}

const CITY_LINKS = [
  { name: 'Mumbai', slug: 'mumbai' }, { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' }, { name: 'Chennai', slug: 'chennai' },
  { name: 'Hyderabad', slug: 'hyderabad' }, { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Pune', slug: 'pune' }, { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Kochi', slug: 'kochi' }, { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Chandigarh', slug: 'chandigarh' }, { name: 'Lucknow', slug: 'lucknow' },
];

/* ─────────────────────────────────────────────────────────── */
export default function BaliCityPage({ city }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const flight = FLIGHT_DATA[city.slug] ?? DEFAULT_FLIGHT;
  const waText = `Namaste! I want to enquire about the Bali 7D6N package from ${city.name}`;
  const waLink = `https://wa.me/6282111759727?text=${encodeURIComponent(waText)}`;
  const faqs = buildFaqs(city, flight);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `Bali, Nusa Penida & Gili 7D/6N Tour Package from ${city.name}`,
        description: `7-day Bali party escape from ${city.name}. Nusa Penida west tour, scuba diving Gili T, ATV ride, parasailing from $530/person.`,
        touristType: 'Adventure travelers',
        offers: { '@type': 'Offer', price: '530', priceCurrency: 'USD', availability: 'https://schema.org/InStock', seller: { '@type': 'TravelAgency', name: 'Junegiri Yatra', telephone: '+6282111759727' } },
        provider: { '@type': 'TravelAgency', name: 'Junegiri Yatra', url: 'https://junegiriyatra.com' },
      },
      { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
        { '@type': 'ListItem', position: 2, name: 'Bali Package', item: 'https://junegiriyatra.com/packages/bali-7d6n-party-escape/' },
        { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/bali-from/${city.slug}/` },
      ]},
    ],
  };

  return (
    <div style={{ background: T.white, color: T.text, fontFamily: 'inherit' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'flex-end' }}>
        <Image
          src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1600&q=85&auto=format&fit=crop"
          alt={`Bali beach tour from ${city.name}`}
          fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        {/* Warm sunset gradient overlay — NOT black */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(14,116,144,0.3) 60%, rgba(0,0,0,0) 100%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 56 }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/packages/bali-7d6n-party-escape/" style={{ color: 'inherit', textDecoration: 'none' }}>Bali Package</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>From {city.name}</span>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {['🏝️ Bali · Nusa Penida · Gili T', '7D / 6N', 'From $530 / person', 'Min 2 Pax'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>{b}</span>
            ))}
          </div>

          <h1 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            Bali Tour Package<br />
            <span style={{ color: '#FCD34D' }}>from {city.name}</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 28, maxWidth: 560, lineHeight: 1.6 }}>
            Scuba diving · ATV ride · Nusa Penida west tour · Gili T nightlife · Parasailing<br />
            <strong style={{ color: '#FCD34D' }}>All activities included · Book on WhatsApp</strong>
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`bali_hero_${city.slug}`}
              style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
              📲 WhatsApp from {city.name}
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.4)', color: '#fff', padding: '14px 28px', borderRadius: 50, fontWeight: 600, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              🖨️ View PDF Itinerary
            </Link>
          </div>
        </div>
      </section>

      {/* ── FLIGHT HOOK BAR ──────────────────────────────── */}
      <div style={{ background: T.teal, color: '#fff', padding: '14px 0' }}>
        <div className="container">
          <p style={{ margin: 0, fontSize: 14, textAlign: 'center', lineHeight: 1.5 }}>
            ✈️ <strong>{city.name} ({flight.hub})</strong> → Bali (DPS) via {flight.via} &nbsp;·&nbsp;
            <strong>{flight.duration}</strong> &nbsp;·&nbsp; Return fares from <strong>{flight.fare}</strong> &nbsp;·&nbsp;
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`bali_bar_${city.slug}`}
              style={{ color: '#FCD34D', fontWeight: 700, textDecoration: 'underline' }}>
              Get combined quote →
            </WaLink>
          </p>
        </div>
      </div>

      {/* ── QUICK STATS ──────────────────────────────────── */}
      <section style={{ background: T.white, padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16 }}>
            {[
              { icon: '📅', label: 'Duration', value: '7 Days / 6 Nights' },
              { icon: '🏝️', label: 'Destinations', value: 'Bali · Nusa Penida · Gili T' },
              { icon: '💰', label: 'Package Price', value: 'From $530 / person' },
              { icon: '✈️', label: `From ${city.name}`, value: `~${flight.duration} flight` },
              { icon: '👥', label: 'Min Group Size', value: '2 Pax' },
              { icon: '🇮🇩', label: 'Visa', value: 'On Arrival · USD ~35' },
            ].map(s => (
              <div key={s.label} style={{ background: T.bg, borderRadius: 14, padding: '20px 16px', textAlign: 'center', border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.dark }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ITINERARY ────────────────────────────────────── */}
      <section style={{ background: T.bg, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              Day-by-Day <span style={{ color: T.teal }}>Itinerary</span>
            </h2>
            <p style={{ color: T.muted, margin: 0 }}>7 days of beaches, islands, scuba &amp; nightlife</p>
          </div>

          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {DAYS.map((day, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, position: 'relative' }}>
                {/* Timeline line */}
                {i < DAYS.length - 1 && (
                  <div style={{ position: 'absolute', left: 27, top: 56, bottom: -8, width: 2, background: T.border, zIndex: 0 }} />
                )}
                {/* Circle */}
                <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: '50%', background: day.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff', zIndex: 1, boxShadow: `0 4px 14px ${day.color}55` }}>
                  {day.num}
                </div>
                {/* Content card */}
                <div style={{ flex: 1, background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 18 }}>{day.icon}</span>
                    <span style={{ fontWeight: 700, color: T.dark, fontSize: 15 }}>{day.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{day.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUSIONS ───────────────────────────────────── */}
      <section style={{ background: T.white, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              What&apos;s <span style={{ color: T.teal }}>Included</span>
            </h2>
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Included */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 16, padding: 28 }}>
              <h3 style={{ color: T.green, fontWeight: 800, fontSize: 16, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: T.green, color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✓</span>
                Included in Package
              </h3>
              {INCLUDED.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: T.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            {/* Excluded */}
            <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 16, padding: 28 }}>
              <h3 style={{ color: '#E11D48', fontWeight: 800, fontSize: 16, margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#E11D48', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✗</span>
                Not Included
              </h3>
              {[...EXCLUDED.slice(0, 1), `Airfare from ${city.name}`, ...EXCLUDED.slice(1)].filter((_, i) => i !== 1).map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#E11D48', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                  <span style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT INFO ──────────────────────────────────── */}
      <section style={{ background: T.bg2, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              Flights from <span style={{ color: T.teal }}>{city.name}</span> to Bali
            </h2>
            <p style={{ color: T.muted, margin: 0 }}>Flight info is separate from the package price</p>
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '✈️', label: 'Route', value: `${city.name} (${flight.hub}) → Bali (DPS) via ${flight.via}` },
              { icon: '⏱️', label: 'Total Flight Time', value: `Approx ${flight.duration} including layover` },
              { icon: '💸', label: 'Return Fare Range', value: `${flight.fare} per person (varies by season & airline)` },
              { icon: '🛫', label: 'Airlines', value: flight.airlines },
              { icon: '🏖️', label: 'Arrival Airport', value: 'Ngurah Rai Intl (DPS) — 30 min to South Bali hotels' },
              { icon: '🛂', label: 'Visa on Arrival', value: 'No pre-application. ~USD 35 at DPS airport. Valid 30 days.' },
            ].map(item => (
              <div key={item.label} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.teal, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ────────────────────────────────── */}
      <section style={{ background: T.white, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              Package <span style={{ color: T.teal }}>Pricing</span>
            </h2>
            <p style={{ color: T.muted, margin: 0 }}>Two hotel options · Same activities included · Min 2 Pax</p>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { label: 'Option 1 — Standard', hotel: 'Evitel Ubud (Last Night)', price: '$530 / person', color: T.teal, badge: 'Most Popular' },
              { label: 'Option 2 — Upgrade', hotel: 'Private Pool Villa (Last Night)', price: '$560 / person', color: '#7C3AED', badge: 'Best Experience' },
            ].map(opt => (
              <div key={opt.label} style={{ border: `2px solid ${opt.color}`, borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 16, right: 16, background: opt.color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>{opt.badge}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: opt.color, marginBottom: 8 }}>{opt.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: T.dark, marginBottom: 8 }}>{opt.price}</div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>🏨 {opt.hotel}</div>
                <WaLink href={`https://wa.me/6282111759727?text=${encodeURIComponent(`Namaste! I want to book ${opt.label} Bali 7D6N from ${city.name}`)}`}
                  target="_blank" rel="noopener noreferrer" label={`bali_pricing_${city.slug}`}
                  style={{ background: opt.color, color: '#fff', padding: '12px 24px', borderRadius: 50, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                  📲 Book This Option
                </WaLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ background: T.bg, padding: '56px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: T.dark, margin: '0 0 8px' }}>
              Frequently Asked <span style={{ color: T.teal }}>Questions</span>
            </h2>
          </div>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: T.white, border: `1px solid ${openFaq === i ? T.teal : T.border}`, borderRadius: 12, marginBottom: 10, overflow: 'hidden', transition: 'border-color .2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '18px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, textAlign: 'left' }}>
                  <span style={{ fontWeight: 600, color: T.dark, fontSize: 14, lineHeight: 1.5 }}>{f.q}</span>
                  <span style={{ color: T.teal, fontSize: 18, flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: 13, color: T.muted, lineHeight: 1.7, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER CITIES ─────────────────────────────────── */}
      <section style={{ background: T.white, padding: '48px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.dark, margin: '0 0 6px' }}>Book from Other Cities</h2>
          <p style={{ color: T.muted, margin: '0 0 24px', fontSize: 14 }}>Bali packages available from all major Indian cities.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {CITY_LINKS.filter(c => c.slug !== city.slug).map(c => (
              <Link key={c.slug} href={`/bali-from/${c.slug}/`}
                style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 50, padding: '8px 18px', fontSize: 13, fontWeight: 600, color: T.text, textDecoration: 'none', transition: 'all .2s' }}>
                {c.name}
              </Link>
            ))}
          </div>
          <Link href="/bali-from/" style={{ color: T.teal, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            View all 300+ cities →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${T.tealDark} 0%, #164E63 50%, #1E3A5F 100%)`, padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏝️</div>
          <h2 style={{ fontSize: 'clamp(22px,3vw,36px)', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
            Book Bali from <span style={{ color: '#FCD34D' }}>{city.name}</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: '0 0 32px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            WhatsApp our Bali team for instant quotes, flexible dates &amp; group pricing. Responds within 1 hour.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink href={waLink} target="_blank" rel="noopener noreferrer" label={`bali_cta_${city.slug}`}
              style={{ background: '#25D366', color: '#fff', padding: '16px 32px', borderRadius: 50, fontWeight: 700, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}>
              📱 WhatsApp +62 821-1175-9727
            </WaLink>
            <Link href="/itinerary/bali-7d6n-party-escape/"
              style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.35)', color: '#fff', padding: '16px 32px', borderRadius: 50, fontWeight: 600, fontSize: 16, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              🖨️ Download PDF Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
