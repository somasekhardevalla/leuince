const { getRepository } = require('typeorm');
const Software = require('../models/Software');

// Get all software
const getAllSoftware = async (req, res) => {
  try {
    const softwareRepository = getRepository(Software);
    const software = await softwareRepository.find();
    res.json(software);
  } catch (error) {
    console.error('Get all software error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new software (Admin only)
const createSoftware = async (req, res) => {
  try {
    const { name, description, accessLevels } = req.body;
    
    // Simple validation
    if (!name || !description || !accessLevels) {
      return res.status(400).json({ error: 'Please provide name, description, and access levels' });
    }
    
    const softwareRepository = getRepository(Software);
    
    // Create new software
    const newSoftware = await softwareRepository.save({
      name,
      description,
      accessLevels,
    });
    
    res.status(201).json(newSoftware);
  } catch (error) {
    console.error('Create software error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get software by ID
const getSoftwareById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const softwareRepository = getRepository(Software);
    const software = await softwareRepository.findOne({ where: { id } });
    
    if (!software) {
      return res.status(404).json({ error: 'Software not found' });
    }
    
    res.json(software);
  } catch (error) {
    console.error('Get software by ID error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllSoftware, createSoftware, getSoftwareById };
