import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProposalEditor from './ProposalEditor';

export default async function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: proposal } = await supabase
    .from('proposals')
    .select('*, customers(*)')
    .eq('id', id)
    .single();

  if (!proposal) notFound();

  const { data: days } = await supabase
    .from('proposal_days')
    .select('*, proposal_items(*)')
    .eq('proposal_id', id)
    .order('day_number');

  const { data: pricing } = await supabase
    .from('proposal_pricing')
    .select('*')
    .eq('proposal_id', id)
    .single();

  return (
    <ProposalEditor
      proposal={proposal}
      days={days ?? []}
      pricing={pricing ?? null}
    />
  );
}
