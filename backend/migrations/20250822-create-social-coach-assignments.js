'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('social_coach_assignments', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      school_id: { type: Sequelize.INTEGER, allowNull: false },
      teacher_id: { type: Sequelize.INTEGER, allowNull: false },
      student_id: { type: Sequelize.INTEGER, allowNull: false },
      start_date: { type: Sequelize.DATEONLY, allowNull: true },
      end_date: { type: Sequelize.DATEONLY, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('social_coach_assignments');
  }
};
