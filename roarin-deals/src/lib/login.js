const bcrypt = require('bcrypt');
const { db } = require('../app/api/db'); // Assuming db is configured correctly

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', { email, password });  // Debug log
  
  // Query the database for the user
  const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Create session logic here (if applicable)
  req.session.user = {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
  };

  await req.session.save();

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
    },
  });
};

module.exports = { loginHandler };
