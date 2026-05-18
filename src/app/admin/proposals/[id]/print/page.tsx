import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Customer, Proposal, ProposalDay, ProposalItem, ProposalPricing } from '@/types/database';
import { PrintBar } from './PrintBar';

export const metadata = {
  title: 'Print Itinerary | Junegiri Yatra',
  robots: { index: false },
};

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
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
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

export default async function PrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: proposalRaw } = await supabase
    .from('proposals')
    .select('*, customers(*)')
    .eq('id', id)
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: daysRaw } = await supabase
    .from('proposal_days')
    .select('*, proposal_items(*)')
    .eq('proposal_id', id)
    .order('day_number');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: pricingRaw } = await supabase
    .from('proposal_pricing')
    .select('*')
    .eq('proposal_id', id)
    .single();

  if (!proposalRaw) notFound();

  // Cast to known types — Supabase typed client infers `never` for joined queries
  const proposal = proposalRaw as unknown as Proposal & { customers: Customer };
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #f5f5f0; font-family: 'Inter', sans-serif; }

        .print-hide { display: flex !important; }

        @media print {
          .print-hide { display: none !important; }
          html, body { background: white !important; }
          .page-wrap { padding-top: 0 !important; }
          .day-card { page-break-inside: avoid; }
          .pricing-section { page-break-inside: avoid; }
          .footer-section { page-break-inside: avoid; }
          @page { margin: 12mm 14mm; size: A4; }
        }
      `}</style>

      <PrintBar proposalId={id} title={proposal.title} />

      <div className="page-wrap" style={{ paddingTop: 72, background: '#f5f5f0', minHeight: '100vh' }}>
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            background: '#ffffff',
            boxShadow: '0 4px 40px rgba(0,0,0,0.12)',
          }}
        >
          {/* ── SECTION 1: Header / Cover ──────────────────────────────── */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0a2540 0%, #1a3a6b 60%, #0d3320 100%)',
              padding: '56px 48px 40px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <div
                style={{
                  fontSize: 36,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  color: '#C9923D',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 12px rgba(201,146,61,0.4)',
                }}
              >
                🏔 Junegiri Yatra
              </div>
              <div
                style={{
                  color: 'rgba(255,248,238,0.55)',
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: 6,
                }}
              >
                Your Trusted Travel Partner
              </div>
            </div>

            <div
              style={{
                width: 80,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #C9923D, transparent)',
                margin: '0 auto 28px',
              }}
            />

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.3,
                marginBottom: 20,
              }}
            >
              {proposal.title}
            </h1>

            {customer && (
              <div style={{ color: 'rgba(255,248,238,0.8)', fontSize: 16, marginBottom: 12, fontWeight: 500 }}>
                Prepared for:{' '}
                <strong style={{ color: '#E8AA50' }}>{customer.name}</strong>
                {customer.city ? ` · ${customer.city}` : ''}
                {customer.country ? `, ${customer.country}` : ''}
              </div>
            )}

            {proposal.destination && (
              <div style={{ color: 'rgba(255,248,238,0.65)', fontSize: 14, marginBottom: 6 }}>
                📍 {proposal.destination}
              </div>
            )}

            {(proposal.travel_date_from || proposal.travel_date_to) && (
              <div style={{ color: 'rgba(255,248,238,0.65)', fontSize: 14, marginBottom: 6 }}>
                📅 {formatDate(proposal.travel_date_from)} — {formatDate(proposal.travel_date_to)}
              </div>
            )}

            <div style={{ color: 'rgba(255,248,238,0.65)', fontSize: 14, marginBottom: 24 }}>
              👥 {proposal.num_adults} Adult{proposal.num_adults !== 1 ? 's' : ''}
              {proposal.num_children > 0
                ? ` · ${proposal.num_children} Child${proposal.num_children !== 1 ? 'ren' : ''}`
                : ''}
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(201,146,61,0.25)',
                paddingTop: 20,
                color: 'rgba(255,248,238,0.45)',
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              Prepared by Junegiri Yatra &nbsp;|&nbsp; +91 98738 97652 &nbsp;|&nbsp; junegiriyatra.com
            </div>
          </div>

          {/* ── SECTION 2: Trip Overview ──────────────────────────────────── */}
          <div style={{ padding: '36px 48px 0' }}>
            <div
              style={{
                background: '#f8f6f0',
                borderRadius: 12,
                padding: '24px 32px',
                border: '1px solid #e8e0d0',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 24,
                  textAlign: 'center',
                  marginBottom: proposal.message_to_customer ? 20 : 0,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: '#C9923D',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {durationDays}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginTop: 4,
                    }}
                  >
                    Days
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      color: '#C9923D',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {totalPax}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginTop: 4,
                    }}
                  >
                    Travellers
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: '#C9923D',
                      fontFamily: "'Playfair Display', serif",
                      wordBreak: 'break-word',
                    }}
                  >
                    {proposal.destination ?? '—'}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginTop: 4,
                    }}
                  >
                    Destination
                  </div>
                </div>
              </div>

              {proposal.message_to_customer && (
                <>
                  <div style={{ height: 1, background: '#e0d8c8', marginBottom: 16 }} />
                  <p
                    style={{
                      fontStyle: 'italic',
                      color: '#4a3f2f',
                      fontSize: 14,
                      lineHeight: 1.7,
                      textAlign: 'center',
                    }}
                  >
                    &ldquo;{proposal.message_to_customer}&rdquo;
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ── SECTION 3: Inclusions & Exclusions ───────────────────────── */}
          {pricing && (
            (pricing.inclusions?.length > 0 || pricing.exclusions?.length > 0)
          ) && (
            <div style={{ padding: '32px 48px 0' }}>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1a1a2e',
                  marginBottom: 20,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                What&apos;s Included
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: '#1a8a3a',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}
                  >
                    ✓ Inclusions
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(pricing.inclusions ?? []).map((inc, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          fontSize: 13,
                          color: '#333',
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: '#1a8a3a', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: '#c0392b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}
                  >
                    ✗ Exclusions
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(pricing.exclusions ?? []).map((exc, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          fontSize: 13,
                          color: '#333',
                          lineHeight: 1.5,
                        }}
                      >
                        <span style={{ color: '#c0392b', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✗</span>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ── SECTION 4: Day-by-Day Itinerary ──────────────────────────── */}
          {days && days.length > 0 && (
            <div style={{ padding: '36px 48px 0' }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1a2e',
                  marginBottom: 24,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Your Day-by-Day Itinerary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {days.map((day) => (
                  <div
                    key={day.id}
                    className="day-card"
                    style={{ border: '1px solid #e8e0d0', borderRadius: 10, overflow: 'hidden' }}
                  >
                    {/* Day header bar */}
                    <div
                      style={{
                        background: 'linear-gradient(135deg, #E05C00, #C9923D)',
                        padding: '14px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: 6,
                          padding: '4px 10px',
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#fff',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          flexShrink: 0,
                        }}
                      >
                        Day {day.day_number}
                      </div>
                      {day.date && (
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', flexShrink: 0 }}>
                          {formatDate(day.date)}
                        </div>
                      )}
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: 16,
                          color: '#fff',
                          flex: 1,
                        }}
                      >
                        {day.title}
                      </div>
                    </div>

                    {/* Day body */}
                    <div style={{ padding: '16px 24px' }}>
                      {day.overview && (
                        <p
                          style={{
                            fontSize: 13,
                            color: '#4a4a4a',
                            lineHeight: 1.7,
                            marginBottom: day.proposal_items?.length ? 14 : 0,
                          }}
                        >
                          {day.overview}
                        </p>
                      )}

                      {day.proposal_items && day.proposal_items.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {[...day.proposal_items]
                            .sort((a, b) => a.sort_order - b.sort_order)
                            .map((item) => (
                              <div
                                key={item.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: 10,
                                  padding: '8px 12px',
                                  background: '#faf9f6',
                                  borderRadius: 6,
                                  border: '1px solid #f0ebe0',
                                }}
                              >
                                <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1 }}>
                                  {item.icon ?? itemIcon(item.type)}
                                </span>
                                <div style={{ flex: 1 }}>
                                  {item.timing && (
                                    <span
                                      style={{
                                        fontSize: 11,
                                        color: '#E05C00',
                                        fontWeight: 600,
                                        marginRight: 8,
                                        background: 'rgba(224,92,0,0.08)',
                                        padding: '1px 6px',
                                        borderRadius: 3,
                                        letterSpacing: '0.04em',
                                      }}
                                    >
                                      {item.timing}
                                    </span>
                                  )}
                                  <span style={{ fontWeight: 600, fontSize: 13, color: '#1a1a2e' }}>
                                    {item.name}
                                  </span>
                                  {item.description && (
                                    <div
                                      style={{
                                        fontSize: 12,
                                        color: '#666',
                                        marginTop: 2,
                                        lineHeight: 1.5,
                                      }}
                                    >
                                      {item.description}
                                    </div>
                                  )}
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

          {/* ── SECTION 5: Pricing Table ──────────────────────────────────── */}
          {calc && pricing && (
            <div className="pricing-section" style={{ padding: '36px 48px 0' }}>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1a2e',
                  marginBottom: 20,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Pricing Breakdown
              </h2>
              <div style={{ border: '1px solid #e8e0d0', borderRadius: 10, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                      <td style={{ padding: '13px 20px', fontSize: 14, color: '#333' }}>
                        Adults ({proposal.num_adults} × {fmt(pricing.base_price_per_person, sym)})
                      </td>
                      <td style={{ padding: '13px 20px', fontSize: 14, color: '#333', textAlign: 'right', fontWeight: 500 }}>
                        {fmt(calc.adultSub, sym)}
                      </td>
                    </tr>

                    {proposal.num_children > 0 && (
                      <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#333' }}>
                          Children ({proposal.num_children} × {fmt(pricing.child_price_per_person, sym)})
                        </td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#333', textAlign: 'right', fontWeight: 500 }}>
                          {fmt(calc.childSub, sym)}
                        </td>
                      </tr>
                    )}

                    <tr style={{ borderBottom: '1px solid #f0ebe0', background: '#faf9f6' }}>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: '#666' }}>Subtotal</td>
                      <td style={{ padding: '13px 20px', fontSize: 13, color: '#666', textAlign: 'right' }}>
                        {fmt(calc.subtotal, sym)}
                      </td>
                    </tr>

                    {pricing.group_discount_pct > 0 && (
                      <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#1a8a3a' }}>
                          Group Discount ({pricing.group_discount_pct}%)
                        </td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#1a8a3a', textAlign: 'right', fontWeight: 500 }}>
                          -{fmt(calc.discount, sym)}
                        </td>
                      </tr>
                    )}

                    {pricing.apply_gst && calc.gst > 0 && (
                      <tr style={{ borderBottom: '1px solid #f0ebe0' }}>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#333' }}>
                          GST ({pricing.gst_pct}%)
                        </td>
                        <td style={{ padding: '13px 20px', fontSize: 14, color: '#333', textAlign: 'right', fontWeight: 500 }}>
                          +{fmt(calc.gst, sym)}
                        </td>
                      </tr>
                    )}

                    <tr style={{ background: 'linear-gradient(135deg, #0a2540, #1a3a6b)' }}>
                      <td
                        style={{
                          padding: '18px 20px',
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#E8AA50',
                          letterSpacing: '0.04em',
                        }}
                      >
                        TOTAL PACKAGE PRICE
                      </td>
                      <td
                        style={{
                          padding: '18px 20px',
                          fontSize: 22,
                          fontWeight: 900,
                          color: '#E8AA50',
                          textAlign: 'right',
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {fmt(calc.total, sym)}
                      </td>
                    </tr>

                    <tr style={{ background: '#f8f6f0', borderTop: '1px solid #e8e0d0' }}>
                      <td style={{ padding: '10px 20px', fontSize: 13, color: '#666' }}>
                        Per person ({totalPax} traveller{totalPax !== 1 ? 's' : ''})
                      </td>
                      <td style={{ padding: '10px 20px', fontSize: 13, color: '#666', textAlign: 'right', fontWeight: 600 }}>
                        {fmt(Math.round(calc.total / Math.max(totalPax, 1)), sym)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {pricing.payment_terms && (
                <div
                  style={{
                    marginTop: 16,
                    padding: '14px 20px',
                    background: '#fffbf4',
                    border: '1px solid #f0d8a0',
                    borderRadius: 8,
                    fontSize: 13,
                    color: '#5a4020',
                    lineHeight: 1.6,
                  }}
                >
                  <strong style={{ display: 'block', marginBottom: 4 }}>Payment Terms</strong>
                  {pricing.payment_terms}
                </div>
              )}
            </div>
          )}

          {/* ── SECTION 6: Footer ──────────────────────────────────────────── */}
          <div
            className="footer-section"
            style={{
              marginTop: 40,
              background: 'linear-gradient(135deg, #0a2540 0%, #1a3a6b 60%, #0d3320 100%)',
              padding: '36px 48px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#C9923D',
                marginBottom: 12,
              }}
            >
              🏔 Junegiri Yatra
            </div>
            <div style={{ color: 'rgba(255,248,238,0.8)', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
              📱 Book Now: WhatsApp +91 98738 97652
            </div>
            <div style={{ color: 'rgba(255,248,238,0.55)', fontSize: 14, marginBottom: 20 }}>
              🌐 junegiriyatra.com
            </div>
            <div
              style={{
                color: 'rgba(255,248,238,0.4)',
                fontSize: 12,
                fontStyle: 'italic',
                borderTop: '1px solid rgba(201,146,61,0.2)',
                paddingTop: 16,
              }}
            >
              This itinerary is customized exclusively for {customer?.name ?? 'you'}.
              &nbsp;All prices and itinerary details are valid as per the date of issue.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
