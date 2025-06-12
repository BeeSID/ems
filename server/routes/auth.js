// Import the Express framework
import express from 'express'

// Import login and verify controller functions
import { login, verify } from '../controllers/authcontroller.js'

// Import middleware to check if the user is authenticated via JWT
import authMiddleware from '../middleware/authMiddleware.js'

// Create a new router instance from Express
const router = express.Router()

// Route for user login
// Public route - no auth required
// Accepts email and password, returns token if valid
router.post('/login', login)

// Route to verify if the logged-in user is authenticated
// Protected route - requires a valid JWT token
router.get('/verify', authMiddleware, verify)

// Export the router so it can be used in the main server file
export default router
