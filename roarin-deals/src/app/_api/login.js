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
    const userCheckResult = await db.oneOrNone(userCheckQuery, [fullEmail]);
    if (!userCheckResult) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, userCheckResult.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: userCheckResult.id }, JWT_SECRET, { expiresIn: '7d' });

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
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
