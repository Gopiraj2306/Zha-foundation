const { RolePermission } = require('../models');

// Add a permission to a role
exports.addPermissionToRole = async (req, res) => {
  try {
    const { role_id, permission_id } = req.body;
    const rolePermission = await RolePermission.create({ role_id, permission_id });
    res.status(201).json(rolePermission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all role-permission mappings
exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.json(rolePermissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteRolePermission = async (req, res) => {
  try {
    const { role_id, permission_id } = req.query;
    if (!role_id || !permission_id) {
      return res.status(400).json({ error: 'role_id and permission_id are required' });
    }
    const deleted = await RolePermission.destroy({ where: { role_id, permission_id } });
    if (!deleted) return res.status(404).json({ error: 'RolePermission mapping not found' });
    res.json({ message: 'RolePermission deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};