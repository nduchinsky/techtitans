const express = require('express');
const cors = require('cors');
const { createUsersTable, createTempProductsTable, createTempAddressesTable } = require('./db');
const registerRoute = require('./register');
const loginRoute = require('./login');
const { create } = require('domain');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        await createUsersTable();
        await createTempProductsTable();
        await createTempAddressesTable();
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});
