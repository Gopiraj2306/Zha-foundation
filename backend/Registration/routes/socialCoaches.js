const express = require('express');
const router = express.Router();
const socialCoachController = require('../controllers/socialCoachController');

router.post('/', socialCoachController.createSocialCoach);
router.get('/', socialCoachController.getAllSocialCoaches);
router.get('/:id', socialCoachController.getSocialCoachById);
router.put('/:id', socialCoachController.updateSocialCoachById);
router.delete('/:id', socialCoachController.deleteSocialCoachById);

module.exports = router;
