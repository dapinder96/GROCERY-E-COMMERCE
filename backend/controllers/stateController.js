const { State } = require("../models");



// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a state by ID
const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new state (supports single & multiple insert)
const createState = async (req, res) => {
  try {
    const { states } = req.body; // Expecting an array of states [{ name: "X", country_id: Y }]
    
    if (!Array.isArray(states) || states.length === 0) {
      return res.status(400).json({ message: "Provide an array of states" });
    }

    const newStates = await State.bulkCreate(states);
    res.status(201).json(newStates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a state by ID
const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country_id } = req.body;

    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    await state.update({ name, country_id });
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a state by ID
const deleteState = async (req, res) => {
  try {
    const { id } = req.params;

    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    await state.destroy();
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
};
