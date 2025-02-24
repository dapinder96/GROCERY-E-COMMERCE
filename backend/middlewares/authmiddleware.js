const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

  try {
    const verified = verifyToken(token.replace('Bearer ', ''));
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

module.exports = authMiddleware;

