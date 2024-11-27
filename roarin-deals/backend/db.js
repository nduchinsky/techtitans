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
            CREATE TABLE LISTINGS_TABLE (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                condition VARCHAR(255) NOT NULL,
                tags VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                address1 VARCHAR(255) NOT NULL,
                address2 VARCHAR(255),
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL,
                zip VARCHAR(255) NOT NULL,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
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

//async function deleteTable() {
//    const query = 'DROP TABLE IF EXISTS example_table;';
//    try {
//        const res = await pool.query(query);
//        console.log("Table deleted successfully");
//    } catch (err) {
//        console.error("Error deleting table:", err);
//    } finally {
//        await pool.end();
//    }
//}

module.exports = { createTable };
