const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Permission = require('./Permission');

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
  permission_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'permissions', // table name
      key: 'id'
    }
  },
  deleted_at: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

// association
Role.belongsTo(Permission, { foreignKey: 'permission_id' });

module.exports = Role;
