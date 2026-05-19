'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type {
  Proposal,
  Customer,
  ProposalDay,
  ProposalItem,
  ProposalPricing,
  ItemType,
  ProposalStatus,
} from '@/types/database';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  proposal: Proposal & { customers: Customer };
  days: (ProposalDay & { proposal_items: ProposalItem[] })[];
  pricing: ProposalPricing | null;
}

interface AddingItem {
  dayId: string;
  type: ItemType;
}

interface NewItemForm {
  timing: string;
  name: string;
  description: string;
}

type DayWithItems = ProposalDay & { proposal_items: ProposalItem[] };

// ─── Constants ────────────────────────────────────────────────────────────────

const ITEM_ICONS: Record<ItemType, string> = {
  hotel: '🏨',
  activity: '🎯',
  transport: '🚌',
  meal: '🍽️',
  note: '📝',
};

const ITEM_LABELS: Record<ItemType, string> = {
  hotel: 'Hotel',
  activity: 'Activity',
  transport: 'Transport',
  meal: 'Meal',
  note: 'Note',
};

const ITEM_TYPES: ItemType[] = ['hotel', 'activity', 'transport', 'meal', 'note'];

const STATUS_COLORS: Record<ProposalStatus, { bg: string; text: string }> = {
  draft: { bg: 'rgba(100,100,120,0.25)', text: 'rgba(255,248,238,0.6)' },
  sent: { bg: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
  approved: { bg: 'rgba(34,197,94,0.2)', text: '#4ade80' },
  rejected: { bg: 'rgba(239,68,68,0.2)', text: '#f87171' },
  booked: { bg: 'rgba(201,146,61,0.25)', text: '#C9923D' },
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹', USD: '$', AED: 'AED ', SGD: 'S$', THB: '฿', EUR: '€', GBP: '£',
};

const DEFAULT_INCLUSIONS = [
  'Accommodation as per itinerary',
  'Daily breakfast',
  'All transfers and transportation',
  'GST & service taxes',
];

const DEFAULT_EXCLUSIONS = [
  'Airfare / train tickets',
  'Personal expenses',
  'Travel insurance',
  'Meals not mentioned',
];

// ─── CSS Variables ─────────────────────────────────────────────────────────────

const CSS = `
  :root {
    --bg: #07051A;
    --card: #0D0A26;
    --card2: #13102E;
    --card3: #181538;
    --gold: #C9923D;
    --gold2: #E8AA50;
    --saffron: #E05C00;
    --border: rgba(201,146,61,0.15);
    --text: rgba(255,248,238,0.88);
    --muted: rgba(255,248,238,0.48);
  }

  .pe-input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(201,146,61,0.2);
    color: rgba(255,248,238,0.88);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
    font-family: inherit;
  }
  .pe-input:focus {
    border-color: #C9923D;
    box-shadow: 0 0 0 2px rgba(201,146,61,0.12);
  }
  .pe-input::placeholder {
    color: rgba(255,248,238,0.3);
  }

  .pe-textarea {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(201,146,61,0.2);
    color: rgba(255,248,238,0.88);
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 72px;
    font-family: inherit;
    line-height: 1.5;
  }
  .pe-textarea:focus {
    border-color: #C9923D;
    box-shadow: 0 0 0 2px rgba(201,146,61,0.12);
  }
  .pe-textarea::placeholder {
    color: rgba(255,248,238,0.3);
  }

  .pe-item-row:hover {
    background: rgba(201,146,61,0.06);
  }

  .pe-day-delete:hover {
    color: #f87171 !important;
  }

  .pe-list-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(201,146,61,0.1);
    border: 1px solid rgba(201,146,61,0.2);
    border-radius: 20px;
    padding: 4px 10px 4px 12px;
    font-size: 13px;
    color: rgba(255,248,238,0.88);
    flex-wrap: nowrap;
  }
  .pe-list-tag button:hover {
    color: #f87171;
  }

  .pe-type-btn:hover {
    background: rgba(201,146,61,0.2) !important;
    border-color: rgba(201,146,61,0.5) !important;
  }
  .pe-type-btn.active {
    background: rgba(201,146,61,0.25) !important;
    border-color: #C9923D !important;
  }

  @keyframes savedFlash {
    0% { opacity: 1; }
    70% { opacity: 1; }
    100% { opacity: 0; }
  }
  .saved-flash {
    animation: savedFlash 2s forwards;
  }
`;

// ─── Helper: compute totals ────────────────────────────────────────────────────

function computeTotals(p: ProposalPricing | null, numAdults: number, numChildren: number) {
  if (!p) return { adultSub: 0, childSub: 0, subtotal: 0, discount: 0, gst: 0, total: 0, perPerson: 0 };
  const adultSub = p.base_price_per_person * numAdults;
  const childSub = p.child_price_per_person * numChildren;
  const subtotal = adultSub + childSub;
  const discount = subtotal * (p.group_discount_pct / 100);
  const afterDiscount = subtotal - discount;
  const gst = p.apply_gst ? afterDiscount * (p.gst_pct / 100) : 0;
  const total = afterDiscount + gst;
  const pax = numAdults + numChildren;
  const perPerson = pax > 0 ? total / pax : 0;
  return { adultSub, childSub, subtotal, discount, gst, total, perPerson };
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProposalStatus }) {
  const colors = STATUS_COLORS[status];
  return (
    <span style={{
      display: 'inline-block',
      background: colors.bg,
      color: colors.text,
      borderRadius: 20,
      padding: '3px 12px',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>
      {status}
    </span>
  );
}

function SavedIndicator({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="saved-flash" style={{
      color: '#4ade80',
      fontSize: 13,
      marginLeft: 8,
    }}>
      Saved ✓
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProposalEditor({ proposal: initialProposal, days: initialDays, pricing: initialPricing }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any;

  // ── State ──────────────────────────────────────────────────────────────────
  const [proposal, setProposal] = useState(initialProposal);
  const [days, setDays] = useState<DayWithItems[]>(
    initialDays.map(d => ({
      ...d,
      proposal_items: [...(d.proposal_items ?? [])].sort((a, b) => a.sort_order - b.sort_order),
    }))
  );
  const [pricing, setPricing] = useState<ProposalPricing | null>(
    initialPricing ?? null
  );

  const [expandedDays, setExpandedDays] = useState<Set<string>>(
    () => new Set(initialDays.map(d => d.id))
  );
  const [addingItem, setAddingItem] = useState<AddingItem | null>(null);
  const [newItemForm, setNewItemForm] = useState<NewItemForm>({ timing: '', name: '', description: '' });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemForm, setEditingItemForm] = useState<NewItemForm>({ timing: '', name: '', description: '' });
  const [editingTitle, setEditingTitle] = useState(false);

  const [saving, setSaving] = useState(false);
  const [savingPricing, setSavingPricing] = useState(false);
  const [savedAll, setSavedAll] = useState(false);
  const [savedPricing, setSavedPricing] = useState(false);

  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');

  const [inclusions, setInclusions] = useState<string[]>(
    initialPricing?.inclusions?.length ? initialPricing.inclusions : DEFAULT_INCLUSIONS
  );
  const [exclusions, setExclusions] = useState<string[]>(
    initialPricing?.exclusions?.length ? initialPricing.exclusions : DEFAULT_EXCLUSIONS
  );
  const [paymentTerms, setPaymentTerms] = useState(initialPricing?.payment_terms ?? '');

  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [actionIsError, setActionIsError] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const currSymbol = CURRENCY_SYMBOLS[proposal.currency] ?? '';
  const totals = computeTotals(pricing, proposal.num_adults, proposal.num_children);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const flashSaved = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2200);
  };

  const toggleDay = useCallback((dayId: string) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(dayId)) next.delete(dayId);
      else next.add(dayId);
      return next;
    });
  }, []);

  // ── Save All ───────────────────────────────────────────────────────────────
  const handleSaveAll = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const { error: propErr } = await supabase
        .from('proposals')
        .update({ title: proposal.title, notes: proposal.notes, message_to_customer: proposal.message_to_customer })
        .eq('id', proposal.id);
      if (propErr) throw propErr;

      for (const day of days) {
        const { error: dayErr } = await supabase
          .from('proposal_days')
          .update({ title: day.title, overview: day.overview, date: day.date })
          .eq('id', day.id);
        if (dayErr) throw dayErr;
      }

      flashSaved(setSavedAll);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed. Please try again.';
      setSaveError(msg);
    } finally {
      setSaving(false);
    }
  };

  // ── Day Operations ─────────────────────────────────────────────────────────
  const handleAddDay = async () => {
    const maxDay = days.reduce((m, d) => Math.max(m, d.day_number), 0);
    const dayNum = maxDay + 1;
    const { data, error } = await supabase
      .from('proposal_days')
      .insert({
        proposal_id: proposal.id,
        day_number: dayNum,
        title: `Day ${dayNum}`,
        date: null,
        overview: null,
      })
      .select()
      .single();

    if (!error && data) {
      const newDay: DayWithItems = { ...data, proposal_items: [] };
      setDays(prev => [...prev, newDay]);
      setExpandedDays(prev => new Set([...prev, data.id]));
    }
  };

  const handleDeleteDay = async (dayId: string) => {
    if (!confirm('Delete this day and all its items?')) return;
    await supabase.from('proposal_days').delete().eq('id', dayId);
    setDays(prev => prev.filter(d => d.id !== dayId));
  };

  const handleDayFieldChange = (dayId: string, field: keyof ProposalDay, value: string) => {
    setDays(prev => prev.map(d => d.id === dayId ? { ...d, [field]: value } : d));
  };

  const handleSaveDay = async (dayId: string) => {
    const day = days.find(d => d.id === dayId);
    if (!day) return;
    try {
      const { error } = await supabase
        .from('proposal_days')
        .update({ title: day.title, overview: day.overview, date: day.date })
        .eq('id', dayId);
      if (error) console.error('Failed to save day:', error.message);
    } catch (e) {
      console.error('Failed to save day:', e);
    }
  };

  // ── Item Operations ────────────────────────────────────────────────────────
  const startAddItem = (dayId: string, type: ItemType) => {
    setAddingItem({ dayId, type });
    setNewItemForm({ timing: '', name: '', description: '' });
  };

  const cancelAddItem = () => {
    setAddingItem(null);
    setNewItemForm({ timing: '', name: '', description: '' });
  };

  const handleSaveNewItem = async () => {
    if (!addingItem || !newItemForm.name.trim()) return;
    const day = days.find(d => d.id === addingItem.dayId);
    if (!day) return;
    const sortOrder = (day.proposal_items?.length ?? 0);

    const { data, error } = await supabase
      .from('proposal_items')
      .insert({
        day_id: addingItem.dayId,
        type: addingItem.type,
        name: newItemForm.name.trim(),
        description: newItemForm.description.trim() || null,
        timing: newItemForm.timing.trim() || null,
        icon: ITEM_ICONS[addingItem.type],
        sort_order: sortOrder,
      })
      .select()
      .single();

    if (!error && data) {
      setDays(prev => prev.map(d =>
        d.id === addingItem.dayId
          ? { ...d, proposal_items: [...(d.proposal_items ?? []), data] }
          : d
      ));
      cancelAddItem();
    }
  };

  const startEditItem = (item: ProposalItem) => {
    setEditingItemId(item.id);
    setEditingItemForm({
      timing: item.timing ?? '',
      name: item.name,
      description: item.description ?? '',
    });
  };

  const cancelEditItem = () => {
    setEditingItemId(null);
  };

  const handleSaveEditItem = async (item: ProposalItem) => {
    await supabase
      .from('proposal_items')
      .update({
        name: editingItemForm.name.trim(),
        description: editingItemForm.description.trim() || null,
        timing: editingItemForm.timing.trim() || null,
      })
      .eq('id', item.id);

    setDays(prev => prev.map(d => ({
      ...d,
      proposal_items: d.proposal_items.map(i =>
        i.id === item.id
          ? { ...i, name: editingItemForm.name.trim(), description: editingItemForm.description.trim() || null, timing: editingItemForm.timing.trim() || null }
          : i
      ),
    })));
    cancelEditItem();
  };

  const handleDeleteItem = async (dayId: string, itemId: string) => {
    await supabase.from('proposal_items').delete().eq('id', itemId);
    setDays(prev => prev.map(d =>
      d.id === dayId
        ? { ...d, proposal_items: d.proposal_items.filter(i => i.id !== itemId) }
        : d
    ));
  };

  // ── Pricing ────────────────────────────────────────────────────────────────
  const handlePricingChange = (field: keyof ProposalPricing, value: number | boolean) => {
    setPricing(prev => {
      if (!prev) {
        return {
          id: '',
          proposal_id: proposal.id,
          base_price_per_person: 0,
          child_price_per_person: 0,
          group_discount_pct: 0,
          gst_pct: 5,
          apply_gst: true,
          total_price: 0,
          inclusions,
          exclusions,
          payment_terms: null,
          created_at: '',
          updated_at: '',
          [field]: value,
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSavePricing = async () => {
    setSavingPricing(true);
    try {
      const t = computeTotals(pricing, proposal.num_adults, proposal.num_children);
      const payload = {
        proposal_id: proposal.id,
        base_price_per_person: pricing?.base_price_per_person ?? 0,
        child_price_per_person: pricing?.child_price_per_person ?? 0,
        group_discount_pct: pricing?.group_discount_pct ?? 0,
        gst_pct: pricing?.gst_pct ?? 5,
        apply_gst: pricing?.apply_gst ?? true,
        total_price: t.total,
        inclusions,
        exclusions,
        payment_terms: paymentTerms || null,
      };

      if (pricing?.id) {
        await supabase.from('proposal_pricing').update(payload).eq('id', pricing.id);
      } else {
        const { data } = await supabase.from('proposal_pricing').insert(payload).select().single();
        if (data) setPricing(data);
      }
      flashSaved(setSavedPricing);
    } finally {
      setSavingPricing(false);
    }
  };

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleSendToCustomer = async () => {
    const link = `${window.location.origin}/p/${proposal.share_token}`;
    setShareLink(link);
    setActionIsError(false);
    try {
      await navigator.clipboard.writeText(link);
      setActionStatus('Link copied to clipboard!');
    } catch {
      setActionStatus('Link ready — copy it manually below.');
    }
    try {
      const { error } = await supabase.from('proposals').update({ status: 'sent' }).eq('id', proposal.id);
      if (error) throw error;
      setProposal(prev => ({ ...prev, status: 'sent' }));
    } catch {
      // Non-critical: link was already copied, status update failure is minor
      console.error('Failed to update status to sent');
    }
    setTimeout(() => setActionStatus(null), 4000);
  };

  const handleMarkBooked = async () => {
    if (!confirm('Mark this proposal as booked?')) return;
    setActionIsError(false);
    try {
      const { error } = await supabase.from('proposals').update({ status: 'booked' }).eq('id', proposal.id);
      if (error) throw error;
      setProposal(prev => ({ ...prev, status: 'booked' }));
      setActionStatus('Proposal marked as booked!');
      setTimeout(() => setActionStatus(null), 3000);
    } catch {
      setActionIsError(true);
      setActionStatus('Failed to update status. Please try again.');
      setTimeout(() => { setActionStatus(null); setActionIsError(false); }, 4000);
    }
  };

  const handleDuplicate = async () => {
    setActionIsError(false);
    setActionStatus('Duplicating...');
    try {
      const { data: newProposal, error } = await supabase
        .from('proposals')
        .insert({
          customer_id: proposal.customer_id,
          title: `${proposal.title} (Copy)`,
          status: 'draft',
          created_by: proposal.created_by,
          destination: proposal.destination,
          travel_date_from: proposal.travel_date_from,
          travel_date_to: proposal.travel_date_to,
          num_adults: proposal.num_adults,
          num_children: proposal.num_children,
          currency: proposal.currency,
          notes: proposal.notes,
          message_to_customer: proposal.message_to_customer,
        })
        .select()
        .single();

      if (error) throw error;
      if (newProposal) {
        window.open(`/admin/proposals/${newProposal.id}`, '_blank');
        setActionStatus('Duplicated! Opening in new tab.');
        setTimeout(() => setActionStatus(null), 3000);
      }
    } catch {
      setActionIsError(true);
      setActionStatus('Duplication failed. Please try again.');
      setTimeout(() => { setActionStatus(null); setActionIsError(false); }, 3000);
    }
  };

  const waLink = () => {
    if (!proposal.customers?.whatsapp) return '#';
    const link = `${window.location.origin}/p/${proposal.share_token}`;
    const firstName = proposal.customers.name?.split(' ')[0] ?? 'there';
    const msg = encodeURIComponent(
      `Hi ${firstName}! Your personalised travel proposal from Junegiri Yatra is ready. View & approve here: ${link}`
    );
    return `https://wa.me/${proposal.customers.whatsapp.replace(/\D/g, '')}?text=${msg}`;
  };

  // ── Styles ─────────────────────────────────────────────────────────────────
  const s = {
    page: {
      background: '#07051A',
      minHeight: '100vh',
      color: 'rgba(255,248,238,0.88)',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '24px',
    } as React.CSSProperties,

    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      alignItems: 'start',
    } as React.CSSProperties,

    card: {
      background: '#0D0A26',
      border: '1px solid rgba(201,146,61,0.15)',
      borderRadius: '12px',
      padding: '24px',
    } as React.CSSProperties,

    card2: {
      background: '#13102E',
      border: '1px solid rgba(201,146,61,0.15)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
    } as React.CSSProperties,

    dayCard: {
      background: '#13102E',
      borderLeft: '4px solid #C9923D',
      borderRadius: '0 10px 10px 0',
      border: '1px solid rgba(201,146,61,0.15)',
      borderLeftColor: '#C9923D',
      borderLeftWidth: '4px',
      marginBottom: '16px',
      overflow: 'hidden',
    } as React.CSSProperties,

    dayHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 16px',
      background: 'rgba(201,146,61,0.05)',
      cursor: 'pointer',
    } as React.CSSProperties,

    dayChip: {
      background: 'rgba(201,146,61,0.2)',
      color: '#C9923D',
      borderRadius: '6px',
      padding: '3px 10px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    } as React.CSSProperties,

    sectionTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: 'rgba(255,248,238,0.88)',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    } as React.CSSProperties,

    goldLabel: {
      fontSize: '12px',
      color: '#C9923D',
      fontWeight: 600,
      letterSpacing: '0.04em',
      marginBottom: '4px',
      display: 'block',
    } as React.CSSProperties,

    muted: {
      color: 'rgba(255,248,238,0.48)',
      fontSize: '13px',
    } as React.CSSProperties,

    btnSaffron: {
      background: '#E05C00',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    } as React.CSSProperties,

    btnGold: {
      background: '#C9923D',
      color: '#07051A',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    } as React.CSSProperties,

    btnGoldOutline: {
      background: 'transparent',
      color: '#C9923D',
      border: '1px solid rgba(201,146,61,0.5)',
      borderRadius: '8px',
      padding: '9px 18px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    } as React.CSSProperties,

    btnGreen: {
      background: '#16a34a',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 16px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
    } as React.CSSProperties,

    btnBlueOutline: {
      background: 'transparent',
      color: '#60a5fa',
      border: '1px solid rgba(96,165,250,0.4)',
      borderRadius: '8px',
      padding: '9px 16px',
      fontSize: '14px',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
    } as React.CSSProperties,

    btnGrey: {
      background: 'rgba(255,255,255,0.07)',
      color: 'rgba(255,248,238,0.6)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      padding: '9px 16px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      width: '100%',
    } as React.CSSProperties,

    btnSmall: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      transition: 'background 0.15s',
    } as React.CSSProperties,

    divider: {
      borderTop: '1px solid rgba(201,146,61,0.1)',
      margin: '12px 0',
    } as React.CSSProperties,

    totalLine: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px',
      color: 'rgba(255,248,238,0.6)',
      marginBottom: '6px',
    } as React.CSSProperties,

    totalValue: {
      color: 'rgba(255,248,238,0.88)',
      fontVariantNumeric: 'tabular-nums',
    } as React.CSSProperties,

    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      position: 'sticky',
      top: '24px',
    } as React.CSSProperties,
  };

  const fmt = (n: number) =>
    `${currSymbol}${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div style={s.page}>

        {/* Top bar */}
        <div style={{ maxWidth: '1400px', margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/admin/proposals" style={{ color: 'rgba(255,248,238,0.4)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
            ← Proposals
          </a>
          <div style={{ color: 'rgba(255,248,238,0.2)', fontSize: 13 }}>/</div>
          <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.6)' }}>
            {proposal.customers.name}
          </div>
        </div>

        <div style={s.grid}>

          {/* ── LEFT: Itinerary Builder ─────────────────────────────────── */}
          <div>
            <div style={s.card}>
              {/* Proposal Header */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  {editingTitle ? (
                    <input
                      className="pe-input"
                      style={{ fontSize: '22px', fontWeight: 700, flex: 1, minWidth: '200px' }}
                      value={proposal.title}
                      onChange={e => setProposal(p => ({ ...p, title: e.target.value }))}
                      onBlur={() => setEditingTitle(false)}
                      onKeyDown={e => { if (e.key === 'Enter') setEditingTitle(false); }}
                      autoFocus
                    />
                  ) : (
                    <h1
                      onClick={() => setEditingTitle(true)}
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'rgba(255,248,238,0.95)',
                        margin: 0,
                        cursor: 'text',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      title="Click to edit title"
                    >
                      {proposal.title}
                      <span style={{ fontSize: 14, color: 'rgba(201,146,61,0.5)', fontWeight: 400 }}>✏️</span>
                    </h1>
                  )}
                  <StatusBadge status={proposal.status} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,248,238,0.48)' }}>Customer:</span>
                    <span style={{ color: 'rgba(255,248,238,0.88)', fontWeight: 500 }}>{proposal.customers.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 13 }}>
                    <span style={{ color: 'rgba(255,248,238,0.48)' }}>📱</span>
                    <a href={`tel:${proposal.customers.whatsapp}`} style={{ color: '#C9923D', textDecoration: 'none' }}>
                      {proposal.customers.whatsapp}
                    </a>
                  </div>
                  {proposal.destination && (
                    <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.48)' }}>
                      📍 {proposal.destination}
                    </div>
                  )}
                  {(proposal.travel_date_from || proposal.travel_date_to) && (
                    <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.48)' }}>
                      📅 {proposal.travel_date_from ?? ''} {proposal.travel_date_to ? `→ ${proposal.travel_date_to}` : ''}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: 'rgba(255,248,238,0.48)' }}>
                    👥 {proposal.num_adults} adult{proposal.num_adults !== 1 ? 's' : ''}
                    {proposal.num_children > 0 ? `, ${proposal.num_children} child${proposal.num_children !== 1 ? 'ren' : ''}` : ''}
                  </div>
                </div>
              </div>

              {/* Save All + Add Day */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: saveError ? '10px' : '24px' }}>
                <button
                  style={s.btnSaffron}
                  onClick={handleSaveAll}
                  disabled={saving}
                >
                  {saving ? 'Saving…' : 'Save All Changes'}
                </button>
                <SavedIndicator show={savedAll} />
                <div style={{ flex: 1 }} />
                <button style={s.btnGoldOutline} onClick={handleAddDay}>
                  + Add Day
                </button>
              </div>
              {saveError && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.35)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: '#f87171',
                  marginBottom: '16px',
                }}>
                  ⚠️ {saveError}
                </div>
              )}

              {/* Days */}
              {days.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,248,238,0.3)' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
                  <div style={{ fontSize: 15 }}>No days yet. Add your first day to build the itinerary.</div>
                </div>
              )}

              {days.map((day) => {
                const isExpanded = expandedDays.has(day.id);
                const isAddingHere = addingItem?.dayId === day.id;

                return (
                  <div key={day.id} style={s.dayCard}>
                    {/* Day Header */}
                    <div style={s.dayHeader}>
                      <div
                        onClick={() => toggleDay(day.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer' }}
                      >
                        <div style={s.dayChip}>Day {day.day_number}</div>
                        <input
                          className="pe-input"
                          style={{ fontSize: '14px', fontWeight: 600, flex: 1, border: 'none', background: 'transparent', padding: '4px 0' }}
                          value={day.title}
                          onChange={e => handleDayFieldChange(day.id, 'title', e.target.value)}
                          onBlur={() => handleSaveDay(day.id)}
                          onClick={e => e.stopPropagation()}
                          placeholder="Day title…"
                        />
                      </div>
                      <input
                        type="date"
                        className="pe-input"
                        style={{ width: '150px', fontSize: '13px', padding: '4px 8px' }}
                        value={day.date ?? ''}
                        onChange={e => handleDayFieldChange(day.id, 'date', e.target.value)}
                        onBlur={() => handleSaveDay(day.id)}
                      />
                      <button
                        style={{ ...s.btnSmall, color: 'rgba(255,248,238,0.3)', fontSize: '18px', marginLeft: '4px' }}
                        className="pe-day-delete"
                        onClick={() => handleDeleteDay(day.id)}
                        title="Delete day"
                      >
                        ×
                      </button>
                      <button
                        onClick={() => toggleDay(day.id)}
                        style={{ ...s.btnSmall, color: 'rgba(255,248,238,0.4)', fontSize: '16px' }}
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? '▲' : '▼'}
                      </button>
                    </div>

                    {/* Day Body */}
                    {isExpanded && (
                      <div style={{ padding: '16px' }}>
                        {/* Overview */}
                        <textarea
                          className="pe-textarea"
                          style={{ marginBottom: '16px', minHeight: '60px' }}
                          placeholder="Day overview / narrative…"
                          value={day.overview ?? ''}
                          onChange={e => handleDayFieldChange(day.id, 'overview', e.target.value)}
                          onBlur={() => handleSaveDay(day.id)}
                        />

                        {/* Items List */}
                        {day.proposal_items.length > 0 && (
                          <div style={{ marginBottom: '12px' }}>
                            {day.proposal_items.map((item) => (
                              <div key={item.id}>
                                {editingItemId === item.id ? (
                                  /* Edit form inline */
                                  <div style={{
                                    background: 'rgba(201,146,61,0.06)',
                                    border: '1px solid rgba(201,146,61,0.2)',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    marginBottom: '8px',
                                  }}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                      <span style={{ fontSize: '20px' }}>{ITEM_ICONS[item.type]}</span>
                                      <input
                                        className="pe-input"
                                        style={{ width: '120px', flex: 'none' }}
                                        placeholder="Timing (e.g. 09:00)"
                                        value={editingItemForm.timing}
                                        onChange={e => setEditingItemForm(f => ({ ...f, timing: e.target.value }))}
                                      />
                                      <input
                                        className="pe-input"
                                        style={{ flex: 1 }}
                                        placeholder="Name *"
                                        value={editingItemForm.name}
                                        onChange={e => setEditingItemForm(f => ({ ...f, name: e.target.value }))}
                                        autoFocus
                                      />
                                    </div>
                                    <textarea
                                      className="pe-textarea"
                                      style={{ minHeight: '52px', marginBottom: '8px' }}
                                      placeholder="Description…"
                                      value={editingItemForm.description}
                                      onChange={e => setEditingItemForm(f => ({ ...f, description: e.target.value }))}
                                    />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button
                                        style={{ ...s.btnGold, padding: '7px 16px', fontSize: '13px' }}
                                        onClick={() => handleSaveEditItem(item)}
                                      >
                                        Save
                                      </button>
                                      <button
                                        style={{ ...s.btnGrey, width: 'auto', padding: '7px 14px', fontSize: '13px' }}
                                        onClick={cancelEditItem}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  /* Display row */
                                  <div
                                    className="pe-item-row"
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '10px',
                                      padding: '8px 10px',
                                      borderRadius: '6px',
                                      marginBottom: '4px',
                                      transition: 'background 0.15s',
                                    }}
                                  >
                                    <span style={{ fontSize: '18px', lineHeight: '1.4', flexShrink: 0 }}>
                                      {ITEM_ICONS[item.type]}
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                        {item.timing && (
                                          <span style={{ fontSize: '12px', color: '#C9923D', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                            {item.timing}
                                          </span>
                                        )}
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,248,238,0.9)' }}>
                                          {item.name}
                                        </span>
                                      </div>
                                      {item.description && (
                                        <div style={{ fontSize: '13px', color: 'rgba(255,248,238,0.5)', marginTop: '2px', lineHeight: '1.4' }}>
                                          {item.description}
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                                      <button
                                        style={{ ...s.btnSmall, color: 'rgba(255,248,238,0.4)', fontSize: '12px' }}
                                        onClick={() => startEditItem(item)}
                                        title="Edit"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        style={{ ...s.btnSmall, color: 'rgba(248,113,113,0.6)', fontSize: '12px' }}
                                        onClick={() => handleDeleteItem(day.id, item.id)}
                                        title="Delete"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Item inline form */}
                        {isAddingHere && addingItem && (
                          <div style={{
                            background: 'rgba(201,146,61,0.06)',
                            border: '1px solid rgba(201,146,61,0.25)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '12px',
                          }}>
                            <div style={{ fontSize: '13px', color: '#C9923D', fontWeight: 600, marginBottom: '10px' }}>
                              {ITEM_ICONS[addingItem.type]} Add {ITEM_LABELS[addingItem.type]}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                              <input
                                className="pe-input"
                                style={{ width: '130px', flex: 'none' }}
                                placeholder="Timing (09:00)"
                                value={newItemForm.timing}
                                onChange={e => setNewItemForm(f => ({ ...f, timing: e.target.value }))}
                              />
                              <input
                                className="pe-input"
                                style={{ flex: 1 }}
                                placeholder="Name *"
                                value={newItemForm.name}
                                onChange={e => setNewItemForm(f => ({ ...f, name: e.target.value }))}
                                autoFocus
                                onKeyDown={e => { if (e.key === 'Enter') handleSaveNewItem(); if (e.key === 'Escape') cancelAddItem(); }}
                              />
                            </div>
                            <textarea
                              className="pe-textarea"
                              style={{ minHeight: '52px', marginBottom: '8px' }}
                              placeholder="Description (optional)…"
                              value={newItemForm.description}
                              onChange={e => setNewItemForm(f => ({ ...f, description: e.target.value }))}
                            />
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                style={{ ...s.btnGold, padding: '7px 16px', fontSize: '13px' }}
                                onClick={handleSaveNewItem}
                              >
                                Add Item
                              </button>
                              <button
                                style={{ ...s.btnGrey, width: 'auto', padding: '7px 14px', fontSize: '13px' }}
                                onClick={cancelAddItem}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Add Item type buttons */}
                        {!isAddingHere && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {ITEM_TYPES.map(type => (
                              <button
                                key={type}
                                className="pe-type-btn"
                                style={{
                                  background: 'rgba(201,146,61,0.08)',
                                  border: '1px solid rgba(201,146,61,0.2)',
                                  borderRadius: '20px',
                                  padding: '5px 12px',
                                  fontSize: '12px',
                                  color: 'rgba(255,248,238,0.7)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  transition: 'all 0.15s',
                                }}
                                onClick={() => startAddItem(day.id, type)}
                              >
                                {ITEM_ICONS[type]} {ITEM_LABELS[type]}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Notes / Message to customer */}
              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={s.goldLabel}>Internal Notes</label>
                  <textarea
                    className="pe-textarea"
                    placeholder="Internal notes (not shown to customer)…"
                    value={proposal.notes ?? ''}
                    onChange={e => setProposal(p => ({ ...p, notes: e.target.value }))}
                    style={{ minHeight: '80px' }}
                  />
                </div>
                <div>
                  <label style={s.goldLabel}>Message to Customer</label>
                  <textarea
                    className="pe-textarea"
                    placeholder="Personalised message shown on the proposal page…"
                    value={proposal.message_to_customer ?? ''}
                    onChange={e => setProposal(p => ({ ...p, message_to_customer: e.target.value }))}
                    style={{ minHeight: '80px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Pricing + Actions ─────────────────────────────────── */}
          <div style={s.rightColumn}>

            {/* Pricing Card */}
            <div style={s.card}>
              <div style={{ ...s.sectionTitle, marginBottom: '18px' }}>
                <span>💰</span> Pricing
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={s.goldLabel}>Base Price / Adult ({currSymbol})</label>
                <input
                  type="number"
                  className="pe-input"
                  min={0}
                  value={pricing?.base_price_per_person ?? ''}
                  onChange={e => handlePricingChange('base_price_per_person', Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={s.goldLabel}>Child Price / Child ({currSymbol})</label>
                <input
                  type="number"
                  className="pe-input"
                  min={0}
                  value={pricing?.child_price_per_person ?? ''}
                  onChange={e => handlePricingChange('child_price_per_person', Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={s.goldLabel}>Group Discount %</label>
                  <input
                    type="number"
                    className="pe-input"
                    min={0}
                    max={100}
                    value={pricing?.group_discount_pct ?? ''}
                    onChange={e => handlePricingChange('group_discount_pct', Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label style={s.goldLabel}>GST %</label>
                  <input
                    type="number"
                    className="pe-input"
                    min={0}
                    max={100}
                    value={pricing?.gst_pct ?? 5}
                    onChange={e => handlePricingChange('gst_pct', Number(e.target.value))}
                    placeholder="5"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  id="applyGst"
                  checked={pricing?.apply_gst ?? true}
                  onChange={e => handlePricingChange('apply_gst', e.target.checked)}
                  style={{ accentColor: '#C9923D', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="applyGst" style={{ fontSize: '13px', color: 'rgba(255,248,238,0.7)', cursor: 'pointer' }}>
                  Apply GST
                </label>
              </div>

              <div style={s.divider} />

              {/* Auto-calculated totals */}
              <div style={{ marginBottom: '16px' }}>
                <div style={s.totalLine}>
                  <span>Adult subtotal ({proposal.num_adults}×)</span>
                  <span style={s.totalValue}>{fmt(totals.adultSub)}</span>
                </div>
                {proposal.num_children > 0 && (
                  <div style={s.totalLine}>
                    <span>Child subtotal ({proposal.num_children}×)</span>
                    <span style={s.totalValue}>{fmt(totals.childSub)}</span>
                  </div>
                )}
                {(pricing?.group_discount_pct ?? 0) > 0 && (
                  <div style={{ ...s.totalLine, color: '#4ade80' }}>
                    <span>Group discount ({pricing?.group_discount_pct}%)</span>
                    <span>−{fmt(totals.discount)}</span>
                  </div>
                )}
                {(pricing?.apply_gst && (pricing?.gst_pct ?? 0) > 0) && (
                  <div style={s.totalLine}>
                    <span>GST ({pricing?.gst_pct}%)</span>
                    <span style={s.totalValue}>+{fmt(totals.gst)}</span>
                  </div>
                )}

                <div style={s.divider} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'rgba(255,248,238,0.9)' }}>TOTAL</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#C9923D' }}>{fmt(totals.total)}</span>
                </div>
                <div style={{ ...s.totalLine, marginBottom: 0 }}>
                  <span style={s.muted}>Per person</span>
                  <span style={{ color: 'rgba(255,248,238,0.6)', fontSize: '13px' }}>{fmt(totals.perPerson)}</span>
                </div>
              </div>

              <button
                style={{ ...s.btnGold, width: '100%', padding: '11px' }}
                onClick={handleSavePricing}
                disabled={savingPricing}
              >
                {savingPricing ? 'Saving…' : 'Save Pricing'}
              </button>
              <SavedIndicator show={savedPricing} />
            </div>

            {/* Inclusions / Exclusions */}
            <div style={s.card}>
              <div style={{ ...s.sectionTitle, fontSize: '14px' }}>✅ Inclusions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {inclusions.map((inc, i) => (
                  <span key={i} className="pe-list-tag">
                    {inc}
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,248,238,0.4)', padding: '0 2px', fontSize: '14px', lineHeight: 1 }}
                      onClick={() => setInclusions(prev => prev.filter((_, idx) => idx !== i))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  className="pe-input"
                  placeholder="Add inclusion…"
                  value={newInclusion}
                  onChange={e => setNewInclusion(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newInclusion.trim()) {
                      setInclusions(p => [...p, newInclusion.trim()]);
                      setNewInclusion('');
                    }
                  }}
                />
                <button
                  style={{ ...s.btnGoldOutline, whiteSpace: 'nowrap', padding: '8px 12px' }}
                  onClick={() => {
                    if (newInclusion.trim()) {
                      setInclusions(p => [...p, newInclusion.trim()]);
                      setNewInclusion('');
                    }
                  }}
                >
                  Add
                </button>
              </div>

              <div style={{ ...s.divider, margin: '16px 0' }} />

              <div style={{ ...s.sectionTitle, fontSize: '14px' }}>❌ Exclusions</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {exclusions.map((exc, i) => (
                  <span key={i} className="pe-list-tag" style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.2)' }}>
                    {exc}
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,248,238,0.4)', padding: '0 2px', fontSize: '14px', lineHeight: 1 }}
                      onClick={() => setExclusions(prev => prev.filter((_, idx) => idx !== i))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  className="pe-input"
                  placeholder="Add exclusion…"
                  value={newExclusion}
                  onChange={e => setNewExclusion(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newExclusion.trim()) {
                      setExclusions(p => [...p, newExclusion.trim()]);
                      setNewExclusion('');
                    }
                  }}
                />
                <button
                  style={{ ...s.btnGoldOutline, whiteSpace: 'nowrap', padding: '8px 12px' }}
                  onClick={() => {
                    if (newExclusion.trim()) {
                      setExclusions(p => [...p, newExclusion.trim()]);
                      setNewExclusion('');
                    }
                  }}
                >
                  Add
                </button>
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={s.goldLabel}>Payment Terms</label>
                <textarea
                  className="pe-textarea"
                  placeholder="e.g. 50% advance, 50% before travel…"
                  value={paymentTerms}
                  onChange={e => setPaymentTerms(e.target.value)}
                  style={{ minHeight: '60px' }}
                />
              </div>
            </div>

            {/* Actions Card */}
            <div style={s.card}>
              <div style={{ ...s.sectionTitle, fontSize: '14px', marginBottom: '14px' }}>
                <span>⚡</span> Actions
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={s.muted}>Status:</span>
                <StatusBadge status={proposal.status} />
              </div>

              {actionStatus && (
                <div style={{
                  background: actionIsError ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.12)',
                  border: `1px solid ${actionIsError ? 'rgba(239,68,68,0.35)' : 'rgba(34,197,94,0.3)'}`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: actionIsError ? '#f87171' : '#4ade80',
                  marginBottom: '12px',
                }}>
                  {actionStatus}
                </div>
              )}

              {shareLink && (
                <div style={{
                  background: 'rgba(201,146,61,0.08)',
                  border: '1px solid rgba(201,146,61,0.2)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  marginBottom: '12px',
                  wordBreak: 'break-all',
                  fontSize: '12px',
                  color: '#C9923D',
                }}>
                  {shareLink}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={s.btnGreen} onClick={handleSendToCustomer}>
                  📤 Send to Customer
                </button>

                <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{ ...s.btnGrey, background: 'rgba(37,211,102,0.12)', color: '#25D366', border: '1px solid rgba(37,211,102,0.25)' }}>
                    💬 WhatsApp Quick Send
                  </button>
                </a>

                <button
                  style={s.btnBlueOutline}
                  onClick={() => window.open(`/admin/proposals/${proposal.id}/print`, '_blank')}
                >
                  🖨️ Preview PDF
                </button>

                {proposal.status !== 'booked' && (
                  <button style={s.btnGold} onClick={handleMarkBooked}>
                    ✅ Mark as Booked
                  </button>
                )}

                <button style={s.btnGrey} onClick={handleDuplicate}>
                  📋 Duplicate Proposal
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
