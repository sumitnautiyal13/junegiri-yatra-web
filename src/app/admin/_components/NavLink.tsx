'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  icon: string;
  label: string;
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname();

  // Exact match for dashboard, prefix match for sections
  const isActive =
    href === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(href);

  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: isActive ? '#C9923D' : 'rgba(255,248,238,0.65)',
    fontSize: '14px',
    fontWeight: isActive ? 600 : 500,
    textDecoration: 'none',
    background: isActive ? 'rgba(201,146,61,0.1)' : 'transparent',
    borderLeft: isActive ? '2px solid #C9923D' : '2px solid transparent',
    transition: 'background 0.15s, color 0.15s',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  return (
    <Link
      href={href}
      style={style}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(201,146,61,0.06)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#E8AA50';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,248,238,0.65)';
        }
      }}
    >
      <span style={{ fontSize: '16px', width: '20px', textAlign: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      {label}
    </Link>
  );
}
