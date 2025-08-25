// const SocialCoach = require('../models/socialCoach');

// exports.createSocialCoach = async (req, res) => {
//   try {
//     const coach = await SocialCoach.create(req.body);
//     res.status(201).json(coach);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.getAllSocialCoaches = async (req, res) => {
//   try {
//     const coaches = await SocialCoach.findAll();
//     res.json(coaches);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getSocialCoachById = async (req, res) => {
//   try {
//     const coach = await SocialCoach.findByPk(req.params.id);
//     if (!coach) return res.status(404).json({ error: 'Social Coach not found' });
//     res.json(coach);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateSocialCoachById = async (req, res) => {
//   try {
//     const [updated] = await SocialCoach.update(req.body, { where: { id: req.params.id } });
//     if (!updated) return res.status(404).json({ error: 'Social Coach not found' });
//     const updatedCoach = await SocialCoach.findByPk(req.params.id);
//     res.json(updatedCoach);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteSocialCoachById = async (req, res) => {
//   try {
//     const deleted = await SocialCoach.destroy({ where: { id: req.params.id } });
//     if (!deleted) return res.status(404).json({ error: 'Social Coach not found' });
//     res.json({ message: 'Social Coach deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');
const path = require('path');
const SocialCoach = require('../models/socialCoach');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `coach-upload-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  },
}).single('file');

exports.bulkUploadCoaches = (req, res) => {
  upload(req, res, err => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;
    readXlsxFile(filePath)
      .then(rows => {
        rows.shift(); // Remove header
        const coaches = rows.map(row => ({
          first_name: row[0],
          last_name: row[1],
          email: row[2],
          phone: row[3],
          gender: row[4],
        }));

        SocialCoach.bulkCreate(coaches)
          .then(() => {
            fs.unlinkSync(filePath);
            res.json({ message: 'Coaches uploaded', count: coaches.length });
          }).catch(error => res.status(500).json({ error: error.message }));
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
};

exports.getAllSocialCoaches = async (req, res) => {
  try {
    const filter = {};
    if (req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if (req.query.designation_id) filter.designation_id = req.query.designation_id;
    if (req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';
    // Add more filters as needed

    const coaches = await SocialCoach.findAll({ where: filter });
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createSocialCoach = async (req, res) => {
  try {
    const coach = await SocialCoach.create(req.body);
    res.status(201).json(coach);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSocialCoaches = async (req, res) => {
  try {
    const filter = {};
    if(req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if(req.query.designation_id) filter.designation_id = req.query.designation_id;
    if(req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';

    const coaches = await SocialCoach.findAll({ where: filter });
    res.json(coaches);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSocialCoachById = async (req, res) => {
  try {
    const coach = await SocialCoach.findByPk(req.params.id);
    if(!coach) return res.status(404).json({ error: 'Coach not found' });
    res.json(coach);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSocialCoachById = async (req, res) => {
  try {
    const [updated] = await SocialCoach.update(req.body, { where: { id: req.params.id } });
    if(!updated) return res.status(404).json({ error: 'Coach not found' });

    const updatedCoach = await SocialCoach.findByPk(req.params.id);
    res.json(updatedCoach);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSocialCoachById = async (req, res) => {
  try {
    const deleted = await SocialCoach.destroy({ where: { id: req.params.id } });
    if(!deleted) return res.status(404).json({ error: 'Coach not found' });
    res.json({ message: 'Coach deleted' });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};
