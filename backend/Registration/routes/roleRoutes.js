const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, roleController.createRole);
router.put('/:id', isAuthenticated, roleController.updateRoleById);
router.delete('/:id', isAuthenticated, roleController.deleteRoleById);
router.get('/', isAuthenticated, roleController.getAllRoles);
router.get('/:id', isAuthenticated, roleController.getRoleById);

module.exports = router;
