const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createUsersTable, dropProductsTable, createTempProductsTable, createTempAddressesTable } = require('./db');
const registerRoute = require('./register');
const loginRoute = require('./login');
const settingsRoute = require('./settings'); // Import the settings route
const listingsRoute = require('./listings'); // Adding route to fetch listings from backend
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Validate required environment variables
const requiredEnv = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log HTTP requests

// API Routes
app.use('/api/register', registerRoute); // Registration route
app.use('/api/login', loginRoute);       // Login route
app.use('/api/settings', settingsRoute); // Settings route

// Fallback for unhandled routes
app.use((req, res) => {
    console.log(`Unhandled route: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Route not found' });
});

// Centralized error handling
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: 'Internal server error' });
});

// Server Initialization
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        await createUsersTable(); // Ensure Users table exists
        // Uncomment if needed
        // await createTempProductsTable();
        // await createTempAddressesTable();
    } catch (error) {
        console.error("Error during table creation:", error);
        process.exit(1); // Exit the server on critical failure
    }
});
