const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

// Create a new designation
router.post('/', designationController.createDesignation);

// Get all designations
router.get('/', designationController.getAllDesignations);

// Get a designation by ID
router.get('/:id', designationController.getDesignationById);

// Update a designation
router.put('/:id', designationController.updateDesignation);

// Delete a designation
router.delete('/:id', designationController.deleteDesignation);

module.exports = router;