const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('./db');

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const fullEmail = `${email}@umsystem.edu`;

  const userCheckQuery = 'SELECT * FROM USERS_TABLE WHERE email = $1';
  try {
    console.log('Checking for user with email:', fullEmail);
    const userCheckResult = await db.oneOrNone(userCheckQuery, [fullEmail]);
    if (!userCheckResult) {
      console.log('User not found:', fullEmail);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('User found, checking password...');
    const isMatch = await bcrypt.compare(password, userCheckResult.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', fullEmail);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('Password match, generating token...');
    // Generate a JWT token with user ID in the payload
    const token = jwt.sign({ id: userCheckResult.id }, JWT_SECRET, { expiresIn: '7d' });

    console.log('Login successful, returning token.');
    // Respond with JSON containing the token and optional user data for frontend
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: userCheckResult.id,
        email: userCheckResult.email,
        firstName: userCheckResult.first_name,
        lastName: userCheckResult.last_name,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
