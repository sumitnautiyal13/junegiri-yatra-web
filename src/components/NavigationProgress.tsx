'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  // Hide bar when new page finishes loading
  useEffect(() => {
    setWidth(100);
    const t = setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  // Start bar on any internal link click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      // Skip external, hash, tel, mailto links
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('whatsapp:')
      ) return;
      // Skip if same page
      if (href === pathname || href === pathname + '/') return;

      setVisible(true);
      setWidth(15);
      setTimeout(() => setWidth(40), 100);
      setTimeout(() => setWidth(65), 400);
      setTimeout(() => setWidth(80), 900);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        height: 3,
        background: '#c9a84c',
        boxShadow: '0 0 8px rgba(201,168,76,0.6)',
        width: `${width}%`,
        transition: visible ? 'width 0.4s ease' : 'width 0.2s ease, opacity 0.3s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        borderRadius: '0 2px 2px 0',
      }}
    />
  );
}
