// const express = require('express');
// const router = express.Router();
// const schoolController = require('../controllers/schoolController');
// const { isAuthenticated } = require('../middlewares/authMiddleware');
// const { isSuperAdmin } = require('../middlewares/superAdmin');

// router.post('/', isAuthenticated, schoolController.createSchool);
// router.get('/', isAuthenticated, schoolController.getAllSchools);
// router.get('/:id', isAuthenticated, schoolController.getSchoolById);
// router.put('/:id', isAuthenticated, schoolController.updateSchoolById);



// // Approval route restricted to Super Admin
// router.put('/:id/approve', isAuthenticated, isSuperAdmin, schoolController.approveSchool);



// module.exports = router;


const express = require('express');
const router = express.Router();

const schoolController = require('../controllers/schoolController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isSuperAdmin } = require('../middlewares/superadmin');

router.post('/',  schoolController.createSchool);
router.get('/', isAuthenticated, schoolController.getAllSchools);
router.get('/:id', isAuthenticated, schoolController.getSchoolById);
router.put('/:id', isAuthenticated, schoolController.updateSchoolById);
router.delete('/:id', isAuthenticated, schoolController.deleteSchoolById);

// router.put('/:id/approve', isAuthenticated, isSuperAdmin, schoolController.approveSchool);

router.put('/:id', isAuthenticated, (req, res) => res.status(403).json({ error: 'Forbidden' }));
router.delete('/:id', isAuthenticated, (req, res) => res.status(403).json({ error: 'Forbidden' }));

module.exports = router;
