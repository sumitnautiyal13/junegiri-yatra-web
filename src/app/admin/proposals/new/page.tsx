'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Customer, ProposalCurrency } from '@/types/database';
import Link from 'next/link';

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENCIES: ProposalCurrency[] = ['INR', 'USD', 'AED', 'SGD', 'THB', 'EUR', 'GBP'];

// ─── Styles ───────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  background: '#13102E',
  border: '1px solid rgba(201,146,61,0.2)',
  color: 'rgba(255,248,238,0.88)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,248,238,0.48)',
  marginBottom: 6,
};

const fieldGroupStyle: React.CSSProperties = {
  marginBottom: 20,
};

// ─── Form State ───────────────────────────────────────────────────────────────

interface FormData {
  customer_id: string;
  title: string;
  destination: string;
  travel_date_from: string;
  travel_date_to: string;
  num_adults: number;
  num_children: number;
  currency: ProposalCurrency;
  message_to_customer: string;
  notes: string;
}

const defaultForm: FormData = {
  customer_id: '',
  title: '',
  destination: '',
  travel_date_from: '',
  travel_date_to: '',
  num_adults: 2,
  num_children: 0,
  currency: 'INR',
  message_to_customer: '',
  notes: '',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

function NewProposalForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledCustomerId = searchParams.get('customer_id');
  const supabase = createClient();

  const [form, setForm] = useState<FormData>(defaultForm);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load customers on mount, pre-select if customer_id in URL
  useEffect(() => {
    async function loadCustomers() {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) {
        const list = data as Customer[];
        setCustomers(list);
        setFilteredCustomers(list);
        // Pre-select customer if customer_id passed via URL
        if (prefilledCustomerId) {
          const match = list.find((c) => c.id === prefilledCustomerId);
          if (match) {
            setSelectedCustomer(match);
            setForm((f) => ({ ...f, customer_id: match.id }));
            setCustomerSearch(match.name);
          }
        }
      }
      setLoadingCustomers(false);
    }
    loadCustomers();
  }, [prefilledCustomerId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filter customers by search
  useEffect(() => {
    const q = customerSearch.toLowerCase();
    if (!q) {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(
        customers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            (c.email ?? '').toLowerCase().includes(q) ||
            c.whatsapp.includes(q) ||
            (c.city ?? '').toLowerCase().includes(q),
        ),
      );
    }
  }, [customerSearch, customers]);

  function handleCustomerSelect(customer: Customer) {
    setSelectedCustomer(customer);
    setForm((f) => ({ ...f, customer_id: customer.id }));
    setCustomerSearch(customer.name);
    setShowDropdown(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.customer_id) {
      setError('Please select a customer.');
      return;
    }
    if (!form.title || form.title.trim().length < 3) {
      setError('Proposal title must be at least 3 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          travel_date_from: form.travel_date_from || null,
          travel_date_to: form.travel_date_to || null,
          destination: form.destination || null,
          message_to_customer: form.message_to_customer || null,
          notes: form.notes || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error ?? 'Failed to create proposal');
      }
      router.push(`/admin/proposals/${json.proposal.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#07051A',
        color: 'rgba(255,248,238,0.88)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '32px 24px',
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/admin/proposals"
            style={{
              fontSize: 13,
              color: 'rgba(255,248,238,0.4)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 12,
            }}
          >
            ← Back to Proposals
          </Link>
          <h1
            style={{ margin: 0, fontSize: 26, fontWeight: 700, color: 'rgba(255,248,238,0.92)' }}
          >
            New Proposal
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'rgba(255,248,238,0.48)' }}>
            Fill in the details below. You&apos;ll build the itinerary in the next step.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 8,
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#EF4444',
              marginBottom: 20,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: '#0D0A26',
              borderRadius: 12,
              border: '1px solid rgba(201,146,61,0.15)',
              padding: '28px 28px',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9923D',
                marginBottom: 20,
              }}
            >
              Customer &amp; Trip Details
            </div>

            {/* Customer Select */}
            <div style={{ ...fieldGroupStyle, position: 'relative' }} ref={dropdownRef}>
              <label style={labelStyle}>
                Customer <span style={{ color: '#E05C00' }}>*</span>
              </label>
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => {
                  setCustomerSearch(e.target.value);
                  setShowDropdown(true);
                  if (!e.target.value) {
                    setSelectedCustomer(null);
                    setForm((f) => ({ ...f, customer_id: '' }));
                  }
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={loadingCustomers ? 'Loading customers...' : 'Search by name, email, or WhatsApp...'}
                disabled={loadingCustomers}
                style={{
                  ...inputStyle,
                  borderColor: selectedCustomer
                    ? 'rgba(34,197,94,0.4)'
                    : 'rgba(201,146,61,0.2)',
                }}
              />
              {selectedCustomer && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: 'rgba(255,248,238,0.48)',
                    display: 'flex',
                    gap: 8,
                  }}
                >
                  <span>{selectedCustomer.whatsapp}</span>
                  <span>·</span>
                  <span>
                    {selectedCustomer.city ? `${selectedCustomer.city}, ` : ''}
                    {selectedCustomer.country}
                  </span>
                </div>
              )}
              {showDropdown && filteredCustomers.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: '#181538',
                    border: '1px solid rgba(201,146,61,0.25)',
                    borderRadius: 8,
                    marginTop: 4,
                    maxHeight: 220,
                    overflowY: 'auto',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  {filteredCustomers.slice(0, 30).map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleCustomerSelect(c)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(201,146,61,0.08)',
                        color: 'rgba(255,248,238,0.88)',
                        cursor: 'pointer',
                        fontSize: 13,
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.4)', marginTop: 2 }}>
                        {c.whatsapp}
                        {c.city ? ` · ${c.city}` : ''}
                        {c.country ? `, ${c.country}` : ''}
                      </div>
                    </button>
                  ))}
                  <Link
                    href="/admin/leads/new"
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      color: '#C9923D',
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    + Add New Customer
                  </Link>
                </div>
              )}
              {showDropdown && !loadingCustomers && filteredCustomers.length === 0 && customerSearch && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: '#181538',
                    border: '1px solid rgba(201,146,61,0.25)',
                    borderRadius: 8,
                    marginTop: 4,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 14px',
                      color: 'rgba(255,248,238,0.4)',
                      fontSize: 13,
                    }}
                  >
                    No customers found for &ldquo;{customerSearch}&rdquo;
                  </div>
                  <Link
                    href="/admin/leads/new"
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      color: '#C9923D',
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderTop: '1px solid rgba(201,146,61,0.08)',
                    }}
                  >
                    + Add New Customer
                  </Link>
                </div>
              )}
            </div>

            {/* Proposal Title */}
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>
                Proposal Title <span style={{ color: '#E05C00' }}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Char Dham Yatra — Sharma Family June 2026"
                required
                minLength={3}
                style={inputStyle}
              />
            </div>

            {/* Destination */}
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Destination</label>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g. Char Dham Yatra, Kedarnath, Rishikesh"
                style={inputStyle}
              />
            </div>

            {/* Travel Dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>Travel Date From</label>
                <input
                  type="date"
                  name="travel_date_from"
                  value={form.travel_date_from}
                  onChange={handleChange}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Travel Date To</label>
                <input
                  type="date"
                  name="travel_date_to"
                  value={form.travel_date_to}
                  onChange={handleChange}
                  min={form.travel_date_from || undefined}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Adults, Children, Currency */}
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}
            >
              <div>
                <label style={labelStyle}>
                  Adults <span style={{ color: '#E05C00' }}>*</span>
                </label>
                <input
                  type="number"
                  name="num_adults"
                  value={form.num_adults}
                  onChange={handleChange}
                  min={1}
                  max={100}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Children</label>
                <input
                  type="number"
                  name="num_children"
                  value={form.num_children}
                  onChange={handleChange}
                  min={0}
                  max={100}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Currency</label>
                <select name="currency" value={form.currency} onChange={handleChange} style={inputStyle}>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Message & Notes */}
          <div
            style={{
              background: '#0D0A26',
              borderRadius: 12,
              border: '1px solid rgba(201,146,61,0.15)',
              padding: '28px 28px',
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9923D',
                marginBottom: 20,
              }}
            >
              Message &amp; Notes
            </div>

            {/* Message to Customer */}
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Message to Customer</label>
              <textarea
                name="message_to_customer"
                value={form.message_to_customer}
                onChange={handleChange}
                placeholder="Dear Rahul, please find your customized itinerary for the Char Dham Yatra..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
              <div style={{ fontSize: 11, color: 'rgba(255,248,238,0.32)', marginTop: 4 }}>
                This message is shown to the customer on the approval page.
              </div>
            </div>

            {/* Internal Notes */}
            <div style={{ ...fieldGroupStyle, marginBottom: 0 }}>
              <label style={labelStyle}>Internal Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Internal notes for the team — not visible to customer..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              type="submit"
              disabled={loading || !form.customer_id}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                background: loading || !form.customer_id ? 'rgba(224,92,0,0.4)' : '#E05C00',
                color: '#fff',
                border: 'none',
                fontSize: 15,
                fontWeight: 700,
                cursor: loading || !form.customer_id ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
                letterSpacing: '0.01em',
              }}
            >
              {loading ? 'Creating...' : 'Create & Build Itinerary →'}
            </button>
            <Link
              href="/admin/proposals"
              style={{
                padding: '12px 20px',
                borderRadius: 8,
                background: 'transparent',
                border: '1px solid rgba(201,146,61,0.2)',
                color: 'rgba(255,248,238,0.56)',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewProposalPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#07051A", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "rgba(255,248,238,0.4)", fontFamily: "Inter, sans-serif" }}>Loading…</span></div>}>
      <NewProposalForm />
    </Suspense>
  );
}
