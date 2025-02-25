const { Roles } = require('../models');

// **Add a Role**
exports.addRole = async (req, res) => {
    try {
        const { role_name } = req.body;
        if (!role_name) return res.status(400).json({ message: 'Role name is required' });

        const newRole = await Roles.create({ role_name });
        res.status(201).json({ message: 'Role added successfully', role: newRole });
    } catch (error) {
        res.status(500).json({ message: 'Error adding role', error });
    }
};

// **Get All Roles**
exports.getRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error });
    }
};

// **Delete a Role**
exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Roles.findByPk(id);

        if (!role) return res.status(404).json({ message: 'Role not found' });

        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role', error });
    }
};
