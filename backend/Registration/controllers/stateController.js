const State = require('../models/state');

// ✅ Create a new state
exports.createState = async (req, res) => {
  try {
    const { name } = req.body;
    const state = await State.create({ name });
    res.status(201).json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all states
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.status(200).json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get single state by ID
exports.getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);

    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.status(200).json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update state
exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    state.name = name || state.name;
    await state.save();

    res.status(200).json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete state (soft delete because paranoid = true)
exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByPk(id);
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    await state.destroy();
    res.status(200).json({ message: 'State deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
