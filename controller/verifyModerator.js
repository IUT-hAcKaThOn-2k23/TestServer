const jwt = require('jsonwebtoken');

module.exports = function verifyModerator(req, res, next) {
  // Get auth header value
  const token = req.header('auth-token');
    // Check if not token
    if (!token) {
        return res.status(407).json({ msg: 'No token, authorization denied' });
        }
    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.mod = decoded;
        next();
    }
    catch (err) {
        res.status(405).json({ msg: 'Token is not valid' });
    }

  }
