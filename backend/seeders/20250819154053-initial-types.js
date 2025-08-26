'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('types', [
      { name: 'Traditional', is_deleted: false, created_at: new Date(), updated_at: new Date() },
      { name: 'Compettion', is_deleted: false, created_at: new Date(), updated_at: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('types', null, {});
  }
};
