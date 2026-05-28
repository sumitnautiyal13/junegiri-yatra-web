'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';

export interface IntlCity {
  slug: string;
  name: string;
  country: string;
  country_slug: string;
  nationality: string;
  flag: string;
  continent: string;
  nearest_airport: string;
  airport_code: string;
  flight_hours_to_delhi: number;
  direct_flights: boolean;
  airlines: string[];
  ist_offset: string;
  currency_code: string;
  currency_symbol: string;
  usd_to_local: number;
  visa_type: string;
  visa_processing_days: number;
  visa_cost_usd: number;
  best_travel_months: string[];
  avoid_months: string[];
  peak_booking_months: string[];
  popular_package_slugs: string[];
  travel_note: string;
  typical_holiday_days: number;
  search_volume_index: number;
}

export interface IntlPackage {
  slug: string;
  name: string;
  duration: string;
  intl_price_usd: number;
  difficulty: string;
  tag?: string;
  hero_image: string;
  destinations_short: string;
  hero_tagline: string;
}

interface Props {
  city: IntlCity;
  packages: IntlPackage[];
}

const WA_NUMBER = '919873897652';

function buildWaLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-600',
  Moderate: 'bg-amber-500',
  Challenging: 'bg-orange-600',
  Hard: 'bg-red-600',
};

export default function IntlCityPage({ city, packages }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroWaText = `Hello! I'm from ${city.name} and interested in India trek packages. Please share details and available dates.`;
  const heroWaLink = buildWaLink(heroWaText);

  const localPrice = (usdPrice: number) => Math.round(usdPrice * city.usd_to_local);

  // FAQ data
  const faqs = [
    {
      q: `Can I fly direct from ${city.name} to India?`,
      a: city.direct_flights
        ? `Yes! There are direct flights from ${city.nearest_airport} (${city.airport_code}) to Delhi (DEL). Flight time is approximately ${city.flight_hours_to_delhi} hours. Airlines include ${city.airlines.join(', ')}.`
        : `${city.name} doesn't have direct flights to India, but connecting options via major hubs are available. Total journey from ${city.nearest_airport} (${city.airport_code}) to Delhi is approximately ${city.flight_hours_to_delhi} hours. Airlines like ${city.airlines.join(', ')} operate these routes.`,
    },
    {
      q: `What is the visa process for ${city.nationality} citizens?`,
      a: `${city.nationality} passport holders can apply for an ${city.visa_type} for India. Processing typically takes ${city.visa_processing_days} business days and costs approximately $${city.visa_cost_usd} USD. We recommend applying at least 2 weeks before travel. We'll guide you through the entire application process — just WhatsApp us.`,
    },
    {
      q: `What are the best months to visit India from ${city.name}?`,
      a: `The best months to travel from ${city.name} to the Indian Himalayas are ${city.best_travel_months.join(', ')}. These months offer ideal trekking conditions with clear skies and accessible trails. We recommend avoiding ${city.avoid_months.join(', ')} due to monsoon/peak summer conditions. ${city.travel_note}`,
    },
    {
      q: `How do I pay for the package in ${city.currency_code}?`,
      a: `All our international packages are priced in USD for simplicity. The approximate equivalent in ${city.currency_code} is shown alongside USD prices (at current exchange rates). We accept bank transfers, PayPal, Wise, and major debit/credit cards. A 30% deposit confirms your booking, with the balance due 2 weeks before departure. ${city.currency_symbol}1 ≈ $${(1 / city.usd_to_local).toFixed(2)} USD at current rates.`,
    },
    {
      q: `Is it safe for solo travelers from ${city.country}?`,
      a: `Absolutely. We operate exclusively private group tours — no shared transport with strangers. Your package includes a dedicated English-speaking ITMB-certified Himalayan guide, private SUV transfers, and 24/7 WhatsApp support from our Haridwar base. Our team has guided travelers from ${city.country} since 2017. We handle all on-ground logistics so you can focus on the experience.`,
    },
  ];

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: `India Trek Packages from ${city.name}`,
        description: `Premium Himalayan trek packages for travelers from ${city.name}, ${city.country}. ${city.flight_hours_to_delhi}h flight to Delhi. ${city.visa_type} for ${city.nationality} citizens. From $820/person.`,
        touristType: 'Adventure travelers',
        provider: {
          '@type': 'TravelAgency',
          name: 'Junegiri Yatra',
          url: 'https://junegiriyatra.com',
          telephone: `+${WA_NUMBER}`,
        },
        offers: {
          '@type': 'Offer',
          price: '820',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
          { '@type': 'ListItem', position: 2, name: 'International Packages', item: 'https://junegiriyatra.com/international/' },
          { '@type': 'ListItem', position: 3, name: `From ${city.name}`, item: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="text-slate-600">›</span>
            <Link href="/international/" className="hover:text-amber-400 transition-colors">International Packages</Link>
            <span className="text-slate-600">›</span>
            <span className="text-slate-300">From {city.name}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-center bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        <Image
          src="/images/trek_himalaya.webp"
          alt={`India trek packages from ${city.name}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-6">
              <span>{city.flag}</span>
              <span>{city.name}, {city.country}</span>
              <span className="text-slate-500">·</span>
              <span>{city.flight_hours_to_delhi}h to Delhi</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              India Trek Packages<br />
              <span className="text-amber-400">from {city.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              {city.flight_hours_to_delhi}h flight to Delhi · {city.visa_type} for {city.nationality} citizens · Private guide &amp; transport · From <strong className="text-amber-400">$820/person</strong>
            </p>
            <div className="flex flex-wrap gap-4">
              <WaLink
                href={heroWaLink}
                label={`intl_city_hero_${city.slug}`}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-4 rounded-xl text-base transition-colors"
              >
                📲 WhatsApp Us from {city.name}
              </WaLink>
              <a
                href="#packages"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-4 rounded-xl text-base transition-colors"
              >
                Explore Packages ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS BAR ───────────────────────────────────────────── */}
      <section className="bg-slate-800 border-y border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm md:text-base">
            <span className="text-slate-300">
              ✈️ <strong className="text-white">{city.flight_hours_to_delhi}h</strong> flight to Delhi
            </span>
            <span className="text-slate-500 hidden md:block">|</span>
            <span className="text-slate-300">
              🛂 <strong className="text-white">{city.visa_type}</strong>
            </span>
            <span className="text-slate-500 hidden md:block">|</span>
            <span className="text-slate-300">
              📅 Best: <strong className="text-white">{city.best_travel_months.slice(0, 3).join(', ')}</strong>
            </span>
            <span className="text-slate-500 hidden md:block">|</span>
            <span className="text-slate-300">
              💰 From <strong className="text-amber-400">$820</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ── GETTING THERE ─────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Getting There from {city.name}
          </h2>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Departure Airport</div>
                <div className="text-white font-semibold">{city.nearest_airport}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Flight Time to Delhi</div>
                <div className="text-white font-semibold">{city.flight_hours_to_delhi} hours</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Flight Type</div>
                <div className="text-white font-semibold">
                  {city.direct_flights ? (
                    <span className="text-green-400">✓ Direct flights available</span>
                  ) : (
                    <span className="text-amber-400">1 stop via hub city</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Airlines</div>
                <div className="text-white font-semibold">{city.airlines.join(', ')}</div>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-amber-300 text-sm">
                💡 <strong>Travel tip:</strong> {city.travel_note} We arrange private airport transfer from Delhi (DEL) to Haridwar/Rishikesh — your trek starting point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISA INFO ─────────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Visa for {city.nationality} Citizens
          </h2>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">{city.visa_type}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">Visa Type</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">{city.visa_processing_days} days</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">${city.visa_cost_usd}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest">Application Fee</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              As a {city.nationality} citizen, you qualify for the India {city.visa_type}. Apply online at least {city.visa_processing_days + 5} days before travel. We&apos;ll guide you through the process.
            </p>
            <a
              href="https://indianvisaonline.gov.in/evisa/tvoa.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
            >
              Apply for India e-Visa →
            </a>
          </div>
        </div>
      </section>

      {/* ── BEST TIME ─────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Best Time to Visit from {city.name}
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl">
            Plan your Himalayan adventure around these optimal travel windows. Peak booking months from {city.name} are {city.peak_booking_months.join(', ')} — book early.
          </p>
          <div className="max-w-3xl space-y-6">
            <div>
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Best months to travel</div>
              <div className="flex flex-wrap gap-2">
                {ALL_MONTHS.filter((m) => city.best_travel_months.includes(m)).map((month) => (
                  <span
                    key={month}
                    className="px-4 py-1.5 bg-green-600/20 border border-green-500/40 text-green-400 rounded-full text-sm font-semibold"
                  >
                    ✓ {month}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Months to avoid</div>
              <div className="flex flex-wrap gap-2">
                {ALL_MONTHS.filter((m) => city.avoid_months.includes(m)).map((month) => (
                  <span
                    key={month}
                    className="px-4 py-1.5 bg-red-600/20 border border-red-500/40 text-red-400 rounded-full text-sm"
                  >
                    ✗ {month}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-300 text-sm">
                📅 <strong className="text-white">Typical holiday:</strong> Most travelers from {city.name} take {city.typical_holiday_days} days for India. Our {city.best_travel_months[0]}–{city.best_travel_months[city.best_travel_months.length - 1]} season packages are specifically designed for {city.typical_holiday_days}-day holidays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────────────────── */}
      <section id="packages" className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            India Trek Packages for {city.flag} {city.nationality} Travelers
          </h2>
          <p className="text-slate-400 mb-10">
            All packages include private transport, 3-star hotels, English-speaking ITMB guide, and 24/7 WhatsApp support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const isPopular = city.popular_package_slugs.includes(pkg.slug);
              const pkgWaText = `Hello! I'm from ${city.name} and interested in the "${pkg.name}" package. Please share availability and pricing.`;
              const pkgWaLink = buildWaLink(pkgWaText);
              const localAmt = localPrice(pkg.intl_price_usd);
              const diffColor = DIFFICULTY_COLORS[pkg.difficulty] ?? 'bg-slate-600';

              return (
                <div
                  key={pkg.slug}
                  className={`relative bg-slate-800 border rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 ${isPopular ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-slate-700'}`}
                >
                  {isPopular && (
                    <div className="absolute top-3 left-3 z-10 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Popular from {city.name}
                    </div>
                  )}
                  {pkg.tag && !isPopular && (
                    <div className="absolute top-3 left-3 z-10 bg-slate-700 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                      {pkg.tag}
                    </div>
                  )}
                  <div className="relative h-48 bg-slate-700">
                    <Image
                      src={pkg.hero_image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold text-white px-2.5 py-0.5 rounded-full ${diffColor}`}>
                        {pkg.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">{pkg.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 mb-1">{pkg.destinations_short}</p>
                    <p className="text-xs text-slate-500 mb-4 italic">{pkg.hero_tagline}</p>
                    <div className="mt-auto">
                      <div className="mb-3">
                        <span className="text-2xl font-extrabold text-amber-400">${pkg.intl_price_usd}</span>
                        <span className="text-slate-400 text-sm ml-1">/person</span>
                        <div className="text-xs text-slate-500 mt-0.5">
                          ≈ {city.currency_symbol}{localAmt.toLocaleString()} · Approximate exchange rate — bookings confirmed in USD
                        </div>
                      </div>
                      <WaLink
                        href={pkgWaLink}
                        label={`intl_city_pkg_${city.slug}_${pkg.slug}`}
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                      >
                        📲 WhatsApp for Quote
                      </WaLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY JUNEGIRI ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Why Choose Junegiri Yatra
          </h2>
          <p className="text-slate-400 text-center mb-10">Built for international travelers. No surprises.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '🚗', title: 'Private Transport', desc: 'Dedicated SUV for your group — no shared jeeps, no strangers.' },
              { icon: '🏨', title: '3-Star Hotels', desc: 'Curated stays with attached bathroom, hot water, and WiFi.' },
              { icon: '🧭', title: 'English Guide', desc: 'ITMB-certified Himalayan guide. Fluent English. Safety-first.' },
              { icon: '📲', title: '24/7 WhatsApp', desc: 'Direct line to our Haridwar team. Real humans. Fast replies.' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center hover:border-amber-500/40 transition-colors">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="font-bold text-white mb-2">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            Frequently Asked Questions — {city.name}
          </h2>
          <div className="max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-700/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-white text-sm md:text-base">{f.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                    className={`flex-shrink-0 text-amber-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Ready to trek the Himalayas from {city.name}?
          </h2>
          <p className="text-slate-800 mb-8 max-w-xl mx-auto">
            Our Haridwar-based team responds within 60 minutes. Free itinerary, no booking fee, pay after confirmation.
          </p>
          <WaLink
            href={heroWaLink}
            label={`intl_city_footer_${city.slug}`}
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            📲 WhatsApp Us Now
          </WaLink>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-600 border-t border-green-500">
        <WaLink
          href={heroWaLink}
          label={`intl_city_sticky_${city.slug}`}
          className="flex items-center justify-center gap-2 text-white font-bold py-4 text-base w-full"
        >
          📲 WhatsApp us to plan your India trek →
        </WaLink>
      </div>
    </>
  );
}
