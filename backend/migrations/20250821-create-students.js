'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      school_id: { type: Sequelize.INTEGER, allowNull: false },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      first_name: { type: Sequelize.STRING(50), allowNull: false },
      last_name: { type: Sequelize.STRING(50), allowNull: true },
      email: { type: Sequelize.STRING(100), allowNull: false },
      phone: { type: Sequelize.STRING(20) },
      gender: { type: Sequelize.ENUM('Male', 'Female') },
      date_of_birth: { type: Sequelize.DATEONLY },
      address: { type: Sequelize.TEXT },
      city: { type: Sequelize.STRING(100) },
      state: { type: Sequelize.STRING(100) },
      postal_code: { type: Sequelize.STRING(20) },
      country: { type: Sequelize.STRING(100) },
      admission_date: { type: Sequelize.DATEONLY },
      admission_no: { type: Sequelize.STRING(50) },
      student_code: { type: Sequelize.STRING(50) },
      grade: { type: Sequelize.STRING(20) },
      section: { type: Sequelize.STRING(20) },
      roll_number: { type: Sequelize.STRING(20) },
      parent_name: { type: Sequelize.STRING(100) },
      parent_contact: { type: Sequelize.STRING(20) },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('students');
  }
};
