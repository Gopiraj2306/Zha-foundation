const express = require('express');
const router = express.Router();
const rolePermissionController = require('../controllers/rolePermissionController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, rolePermissionController.addPermissionToRole);
router.delete('/', isAuthenticated, rolePermissionController.deleteRolePermission);
router.get('/', isAuthenticated, rolePermissionController.getAllRolePermissions);

module.exports = router;
