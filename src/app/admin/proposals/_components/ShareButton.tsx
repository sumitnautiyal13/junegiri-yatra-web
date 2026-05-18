'use client';

import { useState } from 'react';

export default function ShareButton({ shareUrl }: { shareUrl: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy share link'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 6,
        background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,248,238,0.06)',
        border: 'none',
        color: copied ? '#22C55E' : 'rgba(255,248,238,0.4)',
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all 0.15s',
        flexShrink: 0,
      }}
    >
      {copied ? '✓' : '⎘'}
    </button>
  );
}
