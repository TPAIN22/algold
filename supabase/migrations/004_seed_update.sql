-- =====================
-- SEED UPDATE: category image_url + Arabic product seeds
-- =====================

-- 1. Patch existing categories to acknowledge image_url column
UPDATE categories SET image_url = NULL WHERE image_url IS NULL;

-- 2. Re-insert missing categories (Arabic names, image uploaded via admin)
INSERT INTO categories (name, slug, image_url) VALUES
  ('الأثواب التقليدية',   'traditional-thobes',   NULL),
  ('العبايات المطرزة',    'embroidered-abayas',    NULL),
  ('الأفراح السودانية',   'sudanese-wedding',      NULL),
  ('الملابس اليومية',     'casual-wear',           NULL),
  ('الإكسسوارات',         'accessories',           NULL),
  ('المجموعة الاحتفالية', 'festive-collection',    NULL)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 3. Update existing English products to Arabic
UPDATE products SET
  name        = 'ثوب مطرز كلاسيكي',
  description = 'ثوب سوداني تقليدي راقٍ مزيّن بتطريز ذهبي دقيق على الياقة والأكمام. مصنوع من قطن فاخر، مثالي للمناسبات الخاصة.'
WHERE slug = 'classic-embroidered-thobe';

UPDATE products SET
  name        = 'عباية سودانية ذهبية',
  description = 'عباية منسابة أنيقة تتميز بتطريز ذهبي مستوحى من الأنماط السودانية التقليدية. قماش خفيف وشفاف مناسب لمناخ الخليج.'
WHERE slug = 'golden-sudanese-abaya';

UPDATE products SET
  name        = 'طقم العروس السوداني',
  description = 'طقم عروس متكامل يشمل الثوب المطرز والطرحة والإكسسوارات. مصنوع يدويًا بعناية فائقة لتكوني الأجمل في يومك الاستثنائي.'
WHERE slug = 'bridal-sudanese-set';

UPDATE products SET
  name        = 'ثوب يومي مريح',
  description = 'ثوب يومي مريح من قماش ناعم بتطريز خفيف. مثالي للخروجات اليومية مع الحفاظ على الأناقة.'
WHERE slug = 'everyday-comfort-thobe';

UPDATE products SET
  name        = 'فستان المناسبات الاحتفالية',
  description = 'فستان نابض بالحياة وأنيق لمناسبات العيد والاحتفالات. يتميز بألوان زاهية وتطريز دقيق يحتفي بالتراث السوداني.'
WHERE slug = 'festive-occasion-dress';

UPDATE products SET
  name        = 'وشاح بخيوط ذهبية',
  description = 'وشاح فاخر بتطريز ذهبي سوداني أصيل. إكسسوار مثالي يُكمل أي إطلالة ويضفي عليها لمسة من التراث.'
WHERE slug = 'gold-thread-embroidered-scarf';

-- 4. Add new products (2 per category — skipped if slug already exists)

-- الأثواب التقليدية
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'ثوب الملكي بالتطريز الفضي',
  'royal-thobe-silver',
  'ثوب فاخر بتطريز فضي على أكتاف ملكية واسعة. قماش ساتان ناعم يمنحك إطلالة ملكية لا تُنسى في حفلات الأعراس والمناسبات الكبرى.',
  420.00,
  (SELECT id FROM categories WHERE slug = 'traditional-thobes'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'royal-thobe-silver');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'ثوب الليلة البيضاء',
  'white-night-thobe',
  'ثوب أبيض ناصع بتطريز دقيق على الحواف. يجمع بين البساطة والأناقة، ومناسب للحفلات الليلية والخطوبات.',
  280.00,
  (SELECT id FROM categories WHERE slug = 'traditional-thobes'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'white-night-thobe');

-- العبايات المطرزة
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'عباية الفراشة المطرزة',
  'butterfly-abaya',
  'عباية واسعة الأكمام بتطريز على شكل فراشات ذهبية. قماش شيفون خفيف يمنح إحساسًا بالحرية والأناقة في آنٍ واحد.',
  390.00,
  (SELECT id FROM categories WHERE slug = 'embroidered-abayas'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'butterfly-abaya');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'عباية الورود الكلاسيكية',
  'classic-rose-abaya',
  'عباية كلاسيكية بأكمام متوسطة وتطريز وردي رقيق. تصميم يناسب المرأة العصرية التي لا تتنازل عن أصالتها.',
  340.00,
  (SELECT id FROM categories WHERE slug = 'embroidered-abayas'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'classic-rose-abaya');

-- الأفراح السودانية
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'فستان الزفاف المطرز',
  'embroidered-wedding-dress',
  'فستان زفاف سوداني مطرز بالكامل بخيوط ذهبية وفضية. يُصنع حسب الطلب ليلائم مقاساتك تمامًا ويجعلك أميرة يومك.',
  850.00,
  (SELECT id FROM categories WHERE slug = 'sudanese-wedding'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'embroidered-wedding-dress');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'طقم الحناء السوداني',
  'sudanese-henna-set',
  'طقم متكامل لليلة الحناء يشمل ثوبًا مطرزًا باللون الأخضر الزاهي وإكسسوارات تقليدية. احتفلي بتراثك بكل فخر.',
  650.00,
  (SELECT id FROM categories WHERE slug = 'sudanese-wedding'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'sudanese-henna-set');

-- الملابس اليومية
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'عباية يومية بسيطة',
  'simple-daily-abaya',
  'عباية يومية بسيطة بقصة مريحة وألوان هادئة. تناسب بيئة العمل والتسوق والخروجات اليومية. متوفرة بعدة ألوان.',
  195.00,
  (SELECT id FROM categories WHERE slug = 'casual-wear'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'simple-daily-abaya');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'طقم كاجوال سوداني',
  'sudanese-casual-set',
  'طقم يومي مكوّن من ثوب وشال خفيف بألوان أرضية. قماش قطن طبيعي يناسب الطقس الحار ويمنح راحة طوال اليوم.',
  240.00,
  (SELECT id FROM categories WHERE slug = 'casual-wear'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'sudanese-casual-set');

-- الإكسسوارات
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'حقيبة يد مطرزة',
  'embroidered-handbag',
  'حقيبة يد صغيرة مزيّنة بتطريز سوداني تقليدي بالخيوط الذهبية. تُصنع يدويًا من جلد طبيعي وتتسع لمستلزماتك الأساسية.',
  150.00,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'embroidered-handbag');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'طوق ذهبي تقليدي',
  'traditional-gold-necklace',
  'طوق تقليدي مستوحى من مجوهرات السودان الأصيلة. مصنوع من معدن مطلي بالذهب عيار 18، يُكمل إطلالتك التراثية.',
  220.00,
  (SELECT id FROM categories WHERE slug = 'accessories'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'traditional-gold-necklace');

-- المجموعة الاحتفالية
INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'ثوب العيد المطرز',
  'eid-embroidered-thobe',
  'ثوب خاص بمناسبات العيد بتطريز ملوّن زاهٍ على أكمام فضفاضة. تصميم يجمع الأصالة بلمسة عصرية تناسب روح الاحتفال.',
  460.00,
  (SELECT id FROM categories WHERE slug = 'festive-collection'),
  true, true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'eid-embroidered-thobe');

INSERT INTO products (name, slug, description, price, category_id, in_stock, featured)
SELECT
  'فستان الخريف السوداني',
  'sudanese-autumn-dress',
  'فستان بألوان دافئة تستلهم من طبيعة السودان، مُزيّن بتطريز يدوي يعكس جمال الحرف اليدوية التقليدية. مثالي للأمسيات.',
  395.00,
  (SELECT id FROM categories WHERE slug = 'festive-collection'),
  true, false
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'sudanese-autumn-dress');
