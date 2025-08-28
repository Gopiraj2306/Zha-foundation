const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const School = sequelize.define('School', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  school_code: { type: DataTypes.STRING(10), unique: true, allowNull: true },
  register_date: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING(20) },
  mobile: { type: DataTypes.STRING(20) },
  address: { type: DataTypes.TEXT },
  city: { type: DataTypes.STRING(100) },
  state: { type: DataTypes.STRING(100) },
  postal_code: { type: DataTypes.STRING(20) },
  country: { type: DataTypes.STRING(100) },
  website: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.STRING(1000) },
  logo: { type: DataTypes.STRING(255) },
  principal_name: { type: DataTypes.STRING(100) },
  school_type: { type: DataTypes.ENUM('Public', 'Private', 'Charter', 'Other'), allowNull: false },
  management: { type: DataTypes.STRING(100) },
  education_district: { type: DataTypes.STRING(100) },
  contact_person: { type: DataTypes.STRING(100) },
  contact_person_email: { type: DataTypes.STRING(100) },
  contact_person_mobile: { type: DataTypes.STRING(20) },
  fax: { type: DataTypes.STRING(20) },
  landmark: { type: DataTypes.STRING(100) },
  total_students: { type: DataTypes.INTEGER },
  total_staff: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING(100), allowNull: false, defaultValue: 'Pending' },
  approved_date: { type: DataTypes.DATE },
  reason: { type: DataTypes.STRING(100) },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'schools',
  timestamps: false
});

module.exports = School;
