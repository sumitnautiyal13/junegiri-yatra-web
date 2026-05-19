'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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

export default function EditLeadPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/leads/${id}`)
      .then((r) => {
        if (r.status === 401) { router.push('/admin/login'); return null; }
        if (r.status === 404) { setError('Lead not found.'); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.customer) {
          const c = data.customer;
          setForm({
            name:     c.name ?? '',
            whatsapp: c.whatsapp ?? '',
            email:    c.email ?? '',
            phone:    c.phone ?? '',
            country:  c.country ?? 'India',
            city:     c.city ?? '',
            source:   c.source ?? 'whatsapp',
            notes:    c.notes ?? '',
          });
        } else {
          setError('Lead not found.');
        }
      })
      .catch(() => setError('Failed to load lead. Please check your connection.'))
      .finally(() => setFetching(false));
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => prev ? { ...prev, [name]: value } : prev);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
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
        setError(json.error ?? 'Something went wrong.');
        return;
      }
      router.push(`/admin/leads/${id}`);
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  /* ── Styles ── */
  const page: React.CSSProperties = {
    color: '#e5e7eb',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const card: React.CSSProperties = {
    background: '#0D0A26',
    border: '1px solid #1e1a40',
    borderRadius: '14px',
    padding: '32px',
    maxWidth: '680px',
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

  if (fetching) {
    return (
      <div style={{ ...page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <span style={{ color: 'rgba(255,248,238,0.3)', fontSize: '14px' }}>Loading…</span>
      </div>
    );
  }

  if (!form) {
    return (
      <div style={page}>
        <p style={{ color: '#fca5a5' }}>{error ?? 'Lead not found.'}</p>
        <Link href="/admin/leads" style={{ color: '#C9923D' }}>← Back to Leads</Link>
      </div>
    );
  }

  return (
    <div style={page}>
      <Link
        href={`/admin/leads/${id}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'rgba(255,248,238,0.4)', textDecoration: 'none', fontSize: '13px', marginBottom: '24px' }}
      >
        ← Back to Lead
      </Link>

      <div style={card}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#C9923D', margin: '0 0 28px', fontFamily: 'Poppins, Inter, sans-serif' }}>
          Edit Lead
        </h1>

        {error && (
          <div style={{ background: '#3d0a0a', border: '1px solid #7f1d1d', borderRadius: '8px', padding: '12px 16px', color: '#fca5a5', fontSize: '14px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={label} htmlFor="name">Name <span style={{ color: '#E05C00' }}>*</span></label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange}
              onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
              style={inputStyle('name')} placeholder="Full name" />
          </div>

          {/* WhatsApp + Email */}
          <div style={{ marginBottom: '20px', ...grid2 }}>
            <div>
              <label style={label} htmlFor="whatsapp">WhatsApp <span style={{ color: '#E05C00' }}>*</span></label>
              <input id="whatsapp" name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange}
                onFocus={() => setFocusedField('whatsapp')} onBlur={() => setFocusedField(null)}
                style={inputStyle('whatsapp')} placeholder="+91 98000 00000" />
            </div>
            <div>
              <label style={label} htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                style={inputStyle('email')} placeholder="optional" />
            </div>
          </div>

          {/* Phone + Country */}
          <div style={{ marginBottom: '20px', ...grid2 }}>
            <div>
              <label style={label} htmlFor="phone">Phone (alt)</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
                onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                style={inputStyle('phone')} placeholder="optional" />
            </div>
            <div>
              <label style={label} htmlFor="country">Country <span style={{ color: '#E05C00' }}>*</span></label>
              <select id="country" name="country" required value={form.country} onChange={handleChange}
                onFocus={() => setFocusedField('country')} onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle('country'), appearance: 'none' }}>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* City + Source */}
          <div style={{ marginBottom: '20px', ...grid2 }}>
            <div>
              <label style={label} htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={form.city} onChange={handleChange}
                onFocus={() => setFocusedField('city')} onBlur={() => setFocusedField(null)}
                style={inputStyle('city')} placeholder="optional" />
            </div>
            <div>
              <label style={label} htmlFor="source">Source <span style={{ color: '#E05C00' }}>*</span></label>
              <select id="source" name="source" required value={form.source} onChange={handleChange}
                onFocus={() => setFocusedField('source')} onBlur={() => setFocusedField(null)}
                style={{ ...inputStyle('source'), appearance: 'none' }}>
                {SOURCES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '28px' }}>
            <label style={label} htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={4} value={form.notes} onChange={handleChange}
              onFocus={() => setFocusedField('notes')} onBlur={() => setFocusedField(null)}
              style={{ ...inputStyle('notes'), resize: 'vertical', lineHeight: 1.5 }}
              placeholder="Inquiry details, travel preferences, budget…" />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{
              background: loading ? '#7a2e00' : '#E05C00',
              color: '#fff', border: 'none', borderRadius: '8px',
              padding: '12px 28px', fontSize: '15px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
            <Link href={`/admin/leads/${id}`} style={{
              background: 'transparent', color: '#9ca3af',
              border: '1px solid #2a2550', borderRadius: '8px',
              padding: '12px 20px', fontSize: '15px', fontWeight: 600,
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
