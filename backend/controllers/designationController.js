const db = require('../models');
const Designation = db.Designation;

// Create a new designation
exports.createDesignation = async (req, res) => {
  try {
    const { title } = req.body;
    const designation = await Designation.create({ title });
    res.status(201).json(designation);
  } catch (error) {
    console.error('Error creating designation:', error);
    res.status(500).json({ error: 'Failed to create designation' });
  }
};

// Get all designations
exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.status(200).json(designations);
  } catch (error) {
    console.error('Error fetching designations:', error);
    res.status(500).json({ error: 'Failed to fetch designations' });
  }
};

// Get a designation by ID
exports.getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    res.status(200).json(designation);
  } catch (error) {
    console.error('Error fetching designation:', error);
    res.status(500).json({ error: 'Failed to fetch designation' });
  }
};

// Update a designation
exports.updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const designation = await Designation.findByPk(id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    await designation.update({ title });
    res.status(200).json(designation);
  } catch (error) {
    console.error('Error updating designation:', error);
    res.status(500).json({ error: 'Failed to update designation' });
  }
};

// Delete a designation
exports.deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);
    if (!designation) {
      return res.status(404).json({ error: 'Designation not found' });
    }
    await designation.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting designation:', error);
    res.status(500).json({ error: 'Failed to delete designation' });
  }
};

