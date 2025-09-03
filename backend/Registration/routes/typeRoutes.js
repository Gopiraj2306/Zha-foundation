const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/',  typeController.createType);
router.get('/', isAuthenticated, typeController.getAllTypes);
router.get('/:id', isAuthenticated, typeController.getTypeById);
router.put('/:id', isAuthenticated, typeController.updateTypeById);
router.delete('/:id', isAuthenticated, typeController.deleteTypeById);

module.exports = router;
