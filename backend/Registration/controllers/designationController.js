const { Designation } = require('../models');

exports.createDesignation = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) return res.status(404).json({ error: 'Designation not found' });
    res.json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDesignationById = async (req, res) => {
  try {
    const [affectedRows] = await Designation.update(req.body, { where: { id: req.params.id } });
    if (!affectedRows) return res.status(404).json({ error: 'Designation not found' });
    const updatedDesignation = await Designation.findByPk(req.params.id);
    res.json(updatedDesignation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDesignationById = async (req, res) => {
  try {
    const deleted = await Designation.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Designation not found' });
    res.json({ message: 'Designation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
