// src/app/api/logout.js
import withSession from '../../lib/session';

const logoutHandler = withSession((req, res) => {
  req.session = null; // This will clear the session cookie
  res.status(200).json({ message: 'Logged out successfully' });
});

export { logoutHandler };
