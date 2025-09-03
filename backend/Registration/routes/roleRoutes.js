const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id',  roleController.deleteRole);
router.get('/',  roleController.getRoles);
router.get('/:id',  roleController.getRoleById);

module.exports = router;
