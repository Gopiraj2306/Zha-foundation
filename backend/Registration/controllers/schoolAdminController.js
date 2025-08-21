const { SchoolAdmin } = require('../models');

exports.createSchoolAdmin = async (req, res) => {
  try {
    const admin = await SchoolAdmin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSchoolAdmins = async (req, res) => {
  try {
    const admins = await SchoolAdmin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSchoolAdminById = async (req, res) => {
  try {
    const admin = await SchoolAdmin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'SchoolAdmin not found' });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSchoolAdminById = async (req, res) => {
  try {
    const [affectedRows] = await SchoolAdmin.update(req.body, { where: { id: req.params.id } });
    if (!affectedRows) return res.status(404).json({ error: 'SchoolAdmin not found' });
    const updatedAdmin = await SchoolAdmin.findByPk(req.params.id);
    res.json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSchoolAdminById = async (req, res) => {
  try {
    const deleted = await SchoolAdmin.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'SchoolAdmin not found' });
    res.json({ message: 'SchoolAdmin deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
