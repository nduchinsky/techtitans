const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'techtitans', 
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

// Function to create a table
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS example_table (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL
        )
    `;
    try {
        await pool.query(query);
        console.log("Table created successfully");
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        await pool.end(); // Close the pool
    }
};

// Export the createTable function
module.exports = { createTable };
