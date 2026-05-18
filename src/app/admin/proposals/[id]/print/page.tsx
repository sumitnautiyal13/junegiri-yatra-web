import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Customer, Proposal, ProposalDay, ProposalItem, ProposalPricing } from '@/types/database';
import { PrintBar } from './PrintBar';

export const metadata = {
  title: 'Print Itinerary | Junegiri Yatra',
  robots: { index: false },
};

// ── Cover image by destination keyword ───────────────────────────────────────

const COVERS = [
  { keys: ['kedarnath'], url: '/img/kedarnath_temple_cover.jpg' },
  { keys: ['char dham', 'chardham', 'badrinath'], url: '/img/kedarnath_landscape.jpg' },
  { keys: ['valley of flowers'], url: '/img/trek_valley_flowers.jpg' },
  { keys: ['rishikesh', 'yoga', 'rafting'], url: '/img/rishikesh1.jpg' },
  { keys: ['trek', 'kedarkantha', 'hampta', 'har ki dun', 'kuari', 'sar pass'], url: '/img/trek_himalaya.jpg' },
  { keys: ['braj', 'mathura', 'vrindavan', 'ayodhya'], url: '/img/braj_mathura.jpg' },
];
const DEFAULT_COVER = '/img/cover_meditation.jpg';

// ── Day photo mapping — pick image based on day title keywords ────────────────

const DAY_PHOTOS = [
  { keys: ['haridwar', 'har ki pauri', 'ganga aarti', 'aarti'], url: '/img/haridwar_ghat.jpg' },
  { keys: ['kedarnath'], url: '/img/kedarnath2.jpg' },
  { keys: ['badrinath', 'mana'], url: '/img/badrinath_temple_front.jpg' },
  { keys: ['rishikesh', 'rafting', 'bungee', 'camping'], url: '/img/rishikesh1.jpg' },
  { keys: ['yoga'], url: '/img/rishikesh_yoga.jpg' },
  { keys: ['valley of flowers', 'ghangaria'], url: '/img/trek_valley_flowers.jpg' },
  { keys: ['gangotri', 'yamunotri', 'gaumukh', 'barkot', 'janki chatti'], url: '/img/himalaya1.jpg' },
  { keys: ['uttarkashi', 'guptkashi'], url: '/img/guptkashi_hilltown.jpg' },
  { keys: ['delhi'], url: '/img/sunrise_mountain.jpg' },
  { keys: ['mathura', 'vrindavan', 'braj'], url: '/img/braj_vrindavan.jpg' },
  { keys: ['trek', 'kedarkantha', 'hampta', 'har ki dun', 'kuari', 'sar pass'], url: '/img/trek_himalaya.jpg' },
  { keys: ['ganga', 'river', 'sangam'], url: '/img/ganga1.jpg' },
  { keys: ['temple', 'darshan', 'mandir'], url: '/img/temple1.jpg' },
];
const DEFAULT_DAY_PHOTO = '/img/kedarnath_landscape.jpg';

function getDayPhoto(title: string, overview?: string | null): string {
  const t = (title + ' ' + (overview ?? '')).toLowerCase();
  return DAY_PHOTOS.find(d => d.keys.some(k => t.includes(k)))?.url ?? DEFAULT_DAY_PHOTO;
}

function getCoverImage(dest: string | null, title: string): string {
  const t = ((dest ?? '') + ' ' + title).toLowerCase();
  return COVERS.find(c => c.keys.some(k => t.includes(k)))?.url ?? DEFAULT_COVER;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const SYM: Record<string, string> = { INR: '₹', USD: '$', AED: 'AED ', SGD: 'S$', THB: '฿', EUR: '€', GBP: '£' };

function calcPricing(p: ProposalPricing | null, pr: Proposal) {
  if (!p) return null;
  const adultSub = p.base_price_per_person * pr.num_adults;
  const childSub = p.child_price_per_person * pr.num_children;
  const subtotal = adultSub + childSub;
  const discount = subtotal * (p.group_discount_pct / 100);
  const after = subtotal - discount;
  const gst = p.apply_gst ? after * (p.gst_pct / 100) : 0;
  return { adultSub, childSub, subtotal, discount, after, gst, total: after + gst };
}

function fmt(n: number, sym: string) {
  return `${sym}${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

function fmtDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function itemIcon(t: string) {
  return t === 'hotel' ? '🏨' : t === 'activity' ? '🎯' : t === 'transport' ? '🚌' : t === 'meal' ? '🍽️' : '📌';
}

// ── Shared colours ────────────────────────────────────────────────────────────
const C = {
  bg:       '#141414',
  card:     '#1E1E1E',
  green:    '#2A4520',
  orange:   '#F0921E',
  amber:    '#F5A020',
  white:    '#FFFFFF',
  gray:     '#AAAAAA',
  border:   '#2E2E2E',
};

// ── Sub-components (inline) ───────────────────────────────────────────────────

function PageHeader() {
  return (
    <div style={{ background: C.green, padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: C.white, fontWeight: 700, fontSize: 16, letterSpacing: '0.02em' }}>Junegiri Yatra</span>
      <span style={{ color: C.orange, fontWeight: 600, fontSize: 14 }}>+91 98738 97652</span>
    </div>
  );
}

function SectionHeading({ first, second }: { first: string; second: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>
        <span style={{ color: C.white }}>{first} </span>
        <span style={{ color: C.orange }}>{second}</span>
      </h2>
      <div style={{ width: 48, height: 3, background: C.orange, borderRadius: 2, marginTop: 8 }} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PrintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: raw } = await (supabase as any).from('proposals').select('*, customers(*)').eq('id', id).single();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: daysRaw } = await (supabase as any).from('proposal_days').select('*, proposal_items(*)').eq('proposal_id', id).order('day_number');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pricingRaw } = await (supabase as any).from('proposal_pricing').select('*').eq('proposal_id', id).single();

  if (!raw) notFound();

  const proposal = raw as unknown as Proposal & { customers: Customer };
  const days     = daysRaw as unknown as (ProposalDay & { proposal_items: ProposalItem[] })[] | null;
  const pricing  = pricingRaw as unknown as ProposalPricing | null;

  const calc   = calcPricing(pricing, proposal);
  const sym    = SYM[proposal.currency] ?? proposal.currency + ' ';
  const cust   = proposal.customers;
  const pax    = proposal.num_adults + proposal.num_children;
  const cover  = getCoverImage(proposal.destination, proposal.title);

  const nights =
    proposal.travel_date_from && proposal.travel_date_to
      ? Math.ceil((new Date(proposal.travel_date_to).getTime() - new Date(proposal.travel_date_from).getTime()) / 86400000)
      : Math.max((days?.length ?? 1) - 1, 0);
  const tripDays = nights + 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: #0a0a0a;
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color: ${C.white};
        }
        .print-hide { display: flex !important; }

        @media print {
          .print-hide { display: none !important; }
          html, body { background: ${C.bg} !important; }
          .page-wrap { padding-top: 0 !important; }
          .no-break { page-break-inside: avoid; }
          .page-break { page-break-before: always; }
          @page { margin: 0; size: A4; }
        }
      `}</style>

      <PrintBar proposalId={id} title={proposal.title} />

      <div className="page-wrap" style={{ paddingTop: 68, background: '#0a0a0a', minHeight: '100vh' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', background: C.bg, boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}>

          {/* ══════════════════════════════════════════
              PAGE 1 — COVER
          ══════════════════════════════════════════ */}
          <div style={{ position: 'relative', height: 580, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover} alt="destination"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Dark overlay — heavier at bottom like the brochure */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.78) 80%, rgba(0,0,0,0.92) 100%)' }} />

            {/* Bottom content */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 44px 44px' }}>
              {/* Brand */}
              <div style={{ fontWeight: 800, fontSize: 22, color: C.amber, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                JUNEGIRI YATRA
              </div>

              {/* Trip title */}
              <h1 style={{ fontSize: 40, fontWeight: 800, color: C.white, lineHeight: 1.15, marginBottom: 20, maxWidth: 680, textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {proposal.title}
              </h1>

              {/* Duration pill + customer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ background: C.orange, borderRadius: 50, padding: '10px 28px', fontWeight: 800, fontSize: 16, color: C.white, display: 'inline-block' }}>
                  {nights} NIGHTS / {tripDays} DAYS
                </div>
                {cust && (
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 500 }}>
                    Prepared for <strong style={{ color: C.white }}>{cust.name}</strong>
                    {cust.city ? ` · ${cust.city}` : ''}
                    {cust.country ? `, ${cust.country}` : ''}
                  </div>
                )}
              </div>

              {/* Dates + pax */}
              {(proposal.travel_date_from || proposal.destination) && (
                <div style={{ marginTop: 14, display: 'flex', gap: 20, color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
                  {proposal.destination && <span>📍 {proposal.destination}</span>}
                  {(proposal.travel_date_from || proposal.travel_date_to) && (
                    <span>📅 {fmtDate(proposal.travel_date_from)} – {fmtDate(proposal.travel_date_to)}</span>
                  )}
                  <span>👥 {pax} Traveller{pax !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              PAGE 2 — TOUR OVERVIEW
          ══════════════════════════════════════════ */}
          <div className="page-break">
            <PageHeader />
            <div style={{ padding: '44px 44px 0', background: C.bg }}>

              <SectionHeading first="Tour" second="Overview" />

              {/* Key facts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {[
                  { label: 'Duration', value: `${tripDays} Days / ${nights} Nights` },
                  ...(proposal.destination ? [{ label: 'Destination', value: proposal.destination }] : []),
                  ...((proposal.travel_date_from || proposal.travel_date_to) ? [{ label: 'Travel Dates', value: `${fmtDate(proposal.travel_date_from)} – ${fmtDate(proposal.travel_date_to)}` }] : []),
                  { label: 'Travellers', value: `${proposal.num_adults} Adult${proposal.num_adults !== 1 ? 's' : ''}${proposal.num_children > 0 ? ` + ${proposal.num_children} Child${proposal.num_children !== 1 ? 'ren' : ''}` : ''}` },
                  ...(calc ? [{ label: 'Package Price', value: `${fmt(calc.total, sym)} total · ${fmt(Math.round(calc.total / Math.max(pax, 1)), sym)} per person` }] : []),
                ].map(({ label, value }) => (
                  <div key={label} style={{ fontSize: 15, color: C.white }}>
                    <span style={{ color: C.orange, fontWeight: 700 }}>{label}: </span>
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Personal message */}
              {proposal.message_to_customer && (
                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.orange}`, borderRadius: 8, padding: '18px 22px', marginBottom: 36 }}>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontStyle: 'italic' }}>
                    &ldquo;{proposal.message_to_customer}&rdquo;
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: C.orange, fontWeight: 600 }}>— Junegiri Yatra Team</div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {pricing && (pricing.inclusions?.length > 0 || pricing.exclusions?.length > 0) && (
                <>
                  <SectionHeading first="What's" second="Included" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 44 }}>
                    {/* Inclusions */}
                    {pricing.inclusions?.length > 0 && (
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#4CAF50', marginBottom: 16 }}>Inclusions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {pricing.inclusions.map((inc: string, i: number) => (
                            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                              <span style={{ color: '#4CAF50', fontWeight: 700, flexShrink: 0 }}>+</span>
                              {inc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Exclusions */}
                    {pricing.exclusions?.length > 0 && (
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: '#EF5350', marginBottom: 16 }}>Exclusions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {pricing.exclusions.map((exc: string, i: number) => (
                            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                              <span style={{ color: '#EF5350', fontWeight: 700, flexShrink: 0 }}>−</span>
                              {exc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              PAGES 3+ — DAY-BY-DAY ITINERARY
          ══════════════════════════════════════════ */}
          {days && days.length > 0 && (
            <div className="page-break">
              <PageHeader />
              <div style={{ padding: '44px 44px 0', background: C.bg }}>
                <SectionHeading first="Day-by-Day" second="Itinerary" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 44 }}>
                  {days.map((day) => {
                    const dayPhoto = getDayPhoto(day.title, day.overview);
                    const items = [...(day.proposal_items ?? [])].sort((a, b) => a.sort_order - b.sort_order);

                    return (
                      <div
                        key={day.id}
                        className="no-break"
                        style={{
                          background: C.card,
                          borderRadius: 10,
                          overflow: 'hidden',
                          border: `1px solid ${C.border}`,
                          borderLeft: `4px solid ${C.amber}`,
                        }}
                      >
                        {/* Day card header */}
                        <div style={{ padding: '20px 24px 16px' }}>
                          {/* DAY badge */}
                          <div style={{ display: 'inline-block', background: C.orange, borderRadius: 50, padding: '5px 18px', fontWeight: 800, fontSize: 13, color: C.white, marginBottom: 12, letterSpacing: '0.04em' }}>
                            DAY {day.day_number}
                            {day.date ? ` · ${fmtDate(day.date)}` : ''}
                          </div>

                          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.white, lineHeight: 1.2, marginBottom: 4 }}>
                            {day.title}
                          </h3>

                          {/* Sub-info from items — show timing/transport as subtitle */}
                          {items.find(i => i.type === 'transport') && (
                            <div style={{ fontSize: 13, color: C.gray, marginBottom: 0 }}>
                              {items.find(i => i.type === 'transport')?.description ?? ''}
                            </div>
                          )}
                        </div>

                        {/* Location photo */}
                        <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={dayPhoto} alt={day.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                          />
                          {/* Bottom fade */}
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(transparent, ${C.card})` }} />
                        </div>

                        {/* Day body */}
                        <div style={{ padding: '16px 24px 20px' }}>
                          {/* Overview text */}
                          {day.overview && (
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: items.length ? 16 : 0 }}>
                              {day.overview}
                            </p>
                          )}

                          {/* Items list */}
                          {items.length > 0 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {items.map((item) => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                  <span style={{ fontSize: 15, flexShrink: 0, lineHeight: 1.6 }}>{item.icon ?? itemIcon(item.type)}</span>
                                  <div style={{ flex: 1 }}>
                                    <span style={{ fontWeight: 600, fontSize: 13.5, color: C.white }}>{item.name}</span>
                                    {item.timing && (
                                      <span style={{ marginLeft: 8, fontSize: 11, color: C.orange, fontWeight: 600, background: 'rgba(240,146,30,0.12)', padding: '1px 7px', borderRadius: 3 }}>
                                        {item.timing}
                                      </span>
                                    )}
                                    {item.description && (
                                      <div style={{ fontSize: 12, color: C.gray, marginTop: 2, lineHeight: 1.5 }}>{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Activity tags — from item names when no descriptions */}
                          {items.filter(i => i.type === 'activity').length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                              {items.filter(i => i.type === 'activity').map((item) => (
                                <span
                                  key={item.id}
                                  style={{
                                    border: `1px solid ${C.amber}`,
                                    borderRadius: 4,
                                    padding: '4px 12px',
                                    fontSize: 12,
                                    color: C.amber,
                                    fontWeight: 500,
                                    background: 'rgba(245,160,32,0.08)',
                                  }}
                                >
                                  {item.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              PRICING PAGE
          ══════════════════════════════════════════ */}
          {calc && pricing && (
            <div className="page-break no-break">
              <PageHeader />
              <div style={{ padding: '44px 44px 44px', background: C.bg }}>
                <SectionHeading first="Package" second="Pricing" />

                <p style={{ fontSize: 13.5, color: C.gray, marginBottom: 28, lineHeight: 1.6 }}>
                  {pricing.payment_terms
                    ? pricing.payment_terms
                    : 'All prices are inclusive of taxes and applicable charges.'}
                </p>

                {/* Pricing table */}
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
                  {/* Orange header */}
                  <div style={{ background: C.orange, padding: '16px 24px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.white }}>Package Details</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.white }}>Amount</span>
                  </div>

                  {/* Rows */}
                  {[
                    { label: `Adults (${proposal.num_adults} × ${fmt(pricing.base_price_per_person, sym)})`, value: fmt(calc.adultSub, sym), show: true },
                    { label: `Children (${proposal.num_children} × ${fmt(pricing.child_price_per_person, sym)})`, value: fmt(calc.childSub, sym), show: proposal.num_children > 0 },
                    { label: 'Subtotal', value: fmt(calc.subtotal, sym), show: true, dim: true },
                    { label: `Group Discount (${pricing.group_discount_pct}%)`, value: `− ${fmt(calc.discount, sym)}`, show: pricing.group_discount_pct > 0, green: true },
                    { label: `GST (${pricing.gst_pct}%)`, value: `+ ${fmt(calc.gst, sym)}`, show: pricing.apply_gst && calc.gst > 0 },
                  ].filter(r => r.show).map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 24px',
                        background: i % 2 === 0 ? C.card : '#1A1A1A',
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      <span style={{ fontSize: 14, color: row.dim ? C.gray : row.green ? '#4CAF50' : 'rgba(255,255,255,0.85)' }}>{row.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: row.dim ? C.gray : row.green ? '#4CAF50' : C.white }}>{row.value}</span>
                    </div>
                  ))}

                  {/* Total row */}
                  <div style={{ background: '#111', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `2px solid ${C.orange}` }}>
                    <div>
                      <div style={{ fontSize: 12, color: C.gray, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Total Package Price</div>
                      <div style={{ fontSize: 12, color: C.gray }}>{fmt(Math.round(calc.total / Math.max(pax, 1)), sym)} per person</div>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: C.orange }}>
                      {fmt(calc.total, sym)}
                    </div>
                  </div>
                </div>

                {/* Important notes */}
                <div style={{ marginTop: 28, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '18px 22px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.orange, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Important Notes</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                    • This proposal is valid for 7 days from the date of issue.<br />
                    • Prices are subject to availability at the time of booking.<br />
                    • For queries, contact us on WhatsApp: +91 98738 97652
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              FOOTER — closing page
          ══════════════════════════════════════════ */}
          <div style={{ background: C.green, padding: '44px', textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: C.amber, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              JUNEGIRI YATRA
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 20 }}>
              Your Trusted Himalayan &amp; Pilgrimage Travel Partner
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>WhatsApp</div>
                <div style={{ color: C.orange, fontWeight: 700, fontSize: 15 }}>+91 98738 97652</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>Website</div>
                <div style={{ color: C.orange, fontWeight: 700, fontSize: 15 }}>junegiriyatra.com</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>Based In</div>
                <div style={{ color: C.white, fontWeight: 700, fontSize: 15 }}>Haridwar, Uttarakhand</div>
              </div>
            </div>
            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
              This itinerary is crafted exclusively for {cust?.name ?? 'you'}. All prices & details are valid as of the date of issue.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
