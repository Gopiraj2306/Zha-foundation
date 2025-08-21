const { Type } = require('../models');

exports.createType = async (req, res) => {
  try {
    const type = await Type.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const type = await Type.findByPk(req.params.id);
    if (!type) return res.status(404).json({ error: 'Type not found' });
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTypeById = async (req, res) => {
  try {
    const [affectedRows] = await Type.update(req.body, { where: { id: req.params.id } });
    if (!affectedRows) return res.status(404).json({ error: 'Type not found' });
    const updatedType = await Type.findByPk(req.params.id);
    res.json(updatedType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTypeById = async (req, res) => {
  try {
    const deleted = await Type.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Type not found' });
    res.json({ message: 'Type deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
