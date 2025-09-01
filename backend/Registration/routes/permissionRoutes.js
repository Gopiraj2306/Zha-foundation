const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', permissionController.createPermission);
router.put('/:id', isAuthenticated, permissionController.updatePermissionById);
router.delete('/:id', isAuthenticated, permissionController.deletePermissionById);
router.get('/', isAuthenticated, permissionController.getAllPermissions);
router.get('/:id', isAuthenticated, permissionController.getPermissionById);

module.exports = router;
