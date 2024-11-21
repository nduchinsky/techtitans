const express = require('express');
const cors = require('cors');
const { createUsersTable, createTempProductsTable, createTempAddressesTable, dropProductsTable } = require('./db');
const registerRoute = require('./register');
const { loginHandler } = require('../../lib/login');
require('dotenv').config();

const router = express.Router();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true,
  }));

app.use(express.json());

app.use('/api/register', registerRoute);
router.post('/login', loginHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        await createUsersTable();
        // await createTempProductsTable();
        // await createTempAddressesTable();
    } catch (error) {
        console.error("Error during table creation:", error);
    }
});

module.exports = router;
