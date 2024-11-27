const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./db');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }

    try {
        console.log("Received token:", token); // Log the token for debugging
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded);

        const user = await db.oneOrNone('SELECT id FROM users WHERE id = $1', [decoded.id]);
        if (!user) {
            console.error("Invalid token: User not found");
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.id; // Attach user ID to the request
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};

// Route to fetch user details
router.get('/', authenticate, async (req, res) => {
    try {
        console.log("Fetching details for user ID:", req.userId); // Log user ID
        const user = await db.oneOrNone('SELECT first_name, last_name, email, phone FROM users WHERE id = $1', [req.userId]);
        if (!user) {
            console.error("User not found in the database");
            return res.status(404).json({ error: 'User not found' });
        }

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

    if (!firstName || !lastName || !email || !currentPassword) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    try {
        console.log("Updating details for user ID:", req.userId); // Log user ID
        const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [req.userId]);
        if (!user) {
            console.error("User not found in the database");
            return res.status(404).json({ error: 'User not found' });
        }

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

// Route to verify the token
router.get('/verify-token', authenticate, (req, res) => {
    console.log("Token is valid for user ID:", req.userId); // Log user ID for token verification
    res.status(200).json({ message: 'Token is valid' });
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy and running' });
});

// Fallback route for unhandled requests (404)
router.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

module.exports = router;
