'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('social_coach_assignments', [
      {
        school_id: 1,
        teacher_id: 1,
        student_id: 1,
        start_date: '2024-01-01',
        end_date: null,
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Add more seed data if needed
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('social_coach_assignments', null, {});
  }
};
