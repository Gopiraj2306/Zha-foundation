const express = require('express');
const router = express.Router();
const schoolAdminController = require('../controllers/schoolAdminController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, schoolAdminController.createSchoolAdmin);
router.get('/', isAuthenticated, schoolAdminController.getAllSchoolAdmins);
router.get('/:id', isAuthenticated, schoolAdminController.getSchoolAdminById);
router.put('/:id', isAuthenticated, schoolAdminController.updateSchoolAdminById);
router.delete('/:id', isAuthenticated, schoolAdminController.deleteSchoolAdminById);

module.exports = router;
