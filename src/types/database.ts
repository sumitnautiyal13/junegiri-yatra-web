// ─────────────────────────────────────────────────────
// Junegiri Yatra — Database Types
// Generated manually; run `supabase gen types` to auto-sync
// ─────────────────────────────────────────────────────

export type CustomerSource = 'whatsapp' | 'website' | 'referral' | 'other';
export type ProposalStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'booked';
export type ProposalCurrency = 'INR' | 'USD' | 'AED' | 'SGD' | 'THB' | 'EUR' | 'GBP';
export type ItemType = 'hotel' | 'activity' | 'transport' | 'meal' | 'note';
export type EventType = 'created' | 'updated' | 'sent' | 'viewed' | 'approved' | 'rejected' | 'booked';

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string;
  phone: string | null;
  country: string;
  city: string | null;
  source: CustomerSource;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  customer_id: string;
  title: string;
  status: ProposalStatus;
  share_token: string;
  created_by: string;
  destination: string | null;
  travel_date_from: string | null;
  travel_date_to: string | null;
  num_adults: number;
  num_children: number;
  currency: ProposalCurrency;
  notes: string | null;
  message_to_customer: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  customers?: Customer;
}

export interface ProposalDay {
  id: string;
  proposal_id: string;
  day_number: number;
  date: string | null;
  title: string;
  overview: string | null;
  created_at: string;
  // Joined
  proposal_items?: ProposalItem[];
}

export interface ProposalItem {
  id: string;
  day_id: string;
  type: ItemType;
  name: string;
  description: string | null;
  timing: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProposalPricing {
  id: string;
  proposal_id: string;
  base_price_per_person: number;
  child_price_per_person: number;
  group_discount_pct: number;
  gst_pct: number;
  apply_gst: boolean;
  total_price: number;
  inclusions: string[];
  exclusions: string[];
  payment_terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProposalEvent {
  id: string;
  proposal_id: string;
  event: EventType;
  actor: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
}

// Full proposal with all relations
export interface ProposalFull extends Proposal {
  customers: Customer;
  proposal_days: (ProposalDay & { proposal_items: ProposalItem[] })[];
  proposal_pricing: ProposalPricing | null;
}

// Database generic wrapper for Supabase client typing
export type Database = {
  public: {
    Tables: {
      customers: { Row: Customer; Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Customer, 'id'>>; };
      proposals: { Row: Proposal; Insert: Omit<Proposal, 'id' | 'share_token' | 'created_at' | 'updated_at' | 'approved_at' | 'customers'>; Update: Partial<Omit<Proposal, 'id' | 'customers'>>; };
      proposal_days: { Row: ProposalDay; Insert: Omit<ProposalDay, 'id' | 'created_at' | 'proposal_items'>; Update: Partial<Omit<ProposalDay, 'id' | 'proposal_items'>>; };
      proposal_items: { Row: ProposalItem; Insert: Omit<ProposalItem, 'id' | 'created_at'>; Update: Partial<Omit<ProposalItem, 'id'>>; };
      proposal_pricing: { Row: ProposalPricing; Insert: Omit<ProposalPricing, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<ProposalPricing, 'id'>>; };
      proposal_events: { Row: ProposalEvent; Insert: Omit<ProposalEvent, 'id' | 'created_at'>; Update: never; };
    };
  };
};
