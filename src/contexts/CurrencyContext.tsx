'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Currency } from '@/types';
import { detectCurrencyFromLocale, COUNTRY_TO_CURRENCY, PRICING_TIERS, type GeoTier } from '@/lib/currency';

export interface GeoState {
  countryCode: string;
  countryName: string;
  city: string;
  flag: string;
  tier: GeoTier;
  isLoading: boolean;
}

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  geo: GeoState;
}

const DEFAULT_GEO: GeoState = {
  countryCode: 'IN',
  countryName: 'India',
  city: '',
  flag: '🇮🇳',
  tier: 'india',
  isLoading: true,
};

const COUNTRY_FLAGS: Record<string, string> = {
  IN:'🇮🇳', US:'🇺🇸', GB:'🇬🇧', AE:'🇦🇪', SA:'🇸🇦', CA:'🇨🇦', AU:'🇦🇺',
  DE:'🇩🇪', FR:'🇫🇷', IT:'🇮🇹', SG:'🇸🇬', MY:'🇲🇾', NZ:'🇳🇿', CH:'🇨🇭',
  AT:'🇦🇹', BE:'🇧🇪', NL:'🇳🇱', SE:'🇸🇪', NO:'🇳🇴', DK:'🇩🇰', FI:'🇫🇮',
  IE:'🇮🇪', PT:'🇵🇹', PL:'🇵🇱', BH:'🇧🇭', KW:'🇰🇼', OM:'🇴🇲', QA:'🇶🇦',
  TH:'🇹🇭', ID:'🇮🇩', PH:'🇵🇭', VN:'🇻🇳', JP:'🇯🇵', KR:'🇰🇷', CN:'🇨🇳',
};

/** Read ?geo=US from URL for testing — dev-only shortcut */
function getTestCountry(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('geo');
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'INR',
  setCurrency: () => {},
  geo: { ...DEFAULT_GEO, isLoading: false },
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [geo, setGeo] = useState<GeoState>(DEFAULT_GEO);

  useEffect(() => {
    async function init() {
      // 1. Restore user preference from localStorage
      const saved = localStorage.getItem('jy_currency') as Currency | null;
      const validCurrencies: Currency[] = ['INR','USD','GBP','EUR','AUD','CAD','AED','SGD'];
      if (saved && validCurrencies.includes(saved)) {
        setCurrencyState(saved);
      }

      // 2. Test override via ?geo= param (e.g. ?geo=US, ?geo=AE)
      const testCode = getTestCountry();
      if (testCode) {
        const code = testCode.toUpperCase();
        const tier = (PRICING_TIERS[code] ?? 'other') as GeoTier;
        const curr = COUNTRY_TO_CURRENCY[code] ?? 'USD';
        if (!saved) setCurrencyState(curr as Currency);
        setGeo({
          countryCode: code,
          countryName: `[Test] ${code}`,
          city: 'Test City',
          flag: COUNTRY_FLAGS[code] ?? '🌐',
          tier,
          isLoading: false,
        });
        return;
      }

      // 3. IP-based detection via Vercel edge geo. The result is cached in
      //    localStorage so /api/geo is hit once per visitor (not on every page
      //    load) — keeps serverless-function / edge-request usage and cost low.
      const GEO_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

      const applyGeo = (code: string, city: string) => {
        const tier = (PRICING_TIERS[code] ?? 'other') as GeoTier;
        if (!saved) {
          setCurrencyState((COUNTRY_TO_CURRENCY[code] ?? 'USD') as Currency);
        }
        let countryName = code;
        try {
          countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
        } catch {
          /* Intl unavailable — fall back to the country code */
        }
        setGeo({
          countryCode: code,
          countryName,
          city,
          flag: COUNTRY_FLAGS[code] ?? '🌐',
          tier,
          isLoading: false,
        });
      };

      // 3a. Reuse a fresh cached lookup — skips the network call entirely.
      try {
        const cached = localStorage.getItem('jy_geo');
        if (cached) {
          const g = JSON.parse(cached) as { code: string; city: string; ts: number };
          if (g.code && Date.now() - g.ts < GEO_TTL) {
            applyGeo(g.code, g.city || '');
            return;
          }
        }
      } catch {
        /* malformed cache — fall through to a fresh lookup */
      }

      // 3b. Otherwise look it up once via the edge, then cache it.
      try {
        const res = await fetch('/api/geo/', {
          signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) throw new Error('geo failed');
        const data = await res.json();
        const code: string = (data.country ?? 'IN').toUpperCase();
        const city: string = data.city ?? '';
        try {
          localStorage.setItem('jy_geo', JSON.stringify({ code, city, ts: Date.now() }));
        } catch {
          /* storage blocked/full — non-fatal */
        }
        applyGeo(code, city);
      } catch {
        // Fallback to browser locale
        if (!saved) {
          const detected = detectCurrencyFromLocale(navigator.language || 'en-IN');
          setCurrencyState(detected);
        }
        setGeo({ ...DEFAULT_GEO, isLoading: false });
      }
    }

    init();
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('jy_currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, geo }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
