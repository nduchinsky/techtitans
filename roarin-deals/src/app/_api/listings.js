const express = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('./db');
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await db.oneOrNone('SELECT id FROM USERS_TABLE WHERE id = $1', [decoded.id]);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.id; // Attach user ID to the request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    }
};

// Route to create a new listing
router.post('/', authenticate, async (req, res) => {
    console.log('POST /api/listings route hit'); // Debug log to confirm route is hit
    console.log('Request body:', req.body); // Log the request body

    const { 
        title, 
        description, 
        price, 
        condition, 
        tags, 
        address1, 
        address2, 
        city, 
        state, 
        zip 
    } = req.body;

    if (!title || !description || price == null || !condition || !tags || !address1 || !city || !state || !zip) {
        console.log('Validation failed:', { title, description, price, condition, tags, address1, city, state, zip });
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Ensure tags are stored as a string of comma-separated values
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    try {
        const result = await db.one(
            `
            INSERT INTO LISTINGS_TABLE (
                title, description, price, condition, tags, created_at, 
                address1, address2, city, state, zip, user_id
            )
            VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7, $8, $9, $10, $11)
            RETURNING *;
            `,
            [title, description, price, condition, tagsString, address1, address2, city, state, zip, req.userId]
        );

        res.status(201).json({ 
            message: 'Listing created successfully',
            listing: result,
            success: true 
        });
    } catch (err) {
        console.error('Error creating listing:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to edit a listing
router.put('/:id', authenticate, async (req, res) => {
    const listingId = req.params.id;
    const { 
        title, 
        description, 
        price, 
        condition, 
        tags, 
        address1, 
        address2, 
        city, 
        state, 
        zip 
    } = req.body;

    if (!title || !description || price == null || !condition || !tags || !address1 || !city || !state || !zip) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Ensure tags are stored as a string of comma-separated values
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    try {
        const listing = await db.oneOrNone('SELECT * FROM LISTINGS_TABLE WHERE id = $1 AND user_id = $2', [listingId, req.userId]);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found or unauthorized' });
        }

        await db.none(
            `
            UPDATE LISTINGS_TABLE
            SET 
                title = $1, 
                description = $2, 
                price = $3, 
                condition = $4, 
                tags = $5, 
                created_at = NOW(), 
                address1 = $6, 
                address2 = $7, 
                city = $8, 
                state = $9, 
                zip = $10
            WHERE id = $11 AND user_id = $12;
            `,
            [title, description, price, condition, tagsString, address1, address2, city, state, zip, listingId, req.userId]
        );

        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (err) {
        console.error('Error updating listing:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a listing
router.delete('/:id', authenticate, async (req, res) => {
    const listingId = req.params.id;

    try {
        const listing = await db.oneOrNone('SELECT * FROM LISTINGS_TABLE WHERE id = $1 AND user_id = $2', [listingId, req.userId]);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found or unauthorized' });
        }

        await db.none('DELETE FROM LISTINGS_TABLE WHERE id = $1 AND user_id = $2', [listingId, req.userId]);

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('Error deleting listing:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch all listings
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                l.*,
                u.first_name,
                u.last_name 
            FROM LISTINGS_TABLE l
            LEFT JOIN USERS_TABLE u ON u.id = l.user_id
        `;
        
        const listings = await db.any(query);
        console.log('First listing tags:', listings[0]?.tags); // Debug log
        res.json(listings);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            error: 'Error fetching listings',
            message: error.message
        });
    }
});

// Update the /user route with better error handling and connection checks
router.get('/user', authenticate, async (req, res) => {
    try {
        // Add error checking for userId
        if (!req.userId) {
            console.error('[ERROR] No userId provided');
            return res.status(400).json({ error: 'User ID is required' });
        }

        console.log(`[DEBUG] Fetching listings for userId: ${req.userId}`);

        // Simplified query with better error handling
        const listings = await db.any(`
            SELECT id, title, description, price, condition 
            FROM LISTINGS_TABLE 
            WHERE user_id = $1
            ORDER BY created_at DESC
        `, [req.userId]);

        console.log(`[DEBUG] Found ${listings.length} listings for user ${req.userId}`);
        return res.json(listings);
        
    } catch (error) {
        console.error('[ERROR] Failed to fetch listings:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch listings',
            details: error.message
        });
    }
});

module.exports = router;
