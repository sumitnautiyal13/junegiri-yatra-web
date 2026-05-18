'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { CustomerSource } from '@/types/database';

const COUNTRIES = [
  'India', 'UK', 'USA', 'UAE', 'Singapore',
  'Australia', 'Canada', 'Germany', 'Other',
];

const SOURCES: { value: CustomerSource; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'website',  label: 'Website'  },
  { value: 'referral', label: 'Referral' },
  { value: 'other',    label: 'Other'    },
];

interface FormState {
  name: string;
  whatsapp: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  source: CustomerSource;
  notes: string;
}

const INITIAL: FormState = {
  name: '',
  whatsapp: '',
  email: '',
  phone: '',
  country: 'India',
  city: '',
  source: 'whatsapp',
  notes: '',
};

export default function NewLeadPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:     form.name.trim(),
          whatsapp: form.whatsapp.trim(),
          email:    form.email.trim() || null,
          phone:    form.phone.trim() || null,
          country:  form.country,
          city:     form.city.trim() || null,
          source:   form.source,
          notes:    form.notes.trim() || null,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Something went wrong. Please try again.');
        return;
      }

      router.push('/admin/leads');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  /* ── Styles ── */
  const page: React.CSSProperties = {
    minHeight: '100vh',
    background: '#07051A',
    color: '#e5e7eb',
    padding: '32px 24px',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const card: React.CSSProperties = {
    background: '#0D0A26',
    border: '1px solid #1e1a40',
    borderRadius: '14px',
    padding: '32px',
    maxWidth: '640px',
    margin: '0 auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 700,
    color: '#C9923D',
    margin: '0 0 28px',
  };

  const row: React.CSSProperties = {
    marginBottom: '20px',
  };

  const label: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#9ca3af',
    marginBottom: '6px',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
  };

  function inputStyle(name: string): React.CSSProperties {
    return {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '8px',
      border: focusedField === name ? '1.5px solid #C9923D' : '1px solid #2a2550',
      background: '#13102E',
      color: '#f3f4f6',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.15s',
    };
  }

  const grid2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  };

  const errorBox: React.CSSProperties = {
    background: '#3d0a0a',
    border: '1px solid #7f1d1d',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fca5a5',
    fontSize: '14px',
    marginBottom: '20px',
  };

  const footer: React.CSSProperties = {
    display: 'flex',
    gap: '12px',
    marginTop: '28px',
  };

  const saveBtnStyle: React.CSSProperties = {
    background: loading ? '#7a2e00' : '#E05C00',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background 0.15s',
  };

  const cancelStyle: React.CSSProperties = {
    background: 'transparent',
    color: '#9ca3af',
    border: '1px solid #2a2550',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={titleStyle}>Add New Lead</h1>

        {error && <div style={errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={row}>
            <label style={label} htmlFor="name">
              Name <span style={{ color: '#E05C00' }}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              style={inputStyle('name')}
              placeholder="Full name"
            />
          </div>

          {/* WhatsApp + Email */}
          <div style={{ ...row, ...grid2 }}>
            <div>
              <label style={label} htmlFor="whatsapp">
                WhatsApp <span style={{ color: '#E05C00' }}>*</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={form.whatsapp}
                onChange={handleChange}
                onFocus={() => setFocusedField('whatsapp')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('whatsapp')}
                placeholder="+91 98000 00000"
              />
            </div>
            <div>
              <label style={label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('email')}
                placeholder="optional"
              />
            </div>
          </div>

          {/* Phone + Country */}
          <div style={{ ...row, ...grid2 }}>
            <div>
              <label style={label} htmlFor="phone">
                Phone (alt)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('phone')}
                placeholder="optional"
              />
            </div>
            <div>
              <label style={label} htmlFor="country">
                Country <span style={{ color: '#E05C00' }}>*</span>
              </label>
              <select
                id="country"
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                onFocus={() => setFocusedField('country')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle('country'), appearance: 'none' }}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* City + Source */}
          <div style={{ ...row, ...grid2 }}>
            <div>
              <label style={label} htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField(null)}
                style={inputStyle('city')}
                placeholder="optional"
              />
            </div>
            <div>
              <label style={label} htmlFor="source">
                Source <span style={{ color: '#E05C00' }}>*</span>
              </label>
              <select
                id="source"
                name="source"
                required
                value={form.source}
                onChange={handleChange}
                onFocus={() => setFocusedField('source')}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle('source'), appearance: 'none' }}
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div style={row}>
            <label style={label} htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              onFocus={() => setFocusedField('notes')}
              onBlur={() => setFocusedField(null)}
              style={{ ...inputStyle('notes'), resize: 'vertical', lineHeight: 1.5 }}
              placeholder="How did they reach you? What are they looking for?"
            />
          </div>

          <div style={footer}>
            <button type="submit" disabled={loading} style={saveBtnStyle}>
              {loading ? 'Saving…' : 'Save Lead'}
            </button>
            <Link href="/admin/leads" style={cancelStyle}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
