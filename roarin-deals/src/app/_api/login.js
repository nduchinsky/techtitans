const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('./db');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const fullEmail = `${email}@umsystem.edu`;

  const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
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

    console.log('Password match, login successful for user:', fullEmail);
    res.status(200).json({ message: 'Login successful', user: userCheckResult });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
