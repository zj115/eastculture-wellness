-- Enables metaphysics service payments on an existing EastCulture Supabase DB.
-- Safe to run more than once in the Supabase SQL Editor.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS service_id TEXT;

ALTER TABLE user_purchases
  ADD COLUMN IF NOT EXISTS service_id TEXT;

DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  FOR constraint_name IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'orders'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) LIKE '%purchase_type%'
  LOOP
    EXECUTE format('ALTER TABLE orders DROP CONSTRAINT IF EXISTS %I', constraint_name);
  END LOOP;
END $$;

ALTER TABLE orders
  ADD CONSTRAINT orders_purchase_type_check
  CHECK (purchase_type IN ('video', 'course', 'membership', 'service'));

DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  FOR constraint_name IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'user_purchases'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) LIKE '%purchase_type%'
  LOOP
    EXECUTE format('ALTER TABLE user_purchases DROP CONSTRAINT IF EXISTS %I', constraint_name);
  END LOOP;
END $$;

ALTER TABLE user_purchases
  ADD CONSTRAINT user_purchases_purchase_type_check
  CHECK (purchase_type IN ('video', 'course', 'membership', 'service'));

CREATE INDEX IF NOT EXISTS idx_purchases_user_service
  ON user_purchases(user_id, service_id);
