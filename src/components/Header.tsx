'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrencySwitcher from './CurrencySwitcher';

/* ─── Data types ─────────────────────────────────────────── */
interface MegaItem {
  icon: string;
  label: string;
  sub: string;
  href: string;
  badge?: string;
}
interface MegaColumn {
  heading: string;
  items: MegaItem[];
}
interface MegaFeatured {
  image: string;
  badge: string;
  title: string;
  price: string;
  href: string;
  waText: string;
}
interface NavEntry {
  label: string;
  href: string;
  mega?: { columns: MegaColumn[]; featured: MegaFeatured };
}

/* ─── Navigation data ────────────────────────────────────── */
const NAV: NavEntry[] = [
  {
    label: 'Char Dham',
    href: '/packages/char-dham-yatra/',
    mega: {
      columns: [
        {
          heading: 'Pilgrimage Packages',
          items: [
            { icon: '🕍', label: 'Char Dham Yatra 9N / 10D', sub: 'Full circuit — Yamunotri · Gangotri · Kedarnath · Badrinath', href: '/packages/char-dham-yatra-9n-10d/', badge: 'Popular' },
            { icon: '🔱', label: 'Do Dham — Kedarnath & Badrinath', sub: '5 Nights · 6 Days · from ₹13,500/person', href: '/packages/do-dham-yatra-5n-6d/' },
            { icon: '⛺', label: 'Kedarnath Yatra', sub: '3 Nights · 4 Days · from ₹8,500/person', href: '/packages/kedarnath-yatra-3n-4d/' },
            { icon: '📋', label: 'Compare All Packages', sub: 'See pricing, duration & itineraries side by side', href: '/packages/char-dham-yatra/' },
          ],
        },
        {
          heading: 'Plan Your Journey',
          items: [
            { icon: '📍', label: 'From Your City', sub: '20 Indian cities — Mumbai, Bangalore, Chennai & more', href: '/char-dham-from/' },
            { icon: '🚁', label: 'Helicopter at Kedarnath', sub: 'Skip the 16 km trek — Phata & Guptkashi helipads', href: '/packages/kedarnath-yatra-3n-4d/' },
            { icon: '🗓️', label: 'Best Time to Visit', sub: 'April – June and September – October seasons', href: '/packages/char-dham-yatra/' },
            { icon: '👴', label: 'Senior-Friendly Options', sub: 'Palki · doli · helicopter for elderly pilgrims', href: '/packages/char-dham-yatra/' },
          ],
        },
      ],
      featured: {
        image: '/images/kedarnath_temple_cover.jpg',
        badge: '⭐ Most Popular',
        title: 'Char Dham Yatra 9N / 10D',
        price: 'From ₹19,800 / person',
        href: '/packages/char-dham-yatra-9n-10d/',
        waText: 'Namaste! I want to book Char Dham Yatra 9N/10D package',
      },
    },
  },
  {
    label: 'Treks',
    href: '/treks/',
    mega: {
      columns: [
        {
          heading: 'Winter & Spring Treks',
          items: [
            { icon: '❄️', label: 'Kedarkantha Trek', sub: 'Dec – Apr · 12,500 ft summit · snow trails', href: '/treks/', badge: 'Bestseller' },
            { icon: '🌿', label: 'Kuari Pass Trek', sub: 'Easy · Feb – Jun · panoramic Himalayan views', href: '/treks/' },
            { icon: '🏔️', label: 'Har Ki Dun Trek', sub: 'Moderate · May – Nov · ancient valley route', href: '/treks/' },
          ],
        },
        {
          heading: 'Monsoon & Summer Treks',
          items: [
            { icon: '🌸', label: 'Valley of Flowers', sub: 'Jul – Sep · UNESCO World Heritage · alpine meadows', href: '/treks/', badge: 'UNESCO' },
            { icon: '🏕️', label: 'Hampta Pass', sub: 'Jun – Sep · Spiti crossover · dramatic landscapes', href: '/treks/' },
            { icon: '🌄', label: 'Sar Pass Trek', sub: 'May – Jun · Himachal Pradesh · beginner-friendly', href: '/treks/' },
          ],
        },
      ],
      featured: {
        image: '/images/trek_himalaya.jpg',
        badge: '❄️ Season Open',
        title: 'Kedarkantha Trek 2025',
        price: 'From ₹8,500 / person',
        href: '/treks/',
        waText: 'Namaste! I want to enquire about Kedarkantha Trek',
      },
    },
  },
  {
    label: 'Rishikesh',
    href: '/packages/rishikesh-adventures/',
    mega: {
      columns: [
        {
          heading: 'Water Adventures',
          items: [
            { icon: '🚣', label: 'River Rafting', sub: 'Grade I – IV · 16 km Shivpuri stretch · from ₹600', href: '/packages/rishikesh-adventures/', badge: 'Thrilling' },
            { icon: '🛶', label: 'Kayaking', sub: 'Beginner to expert · half-day & full-day sessions', href: '/packages/rishikesh-adventures/' },
            { icon: '🤿', label: 'Cliff Jumping', sub: 'Natural rock platforms · supervised sessions', href: '/packages/rishikesh-adventures/' },
          ],
        },
        {
          heading: 'Aerial & Wellness',
          items: [
            { icon: '🪂', label: 'Bungee Jumping', sub: '83 metres · India\'s highest fixed bungee', href: '/packages/rishikesh-adventures/', badge: '83m' },
            { icon: '🏕️', label: 'Camping & Bonfire', sub: 'Riverside campsites · tents · bonfire · from ₹1,500', href: '/packages/rishikesh-adventures/' },
            { icon: '🧘', label: 'Yoga Retreats', sub: '3 – 7 day wellness stays · certified instructors', href: '/packages/rishikesh-adventures/' },
          ],
        },
      ],
      featured: {
        image: '/images/rishikesh_bridge.jpg',
        badge: '🌊 Adventure Capital',
        title: 'Rishikesh Adventure Pack',
        price: 'From ₹2,500 / person',
        href: '/packages/rishikesh-adventures/',
        waText: 'Namaste! I want to book Rishikesh adventure activities',
      },
    },
  },
  {
    label: 'Golden Triangle',
    href: '/packages/golden-triangle/',
    mega: {
      columns: [
        {
          heading: 'Tour Packages',
          items: [
            { icon: '🏛️', label: 'Golden Triangle 5N / 6D', sub: 'Delhi · Agra · Jaipur · from ₹18,500/person', href: '/packages/golden-triangle-tour-5n-6d/', badge: 'Complete' },
            { icon: '🕌', label: 'Taj Mahal Day Tour', sub: 'From Delhi · sunrise slot · from ₹6,500/person', href: '/packages/taj-mahal-day-tour-from-delhi/' },
            { icon: '🗺️', label: 'All Heritage Tours', sub: 'Compare durations, prices & inclusions', href: '/packages/golden-triangle/' },
          ],
        },
        {
          heading: 'Destinations',
          items: [
            { icon: '🏙️', label: 'Delhi', sub: 'Red Fort · Qutub Minar · India Gate · Chandni Chowk', href: '/packages/golden-triangle-tour-5n-6d/' },
            { icon: '🕌', label: 'Agra', sub: 'Taj Mahal · Agra Fort · Mehtab Bagh · Fatehpur Sikri', href: '/packages/taj-mahal-day-tour-from-delhi/' },
            { icon: '🏯', label: 'Jaipur', sub: 'Amber Fort · Hawa Mahal · City Palace · Jantar Mantar', href: '/packages/golden-triangle-tour-5n-6d/' },
          ],
        },
      ],
      featured: {
        image: '/images/temple_entrance.jpg',
        badge: '🏆 Heritage India',
        title: 'Golden Triangle 5N / 6D',
        price: 'From ₹18,500 / person',
        href: '/packages/golden-triangle-tour-5n-6d/',
        waText: 'Namaste! I want to enquire about Golden Triangle tour',
      },
    },
  },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
];

/* ─── Component ──────────────────────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [topBarHidden, setTopBarHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 50;
      setScrolled(s);
      setTopBarHidden(s);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* hover-intent helpers */
  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };
  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const closeAll = () => {
    setMobileOpen(false);
    setMobileGroup(null);
    setActiveMega(null);
  };

  const currentMega = NAV.find((n) => n.label === activeMega)?.mega ?? null;

  return (
    <>
      {/* ── TOP BAR ───────────────────────────────────────── */}
      <div className={`top-bar${topBarHidden ? ' hidden' : ''}`}>
        <span>📞 <a href="tel:+919873897652">+91 98738 97652</a></span>
        <span>·</span>
        <span>India&apos;s Trusted Travel Partner</span>
        <span>·</span>
        <CurrencySwitcher />
      </div>

      {/* ── HEADER ────────────────────────────────────────── */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav className="nav">

            {/* LOGO */}
            <Link href="/" className="logo" onClick={closeAll}>
              <Image src="/logo.png" alt="Junegiri Yatra" width={180} height={56}
                style={{ height: '56px', width: 'auto' }} priority />
            </Link>

            {/* ── DESKTOP NAV ─────────────────────────────── */}
            <div className="nav-desktop">
              {NAV.map((entry) =>
                entry.mega ? (
                  <button
                    key={entry.label}
                    className={`nav-trigger${activeMega === entry.label ? ' active' : ''}`}
                    onMouseEnter={() => openMega(entry.label)}
                    onMouseLeave={scheduleMegaClose}
                    onClick={() => setActiveMega(activeMega === entry.label ? null : entry.label)}
                    aria-expanded={activeMega === entry.label}
                    aria-haspopup="true"
                  >
                    {entry.label}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="nav-chevron" aria-hidden="true">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ) : (
                  <Link key={entry.href} href={entry.href} className="nav-trigger plain">
                    {entry.label}
                  </Link>
                )
              )}
              <a href="tel:+919873897652" className="nav-phone">📞 +91 98738 97652</a>
              <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="nav-cta" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </div>

            {/* HAMBURGER */}
            <button className={`hamburger${mobileOpen ? ' active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => { setMobileOpen(!mobileOpen); setMobileGroup(null); }}>
              <span /><span /><span />
            </button>
          </nav>
        </div>

        {/* ── MEGA MENU PANEL (desktop) ─────────────────── */}
        {currentMega && (
          <>
            <div
              className="mega-backdrop"
              onMouseEnter={scheduleMegaClose}
              onClick={() => setActiveMega(null)}
            />
            <div
              className="mega-panel"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleMegaClose}
            >
              <div className="container mega-inner">
                {/* Columns */}
                <div className="mega-cols">
                  {currentMega.columns.map((col) => (
                    <div key={col.heading} className="mega-col">
                      <p className="mega-col-heading">{col.heading}</p>
                      {col.items.map((item) => (
                        <Link key={item.href + item.label} href={item.href}
                          className="mega-item" onClick={() => setActiveMega(null)}>
                          <span className="mega-icon">{item.icon}</span>
                          <span className="mega-item-body">
                            <span className="mega-item-label">{item.label}</span>
                            <span className="mega-item-sub">{item.sub}</span>
                          </span>
                          {item.badge && <span className="mega-badge">{item.badge}</span>}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Featured card */}
                <div className="mega-featured"
                  style={{ backgroundImage: `url('${currentMega.featured.image}')` }}>
                  <div className="mega-featured-overlay" />
                  <div className="mega-featured-content">
                    <span className="mega-featured-badge">{currentMega.featured.badge}</span>
                    <p className="mega-featured-title">{currentMega.featured.title}</p>
                    <p className="mega-featured-price">{currentMega.featured.price}</p>
                    <div className="mega-featured-btns">
                      <Link href={currentMega.featured.href}
                        className="mega-btn-primary" onClick={() => setActiveMega(null)}>
                        View Package
                      </Link>
                      <a href={`https://wa.me/919873897652?text=${encodeURIComponent(currentMega.featured.waText)}`}
                        className="mega-btn-wa" target="_blank" rel="noopener noreferrer"
                        onClick={() => setActiveMega(null)}>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ── MOBILE DRAWER ─────────────────────────────────── */}
      {mobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            {NAV.map((entry) =>
              entry.mega ? (
                <div key={entry.label} className="mob-group">
                  <button
                    className={`mob-trigger${mobileGroup === entry.label ? ' open' : ''}`}
                    onClick={() => setMobileGroup(mobileGroup === entry.label ? null : entry.label)}
                  >
                    {entry.label}
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="mob-chevron" aria-hidden="true">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {mobileGroup === entry.label && (
                    <div className="mob-items">
                      {entry.mega.columns.flatMap((col) =>
                        col.items.map((item) => (
                          <Link key={item.href + item.label} href={item.href}
                            className="mob-item" onClick={closeAll}>
                            <span className="mob-icon">{item.icon}</span>
                            <span className="mob-item-body">
                              <span className="mob-item-label">{item.label}</span>
                              <span className="mob-item-sub">{item.sub}</span>
                            </span>
                          </Link>
                        ))
                      )}
                      {/* Featured link in mobile */}
                      <Link href={entry.mega.featured.href}
                        className="mob-featured" onClick={closeAll}>
                        <span>⭐ {entry.mega.featured.title}</span>
                        <span className="mob-featured-price">{entry.mega.featured.price}</span>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={entry.href} href={entry.href} className="mob-plain" onClick={closeAll}>
                  {entry.label}
                </Link>
              )
            )}

            <div className="mob-cta-row">
              <a href="tel:+919873897652" className="mob-call" onClick={closeAll}>
                📞 +91 98738 97652
              </a>
              <a href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="mob-wa" target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
