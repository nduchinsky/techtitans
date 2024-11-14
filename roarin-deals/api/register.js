const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('./db'); // Importing db from the db file
const router = express.Router();

const emailDomain = '@umsystem.edu';

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    const fullEmail = `${email}${emailDomain}`;

    // Check if the email already exists
    const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
    try {
        const userCheckResult = await db.any(userCheckQuery, [fullEmail]);  // This returns rows
        if (userCheckResult.length > 0) {  // userCheckResult is an array
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertQuery = `
            INSERT INTO users (first_name, last_name, email, password, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, phone
        `;
        const values = [firstName, lastName, fullEmail, hashedPassword, phone];

        // Use db.one to get the inserted user's data
        const result = await db.one(insertQuery, values);
        res.status(201).json(result);  // Returning the user data (including the id)
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
