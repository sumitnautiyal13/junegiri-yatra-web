import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import WaLink from '@/components/WaLink';
import yogaData from '../../../../../data/yoga-programs.json';

const HOURS_MAP: Record<string, number> = { '100hours': 100, '200hours': 200, '300hours': 300 };

export function generateStaticParams() {
  const params: { location: string; hours: string }[] = [];
  for (const loc of yogaData) {
    for (const slug of Object.keys(HOURS_MAP)) {
      params.push({ location: loc.slug, hours: slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ location: string; hours: string }> }): Promise<Metadata> {
  const { location, hours } = await params;
  const hoursNum = HOURS_MAP[hours];
  if (!hoursNum) return {};
  const locData = yogaData.find((d) => d.slug === location);
  if (!locData) return {};
  const prog = locData.programs.find((p) => p.hours === hoursNum);
  if (!prog) return {};
  const loc = location.charAt(0).toUpperCase() + location.slice(1);
  const priceStr = prog.price_inr ? `from ₹${(prog.price_inr / 1000).toFixed(0)}k` : `from $${prog.price_usd}`;

  return {
    title: `${hoursNum}-Hour Yoga Teacher Training in ${loc} | ${prog.certification.split('(')[0].trim()} | Junegiri Yatra`,
    description: `${hoursNum}-hour Yoga TTC in ${loc} — ${prog.duration_days} days, ${prog.style}. ${prog.certification}. All-inclusive (accommodation, meals, kit). ${priceStr}. Enrol now.`,
    keywords: [
      `${hoursNum} hour yoga teacher training ${location}`,
      `yoga TTC ${location} ${hoursNum}hr`,
      `${hoursNum}hr yoga course ${location}`,
      `${prog.certification.toLowerCase()} ${location}`,
    ],
    alternates: { canonical: `https://junegiriyatra.com/yoga/${location}/${hours}/` },
    openGraph: {
      title: `${hoursNum}-Hour Yoga TTC in ${loc} | Junegiri Yatra`,
      description: `${prog.duration_days}-day program · ${prog.style} · ${prog.certification}`,
      images: [{ url: `https://junegiriyatra.com${locData.hero_image}` }],
    },
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function YogaProgramPage({ params }: { params: Promise<{ location: string; hours: string }> }) {
  const { location, hours } = await params;
  const hoursNum = HOURS_MAP[hours];
  if (!hoursNum) notFound();
  const locData = yogaData.find((d) => d.slug === location);
  if (!locData) notFound();
  const prog = locData.programs.find((p) => p.hours === hoursNum);
  if (!prog) notFound();

  const loc = location.charAt(0).toUpperCase() + location.slice(1);
  const priceDisplay = prog.price_inr
    ? `₹${prog.price_inr.toLocaleString('en-IN')} / $${prog.price_usd}`
    : `$${prog.price_usd}`;
  const waText = `Namaste! I want to enquire about ${hoursNum}-Hour Yoga TTC in ${loc}`;

  const otherPrograms = locData.programs.filter((p) => p.hours !== hoursNum);

  return (
    <div style={{ color: '#1a1a1a' }}>
      {/* ── HERO ── */}
      <section className="city-hero">
        <Image src={locData.hero_image} alt={`${hoursNum}-Hour Yoga Teacher Training in ${loc}`}
          fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div className="city-hero-overlay" />
        <div className="container city-hero-inner" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 48, margin: 0, lineHeight: 1 }}>🧘</p>
          <h1 className="city-hero-h1" style={{ marginTop: 10 }}>
            {hoursNum}-Hour Yoga Teacher Training
          </h1>
          <p className="city-hero-sub" style={{ maxWidth: 520, margin: '10px auto 6px' }}>
            {locData.tagline}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: '0 auto 28px', maxWidth: 480 }}>
            {prog.style} · {prog.duration_days} days · {prog.certification.split('(')[0].trim()}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, padding: '10px 24px', fontWeight: 800, fontSize: '1.2rem' }}>
              From {priceDisplay}
            </div>
          </div>
          <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(waText)}`}
            className="btn-gold-hero" target="_blank" rel="noopener noreferrer"
            label={`yoga_${location}_${hoursNum}hr_hero_wa`}>
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
            <li><Link href={`/yoga/${location}/`}>{loc}</Link></li>
            <li>{hoursNum}-Hour TTC</li>
          </ol>
        </div>
      </nav>

      {/* ── QUICK STATS ── */}
      <section style={{ background: '#1a1a2e', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: 'Duration', val: `${prog.duration_days} Days` },
              { label: 'Style', val: prog.style.split(':')[1]?.trim() || prog.style },
              { label: 'Certification', val: prog.certification.split('(')[0].trim() },
              { label: 'Batch Size', val: 'Max 15 Students' },
              { label: 'Starting Price', val: priceDisplay },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                <div style={{ color: '#c9a84c', fontWeight: 700, fontSize: 15, marginTop: 3 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREREQUISITE WARNING ── */}
      {'prerequisite' in prog && prog.prerequisite && (
        <div style={{ background: '#fff8e7', borderTop: '3px solid #c9a84c', padding: '14px 0' }}>
          <div className="container">
            <p style={{ margin: 0, fontSize: 14, color: '#1a1a1a' }}>
              ⚠️ <strong>Prerequisite:</strong> {prog.prerequisite}
            </p>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding: '56px 0', background: '#fff', color: '#1a1a1a' }}>
        <div className="container">
          <div className="yoga-detail-layout">

            {/* ── LEFT COLUMN ── */}
            <div style={{ color: '#1a1a1a' }}>

              {/* Curriculum */}
              <h2 style={{ fontSize: '1.3rem', color: '#1a1a1a', marginBottom: 20 }}>Curriculum Overview</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 48 }}>
                {prog.curriculum.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14, padding: '14px 16px',
                    background: i % 2 === 0 ? '#f9f6f0' : '#fff',
                    border: '1px solid #ede8df', borderRadius: 8,
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: '#c9a84c', color: '#1a1a1a',
                      fontWeight: 800, fontSize: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a', marginBottom: 3 }}>{c.module}</div>
                      <div style={{ fontSize: 13, color: '#555', lineHeight: 1.55 }}>{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Schedule */}
              <h2 style={{ fontSize: '1.3rem', color: '#1a1a1a', marginBottom: 20 }}>A Typical Day</h2>
              <div style={{ border: '1px solid #e8e0d0', borderRadius: 10, overflow: 'hidden', marginBottom: 48 }}>
                {prog.daily_schedule.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, padding: '11px 18px', alignItems: 'center',
                    background: i % 2 === 0 ? '#fff' : '#f9f6f0',
                    borderBottom: i < prog.daily_schedule.length - 1 ? '1px solid #ede8df' : 'none',
                  }}>
                    <div style={{ minWidth: 78, fontWeight: 700, fontSize: 13, color: '#c9a84c' }}>{s.time}</div>
                    <div style={{ fontSize: 14, color: '#1a1a1a' }}>{s.activity}</div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              {prog.faq && prog.faq.length > 0 && (
                <>
                  <h2 style={{ fontSize: '1.3rem', color: '#1a1a1a', marginBottom: 20 }}>
                    Frequently Asked Questions
                  </h2>
                  <div style={{ marginBottom: 32 }}>
                    {prog.faq.map(({ q, a }) => (
                      <details key={q} style={{ borderBottom: '1px solid #e0d8cc', padding: '15px 0' }}>
                        <summary style={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', color: '#1a1a1a', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {q}
                          <span style={{ color: '#c9a84c', fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                        </summary>
                        <p style={{ margin: '12px 0 0', color: '#555', lineHeight: 1.7, fontSize: 14 }}>{a}</p>
                      </details>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="yoga-detail-sidebar">

              {/* Price + CTA */}
              <div style={{ border: '2px solid #c9a84c', borderRadius: 12, padding: '22px 20px', background: '#fff', color: '#1a1a1a' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 3 }}>
                  From {priceDisplay}
                </div>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>Per person · All-inclusive</div>
                <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(waText)}`}
                  className="btn-gold-hero"
                  style={{ width: '100%', textAlign: 'center', display: 'block', marginBottom: 10 }}
                  target="_blank" rel="noopener noreferrer"
                  label={`yoga_${location}_${hoursNum}hr_sidebar_wa`}>
                  📲 WhatsApp to Enquire
                </WaLink>
                <a href="tel:+919873897652"
                  style={{ display: 'block', textAlign: 'center', fontSize: 14, color: '#666', padding: '8px 0', textDecoration: 'none' }}>
                  📞 +91 98738 97652
                </a>
              </div>

              {/* What's Included */}
              <div style={{ border: '1px solid #e8e0d0', borderRadius: 12, padding: '20px', background: '#fff', color: '#1a1a1a' }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a' }}>✅ What&apos;s Included</h3>
                {prog.included.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 9, fontSize: 13, alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: '#1a1a1a' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Not Included */}
              <div style={{ border: '1px solid #e8e0d0', borderRadius: 12, padding: '20px', background: '#fff', color: '#1a1a1a' }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a' }}>❌ Not Included</h3>
                {prog.not_included.map((item) => (
                  <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 9, fontSize: 13, alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }}>✕</span>
                    <span style={{ color: '#555' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Upcoming Batches */}
              <div style={{ border: '1px solid #e8e0d0', borderRadius: 12, padding: '20px', background: '#fff', color: '#1a1a1a' }}>
                <h3 style={{ margin: '0 0 14px', fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a' }}>📅 Upcoming Batches</h3>
                {prog.upcoming_batches.map((b) => (
                  <div key={b.start} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, padding: '9px 11px', background: '#f9f6f0', borderRadius: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: '#1a1a1a' }}>{formatDate(b.start)}</div>
                      <div style={{ color: '#888', fontSize: 12 }}>to {formatDate(b.end)}</div>
                    </div>
                    <span style={{ background: b.status === 'open' ? '#dcfce7' : '#fee2e2', color: b.status === 'open' ? '#166534' : '#991b1b', borderRadius: 20, padding: '3px 11px', fontSize: 11, fontWeight: 700 }}>
                      {b.status === 'open' ? 'Open' : 'Full'}
                    </span>
                  </div>
                ))}
                <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! Please confirm batch availability for ${hoursNum}hr Yoga TTC in ${loc}`)}`}
                  style={{ display: 'block', textAlign: 'center', fontSize: 13, color: '#c9a84c', fontWeight: 600, marginTop: 8, textDecoration: 'none' }}
                  target="_blank" rel="noopener noreferrer" label={`yoga_${location}_${hoursNum}hr_batches_wa`}>
                  Check more dates →
                </WaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER PROGRAMS AT THIS LOCATION ── */}
      <section style={{ padding: '56px 0', background: '#f9f6f0', color: '#1a1a1a' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '1.4rem', color: '#1a1a1a', marginBottom: 10 }}>
            Other Programs in {loc}
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 32, fontSize: 14 }}>
            Upgrade your training or start from the beginning.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {otherPrograms.map((p) => {
              const otherSlug = Object.entries(HOURS_MAP).find(([, v]) => v === p.hours)?.[0] ?? '';
              const otherPrice = p.price_inr ? `From ₹${(p.price_inr / 1000).toFixed(0)}k` : `From $${p.price_usd}`;
              return (
                <Link key={p.hours} href={`/yoga/${location}/${otherSlug}/`}
                  style={{ padding: '20px 28px', background: '#fff', borderRadius: 12, border: '1px solid #e8e0d0', textDecoration: 'none', textAlign: 'center', minWidth: 200 }}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>🧘</div>
                  <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 15, marginBottom: 4 }}>{p.hours}-Hour TTC</div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{p.duration_days} days</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#c9a84c' }}>{otherPrice}</div>
                </Link>
              );
            })}
            <Link href={`/yoga/${location}/`}
              style={{ padding: '20px 28px', background: '#fff', borderRadius: 12, border: '1px solid #e8e0d0', textDecoration: 'none', textAlign: 'center', minWidth: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>📍</div>
              <div style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 15, marginBottom: 4 }}>All {loc} Programs</div>
              <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>Compare all levels →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: '#1a1a2e', padding: '56px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', marginBottom: 12 }}>
            Secure Your Spot — {hoursNum}-Hour TTC in {loc}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto 28px', fontSize: 15 }}>
            Batches fill months in advance. WhatsApp us to confirm availability.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <WaLink href={`https://wa.me/919873897652?text=${encodeURIComponent(`Namaste! I want to book ${hoursNum}hr Yoga TTC in ${loc} — please confirm dates`)}`}
              className="btn-gold-hero" target="_blank" rel="noopener noreferrer"
              label={`yoga_${location}_${hoursNum}hr_bottom_wa`}>
              📲 WhatsApp to Book
            </WaLink>
            <Link href={`/yoga/${location}/`} className="btn-outline-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              ← {loc} Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
