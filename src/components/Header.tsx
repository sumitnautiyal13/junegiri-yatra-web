'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrencySwitcher from './CurrencySwitcher';

const NAV_LINKS = [
  { href: '/packages/', label: 'Packages' },
  { href: '/destinations/', label: 'Destinations' },
  { href: '/treks/', label: 'Treks' },
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [topBarHidden, setTopBarHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 50;
      setScrolled(s);
      setTopBarHidden(s);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            <Link href="/" className="logo">
              <Image
                src="https://junegiriyatra.com/assets/logo.png"
                alt="Junegiri Yatra Logo"
                width={180}
                height={56}
                style={{ height: '56px', width: 'auto' }}
                priority
              />
            </Link>

            <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+919873897652" className="nav-phone" aria-label="Call us">
                📞 +91 98738 97652
              </a>
              <a
                href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </div>

            <button
              className="hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
