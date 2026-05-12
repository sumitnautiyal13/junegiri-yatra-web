import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';
import yogaData from '../../../../data/yoga-programs.json';

export function generateStaticParams() {
  return yogaData.map((d) => ({ location: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const data = yogaData.find((d) => d.slug === location);
  if (!data) return {};
  const loc = location.charAt(0).toUpperCase() + location.slice(1);
  return {
    title: `Yoga Teacher Training in ${loc} | 100hr 200hr 300hr TTC | Junegiri Yatra`,
    description: `Yoga Alliance certified TTC in ${loc}. Choose 100-Hour Foundation, 200-Hour RYT 200 or 300-Hour RYT 500. Multi-style Hatha, Ashtanga, Vinyasa. All-inclusive. Enrol now.`,
    alternates: { canonical: `https://junegiriyatra.com/yoga/${location}/` },
    openGraph: {
      title: `Yoga TTC in ${loc} — 100hr, 200hr, 300hr | Junegiri Yatra`,
      description: data.description,
      images: [{ url: `https://junegiriyatra.com${data.hero_image}` }],
    },
  };
}

const PROGRAM_META = [
  { hours: 100, slug: '100hours', icon: '🌱', color: '#f0fdf4', border: '#86efac', badge: 'Foundation', cert: 'School Certificate', ideal: 'Beginners & practitioners' },
  { hours: 200, slug: '200hours', icon: '🧘', color: '#fffbeb', border: '#fcd34d', badge: 'Most Popular', cert: 'Yoga Alliance RYT 200', ideal: 'Aspiring yoga teachers' },
  { hours: 300, slug: '300hours', icon: '🏆', color: '#faf5ff', border: '#c084fc', badge: 'Advanced', cert: 'Yoga Alliance RYT 500', ideal: 'Existing RYT 200 holders' },
];

export default async function YogaLocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const data = yogaData.find((d) => d.slug === location);
  if (!data) notFound();

  const loc = location.charAt(0).toUpperCase() + location.slice(1);

  return (
    <div style={{ color: '#1a1a1a' }}>
      {/* ── HERO ── */}
      <section className="city-hero">
        <Image src={data.hero_image} alt={`Yoga Teacher Training in ${loc}`} fill priority sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 52, margin: 0, lineHeight: 1 }}>🧘</p>
          <h1 className="city-hero-h1" style={{ marginTop: 12 }}>{data.title}</h1>
          <p className="city-hero-sub" style={{ maxWidth: 560, margin: '10px auto 28px' }}>
            {data.tagline} · Yoga Alliance Certified · All-inclusive
          </p>
          <WaLink
            href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! I want to enquire about Yoga TTC in ${loc}`)}`}
            className="btn-gold-hero" target="_blank" rel="noopener noreferrer"
            label={`yoga_${location}_hero_wa`}>
            📲 WhatsApp to Enquire
          </WaLink>
        </div>
      </section>

      {/* ── BREADCRUMB ── */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <div className="container">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/yoga/">Yoga TTC</Link></li>
            <li>{loc}</li>
          </ol>
        </div>
      </nav>

      {/* ── LOCATION INTRO ── */}
      <section style={{ padding: '56px 0', background: '#fff', color: '#1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1a1a1a', marginBottom: 16 }}>
                Why Train in {loc}?
              </h2>
              <p style={{ color: '#555', lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>{data.description}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {data.highlights.map((h) => (
                  <span key={h} style={{ background: '#f5f0e8', borderRadius: 20, padding: '5px 12px', fontSize: 13, color: '#1a1a1a' }}>✓ {h}</span>
                ))}
              </div>
            </div>
            <div style={{ background: '#f9f6f0', borderRadius: 12, padding: '24px 22px', color: '#1a1a1a' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700, color: '#1a1a1a' }}>📍 Location Details</h3>
              {[
                { label: 'Country', val: data.country },
                { label: 'Setting', val: data.setting },
                { label: 'Best Season', val: data.best_season },
                { label: 'Nearest Airport', val: data.airport },
              ].map(({ label, val }) => (
                <div key={label} style={{ borderBottom: '1px solid #e8e0d0', paddingBottom: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>{val}</div>
                </div>
              ))}
              <WaLink
                href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! I need travel help getting to ${loc} for Yoga TTC`)}`}
                style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#c9a84c', fontWeight: 600, marginTop: 8, textDecoration: 'none' }}
                target="_blank" rel="noopener noreferrer" label={`yoga_${location}_travel_wa`}>
                Need travel help? WhatsApp us →
              </WaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR PROGRAM ── */}
      <section style={{ padding: '64px 0', background: '#f9f6f0', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem,3vw,2.1rem)', color: '#1a1a1a', marginBottom: 10 }}>
            Choose Your Program in {loc}
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 48, fontSize: 15 }}>
            Three levels — same world-class curriculum, same stunning location.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {PROGRAM_META.map((meta) => {
              const prog = data.programs.find((p) => p.hours === meta.hours);
              if (!prog) return null;
              const price = prog.price_inr
                ? `From ₹${prog.price_inr.toLocaleString('en-IN')}${prog.price_usd ? ` / $${prog.price_usd}` : ''}`
                : `From $${prog.price_usd}`;
              return (
                <div key={meta.hours} style={{ background: '#fff', borderRadius: 14, border: `2px solid ${meta.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: meta.color, padding: '24px 24px 18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <span style={{ fontSize: 36 }}>{meta.icon}</span>
                      <span style={{ background: meta.border, color: '#1a1a1a', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700 }}>{meta.badge}</span>
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.3rem', color: '#1a1a1a' }}>{prog.hours}-Hour TTC</h3>
                    <p style={{ margin: 0, color: '#555', fontSize: 14 }}>{prog.subtitle}</p>
                  </div>
                  <div style={{ padding: '18px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        { label: 'Duration', val: `${prog.duration_days} days` },
                        { label: 'Certification', val: meta.cert },
                        { label: 'Ideal for', val: meta.ideal },
                        { label: 'Batch size', val: 'Max 15 students' },
                      ].map(({ label, val }) => (
                        <div key={label}>
                          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 600 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c9a84c', borderTop: '1px solid #eee', paddingTop: 12 }}>{price}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                      <Link href={`/yoga/${location}/${meta.slug}/`}
                        style={{ flex: 1, textAlign: 'center', background: '#1a1a2e', color: '#fff', padding: '11px 0', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        View Full Details →
                      </Link>
                    </div>
                    <WaLink
                      href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! I want to enquire about ${prog.hours}-Hour Yoga TTC in ${loc}`)}`}
                      style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#c9a84c', fontWeight: 600, textDecoration: 'none', paddingBottom: 4 }}
                      target="_blank" rel="noopener noreferrer" label={`yoga_${location}_${meta.hours}hr_hub_wa`}>
                      📲 WhatsApp to Enquire
                    </WaLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OTHER LOCATIONS ── */}
      <section style={{ padding: '56px 0', background: '#fff', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', color: '#1a1a1a', marginBottom: 28 }}>Also Training In</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {yogaData.filter((d) => d.slug !== location).map((d) => (
              <Link key={d.slug} href={`/yoga/${d.slug}/`}
                style={{ padding: '18px 32px', background: '#f9f6f0', borderRadius: 12, border: '1px solid #e8e0d0', textDecoration: 'none', textAlign: 'center', minWidth: 180 }}>
                <div style={{ fontSize: 26, marginBottom: 6 }}>🧘</div>
                <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 15, marginBottom: 3 }}>{d.slug.charAt(0).toUpperCase() + d.slug.slice(1)}</div>
                <div style={{ fontSize: 13, color: '#666' }}>{d.tagline.split('·')[0].trim()}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#1a1a2e', padding: '56px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', marginBottom: 12 }}>
            Ready to Train in {loc}?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto 28px', fontSize: 15 }}>
            Batches fill fast. WhatsApp us to check dates and reserve your spot.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! I want to book Yoga TTC in ${loc}`)}`}
              className="btn-gold-hero" target="_blank" rel="noopener noreferrer" label={`yoga_${location}_bottom_wa`}>
              📲 WhatsApp to Book
            </WaLink>
            <Link href="/yoga/" className="btn-outline-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              ← All Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
