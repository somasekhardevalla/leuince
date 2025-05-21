const express = require('express');
const cors = require('cors');
const { initializeDB } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const softwareRoutes = require('./routes/softwareRoutes');
const requestRoutes = require('./routes/requestRoutes');

// Initialize express app
const app = express();

// Initialize database
initializeDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('User Access Management API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;