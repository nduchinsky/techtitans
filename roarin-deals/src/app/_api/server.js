const express = require('express');
const cors = require('cors');
const { createUsersTable, dropProductsTable, createTempProductsTable, createTempAddressesTable } = require('./db');
const registerRoute = require('./register');
const loginRoute = require('./login');
const settingsRoute = require('./settings'); // Import the settings route
const listingsRoute = require('./listings'); // Adding route to fetch listings from backend
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use('/api/register', registerRoute); // Registration route
app.use('/api/login', loginRoute);       // Login route
app.use('/api/settings', settingsRoute); // Settings route for user details, token validation, etc.
app.use('/api/listings', listingsRoute); // Listings route

// Catch-all for undefined routes (404 handler)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (optional, for internal server errors)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Server Initialization
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        // Initialize the database tables
        await createUsersTable(); // Create Users table if it doesn't exist
        // Uncomment the following lines to create additional tables if needed
        // await createTempProductsTable();
        // await createTempAddressesTable();
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});
