-- ============================================
-- UPDATE SCRIPT - Indian Automotive Parts
-- Run this to update the database with new parts
-- ============================================

-- Clear existing sample data
DELETE FROM compatibility;
DELETE FROM parts;
DELETE FROM vehicles;

-- Insert Indian market vehicles
INSERT INTO vehicles (year, make, model, trim) VALUES
    (2021, 'Maruti', 'Swift', 'VXI'),
    (2022, 'Tata', 'Nexon', 'XZ Plus');

-- Insert automotive parts with Indian pricing (in Rupees)
INSERT INTO parts (name, brand, price, part_number, category, stock_quantity, description) VALUES
    ('Front Bumper', 'Genuine', 7000.00, 'FB-001', 'Body Parts', 15, 'High-quality front bumper for compact cars'),
    ('Headlight Assy', 'Philips', 5000.00, 'HL-002', 'Lighting', 25, 'Complete headlight assembly with bulbs'),
    ('AC Compressor', 'Denso', 10000.00, 'AC-003', 'Climate Control', 10, 'Air conditioning compressor unit'),
    ('Shock Absorber', 'Monroe', 4000.00, 'SA-004', 'Suspension', 30, 'Front/Rear shock absorber'),
    ('Side Mirror', 'OEM', 3000.00, 'SM-005', 'Body Parts', 20, 'Side view mirror with indicator'),
    ('Tail Light', 'Hella', 2500.00, 'TL-006', 'Lighting', 18, 'Rear tail light assembly'),
    ('Brake Pads', 'Brembo', 2000.00, 'BP-007', 'Brakes', 40, 'Premium ceramic brake pads');

-- Insert compatibility relationships
-- Map all parts to 2021 Maruti Swift
INSERT INTO compatibility (part_id, vehicle_id, verified, notes)
SELECT p.id, v.id, true, 'Compatible with ' || v.year || ' ' || v.make || ' ' || v.model
FROM parts p, vehicles v
WHERE v.year = 2021 AND v.make = 'Maruti' AND v.model = 'Swift'
AND p.part_number IN ('FB-001', 'HL-002', 'AC-003', 'SA-004', 'SM-005', 'TL-006', 'BP-007');

-- Map all parts to 2022 Tata Nexon
INSERT INTO compatibility (part_id, vehicle_id, verified, notes)
SELECT p.id, v.id, true, 'Compatible with ' || v.year || ' ' || v.make || ' ' || v.model
FROM parts p, vehicles v
WHERE v.year = 2022 AND v.make = 'Tata' AND v.model = 'Nexon'
AND p.part_number IN ('FB-001', 'HL-002', 'AC-003', 'SA-004', 'SM-005', 'TL-006', 'BP-007');

-- Verify the data
SELECT 'Parts Count:' as info, COUNT(*) as count FROM parts
UNION ALL
SELECT 'Vehicles Count:', COUNT(*) FROM vehicles
UNION ALL
SELECT 'Compatibility Count:', COUNT(*) FROM compatibility;

-- Show parts with compatibility
SELECT 
    p.name,
    p.brand,
    p.price,
    p.category,
    v.year || ' ' || v.make || ' ' || v.model as compatible_vehicle
FROM parts p
JOIN compatibility c ON p.id = c.part_id
JOIN vehicles v ON c.vehicle_id = v.id
ORDER BY p.name, v.year;
