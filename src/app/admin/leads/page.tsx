import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const SOURCE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  whatsapp: { label: 'WhatsApp', bg: '#0a3d1f', color: '#4ade80' },
  website:  { label: 'Website',  bg: '#0a1f3d', color: '#60a5fa' },
  referral: { label: 'Referral', bg: '#1f0a3d', color: '#c084fc' },
  other:    { label: 'Other',    bg: '#1f1f1f', color: '#9ca3af' },
};

interface CustomerWithProposals {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  phone: string | null;
  country: string;
  city: string | null;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  proposals: { id: string }[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  const { data: customers, error } = await supabase
    .from('customers')
    .select('*, proposals(id)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch customers:', error);
  }

  const all = (customers as CustomerWithProposals[]) ?? [];
  const query = (q ?? '').trim().toLowerCase();
  const filtered = query
    ? all.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.whatsapp.toLowerCase().includes(query) ||
          c.country.toLowerCase().includes(query) ||
          (c.city ?? '').toLowerCase().includes(query) ||
          (c.email ?? '').toLowerCase().includes(query),
      )
    : all;

  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#07051A',
    color: '#e5e7eb',
    padding: '32px 24px',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: '#C9923D',
    margin: 0,
  };

  const addBtnStyle: React.CSSProperties = {
    background: '#E05C00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const searchFormStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const searchInputStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #2a2550',
    background: '#0D0A26',
    color: '#e5e7eb',
    fontSize: '14px',
    outline: 'none',
  };

  const tableWrapStyle: React.CSSProperties = {
    background: '#0D0A26',
    borderRadius: '12px',
    border: '1px solid #1e1a40',
    overflow: 'auto',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  };

  const thStyle: React.CSSProperties = {
    padding: '14px 16px',
    textAlign: 'left',
    color: '#9ca3af',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #1e1a40',
    background: '#13102E',
    whiteSpace: 'nowrap',
  };

  const tdStyle: React.CSSProperties = {
    padding: '14px 16px',
    borderBottom: '1px solid #13102E',
    verticalAlign: 'middle',
  };

  const emptyStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '60px 24px',
    color: '#6b7280',
  };

  const actionLinkStyle: React.CSSProperties = {
    color: '#C9923D',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 500,
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Leads &amp; Customers</h1>
        <Link href="/admin/leads/new" style={addBtnStyle}>
          + Add Lead
        </Link>
      </div>

      <form method="GET" style={searchFormStyle}>
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Search by name, country, WhatsApp…"
          style={searchInputStyle}
        />
      </form>

      {filtered.length === 0 ? (
        <div style={tableWrapStyle}>
          <div style={emptyStyle}>
            {query ? (
              <>No results for &ldquo;{q}&rdquo;</>
            ) : (
              <>No leads yet. Add your first WhatsApp inquiry.</>
            )}
          </div>
        </div>
      ) : (
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Country</th>
                <th style={thStyle}>WhatsApp</th>
                <th style={thStyle}>Source</th>
                <th style={{ ...thStyle, textAlign: 'center' }}># Proposals</th>
                <th style={thStyle}>Added</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const badge = SOURCE_BADGE[c.source] ?? SOURCE_BADGE.other;
                return (
                  <tr key={c.id}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 600, color: '#f3f4f6' }}>{c.name}</div>
                      {c.city && (
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                          {c.city}
                        </div>
                      )}
                    </td>
                    <td style={tdStyle}>{c.country}</td>
                    <td style={tdStyle}>
                      <a
                        href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#4ade80', textDecoration: 'none' }}
                      >
                        {c.whatsapp}
                      </a>
                    </td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          background: badge.bg,
                          color: badge.color,
                          borderRadius: '999px',
                          padding: '3px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'inline-block',
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      {c.proposals?.length ?? 0}
                    </td>
                    <td style={{ ...tdStyle, color: '#9ca3af' }}>
                      {formatDate(c.created_at)}
                    </td>
                    <td style={tdStyle}>
                      <Link href={`/admin/leads/${c.id}`} style={actionLinkStyle}>
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '16px', color: '#6b7280', fontSize: '13px' }}>
        {filtered.length} lead{filtered.length !== 1 ? 's' : ''}
        {query ? ` matching "${q}"` : ''}
      </div>
    </div>
  );
}
