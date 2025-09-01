const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  school_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },

  school_name: { type: DataTypes.STRING, allowNull: true },  // ✅ fixed
  school_code: { type: DataTypes.STRING, allowNull: true },  // ✅ fixed
  registration_date: { type: DataTypes.DATE, allowNull: true }, // ✅ fixed

  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },

  roll_no: { type: DataTypes.STRING, allowNull: true },
  class: {
    type: DataTypes.ENUM('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'),
    allowNull: true
  },
  section: { type: DataTypes.STRING, allowNull: true },
  gender: { type: DataTypes.ENUM('Male', 'Female'), allowNull: true },
  mobile_number: { type: DataTypes.STRING, allowNull: true },

  father_name: { type: DataTypes.STRING, allowNull: true },
  father_mobile_number: { type: DataTypes.STRING, allowNull: true },
  mother_name: { type: DataTypes.STRING, allowNull: true },
  mother_mobile_number: { type: DataTypes.STRING, allowNull: true },

  date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
  blood_group: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'Active' },

  address_line1: { type: DataTypes.STRING, allowNull: true },
  address_line2: { type: DataTypes.STRING, allowNull: true },
  address_line3: { type: DataTypes.STRING, allowNull: true },

  is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'students',
  timestamps: false
});

module.exports = Student;
