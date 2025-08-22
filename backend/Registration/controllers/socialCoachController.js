const SocialCoach = require('../models/socialCoach');

exports.createSocialCoach = async (req, res) => {
  try {
    const coach = await SocialCoach.create(req.body);
    res.status(201).json(coach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSocialCoaches = async (req, res) => {
  try {
    const coaches = await SocialCoach.findAll();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSocialCoachById = async (req, res) => {
  try {
    const coach = await SocialCoach.findByPk(req.params.id);
    if (!coach) return res.status(404).json({ error: 'Social Coach not found' });
    res.json(coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSocialCoachById = async (req, res) => {
  try {
    const [updated] = await SocialCoach.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Social Coach not found' });
    const updatedCoach = await SocialCoach.findByPk(req.params.id);
    res.json(updatedCoach);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSocialCoachById = async (req, res) => {
  try {
    const deleted = await SocialCoach.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Social Coach not found' });
    res.json({ message: 'Social Coach deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
