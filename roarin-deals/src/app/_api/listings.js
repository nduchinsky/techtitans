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
            [title, description, price, condition, tags, address1, address2, city, state, zip, req.userId]
        );

        res.status(201).json({ message: 'Listing created successfully', listing: result });
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
            [title, description, price, condition, tags, address1, address2, city, state, zip, listingId, req.userId]
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
        const listings = await db.any('SELECT * FROM LISTINGS_TABLE ORDER BY created_at DESC');
        res.status(200).json(listings);
    } catch (err) {
        console.error('Error fetching listings:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;