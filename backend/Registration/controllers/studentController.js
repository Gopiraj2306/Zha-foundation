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
const { Student } = require('../models');

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

      // Map headers and validate presence of required columns
      const headerRow = rows[0].map(h => h.toString().toLowerCase().trim());
      const requiredCols = ['first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth'];
      const colMap = {};
      for (const col of requiredCols) {
        const idx = headerRow.indexOf(col);
        if (idx === -1) {
          fs.unlinkSync(filePath);
          return res.status(400).json({ error: `Missing required column: ${col}` });
        }
        colMap[col] = idx;
      }

      // Construct student objects, skip incomplete rows
      const students = [];
      for(let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row[colMap.first_name] || !row[colMap.email]) {
          continue; // Skip rows missing mandatory fields
        }
        students.push({
          first_name: row[colMap.first_name],
          last_name: row[colMap.last_name],
          email: row[colMap.email],
          phone: row[colMap.phone],
          gender: row[colMap.gender],
          date_of_birth: row[colMap.date_of_birth]
        });
      }

      if (students.length === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({ error: 'No valid student records found' });
      }

      await Student.bulkCreate(students, { validate: true });

      fs.unlinkSync(filePath);
      res.json({ message: 'Bulk upload successful', count: students.length });

    } catch (error) {
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Failed to parse or insert records', details: error.message });
    }
  });
};

// Filtering and fetching student list
exports.getAllStudents = async (req, res) => {
  try {
    const filter = {};
    if (req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if (req.query.class) filter.class = req.query.class;
    if (req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';
    // Add other filters as appropriate

    const students = await Student.findAll({ where: filter });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch(error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const filter = {};
    if(req.query.first_name) filter.first_name = { [Op.like]: `%${req.query.first_name}%` };
    if(req.query.class) filter.class = req.query.class;
    if(req.query.is_active !== undefined) filter.is_active = req.query.is_active === 'true';

    const students = await Student.findAll({ where: filter });
    res.json(students);
  } catch(error) {
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
