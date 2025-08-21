'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
  {
    name: 'Super Admin',
    description: 'System super administrator',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
  },
  {
    name: 'Governor',
    description: 'State governor',
    created_at: new Date(),
    updated_at: new Date(),
  },
      {
        name: 'School Admin',
        description: 'School representative',
        created_at: new Date(),
        updated_at: new Date(),
        // deleted_at: null
      },
      {
        name: 'Social Coach',
        description: 'Sports coach',
        created_at: new Date(),
        updated_at: new Date(),
        // deleted_at: null
      },
      {
        name: 'Student',
        description: 'Learning',
        created_at: new Date(),
        updated_at: new Date(),
        // deleted_at: null
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
