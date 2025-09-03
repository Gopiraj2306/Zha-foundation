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

router.get('/', isAuthenticated, socialCoachController.getAllCoaches);
router.get('/:id', isAuthenticated, socialCoachController.getCoachById);

router.post('/', socialCoachController.createCoach);
router.put('/:id', socialCoachController.updateCoachById);
router.delete('/:id', isAuthenticated, isSuperAdmin, socialCoachController.deleteCoachById);

router.post('/bulk-upload', socialCoachController.bulkUploadCoaches);

module.exports = router;
