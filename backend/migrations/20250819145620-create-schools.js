'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('school', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: true },
      school_code: { type: Sequelize.STRING(50), allowNull: true },
       type_id: { type: Sequelize.INTEGER },
      landline_no: { type: Sequelize.STRING(20), allowNull: true },
      mobile_no: { type: Sequelize.STRING(20), allowNull: true },
      total_teachers: { type: Sequelize.INTEGER, allowNull: true },
      total_students: { type: Sequelize.INTEGER, allowNull: true },
      total_staff: { type: Sequelize.INTEGER, allowNull: true },
      address_line1: { type: Sequelize.STRING(255), allowNull: true },
      address_line2: { type: Sequelize.STRING(255), allowNull: true },
      address_line3: { type: Sequelize.STRING(255), allowNull: true },
      city: { type: Sequelize.STRING(100), allowNull: true },
      state_id: { type: Sequelize.INTEGER, allowNull: true },
      postal_code: { type: Sequelize.STRING(20), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: true },
      website: { type: Sequelize.STRING(255), allowNull: true },
      description: { type: Sequelize.STRING(1000), allowNull: true },
      logo: { type: Sequelize.STRING(255), allowNull: true },
      principal_name: { type: Sequelize.STRING(100), allowNull: true },
      school_type: { type: Sequelize.ENUM('public','private','charter','other'), allowNull: false, defaultValue: 'public' },
      school_management: { type: Sequelize.STRING(100), allowNull: true },
      education_district: { type: Sequelize.STRING(100), allowNull: true },
      contact_person: { type: Sequelize.STRING(100), allowNull: true },
      contact_person_email: { type: Sequelize.STRING(100), allowNull: true },
      contact_person_mobile: { type: Sequelize.STRING(20), allowNull: true },
      fax_no: { type: Sequelize.STRING(20), allowNull: true },
      landmark: { type: Sequelize.STRING(255), allowNull: true },
      class_range: { type: Sequelize.STRING(50), allowNull: true },
      status: { type: Sequelize.STRING(50), allowNull: true },
      approved_date: { type: Sequelize.DATE, allowNull: true },
      reason: { type: Sequelize.STRING(1000), allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      deleted_at: { type: Sequelize.DATE, allowNull: true }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('school');
  }
};