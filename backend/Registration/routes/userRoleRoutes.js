const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, userRoleController.addRoleToUser);
router.delete('/:id', isAuthenticated, userRoleController.deleteUserRoleById);
router.get('/', isAuthenticated, userRoleController.getAllUserRoles);

module.exports = router;
