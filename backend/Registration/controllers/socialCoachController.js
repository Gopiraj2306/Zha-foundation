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
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser'); // for CSV files
const readXlsxFile = require('read-excel-file/node'); // for Excel
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
    if (!file.originalname.match(/\.(xlsx|xls|csv)$/)) {
      return cb(new Error('Only Excel and CSV files are allowed'));
    }
    cb(null, true);
  },
}).single('file');

exports.bulkUploadCoaches = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) return reject(err);
        if (!req.file) return reject(new Error("No file uploaded"));
        resolve();
      });
    });

    const filePath = req.file.path;
    const ext = path.extname(filePath).toLowerCase();
    let coaches = [];

    if (ext === '.csv') {
      // Parse CSV
      const results = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve())
          .on('error', (err) => reject(err));
      });

      coaches = results.map((row, i) => ({
        first_name: row['first name'],
        last_name: row['last name'],
        school_name: row['school name'],
        school_code: row['school code'],
        email: row['email'],
        join_date: row['joining date'] ? new Date(row['joining date']) : null,
        password: row['password'],
        confirm_password: row['confirm password'],
        gender: row['gender'],
        mobile_number: row['mobile number'],
        designation: row['designation'],
        department: row['department'],
        date_of_birth: row['dateof birth'] ? new Date(row['dateof birth']) : null,
        blood_group: row['blood group'],
        status: row['status'],
        address_line1: row['address line1'] || null,
        address_line2: row['address line2'] || null,
        address_line3: row['address line3'] || null,
        is_active: row['is active']?.toString().toLowerCase() === 'true',
        created_at: row['created at'] ? new Date(row['created at']) : new Date(),
        deleted_at: row['deleted at'] ? new Date(row['deleted at']) : null,
        updated_at: row['updated at'] ? new Date(row['updated at']) : new Date(),
      }));
    } else {
      // Excel file
      const rows = await readXlsxFile(filePath);
      const headers = rows[0].map(h => h.toString().toLowerCase().trim());
      rows.shift(); // remove header row

      coaches = rows.map((row) => ({
        first_name: row[headers.indexOf('first name')],
        last_name: row[headers.indexOf('last name')],
        school_name: row[headers.indexOf('school name')],
        school_code: row[headers.indexOf('school code')],
        email: row[headers.indexOf('email')],
        join_date: row[headers.indexOf('joining date')] || null,
        password: row[headers.indexOf('password')],
        confirm_password: row[headers.indexOf('confirm password')],
        gender: row[headers.indexOf('gender')],
        mobile_number: row[headers.indexOf('mobile number')],
        designation: row[headers.indexOf('designation')],
        department: row[headers.indexOf('department')],
        date_of_birth: row[headers.indexOf('dateof birth')] || null,
        blood_group: row[headers.indexOf('blood group')],
        status: row[headers.indexOf('status')],
        address_line1: row[headers.indexOf('address line1')] || null,
        address_line2: row[headers.indexOf('address line2')] || null,
        address_line3: row[headers.indexOf('address line3')] || null,
        is_active: row[headers.indexOf('is active')]?.toString().toLowerCase() === 'true',
        created_at: row[headers.indexOf('created at')] || new Date(),
        deleted_at: row[headers.indexOf('deleted at')] || null,
        updated_at: row[headers.indexOf('updated at')] || new Date(),
      }));
    }

    // Insert into DB
    await SocialCoach.bulkCreate(coaches);
    fs.unlinkSync(filePath);
    res.json({ message: "Coaches uploaded successfully", count: coaches.length });

  } catch (error) {
    console.error("❌ Bulk Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createCoach = async (req, res) => {
  try {
    const coach = await SocialCoach.create(req.body);
    res.status(201).json(coach);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Get All Coaches (with filters)
exports.getAllCoaches = async (req, res) => {
  try {
    const filter = {};
    if (req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if (req.query.designation) filter.designation = req.query.designation;
    if (req.query.is_active !== undefined)
      filter.is_active = req.query.is_active === "true";

    const coaches = await SocialCoach.findAll({ where: filter });
    res.json(coaches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get Coach by ID
exports.getCoachById = async (req, res) => {
  try {
    const coach = await SocialCoach.findByPk(req.params.id);
    if (!coach) return res.status(404).json({ error: "Coach not found" });
    res.json(coach);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Update Coach by ID
exports.updateCoachById = async (req, res) => {
  try {
    const [updated] = await SocialCoach.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: "Coach not found" });

    const updatedCoach = await SocialCoach.findByPk(req.params.id);
    res.json(updatedCoach);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Delete Coach by ID
exports.deleteCoachById = async (req, res) => {
  try {
    const deleted = await SocialCoach.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Coach not found" });
    res.json({ message: "Coach deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





