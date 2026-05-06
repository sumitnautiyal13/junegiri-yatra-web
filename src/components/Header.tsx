'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrencySwitcher from './CurrencySwitcher';

interface NavItem {
  label: string;
  href: string;
  sub?: string;
}
interface NavDivider {
  divider: true;
}
interface NavGroup {
  label: string;
  href: string;
  dropdown?: (NavItem | NavDivider)[];
}

const NAV: NavGroup[] = [
  {
    label: 'Char Dham',
    href: '/packages/char-dham-yatra/',
    dropdown: [
      { label: 'All Char Dham Packages', href: '/packages/char-dham-yatra/', sub: 'Overview & comparison' },
      { label: 'Char Dham 9N / 10D', href: '/packages/char-dham-yatra-9n-10d/', sub: 'Full circuit · from ₹19,800' },
      { label: 'Do Dham — Kedarnath & Badrinath', href: '/packages/do-dham-yatra-5n-6d/', sub: '5N 6D · from ₹13,500' },
      { label: 'Kedarnath Yatra', href: '/packages/kedarnath-yatra-3n-4d/', sub: '3N 4D · from ₹8,500' },
      { divider: true },
      { label: '📍 From Your City', href: '/char-dham-from/', sub: '20 departure cities' },
    ],
  },
  {
    label: 'Treks',
    href: '/treks/',
    dropdown: [
      { label: 'Kedarkantha Trek', href: '/treks/', sub: 'Dec–Apr · 12,500 ft summit' },
      { label: 'Valley of Flowers', href: '/treks/', sub: 'Jul–Sep · UNESCO Heritage' },
      { label: 'Har Ki Dun Trek', href: '/treks/', sub: '5–7 days · moderate difficulty' },
      { label: 'Hampta Pass', href: '/treks/', sub: 'Jun–Sep · Spiti crossover' },
      { label: 'Kuari Pass Trek', href: '/treks/', sub: 'Easy · panoramic Himalayas' },
    ],
  },
  {
    label: 'Rishikesh',
    href: '/packages/rishikesh-adventures/',
    dropdown: [
      { label: 'River Rafting', href: '/packages/rishikesh-adventures/', sub: 'Grade I–IV · 16 km stretch' },
      { label: 'Bungee Jumping', href: '/packages/rishikesh-adventures/', sub: '83 m · India\'s highest' },
      { label: 'Camping & Bonfire', href: '/packages/rishikesh-adventures/', sub: 'Riverside camps from ₹1,500' },
      { label: 'Kayaking & Yoga', href: '/packages/rishikesh-adventures/', sub: 'Wellness retreats' },
    ],
  },
  {
    label: 'Golden Triangle',
    href: '/packages/golden-triangle/',
    dropdown: [
      { label: 'All Golden Triangle Tours', href: '/packages/golden-triangle/', sub: 'Delhi · Agra · Jaipur' },
      { label: 'Golden Triangle 5N / 6D', href: '/packages/golden-triangle-tour-5n-6d/', sub: 'From ₹18,500' },
      { label: 'Taj Mahal Day Tour', href: '/packages/taj-mahal-day-tour-from-delhi/', sub: 'From Delhi · ₹6,500' },
      { label: 'All Taj Mahal Tours', href: '/packages/taj-mahal-tours/', sub: 'Compare options' },
    ],
  },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [topBarHidden, setTopBarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 50;
      setScrolled(s);
      setTopBarHidden(s);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className={`top-bar${topBarHidden ? ' hidden' : ''}`} id="topBar">
        <span>📞 <a href="tel:+919873897652">+91 98738 97652</a></span>
        <span>·</span>
        <span>India&apos;s Trusted Travel Partner</span>
        <span>·</span>
        <CurrencySwitcher />
      </div>

      {/* HEADER */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav className="nav">

            <Link href="/" className="logo" onClick={closeMobile}>
              <Image
                src="/logo.png"
                alt="Junegiri Yatra Logo"
                width={180}
                height={56}
                style={{ height: '56px', width: 'auto' }}
                priority
              />
            </Link>

            <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">

              {NAV.map((group) =>
                group.dropdown ? (
                  <div
                    key={group.label}
                    className={`nav-group${openGroup === group.label ? ' mobile-open' : ''}`}
                  >
                    {/* Desktop: hover via CSS; Mobile: tap button to toggle */}
                    <button
                      className="nav-group-btn"
                      onClick={() =>
                        setOpenGroup(openGroup === group.label ? null : group.label)
                      }
                      aria-expanded={openGroup === group.label}
                      aria-haspopup="true"
                    >
                      {group.label}
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden="true">
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    <div className="nav-dropdown">
                      {group.dropdown.map((item, i) =>
                        'divider' in item ? (
                          <div key={`d${i}`} className="ndd" />
                        ) : (
                          <Link
                            key={(item as NavItem).href + i}
                            href={(item as NavItem).href}
                            className="ndi"
                            onClick={closeMobile}
                          >
                            <span className="ndi-label">{(item as NavItem).label}</span>
                            {(item as NavItem).sub && (
                              <span className="ndi-sub">{(item as NavItem).sub}</span>
                            )}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <Link key={group.href} href={group.href} className="nav-plain" onClick={closeMobile}>
                    {group.label}
                  </Link>
                )
              )}

              <a href="tel:+919873897652" className="nav-phone" aria-label="Call us">
                📞 +91 98738 97652
              </a>
              <a
                href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
              >
                WhatsApp Us
              </a>
            </div>

            <button
              className={`hamburger${menuOpen ? ' active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => { setMenuOpen(!menuOpen); setOpenGroup(null); }}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
