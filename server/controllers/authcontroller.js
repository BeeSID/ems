import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if user exists in the DB by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Step 2: Compare the given password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    // Step 3: Create a signed JWT token valid for 2 days
    const token = jwt.sign(
      { _id: user._id, role: user.role }, // payload
      process.env.JWT_KEY,               // secret key
      { expiresIn: "2d" }                // token expiry
    );

    // Step 4: Return success response with token and user info (excluding password)
    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      }
    });

  } catch (error) {
    // If any unexpected error occurs
    console.error("Login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again."
    });
  }
};

// Controller to verify a user's JWT and return their data
const verify = (req, res) => {
  // req.user is set from auth middleware after token verification
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

export { login, verify };
