// migrations/20250828-create-schools.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('schools', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false },
      school_code: { type: Sequelize.STRING(10), unique: true, allowNull: true },
      register_date: { type: Sequelize.DATE },
      phone: { type: Sequelize.STRING(20) },
      mobile: { type: Sequelize.STRING(20) },
      address: { type: Sequelize.TEXT },
      city: { type: Sequelize.STRING(100) },
      state: { type: Sequelize.STRING(100) },
      postal_code: { type: Sequelize.STRING(20) },
      country: { type: Sequelize.STRING(100) },
      website: { type: Sequelize.STRING(255) },
      description: { type: Sequelize.STRING(1000) },
      logo: { type: Sequelize.STRING(255) },
      principal_name: { type: Sequelize.STRING(100) },
      school_type: { type: Sequelize.ENUM('Public', 'Private', 'Charter', 'Other'), allowNull: false },
      management: { type: Sequelize.STRING(100) },
      education_district: { type: Sequelize.STRING(100) },
      contact_person: { type: Sequelize.STRING(100) },
      contact_person_email: { type: Sequelize.STRING(100) },
      contact_person_mobile: { type: Sequelize.STRING(20) },
      fax: { type: Sequelize.STRING(20) },
      landmark: { type: Sequelize.STRING(100) },
      total_students: { type: Sequelize.INTEGER },
      total_staff: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING(100), allowNull: false, defaultValue: 'Pending' },
      approved_date: { type: Sequelize.DATE },
      reason: { type: Sequelize.STRING(100) },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('schools');
  }
};
