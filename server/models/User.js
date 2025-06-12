// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
    // User's full name (required field)
    name: {
        type: String,
        required: true
    },

    // Email address (must be unique and required)
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Encrypted password (required)
    password: {
        type: String,
        required: true
    },

    // Role of the user: either "admin" or "employee"
    role: {
        type: String,
        enum: ["admin", "employee"],
        required: true
    },

    // Optional profile image URL or path
    profileImage: {
        type: String
    },

    // Timestamp when the user was created (default is current time)
    createAt: {
        type: Date,
        default: Date.now
    },

    // Timestamp when the user was last updated (default is current time)
    updateAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model named "User" based on the schema
const User = mongoose.model("User", userSchema);

// Export the model to use in controllers, routes, etc.
export default User;
