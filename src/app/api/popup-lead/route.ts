import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Public endpoint — uses service role key (bypasses RLS) for popup lead capture
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      name?: string;
      whatsapp?: string;
      interest?: string;
      page?: string;
    };

    const name = body.name?.trim() ?? '';
    const whatsapp = body.whatsapp?.trim() ?? '';

    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!whatsapp || whatsapp.length < 7) {
      return NextResponse.json({ error: 'WhatsApp number is required.' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );

    const notes = [
      body.interest ? `Interest: ${body.interest}` : '',
      body.page ? `Source page: ${body.page}` : '',
      'Captured via: exit-intent popup',
    ].filter(Boolean).join(' | ');

    await supabase.from('customers').insert({
      name,
      whatsapp,
      country: 'Unknown',
      source: 'website',
      notes,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
