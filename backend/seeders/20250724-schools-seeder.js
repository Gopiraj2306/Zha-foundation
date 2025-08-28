// seeders/20250828-schools-seeder.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('schools', [
      {
        name: 'Green Valley School',
        email: 'contact@gvs.com',
        school_code: 'SCH001',
        register_date: new Date(),
        phone: '9876543210',
        mobile: '9876543210',
        address: '123 Main St',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postal_code: '600001',
        country: 'India',
        website: 'http://gvs.com',
        description: 'Top private school in the city',
        logo: '/uploads/schools/gvs-logo.png',
        principal_name: 'Dr. Raj Kumar',
        school_type: 'Private',
        management: 'Trust',
        education_district: 'Central',
        contact_person: 'Priya Sekar',
        contact_person_email: 'priya.sekar@gvs.com',
        contact_person_mobile: '9741234567',
        fax: '0442222200',
        landmark: 'Near City Mall',
        total_students: 1200,
        total_staff: 75,
        status: 'Pending',
        approved_date: null,
        reason: null,
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('schools', null, {});
  }
};
