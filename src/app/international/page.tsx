import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import type { IntlCity, IntlPackage } from '@/components/IntlCityPage';

export const metadata: Metadata = {
  title: 'International India Trek Packages | Himalayan Tours for Global Travelers | Junegiri Yatra',
  description:
    'Premium Himalayan trek packages for international travelers. 10-15 day private tours from $2,000/person. English guide, 3-star hotels, airport transfers. Haridwar-based, ATOI-licensed operator.',
  alternates: {
    canonical: 'https://junegiriyatra.com/international/',
  },
  openGraph: {
    title: 'International India Trek Packages | Junegiri Yatra',
    description: 'Himalayan treks for global travelers. From $2,000/person. Private transport, English guide, 3-star hotels.',
    url: 'https://junegiriyatra.com/international/',
    siteName: 'Junegiri Yatra',
    locale: 'en_US',
    type: 'website',
  },
};

const WA_NUMBER = '919873897652';

function buildWaLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

const TESTIMONIALS = [
  {
    quote:
      "Junegiri handled everything — visa guidance, airport pickup, the whole 12 days. Our guide Rahul was exceptional. The Himalayas exceeded every expectation.",
    author: 'Sarah M.',
    location: 'London, UK 🇬🇧',
  },
  {
    quote:
      'Booked via WhatsApp in 10 minutes. The sacred circuit was transformative. Perfectly organised, zero stress. We\'ll be back.',
    author: 'Ahmed K.',
    location: 'Dubai, UAE 🇦🇪',
  },
  {
    quote:
      'Solo female traveler — felt completely safe throughout. Private vehicle, great hotels, English guide who knew every trail. Highly recommend for international visitors.',
    author: 'Priya L.',
    location: 'Singapore 🇸🇬',
  },
];

const HUB_FAQS = [
  {
    q: 'Do I need a visa to visit India?',
    a: 'Most nationalities qualify for an Indian e-Visa, which you apply for online. Processing takes 4–7 business days and costs $25–$80 depending on your country. We guide you through the entire process — just WhatsApp us once you\'ve decided on travel dates.',
  },
  {
    q: 'Is India safe for international tourists?',
    a: 'Yes. Our packages operate exclusively as private tours — dedicated vehicle, private guide, and carefully selected 3-star hotels. Our Haridwar-based team has guided international visitors since 2017. You have 24/7 WhatsApp access to our operations team throughout your trip.',
  },
  {
    q: 'What currency should I carry?',
    a: 'Indian Rupees (INR) for local expenses. All package fees are confirmed in USD. We accept bank transfers, PayPal, and Wise for international payments. ATMs are widely available in cities and major towns along all our routes.',
  },
  {
    q: 'What is the best season to visit the Himalayas?',
    a: 'September–November and February–May are the best periods for Himalayan trekking — clear skies, comfortable temperatures, and accessible trails. Monsoon (June–August) brings lush valleys but can affect some high-altitude routes. We\'ll recommend the ideal package based on your travel dates.',
  },
  {
    q: 'How physically fit do I need to be?',
    a: 'We offer packages ranging from Easy (suitable for general fitness) to Challenging (for experienced trekkers). Our itineraries include acclimatization days and flexible pacing. We match you to the right package during the WhatsApp consultation.',
  },
  {
    q: 'What is included in the package price?',
    a: 'Private AC vehicle for all transfers, 3-star hotel accommodation with breakfast, ITMB-certified English-speaking guide, all necessary permits, and 24/7 WhatsApp support. International flights and visa fees are excluded.',
  },
  {
    q: 'How do I pay and confirm my booking?',
    a: 'WhatsApp us to receive a detailed itinerary and price quote. A 30% deposit (via bank transfer, PayPal, or Wise) confirms your booking. The balance is due 2 weeks before departure. We send a full booking confirmation and pre-trip briefing document.',
  },
  {
    q: 'Can you customize the itinerary?',
    a: 'Absolutely. All our packages are private tours — we can adjust durations, add or swap destinations, and tailor difficulty levels. WhatsApp us with your group size, dates, and interests for a custom proposal within 24 hours.',
  },
];

// Top 12 cities to highlight on the hub page
const TOP_CITIES_FOR_HUB = [
  { slug: 'london', name: 'London', flag: '🇬🇧' },
  { slug: 'new-york', name: 'New York', flag: '🇺🇸' },
  { slug: 'dubai', name: 'Dubai', flag: '🇦🇪' },
  { slug: 'singapore', name: 'Singapore', flag: '🇸🇬' },
  { slug: 'sydney', name: 'Sydney', flag: '🇦🇺' },
  { slug: 'toronto', name: 'Toronto', flag: '🇨🇦' },
  { slug: 'paris', name: 'Paris', flag: '🇫🇷' },
  { slug: 'amsterdam', name: 'Amsterdam', flag: '🇳🇱' },
  { slug: 'kuala-lumpur', name: 'Kuala Lumpur', flag: '🇲🇾' },
  { slug: 'san-francisco', name: 'San Francisco', flag: '🇺🇸' },
  { slug: 'manchester', name: 'Manchester', flag: '🇬🇧' },
  { slug: 'melbourne', name: 'Melbourne', flag: '🇦🇺' },
];

const TRUST_FLAGS = ['🇬🇧', '🇺🇸', '🇦🇺', '🇨🇦', '🇸🇬', '🇦🇪', '🇩🇪', '🇫🇷', '🇳🇱', '🇮🇹', '🇨🇭', '🇳🇿'];

export default function InternationalHubPage() {
  let intlCities: IntlCity[] = [];
  let intlPackages: IntlPackage[] = [];

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    intlCities = require('../../../data/international-cities.json');
  } catch {
    // not critical
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    intlPackages = require('../../../data/international-packages.json');
  } catch {
    // not critical
  }

  const heroWaLink = buildWaLink(
    'Hello! I\'m an international traveler interested in Himalayan trek packages. Please share details.',
  );

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        name: 'Junegiri Yatra',
        url: 'https://junegiriyatra.com',
        telephone: `+${WA_NUMBER}`,
        description:
          'Haridwar-based Himalayan trek specialists offering private tours for international travelers. Operating from Haridwar since 2017, licensed by Uttarakhand Tourism (ATOI-approved).',
        areaServed: 'Worldwide',
        priceRange: '$2,000–$3,500',
      },
      {
        '@type': 'FAQPage',
        mainEntity: HUB_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900" />
        <Image
          src="/images/trek_himalaya.webp"
          alt="Himalayan trek for international travelers"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-1.5 text-sm text-slate-300 mb-6">
              🌍 International Packages · Private Tours · Since 2017
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              The Himalayas Await.<br />
              <span className="text-amber-400">We Handle Everything Else.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              10–15 day private Himalayan tours for international travelers. English guide, private transport, 3-star hotels, airport transfer, visa guidance. From <strong className="text-amber-400">$2,000/person</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={heroWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-4 rounded-xl text-base transition-colors"
              >
                📲 WhatsApp Us Now
              </a>
              <a
                href="#packages"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-4 rounded-xl text-base transition-colors"
              >
                See All Packages ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────────────── */}
      <section className="bg-slate-800 border-y border-slate-700 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xl mb-2">
            {TRUST_FLAGS.map((flag, i) => (
              <span key={i} title="Trusted country">{flag}</span>
            ))}
            <span className="text-slate-500">···</span>
          </div>
          <p className="text-center text-sm text-slate-400">
            Private tours for international guests · <strong className="text-white">ATOI-licensed</strong> · Haridwar-based since 2017
          </p>
        </div>
      </section>

      {/* ── WHY JUNEGIRI ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Why International Travelers Choose Junegiri
          </h2>
          <p className="text-slate-400 text-center mb-12">Everything managed. Zero friction. 100% private.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '🚗', title: 'Private SUV', desc: 'Your own vehicle for all transfers. No shared transport, no waiting for strangers.' },
              { icon: '🏨', title: '3-Star Hotels', desc: 'Attached bathroom, hot water, WiFi. Carefully selected for comfort at altitude.' },
              { icon: '🧭', title: 'ITMB Guide', desc: 'Certified Himalayan guide. Fluent English. First-aid trained. Your safety officer.' },
              { icon: '📲', title: '24/7 WhatsApp', desc: 'Direct line to our Haridwar ops team. Real people. Average reply under 30 min.' },
              { icon: '✈️', title: 'Airport Transfer', desc: 'Delhi airport pickup included. We track your flight and wait for you.' },
              { icon: '💵', title: 'USD Pricing', desc: 'All packages priced in USD. No currency surprises. Wire, PayPal, or Wise accepted.' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-amber-500/40 transition-colors">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-white mb-2">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────────────────── */}
      <section id="packages" className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Our International Trek Packages
          </h2>
          <p className="text-slate-400 mb-10">
            Curated for 10–15 day holidays. All-inclusive from $2,000/person.
          </p>
          {intlPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intlPackages.map((pkg) => {
                const pkgWaLink = buildWaLink(
                  `Hello! I'm interested in the "${pkg.name}" India trek package. Please share details.`,
                );
                return (
                  <div
                    key={pkg.slug}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col hover:border-amber-500/40 transition-colors hover:-translate-y-1 transition-transform"
                  >
                    {pkg.tag && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
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
                        <span className="text-xs font-bold bg-slate-600 text-white px-2.5 py-0.5 rounded-full">
                          {pkg.difficulty}
                        </span>
                        <span className="text-xs text-slate-400">{pkg.duration}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-1">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">{pkg.destinations_short}</p>
                      <div className="mt-auto">
                        <div className="text-2xl font-extrabold text-amber-400 mb-3">
                          ${pkg.intl_price_usd}
                          <span className="text-slate-400 text-sm font-normal ml-1">/person</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/international/${pkg.slug}/`}
                            className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                          >
                            View Details
                          </Link>
                          <a
                            href={pkgWaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-green-500 hover:bg-green-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                          >
                            📲 WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
              <p className="text-slate-400 mb-6">Our international packages are being finalized. WhatsApp us for a custom quote.</p>
              <a
                href={heroWaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                📲 Get Package Details on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'WhatsApp Us',
                desc: 'Send us your travel dates, group size, and destination city. We respond within 60 minutes with a custom itinerary.',
                cta: heroWaLink,
                ctaLabel: 'Start on WhatsApp →',
              },
              {
                step: '02',
                title: 'We Plan Your Trip',
                desc: 'Custom itinerary, USD pricing, visa guidance, flight advice, hotel options. All over WhatsApp. No forms, no calls.',
                cta: null,
                ctaLabel: null,
              },
              {
                step: '03',
                title: 'You Show Up',
                desc: 'Land at Delhi airport. Your driver is waiting. Your guide meets you at Haridwar. Everything handled.',
                cta: null,
                ctaLabel: null,
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 border-2 border-amber-500 rounded-full text-amber-400 text-2xl font-extrabold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                {step.cta && step.ctaLabel && (
                  <a
                    href={step.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                  >
                    {step.ctaLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DEPARTURE CITIES ──────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Popular Departure Cities
          </h2>
          <p className="text-slate-400 mb-8">
            Find your city for flight info, visa details, and personalized package recommendations.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES_FOR_HUB.map((city) => {
              // Check if this city exists in data
              const cityData = intlCities.find((c) => c.slug === city.slug);
              const href = `/india-trek-packages/from/${city.slug}/`;
              return (
                <Link
                  key={city.slug}
                  href={href}
                  className="flex flex-col items-center gap-2 bg-slate-800 border border-slate-700 hover:border-amber-500/40 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 group"
                >
                  <span className="text-2xl">{city.flag}</span>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {city.name}
                  </span>
                  {cityData && (
                    <span className="text-xs text-slate-500">{cityData.flight_hours_to_delhi}h</span>
                  )}
                </Link>
              );
            })}
          </div>
          {intlCities.length > 12 && (
            <p className="text-slate-400 text-sm mt-6">
              + {intlCities.length - 12} more cities. WhatsApp us if you don&apos;t see yours.
            </p>
          )}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="text-amber-400 text-2xl mb-4">❝</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{t.quote}</p>
                <div>
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-slate-500 text-xs">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-800/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3">
            {HUB_FAQS.map((f, i) => (
              <details
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-white font-semibold text-sm hover:bg-slate-700/50 transition-colors list-none">
                  {f.q}
                  <span className="text-amber-400 flex-shrink-0 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-slate-300 text-sm leading-relaxed">{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Start Planning Your Himalayan Adventure
          </h2>
          <p className="text-slate-800 mb-8 max-w-xl mx-auto text-lg">
            WhatsApp us with your travel dates and group size. Custom itinerary within 60 minutes. Free, no obligation.
          </p>
          <a
            href={heroWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-5 rounded-xl text-xl transition-colors"
          >
            📲 WhatsApp Us Now
          </a>
          <p className="text-slate-700 text-sm mt-4">
            Free itinerary · No booking fee · Pay 30% to confirm dates
          </p>
        </div>
      </section>
    </>
  );
}
