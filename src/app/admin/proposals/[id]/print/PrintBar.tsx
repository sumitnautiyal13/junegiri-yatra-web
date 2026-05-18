'use client';

import Link from 'next/link';

export function PrintBar({ proposalId, title }: { proposalId: string; title: string }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#0D0A26',
        borderBottom: '1px solid rgba(201,146,61,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 56,
        gap: 16,
      }}
      className="print-hide"
    >
      <Link
        href={`/admin/proposals/${proposalId}`}
        style={{
          color: 'rgba(255,248,238,0.7)',
          textDecoration: 'none',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          whiteSpace: 'nowrap',
        }}
      >
        ← Back to Editor
      </Link>
      <span
        style={{
          color: 'rgba(255,248,238,0.88)',
          fontSize: 14,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
          textAlign: 'center',
        }}
      >
        {title}
      </span>
      <button
        onClick={() => window.print()}
        style={{
          background: 'linear-gradient(135deg, #E05C00, #C9923D)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '8px 18px',
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}
      >
        🖨 Print / Save as PDF
      </button>
    </div>
  );
}
