const { getRepository } = require('typeorm');
const Request = require('../models/Request');
const User = require('../models/User');
const Software = require('../models/Software');

// Submit access request (Employee)
const submitRequest = async (req, res) => {
  try {
    const { softwareId, accessType, reason } = req.body;
    const userId = req.user.id;
    
    // Simple validation
    if (!softwareId || !accessType || !reason) {
      return res.status(400).json({ error: 'Please provide software ID, access type, and reason' });
    }
    
    const requestRepository = getRepository(Request);
    const userRepository = getRepository(User);
    const softwareRepository = getRepository(Software);
    
    // Check if user exists
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if software exists
    const software = await softwareRepository.findOne({ where: { id: softwareId } });
    if (!software) {
      return res.status(404).json({ error: 'Software not found' });
    }
    
    // Check if access type is valid for this software
    if (!software.accessLevels.includes(accessType)) {
      return res.status(400).json({ error: 'Invalid access type for this software' });
    }
    
    // Create new request
    const newRequest = await requestRepository.save({
      user: userId,
      software: softwareId,
      accessType,
      reason,
      status: 'Pending',
    });
    
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Submit request error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all pending requests (Manager)
const getPendingRequests = async (req, res) => {
  try {
    const requestRepository = getRepository(Request);
    
    // Get all pending requests with user and software details
    const requests = await requestRepository.find({
      where: { status: 'Pending' },
      relations: ['user', 'software'],
    });
    
    res.json(requests);
  } catch (error) {
    console.error('Get pending requests error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Approve or reject request (Manager)
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Simple validation
    if (!status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Please provide a valid status (Approved or Rejected)' });
    }
    
    const requestRepository = getRepository(Request);
    
    // Check if request exists
    const request = await requestRepository.findOne({ where: { id } });
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    // Check if request is already processed
    if (request.status !== 'Pending') {
      return res.status(400).json({ error: 'Request has already been processed' });
    }
    
    // Update request status
    request.status = status;
    await requestRepository.save(request);
    
    res.json(request);
  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user's own requests (Employee)
const getUserRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const requestRepository = getRepository(Request);
    
    // Get all requests for this user with software details
    const requests = await requestRepository.find({
      where: { user: { id: userId } },
      relations: ['software'],
    });
    
    res.json(requests);
  } catch (error) {
    console.error('Get user requests error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { submitRequest, getPendingRequests, updateRequestStatus, getUserRequests };
