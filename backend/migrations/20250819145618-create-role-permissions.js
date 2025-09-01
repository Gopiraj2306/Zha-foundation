'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permissions', {
      role_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
      permission_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('role_permissions');
  }
};