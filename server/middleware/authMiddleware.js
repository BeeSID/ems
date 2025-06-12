// Import JWT for token verification and User model to fetch user details
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware function to verify JWT and authenticate the user
const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No token provided.' });
    }

    // Extract token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find user by decoded ID and exclude password from the result
    const user = await User.findById(decoded._id).select('-password');

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    // Attach user to the request object for use in next middleware or route
    req.user = user;

    // Continue to next middleware or route
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);

    // Handle expired token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, error: 'Token has expired.' });
    }

    // Handle other token-related errors
    return res.status(401).json({ success: false, error: 'Unauthorized. Invalid or expired token.' });
  }
};

export default verifyUser;
