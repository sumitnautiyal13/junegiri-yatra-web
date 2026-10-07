'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface TrekEntry {
  name: string;
  image: string;
  tag: string;
  tagColor: string;
  difficulty: string;
  diffColor: string;
  duration: string;
  altitude: string;
  season: string;
  desc: string;
  price?: string;
  href: string;
  region: 'Uttarakhand' | 'Himachal';
}

/* ── Derived facets from the real data (no fragile parsing elsewhere) ── */
function diffBands(difficulty: string): string[] {
  const d = difficulty.toLowerCase();
  const bands: string[] = [];
  if (d.includes('easy')) bands.push('Easy');
  if (d.includes('moderate')) bands.push('Moderate');
  if (d.includes('difficult')) bands.push('Difficult');
  return bands.length ? bands : ['Moderate'];
}
function priceValue(price?: string): number {
  if (!price) return 0;
  const n = parseInt(price.replace(/[^0-9]/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}
function budgetBand(price?: string): string {
  const v = priceValue(price);
  if (v && v < 8000) return 'Under ₹8k';
  if (v && v <= 15000) return '₹8k–15k';
  return '₹15k+';
}

const REGIONS = ['All regions', 'Uttarakhand', 'Himachal'] as const;
const DIFFS = ['All levels', 'Easy', 'Moderate', 'Difficult'] as const;
const BUDGETS = ['Any budget', 'Under ₹8k', '₹8k–15k', '₹15k+'] as const;

function TrekCard(t: TrekEntry) {
  return (
    <Link href={t.href} className="trek-card-hover" style={{ display: 'block', textDecoration: 'none' }}>
      <div className="trek-card-inner">
        <div style={{ position: 'relative', height: 190 }}>
          <Image src={t.image} alt={t.name} fill sizes="400px" style={{ objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: 12, left: 12, background: t.tagColor, color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.tag}</span>
          <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: t.diffColor, fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20 }}>{t.difficulty}</span>
        </div>
        <div style={{ padding: '18px 20px 20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--heading)', marginBottom: 6 }}>{t.name}</h3>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 12, flexGrow: 1 }}>{t.desc}</p>
          <div style={{ display: 'flex', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>🕐 {t.duration}</span>
            <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>⛰️ {t.altitude}</span>
            <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>📅 {t.season}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>From</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold2)' }}>{t.price}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>/person</span></div>
            </div>
            <span style={{ background: 'var(--gold)', color: '#07051A', fontSize: 12, fontWeight: 700, padding: '9px 16px', borderRadius: 8 }}>View Trek →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TreksExplorer({ treks }: { treks: TrekEntry[] }) {
  const [region, setRegion] = useState<string>('All regions');
  const [diff, setDiff] = useState<string>('All levels');
  const [budget, setBudget] = useState<string>('Any budget');

  const filtered = useMemo(
    () =>
      treks.filter((t) => {
        if (region !== 'All regions' && t.region !== region) return false;
        if (diff !== 'All levels' && !diffBands(t.difficulty).includes(diff)) return false;
        if (budget !== 'Any budget' && budgetBand(t.price) !== budget) return false;
        return true;
      }),
    [treks, region, diff, budget]
  );

  const reset = () => { setRegion('All regions'); setDiff('All levels'); setBudget('Any budget'); };
  const active = region !== 'All regions' || diff !== 'All levels' || budget !== 'Any budget';

  const group = (
    label: string,
    options: readonly string[],
    value: string,
    set: (v: string) => void
  ) => (
    <div className="tf-group" role="group" aria-label={label}>
      <span className="tf-label">{label}</span>
      <div className="tf-chips">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`tf-chip${value === o ? ' active' : ''}`}
            aria-pressed={value === o}
            onClick={() => set(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="tf-bar">
        {group('Region', REGIONS, region, setRegion)}
        {group('Difficulty', DIFFS, diff, setDiff)}
        {group('Budget', BUDGETS, budget, setBudget)}
      </div>

      <div className="tf-count">
        <strong>{filtered.length}</strong> {filtered.length === 1 ? 'trek' : 'treks'}
        {active && (
          <button type="button" className="tf-reset" onClick={reset}>Clear filters</button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginTop: 20 }}>
          {filtered.map((t) => <TrekCard key={t.name} {...t} />)}
        </div>
      ) : (
        <div className="tf-empty">
          <p>No treks match those filters.</p>
          <button type="button" className="tf-chip active" onClick={reset}>Show all treks</button>
        </div>
      )}

      <style>{`
        .tf-bar { display: flex; flex-wrap: wrap; gap: 20px 32px; padding: 20px 22px; background: var(--card); border: 1px solid var(--border); border-radius: 14px; }
        .tf-group { display: flex; flex-direction: column; gap: 9px; }
        .tf-label { font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
        .tf-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .tf-chip { font-size: 13px; font-weight: 600; color: var(--text); background: var(--card2, rgba(0,0,0,0.03)); border: 1px solid var(--border); border-radius: 999px; padding: 7px 14px; min-height: 36px; cursor: pointer; transition: background .15s, color .15s, border-color .15s; }
        .tf-chip:hover { border-color: var(--gold); color: var(--gold2); }
        .tf-chip.active { background: var(--gold); border-color: var(--gold); color: #07051A; }
        .tf-chip:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
        .tf-count { margin-top: 18px; font-size: 13.5px; color: var(--muted); display: flex; align-items: center; gap: 14px; }
        .tf-count strong { color: var(--gold2); font-size: 15px; }
        .tf-reset { background: none; border: none; color: var(--gold2); font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .tf-empty { text-align: center; padding: 48px 20px; color: var(--muted); display: flex; flex-direction: column; gap: 14px; align-items: center; }
      `}</style>
    </div>
  );
}
