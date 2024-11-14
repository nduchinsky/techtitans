const pgp = require('pg-promise')();
require('dotenv').config();

// Initialize pg-promise with the database connection
const db = pgp({
    host: process.env.DB_HOST,
    port: 5432, 
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
});

// Function to create a table
const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            phone BIGINT
        )
    `;
    try {
        // Use db.none() for queries that don't return data (like CREATE TABLE)
        await db.none(query);
        console.log("Table created successfully");
    } catch (err) {
        console.error("Error creating table:", err);
    }
};

// Export db connection and createUsersTable function
module.exports = { db, createUsersTable };
