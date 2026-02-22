const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'autopart_connect',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to database');

        // Check if tables exist
        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        console.log('Tables found:', res.rows.map(r => r.table_name));

        // Check if parts table has data
        if (res.rows.find(r => r.table_name === 'parts')) {
            const parts = await client.query('SELECT COUNT(*) FROM parts');
            console.log(`Initial part count: ${parts.rows[0].count}`);
        } else {
            console.log('❌ Parts table not found');
        }

        client.release();
    } catch (err) {
        console.error('❌ Connection error:', err.message);
    } finally {
        pool.end();
    }
}

testConnection();
