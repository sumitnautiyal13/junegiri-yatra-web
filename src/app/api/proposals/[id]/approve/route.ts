import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ProposalStatus } from '@/types/database';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let body: { action?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { action } = body;

    if (action !== 'approved' && action !== 'rejected') {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approved" or "rejected".' },
        { status: 400 }
      );
    }

    // Use server client (anon key via RLS — public action initiated via share_token page)
    const supabase = await createClient();

    // Verify proposal exists
    const { data: proposalRaw, error: fetchError } = await supabase
      .from('proposals')
      .select('id, status')
      .eq('id', id)
      .single();

    if (fetchError || !proposalRaw) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    // Cast away `never` from typed Supabase client
    const proposal = proposalRaw as unknown as { id: string; status: ProposalStatus };

    // Prevent re-approving a booked proposal
    if (proposal.status === 'booked') {
      return NextResponse.json({ error: 'Cannot modify a booked proposal' }, { status: 409 });
    }

    // Update proposal status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatePayload: any = {
      status: action as ProposalStatus,
      approved_at: action === 'approved' ? new Date().toISOString() : null,
    };
    const { error: updateError } = await (supabase.from('proposals') as any)
      .update(updatePayload)
      .eq('id', id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Log event (best-effort — don't fail the request if this errors)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await supabase.from('proposal_events').insert({
      proposal_id: id,
      event: action,
      actor: 'customer',
    } as any);

    return NextResponse.json({ success: true, status: action });
  } catch (err) {
    console.error('[approve route] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
