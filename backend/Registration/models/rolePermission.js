const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('RolePermission', {
  role_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  permission_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'role_permissions',
  timestamps: false
});
