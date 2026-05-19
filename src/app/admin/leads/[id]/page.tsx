import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Customer, Proposal, ProposalStatus } from '@/types/database';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

const STATUS_CFG: Record<ProposalStatus, { label: string; bg: string; color: string }> = {
  draft:    { label: 'Draft',    bg: 'rgba(255,248,238,0.06)', color: 'rgba(255,248,238,0.4)' },
  sent:     { label: 'Sent',     bg: 'rgba(59,130,246,0.15)',  color: '#93c5fd' },
  approved: { label: 'Approved', bg: 'rgba(34,197,94,0.12)',   color: '#86efac' },
  rejected: { label: 'Rejected', bg: 'rgba(239,68,68,0.12)',   color: '#fca5a5' },
  booked:   { label: 'Booked',   bg: 'rgba(201,146,61,0.18)',  color: '#C9923D' },
};

const SOURCE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  whatsapp: { label: 'WhatsApp', bg: '#0a3d1f', color: '#4ade80' },
  website:  { label: 'Website',  bg: '#0a1f3d', color: '#60a5fa' },
  referral: { label: 'Referral', bg: '#1f0a3d', color: '#c084fc' },
  other:    { label: 'Other',    bg: '#1f1f1f', color: '#9ca3af' },
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !customer) notFound();

  const { data: proposals } = await supabase
    .from('proposals')
    .select('id, title, destination, status, currency, num_adults, num_children, travel_date_from, travel_date_to, created_at')
    .eq('customer_id', id)
    .order('created_at', { ascending: false });

  const c = customer as Customer;
  const props = (proposals ?? []) as Proposal[];

  /* ── Styles ── */
  const page: React.CSSProperties = {
    color: '#e5e7eb',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const backLink: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: 'rgba(255,248,238,0.4)',
    textDecoration: 'none',
    fontSize: '13px',
    marginBottom: '24px',
    transition: 'color 0.15s',
  };

  const headerRow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '32px',
  };

  const name: React.CSSProperties = {
    fontSize: '26px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: 'Poppins, Inter, sans-serif',
    margin: '0 0 6px',
  };

  const sub: React.CSSProperties = {
    color: 'rgba(255,248,238,0.4)',
    fontSize: '13px',
  };

  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  };

  const card: React.CSSProperties = {
    background: '#0D0A26',
    border: '1px solid rgba(201,146,61,0.12)',
    borderRadius: '12px',
    padding: '24px',
  };

  const cardTitle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: 'rgba(255,248,238,0.35)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '18px',
  };

  const fieldRow: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    gap: '12px',
  };

  const fieldLabel: React.CSSProperties = {
    fontSize: '12px',
    color: 'rgba(255,248,238,0.35)',
    fontWeight: 500,
    minWidth: '90px',
    flexShrink: 0,
  };

  const fieldVal: React.CSSProperties = {
    fontSize: '13.5px',
    color: 'rgba(255,248,238,0.85)',
    textAlign: 'right',
    wordBreak: 'break-word',
  };

  const newProposalBtn: React.CSSProperties = {
    background: '#E05C00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  };

  const badge = SOURCE_BADGE[c.source] ?? SOURCE_BADGE.other;

  return (
    <div style={page}>
      {/* Back */}
      <Link href="/admin/leads" style={backLink}>
        ← Back to Leads
      </Link>

      {/* Header */}
      <div style={headerRow}>
        <div>
          <h1 style={name}>{c.name}</h1>
          <span style={sub}>
            Added {formatDate(c.created_at)}
            {c.city ? ` · ${c.city}, ${c.country}` : ` · ${c.country}`}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            href={`/admin/leads/${c.id}/edit`}
            style={{
              background: 'transparent',
              color: '#C9923D',
              border: '1px solid rgba(201,146,61,0.35)',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Edit Lead
          </Link>
          <Link
            href={`/admin/proposals/new?customer_id=${c.id}`}
            style={newProposalBtn}
          >
            + New Proposal
          </Link>
        </div>
      </div>

      {/* Info Cards */}
      <div style={grid}>
        {/* Contact */}
        <div style={card}>
          <div style={cardTitle}>Contact Info</div>
          <div style={fieldRow}>
            <span style={fieldLabel}>WhatsApp</span>
            <a
              href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...fieldVal, color: '#4ade80', textDecoration: 'none' }}
            >
              {c.whatsapp}
            </a>
          </div>
          {c.email && (
            <div style={fieldRow}>
              <span style={fieldLabel}>Email</span>
              <a
                href={`mailto:${c.email}`}
                style={{ ...fieldVal, color: '#60a5fa', textDecoration: 'none' }}
              >
                {c.email}
              </a>
            </div>
          )}
          {c.phone && (
            <div style={fieldRow}>
              <span style={fieldLabel}>Phone</span>
              <span style={fieldVal}>{c.phone}</span>
            </div>
          )}
          <div style={fieldRow}>
            <span style={fieldLabel}>Country</span>
            <span style={fieldVal}>{c.country}</span>
          </div>
          {c.city && (
            <div style={fieldRow}>
              <span style={fieldLabel}>City</span>
              <span style={fieldVal}>{c.city}</span>
            </div>
          )}
          <div style={{ ...fieldRow, borderBottom: 'none' }}>
            <span style={fieldLabel}>Source</span>
            <span
              style={{
                background: badge.bg,
                color: badge.color,
                borderRadius: '999px',
                padding: '2px 10px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {badge.label}
            </span>
          </div>
        </div>

        {/* Notes */}
        <div style={card}>
          <div style={cardTitle}>Notes</div>
          {c.notes ? (
            <p style={{ color: 'rgba(255,248,238,0.7)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
              {c.notes}
            </p>
          ) : (
            <p style={{ color: 'rgba(255,248,238,0.25)', fontSize: '13px', margin: 0, fontStyle: 'italic' }}>
              No notes yet. Edit this lead to add context about their inquiry.
            </p>
          )}

          {/* Quick WhatsApp actions */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,248,238,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
              Quick Actions
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(c.name)}, this is the Junegiri Yatra team. Thank you for reaching out!`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  background: '#0a3d1f',
                  color: '#4ade80',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp
              </a>
              {c.email && (
                <a
                  href={`mailto:${c.email}?subject=Your Junegiri Yatra Inquiry`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '6px',
                    background: '#0a1f3d',
                    color: '#60a5fa',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  ✉️ Email
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Proposals */}
      <div style={card}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <div style={cardTitle}>
            Proposals ({props.length})
          </div>
          <Link href={`/admin/proposals/new?customer_id=${c.id}`} style={{
            color: '#C9923D',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            + Add Proposal
          </Link>
        </div>

        {props.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 24px',
            color: 'rgba(255,248,238,0.25)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📋</div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,248,238,0.4)', marginBottom: '6px' }}>
              No proposals yet
            </div>
            <div style={{ fontSize: '13px', marginBottom: '16px' }}>
              Create a proposal to share an itinerary with {c.name}.
            </div>
            <Link href={`/admin/proposals/new?customer_id=${c.id}`} style={newProposalBtn}>
              + New Proposal
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {props.map((p) => {
              const cfg = STATUS_CFG[p.status] ?? STATUS_CFG.draft;
              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    background: '#13102E',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '14px', marginBottom: '3px' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,248,238,0.35)' }}>
                      {p.destination ?? '—'}
                      {p.travel_date_from ? ` · ${formatDate(p.travel_date_from)}` : ''}
                      {p.num_adults ? ` · ${p.num_adults} adult${p.num_adults !== 1 ? 's' : ''}` : ''}
                      {p.num_children ? `, ${p.num_children} child${p.num_children !== 1 ? 'ren' : ''}` : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,248,238,0.3)' }}>
                      {formatDate(p.created_at)}
                    </span>
                    <span style={{
                      background: cfg.bg,
                      color: cfg.color,
                      borderRadius: '999px',
                      padding: '3px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}>
                      {cfg.label}
                    </span>
                    <Link
                      href={`/admin/proposals/${p.id}`}
                      style={{
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
                      Edit →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
