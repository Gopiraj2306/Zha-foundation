// models/school.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const School = sequelize.define('School', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: true },
  school_code: { type: DataTypes.STRING(50), allowNull: true },
  // register_date: { type: DataTypes.DATE, allowNull: true },
  landline_no: { type: DataTypes.STRING(20), allowNull: true },
  // phone: { type: DataTypes.STRING(20), allowNull: true },
  mobile_no: { type: DataTypes.STRING(20), allowNull: true },
  total_teachers: { type: DataTypes.INTEGER, allowNull: true },
  total_students: { type: DataTypes.INTEGER, allowNull: true },
  total_staff: { type: DataTypes.INTEGER, allowNull: true },
  type_id: { type: DataTypes.INTEGER },
  address_line1: { type: DataTypes.STRING(255), allowNull: true },
  address_line2: { type: DataTypes.STRING(255), allowNull: true },
  address_line3: { type: DataTypes.STRING(255), allowNull: true },
  city: { type: DataTypes.STRING(100), allowNull: true },
  state_id: { type: DataTypes.INTEGER, allowNull: true },
  postal_code: { type: DataTypes.STRING(20), allowNull: true },
  country: { type: DataTypes.STRING(100), allowNull: true },

  website: { type: DataTypes.STRING(255), allowNull: true },
  description: { type: DataTypes.STRING(1000), allowNull: true },
  logo: { type: DataTypes.STRING(255), allowNull: true },
  principal_name: { type: DataTypes.STRING(100), allowNull: true },

  school_type: { 
    type: DataTypes.ENUM('public','private','charter','other'), 
    allowNull: false,
    defaultValue: 'public'
  },
  school_management: { type: DataTypes.STRING(100), allowNull: true },
  education_district: { type: DataTypes.STRING(100), allowNull: true },

  contact_person: { type: DataTypes.STRING(100), allowNull: true },
  contact_person_email: { type: DataTypes.STRING(100), allowNull: true },
  contact_person_mobile: { type: DataTypes.STRING(20), allowNull: true },
  fax_no: { type: DataTypes.STRING(20), allowNull: true },
  landmark: { type: DataTypes.STRING(255), allowNull: true },

  class_range: { type: DataTypes.STRING(50), allowNull: true },
  status: { type: DataTypes.STRING(50), allowNull: true },
  approved_date: { type: DataTypes.DATE, allowNull: true },
  reason: { type: DataTypes.STRING(1000), allowNull: true },

  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }

}, {
  tableName: 'school',        // ✅ matches your table name
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

module.exports = School;
