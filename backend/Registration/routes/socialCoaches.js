// const express = require('express');
// const router = express.Router();
// const socialCoachController = require('../controllers/socialCoachController');

// router.post('/', socialCoachController.createSocialCoach);
// router.get('/', socialCoachController.getAllSocialCoaches);
// router.get('/:id', socialCoachController.getSocialCoachById);
// router.put('/:id', socialCoachController.updateSocialCoachById);
// router.delete('/:id', socialCoachController.deleteSocialCoachById);

// module.exports = router;



const express = require('express');
const router = express.Router();

const socialCoachController = require('../controllers/socialCoachController');
const { isAuthenticated } = require('../middlewares/authmiddleware');
const { isSuperAdmin } = require('../middlewares/superadmin');

router.get('/', isAuthenticated, socialCoachController.getAllSocialCoaches);
router.get('/:id', isAuthenticated, socialCoachController.getSocialCoachById);

router.post('/', isAuthenticated, isSuperAdmin, socialCoachController.createSocialCoach);
router.put('/:id', isAuthenticated, isSuperAdmin, socialCoachController.updateSocialCoachById);
router.delete('/:id', isAuthenticated, isSuperAdmin, socialCoachController.deleteSocialCoachById);

router.post('/bulk-upload', isAuthenticated, isSuperAdmin, socialCoachController.bulkUploadCoaches);

module.exports = router;
