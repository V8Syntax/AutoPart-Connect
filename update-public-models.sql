-- ============================================
-- UPDATE PARTS WITH PUBLIC 3D MODEL URLs
-- Free models from glTF Sample Repository
-- ============================================

-- These are publicly hosted .glb files that will work immediately
-- No need to download files - they load directly from GitHub

-- Brake parts - Use Gearbox Assembly (mechanical/metallic)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/GearboxAssy.glb'
WHERE category = 'Brakes';

-- Filter parts - Use Reciprocating Saw (cylindrical shape)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Binary/ReciprocatingSaw.glb'
WHERE category = 'Filters';

-- Engine parts - Use Water Bottle (cylindrical)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb'
WHERE category = 'Engine';

-- Suspension parts - Use Box (geometric)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb'
WHERE category = 'Suspension';

-- Electrical parts - Use Lantern (compact shape)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb'
WHERE category = 'Electrical';

-- Ignition parts - Use Damaged Helmet (detailed model)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb'
WHERE category = 'Ignition';

-- ============================================
-- VERIFY THE UPDATES
-- ============================================

-- Check how many parts were updated per category
SELECT 
    category, 
    COUNT(*) as parts_count,
    model_url
FROM parts 
WHERE model_url IS NOT NULL
GROUP BY category, model_url
ORDER BY category;

-- Show sample parts with their model URLs
SELECT 
    name, 
    category, 
    brand,
    model_url 
FROM parts 
WHERE model_url IS NOT NULL 
LIMIT 10;
