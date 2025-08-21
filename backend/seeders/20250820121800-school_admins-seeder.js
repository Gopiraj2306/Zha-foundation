'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert after designations and schools are seeded
    await queryInterface.bulkInsert('school_admins', [
      {
        school_id: 1,          // Make sure school with id=1 exists
        user_id: 1,            // Make sure user with id=1 exists
        designation_id: 1,     // Matches designation inserted above (Principal)
        is_active: true,
        is_created: true,
        updated_at: new Date()
      },
      {
        school_id: 1,
        user_id: 2,
        designation_id: 2,     // Vice Principal
        is_active: true,
        is_created: true,
        updated_at: new Date()
      }
      // Add more if needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('school_admins', null, {});
  }
};
