'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('social_coaches', [
      {
        school_id: 1,
        user_id: 2,
        designation_id: 1,
        first_name: 'Sarah',
        last_name: 'Smith',
        email: 'sarah.smith@example.com',
        phone: '1234567891',
        gender: 'Female',
        date_of_birth: '1990-07-20',
        address: '456 Park Avenue',
        city: 'Cityname',
        state: 'StateName',
        postal_code: '12345',
        country: 'CountryName',
        join_date: '2015-08-01',
        coach_id: 'COA001',
        qualifications: 'Certified Coach',
        experience_years: 5,
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('social_coaches', null, {});
  }
};
