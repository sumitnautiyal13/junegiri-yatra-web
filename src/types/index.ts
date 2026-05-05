export interface PricingTier {
  group_size: string;
  rates: Record<string, number>;
}

export interface ItineraryDay {
  title: string;
  meta: string;
  desc: string;
  highlights: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  loc: string;
}

export interface RelatedPackage {
  name: string;
  duration: string;
  price: number;
  intl_price_usd?: number;
  image: string;
  url: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface Package {
  slug: string;
  url: string;
  name: string;
  title: string;
  meta_description: string;
  keywords: string;
  h1: string;
  hero_tagline: string;
  hero_image: string;
  tag?: string;
  duration: string;
  destinations_short: string;
  departure: string;
  difficulty: string;
  transport?: string;
  price_from: number;
  intl_price_usd?: number;
  wa_text: string;
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  pricing_tiers: PricingTier[];
  gallery: string[];
  testimonials: Testimonial[];
  faq: FAQ[];
  related: RelatedPackage[];
  breadcrumbs?: Breadcrumb[];
}

export interface HubPackageCard {
  name: string;
  duration: string;
  price: number;
  intl_price_usd?: number;
  tag?: string;
  image: string;
  route: string;
  url: string;
  wa_text?: string;
  from_city?: string;
}

export interface ComparisonCell {
  text?: string;
  is_price?: boolean;
  value?: number;
  usd?: number;
  is_link?: boolean;
  url?: string;
}

export interface Hub {
  slug: string;
  url: string;
  name: string;
  title: string;
  meta_description: string;
  keywords: string;
  h1: string;
  hero_tagline: string;
  hero_image: string;
  stats?: { num: string; lbl: string }[];
  grid_title?: string;
  grid_subtitle?: string;
  packages: HubPackageCard[];
  content_title?: string;
  content?: string;
  comparison_headers?: string[];
  comparison_rows?: ComparisonCell[][];
  faq?: FAQ[];
}

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD' | 'AED' | 'SGD';

export interface ExchangeRates {
  [key: string]: number;
}
