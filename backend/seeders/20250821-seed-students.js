'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('students', [
      {
        school_id: 1,
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        gender: 'Male',
        date_of_birth: '2005-05-15',
        address: '123 Main Street',
        city: 'Cityname',
        state: 'StateName',
        postal_code: '12345',
        country: 'CountryName',
        admission_date: '2020-06-01',
        admission_no: 'ADM001',
        student_code: 'STD001',
        grade: '10',
        section: 'A',
        roll_number: '25',
        parent_name: 'Jane Doe',
        parent_contact: '0987654321',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('students', null, {});
  }
};
