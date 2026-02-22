-- ============================================
-- ADD image_url COLUMN TO parts TABLE
-- Migration Script for Product Images
-- ============================================

-- Add image_url column to parts table
ALTER TABLE parts 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500);

-- ============================================
-- UPDATE SAMPLE DATA WITH IMAGE URLs
-- ============================================

-- Brakes
UPDATE parts 
SET image_url = 'https://www.pngplay.com/wp-content/uploads/13/Brembo-Brake-Transparent-Images.png' 
WHERE category = 'Brakes';

-- Body Parts (Bumper)
UPDATE parts 
SET image_url = 'https://purepng.com/public/uploads/large/purepng.com-car-bumpercar-bumpervehicle-bumperautomotive-exterior-protection-1701527484561s8v9e.png' 
WHERE category = 'Body Parts' AND name LIKE '%Bumper%';

-- Body Parts (Mirror)
UPDATE parts 
SET image_url = 'https://pngimg.com/d/car_mirror_PNG12.png' 
WHERE category = 'Body Parts' AND name LIKE '%Mirror%';

-- Lighting (Headlight)
UPDATE parts 
SET image_url = 'https://pngimg.com/d/car_lights_PNG10.png' 
WHERE category = 'Lighting' AND name LIKE '%Headlight%';

-- Lighting (Tail Light)
UPDATE parts 
SET image_url = 'https://pngimg.com/d/car_lights_PNG27.png' 
WHERE category = 'Lighting' AND name LIKE '%Tail%';

-- Suspension
UPDATE parts 
SET image_url = 'https://pngimg.com/d/shock_absorber_PNG23.png' 
WHERE category = 'Suspension';

-- Climate Control
UPDATE parts 
SET image_url = 'https://www.pngall.com/wp-content/uploads/5/Car-AC-Compressor-PNG-File.png' 
WHERE category = 'Climate Control';

-- Set default for any missing
UPDATE parts 
SET image_url = 'https://cdn-icons-png.flaticon.com/512/3209/3209990.png' 
WHERE image_url IS NULL;

-- Verify
SELECT id, name, category, image_url FROM parts;
