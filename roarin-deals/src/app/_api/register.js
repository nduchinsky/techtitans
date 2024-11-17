const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('./db');
const router = express.Router();

// Define the route without '/register' since it's already specified in server.js
router.post('/', async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    const fullEmail = `${email}@umsystem.edu`;

    // Checking if the email already exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
    try {
        const userCheckResult = await db.any(userCheckQuery, [fullEmail]);
        if (userCheckResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserting the new user into the database
        const insertQuery = `
            INSERT INTO users (first_name, last_name, email, password, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, phone
        `;
        const values = [firstName, lastName, fullEmail, hashedPassword, phone];

        // Using db.one to get the inserted user's data
        const result = await db.one(insertQuery, values);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
