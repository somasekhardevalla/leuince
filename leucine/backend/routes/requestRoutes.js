const express = require('express');
const { submitRequest, getPendingRequests, updateRequestStatus, getUserRequests } = require('../controllers/requestController');
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');

const router = express.Router();

// Submit access request (Employee)
router.post('/', auth, checkRole(['Employee']), submitRequest);

// Get pending requests (Manager)
router.get('/pending', auth, checkRole(['Manager']), getPendingRequests);

// Get user's own requests (Employee)
router.get('/user', auth, getUserRequests);

// Approve or reject request (Manager)
router.patch('/:id', auth, checkRole(['Manager']), updateRequestStatus);

module.exports = router;