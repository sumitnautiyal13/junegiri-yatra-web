import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { ProposalStatus, ProposalCurrency } from '@/types/database';
import ShareButton from './_components/ShareButton';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface ProposalRow {
  id: string;
  title: string;
  status: ProposalStatus;
  share_token: string;
  destination: string | null;
  travel_date_from: string | null;
  travel_date_to: string | null;
  num_adults: number;
  num_children: number;
  currency: ProposalCurrency;
  created_at: string;
  customers: {
    name: string;
    whatsapp: string;
    country: string;
    city: string | null;
  } | null;
  proposal_pricing: { total_price: number }[] | null;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function fmt(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function fmtCurrency(amount: number, currency: ProposalCurrency): string {
  const symbols: Record<ProposalCurrency, string> = {
    INR: '₹',
    USD: '$',
    AED: 'AED ',
    SGD: 'S$',
    THB: '฿',
    EUR: '€',
    GBP: '£',
  };
  return `${symbols[currency] ?? ''}${amount.toLocaleString('en-IN')}`;
}

/* ─── Status Badge ────────────────────────────────────────────────────────── */

const STATUS_STYLES: Record<ProposalStatus, { bg: string; color: string; label: string }> = {
  draft:    { bg: 'rgba(255,248,238,0.08)', color: 'rgba(255,248,238,0.48)', label: 'Draft' },
  sent:     { bg: 'rgba(59,130,246,0.15)',  color: '#3B82F6',                label: 'Sent' },
  approved: { bg: 'rgba(34,197,94,0.15)',   color: '#22C55E',                label: 'Approved' },
  rejected: { bg: 'rgba(239,68,68,0.15)',   color: '#EF4444',                label: 'Rejected' },
  booked:   { bg: 'rgba(201,146,61,0.18)',  color: '#C9923D',                label: 'Booked' },
};

function StatusBadge({ status }: { status: ProposalStatus }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.draft;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

/* ─── Filter tabs config ──────────────────────────────────────────────────── */

const TABS: { label: string; value: string }[] = [
  { label: 'All',      value: '' },
  { label: 'Draft',    value: 'draft' },
  { label: 'Sent',     value: 'sent' },
  { label: 'Approved', value: 'approved' },
  { label: 'Booked',   value: 'booked' },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = status && TABS.some((t) => t.value === status) ? status : '';

  const supabase = await createClient();

  // Fetch all proposals for count badges + filtered rows
  const { data: allProposals } = await supabase
    .from('proposals')
    .select('id, status');

  const allRows = (allProposals ?? []) as { id: string; status: ProposalStatus }[];

  // Count per status for tab badges
  const counts: Record<string, number> = { '': allRows.length };
  for (const row of allRows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }

  // Filtered proposals with full data
  let query = supabase
    .from('proposals')
    .select('*, customers(name, whatsapp, country, city), proposal_pricing(total_price)')
    .order('created_at', { ascending: false });

  if (activeStatus) {
    query = query.eq('status', activeStatus);
  }

  const { data: proposals, error } = await query;
  const rows = (proposals ?? []) as ProposalRow[];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  /* ── Styles ── */
  const thStyle: React.CSSProperties = {
    padding: '12px 14px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'rgba(255,248,238,0.4)',
    whiteSpace: 'nowrap',
    background: '#13102E',
  };

  return (
    <div
      style={{
        color: 'rgba(255,248,238,0.88)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: 'rgba(255,248,238,0.95)',
            fontFamily: 'Poppins, Inter, sans-serif',
          }}
        >
          Proposals
        </h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link
            href="/admin/proposals/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 18px',
              borderRadius: 8,
              background: '#E05C00',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.01em',
            }}
          >
            + New Proposal
          </Link>
        </div>
      </div>

      {/* Filter Tabs with count badges */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 24,
          borderBottom: '1px solid rgba(201,146,61,0.15)',
          paddingBottom: 0,
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeStatus === tab.value;
          const count = counts[tab.value] ?? 0;
          return (
            <Link
              key={tab.value}
              href={tab.value ? `/admin/proposals?status=${tab.value}` : '/admin/proposals'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '6px 6px 0 0',
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#C9923D' : 'rgba(255,248,238,0.48)',
                background: isActive ? 'rgba(201,146,61,0.1)' : 'transparent',
                borderBottom: isActive ? '2px solid #C9923D' : '2px solid transparent',
                textDecoration: 'none',
                transition: 'color 0.15s',
                marginBottom: -1,
              }}
            >
              {tab.label}
              <span
                style={{
                  display: 'inline-block',
                  padding: '1px 6px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  background: isActive ? 'rgba(201,146,61,0.2)' : 'rgba(255,248,238,0.08)',
                  color: isActive ? '#C9923D' : 'rgba(255,248,238,0.35)',
                  lineHeight: '16px',
                }}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 8,
            background: 'rgba(239,68,68,0.1)',
            color: '#EF4444',
            marginBottom: 20,
            fontSize: 14,
          }}
        >
          Failed to load proposals: {error.message}
        </div>
      )}

      {/* Empty state */}
      {rows.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'rgba(255,248,238,0.32)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 8,
              color: 'rgba(255,248,238,0.5)',
            }}
          >
            No proposals yet
          </div>
          <div style={{ fontSize: 14, marginBottom: 24 }}>
            {activeStatus
              ? `No ${activeStatus} proposals found.`
              : 'Create your first proposal to get started.'}
          </div>
          <Link
            href="/admin/proposals/new"
            style={{
              display: 'inline-block',
              padding: '10px 22px',
              borderRadius: 8,
              background: '#E05C00',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            + New Proposal
          </Link>
        </div>
      ) : (
        /* Table */
        <div
          style={{
            background: '#0D0A26',
            borderRadius: 12,
            border: '1px solid rgba(201,146,61,0.15)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,146,61,0.15)' }}>
                  {[
                    '#',
                    'Customer + Country',
                    'Title',
                    'Destination',
                    'Status',
                    'Dates',
                    'Adults',
                    'Currency',
                    'Created',
                    'Actions',
                  ].map((col) => (
                    <th key={col} style={thStyle}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const totalPrice = row.proposal_pricing?.[0]?.total_price ?? 0;
                  return (
                    <tr
                      key={row.id}
                      style={{
                        borderBottom:
                          i < rows.length - 1
                            ? '1px solid rgba(201,146,61,0.07)'
                            : 'none',
                        transition: 'background 0.12s',
                      }}
                    >
                      {/* # */}
                      <td
                        style={{
                          padding: '13px 14px',
                          color: 'rgba(255,248,238,0.3)',
                          fontSize: 12,
                          fontVariantNumeric: 'tabular-nums',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {i + 1}
                      </td>

                      {/* Customer + Country */}
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ fontWeight: 600, color: 'rgba(255,248,238,0.9)' }}>
                          {row.customers?.name ?? '—'}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: 'rgba(255,248,238,0.38)',
                            marginTop: 2,
                          }}
                        >
                          {[row.customers?.city, row.customers?.country]
                            .filter(Boolean)
                            .join(', ') || ''}
                        </div>
                      </td>

                      {/* Title */}
                      <td style={{ padding: '13px 14px', maxWidth: 180 }}>
                        <div
                          style={{
                            color: 'rgba(255,248,238,0.72)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={row.title}
                        >
                          {row.title ?? '—'}
                        </div>
                      </td>

                      {/* Destination */}
                      <td
                        style={{
                          padding: '13px 14px',
                          color: 'rgba(255,248,238,0.65)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.destination ?? '—'}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '13px 14px' }}>
                        <StatusBadge status={row.status} />
                      </td>

                      {/* Dates */}
                      <td
                        style={{
                          padding: '13px 14px',
                          color: 'rgba(255,248,238,0.5)',
                          whiteSpace: 'nowrap',
                          fontSize: 12,
                        }}
                      >
                        {row.travel_date_from || row.travel_date_to ? (
                          <>
                            {fmt(row.travel_date_from)}
                            <span style={{ color: 'rgba(255,248,238,0.22)', margin: '0 3px' }}>
                              →
                            </span>
                            {fmt(row.travel_date_to)}
                          </>
                        ) : (
                          '—'
                        )}
                      </td>

                      {/* Adults */}
                      <td
                        style={{
                          padding: '13px 14px',
                          color: 'rgba(255,248,238,0.55)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.num_adults}
                        {row.num_children > 0 && (
                          <span style={{ color: 'rgba(255,248,238,0.3)', fontSize: 11 }}>
                            {' '}+{row.num_children}ch
                          </span>
                        )}
                      </td>

                      {/* Currency */}
                      <td
                        style={{
                          padding: '13px 14px',
                          fontWeight: totalPrice > 0 ? 600 : 400,
                          color: totalPrice > 0 ? '#C9923D' : 'rgba(255,248,238,0.3)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {totalPrice > 0 ? fmtCurrency(totalPrice, row.currency) : row.currency}
                      </td>

                      {/* Created */}
                      <td
                        style={{
                          padding: '13px 14px',
                          color: 'rgba(255,248,238,0.38)',
                          whiteSpace: 'nowrap',
                          fontSize: 12,
                        }}
                      >
                        {fmt(row.created_at)}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '13px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Link
                            href={`/admin/proposals/${row.id}`}
                            style={{
                              padding: '5px 11px',
                              borderRadius: 6,
                              background: 'rgba(201,146,61,0.12)',
                              color: '#C9923D',
                              textDecoration: 'none',
                              fontSize: 12,
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/admin/proposals/${row.id}/print`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '5px 9px',
                              borderRadius: 6,
                              background: 'rgba(255,248,238,0.05)',
                              color: 'rgba(255,248,238,0.5)',
                              textDecoration: 'none',
                              fontSize: 12,
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Preview
                          </Link>
                          <ShareButton shareUrl={`${baseUrl}/p/${row.share_token}`} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
