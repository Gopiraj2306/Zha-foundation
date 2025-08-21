const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('School', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  school_code: { type: DataTypes.STRING(16) },
  register_date: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING(20) },
  address: { type: DataTypes.TEXT },
  city: { type: DataTypes.STRING(100) },
state_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: { model: 'states', key: 'id' }
},
  postal_code: { type: DataTypes.STRING(20) },
  country: { type: DataTypes.STRING(100) },
  website: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.STRING(1000) },
  logo: { type: DataTypes.STRING(255) },
  principal_name: { type: DataTypes.STRING(100) },
  type_id: { type: DataTypes.INTEGER },
  total_students: { type: DataTypes.INTEGER },
  total_staff: { type: DataTypes.INTEGER },
  status: { type: DataTypes.STRING(100) },
  approved_date: { type: DataTypes.DATE },
  reason: { type: DataTypes.STRING(1000) },
  is_created: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'school',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

