const { Permission } = require('../models');

// Create a new Permission
exports.createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = await Permission.create({ name, description });
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all permissions
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (!permission) return res.status(404).json({ error: 'Permission not found' });
    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePermissionById = async (req, res) => {
  try {
    const [affectedRows] = await Permission.update(req.body, { where: { id: req.params.id } });
    if (!affectedRows) return res.status(404).json({ error: 'Permission not found' });
    const updatedPermission = await Permission.findByPk(req.params.id);
    res.json(updatedPermission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePermissionById = async (req, res) => {
  const deleted = await Permission.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ error: 'Permission not found' });
  res.json({ message: 'Permission deleted' });
};