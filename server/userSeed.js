// Import the User model
import User from "./models/User.js";

// Import bcrypt to hash passwords securely
import bcrypt from 'bcrypt';

// Import database connection function
import connectToDatabase from './db/db.js';

// Function to create an admin user in the database
const userRegister = async () => {
  // Connect to MongoDB
  await connectToDatabase();

  try {
    // Hash the default password 'admin' for security
    const hashPassword = await bcrypt.hash("admin", 10);

    // Create a new user document with admin role
    const newUser = new User({
      name: "Admin",                // Admin's name
      email: "admin@gmail.com",     // Admin's email
      password: hashPassword,       // Hashed password
      role: "admin"                 // Set user role as 'admin'
    });

    // Save the user to the database
    await newUser.save();

    // Log success message
    console.log("User created successfully");

    // Exit the script successfully
    process.exit(0);
  } catch (error) {
    // Log error message if seeding fails
    console.log("Seeding failed ", error);

    // Exit the script with an error
    process.exit(1);
  }
}

// Run the userRegister function
userRegister();
