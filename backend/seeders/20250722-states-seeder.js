'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('states', [
      {
        name: 'Tamil Nadu',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Kerala',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        name: 'Karnataka',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('states', null, {});
  }
};
