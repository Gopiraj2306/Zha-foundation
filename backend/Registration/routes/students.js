// const express = require('express');
// const router = express.Router();
// const studentController = require('../controllers/studentController');

// router.post('/', studentController.createStudent);
// router.get('/', studentController.getAllStudents);
// router.get('/:id', studentController.getStudentById);
// router.put('/:id', studentController.updateStudentById);
// router.delete('/:id', studentController.deleteStudentById);

// module.exports = router;


const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const { isAuthenticated } = require('../middlewares/authmiddleware');
const { isSuperAdmin } = require('../middlewares/superadmin');

router.post('/add', isAuthenticated,studentController.addStudent);

router.get('/', isAuthenticated, studentController.getAllStudents);
router.get('/:id', isAuthenticated, studentController.getStudentById);

router.post('/', studentController.createStudent);
router.put('/:id', isAuthenticated, isSuperAdmin, studentController.updateStudentById);
router.delete('/:id', isAuthenticated, isSuperAdmin, studentController.deleteStudentById);

router.post('/bulk-upload', studentController.bulkUploadStudents);

module.exports = router;


