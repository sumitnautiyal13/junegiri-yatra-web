import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

/* ─── Types ──────────────────────────────────────────────────────────────── */

type ProposalStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'booked';

interface RecentProposal {
  id: string;
  title: string | null;
  destination: string | null;
  status: ProposalStatus;
  currency: string | null;
  created_at: string;
  customers: {
    name: string;
    whatsapp: string | null;
    country: string | null;
  } | null;
}

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatToday(): string {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ─── Status badge ────────────────────────────────────────────────────────── */

const STATUS_CONFIG: Record<ProposalStatus, { label: string; bg: string; color: string }> = {
  draft:    { label: 'Draft',    bg: 'rgba(255,248,238,0.06)',  color: 'rgba(255,248,238,0.4)' },
  sent:     { label: 'Sent',     bg: 'rgba(59,130,246,0.15)',   color: '#93c5fd' },
  approved: { label: 'Approved', bg: 'rgba(34,197,94,0.12)',    color: '#86efac' },
  rejected: { label: 'Rejected', bg: 'rgba(239,68,68,0.12)',    color: '#fca5a5' },
  booked:   { label: 'Booked',   bg: 'rgba(201,146,61,0.18)',   color: '#C9923D' },
};

function StatusBadge({ status }: { status: ProposalStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        letterSpacing: '0.02em',
      }}
    >
      {cfg.label}
    </span>
  );
}

/* ─── Stat card ───────────────────────────────────────────────────────────── */

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      style={{
        background: '#13102E',
        borderRadius: '12px',
        padding: '20px 24px',
        flex: '1 1 0',
        minWidth: '150px',
        border: highlight
          ? '1px solid rgba(201,146,61,0.3)'
          : '1px solid rgba(201,146,61,0.1)',
      }}
    >
      <div
        style={{
          fontSize: '34px',
          fontWeight: 700,
          color: highlight ? '#C9923D' : '#E8AA50',
          lineHeight: 1,
          marginBottom: '8px',
          fontFamily: 'Poppins, Inter, sans-serif',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '13px',
          color: 'rgba(255,248,238,0.5)',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Recent proposals for the table
  const { data: recentProposals } = await supabase
    .from('proposals')
    .select('id, title, destination, status, currency, created_at, customers(name, whatsapp, country)')
    .order('created_at', { ascending: false })
    .limit(8);

  // Stats — separate count queries
  const { count: totalLeads } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true });

  const { count: sentCount } = await supabase
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'sent');

  const { count: approvedCount } = await supabase
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'approved');

  const { count: bookedCount } = await supabase
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'booked');

  const rows = (recentProposals ?? []) as RecentProposal[];

  /* ── Table styles ── */
  const thStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255,248,238,0.35)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderBottom: '1px solid rgba(201,146,61,0.1)',
    whiteSpace: 'nowrap',
    background: '#13102E',
  };

  const tdStyle: React.CSSProperties = {
    padding: '14px 16px',
    fontSize: '13.5px',
    color: 'rgba(255,248,238,0.8)',
    borderBottom: '1px solid rgba(201,146,61,0.06)',
    verticalAlign: 'middle',
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'Poppins, Inter, sans-serif',
              marginBottom: '6px',
              lineHeight: 1.2,
              margin: '0 0 6px',
            }}
          >
            Dashboard
          </h1>
          <p style={{ color: 'rgba(255,248,238,0.4)', fontSize: '14px', margin: 0 }}>
            {formatToday()}
          </p>
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/admin/leads/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid rgba(201,146,61,0.35)',
              color: '#C9923D',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            + Add Lead
          </Link>
          <Link
            href="/admin/proposals/new"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '8px',
              background: '#E05C00',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            + New Proposal
          </Link>
        </div>
      </div>

      {/* Stat cards — 4 cards per spec */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }}
      >
        <StatCard label="Total Leads"     value={totalLeads   ?? 0} />
        <StatCard label="Proposals Sent"  value={sentCount    ?? 0} />
        <StatCard label="Approved"        value={approvedCount ?? 0} highlight />
        <StatCard label="Booked"          value={bookedCount  ?? 0} highlight />
      </div>

      {/* Recent proposals table */}
      <div
        style={{
          background: '#0D0A26',
          borderRadius: '14px',
          border: '1px solid rgba(201,146,61,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Table header row */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(201,146,61,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Poppins, Inter, sans-serif',
              margin: 0,
            }}
          >
            Recent Proposals
          </h2>
          <Link
            href="/admin/proposals"
            style={{ color: '#C9923D', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}
          >
            View all →
          </Link>
        </div>

        {rows.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Destination</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Currency</th>
                  <th style={thStyle}>Created</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((proposal) => (
                  <tr key={proposal.id} style={{ transition: 'background 0.12s' }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                        {proposal.customers?.name ?? '—'}
                      </div>
                      {proposal.customers?.country && (
                        <div style={{ fontSize: '11px', color: 'rgba(255,248,238,0.35)' }}>
                          {proposal.customers.country}
                        </div>
                      )}
                    </td>
                    <td style={{ ...tdStyle, color: 'rgba(255,248,238,0.7)' }}>
                      {proposal.destination ?? '—'}
                    </td>
                    <td style={tdStyle}>
                      <StatusBadge status={proposal.status} />
                    </td>
                    <td style={{ ...tdStyle, color: 'rgba(255,248,238,0.55)' }}>
                      {proposal.currency ?? '—'}
                    </td>
                    <td style={{ ...tdStyle, color: 'rgba(255,248,238,0.45)', fontSize: '12.5px' }}>
                      {formatDate(proposal.created_at)}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <Link
                        href={`/admin/proposals/${proposal.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '5px 14px',
                          borderRadius: '6px',
                          background: 'rgba(201,146,61,0.12)',
                          color: '#C9923D',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Empty state */
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              color: 'rgba(255,248,238,0.3)',
              fontSize: '14px',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>✦</div>
            <div
              style={{
                fontSize: '17px',
                fontWeight: 600,
                color: 'rgba(255,248,238,0.45)',
                marginBottom: '8px',
              }}
            >
              No proposals yet
            </div>
            <div style={{ marginBottom: '20px' }}>
              Start by adding a lead, then create your first proposal.
            </div>
            <Link
              href="/admin/proposals/new"
              style={{
                display: 'inline-block',
                padding: '10px 22px',
                borderRadius: '8px',
                background: '#E05C00',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              + New Proposal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
