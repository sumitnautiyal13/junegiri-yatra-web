import type { Currency, ExchangeRates } from '@/types';

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
 * Convert INR price to target currency.
 * Uses international USD rack rate (intl_price_usd) for foreign visitors
 * to correctly price packages at international market rates (not just forex conversion).
 */
export function convertPrice(
  inrPrice: number,
  currency: Currency,
  usdIntlPrice?: number
): number {
  if (currency === 'INR') return inrPrice;

  const rate = EXCHANGE_RATES[currency];
  if (!rate) return inrPrice;

  const usdRate = EXCHANGE_RATES['USD'];
  let converted: number;

  if (usdIntlPrice && usdIntlPrice > 0) {
    // Cross-rate: international USD price → target currency
    converted = currency === 'USD'
      ? usdIntlPrice
      : usdIntlPrice * (rate / usdRate);
  } else {
    // Fallback: market exchange rate
    converted = inrPrice * rate;
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
  usdIntlPrice?: number
): string {
  const converted = convertPrice(inrPrice, currency, usdIntlPrice);
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
