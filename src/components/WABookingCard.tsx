'use client';

/**
 * WABookingCard
 * Geo-aware price display + pre-filled WhatsApp CTA.
 * Reads currency & geo from CurrencyContext (IP-detected automatically).
 * Test any region with ?geo=US, ?geo=AE, ?geo=GB etc.
 */

import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';
import { buildWALink } from '@/lib/whatsapp';
import type { Package } from '@/types';

interface WABookingCardProps {
  pkg: Package;
  /** City page context — "New York", "Dubai" etc. */
  cityName?: string;
  /** Trek page context — "Kedarkantha Trek" */
  trekName?: string;
  /** Selected month — "May 2026" */
  month?: string;
  /** 'card' = full sidebar card, 'strip' = inline CTA bar */
  variant?: 'card' | 'strip';
}

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function WABookingCard({
  pkg,
  cityName,
  trekName,
  month,
  variant = 'card',
}: WABookingCardProps) {
  const { currency, geo } = useCurrency();

  const priceFormatted = geo.isLoading
    ? '...'
    : formatPrice(pkg.price_from, currency, pkg.intl_price_usd, geo.tier);

  const waHref = geo.isLoading
    ? '#'
    : buildWALink({
        packageName: pkg.name,
        duration: pkg.duration,
        priceFormatted,
        currency,
        geo,
        cityName,
        trekName,
        month,
      });

  const isIndia = geo.tier === 'india';
  const btnLabel = isIndia ? 'Get Free Quote on WhatsApp' : 'WhatsApp for Custom Quote';

  /* ── Strip variant ── */
  if (variant === 'strip') {
    return (
      <div style={{
        background: 'linear-gradient(135deg,#1B5E20 0%,#2E7D32 100%)',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div>
          <div style={{ color: '#A5D6A7', fontSize: 12, marginBottom: 2 }}>
            {geo.isLoading
              ? 'Detecting your location…'
              : `Estimated price for ${geo.flag} ${geo.countryName} visitors`}
          </div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>
            {priceFormatted}
            <span style={{ fontSize: 13, fontWeight: 400, marginLeft: 6 }}>/ person</span>
          </div>
          {!isIndia && !geo.isLoading && (
            <div style={{ color: '#C8E6C9', fontSize: 11, marginTop: 2 }}>
              Includes {Math.round((geo.tier === 'gulf' ? 35 : geo.tier === 'sea' ? 15 : 25))}% NRI service markup · final price confirmed on WhatsApp
            </div>
          )}
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366', color: '#fff', padding: '12px 22px',
            borderRadius: 8, fontWeight: 700, fontSize: 15,
            textDecoration: 'none',
            opacity: geo.isLoading ? 0.6 : 1,
            pointerEvents: geo.isLoading ? 'none' : 'auto',
          }}
        >
          {WA_ICON}
          WhatsApp Us
        </a>
      </div>
    );
  }

  /* ── Card variant (default) ── */
  return (
    <div style={{
      background: '#fff',
      border: '2px solid #c8a84b',
      borderRadius: 12,
      padding: 24,
      boxShadow: '0 4px 24px rgba(200,168,75,0.12)',
    }}>
      {/* Geo badge for non-India visitors */}
      {!geo.isLoading && !isIndia && (
        <div style={{
          background: '#FFF8E1', border: '1px solid #FFD54F',
          borderRadius: 6, padding: '6px 12px', fontSize: 12,
          color: '#856404', marginBottom: 16,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {geo.flag} Price shown in {currency} for {geo.countryName} visitors
        </div>
      )}

      {/* Price */}
      <div style={{ color: '#666', fontSize: 13, marginBottom: 4 }}>Starting from</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ color: '#c8a84b', fontSize: 32, fontWeight: 800 }}>
          {priceFormatted}
        </span>
        <span style={{ color: '#666', fontSize: 14 }}>/ person</span>
      </div>

      {/* INR reference for non-India */}
      {!geo.isLoading && !isIndia && (
        <div style={{ color: '#999', fontSize: 12, marginBottom: 16 }}>
          ≈ ₹{pkg.price_from.toLocaleString('en-IN')} base · {currency} conversion at current rates
        </div>
      )}

      {/* WA Button */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: geo.isLoading ? '#ccc' : '#25D366',
          color: '#fff', borderRadius: 8, padding: '14px 20px',
          fontWeight: 700, fontSize: 16, textDecoration: 'none', width: '100%',
          boxSizing: 'border-box',
          cursor: geo.isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {WA_ICON}
        {btnLabel}
      </a>

      {/* Trust note */}
      {!geo.isLoading && !isIndia && (
        <p style={{ fontSize: 11, color: '#888', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
          Price is approximate. Final amount confirmed on WhatsApp.
          Wire transfer &amp; PayPal accepted.
        </p>
      )}
    </div>
  );
}
