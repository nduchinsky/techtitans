const express = require('express');
const cors = require('cors');
const { createUsersTable } = require('./db');
const registerRoute = require('./register');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for requests from any origin (you can specify origins here)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use the register route at the /api path
app.use('/api', registerRoute);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        await createUsersTable();  // Ensure table creation happens on server start
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});
