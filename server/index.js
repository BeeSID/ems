// Import core modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import custom route handlers
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';

// Import DB connection function
import connectToDatabase from './db/db.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectToDatabase(); // Ensures database is connected before handling requests

// Initialize Express app
const app = express();

// Middleware to enable CORS (for frontend-backend communication)
app.use(cors());

// Middleware to parse incoming JSON payloads
app.use(express.json());

// API route registration
app.use('/api/auth', authRouter); // Handles login and registration
app.use('/api/department', departmentRouter); // Handles department-related operations

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
