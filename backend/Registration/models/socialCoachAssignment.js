const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SocialCoachAssignment = sequelize.define('SocialCoachAssignment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  school_id: { type: DataTypes.INTEGER, allowNull: false },
  teacher_id: { type: DataTypes.INTEGER, allowNull: false },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  start_date: { type: DataTypes.DATEONLY, allowNull: true },
  end_date: { type: DataTypes.DATEONLY, allowNull: true },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'social_coach_assignments',
  timestamps: false
});

module.exports = SocialCoachAssignment;
