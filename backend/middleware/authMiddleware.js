const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

const authMiddleware = (req, res, next) => {

    const secretKey = generateSecretKey();
    console.log('Generated Secret Key:', secretKey);
  // Get the token from the request headers

  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the user information to the request object
    req.user = decoded.user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
