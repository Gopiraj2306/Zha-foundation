// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const readXlsxFile = require('read-excel-file/node');
// const { Student } = require('../models');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const dir = './uploads';
//     if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `student-upload-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (ext !== '.xlsx' && ext !== '.xls') {
//       return cb(new Error('Only Excel files are allowed'));
//     }
//     cb(null, true);
//   }
// }).single('file');

// exports.bulkUploadStudents = (req, res) => {
//   upload(req, res, async err => {
//     if (err) return res.status(400).json({ error: err.message });
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//     const filePath = req.file.path;

//     try {
//       const rows = await readXlsxFile(filePath);

//       if (rows.length < 2) {
//         fs.unlinkSync(filePath);
//         return res.status(400).json({ error: 'Excel file is empty or missing data' });
//       }

//       const headers = rows[0].map(h => h.toString().toLowerCase().trim());
//       const requiredCols = ['first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth'];
//       const colMap = {};

//       for (const col of requiredCols) {
//         const idx = headers.indexOf(col);
//         if (idx === -1) {
//           fs.unlinkSync(filePath);
//           return res.status(400).json({ error: `Missing required column: ${col}` });
//         }
//         colMap[col] = idx;
//       }

//       const students = [];
//       for (let i = 1; i < rows.length; i++) {
//         const row = rows[i];
//         if (!row[colMap.first_name] || !row[colMap.email]) continue;

//         students.push({
//           first_name: row[colMap.first_name],
//           last_name: row[colMap.last_name],
//           email: row[colMap.email],
//           phone: row[colMap.phone] || null,
//           gender: row[colMap.gender] || null,
//           date_of_birth: row[colMap.date_of_birth] || null
//         });
//       }

//       if (students.length === 0) {
//         fs.unlinkSync(filePath);
//         return res.status(400).json({ error: 'No valid student records found' });
//       }

//       await Student.bulkCreate(students, { validate: true });

//       fs.unlinkSync(filePath);
//       res.json({ message: 'Bulk upload successful', count: students.length });
//     } catch (error) {
//       fs.unlinkSync(filePath);
//       res.status(500).json({ error: 'Failed to process file', details: error.message });
//     }
//   });
// };

// exports.createStudent = async (req, res) => {
//   try {
//     const { school_id, first_name, email } = req.body;
//     if (!school_id) return res.status(400).json({ error: 'school_id is required' });
//     if (!first_name) return res.status(400).json({ error: 'first_name is required' });
//     if (!email) return res.status(400).json({ error: 'email is required' });

//     const student = await Student.create(req.body);
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllStudents = async (req, res) => {
//   try {
//     const { first_name, class: className, is_active } = req.query;
//     const filter = {};

//     if (first_name) filter.first_name = { [Op.like]: `%${first_name}%` };
//     if (className) filter.class = className;
//     if (is_active !== undefined) filter.is_active = is_active === 'true';

//     const students = await Student.findAll({ where: filter });
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findByPk(req.params.id);
//     if (!student) return res.status(404).json({ error: 'Student not found' });
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateStudentById = async (req, res) => {
//   try {
//     const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
//     if (!updated) return res.status(404).json({ error: 'Student not found' });

//     const updatedStudent = await Student.findByPk(req.params.id);
//     res.json(updatedStudent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// exports.deleteStudentById = async (req, res) => {
//   try {
//     const deleted = await Student.destroy({ where: { id: req.params.id } });
//     if (!deleted) return res.status(404).json({ error: 'Student not found' });

//     res.json({ message: 'Student deleted' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const { Op } = require('sequelize');
const Student = require('../models/student');

// 📂 File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `student-upload-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
}).single('file');

// 📊 Bulk Upload
exports.bulkUploadStudents = async (req, res) => {
  try {
    // Upload file
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) return reject(err);
        if (!req.file) return reject(new Error("No file uploaded"));
        resolve();
      });
    });

    const filePath = req.file.path;
    const rows = await readXlsxFile(filePath);

    if (rows.length < 2) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'Excel file is empty or missing data' });
    }

    // Validate required headers
    const headers = rows[0].map(h => h.toString().toLowerCase().trim());
    const requiredCols = ['first_name', 'last_name', 'email', 'phone', 'gender', 'school_id', 'user_id'];
    const colMap = {};

    for (const col of requiredCols) {
      const idx = headers.indexOf(col);
      if (idx === -1) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: `Missing required column: ${col}` });
      }
      colMap[col] = idx;
    }

    // Map rows → student objects
    const students = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row[colMap.first_name] || !row[colMap.email]) continue;

      const student = {
        first_name: row[colMap.first_name],
        last_name: row[colMap.last_name],
        email: row[colMap.email],
        phone: row[colMap.phone] || null,
        gender: row[colMap.gender] || null,
        school_id: parseInt(row[colMap.school_id], 10),
        user_id: parseInt(row[colMap.user_id], 10),
        date_of_birth: row[headers.indexOf('date_of_birth')] || null,
        grade: row[headers.indexOf('grade')] || null,
        section: row[headers.indexOf('section')] || null,
        roll_number: row[headers.indexOf('roll_number')] || null,
        parent_name: row[headers.indexOf('parent_name')] || null,
        parent_contact: row[headers.indexOf('parent_contact')] || null,
        is_active: row[headers.indexOf('is_active')]?.toString().toLowerCase() === 'true'
      };

      console.log(`➡️ Row ${i}:`, student);
      students.push(student);
    }

    if (students.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ error: 'No valid student records found' });
    }

    // Insert into DB
    await Student.bulkCreate(students);
    fs.unlinkSync(filePath);

    res.json({ message: 'Bulk upload successful', count: students.length });

  } catch (error) {
    console.error("❌ Bulk Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ➕ Create
exports.createStudent = async (req, res) => {
  try {
    const { school_id, user_id, first_name, email } = req.body;
    if (!school_id) return res.status(400).json({ error: 'school_id is required' });
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    if (!first_name) return res.status(400).json({ error: 'first_name is required' });
    if (!email) return res.status(400).json({ error: 'email is required' });

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📋 Get All with filters
exports.getAllStudents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if (req.query.grade) filter.grade = req.query.grade;
    if (req.query.section) filter.section = req.query.section;
    if (req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';

    const students = await Student.findAll({ where: filter });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update
exports.updateStudentById = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'Student not found' });

    const updatedStudent = await Student.findByPk(req.params.id);
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Delete
exports.deleteStudentById = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Student not found' });

    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

