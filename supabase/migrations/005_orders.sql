-- =====================
-- ORDERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS orders (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number SERIAL      NOT NULL,
  product_id   UUID        REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT        NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity     INT         NOT NULL DEFAULT 1,
  total_price  DECIMAL(10,2) NOT NULL,
  status       TEXT        NOT NULL DEFAULT 'new'
                           CHECK (status IN ('new','contacted','confirmed','shipped','delivered','cancelled')),
  notes        TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Anyone can place an order (public INSERT)
CREATE POLICY "Public can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read / update / delete
CREATE POLICY "Authenticated users can read orders"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete orders"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');
