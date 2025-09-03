const { School, State } = require('../models');


exports.getSchoolsByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Get status from query params

    // Validate status input
    const validStatuses = ['Approved', 'Pending', 'Rejected'];
    // if (status && !validStatuses.includes(status.toLowerCase())) {
    //   return res.status(400).json({ error: 'Invalid status value' });
    // }

    const schools = await School.findAll({
      where: status ? { status: status.toLowerCase() } : {}
    });

    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateSchoolCode = (stateCode, cityCode, otherCode = '') => {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `ZHA0${stateCode}0${cityCode}${otherCode}${suffix}`;
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