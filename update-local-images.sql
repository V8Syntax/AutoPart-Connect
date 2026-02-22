-- Update script for local images
-- Files are in /client/public/images/
-- Mapped to /images/filename.png.png

-- Front Bumper
UPDATE parts 
SET image_url = '/images/front-bumper.png.png' 
WHERE name = 'Front Bumper';

-- Headlight Assy
UPDATE parts 
SET image_url = '/images/headlight-assy.png.png' 
WHERE name = 'Headlight Assy';

-- AC Compressor
UPDATE parts 
SET image_url = '/images/ac-compressor.png.png' 
WHERE name = 'AC Compressor';

-- Shock Absorber
UPDATE parts 
SET image_url = '/images/Shock-absorbers.png.png' 
WHERE name = 'Shock Absorber';

-- Side Mirror
UPDATE parts 
SET image_url = '/images/side-mirror.png.png' 
WHERE name = 'Side Mirror';

-- Tail Light
UPDATE parts 
SET image_url = '/images/tail-light.png.png' 
WHERE name = 'Tail Light';

-- Brake Pads
UPDATE parts 
SET image_url = '/images/brake-pads.png.png' 
WHERE name = 'Brake Pads';

-- Verification
SELECT name, image_url FROM parts;
