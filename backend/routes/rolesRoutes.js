const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');

router.post('/roles', rolesController.addRole); // Add a new role
router.get('/roles', rolesController.getRoles); // Get all roles
router.delete('/roles/:id', rolesController.deleteRole); // Delete a role by ID

module.exports = router;

