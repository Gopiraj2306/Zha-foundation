const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  school_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
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
  admission_date: { type: DataTypes.DATEONLY },
  admission_no: { type: DataTypes.STRING(50) },
  student_code: { type: DataTypes.STRING(50) },
  grade: { type: DataTypes.STRING(20) },
  section: { type: DataTypes.STRING(20) },
  roll_number: { type: DataTypes.STRING(20) },
  parent_name: { type: DataTypes.STRING(100) },
  parent_contact: { type: DataTypes.STRING(20) },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'students',
  timestamps: false
});

module.exports = Student;
