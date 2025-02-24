const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false,  // Set to true if you want to log SQL queries
});
module.exports = sequelize;
