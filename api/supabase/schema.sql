-- =============================================
-- EastCulture Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table (tracks every payment intent)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  amount_nzd NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'nzd',
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('video', 'course', 'membership')),
  course_id TEXT,       -- e.g. 'faceyoga', 'taichi', 'qigong'
  video_key TEXT,       -- e.g. 'face-yoga/lesson-03-frown-line-relief.mp4'
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- User purchases (active entitlements after payment)
CREATE TABLE IF NOT EXISTS user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('video', 'course', 'membership')),
  course_id TEXT,
  video_key TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  expires_at TIMESTAMPTZ,  -- NULL = lifetime, set for membership subscriptions
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_course ON user_purchases(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_purchases_user_video ON user_purchases(user_id, video_key);

-- =============================================
-- Row Level Security (RLS) - enable on all tables
-- =============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS (used by our API)
-- Public/anon role has no access (all API calls use service role)
-- No need to create policies since we use service role key in the API
