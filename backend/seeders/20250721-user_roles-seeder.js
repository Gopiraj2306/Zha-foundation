'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Assuming IDs: Super Admin user = 1, Student user = 2, Role IDs: Super Admin = 1, Student = 5
    return await queryInterface.bulkInsert('user_roles', [
      {
        user_id: 1,
        role_id: 1, // Super Admin role
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        role_id: 5, // Student role
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
