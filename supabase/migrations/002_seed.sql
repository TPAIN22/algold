-- =====================
-- SEED DATA
-- =====================
-- Sample categories (image_url is NULL by default — upload images via admin panel)
INSERT INTO categories (name, slug, image_url) VALUES
  ('الأثواب التقليدية',   'traditional-thobes',   NULL),
  ('العبايات المطرزة',    'embroidered-abayas',    NULL),
  ('الأفراح السودانية',   'sudanese-wedding',      NULL),
  ('الملابس اليومية',     'casual-wear',           NULL),
  ('الإكسسوارات',         'accessories',           NULL),
  ('المجموعة الاحتفالية', 'festive-collection',    NULL)
ON CONFLICT (slug) DO NOTHING;

-- Sample products (no images — add images via admin panel)
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Classic Embroidered Thobe',
  'classic-embroidered-thobe',
  'A stunning traditional Sudanese thobe with intricate gold embroidery along the neckline and cuffs. Made from premium cotton fabric, perfect for special occasions.',
  350.00,
  (SELECT id FROM categories WHERE slug = 'traditional-thobes'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'classic-embroidered-thobe');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Golden Sudanese Abaya',
  'golden-sudanese-abaya',
  'An elegant flowing abaya featuring beautiful golden embroidery inspired by traditional Sudanese patterns. Lightweight and breathable fabric ideal for the Gulf climate.',
  450.00,
  (SELECT id FROM categories WHERE slug = 'embroidered-abayas'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'golden-sudanese-abaya');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Bridal Sudanese Set',
  'bridal-sudanese-set',
  'Complete bridal set including embroidered thobe, veil, and accessories. Handcrafted with love to make your special day unforgettable.',
  1200.00,
  (SELECT id FROM categories WHERE slug = 'sudanese-wedding'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'bridal-sudanese-set');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Everyday Comfort Thobe',
  'everyday-comfort-thobe',
  'A comfortable everyday thobe in soft fabric with minimal embroidery. Perfect for casual outings while maintaining elegance.',
  180.00,
  (SELECT id FROM categories WHERE slug = 'casual-wear'),
  true,
  false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'everyday-comfort-thobe');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Festive Occasion Dress',
  'festive-occasion-dress',
  'A vibrant and elegant dress for Eid and festive occasions. Features rich colors and detailed embroidery celebrating Sudanese heritage.',
  520.00,
  (SELECT id FROM categories WHERE slug = 'festive-collection'),
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'festive-occasion-dress');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'Gold Thread Embroidered Scarf',
  'gold-thread-embroidered-scarf',
  'A luxurious scarf with authentic Sudanese gold thread embroidery. A perfect accessory to complement any outfit.',
  95.00,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  true,
  false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'gold-thread-embroidered-scarf');
