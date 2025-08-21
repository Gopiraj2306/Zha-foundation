const { UserRole } = require('../models');

// Add a role to a user
exports.addRoleToUser = async (req, res) => {
  try {
    const { user_id, role_id, context_table, context_id } = req.body;
    const userRole = await UserRole.create({ user_id, role_id, context_table, context_id });
    res.status(201).json(userRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all user-role mappings
exports.getAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll();
    res.json(userRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUserRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserRole.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'UserRole mapping not found' });
    res.json({ message: 'UserRole deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};