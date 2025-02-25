const express = require("express");
const {
  getAllRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion
} = require("../controllers/regionController");

const router = express.Router();

// Routes for region CRUD operations
router.get("/regions", getAllRegions);
router.get("/regions/:id", getRegionById);
router.post("/regions", createRegion);
router.put("/regions/:id", updateRegion);
router.delete("/regions/:id", deleteRegion);

module.exports = router;
