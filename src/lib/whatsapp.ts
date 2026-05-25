import type { GeoState } from '@/contexts/CurrencyContext';
import type { Currency } from '@/types';
import { CURRENCY_SYMBOLS } from '@/lib/currency';

const WA_NUMBER = '919873897652'; // +91 98738 97652 — no spaces or +

export interface WAMessageOptions {
  packageName: string;
  duration: string;
  priceFormatted: string;    // e.g. "$525" or "₹19,800"
  currency: Currency;
  geo: GeoState;
  cityName?: string;         // "New York"
  trekName?: string;         // for trek pages
  month?: string;            // "May 2026" if selected
}

/** Build a pre-filled WhatsApp message with geo context + price */
export function buildWAMessage(opts: WAMessageOptions): string {
  const { packageName, duration, priceFormatted, currency, geo, cityName, trekName, month } = opts;

  const isIndia = geo.tier === 'india';

  const locationLine = cityName
    ? `📍 My location: *${cityName}${geo.city && geo.city !== cityName ? `, ${geo.city}` : ''}, ${geo.countryName}* ${geo.flag}`
    : `📍 My location: *${geo.countryName}* ${geo.flag}`;

  const priceLine = `💰 Price shown: *${priceFormatted} per person*${!isIndia ? ` (${currency}, approx)` : ''}`;

  const packageLine = trekName
    ? `🏔️ Package: *${trekName} — ${packageName}*`
    : `🛕 Package: *${packageName}*`;

  const durationLine = `📅 Duration: *${duration}*`;

  const monthLine = month ? `🗓️ Preferred month: *${month}*` : '';

  const questions = isIndia
    ? `Please share:\n• Detailed itinerary\n• Availability & group size\n• What's included / excluded\n• Customisation options`
    : `Please share:\n• Detailed itinerary PDF\n• Availability for ${month ?? 'my preferred dates'}\n• Final price confirmation\n• What's included / excluded\n• International payment options (wire transfer / PayPal)`;

  const lines = [
    `Hi Junegiri Yatra Team! 🙏`,
    ``,
    packageLine,
    durationLine,
    locationLine,
    priceLine,
    ...(monthLine ? [monthLine] : []),
    ``,
    questions,
    ``,
    `Thank you!`,
  ];

  return lines.join('\n');
}

/** Return a wa.me deep-link URL with the message pre-encoded */
export function buildWALink(opts: WAMessageOptions): string {
  const msg = buildWAMessage(opts);
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/** Legacy helper — plain text WA link (keeps old pages working) */
export function waLinkSimple(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

void CURRENCY_SYMBOLS; // keep import alive
