'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('SuperSecret123', 10);

    return await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin User',
        email: 'superadmin@example.com',
        mobile_no: '9000000002',
        role: "School Admin",
        password: hashedPassword,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Student User',
        email: 'student@example.com',
        mobile_no: '9000000003',
        role: "Student",
        password: await bcrypt.hash('StudentPass123', 10),
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};