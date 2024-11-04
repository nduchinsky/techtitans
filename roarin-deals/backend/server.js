const express = require('express');
const { createTable } = require('./db');
const registerRoute = require('./register');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3100;

// Middleware to parse JSON
app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    // Create the table when the server starts
    try {
        await createTable();
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});

// Use the register route
app.use('/api', registerRoute);
