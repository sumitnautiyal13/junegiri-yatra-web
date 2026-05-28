import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { IntlCity, IntlPackage } from '@/components/IntlCityPage';

// ─── Extended package type for this detail page ─────────────────────────────

interface PricingRow {
  label: string;
  usd: number;
  note?: string;
}

interface ItineraryDay {
  day: string;
  title: string;
  desc: string;
}

interface DetailedIntlPackage extends IntlPackage {
  overview?: string;
  highlights?: string[];
  route_stops?: string[];
  itinerary?: ItineraryDay[];
  included?: string[];
  excluded?: string[];
  pricing?: PricingRow[];
  faq?: { q: string; a: string }[];
  testimonials?: { quote: string; author: string; location: string; flag: string }[];
  guide_name?: string;
  guide_credentials?: string;
  guide_experience_years?: number;
}

// ─── Static params ───────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkgs: IntlPackage[] = require('../../../../data/international-packages.json');
    return pkgs.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let pkg: DetailedIntlPackage | undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkgs: DetailedIntlPackage[] = require('../../../../data/international-packages.json');
    pkg = pkgs.find((p) => p.slug === slug);
  } catch {
    // data file may not exist
  }

  if (!pkg) return { title: 'Not Found' };

  return {
    title: `${pkg.name} | India Himalayan Trek | Junegiri Yatra`,
    description: `${pkg.hero_tagline} ${pkg.duration} · ${pkg.destinations_short} · From $${pkg.intl_price_usd}/person. Private transport, English guide, 3-star hotels.`,
    alternates: {
      canonical: `https://junegiriyatra.com/international/${pkg.slug}/`,
    },
    openGraph: {
      title: `${pkg.name} | Junegiri Yatra`,
      description: `${pkg.hero_tagline} From $${pkg.intl_price_usd}/person.`,
      url: `https://junegiriyatra.com/international/${pkg.slug}/`,
      siteName: 'Junegiri Yatra',
      locale: 'en_US',
      type: 'website',
      images: [{ url: pkg.hero_image, alt: pkg.name }],
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const WA_NUMBER = '919873897652';
function buildWaLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-600',
  Moderate: 'bg-amber-500',
  Challenging: 'bg-orange-600',
  Hard: 'bg-red-600',
};

// ─── Page component ──────────────────────────────────────────────────────────

export default async function IntlPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let allPackages: DetailedIntlPackage[] = [];
  let allCities: IntlCity[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    allPackages = require('../../../../data/international-packages.json');
  } catch {
    // data file may not exist yet
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    allCities = require('../../../../data/international-cities.json');
  } catch {
    // data file may not exist yet
  }

  const pkg = allPackages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  const relatedPackages = allPackages.filter((p) => p.slug !== slug).slice(0, 3);

  // Cities that list this package as popular
  const popularCitiesForPkg = allCities
    .filter((c) => c.popular_package_slugs.includes(slug))
    .slice(0, 6);

  const heroWaLink = buildWaLink(
    `Hello! I'm interested in the "${pkg.name}" (${pkg.duration}) package. Please share availability and pricing.`,
  );

  const defaultHighlights = [
    `${pkg.duration} carefully curated itinerary`,
    `Private AC SUV for all transfers`,
    `ITMB-certified English-speaking guide`,
    `3-star hotels with breakfast included`,
    `All necessary permits and entrance fees`,
    `24/7 WhatsApp support from Haridwar base`,
  ];
  const highlights = pkg.highlights ?? defaultHighlights;

  const defaultItinerary: ItineraryDay[] = [];
  const itinerary = pkg.itinerary ?? defaultItinerary;

  const defaultIncluded = [
    'Delhi airport pickup & drop',
    'All inter-city transfers in private AC SUV',
    'Accommodation in 3-star hotels with breakfast',
    'ITMB-certified English guide throughout',
    'All trek/site entry permits',
    'Basic first-aid kit on trek',
    '24/7 WhatsApp operations support',
  ];
  const defaultExcluded = [
    'International flights to/from Delhi',
    'Indian visa fees (we guide the process)',
    'Travel insurance (mandatory)',
    'Personal expenses & shopping',
    'Lunches & dinners (unless specified)',
    'Tips & gratuities',
  ];
  const included = pkg.included ?? defaultIncluded;
  const excluded = pkg.excluded ?? defaultExcluded;

  const defaultPricing: PricingRow[] = [
    { label: 'Solo traveler', usd: Math.round(pkg.intl_price_usd * 1.25), note: 'Single supplement applies' },
    { label: 'Couple (2 pax)', usd: pkg.intl_price_usd, note: 'Per person' },
    { label: 'Group 3–4 pax', usd: Math.round(pkg.intl_price_usd * 0.92), note: 'Per person' },
    { label: 'Group 5+ pax', usd: Math.round(pkg.intl_price_usd * 0.85), note: 'Per person · best value' },
  ];
  const pricing = pkg.pricing ?? defaultPricing;

  const defaultFaqs = [
    {
      q: `How physically demanding is ${pkg.name}?`,
      a: `This is rated ${pkg.difficulty}. ${pkg.difficulty === 'Easy' ? 'Suitable for general fitness — moderate walking on well-maintained paths.' : pkg.difficulty === 'Moderate' ? 'Some uphill sections. Regular walkers handle this well. Altitude acclimatization included.' : 'Designed for trekkers with prior hiking experience. Proper fitness training recommended 4–6 weeks before departure.'}`,
    },
    {
      q: 'What is the best time of year for this trek?',
      a: `${pkg.name} is best experienced in the April–June and September–November windows when trails are clear and weather is stable. We operate the package year-round and will advise the ideal window based on your travel dates.`,
    },
    {
      q: 'What should I pack for this trip?',
      a: 'We send a detailed packing list post-booking. Essentials include layered clothing (temperatures vary significantly by altitude), good trekking shoes, personal medications, and a day pack. All heavy gear can be carried by our support team.',
    },
    {
      q: 'How do I get from my country to the trek start point?',
      a: 'Fly to Delhi (DEL). Your Junegiri driver will meet you at the arrivals hall with a name board. We handle the 5-6 hour Haridwar transfer. Your guide joins at Haridwar/Rishikesh where the trek begins.',
    },
    {
      q: 'Can the itinerary be customized?',
      a: 'Yes — all our international packages are fully private. We can adjust duration, add extension days, combine with other destinations, or modify difficulty. WhatsApp us with your requirements for a custom proposal.',
    },
  ];
  const faqs = pkg.faq ?? defaultFaqs;

  const defaultTestimonials = [
    {
      quote: 'An absolutely transformative experience. The guide was knowledgeable, patient, and made the Himalayas feel accessible. Everything was handled perfectly.',
      author: 'James T.',
      location: 'Sydney, Australia',
      flag: '🇦🇺',
    },
    {
      quote: 'Worth every dollar. The private vehicle and English guide made all the difference. I\'ve trekked in Nepal but India\'s Himalayas are something else entirely.',
      author: 'Mia H.',
      location: 'Amsterdam, Netherlands',
      flag: '🇳🇱',
    },
    {
      quote: 'Booked solo, felt safe throughout. The WhatsApp support is real — they replied at 11pm when I had a question. Exceptional service.',
      author: 'Fatima R.',
      location: 'Dubai, UAE',
      flag: '🇦🇪',
    },
  ];
  const testimonials = pkg.testimonials ?? defaultTestimonials;

  const diffColor = DIFFICULTY_COLORS[pkg.difficulty] ?? 'bg-slate-600';

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristTrip',
        name: pkg.name,
        description: pkg.hero_tagline,
        touristType: 'Adventure travelers',
        provider: {
          '@type': 'TravelAgency',
          name: 'Junegiri Yatra',
          url: 'https://junegiriyatra.com',
          telephone: `+${WA_NUMBER}`,
        },
        offers: {
          '@type': 'Offer',
          price: pkg.intl_price_usd,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        itinerary: itinerary.length > 0
          ? {
              '@type': 'ItemList',
              itemListElement: itinerary.map((d, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: d.title,
              })),
            }
          : undefined,
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
          { '@type': 'ListItem', position: 2, name: 'International', item: 'https://junegiriyatra.com/international/' },
          { '@type': 'ListItem', position: 3, name: pkg.name, item: `https://junegiriyatra.com/international/${pkg.slug}/` },
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
            <Link href="/international/" className="hover:text-amber-400 transition-colors">International</Link>
            <span className="text-slate-600">›</span>
            <span className="text-slate-300">{pkg.name}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/20" />
        <Image
          src={pkg.hero_image}
          alt={pkg.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="container mx-auto px-4 relative z-10 pb-12 pt-32">
          <div className="max-w-3xl">
            {pkg.tag && (
              <div className="inline-block bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                {pkg.tag}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              {pkg.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`text-sm font-bold text-white px-3 py-1 rounded-full ${diffColor}`}>
                {pkg.difficulty}
              </span>
              <span className="text-slate-300 text-sm">📅 {pkg.duration}</span>
              <span className="text-slate-300 text-sm">📍 {pkg.destinations_short}</span>
            </div>
            <p className="text-slate-300 text-lg mb-6">{pkg.hero_tagline}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-3xl font-extrabold text-amber-400">${pkg.intl_price_usd}</span>
                <span className="text-slate-400 ml-1">/person</span>
              </div>
              <a
                href={heroWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                📲 WhatsApp for Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK HIGHLIGHTS ──────────────────────────────────────────── */}
      <section className="bg-slate-800 border-y border-slate-700 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Package Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-amber-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROUTE OVERVIEW ────────────────────────────────────────────── */}
      {pkg.route_stops && pkg.route_stops.length > 0 && (
        <section className="bg-slate-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Route Overview</h2>
            <div className="max-w-3xl">
              <div className="flex flex-col gap-0">
                {pkg.route_stops.map((stop, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      {i < (pkg.route_stops?.length ?? 0) - 1 && (
                        <div className="w-0.5 h-8 bg-amber-500/30 mt-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-white font-semibold">{stop}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ITINERARY ─────────────────────────────────────────────────── */}
      {itinerary.length > 0 && (
        <section className="bg-slate-800/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">Day-by-Day Itinerary</h2>
            <div className="max-w-3xl space-y-3">
              {itinerary.map((day, i) => (
                <details
                  key={i}
                  className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-700/50 transition-colors list-none">
                    <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 uppercase">
                      {day.day}
                    </span>
                    <span className="font-semibold text-white">{day.title}</span>
                    <span className="ml-auto text-amber-400 flex-shrink-0">▾</span>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-slate-300 text-sm leading-relaxed">{day.desc}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── INCLUDED / EXCLUDED ───────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">What&apos;s Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-green-900/20 border border-green-700/40 rounded-2xl p-6">
              <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                <span>✓</span> Included in Package
              </h3>
              <ul className="space-y-2">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-900/20 border border-red-700/40 rounded-2xl p-6">
              <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                <span>✗</span> Not Included
              </h3>
              <ul className="space-y-2">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING TABLE ─────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Pricing</h2>
          <p className="text-slate-400 mb-8">All prices in USD. 30% deposit to confirm booking.</p>
          <div className="max-w-2xl">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-700/50 border-b border-slate-600">
                    <th className="text-left px-5 py-3 text-sm font-bold text-slate-300">Group Size</th>
                    <th className="text-right px-5 py-3 text-sm font-bold text-slate-300">Price / Person</th>
                    <th className="text-right px-5 py-3 text-sm font-bold text-slate-300 hidden sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {pricing.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-700/50 ${i === pricing.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <td className="px-5 py-4 text-white font-medium text-sm">{row.label}</td>
                      <td className="px-5 py-4 text-right">
                        <span className="text-amber-400 font-extrabold text-lg">${row.usd}</span>
                      </td>
                      <td className="px-5 py-4 text-right hidden sm:table-cell">
                        {row.note && <span className="text-slate-400 text-xs">{row.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
              <a
                href={heroWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                📲 Get Custom Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDE CREDENTIALS ─────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Your Guide</h2>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-3xl flex-shrink-0">
                🧭
              </div>
              <div>
                <div className="font-bold text-white text-lg mb-1">
                  {pkg.guide_name ?? 'ITMB-Certified Himalayan Guide'}
                </div>
                <div className="text-amber-400 text-sm mb-3">
                  {pkg.guide_experience_years
                    ? `${pkg.guide_experience_years}+ years experience`
                    : '10+ years Himalayan experience'}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pkg.guide_credentials ??
                    'Our guides are certified by the Indian Tourism Ministry Board (ITMB), trained in wilderness first aid, and fluent in English. They know every trail, altitude challenge, and emergency protocol — so you trek with confidence.'}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['ITMB Certified', 'Wilderness First Aid', 'Fluent English', 'Local Expert'].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs bg-slate-700 border border-slate-600 text-slate-300 px-3 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            What Travelers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="text-amber-400 text-2xl mb-4">❝</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{t.quote}</p>
                <div>
                  <div className="font-bold text-white text-sm">{t.flag} {t.author}</div>
                  <div className="text-slate-500 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer hover:bg-slate-700/50 transition-colors list-none text-white font-semibold text-sm">
                  {f.q}
                  <span className="text-amber-400 flex-shrink-0">▾</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PACKAGES ──────────────────────────────────────────── */}
      {relatedPackages.length > 0 && (
        <section className="bg-slate-800/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((rp) => {
                const rpDiffColor = DIFFICULTY_COLORS[rp.difficulty] ?? 'bg-slate-600';
                const rpWaLink = buildWaLink(
                  `Hello! I'm interested in the "${rp.name}" package. Please share details.`,
                );
                return (
                  <div
                    key={rp.slug}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-colors"
                  >
                    <div className="relative h-40 bg-slate-700">
                      <Image
                        src={rp.hero_image}
                        alt={rp.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${rpDiffColor}`}>
                          {rp.difficulty}
                        </span>
                        <span className="text-xs text-slate-400">{rp.duration}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm mb-1">{rp.name}</h3>
                      <div className="text-amber-400 font-bold mb-3">${rp.intl_price_usd}<span className="text-slate-400 text-xs font-normal ml-1">/person</span></div>
                      <div className="flex gap-2">
                        <Link
                          href={`/international/${rp.slug}/`}
                          className="flex-1 text-center text-xs bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                          Details
                        </Link>
                        <a
                          href={rpWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center text-xs bg-green-500 hover:bg-green-400 text-white font-semibold py-2 rounded-lg transition-colors"
                        >
                          📲 WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── POPULAR CITIES FOR THIS PACKAGE ───────────────────────────── */}
      {popularCitiesForPkg.length > 0 && (
        <section className="bg-slate-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-3">
              Book {pkg.name} from Your City
            </h2>
            <p className="text-slate-400 mb-8">Personalized flight info, visa details &amp; local pricing for your departure city.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {popularCitiesForPkg.map((city) => (
                <Link
                  key={city.slug}
                  href={`/india-trek-packages/from/${city.slug}/`}
                  className="flex flex-col items-center gap-2 bg-slate-800 border border-slate-700 hover:border-amber-500/40 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group"
                >
                  <span className="text-2xl">{city.flag}</span>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {city.name}
                  </span>
                  <span className="text-xs text-slate-500">{city.flight_hours_to_delhi}h</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Ready to book {pkg.name}?
          </h2>
          <p className="text-slate-800 mb-6 max-w-lg mx-auto">
            WhatsApp us with your travel dates and group size. Custom quote within 60 minutes. Free, no obligation.
          </p>
          <a
            href={heroWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            📲 WhatsApp for Custom Quote
          </a>
          <p className="text-slate-700 text-sm mt-4">
            Free itinerary · No booking fee · 30% deposit to confirm dates
          </p>
        </div>
      </section>

      {/* ── STICKY MOBILE CTA ─────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-green-600 border-t border-green-500">
        <a
          href={heroWaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-white font-bold py-4 text-base w-full"
        >
          📲 WhatsApp us to book {pkg.duration} from ${ pkg.intl_price_usd} →
        </a>
      </div>
    </>
  );
}
