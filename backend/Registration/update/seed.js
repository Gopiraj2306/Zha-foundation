const { sequelize, Role, Permission, School, SchoolAdmin, Designation, Type } = require('./models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Drop and recreate tables

    // Insert Types for school.type_id foreign key
    const types = await Type.bulkCreate([
      { name: 'Public' },
      { name: 'Private' },
      { name: 'Charter' },
      { name: 'Other' }
    ], { returning: true });

    // Insert Roles
    await Role.bulkCreate([
      { name: 'Governor' },
      { name: 'School Admin' },
      { name: 'Social Coach' },
      { name: 'Super Admin' },
      { name: 'Student' },
      { name: 'Staff' }
    ]);

    // Insert Permissions
    await Permission.bulkCreate([
      { name: 'create_user' },
      { name: 'view_user' },
      { name: 'delete_user' }
    ]);

    // Insert Schools referencing valid type ids
    const schools = await School.bulkCreate([
      {
        name: 'Greenwood School',
        email: 'contact@greenwood.edu',
        type_id: types.find(t => t.name === 'Public').id,
        school_code: 'GW2025',
        register_date: '2025-08-01',
        phone: '1234567890',
        address: '123 Greenwood St',
        city: 'Mumbai',
        state: 'MH',
        postal_code: '400001',
        country: 'India',
        website: 'https://greenwood.edu',
        description: 'A prestigious school in Mumbai.',
        logo: 'greenwood.png',
        principal_name: 'A. Sharma',
        total_students: 1500,
        total_staff: 100,
        status: 'Active',
        approved_date: '2025-08-10',
        reason: 'Initial setup',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sunrise Academy',
        email: 'info@sunrise.edu',
        type_id: types.find(t => t.name === 'Private').id,
        school_code: 'SA2025',
        register_date: '2025-08-19',
        phone: '9876543210',
        address: '456 Sunrise Blvd',
        city: 'Mumbai',
        state: 'MH',
        postal_code: '400002',
        country: 'India',
        website: 'https://sunrise.edu',
        description: 'An esteemed private school.',
        logo: 'sunrise.png',
        principal_name: 'R. Gupta',
        total_students: 1200,
        total_staff: 80,
        status: 'Active',
        approved_date: '2025-08-01',
        reason: 'New approval',
        is_active: true,
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Insert Designations linked to schools
    const designations = await Designation.bulkCreate([
      { school_id: schools[0].id, name: 'Principal', is_active: true, created_at: new Date(), updated_at: new Date() },
      { school_id: schools.id, name: 'Vice Principal', is_active: true, created_at: new Date(), updated_at: new Date() },
      { school_id: schools[1].id, name: 'Principal', is_active: true, created_at: new Date(), updated_at: new Date() }
    ], { returning: true });

    // Insert School Admins (ensure user_id exists in your users table)
    await SchoolAdmin.bulkCreate([
      { school_id: schools[0].id, user_id: 1, is_active: true, created_at: new Date(), updated_at: new Date() },
      { school_id: schools.id, user_id: 2, is_active: true, created_at: new Date(), updated_at: new Date() }
    ]);

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Change from:
// await sequelize.sync({ alter: true });
// To (for development only, WARNING: deletes data!):
// await sequelize.sync({ force: true });


seed();
