import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { CustomerSource } from '@/types/database';

const VALID_SOURCES: CustomerSource[] = ['whatsapp', 'website', 'referral', 'other'];

/* ── GET /api/leads/[id] ─────────────────────────────────────────────────── */

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
  }

  return NextResponse.json({ customer: data });
}

/* ── PATCH /api/leads/[id] ───────────────────────────────────────────────── */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, whatsapp, email, phone, country, city, source, notes } = body as {
      name?: unknown; whatsapp?: unknown; email?: unknown; phone?: unknown;
      country?: unknown; city?: unknown; source?: unknown; notes?: unknown;
    };

    if (!name || typeof name !== 'string' || (name as string).trim() === '') {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!whatsapp || typeof whatsapp !== 'string' || (whatsapp as string).trim() === '') {
      return NextResponse.json({ error: 'WhatsApp number is required.' }, { status: 400 });
    }
    if (!country || typeof country !== 'string' || (country as string).trim() === '') {
      return NextResponse.json({ error: 'Country is required.' }, { status: 400 });
    }
    if (!source || !VALID_SOURCES.includes(source as CustomerSource)) {
      return NextResponse.json({ error: 'Invalid source.' }, { status: 400 });
    }

    const supabase = await createClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('customers')
      .update({
        name:     (name as string).trim(),
        whatsapp: (whatsapp as string).trim(),
        email:    typeof email === 'string' && (email as string).trim() !== '' ? (email as string).trim() : null,
        phone:    typeof phone === 'string' && (phone as string).trim() !== '' ? (phone as string).trim() : null,
        country:  (country as string).trim(),
        city:     typeof city === 'string' && (city as string).trim() !== '' ? (city as string).trim() : null,
        source:   source as CustomerSource,
        notes:    typeof notes === 'string' && (notes as string).trim() !== '' ? (notes as string).trim() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('[PATCH /api/leads/:id]', error);
      return NextResponse.json({ error: error?.message ?? 'Update failed.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, customer: data });
  } catch (err) {
    console.error('[PATCH /api/leads/:id] unexpected error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
