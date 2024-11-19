const express = require('express');
const { createTable } = require('./db'); // Adjust the path if necessary
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        await createTable();  // Attempt to delete the table on startup
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});
