// models/index.js
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Username
  process.env.DB_PASSWORD,   // Password
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

// Create an object to hold all models
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and attach them to the db object
db.Gadget = require('./gadget')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database successful!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models with database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = db;