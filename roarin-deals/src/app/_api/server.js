const express = require('express');
const cors = require('cors');
const { createUsersTable, dropProductsTable, createTempProductsTable, createTempAddressesTable } = require('./db');
const registerRoute = require('./register');
const loginRoute = require('./login');
const settingsRoute = require('./settings'); // Import the settings route
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
