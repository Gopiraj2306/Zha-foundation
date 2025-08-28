// const { School } = require('../models');


// const generateSchoolCode = (stateCode, cityCode, otherCode = '') => {
//   const suffix = Math.floor(1000 + Math.random() * 9000);
//   return `ZHA0${stateCode}0${cityCode}${otherCode}${suffix}`;
// };

// exports.createSchool = async (req, res) => {
//   try {
//     if (!req.body.state_id) {
//       return res.status(400).json({ error: 'state_id is required' });
//     }
//     const school = await School.create({
//       ...req.body,
//       school_code: req.body.school_code || null,
//       status: req.body.status || 'Pending',
//     });
//     res.status(201).json(school);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// exports.approveSchool = async (req, res) => {
//   try {
//     const school = await School.findByPk(req.params.id);
//     if (!school) return res.status(404).json({ error: 'School not found' });

//     // Ideally get real state and city codes from your database or req data
//     const stateCode = 'TN';
//     const cityCode = 'CHN';

//     const schoolCode = generateSchoolCode(stateCode, cityCode);
//     await school.update({ status: 'Approved', school_code: schoolCode });

//     res.json({ message: 'School approved', school });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateSchoolById = async (req, res) => {
//   try {
//     const schoolId = req.params.id;
//     const updates = req.body;

//     const [updatedCount] = await School.update(updates, { where: { id: schoolId } });

//     if (!updatedCount) return res.status(404).json({ error: 'School not found' });

//     const updatedSchool = await School.findByPk(schoolId);
//     res.json(updatedSchool);
//   } catch (error) {
//     console.error('Update school error:', error);
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteSchoolById = async (req, res) => {
//   try {
//     const deletedCount = await School.destroy({ where: { id: req.params.id } });
//     if (!deletedCount) return res.status(404).json({ error: 'School not found' });

//     res.json({ message: 'School deleted successfully' });
//   } catch (error) {
//     console.error('Delete school error:', error);
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getAllSchools = async (req, res) => {
//   try {
//     const schools = await School.findAll();
//     res.json(schools);
//   } catch (error) {
//     console.error('Get all schools error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getSchoolById = async (req, res) => {
//   try {
//     const school = await School.findByPk(req.params.id);
//     if (!school) return res.status(404).json({ error: 'School not found' });

//     res.json(school);
//   } catch (error) {
//     console.error('Get school by id error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };


const { School, State } = require('../models');

const generateSchoolCode = (stateCode, cityCode, otherCode = '') => {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ZHA0${stateCode}0${cityCode}${otherCode}${suffix}`;
};

exports.createSchool = async (req, res) => {
  try {
    if (!req.body.state_id) return res.status(400).json({ error: 'state_id is required' });

    const school = await School.create({ ...req.body, status: 'Pending' });
    res.status(201).json(school);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    res.json(schools);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id, { include: State });
    if(!school) return res.status(404).json({ error: 'School not found' });
    res.json(school);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id, { include: State });
    if(!school) return res.status(404).json({ error: 'School not found' });

    if(school.status === 'Approved')
      return res.status(400).json({ error: 'School already approved' });

    const stateCode = school.State.name.toUpperCase().substring(0,3);
    const cityCode = (school.city || '').toUpperCase().substring(0, 2);
    const schoolCode = generateSchoolCode(stateCode, cityCode);

    await school.update({ status: 'Approved', school_code: schoolCode, approved_date: new Date() });

    res.json({ message: 'School approved', school });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateSchoolById = async (req, res) => {
  try {
    const schoolId = req.params.id;
    const updates = req.body;

    const [updatedCount] = await School.update(updates, { where: { id: schoolId } });

    if (!updatedCount) return res.status(404).json({ error: 'School not found' });

    const updatedSchool = await School.findByPk(schoolId);
    res.json(updatedSchool);
  } catch (error) {
    console.error('Update school error:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSchoolById = async (req, res) => {
  try {
    const deletedCount = await School.destroy({ where: { id: req.params.id } });
    if (!deletedCount) return res.status(404).json({ error: 'School not found' });

    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Delete school error:', error);
    res.status(400).json({ error: error.message });
  }
};
