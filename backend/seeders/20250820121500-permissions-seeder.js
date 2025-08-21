'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permissions', [
      {
        name: 'create_user',
        description: 'Create a new user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'update_user',
        description: 'Update existing user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'delete_user',
        description: 'Delete a user',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'approve_school',
        description: 'Approve or reject a school',
        created_at: new Date(),
        updated_at: new Date()
      }
      // Add other permissions as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
