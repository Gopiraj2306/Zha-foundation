// const SocialCoachAssignment = require('../models/socialCoachAssignment');

// exports.createSocialCoachAssignment = async (req, res) => {
//   try {
//     const assignment = await SocialCoachAssignment.create(req.body);
//     res.status(201).json(assignment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getAllSocialCoachAssignments = async (req, res) => {
//   try {
//     const assignments = await SocialCoachAssignment.findAll({ where: { is_deleted: false } });
//     res.json(assignments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getSocialCoachAssignmentById = async (req, res) => {
//   try {
//     const assignment = await SocialCoachAssignment.findByPk(req.params.id);
//     if (!assignment || assignment.is_deleted)
//       return res.status(404).json({ error: 'Social Coach Assignment not found' });
//     res.json(assignment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateSocialCoachAssignmentById = async (req, res) => {
//   try {
//     const [updated] = await SocialCoachAssignment.update(req.body, { where: { id: req.params.id } });
//     if (!updated) return res.status(404).json({ error: 'Social Coach Assignment not found' });
//     const updatedAssignment = await SocialCoachAssignment.findByPk(req.params.id);
//     res.json(updatedAssignment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteSocialCoachAssignmentById = async (req, res) => {
//   try {
//     const [deleted] = await SocialCoachAssignment.update(
//       { is_deleted: true },
//       { where: { id: req.params.id } }
//     );
//     if (!deleted) return res.status(404).json({ error: 'Social Coach Assignment not found' });
//     res.json({ message: 'Social Coach Assignment deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const SocialCoachAssignment = require('../models/socialCoachAssignment');


exports.createAssignment = async (req, res) => {
  try {
    const assignment = await SocialCoachAssignment.create(req.body);
    res.status(201).json(assignment);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await SocialCoachAssignment.findAll();
    res.json(assignments);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await SocialCoachAssignment.findByPk(req.params.id);
    if(!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json(assignment);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAssignmentById = async (req, res) => {
  try {
    const [updated] = await SocialCoachAssignment.update(req.body, { where: { id: req.params.id } });
    if(!updated) return res.status(404).json({ error: 'Assignment not found' });

    const updatedAssignment = await SocialCoachAssignment.findByPk(req.params.id);
    res.json(updatedAssignment);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAssignmentById = async (req, res) => {
  try {
    await SocialCoachAssignment.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Assignment deleted' });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};
