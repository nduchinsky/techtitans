// lib/session.js
const session = require('cookie-session');

const withSession = (handler) => {
  return (req, res, next) => {
    session({
      name: 'session',
      keys: [process.env.SESSION_SECRET],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req, res, () => {
      handler(req, res, next);  // Pass next to ensure Express can handle it
    });
  };
};

// Directly export the function, not an object
module.exports = withSession;
