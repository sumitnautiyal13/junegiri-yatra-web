'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CurrencySwitcher from './CurrencySwitcher';
import WaLink from '@/components/WaLink';

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
    label: 'Pilgrimages',
    href: '/packages/char-dham-yatra/',
    mega: {
      columns: [
        {
          heading: 'Char Dham Circuit',
          items: [
            { icon: '🕍', label: 'Char Dham Yatra 9N/10D', sub: 'Full circuit · Yamunotri · Gangotri · Kedarnath · Badrinath', href: '/packages/char-dham-yatra-9n-10d/', badge: 'Popular' },
            { icon: '🔱', label: 'Do Dham — Kedarnath & Badrinath', sub: '5N 6D · from ₹13,500', href: '/packages/do-dham-yatra-5n-6d/' },
            { icon: '⛺', label: 'Kedarnath Yatra', sub: '3N 4D · from ₹8,500', href: '/packages/kedarnath-yatra-3n-4d/' },
            { icon: '🛕', label: 'Badrinath Yatra', sub: '2N 3D · Mana Village · from ₹6,500', href: '/packages/badrinath-yatra-2n-3d/' },
            { icon: '🏔️', label: 'Yamunotri & Gangotri', sub: '4N 5D · 2 Dham · from ₹11,500', href: '/packages/yamunotri-gangotri-2-dham-4n-5d/' },
          ],
        },
        {
          heading: 'Spiritual & Pilgrim Tours',
          items: [
            { icon: '🪷', label: 'Braj Bhoomi Yatra', sub: 'Mathura · Vrindavan · Ayodhya · Varanasi · from ₹14,500', href: '/packages/braj-bhoomi-yatra-5n-6d/', badge: 'New' },
            { icon: '🌊', label: 'Haridwar & Rishikesh Spiritual', sub: 'Ganga Aarti · temples · yoga · from ₹7,500', href: '/packages/haridwar-rishikesh-spiritual-3n-4d/' },
            { icon: '🚁', label: 'Kedarnath by Helicopter', sub: 'Skip the trek · VVIP darshan · from ₹24,000', href: '/packages/kedarnath-helicopter-2n-3d/', badge: 'Premium' },
            { icon: '✨', label: 'Char Dham by Helicopter', sub: 'All 4 dhams · 7N 8D · from ₹65,000', href: '/packages/char-dham-helicopter-7n-8d/', badge: 'Luxury' },
            { icon: '📍', label: 'From Your City', sub: '20 departure cities — Mumbai, Bangalore & more', href: '/char-dham-from/' },
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
    href: '/packages/himalayan-treks/',
    mega: {
      columns: [
        {
          heading: 'Snow & Winter Treks',
          items: [
            { icon: '❄️', label: 'Kedarkantha Trek', sub: 'Dec–Apr · 3,810m summit · snow trails', href: '/packages/kedarkantha-trek-5n-6d/', badge: 'Bestseller' },
            { icon: '🏔️', label: 'Pangarchulla Peak', sub: 'Mar–May · 4,700m · summit climb', href: '/packages/pangarchulla-peak-5n-6d/' },
            { icon: '⛷️', label: 'Kuari Pass Trek', sub: "Feb–Jun · Lord Curzon's Trail · panoramic", href: '/packages/kuari-pass-trek-4n-5d/' },
          ],
        },
        {
          heading: 'Summer & Monsoon Treks',
          items: [
            { icon: '🌸', label: 'Valley of Flowers', sub: 'Jul–Sep · UNESCO · 500+ wildflowers', href: '/packages/valley-of-flowers-trek-4n-5d/', badge: 'UNESCO' },
            { icon: '🏕️', label: 'Har Ki Dun Trek', sub: 'Apr–Nov · Pandava route · 3,566m', href: '/packages/har-ki-dun-trek-5n-6d/' },
            { icon: '🌄', label: 'Chopta–Tungnath Trek', sub: "Year-round · world's highest Shiva temple", href: '/packages/chopta-tungnath-trek-3n-4d/' },
            { icon: '🗻', label: 'Roopkund Trek', sub: 'May–Oct · Mystery Lake · 5,029m', href: '/packages/roopkund-trek-7n-8d/' },
          ],
        },
      ],
      featured: {
        image: '/images/trek_snow_peak.jpg',
        badge: '❄️ Season Open',
        title: 'Kedarkantha Trek 2025',
        price: 'From ₹9,500 / person',
        href: '/packages/kedarkantha-trek-5n-6d/',
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
          heading: 'Adventure Activities',
          items: [
            { icon: '🚣', label: 'Adventure Pack — Rafting + Bungee', sub: '2N 3D · Grade III-IV · 83m bungee · from ₹5,500', href: '/packages/rishikesh-adventure-pack-2n-3d/', badge: 'Thrilling' },
            { icon: '🏕️', label: 'Weekend Escape', sub: '1N 2D · Rafting · camping · bonfire · from ₹2,500', href: '/packages/rishikesh-weekend-1n-2d/' },
            { icon: '🪂', label: 'Bungee Jumping', sub: '83m · India\'s highest · at Jumpin Heights', href: '/packages/rishikesh-adventure-pack-2n-3d/' },
          ],
        },
        {
          heading: 'Yoga & Wellness',
          items: [
            { icon: '🧘', label: 'Yoga Retreat 5N/6D', sub: 'Certified instructors · ashram stay · from ₹12,000', href: '/packages/rishikesh-yoga-retreat-5n-6d/', badge: 'Wellness' },
            { icon: '🌊', label: 'River Rafting', sub: 'Shivpuri 16km · Marine Drive 26km · Grade I–IV', href: '/packages/rishikesh-adventure-pack-2n-3d/' },
            { icon: '🛶', label: 'Kayaking & Cliff Jumping', sub: 'Beginner & expert · supervised · all gear', href: '/packages/rishikesh-adventure-pack-2n-3d/' },
          ],
        },
      ],
      featured: {
        image: '/images/rishikesh_bridge.jpg',
        badge: '🌊 Adventure Capital',
        title: 'Rishikesh Adventure Pack',
        price: 'From ₹5,500 / person',
        href: '/packages/rishikesh-adventure-pack-2n-3d/',
        waText: 'Namaste! I want to book Rishikesh adventure activities',
      },
    },
  },
  {
    label: 'Uttarakhand',
    href: '/packages/uttarakhand-tours/',
    mega: {
      columns: [
        {
          heading: 'Hill Stations & Leisure',
          items: [
            { icon: '🏔️', label: 'Mussoorie & Dehradun', sub: '3N 4D · Queen of Hills · Kempty Falls · from ₹8,500', href: '/packages/mussoorie-dehradun-3n-4d/' },
            { icon: '🏞️', label: 'Nainital & Jim Corbett', sub: '4N 5D · Naini Lake · tiger safari · from ₹11,000', href: '/packages/nainital-jim-corbett-4n-5d/' },
            { icon: '⛷️', label: 'Auli Snow Trip', sub: 'Dec–Feb · skiing · Asia\'s longest gondola · from ₹9,500', href: '/packages/auli-snow-trip-3n-4d/', badge: 'Winter' },
          ],
        },
        {
          heading: 'Weekend Getaways',
          items: [
            { icon: '⛺', label: 'Kanatal & Tehri Lake', sub: '2N 3D · water sports · cedar forests · from ₹6,500', href: '/packages/kanatal-tehri-weekend-2n-3d/' },
            { icon: '🌿', label: 'Chopta & Deoria Tal', sub: '2N 3D · reflective lake · Tungnath temple · from ₹6,000', href: '/packages/chopta-deoria-tal-2n-3d/' },
            { icon: '🐘', label: 'Lansdowne & Corbett Safari', sub: '3N 4D · colonial hill town · wildlife · from ₹9,000', href: '/packages/lansdowne-corbett-safari-3n-4d/' },
          ],
        },
      ],
      featured: {
        image: '/images/mountains1.jpg',
        badge: '🌿 Uttarakhand',
        title: 'Nainital & Jim Corbett 4N/5D',
        price: 'From ₹11,000 / person',
        href: '/packages/nainital-jim-corbett-4n-5d/',
        waText: 'Namaste! I want to enquire about Nainital Jim Corbett package',
      },
    },
  },
  {
    label: 'Heritage',
    href: '/packages/golden-triangle/',
    mega: {
      columns: [
        {
          heading: 'Heritage Tours',
          items: [
            { icon: '🏛️', label: 'Golden Triangle 5N/6D', sub: 'Delhi · Agra · Jaipur · from ₹18,500', href: '/packages/golden-triangle-tour-5n-6d/', badge: 'Classic' },
            { icon: '🏰', label: 'Rajasthan Tour 6N/7D', sub: 'Jaipur · Jodhpur · Jaisalmer · from ₹21,000', href: '/packages/rajasthan-tour-6n-7d/', badge: 'New' },
            { icon: '🐯', label: 'Golden Triangle + Ranthambore', sub: '7N 8D · Taj + tiger · from ₹24,500', href: '/packages/golden-triangle-ranthambore-7n-8d/' },
          ],
        },
        {
          heading: 'Spiritual Heritage',
          items: [
            { icon: '🕌', label: 'Taj Mahal Day Tour', sub: 'From Delhi · sunrise slot · from ₹6,500', href: '/packages/taj-mahal-day-tour-from-delhi/' },
            { icon: '🪔', label: 'Varanasi & Prayagraj', sub: '3N 4D · Ganga Aarti · ghats · Sangam · from ₹9,500', href: '/packages/varanasi-prayagraj-spiritual-3n-4d/' },
            { icon: '🌸', label: 'Braj Bhoomi Yatra', sub: 'Mathura · Vrindavan · Ayodhya · Varanasi', href: '/packages/braj-bhoomi-yatra-5n-6d/' },
          ],
        },
      ],
      featured: {
        image: '/images/temple_entrance.jpg',
        badge: '🏆 Heritage India',
        title: 'Rajasthan Tour 6N / 7D',
        price: 'From ₹21,000 / person',
        href: '/packages/rajasthan-tour-6n-7d/',
        waText: 'Namaste! I want to enquire about Rajasthan tour package',
      },
    },
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
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
              <a href="tel:+919873897652" className="nav-phone">📞 +91 98738 97652</a>
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
              <WaLink href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20enquire%20about%20a%20tour%20package"
                className="mob-wa" target="_blank" rel="noopener noreferrer"
                label="mobile_drawer"
                onClick={closeAll}>
                WhatsApp Us
              </WaLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
