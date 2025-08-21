'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('school', 'state_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow NULL initially to avoid conflict
      references: {
        model: 'states',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    // Optional: remove old 'state' string column
    await queryInterface.removeColumn('school', 'state');
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('school', 'state', {
      type: Sequelize.STRING(100),
      allowNull: true
    });

    await queryInterface.removeColumn('school', 'state_id');
  }
};
