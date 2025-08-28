const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
module.exports = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  role_id: { type: DataTypes.INTEGER, allowNull: false },
  context_table: { type: DataTypes.STRING(50) },
  context_id: { type: DataTypes.INTEGER },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'user_roles', timestamps: false });
