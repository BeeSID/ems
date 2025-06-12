// Import mongoose to define schema and interact with MongoDB
import mongoose from "mongoose";

// Define the structure of a department document in MongoDB
const departmentSchema = new mongoose.Schema({
    // Name of the department (required field)
    dep_name: {
        type: String,
        required: true
    },

    // Optional description for the department
    description: {
        type: String
    },

    // Timestamp for when the department was created (default: current time)
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Timestamp for when the department was last updated (default: current time)
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model called "Department" using the defined schema
const Department = mongoose.model("Department", departmentSchema);

// Export the model to be used in controllers or routes
export default Department;
