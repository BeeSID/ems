import mongoose from 'mongoose';

// Function to connect to MongoDB using Mongoose
const connectToDatabase = async () => {
  try {
    // Attempt to connect using the MongoDB URL from environment variables
    await mongoose.connect(process.env.MONGODB_URL);

    // If successful, log a success message
    console.log("Connected to MongoDB");
  } catch (error) {
    // If there's an error, log it and exit the process
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit with failure code
  }
};

export default connectToDatabase;
