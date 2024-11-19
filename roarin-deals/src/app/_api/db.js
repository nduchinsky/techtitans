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
        console.log("Users table created successfully");
    } catch (err) {
        console.error("Error creating Users table:", err);
    }
};

const createTempProductsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS ProductsTemp (
            post_id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            description VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image BYTEA,
            furniture BOOLEAN DEFAULT FALSE,
            electronics BOOLEAN DEFAULT FALSE,
            books BOOLEAN DEFAULT FALSE,
            clothing BOOLEAN DEFAULT FALSE,
            home_goods BOOLEAN DEFAULT FALSE,
            misc BOOLEAN DEFAULT FALSE
        );    
    `;
    try {
        // Use db.none() for queries that don't return data (like CREATE TABLE)
        await db.none(query);
        console.log("Product table created successfully");
    } catch (err) {
        console.error("Error creating product table:", err);
    }
};

const createTempAddressesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS Addresses (
            post_id INTEGER PRIMARY KEY,
            street VARCHAR(255),
            city VARCHAR(100),
            state VARCHAR(2),
            zip VARCHAR(6),
            FOREIGN KEY (post_id) REFERENCES Products (post_id) ON DELETE CASCADE
        );
    `;
    try {
        // Use db.none() for queries that don't return data (like CREATE TABLE)
        await db.none(query);
        console.log("addresses table created successfully");
    } catch (err) {
        console.error("Error creating addresses table:", err);
    }
};

module.exports = { db, createUsersTable, createTempProductsTable, createTempAddressesTable };
