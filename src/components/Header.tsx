'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrencySwitcher from './CurrencySwitcher';
import WaLink from '@/components/WaLink';
import InstallAppButton from '@/components/InstallAppButton';

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
  cta?: string;
}
interface NavEntry {
  label: string;
  href: string;
  mega?: { columns: MegaColumn[]; featured: MegaFeatured };
}

/* ─── Navigation data ────────────────────────────────────────
   One axis at the top level — the visitor's TRIP INTENT. Each menu is a
   single clean category (no product appears in two menus), capped at ~7
   curated hero picks + a "View all" row + one featured card, in at most two
   columns so the panel fits above the fold. Geography/season/budget are
   filters on the hub pages, never top-level branches. URLs are unchanged. */
const NAV: NavEntry[] = [
  {
    label: 'Char Dham & Yatras',
    href: '/char-dham-from/',
    mega: {
      columns: [
        {
          heading: 'Char Dham Circuit',
          items: [
            { icon: '🕍', label: 'Char Dham Yatra 9N/10D', sub: 'All four dhams · from ₹19,800', href: '/packages/char-dham-yatra-9n-10d/', badge: 'Popular' },
            { icon: '🔱', label: 'Do Dham — Kedarnath & Badrinath', sub: '5N 6D · from ₹13,500', href: '/packages/do-dham-yatra-5n-6d/' },
            { icon: '⛺', label: 'Kedarnath Yatra', sub: '3N 4D · from ₹8,500', href: '/packages/kedarnath-yatra-3n-4d/' },
            { icon: '🛕', label: 'Badrinath Yatra', sub: '2N 3D · Mana Village · from ₹6,500', href: '/packages/badrinath-yatra-2n-3d/' },
          ],
        },
        {
          heading: 'By Helicopter & Spiritual',
          items: [
            { icon: '🚁', label: 'Kedarnath by Helicopter', sub: 'Skip the trek · VVIP darshan · from ₹24,000', href: '/kedarnath-helicopter/', badge: 'Premium' },
            { icon: '✨', label: 'Char Dham by Helicopter', sub: 'All 4 dhams · 7N 8D · from ₹2,50,000', href: '/packages/char-dham-helicopter-7n-8d/', badge: 'Luxury' },
            { icon: '🪷', label: 'Braj Bhoomi Yatra', sub: 'Mathura · Vrindavan · Varanasi · from ₹14,500', href: '/packages/braj-bhoomi-yatra-5n-6d/' },
            { icon: '📍', label: 'Yatras from your city', sub: '20 departure cities — Mumbai, Bangalore & more', href: '/char-dham-from/' },
          ],
        },
      ],
      featured: {
        image: '/images/kedarnath_temple_cover.webp',
        badge: '⭐ Most Popular',
        title: 'Char Dham Yatra 9N / 10D',
        price: 'From ₹19,800 / person',
        href: '/packages/char-dham-yatra-9n-10d/',
        waText: 'Namaste! I want to book Char Dham Yatra 9N/10D package',
      },
    },
  },
  {
    label: 'Himalayan Treks',
    href: '/himalayan-treks/',
    mega: {
      columns: [
        {
          heading: 'Uttarakhand',
          items: [
            { icon: '❄️', label: 'Kedarkantha Trek', sub: 'Dec–Apr · 3,810m · snow trails', href: '/packages/kedarkantha-trek-5n-6d/', badge: 'Bestseller' },
            { icon: '🌸', label: 'Valley of Flowers', sub: 'Jul–Sep · UNESCO · 300+ wildflowers', href: '/packages/valley-of-flowers-trek-4n-5d/', badge: 'UNESCO' },
            { icon: '🏕️', label: 'Har Ki Dun Trek', sub: 'Apr–Nov · Pandava route · 3,566m', href: '/packages/har-ki-dun-trek-5n-6d/' },
            { icon: '🗻', label: 'Roopkund Trek', sub: 'May–Oct · Mystery Lake · 4,800m', href: '/packages/roopkund-trek-7n-8d/' },
          ],
        },
        {
          heading: 'Himachal & more',
          items: [
            { icon: '🏔️', label: 'Hamta Pass Trek', sub: 'Moderate · 4,270m · Kullu to Spiti', href: '/packages/hamta-pass-trek-4n-5d/', badge: 'New' },
            { icon: '🏕️', label: 'Triund Trek', sub: 'Easy · 2,875m · Dharamshala · 1N/2D', href: '/packages/triund-trek-1n-2d/', badge: 'Easy' },
            { icon: '🌅', label: 'Bhrigu Lake Trek', sub: 'Easy-Mod · 4,300m · Manali · 3N/4D', href: '/packages/bhrigu-lake-trek-3n-4d/' },
            { icon: '🧭', label: 'All 17 treks + difficulty', sub: 'Uttarakhand & Himachal · easy to challenging', href: '/himalayan-treks/' },
          ],
        },
      ],
      featured: {
        image: '/images/trek_snow_peak.webp',
        badge: '❄️ Bestseller',
        title: 'Kedarkantha Trek 2026',
        price: 'From ₹9,500 / person',
        href: '/packages/kedarkantha-trek-5n-6d/',
        waText: 'Namaste! I want to enquire about Kedarkantha Trek',
      },
    },
  },
  {
    label: 'Tours & Getaways',
    href: '/packages/',
    mega: {
      columns: [
        {
          heading: 'Heritage & Classic India',
          items: [
            { icon: '🏛️', label: 'Golden Triangle 5N/6D', sub: 'Delhi · Agra · Jaipur · from ₹18,500', href: '/packages/golden-triangle-tour-5n-6d/', badge: 'Classic' },
            { icon: '🏰', label: 'Rajasthan Tour Package 6N/7D', sub: 'Jaipur · Jodhpur · Jaisalmer · from ₹21,000', href: '/packages/rajasthan-tour-6n-7d/' },
            { icon: '🕌', label: 'Taj Mahal Day Tour', sub: 'From Delhi · sunrise slot · from ₹6,500', href: '/packages/taj-mahal-day-tour-from-delhi/' },
            { icon: '🪔', label: 'Varanasi & Prayagraj', sub: '3N 4D · Ganga Aarti · Sangam · from ₹9,500', href: '/packages/varanasi-prayagraj-spiritual-3n-4d/' },
          ],
        },
        {
          heading: 'Hills, Adventure & Abroad',
          items: [
            { icon: '🚣', label: 'Rishikesh Adventure Pack', sub: '2N 3D · rafting · 83m bungee · from ₹5,500', href: '/packages/rishikesh-adventure-pack-2n-3d/', badge: 'Thrilling' },
            { icon: '🏞️', label: 'Nainital & Jim Corbett', sub: '4N 5D · Naini Lake · tiger safari · from ₹11,000', href: '/packages/nainital-jim-corbett-4n-5d/' },
            { icon: '🏝️', label: 'Bali, Nusa Penida & Gili', sub: '7D/6N · beaches · scuba · from $699', href: '/packages/bali-7d6n-party-escape/' },
            { icon: '🗂️', label: 'All 53 tour packages', sub: 'Browse every trip with filters', href: '/packages/' },
          ],
        },
      ],
      featured: {
        image: '/images/golden_triangle.webp',
        badge: '🏛️ Classic',
        title: 'Golden Triangle Tour',
        price: 'From ₹18,500 / person',
        href: '/packages/golden-triangle-tour-5n-6d/',
        waText: 'Namaste! I want to enquire about the Golden Triangle Tour',
      },
    },
  },
  {
    label: 'Yoga & Retreats',
    href: '/yoga/',
    mega: {
      columns: [
        {
          heading: 'Teacher Training & Retreats',
          items: [
            { icon: '🕉️', label: 'Rishikesh — 200-Hour TTC', sub: 'Himalayan ashram · Yoga Alliance RYT 200 · from ₹95,000', href: '/yoga/rishikesh/200hours/', badge: 'Authentic' },
            { icon: '🌺', label: 'Bali — 200-Hour TTC', sub: 'Tropical villas · Aerial + Yin · from $1,799', href: '/yoga/bali/200hours/', badge: 'Popular' },
            { icon: '🏖️', label: 'Goa — 200-Hour TTC', sub: 'Beachside · Arabian Sea · from ₹1,09,000', href: '/yoga/goa/200hours/' },
            { icon: '🧘', label: 'Yoga Retreat 5N/6D — Rishikesh', sub: 'Certified instructors · ashram stay · from ₹12,000', href: '/packages/rishikesh-yoga-retreat-5n-6d/', badge: 'Wellness' },
            { icon: '📋', label: 'All yoga programs', sub: '100hr · 200hr · 300hr — compare levels', href: '/yoga/' },
          ],
        },
      ],
      featured: {
        image: '/images/kedarnath_temple_cover.webp',
        badge: '🕉️ Yoga Alliance',
        title: 'Rishikesh 200-Hour TTC',
        price: 'Certified RYT 200 · from ₹95,000',
        href: '/yoga/rishikesh/200hours/',
        waText: 'Namaste! I want details on the Rishikesh 200-Hour Yoga TTC',
      },
    },
  },
  {
    label: 'Plan',
    href: '/compare/',
    mega: {
      columns: [
        {
          heading: 'Decide with confidence',
          items: [
            { icon: '⚖️', label: 'Compare Trips', sub: 'Side-by-side guides — duration, cost, difficulty', href: '/compare/' },
            { icon: '📅', label: 'Best Time to Visit', sub: 'Month-by-month seasons for every destination', href: '/best-time/' },
            { icon: '📝', label: 'Travel Blog', sub: 'Costs, itineraries, packing & how-to guides', href: '/blog/' },
            { icon: '⭐', label: 'Reviews', sub: '4.8★ from 312 travellers', href: '/reviews/' },
            { icon: '🏔️', label: 'About Junegiri Yatra', sub: 'Haridwar operator since 2017 · ATOI licensed', href: '/about/' },
          ],
        },
      ],
      featured: {
        image: '/images/golden_triangle.webp',
        badge: '💬 Not sure where to start?',
        title: 'Get a free custom quote',
        price: 'Reply within the hour on WhatsApp',
        href: '/compare/',
        cta: 'Compare Trips',
        waText: 'Namaste! I need help planning my India trip — can you suggest options?',
      },
    },
  },
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

  /* hover helpers — close only when mouse leaves the whole header */
  const openMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };
  const scheduleMegaClose = () => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 300);
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
      {/* onMouseLeave on header = single close zone; no per-element timers needed */}
      <header
        className={scrolled ? 'scrolled' : ''}
        onMouseLeave={scheduleMegaClose}
        onMouseEnter={cancelClose}
      >
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
              <WaLink href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="nav-cta" target="_blank" rel="noopener noreferrer"
                label="nav_cta">
                WhatsApp Us
              </WaLink>
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
            {/* Backdrop — click to close only; no mouse events that fight the header handler */}
            <div
              className="mega-backdrop"
              onClick={() => setActiveMega(null)}
            />
            <div className="mega-panel">
              <div className="container mega-inner">
                {/* Columns */}
                <div className={`mega-cols cols-${currentMega.columns.length}`}>
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
                <div className="mega-featured">
                  <Image src={currentMega.featured.image} alt={currentMega.featured.title} fill sizes="320px" style={{ objectFit: 'cover' }} priority={false} />
                  <div className="mega-featured-overlay" />
                  <div className="mega-featured-content">
                    <span className="mega-featured-badge">{currentMega.featured.badge}</span>
                    <p className="mega-featured-title">{currentMega.featured.title}</p>
                    <p className="mega-featured-price">{currentMega.featured.price}</p>
                    <div className="mega-featured-btns">
                      <Link href={currentMega.featured.href}
                        className="mega-btn-primary" onClick={() => setActiveMega(null)}>
                        {currentMega.featured.cta ?? 'View Package'}
                      </Link>
                      <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(currentMega.featured.waText)}`}
                        className="mega-btn-wa" target="_blank" rel="noopener noreferrer"
                        label="mega_menu_featured"
                        onClick={() => setActiveMega(null)}>
                        WhatsApp
                      </WaLink>
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
        <>
          {/* Backdrop — tap anywhere outside to close */}
          <div
            className="mobile-backdrop"
            onClick={closeAll}
            aria-hidden="true"
          />
          <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
            {/* Close button */}
            <button
              className="mob-close"
              onClick={closeAll}
              aria-label="Close menu"
            />
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
                      {entry.mega.columns.map((col) => (
                        <div key={col.heading} className="mob-subgroup">
                          <p className="mob-subhead">{col.heading}</p>
                          {col.items.map((item) => (
                            <Link key={item.href + item.label} href={item.href}
                              className="mob-item" onClick={closeAll}>
                              <span className="mob-icon">{item.icon}</span>
                              <span className="mob-item-body">
                                <span className="mob-item-label">{item.label}</span>
                                <span className="mob-item-sub">{item.sub}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
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
              <WaLink href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="mob-wa" target="_blank" rel="noopener noreferrer"
                label="mobile_drawer"
                onClick={closeAll}>
                WhatsApp Us
              </WaLink>
            </div>
            <div style={{ padding: '12px 16px 4px', borderTop: '1px solid var(--border)' }}>
              <InstallAppButton style={{ color: 'var(--muted)', fontSize: 14, fontWeight: 600 }} />
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}
