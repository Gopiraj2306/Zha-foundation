const { Role } = require('../models');

exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Role name is required' });
    }
    const role = await Role.create({ name, description });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRoleById = async (req, res) => {
  try {
    const [updatedCount] = await Role.update(req.body, { where: { id: req.params.id } });
    if (!updatedCount) return res.status(404).json({ error: 'Role not found' });
    const updatedRole = await Role.findByPk(req.params.id);
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRoleById = async (req, res) => {
  try {
    const deletedCount = await Role.destroy({ where: { id: req.params.id } });
    if (!deletedCount) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
