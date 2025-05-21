const { createConnection } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const Software = require('../models/Software');
const Request = require('../models/Request');

const initializeDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Software, Request],
      synchronize: true, // Be careful with this in production
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { initializeDB };