import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Customer, Proposal, ProposalDay, ProposalItem, ProposalPricing, ProposalStatus } from '@/types/database';
import { ApprovalButton } from './ApprovalButton';

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = await createClient();
  const { data: raw } = await supabase
    .from('proposals')
    .select('title')
    .eq('share_token', token)
    .single();
  const proposal = raw as unknown as Pick<Proposal, 'title'> | null;
  return {
    title: proposal?.title ? `${proposal.title} | Junegiri Yatra` : 'Travel Proposal | Junegiri Yatra',
    robots: { index: false },
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  AED: 'AED ',
  SGD: 'S$',
  THB: '฿',
  EUR: '€',
  GBP: '£',
};

function calcPricing(pricing: ProposalPricing | null, proposal: Proposal) {
  if (!pricing) return null;
  const adultSub = pricing.base_price_per_person * proposal.num_adults;
  const childSub = pricing.child_price_per_person * proposal.num_children;
  const subtotal = adultSub + childSub;
  const discount = subtotal * (pricing.group_discount_pct / 100);
  const afterDiscount = subtotal - discount;
  const gst = pricing.apply_gst ? afterDiscount * (pricing.gst_pct / 100) : 0;
  const total = afterDiscount + gst;
  return { adultSub, childSub, subtotal, discount, afterDiscount, gst, total };
}

function fmt(n: number, sym: string) {
  return `${sym}${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function statusPill(status: ProposalStatus) {
  const map: Record<ProposalStatus, { label: string; bg: string; color: string }> = {
    draft: { label: 'Draft', bg: 'rgba(100,100,120,0.25)', color: 'rgba(255,248,238,0.55)' },
    sent: { label: 'Awaiting Approval', bg: 'rgba(59,130,246,0.2)', color: '#93c5fd' },
    approved: { label: '✓ Approved', bg: 'rgba(22,163,74,0.2)', color: '#86efac' },
    rejected: { label: 'Changes Requested', bg: 'rgba(192,57,43,0.2)', color: '#fca5a5' },
    booked: { label: '🎫 Booked!', bg: 'rgba(201,146,61,0.2)', color: '#E8AA50' },
  };
  const s = map[status];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: s.bg,
        color: s.color,
        letterSpacing: '0.04em',
      }}
    >
      {s.label}
    </span>
  );
}

function itemIcon(type: string) {
  switch (type) {
    case 'hotel': return '🏨';
    case 'activity': return '🎯';
    case 'transport': return '🚌';
    case 'meal': return '🍽️';
    default: return '📌';
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PublicProposalPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: proposalRaw } = await supabase
    .from('proposals')
    .select('*, customers(name, country, city)')
    .eq('share_token', token)
    .single();

  if (!proposalRaw) notFound();

  // Cast to known types — Supabase typed client infers `never` for joined queries
  const proposal = proposalRaw as unknown as Proposal & {
    customers: Pick<Customer, 'name' | 'country' | 'city'>;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: daysRaw } = await supabase
    .from('proposal_days')
    .select('*, proposal_items(*)')
    .eq('proposal_id', proposal.id)
    .order('day_number');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pricingRaw } = await supabase
    .from('proposal_pricing')
    .select('*')
    .eq('proposal_id', proposal.id)
    .single();

  const days = daysRaw as unknown as (ProposalDay & { proposal_items: ProposalItem[] })[] | null;
  const pricing = pricingRaw as unknown as ProposalPricing | null;

  const calc = calcPricing(pricing, proposal);
  const sym = CURRENCY_SYMBOLS[proposal.currency] ?? proposal.currency + ' ';
  const customer = proposal.customers;
  const totalPax = proposal.num_adults + proposal.num_children;

  const durationDays =
    proposal.travel_date_from && proposal.travel_date_to
      ? Math.ceil(
          (new Date(proposal.travel_date_to).getTime() -
            new Date(proposal.travel_date_from).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : (days?.length ?? 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
          background: #07051A;
          font-family: 'Inter', sans-serif;
          color: rgba(255,248,238,0.88);
          min-height: 100vh;
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 20px !important; }
          .section-pad { padding: 20px 16px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 600, margin: '0 auto', paddingBottom: 120 }}>

        {/* ── TOP BAR ──────────────────────────────────────────────────── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #E05C00, #C9923D)',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '0.04em',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            🏔 Junegiri Yatra
          </span>
        </div>

        {/* ── HERO SECTION ─────────────────────────────────────────────── */}
        <div
          className="section-pad"
          style={{
            background: 'linear-gradient(180deg, #0D0A26 0%, #07051A 100%)',
            padding: '32px 24px 24px',
            textAlign: 'center',
          }}
        >
          {customer && (
            <div style={{ fontSize: 24, marginBottom: 8 }}>
              Hello, <strong style={{ color: '#E8AA50' }}>{customer.name}</strong>! 👋
            </div>
          )}

          <div
            style={{
              fontSize: 14,
              color: 'rgba(255,248,238,0.55)',
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            Your personalized travel proposal is ready
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            {proposal.title}
          </h1>

          <div style={{ marginBottom: 16 }}>{statusPill(proposal.status)}</div>

          {/* Chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              justifyContent: 'center',
            }}
          >
            {proposal.travel_date_from && proposal.travel_date_to && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '5px 14px',
                  fontSize: 13,
                  color: 'rgba(255,248,238,0.7)',
                }}
              >
                📅 {formatDate(proposal.travel_date_from)} — {formatDate(proposal.travel_date_to)}
              </span>
            )}
            <span
              style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '5px 14px',
                fontSize: 13,
                color: 'rgba(255,248,238,0.7)',
              }}
            >
              👥 {proposal.num_adults} Adult{proposal.num_adults !== 1 ? 's' : ''}
              {proposal.num_children > 0 ? ` + ${proposal.num_children} Child${proposal.num_children !== 1 ? 'ren' : ''}` : ''}
            </span>
            {proposal.destination && (
              <span
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '5px 14px',
                  fontSize: 13,
                  color: 'rgba(255,248,238,0.7)',
                }}
              >
                📍 {proposal.destination}
              </span>
            )}
          </div>
        </div>

        {/* ── MESSAGE CARD ─────────────────────────────────────────────── */}
        {proposal.message_to_customer && (
          <div style={{ padding: '0 16px', marginTop: 16 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(201,146,61,0.1), rgba(224,92,0,0.06))',
                border: '1px solid rgba(201,146,61,0.2)',
                borderRadius: 12,
                padding: '20px 20px',
              }}
            >
              <div style={{ fontSize: 11, color: '#C9923D', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                A message from our team
              </div>
              <p
                style={{
                  fontStyle: 'italic',
                  fontSize: 14,
                  color: 'rgba(255,248,238,0.8)',
                  lineHeight: 1.7,
                }}
              >
                &ldquo;{proposal.message_to_customer}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* ── TRIP SUMMARY CHIPS ────────────────────────────────────────── */}
        <div style={{ padding: '20px 16px 0' }}>
          <div
            style={{
              background: '#0D0A26',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#C9923D', fontFamily: "'Playfair Display', serif" }}>
                {durationDays}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.48)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>
                📅 Days
              </div>
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#C9923D', fontFamily: "'Playfair Display', serif" }}>
                {totalPax}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.48)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>
                👥 Group
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#C9923D', wordBreak: 'break-word', lineHeight: 1.3 }}>
                {proposal.destination ?? '—'}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.48)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>
                🌍 Destination
              </div>
            </div>
          </div>
        </div>

        {/* ── DAY TIMELINE ─────────────────────────────────────────────── */}
        {days && days.length > 0 && (
          <div style={{ padding: '24px 16px 0' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>
              Your Itinerary
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {days.map((day, idx) => (
                <div key={day.id} style={{ display: 'flex', gap: 0 }}>
                  {/* Timeline spine */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #E05C00, #C9923D)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#fff',
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    >
                      {day.day_number}
                    </div>
                    {idx < days.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'rgba(201,146,61,0.2)', minHeight: 24 }} />
                    )}
                  </div>

                  {/* Day content */}
                  <div style={{ flex: 1, paddingLeft: 12, paddingBottom: 20 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>
                      {day.title}
                    </div>
                    {day.overview && (
                      <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.55)', lineHeight: 1.6, marginBottom: 8 }}>
                        {day.overview}
                      </div>
                    )}
                    {day.proposal_items && day.proposal_items.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {[...day.proposal_items]
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((item) => (
                            <div
                              key={item.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: 8,
                                padding: '7px 10px',
                              }}
                            >
                              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon ?? itemIcon(item.type)}</span>
                              <div style={{ flex: 1 }}>
                                {item.timing && (
                                  <span style={{ fontSize: 11, color: '#E05C00', fontWeight: 600, marginRight: 6 }}>
                                    {item.timing}
                                  </span>
                                )}
                                <span style={{ fontSize: 13, color: 'rgba(255,248,238,0.8)', fontWeight: 500 }}>
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PRICING CARD ─────────────────────────────────────────────── */}
        {calc && pricing && (
          <div style={{ padding: '0 16px', marginTop: 16 }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #13102E, #0D0A26)',
                border: '1px solid rgba(201,146,61,0.25)',
                borderRadius: 16,
                padding: '24px 20px',
              }}
            >
              <div style={{ fontSize: 12, color: 'rgba(255,248,238,0.48)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                Total Package Price
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  color: '#E8AA50',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {fmt(calc.total, sym)}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.55)', marginBottom: 20 }}>
                {fmt(Math.round(calc.total / Math.max(totalPax, 1)), sym)} per person
              </div>

              {/* Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'rgba(255,248,238,0.6)' }}>
                    {proposal.num_adults} Adult{proposal.num_adults !== 1 ? 's' : ''}
                  </span>
                  <span style={{ color: 'rgba(255,248,238,0.8)' }}>{fmt(calc.adultSub, sym)}</span>
                </div>

                {proposal.num_children > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,248,238,0.6)' }}>
                      {proposal.num_children} Child{proposal.num_children !== 1 ? 'ren' : ''}
                    </span>
                    <span style={{ color: 'rgba(255,248,238,0.8)' }}>{fmt(calc.childSub, sym)}</span>
                  </div>
                )}

                {pricing.group_discount_pct > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: '#86efac' }}>Group Discount ({pricing.group_discount_pct}%)</span>
                    <span style={{ color: '#86efac' }}>-{fmt(calc.discount, sym)}</span>
                  </div>
                )}

                {pricing.apply_gst && calc.gst > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,248,238,0.6)' }}>GST ({pricing.gst_pct}%)</span>
                    <span style={{ color: 'rgba(255,248,238,0.8)' }}>+{fmt(calc.gst, sym)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── INCLUSIONS ───────────────────────────────────────────────── */}
        {pricing && pricing.inclusions?.length > 0 && (
          <div style={{ padding: '20px 16px 0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              ✓ What&apos;s Included
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pricing.inclusions.map((inc, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(22,163,74,0.12)',
                    border: '1px solid rgba(22,163,74,0.2)',
                    borderRadius: 20,
                    padding: '5px 12px',
                    fontSize: 12,
                    color: '#86efac',
                  }}
                >
                  ✓ {inc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTION BUTTONS (sticky bottom on mobile) ──────────────────── */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px 16px 20px',
            background: 'linear-gradient(180deg, transparent 0%, #07051A 30%)',
            paddingTop: 24,
            zIndex: 100,
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <ApprovalButton
              proposalId={proposal.id}
              proposalTitle={proposal.title}
              initialStatus={proposal.status}
            />
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <div
          style={{
            padding: '40px 16px 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#C9923D',
              marginBottom: 8,
            }}
          >
            🏔 Junegiri Yatra
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.48)', marginBottom: 4 }}>
            📞 +91 98738 97652
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.48)' }}>
            🌐 junegiriyatra.com
          </div>
          {customer && (
            <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.3)', marginTop: 16, fontStyle: 'italic' }}>
              This proposal was prepared exclusively for {customer.name}.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
