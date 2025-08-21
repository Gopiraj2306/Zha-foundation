'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('types', [
      { name: 'Primary School', is_deleted: false, created_at: new Date(), updated_at: new Date() },
      { name: 'High School', is_deleted: false, created_at: new Date(), updated_at: new Date() }
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('types', null, {});
  }
};
