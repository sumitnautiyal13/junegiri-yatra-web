-- ============================================================
-- Junegiri Yatra — Proposals & Itinerary Management Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────
-- CUSTOMERS / LEADS
-- ─────────────────────────────────────────
CREATE TABLE customers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT,
  whatsapp    TEXT NOT NULL,
  phone       TEXT,
  country     TEXT NOT NULL DEFAULT 'India',
  city        TEXT,
  source      TEXT NOT NULL DEFAULT 'whatsapp'
                CHECK (source IN ('whatsapp', 'website', 'referral', 'other')),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- PROPOSALS
-- ─────────────────────────────────────────
CREATE TABLE proposals (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id          UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  title                TEXT NOT NULL,
  status               TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft', 'sent', 'approved', 'rejected', 'booked')),
  share_token          UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  created_by           TEXT NOT NULL,   -- team member email
  destination          TEXT,
  travel_date_from     DATE,
  travel_date_to       DATE,
  num_adults           INT NOT NULL DEFAULT 2,
  num_children         INT NOT NULL DEFAULT 0,
  currency             TEXT NOT NULL DEFAULT 'INR'
                         CHECK (currency IN ('INR', 'USD', 'AED', 'SGD', 'THB', 'EUR', 'GBP')),
  notes                TEXT,           -- internal notes
  message_to_customer  TEXT,           -- shown on approval page
  approved_at          TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- ITINERARY DAYS
-- ─────────────────────────────────────────
CREATE TABLE proposal_days (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id  UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  day_number   INT NOT NULL,
  date         DATE,
  title        TEXT NOT NULL DEFAULT 'Day',
  overview     TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (proposal_id, day_number)
);

-- ─────────────────────────────────────────
-- ITEMS WITHIN EACH DAY
-- ─────────────────────────────────────────
CREATE TABLE proposal_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id       UUID NOT NULL REFERENCES proposal_days(id) ON DELETE CASCADE,
  type         TEXT NOT NULL DEFAULT 'activity'
                 CHECK (type IN ('hotel', 'activity', 'transport', 'meal', 'note')),
  name         TEXT NOT NULL,
  description  TEXT,
  timing       TEXT,       -- e.g. "09:00" or "Morning"
  icon         TEXT,       -- emoji or icon key
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- PRICING
-- ─────────────────────────────────────────
CREATE TABLE proposal_pricing (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id            UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE UNIQUE,
  base_price_per_person  NUMERIC(10,2) NOT NULL DEFAULT 0,
  child_price_per_person NUMERIC(10,2) NOT NULL DEFAULT 0,
  group_discount_pct     NUMERIC(5,2)  NOT NULL DEFAULT 0,
  gst_pct                NUMERIC(5,2)  NOT NULL DEFAULT 5,
  apply_gst              BOOLEAN       NOT NULL DEFAULT TRUE,
  total_price            NUMERIC(10,2) NOT NULL DEFAULT 0,
  inclusions             TEXT[]        NOT NULL DEFAULT '{}',
  exclusions             TEXT[]        NOT NULL DEFAULT '{}',
  payment_terms          TEXT,
  created_at             TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- ACTIVITY / EVENT LOG
-- ─────────────────────────────────────────
CREATE TABLE proposal_events (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id  UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  event        TEXT NOT NULL
                 CHECK (event IN ('created', 'updated', 'sent', 'viewed', 'approved', 'rejected', 'booked')),
  actor        TEXT,       -- team email or 'customer'
  meta         JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────
CREATE INDEX idx_proposals_customer     ON proposals(customer_id);
CREATE INDEX idx_proposals_status       ON proposals(status);
CREATE INDEX idx_proposals_share_token  ON proposals(share_token);
CREATE INDEX idx_proposal_days_proposal ON proposal_days(proposal_id);
CREATE INDEX idx_proposal_items_day     ON proposal_items(day_id);
CREATE INDEX idx_proposal_events_prop   ON proposal_events(proposal_id);

-- ─────────────────────────────────────────
-- UPDATED_AT TRIGGER
-- ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_pricing_updated_at
  BEFORE UPDATE ON proposal_pricing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- All admin reads/writes go through service-role key (bypasses RLS)
-- Public approval page uses anon key — only needs share_token lookup
-- ─────────────────────────────────────────
ALTER TABLE customers         ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals         ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_days     ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_pricing  ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_events   ENABLE ROW LEVEL SECURITY;

-- Public: read proposals by share_token (for /p/[token] approval page)
CREATE POLICY "public read by token" ON proposals
  FOR SELECT TO anon
  USING (share_token IS NOT NULL);

CREATE POLICY "public read days by token" ON proposal_days
  FOR SELECT TO anon
  USING (proposal_id IN (SELECT id FROM proposals WHERE share_token IS NOT NULL));

CREATE POLICY "public read items by token" ON proposal_items
  FOR SELECT TO anon
  USING (day_id IN (
    SELECT pi.id FROM proposal_days pi
    JOIN proposals p ON p.id = pi.proposal_id
    WHERE p.share_token IS NOT NULL
  ));

CREATE POLICY "public read pricing by token" ON proposal_pricing
  FOR SELECT TO anon
  USING (proposal_id IN (SELECT id FROM proposals WHERE share_token IS NOT NULL));

-- Public: customer can update proposal status (approve/reject)
CREATE POLICY "public approve by token" ON proposals
  FOR UPDATE TO anon
  USING (share_token IS NOT NULL)
  WITH CHECK (status IN ('approved', 'rejected'));

-- Authenticated users (admin team) have full access — service role bypasses RLS
-- so we only need policies for the authenticated Supabase session
CREATE POLICY "auth full access customers" ON customers
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth full access proposals" ON proposals
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth full access days" ON proposal_days
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth full access items" ON proposal_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth full access pricing" ON proposal_pricing
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth full access events" ON proposal_events
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
