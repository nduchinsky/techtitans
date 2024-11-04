const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    // Check if the username already exists
    const userCheckQuery = 'SELECT * FROM example_table WHERE username = $1';
    const userCheckResult = await pool.query(userCheckQuery, [username]);

    if (userCheckResult.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = `
        INSERT INTO example_table (username, password, firstname, lastname)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, firstname, lastname
    `;
    const values = [username, hashedPassword, firstName, lastName];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
