const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  });

  // Hash password before saving
  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};