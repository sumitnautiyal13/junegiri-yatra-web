import { createClient } from '@/lib/supabase/server';
import type { ReactNode } from 'react';
import NavLink from './_components/NavLink';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  dividerBefore?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { icon: '📊', label: 'Dashboard', href: '/admin' },
  { icon: '👥', label: 'Leads', href: '/admin/leads' },
  { icon: '📋', label: 'Proposals', href: '/admin/proposals' },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware handles the redirect; this is a safety-net render
  if (!user) {
    return <>{children}</>;
  }

  /* ─── Styles ─────────────────────────────────────────────────────────────── */

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, sans-serif',
    background: '#07051A',
  };

  const sidebarStyle: React.CSSProperties = {
    width: '220px',
    minWidth: '220px',
    background: '#0D0A26',
    borderRight: '1px solid rgba(201,146,61,0.15)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  };

  const brandHeaderStyle: React.CSSProperties = {
    padding: '28px 20px 22px',
    borderBottom: '1px solid rgba(201,146,61,0.1)',
  };

  const brandEmojiStyle: React.CSSProperties = {
    fontSize: '24px',
    marginBottom: '4px',
    display: 'block',
    lineHeight: 1,
  };

  const brandNameStyle: React.CSSProperties = {
    color: '#C9923D',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    display: 'block',
    fontFamily: 'Poppins, Inter, sans-serif',
    textTransform: 'uppercase',
  };

  const brandSubStyle: React.CSSProperties = {
    color: 'rgba(255,248,238,0.32)',
    fontSize: '10px',
    letterSpacing: '0.14em',
    fontWeight: 500,
    display: 'block',
    marginTop: '3px',
    textTransform: 'uppercase',
  };

  const navStyle: React.CSSProperties = {
    flex: 1,
    padding: '16px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const dividerStyle: React.CSSProperties = {
    height: '1px',
    background: 'rgba(201,146,61,0.1)',
    margin: '8px 10px',
  };

  const userSectionStyle: React.CSSProperties = {
    borderTop: '1px solid rgba(201,146,61,0.1)',
    padding: '14px 18px',
  };

  const userEmailStyle: React.CSSProperties = {
    color: 'rgba(255,248,238,0.32)',
    fontSize: '11px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '10px',
    display: 'block',
  };

  const signOutBtnStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(201,146,61,0.2)',
    borderRadius: '6px',
    padding: '8px 12px',
    color: 'rgba(255,248,238,0.5)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'border-color 0.15s, color 0.15s',
    fontFamily: 'Inter, sans-serif',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    background: '#07051A',
    minHeight: '100vh',
    padding: '32px',
    overflowY: 'auto',
    color: 'rgba(255,248,238,0.88)',
  };

  return (
    <div style={wrapperStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Brand */}
        <div style={brandHeaderStyle}>
          <span style={brandEmojiStyle}>🏔</span>
          <span style={brandNameStyle}>Junegiri</span>
          <span style={brandSubStyle}>Proposals</span>
        </div>

        {/* Nav */}
        <nav style={navStyle}>
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              {item.dividerBefore && <div style={dividerStyle} />}
              <NavLink href={item.href} icon={item.icon} label={item.label} />
            </div>
          ))}
        </nav>

        {/* User + Sign Out */}
        <div style={userSectionStyle}>
          <span style={userEmailStyle} title={user.email ?? ''}>
            {user.email}
          </span>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" style={signOutBtnStyle}>
              <span>🔓</span>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main style={mainStyle}>
        {children}
      </main>
    </div>
  );
}
