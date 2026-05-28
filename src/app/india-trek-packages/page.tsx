import type { Metadata } from 'next';
import Link from 'next/link';
import intlCitiesData from '../../../data/international-cities.json';
import type { IntlCity } from '@/components/IntlCityPage';

export const metadata: Metadata = {
  title: 'India Trek Packages by Departure City | Himalayan Tours | Junegiri Yatra',
  description:
    'Himalayan trek packages for international travelers — 46 departure cities across UK, USA, Australia, Europe & more. Kedarkantha, Valley of Flowers, Har Ki Dun from $170/person. Private guide, airport transfers, e-Visa guidance.',
  alternates: {
    canonical: 'https://junegiriyatra.com/india-trek-packages/',
  },
  openGraph: {
    title: 'India Trek Packages by Departure City | Junegiri Yatra',
    description:
      'Choose your departure city and explore Himalayan trek packages tailored for you. 17 treks · 46 cities · from $170/person.',
    url: 'https://junegiriyatra.com/india-trek-packages/',
    siteName: 'Junegiri Yatra',
    locale: 'en_US',
    type: 'website',
  },
};

// Group cities by region, preserving order
function groupByRegion(cities: IntlCity[]): Record<string, IntlCity[]> {
  const groups: Record<string, IntlCity[]> = {};
  for (const city of cities) {
    const r = city.region ?? 'Other';
    if (!groups[r]) groups[r] = [];
    groups[r].push(city);
  }
  return groups;
}

// Region display config
const REGION_META: Record<string, { emoji: string; label: string }> = {
  UK: { emoji: '🇬🇧', label: 'United Kingdom' },
  USA: { emoji: '🇺🇸', label: 'United States' },
  Australia: { emoji: '🇦🇺', label: 'Australia' },
  Germany: { emoji: '🇩🇪', label: 'Germany' },
  France: { emoji: '🇫🇷', label: 'France' },
  Canada: { emoji: '🇨🇦', label: 'Canada' },
  Netherlands: { emoji: '🇳🇱', label: 'Netherlands' },
  Singapore: { emoji: '🇸🇬', label: 'Singapore' },
  Israel: { emoji: '🇮🇱', label: 'Israel' },
  'New Zealand': { emoji: '🇳🇿', label: 'New Zealand' },
  Europe: { emoji: '🌍', label: 'Europe' },
  Other: { emoji: '🌐', label: 'Other' },
};

export default function IndiaTrekPackagesHubPage() {
  const cities = intlCitiesData as IntlCity[];
  const groups = groupByRegion(cities);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'India Trek Packages by Departure City',
    description: 'Himalayan trek packages for international travelers, organized by departure city',
    numberOfItems: cities.length,
    itemListElement: cities.map((city, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `India Trek Packages from ${city.name}`,
      url: `https://junegiriyatra.com/india-trek-packages/from/${city.slug}/`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
        {/* Hero */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--card) 0%, #0a0820 100%)',
            borderBottom: '1px solid var(--border)',
            padding: '72px 24px 56px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(201,146,61,0.12)',
                border: '1px solid rgba(201,146,61,0.3)',
                borderRadius: 24,
                padding: '6px 18px',
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              🌏 {cities.length} Departure Cities
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 800,
                lineHeight: 1.15,
                margin: '0 0 16px',
                color: 'var(--text)',
              }}
            >
              India Trek Packages<br />
              <span style={{ color: 'var(--gold)' }}>From Your City</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: 'var(--muted)',
                lineHeight: 1.65,
                margin: '0 0 32px',
                maxWidth: 560,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              17 Himalayan treks tailored for international travelers. Private guide,
              airport transfers, e-Visa support and all-inclusive pricing — from $170/person.
            </p>
            {/* Stats */}
            <div
              style={{
                display: 'flex',
                gap: 32,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[
                { val: '17', label: 'Himalayan Treks' },
                { val: `${cities.length}`, label: 'Departure Cities' },
                { val: '$170', label: 'Starting From' },
                { val: '4.9★', label: 'Avg. Rating' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: 'var(--gold)',
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      marginTop: 4,
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City Grid by Region */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>
          {Object.entries(groups).map(([region, regionCities]) => {
            const meta = REGION_META[region] ?? { emoji: '🌐', label: region };
            return (
              <div key={region} style={{ marginBottom: 48 }}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--gold)',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      fontWeight: 500,
                      textTransform: 'none',
                      letterSpacing: 0,
                    }}
                  >
                    · {regionCities.length} {regionCities.length === 1 ? 'city' : 'cities'}
                  </span>
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 14,
                  }}
                >
                  {regionCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/india-trek-packages/from/${city.slug}/`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          background: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: 12,
                          padding: '18px 20px',
                          transition: 'border-color 0.2s, transform 0.2s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 22 }}>{city.flag ?? meta.emoji}</span>
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 700,
                                color: 'var(--text)',
                              }}
                            >
                              {city.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: 16,
                              color: 'var(--gold)',
                              opacity: 0.6,
                            }}
                          >
                            →
                          </span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              color: 'var(--muted)',
                              background: 'rgba(255,255,255,0.04)',
                              borderRadius: 4,
                              padding: '2px 7px',
                            }}
                          >
                            ✈️ {city.flight_hours_to_delhi}h to Delhi
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: 'var(--muted)',
                              background: 'rgba(255,255,255,0.04)',
                              borderRadius: 4,
                              padding: '2px 7px',
                            }}
                          >
                            {city.visa_type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            background: 'linear-gradient(135deg, rgba(201,146,61,0.08) 0%, rgba(201,146,61,0.03) 100%)',
            borderTop: '1px solid var(--border)',
            padding: '56px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>🏔️</div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: 'var(--text)',
                marginBottom: 12,
              }}
            >
              Don&apos;t see your city?
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              We customise packages for travelers from anywhere in the world.
              WhatsApp us and we&apos;ll plan your perfect Himalayan adventure.
            </p>
            <a
              href="https://wa.me/919873897652?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20India%20trek%20packages"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#25D366',
                color: '#fff',
                borderRadius: 10,
                padding: '14px 28px',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              <span>💬</span>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
