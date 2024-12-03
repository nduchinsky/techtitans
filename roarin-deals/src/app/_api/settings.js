const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./db');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('Authentication failed: No Authorization header');
        return res.status(401).json({ error: 'Unauthorized: Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Authentication failed: No token provided');
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await db.oneOrNone('SELECT id FROM users WHERE id = $1', [decoded.id]);

        if (!user) {
            console.log('Authentication failed: User not found');
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log('Authentication error:', err.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};

// Route to fetch user details
router.get('/', authenticate, async (req, res) => {
    try {
        const user = await db.oneOrNone(
            'SELECT first_name, last_name, email, phone FROM users WHERE id = $1',
            [req.userId]
        );

        if (!user) {
            console.log(`User with ID ${req.userId} not found.`);
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Database error fetching user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to verify the token
router.get('/verify-token', authenticate, (req, res) => {
    console.log('GET /api/settings/verify-token - Token verified for user ID:', req.userId);
    res.status(200).json({ message: 'Token is valid' });
});

// Health check endpoint
router.get('/health', async (req, res) => {
    try {
        await db.one('SELECT 1'); // Test database connection
        res.status(200).json({ message: 'Server is healthy and database connected' });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(500).json({ error: 'Server or database is unavailable' });
    }
});

// Route to update user details
router.put('/', authenticate, async (req, res) => {
    const { first_name, last_name, email, phone, currentPassword, newPassword } = req.body;

    if (!first_name && !last_name && !email && !phone && !newPassword) {
        return res.status(400).json({ error: 'No valid fields provided for update' });
    }

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [req.userId]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password if new password is being set
        if (newPassword) {
            const passwordMatches = await bcrypt.compare(currentPassword, user.password);
            if (!passwordMatches) {
                return res.status(403).json({ error: 'Current password is incorrect' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await db.none(
                'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4, password = $5 WHERE id = $6',
                [
                    first_name || user.first_name,
                    last_name || user.last_name,
                    email || user.email,
                    phone || user.phone,
                    hashedPassword,
                    req.userId,
                ]
            );
        } else {
            // Update without changing password
            await db.none(
                'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone = $4 WHERE id = $5',
                [
                    first_name || user.first_name,
                    last_name || user.last_name,
                    email || user.email,
                    phone || user.phone,
                    req.userId,
                ]
            );
        }

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (err) {
        console.error('Error updating user data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fallback route for unhandled requests (404)
router.use((req, res) => {
    console.log(`Unhandled route: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Route not found' });
});

module.exports = router;
