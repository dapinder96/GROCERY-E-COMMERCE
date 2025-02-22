const express = require("express");
const {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState
} = require("../controllers/stateController");

const router = express.Router();

// Routes for state CRUD operations
router.get("/states", getAllStates);
router.get("/states/:id", getStateById);
router.post("/states", createState); // Supports adding multiple states at once
router.put("/states/:id", updateState);
router.delete("/states/:id", deleteState);

module.exports = router;
