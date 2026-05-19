import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // Derive origin from the request URL so this works on any deployment (preview, prod, local)
  const url = new URL('/admin/login', request.url);
  return NextResponse.redirect(url);
}
