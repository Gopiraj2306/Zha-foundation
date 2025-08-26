// const Student = require('../models/student');

// // Create new student
// exports.createStudent = async (req, res) => {
//   try {
//     const student = await Student.create(req.body);
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Read all students
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.findAll();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Read student by ID
// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findByPk(req.params.id);
//     if (!student) return res.status(404).json({ error: 'Student not found' });
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update student by ID
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

// // Delete student by ID
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
const { Student } = require('../models');

// Configure multer for Excel file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `student-upload-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xlsx' && ext !== '.xls') {
      return cb(new Error('Only Excel files are allowed'));
    }
    cb(null, true);
  }
}).single('file');

exports.bulkUploadStudents = (req, res) => {
  upload(req, res, async err => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = req.file.path;

    try {
      const rows = await readXlsxFile(filePath);

      if (rows.length < 2) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'Excel file is empty or missing data' });
      }

      const headerRow = rows[0].map(h => h.toString().toLowerCase().trim());
      const requiredColumns = ['first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth'];
      const columnIndexMap = {};
      for (const col of requiredColumns) {
        const colIndex = headerRow.indexOf(col);
        if (colIndex === -1) {
          fs.unlinkSync(filePath);
          return res.status(400).json({ error: `Missing required column: ${col}` });
        }
        columnIndexMap[col] = colIndex;
      }

      const students = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        // Skip rows missing mandatory fields
        if (!row[columnIndexMap.first_name] || !row[columnIndexMap.email]) continue;

        students.push({
          first_name: row[columnIndexMap.first_name],
          last_name: row[columnIndexMap.last_name],
          email: row[columnIndexMap.email],
          phone: row[columnIndexMap.phone] || null,
          gender: row[columnIndexMap.gender] || null,
          date_of_birth: row[columnIndexMap.date_of_birth] || null,
        });
      }

      if (students.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'No valid student data found' });
      }

      await Student.bulkCreate(students, { validate: true });
      fs.unlinkSync(filePath);
      res.json({ message: 'Students bulk uploaded', count: students.length });
    } catch (parseError) {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Failed to process file', details: parseError.message });
    }
  });
};

exports.createStudent = async (req, res) => {
  try {
    const { school_id, first_name, email } = req.body;
    if (!school_id) return res.status(400).json({ error: 'school_id is required' });
    if (!first_name) return res.status(400).json({ error: 'first_name is required' });
    if (!email) return res.status(400).json({ error: 'email is required' });

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const { first_name, class: className, is_active } = req.query;
    const filter = {};

    if (first_name) filter.first_name = { [Op.like]: `%${first_name}%` };
    if (className) filter.class = className;
    if (is_active !== undefined) filter.is_active = is_active === 'true';

    const students = await Student.findAll({ where: filter });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if(!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudentById = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
    if(!updated) return res.status(404).json({ error: 'Student not found' });

    const updatedStudent = await Student.findByPk(req.params.id);
    res.json(updatedStudent);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudentById = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if(!deleted) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};
