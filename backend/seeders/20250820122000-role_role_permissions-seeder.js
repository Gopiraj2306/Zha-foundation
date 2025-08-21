'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Assign all permissions to Super Admin (assume role_id = 1, permission ids 1-4)
    return await queryInterface.bulkInsert('role_permissions', [
      { role_id: 1, permission_id: 1 }, // create_user
      { role_id: 1, permission_id: 2 }, // update_user
      { role_id: 1, permission_id: 3 }, // delete_user
      { role_id: 1, permission_id: 4 }  // approve_school
      // Add other permission-role assignments here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_permissions', null, {});
  }
};
