import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { CustomerSource } from '@/types/database';

const VALID_SOURCES: CustomerSource[] = ['whatsapp', 'website', 'referral', 'other'];

function isValidSource(value: unknown): value is CustomerSource {
  return typeof value === 'string' && VALID_SOURCES.includes(value as CustomerSource);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, whatsapp, email, phone, country, city, source, notes } = body as {
      name?: unknown;
      whatsapp?: unknown;
      email?: unknown;
      phone?: unknown;
      country?: unknown;
      city?: unknown;
      source?: unknown;
      notes?: unknown;
    };

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!whatsapp || typeof whatsapp !== 'string' || whatsapp.trim() === '') {
      return NextResponse.json({ error: 'WhatsApp number is required.' }, { status: 400 });
    }
    if (!country || typeof country !== 'string' || country.trim() === '') {
      return NextResponse.json({ error: 'Country is required.' }, { status: 400 });
    }
    if (!isValidSource(source)) {
      return NextResponse.json(
        { error: `Source must be one of: ${VALID_SOURCES.join(', ')}.` },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any)
      .from('customers')
      .insert({
        name:     (name as string).trim(),
        whatsapp: (whatsapp as string).trim(),
        email:    typeof email === 'string' && email.trim() !== '' ? email.trim() : null,
        phone:    typeof phone === 'string' && phone.trim() !== '' ? phone.trim() : null,
        country:  (country as string).trim(),
        city:     typeof city === 'string' && city.trim() !== '' ? city.trim() : null,
        source:   source as CustomerSource,
        notes:    typeof notes === 'string' && notes.trim() !== '' ? notes.trim() : null,
      })
      .select()
      .single();

    if (error) {
      console.error('[POST /api/leads] Supabase error:', error);
      return NextResponse.json(
        { error: error.message ?? 'Failed to create lead.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, customer: data }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/leads] Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
