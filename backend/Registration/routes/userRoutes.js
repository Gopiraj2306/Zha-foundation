const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', isAuthenticated, userController.createUser);
router.put('/:id', isAuthenticated, userController.updateUserById);
router.delete('/:id', isAuthenticated, userController.deleteUserById);
router.get('/', isAuthenticated, userController.getAllUsers);
router.get('/:id', isAuthenticated, userController.getUserById);

module.exports = router;
