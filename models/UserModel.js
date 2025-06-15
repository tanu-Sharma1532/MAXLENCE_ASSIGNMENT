const { DataTypes } = require('sequelize');
const sequelize = require("./index");

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  profile_picture: { type: DataTypes.STRING },
  gender: { type: DataTypes.STRING },
  dob: { type: DataTypes.DATE },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  verification_token: {
    type: DataTypes.STRING,
  },
  reset_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
