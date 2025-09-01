'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },

      school_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'school', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      school_name: { type: Sequelize.STRING(150), allowNull: true },
      school_code: { type: Sequelize.STRING(50), allowNull: true },

      first_name: { type: Sequelize.STRING(50), allowNull: false },
      last_name: { type: Sequelize.STRING(50), allowNull: true },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      mobile_number: { type: Sequelize.STRING(20), allowNull: true },
      gender: { type: Sequelize.ENUM('Male', 'Female'), allowNull: true },
      date_of_birth: { type: Sequelize.DATEONLY, allowNull: true },

      address_line1: { type: Sequelize.STRING(255), allowNull: true },
      address_line2: { type: Sequelize.STRING(255), allowNull: true },
      address_line3: { type: Sequelize.STRING(255), allowNull: true },
      city: { type: Sequelize.STRING(100), allowNull: true },
      state: { type: Sequelize.STRING(100), allowNull: true },
      postal_code: { type: Sequelize.STRING(20), allowNull: true },
      country: { type: Sequelize.STRING(100), allowNull: true },

      admission_date: { type: Sequelize.DATEONLY, allowNull: true },
      admission_no: { type: Sequelize.STRING(50), allowNull: true },
      student_code: { type: Sequelize.STRING(50), allowNull: true },
       class: {
        type: Sequelize.ENUM('I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'),
        allowNull: true
      },
      section: { type: Sequelize.STRING(20), allowNull: true },
      roll_no: { type: Sequelize.STRING(20), allowNull: true },

      father_name: { type: Sequelize.STRING(100), allowNull: true },
      father_mobile_number: { type: Sequelize.STRING(20), allowNull: true },
      mother_name: { type: Sequelize.STRING(100), allowNull: true },
      mother_mobile_number: { type: Sequelize.STRING(20), allowNull: true },
      blood_group: { type: Sequelize.STRING(10), allowNull: true },
      status: { type: Sequelize.STRING, defaultValue: 'Active' },
      registration_date: { type: Sequelize.DATEONLY, allowNull: true },

      is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      is_deleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },

      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('students');
  }
};
