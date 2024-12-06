const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('./db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password, firstName, lastName, } = req.body;

    const fullEmail = `${email}@umsystem.edu`;
    const username = email;

    // Checking if the email already exists
    const userCheckQuery = 'SELECT * FROM USERS_TABLE WHERE email = $1';
    try {
        const userCheckResult = await db.any(userCheckQuery, [fullEmail]);
        if (userCheckResult.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserting the new user into the database
        const insertQuery = `
            INSERT INTO USERS_TABLE (email, first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [fullEmail, firstName, lastName, username, hashedPassword];
        const result = await db.one(insertQuery, values);

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
