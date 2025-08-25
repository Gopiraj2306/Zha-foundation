// const express = require('express');
// const router = express.Router();

// const socialCoachAssignmentController = require('../controllers/socialCoachAssignmentController');

// router.post('/', socialCoachAssignmentController.createSocialCoachAssignment);
// router.get('/', socialCoachAssignmentController.getAllSocialCoachAssignments);
// router.get('/:id', socialCoachAssignmentController.getSocialCoachAssignmentById);
// router.put('/:id', socialCoachAssignmentController.updateSocialCoachAssignmentById);
// router.delete('/:id', socialCoachAssignmentController.deleteSocialCoachAssignmentById);

// module.exports = router;



const express = require('express');
const router = express.Router();

const socialCoachAssignmentController = require('../controllers/socialCoachAssignmentController');
const { isAuthenticated } = require('../middlewares/authmiddleware');
const { isSuperAdmin } = require('../middlewares/superadmin');

router.get('/', isAuthenticated, socialCoachAssignmentController.getAllAssignments);
router.get('/:id', isAuthenticated, socialCoachAssignmentController.getAssignmentById);

router.post('/', isAuthenticated, isSuperAdmin, socialCoachAssignmentController.createAssignment);
router.put('/:id', isAuthenticated, isSuperAdmin, socialCoachAssignmentController.updateAssignmentById);
router.delete('/:id', isAuthenticated, isSuperAdmin, socialCoachAssignmentController.deleteAssignmentById);

module.exports = router;
