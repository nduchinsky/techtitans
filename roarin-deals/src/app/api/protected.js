// src/app/api/protected.js
import withSession from '../../lib/session';

const protectedHandler = withSession(async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // If the user is authenticated, send back their session information
  res.status(200).json({ message: 'Protected content accessed', user: req.session.user });
});

export { protectedHandler };
