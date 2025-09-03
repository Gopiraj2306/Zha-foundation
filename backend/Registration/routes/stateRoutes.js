const express = require('express');
const router = express.Router();
const stateController = require('../controllers/stateController');

// Create
router.post('/', stateController.createState);

// Read all
router.get('/', stateController.getAllStates);

// Read one
router.get('/:id', stateController.getStateById);

// Update
router.put('/:id', stateController.updateState);

// Delete
router.delete('/:id', stateController.deleteState);

module.exports = router;
