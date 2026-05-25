import type { Currency, ExchangeRates } from '@/types';

// ─── Geo Pricing Tiers ───────────────────────────────────────────────────────

export type GeoTier = 'india' | 'gulf' | 'west' | 'sea' | 'other';

/** Markup multiplier on top of INR base price per tier */
export const TIER_MARKUP: Record<GeoTier, number> = {
  india: 1.00,
  gulf:  1.35,   // UAE, Saudi, Bahrain, Kuwait, Oman, Qatar
  west:  1.25,   // US, CA, GB, EU, AU, NZ
  sea:   1.15,   // SG, MY, TH, ID, PH, VN
  other: 1.20,
};

/** Country code → pricing tier */
export const PRICING_TIERS: Record<string, GeoTier> = {
  IN: 'india',
  AE: 'gulf', SA: 'gulf', BH: 'gulf', KW: 'gulf', OM: 'gulf', QA: 'gulf',
  US: 'west',  CA: 'west', GB: 'west', AU: 'west', NZ: 'west',
  DE: 'west',  FR: 'west', IT: 'west', ES: 'west', NL: 'west',
  SE: 'west',  NO: 'west', DK: 'west', FI: 'west', BE: 'west',
  AT: 'west',  CH: 'west', PT: 'west', IE: 'west', PL: 'west',
  CZ: 'west',  GR: 'west', HU: 'west', HR: 'west', RO: 'west',
  SG: 'sea',   MY: 'sea',  TH: 'sea',  ID: 'sea',  PH: 'sea',
  VN: 'sea',   KH: 'sea',  LA: 'sea',  MM: 'sea',
};

/** Country code → preferred display currency */
export const COUNTRY_TO_CURRENCY: Record<string, Currency> = {
  IN: 'INR',
  AE: 'AED', SA: 'AED', BH: 'AED', KW: 'AED', OM: 'AED', QA: 'AED',
  US: 'USD', CA: 'CAD', GB: 'GBP',
  AU: 'AUD', NZ: 'AUD',
  SG: 'SGD', MY: 'SGD',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR',
  SE: 'EUR', NO: 'EUR', DK: 'EUR', FI: 'EUR', BE: 'EUR',
  AT: 'EUR', CH: 'EUR', PT: 'EUR', IE: 'EUR', PL: 'EUR',
  CZ: 'EUR', GR: 'EUR', HU: 'EUR', HR: 'EUR', RO: 'EUR',
};

/**
 * Apply regional markup to INR base price before currency conversion.
 * Gulf visitors pay 35% more, Western 25% more, etc.
 */
export function applyTierMarkup(inrPrice: number, tier: GeoTier): number {
  return Math.round(inrPrice * TIER_MARKUP[tier]);
}

export const EXCHANGE_RATES: ExchangeRates = {
  INR: 1.0,
  USD: 0.0105,
  GBP: 0.0083,
  EUR: 0.0096,
  AUD: 0.0162,
  CAD: 0.0144,
  AED: 0.0385,
  SGD: 0.0142,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  CAD: 'C$',
  AED: 'AED ',
  SGD: 'S$',
};

export const CURRENCY_LABELS: Record<Currency, string> = {
  INR: 'INR ₹',
  USD: 'USD $',
  GBP: 'GBP £',
  EUR: 'EUR €',
  AUD: 'AUD A$',
  CAD: 'CAD C$',
  AED: 'AED د.إ',
  SGD: 'SGD S$',
};

/**
 * Detect default currency from browser locale.
 * Returns 'INR' as fallback (server-safe, client must hydrate).
 */
export function detectCurrencyFromLocale(locale: string): Currency {
  const lang = locale.toLowerCase();
  const map: Record<string, Currency> = {
    us: 'USD', gb: 'GBP', uk: 'GBP', au: 'AUD', ca: 'CAD',
    sg: 'SGD', ae: 'AED', de: 'EUR', fr: 'EUR', es: 'EUR',
    it: 'EUR', nl: 'EUR', at: 'EUR', ie: 'EUR', pt: 'EUR',
    ch: 'EUR', be: 'EUR', nz: 'AUD',
  };
  for (const [code, currency] of Object.entries(map)) {
    if (lang.includes(`-${code}`) || lang === code) return currency;
  }
  return 'INR';
}

/**
 * Convert INR price to target currency, with optional geo tier markup.
 * Gulf visitors see 35% higher prices, Western 25%, SEA 15%.
 * Uses intl_price_usd as the USD anchor when available.
 */
export function convertPrice(
  inrPrice: number,
  currency: Currency,
  usdIntlPrice?: number,
  tier?: GeoTier,
): number {
  // Apply regional markup to base INR price first
  const markedUp = tier ? applyTierMarkup(inrPrice, tier) : inrPrice;

  if (currency === 'INR') return markedUp;

  const rate = EXCHANGE_RATES[currency];
  if (!rate) return markedUp;

  const usdRate = EXCHANGE_RATES['USD'];
  let converted: number;

  if (usdIntlPrice && usdIntlPrice > 0 && tier) {
    // Anchor to USD intl price, apply tier markup, cross-rate to target currency
    const usdMarked = usdIntlPrice * TIER_MARKUP[tier];
    converted = currency === 'USD' ? usdMarked : usdMarked * (rate / usdRate);
  } else if (usdIntlPrice && usdIntlPrice > 0) {
    // Legacy: use intl_price_usd without tier
    converted = currency === 'USD'
      ? usdIntlPrice
      : usdIntlPrice * (rate / usdRate);
  } else {
    converted = markedUp * rate;
  }

  // Round to clean numbers
  if (converted >= 10000) return Math.round(converted / 100) * 100;
  if (converted >= 1000) return Math.round(converted / 10) * 10;
  if (converted >= 100) return Math.round(converted / 5) * 5;
  return Math.round(converted);
}

export function formatPrice(
  inrPrice: number,
  currency: Currency,
  usdIntlPrice?: number,
  tier?: GeoTier,
): string {
  const converted = convertPrice(inrPrice, currency, usdIntlPrice, tier);
  const symbol = CURRENCY_SYMBOLS[currency] || '';

  if (currency === 'INR') {
    return '₹' + formatINR(converted);
  }
  return symbol + converted.toLocaleString('en-US');
}

export function formatINR(num: number): string {
  const n = Math.round(num);
  const s = String(n);
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  let rest = s.slice(0, -3);
  const chunks: string[] = [];
  while (rest.length > 2) {
    chunks.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) chunks.unshift(rest);
  return chunks.join(',') + ',' + last3;
}
