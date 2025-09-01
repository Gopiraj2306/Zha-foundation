const express = require('express');
const router = express.Router();

const {approveSchool,getSchoolsByStatus} = require('../controllers/adminController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isSuperAdmin } = require('../middlewares/superadmin');

// router.put('/:id/approve', isAuthenticated, isSuperAdmin, schoolController.approveSchool);
router.put('/:id/approve', approveSchool);
router.get('/schools',getSchoolsByStatus);
module.exports = router;
