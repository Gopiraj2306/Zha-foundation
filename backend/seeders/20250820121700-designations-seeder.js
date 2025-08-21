'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('designations', [
      {
        school_id: 1,  // Use valid existing school_id
        name: 'Principal',
        description: 'School principal',
        is_created: true,
        updated_at: new Date()
      },
      {
        school_id: 1,
        name: 'Vice Principal',
        description: 'Assistant principal',
        is_created: true,
        updated_at: new Date()
      }
      // Add more designations as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('designations', null, {});
  }
};
