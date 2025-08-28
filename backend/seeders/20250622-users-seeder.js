'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedSuperAdminPassword = await bcrypt.hash('SuperSecret123', 10);
    const hashedStudentPassword = await bcrypt.hash('StudentPass123', 10);

    // Insert users (without is_active, since migration doesn't have it)
    await queryInterface.bulkInsert('users', [
      {
        id: 1, // explicit ID, optional
        name: 'Super Admin User',
        email: 'superadmin@example.com',
        mobile_no: '9000000002',
        password: hashedSuperAdminPassword,
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Student User',
        email: 'student@example.com',
        mobile_no: '9000000003',
        password: hashedStudentPassword,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // Map roles (assuming role_id: 1 = Super Admin, 2 = Student)
    await queryInterface.bulkInsert('user_roles', [
      { user_id: 1, role_id: 1, created_at: new Date(), updated_at: new Date() },
      { user_id: 2, role_id: 2, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
