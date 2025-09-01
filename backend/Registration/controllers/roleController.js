const Role = require('../models/role');
const Permission = require('../models/Permission');
const { log } = require('node:console');
// const { log } = require('node:console');

// Create Role
exports.createRole = async (req, res) => {
  try {
    const { name, description, permission_id } = req.body;
    console.log("📩 Incoming request body:", req.body);

    // Check if permission exists before creating role
    const permission = await Permission.findByPk(permission_id);
    if (!permission) {
      console.error("❌ Permission not found with ID:", permission_id);
      return res.status(400).json({
        success: false,
        message: `Permission with ID ${permission_id} does not exist`
      });
    }

    const role = await Role.create({ name, description, permission_id });
    console.log("✅ Role created successfully:", role.toJSON());

    res.status(201).json({ success: true, data: role });
  } catch (error) {
    console.error("🔥 Error creating role:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get All Roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({ include: Permission });
    res.json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Role
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, { include: Permission });
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permission_id } = req.body;
    const role = await Role.findByPk(req.params.id);

    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    role.name = name || role.name;
    role.description = description || role.description;
    role.permission_id = permission_id || role.permission_id;

    await role.save();
    res.json({ success: true, data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Role (soft delete)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });

    await role.destroy(); // soft delete (because paranoid:true)
    res.json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
