const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, designationController.createDesignation);
router.get('/', isAuthenticated, designationController.getAllDesignations);
router.get('/:id', isAuthenticated, designationController.getDesignationById);
router.put('/:id', isAuthenticated, designationController.updateDesignationById);
router.delete('/:id', isAuthenticated, designationController.deleteDesignationById);

module.exports = router;
