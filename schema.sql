-- AutoPart-Connect Database Schema
-- PostgreSQL Schema following 3rd Normal Form (3NF)

-- Enable UUID extension for generating unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster email lookups (login)
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- PARTS TABLE
-- ============================================
CREATE TABLE parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    description TEXT,
    part_number VARCHAR(100) UNIQUE,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX idx_parts_brand ON parts(brand);
CREATE INDEX idx_parts_category ON parts(category);
CREATE INDEX idx_parts_part_number ON parts(part_number);

-- ============================================
-- VEHICLES TABLE
-- ============================================
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    trim VARCHAR(100),
    engine_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Ensure unique vehicle combinations
    UNIQUE(year, make, model, trim)
);

-- Indexes for vehicle searches
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_make ON vehicles(make);
CREATE INDEX idx_vehicles_model ON vehicles(model);
CREATE INDEX idx_vehicles_ymm ON vehicles(year, make, model);

-- ============================================
-- COMPATIBILITY TABLE (Junction Table)
-- Follows 3NF by storing only the relationship
-- ============================================
CREATE TABLE compatibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    part_id UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    notes TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    CONSTRAINT fk_compatibility_part
        FOREIGN KEY (part_id) 
        REFERENCES parts(id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_compatibility_vehicle
        FOREIGN KEY (vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE,
    
    -- Ensure no duplicate part-vehicle combinations
    UNIQUE(part_id, vehicle_id)
);

-- Indexes for efficient compatibility lookups
CREATE INDEX idx_compatibility_part_id ON compatibility(part_id);
CREATE INDEX idx_compatibility_vehicle_id ON compatibility(vehicle_id);

-- ============================================
-- TRIGGER FUNCTIONS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parts_updated_at BEFORE UPDATE ON parts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_compatibility_updated_at BEFORE UPDATE ON compatibility
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA - Indian Automotive Parts
-- ============================================

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
