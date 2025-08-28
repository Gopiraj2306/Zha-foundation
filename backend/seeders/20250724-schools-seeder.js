// seeders/20250828-schools-seeder.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('school', [
      {
        name: "ABC Primary School",
        email: "info@abcschool.edu",
        school_code: null,
        // register_date: new Date(),
        landline_no: "044-12345678",
        // phone: "044-12349999",
        mobile_no: "9876543210",
        school_code:"ZHA0TN0CHN3555",
        total_teachers: 20,
        total_students: 500,
        total_staff: 25,
        address_line1: "1, Main Street",
        address_line2: "Near Temple",
        address_line3: "Zone 1",
        city: "Chennai",
        state_id: 1,
        type_id:1,
        postal_code: "600001",
        country: "India",
        website: "http://abcschool.edu",
        description: "A well-known primary school in Chennai.",
        logo: "/uploads/schools/abc-logo.png",
        principal_name: "Mr. Raj Kumar",
        school_type: "public",
        school_management: "Government",
        education_district: "Chennai North",
        contact_person: "Mr. Ramesh",
        contact_person_email: "ramesh@example.com",
        contact_person_mobile: "9876500000",
        fax_no: "044-12340000",
        landmark: "Opposite City Park",
        class_range: "1-5",
        status: "Pending",
        approved_date: null,
        reason: null,
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('school', { email: "info@abcschool.edu" }, {});
  }
};
