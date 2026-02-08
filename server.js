require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'autopart_connect',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// ============================================
// API ROUTES
// ============================================

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    });
  }
});

// GET /api/parts - Retrieve parts with optional vehicle filtering
// Query parameters:
//   - year: Filter by vehicle year
//   - model: Filter by vehicle model
//   - make: Filter by vehicle make (optional)
//   - brand: Filter by part brand (optional)
app.get('/api/parts', async (req, res) => {
  try {
    const { year, model, make, brand } = req.query;

    let query;
    let params = [];
    let paramIndex = 1;

    // If vehicle filters are provided, use JOIN to find compatible parts
    if (year || model || make) {
      query = `
        SELECT DISTINCT
          p.id,
          p.name,
          p.brand,
          p.price,
          p.description,
          p.part_number,
          p.stock_quantity,
          p.category,
          p.model_url,
          v.year,
          v.make,
          v.model,
          v.trim,
          c.verified,
          c.notes AS compatibility_notes
        FROM parts p
        INNER JOIN compatibility c ON p.id = c.part_id
        INNER JOIN vehicles v ON c.vehicle_id = v.id
        WHERE 1=1
      `;

      // Add vehicle filters dynamically
      if (year) {
        query += ` AND v.year = $${paramIndex}`;
        params.push(parseInt(year));
        paramIndex++;
      }

      if (model) {
        query += ` AND LOWER(v.model) = LOWER($${paramIndex})`;
        params.push(model);
        paramIndex++;
      }

      if (make) {
        query += ` AND LOWER(v.make) = LOWER($${paramIndex})`;
        params.push(make);
        paramIndex++;
      }

      if (brand) {
        query += ` AND LOWER(p.brand) = LOWER($${paramIndex})`;
        params.push(brand);
        paramIndex++;
      }

      query += ' ORDER BY p.name, p.brand';

    } else {
      // No vehicle filters - return all parts
      query = `
        SELECT 
          id,
          name,
          brand,
          price,
          description,
          part_number,
          stock_quantity,
          category,
          model_url
        FROM parts
      `;

      if (brand) {
        query += ` WHERE LOWER(brand) = LOWER($1)`;
        params.push(brand);
      }

      query += ' ORDER BY name, brand';
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      filters: { year, model, make, brand },
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching parts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve parts',
      message: error.message
    });
  }
});

// GET /api/parts/:id - Get a specific part by ID
app.get('/api/parts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT 
        p.*,
        json_agg(
          json_build_object(
            'vehicle_id', v.id,
            'year', v.year,
            'make', v.make,
            'model', v.model,
            'trim', v.trim,
            'verified', c.verified,
            'notes', c.notes
          )
        ) FILTER (WHERE v.id IS NOT NULL) AS compatible_vehicles
      FROM parts p
      LEFT JOIN compatibility c ON p.id = c.part_id
      LEFT JOIN vehicles v ON c.vehicle_id = v.id
      WHERE p.id = $1
      GROUP BY p.id
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Part not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error fetching part:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve part',
      message: error.message
    });
  }
});

// GET /api/vehicles - Get all vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const query = `
      SELECT * FROM vehicles
      ORDER BY year DESC, make, model
    `;

    const result = await pool.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve vehicles',
      message: error.message
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 AutoPart-Connect server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 Parts API: http://localhost:${PORT}/api/parts`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('Database pool closed');
  });
});
