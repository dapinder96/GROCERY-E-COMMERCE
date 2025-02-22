const { Region } = require("../models");

// Get all regions
const getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a region by ID
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new region (supports single & multiple insert)
const createRegion = async (req, res) => {
  try {
    const { regions } = req.body;
    
    if (!Array.isArray(regions) || regions.length === 0) {
      return res.status(400).json({ message: "Provide an array of regions" });
    }

    const newRegions = await Region.bulkCreate(regions);
    res.status(201).json(newRegions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a region by ID
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state_id } = req.body;

    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }

    await region.update({ name, state_id });
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a region by ID
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const region = await Region.findByPk(id);
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }

    await region.destroy();
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
};
