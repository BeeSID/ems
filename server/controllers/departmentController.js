import Department from "../models/Department.js";

// Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error while fetching departments"
    });
  }
};

// Add a new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    if (!dep_name || dep_name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: "Department name is required"
      });
    }

    const existing = await Department.findOne({
      dep_name: new RegExp(`^${dep_name.trim()}$`, 'i')
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "Department already exists"
      });
    }

    const newDep = new Department({
      dep_name: dep_name.trim(),
      description: typeof description === 'string' ? description.trim() : ""
    });

    await newDep.save();

    return res.status(201).json({
      success: true,
      department: newDep
    });

  } catch (error) {
    console.error("Error adding department:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export { addDepartment, getDepartments };
