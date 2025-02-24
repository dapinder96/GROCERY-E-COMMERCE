const { Department } = require("../models");

// Create a new department
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const department = await Department.create({ name });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error creating department", error });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching departments", error });
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error fetching department", error });
  }
};

// Update a department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    department.name = name;
    await department.save();
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Error updating department", error });
  }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    await department.destroy();
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting department", error });
  }
};

