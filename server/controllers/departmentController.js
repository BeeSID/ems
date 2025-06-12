import Department from "../models/Department.js";

// Controller to handle adding a new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Validate: dep_name must be provided
    if (!dep_name || dep_name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: "Department name is required"
      });
    }

    // Check for existing department (case-insensitive match)
    const existing = await Department.findOne({
      dep_name: new RegExp(`^${dep_name.trim()}$`, 'i')
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "Department already exists"
      });
    }

    // Create a new department document
    const newDep = new Department({
      dep_name: dep_name.trim(),
      description: description?.trim() || "" // Default to empty string if no description
    });

    // Save to the database
    await newDep.save();

    // Respond with the created department
    return res.status(201).json({
      success: true,
      department: newDep
    });

  } catch (error) {
    // Log and return error if something goes wrong
    console.error("Error adding department:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export { addDepartment };
