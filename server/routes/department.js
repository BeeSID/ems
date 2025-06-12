// Import Express
import express from 'express';

// Import middleware to verify JWT token and user authentication
import authMiddleware from '../middleware/authMiddleware.js';

// Import controller function to handle department logic
import { addDepartment } from '../controllers/departmentController.js';

// Create a new router instance
const router = express.Router();

// Protected route to add a new department
// Only accessible if the user is authenticated (authMiddleware)
router.post('/add', authMiddleware, addDepartment);

// Export the router to be used in the main server file
export default router;
