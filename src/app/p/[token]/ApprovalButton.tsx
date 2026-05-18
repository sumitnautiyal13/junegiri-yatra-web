'use client';

import { useState } from 'react';
import type { ProposalStatus } from '@/types/database';

interface ApprovalButtonProps {
  proposalId: string;
  proposalTitle: string;
  initialStatus: ProposalStatus;
}

export function ApprovalButton({ proposalId, proposalTitle, initialStatus }: ApprovalButtonProps) {
  const [status, setStatus] = useState<ProposalStatus>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAction(action: 'approved' | 'rejected') {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/proposals/${proposalId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      setStatus(action);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Success / terminal states
  if (status === 'approved') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f5132, #1a7a4a)',
          borderRadius: 16,
          padding: '28px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Itinerary Approved!
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          Thank you! Our team will contact you shortly to confirm the booking and share payment details.
        </div>
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #5c1a1a, #8a2f2f)',
          borderRadius: 16,
          padding: '28px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>✏️</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Changes Requested
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          We&apos;ve noted your feedback. Our team will send a revised proposal soon.
        </div>
      </div>
    );
  }

  if (status === 'booked') {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #3a2000, #6b4000)',
          borderRadius: 16,
          padding: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 8 }}>🎫</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#E8AA50' }}>
          Your trip is booked! See you on the trail.
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div
          style={{
            background: 'rgba(192,57,43,0.15)',
            border: '1px solid rgba(192,57,43,0.4)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 13,
            color: '#ff7f7f',
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      {/* Approve */}
      <button
        onClick={() => handleAction('approved')}
        disabled={loading}
        style={{
          width: '100%',
          padding: '16px',
          background: loading ? 'rgba(26,138,58,0.5)' : 'linear-gradient(135deg, #1a8a3a, #22a84a)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: 12,
          letterSpacing: '0.02em',
          transition: 'opacity 0.15s',
        }}
      >
        {loading ? 'Submitting…' : '✅ Approve This Itinerary'}
      </button>

      {/* Request changes */}
      <button
        onClick={() => handleAction('rejected')}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          color: 'rgba(255,248,238,0.6)',
          border: '1px solid rgba(255,248,238,0.2)',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 500,
          cursor: loading ? 'not-allowed' : 'pointer',
          letterSpacing: '0.02em',
          transition: 'all 0.15s',
        }}
      >
        ✏️ Request Changes
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/919873897652?text=${encodeURIComponent(`Hi! I'm reviewing my travel proposal: ${proposalTitle}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: 12,
          textDecoration: 'none',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        💬 WhatsApp Us
      </a>
    </div>
  );
}
