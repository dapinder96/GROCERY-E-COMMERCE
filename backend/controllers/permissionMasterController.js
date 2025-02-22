const db = require('../models'); 
const PermissionMaster = db.PermissionMaster;

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { permission_name } = req.body;
    const permission = await PermissionMaster.create({ permission_name });
    res.status(201).json(permission);
  } catch (error) {
    console.error('Error creating permission:', error);
    res.status(500).json({ error: 'Failed to create permission' });
  }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await PermissionMaster.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ error: 'Failed to fetch permissions' });
  }
};

// Get a permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await PermissionMaster.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    console.error('Error fetching permission:', error);
    res.status(500).json({ error: 'Failed to fetch permission' });
  }
};

// Update a permission
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission_name } = req.body;
    const permission = await PermissionMaster.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    await permission.update({ permission_name });
    res.status(200).json(permission);
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'Failed to update permission' });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await PermissionMaster.findByPk(id);
    if (!permission) {
      return res.status(404).json({ error: 'Permission not found' });
    }
    await permission.destroy();
    res.status(204).send(); // No content response
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ error: 'Failed to delete permission' });
  }
};