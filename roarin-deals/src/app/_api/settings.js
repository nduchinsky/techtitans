const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add for token validation
const { db } = require('./db');
const router = express.Router();

// Secret key for JWT (ensure this matches what is used in login.js/AuthContext.tsx)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to verify if the user is logged in
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token
    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }

    try {
        // Verify token and decode payload
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // Check if user exists in the database
        const user = await db.oneOrNone('SELECT id FROM users WHERE id = $1', [decoded.id]);
        if (!user) {
            console.error("Invalid token: User not found");
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.id; // Attach userId to the request for downstream routes
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};

// Route to fetch user details
router.get('/', authenticate, async (req, res) => {
    try {
        const user = await db.one('SELECT first_name, last_name, email, phone FROM users WHERE id = $1', [req.userId]);
        res.status(200).json({
            username: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone,
        });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update user details
router.put('/', authenticate, async (req, res) => {
    const { firstName, lastName, email, phone, currentPassword, newPassword } = req.body;

    try {
        const user = await db.one('SELECT * FROM users WHERE id = $1', [req.userId]);

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash new password if provided
        const updatedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : user.password;

        // Update user details
        await db.none(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6',
            [firstName, lastName, email, phone, updatedPassword, req.userId]
        );

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (err) {
        console.error('Error updating user data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add token verification route
router.get('/verify-token', authenticate, (req, res) => {
    console.log("Token is valid for user ID:", req.userId);
    res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;
