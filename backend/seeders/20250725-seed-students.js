'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('students', [
      {
        school_id: 1,
        user_id: 1,
        school_name: 'Greenwood School',        // ✅ added
        school_code: 'SCH001',                  // ✅ added
        registration_date: '2020-06-01',        // ✅ added

        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        mobile_number: '1234567890',
        gender: 'Male',
        date_of_birth: '2005-05-15',

        address_line1: "123 Main Street",
        address_line2: "Near City Park",
        address_line3: "Zone 1",
        city: 'Cityname',
        state: 'Statename',
        postal_code: '12345',
        country: 'Countryname',

        admission_date: '2020-06-01',
        admission_no: 'ADM001',
        student_code: 'STD001',
        class: 'VIII',
        section: 'A',
        roll_no: '25',

        father_name: 'Jane Doe',
        father_mobile_number: '0987654321',
        mother_name: 'Mary Doe',
        mother_mobile_number: '0123456789',

        blood_group: 'O+',
        status: 'Active',

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
