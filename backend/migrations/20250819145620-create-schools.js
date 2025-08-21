'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('school', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false },
      school_code: { type: Sequelize.STRING(16) },
      register_date: { type: Sequelize.DATE },
      phone: { type: Sequelize.STRING(20) },
      address: { type: Sequelize.TEXT },
      city: { type: Sequelize.STRING(100) },
      state: { type: Sequelize.STRING(100) },
      state_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'states',
    key: 'id'
  }
},
      postal_code: { type: Sequelize.STRING(20) },
      country: { type: Sequelize.STRING(100) },
      website: { type: Sequelize.STRING(255) },
      description: { type: Sequelize.STRING(1000) },
      logo: { type: Sequelize.STRING(255) },
      principal_name: { type: Sequelize.STRING(100) },
      type_id: { type: Sequelize.INTEGER },
      total_students: { type: Sequelize.INTEGER },
      total_staff: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING(100) },
      approved_date: { type: Sequelize.DATE },
      reason: { type: Sequelize.STRING(1000) },
      is_created: { type: Sequelize.BOOLEAN, defaultValue: true },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('school');
  }
};
