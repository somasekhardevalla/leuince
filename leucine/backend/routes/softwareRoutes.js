const express = require('express');
const { getAllSoftware, createSoftware, getSoftwareById } = require('../controllers/softwareController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

const router = express.Router();

// Get all software
router.get('/', auth, getAllSoftware);

// Create new software (Admin only)
router.post('/', auth, checkRole(['Admin']), createSoftware);

// Get software by ID
router.get('/:id', auth, getSoftwareById);

module.exports = router;