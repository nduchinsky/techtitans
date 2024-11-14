const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'techtitans', 
    password: process.env.DB_PASSWORD,
    port: 5432,
<<<<<<< HEAD
    ssl: false
});

// Function to create a table
const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL
            last_name VARCHAR(100) NOT NULL
            email VARCHAR(100) NOT NULL
            password VARCHAR(100) NOT NULL
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
=======
    ssl: { 
        rejectUnauthorized: false
    }
});

// Function to create a table
    const createTable = async () => {
        const query = `
            CREATE TABLE IF NOT EXISTS insert_table_name (
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
>>>>>>> 9468d7179f1b56eeefe789893d36d59f589bee82

module.exports = { createTable };
