const express = require('express');
const router = express.Router();
const permissionMasterController = require('../controllers/permissionMasterController');

// Create a new permission
router.post('/', permissionMasterController.createPermission);

// Get all permissions
router.get('/', permissionMasterController.getAllPermissions);

// Get a permission by ID
router.get('/:id', permissionMasterController.getPermissionById);

// Update a permission
router.put('/:id', permissionMasterController.updatePermission);

// Delete a permission
router.delete('/:id', permissionMasterController.deletePermission);

module.exports = router;