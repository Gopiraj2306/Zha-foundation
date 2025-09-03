'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Super Admin',
        description: 'System super administrator',
        permission_id: 1, // assuming permission exists
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Governor',
        description: 'State governor',
        permission_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'School Admin',
        description: 'School representative',
        permission_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Social Coach',
        description: 'Sports coach',
        permission_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Student',
        description: 'Learning',
        permission_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
