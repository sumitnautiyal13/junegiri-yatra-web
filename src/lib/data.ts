import type { Package, Hub, City } from '@/types';
import packagesData from '../../data/packages.json';
import hubsData from '../../data/hubs.json';
import citiesData from '../../data/cities.json';
import intlCitiesData from '../../data/international-cities.json';
import intlPackagesData from '../../data/international-packages.json';

/**
 * The advertised "from" price must be a rate a customer can actually book.
 *
 * `price_from` was hand-maintained separately from `pricing_tiers`, and the two
 * had drifted apart on 22 of 53 packages — by as much as +160% and -74%. The
 * visible "From ₹X" on a package page comes from the cheapest pricing tier,
 * while schema Offer.price came from `price_from`, so structured data was
 * advertising prices nobody could book: ₹4,000 for a ₹9,500 Kedarkantha trek,
 * ₹2,50,000 for a ₹65,000 Char Dham helicopter package.
 *
 * Google requires structured data to match visible content, and a searcher
 * seeing the wrong price in a rich result is misled either way. Deriving the
 * value here means the two can never drift again — edit the tiers and every
 * consumer (schema, titles, cards, WhatsApp messages) follows automatically.
 */
function lowestBookableRate(p: Package): number | undefined {
  // Escape hatch for packages whose pricing_tiers are known to be wrong rather
  // than merely stale. char-dham-helicopter-7n-8d carries tiers of
  // ₹65,000–₹1,40,000 that do not describe this product at all — the real rate
  // is ₹2,50,000 per person, confirmed by the operator. Deriving from those
  // tiers would have advertised a price a quarter of the true one.
  if ((p as { price_from_authoritative?: boolean }).price_from_authoritative) return undefined;

  const rates = (p.pricing_tiers ?? [])
    .flatMap((t) => Object.values(t?.rates ?? {}))
    .filter((r): r is number => typeof r === 'number' && r > 0);
  return rates.length ? Math.min(...rates) : undefined;
}

function withBookablePrice(p: Package): Package {
  const lowest = lowestBookableRate(p);
  return lowest !== undefined && lowest !== p.price_from ? { ...p, price_from: lowest } : p;
}

export function getAllPackages(): Package[] {
  return (packagesData as Package[]).map(withBookablePrice);
}

export function getPackageBySlug(slug: string): Package | undefined {
  const p = (packagesData as Package[]).find((x) => x.slug === slug);
  return p ? withBookablePrice(p) : undefined;
}

/** For modules that import packages.json directly (sitemap, listing pages). */
export function normalisePackagePrices(list: Package[]): Package[] {
  return list.map(withBookablePrice);
}

export function getAllHubs(): Hub[] {
  return hubsData as Hub[];
}

export function getHubBySlug(slug: string): Hub | undefined {
  return (hubsData as Hub[]).find((h) => h.slug === slug);
}

export function getAllPackageSlugs(): string[] {
  return (packagesData as Package[]).map((p) => p.slug);
}

export function getAllHubSlugs(): string[] {
  return (hubsData as Hub[]).map((h) => h.slug);
}

export function getAllCities(): City[] {
  return citiesData as City[];
}

export function getCityBySlug(slug: string): City | undefined {
  return (citiesData as City[]).find((c) => c.slug === slug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllIntlCities(): any[] {
  return intlCitiesData as any[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIntlCityBySlug(slug: string): any | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (intlCitiesData as any[]).find((c: any) => c.slug === slug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAllIntlPackages(): any[] {
  return intlPackagesData as any[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getIntlPackageBySlug(slug: string): any | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (intlPackagesData as any[]).find((p: any) => p.slug === slug);
}

/**
 * Best-time guides carry their own `package_price`, hand-entered separately from
 * the package it links to. 15 of 25 had drifted — the Kedarkantha guide quoted
 * ₹12,500 against a ₹9,500 package, Char Dham ₹28,500 against ₹19,800.
 * Deriving it from the linked package keeps one number in one place.
 */
export function withGuidePrice<T extends { package_slug?: string; package_price?: number }>(guide: T): T {
  if (!guide.package_slug) return guide;
  const pkg = getPackageBySlug(guide.package_slug);
  const price = pkg?.price_from;
  return price !== undefined && price !== guide.package_price ? { ...guide, package_price: price } : guide;
}

/**
 * Formatted "from" price for use in titles and meta descriptions, e.g. "₹9,500".
 * Reads the normalised package price so SERP copy can never quote a rate that
 * differs from the page or the schema — 7 of 19 destination routes had drifted,
 * including Char Dham helicopter advertising ₹2,50,000 against a real ₹65,000.
 */
export function packagePriceLabel(slug: string): string | undefined {
  const price = getPackageBySlug(slug)?.price_from;
  return price === undefined ? undefined : `₹${price.toLocaleString('en-IN')}`;
}
