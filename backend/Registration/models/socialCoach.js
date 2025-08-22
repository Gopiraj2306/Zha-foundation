const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SocialCoach = sequelize.define('SocialCoach', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  school_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  designation_id: { type: DataTypes.INTEGER, allowNull: true },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  phone: { type: DataTypes.STRING(20) },
  gender: { type: DataTypes.ENUM('Male', 'Female') },
  date_of_birth: { type: DataTypes.DATEONLY },
  address: { type: DataTypes.TEXT },
  city: { type: DataTypes.STRING(100) },
  state: { type: DataTypes.STRING(100) },
  postal_code: { type: DataTypes.STRING(20) },
  country: { type: DataTypes.STRING(100) },
  join_date: { type: DataTypes.DATEONLY },
  coach_id: { type: DataTypes.STRING(50) },
  qualifications: { type: DataTypes.STRING(255) },
  experience_years: { type: DataTypes.INTEGER },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'social_coaches',
  timestamps: false
});

module.exports = SocialCoach;
