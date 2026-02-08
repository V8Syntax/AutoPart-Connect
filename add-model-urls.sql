-- ============================================
-- ADD model_url COLUMN TO parts TABLE
-- Migration Script for 3D Model URLs
-- ============================================

-- Add model_url column to parts table
ALTER TABLE parts 
ADD COLUMN IF NOT EXISTS model_url VARCHAR(500);

-- Add index for model_url lookups
CREATE INDEX IF NOT EXISTS idx_parts_model_url ON parts(model_url);

-- ============================================
-- UPDATE SAMPLE DATA WITH MODEL URLs
-- ============================================

-- Note: These are example URLs. You can:
-- 1. Use free GLTF models from sites like Sketchfab, Poly Haven, or TurboSquid
-- 2. Create your own models in Blender and export as .glb/.gltf
-- 3. Store models in /client/public/models/ directory

-- Example: Update specific parts with model URLs
-- UPDATE parts SET model_url = '/models/brake-disc.glb' WHERE category = 'Brakes';
-- UPDATE parts SET model_url = '/models/oil-filter.glb' WHERE category = 'Filters';
-- UPDATE parts SET model_url = '/models/spark-plug.glb' WHERE category = 'Ignition';

-- For testing, you can use publicly available models:
-- Example with a public CDN (replace with your actual model URLs)
UPDATE parts 
SET model_url = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb'
WHERE model_url IS NULL AND category = 'Brakes';

-- ============================================
-- VERIFY THE UPDATE
-- ============================================
-- Run this to check the changes:
-- SELECT id, name, category, model_url FROM parts LIMIT 10;
