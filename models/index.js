const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: process.env.DATABASE_URL ? {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    } : {}
  }
);

// Create a db object to hold the models
const db = {};

// Attach Sequelize and sequelize instance to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and initialize them
db.Gadget = require('./gadget')(sequelize, Sequelize.DataTypes);
db.User = require('./user')(sequelize, Sequelize.DataTypes);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database successful!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = db;