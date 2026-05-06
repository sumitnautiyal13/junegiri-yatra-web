'use client';

import { type ReactNode } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface WaLinkProps {
  href: string;
  className?: string;
  label: string;           // GA4 event label e.g. "hero_homepage", "package_kedarnath"
  children: ReactNode;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  onClick?: () => void;
}

export default function WaLink({ href, className, label, children, style, target = '_blank', rel = 'noopener noreferrer', 'aria-label': ariaLabel, onClick }: WaLinkProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: label,
      });
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
