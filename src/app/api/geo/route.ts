import { NextResponse } from 'next/server';

// Always run per-request so Vercel's edge geolocation headers are present.
export const dynamic = 'force-dynamic';

/**
 * Returns the visitor's country/city from Vercel's edge geo headers.
 * Reliable (no third-party API, no rate limits) and same-origin, so it
 * isn't blocked by privacy extensions the way external geo APIs are.
 * In non-Vercel/local contexts the headers are absent → null (caller
 * falls back to INR).
 */
export function GET(request: Request) {
  const h = request.headers;
  const country = (h.get('x-vercel-ip-country') ?? '').toUpperCase();
  const cityRaw = h.get('x-vercel-ip-city') ?? '';
  let city = '';
  try {
    city = decodeURIComponent(cityRaw);
  } catch {
    city = cityRaw;
  }
  return NextResponse.json(
    { country: country || null, city: city || null },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
