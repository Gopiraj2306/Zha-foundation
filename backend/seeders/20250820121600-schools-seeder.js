'use strict';

module.exports = {
  up: async (queryInterface) => {
   await queryInterface.bulkInsert('school', [
  {
    name: 'Springfield Elementary',
    email: 'contact@springfield.edu',
    school_code: 'SFE123',
    phone: '1234567890',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state_id: 1,
    postal_code: '12345',
    country: 'USA',
    website: 'http://springfield.edu',
    description: 'A primary school in Springfield.',
    is_created: true,
    updated_at: new Date()
  }
]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('school', null, {});
  }
};
