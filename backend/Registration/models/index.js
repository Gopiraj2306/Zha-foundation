// // const sequelize = require('../../config/database');

// const Users = require('./user');
// const Roles = require('./role');
// const Permissions = require('./permission');
// const UserRoles = require('./userRole');
// const RolePermissions = require('./rolePermission');
// const Schools = require('./school');
// const SchoolAdmins = require('./schoolAdmin');
// const Designations = require('./designation');
// const Types = require('./type');
// const States = require('./state');

// // Import Student model (add this line)
// const Students = require('./student');

// // Define associations (your existing associations remain unchanged)

// // Many-to-many Role-Permission
// Roles.belongsToMany(Permissions, { through: RolePermissions, foreignKey: 'role_id', otherKey: 'permission_id' });
// Permissions.belongsToMany(Roles, { through: RolePermissions, foreignKey: 'permission_id', otherKey: 'role_id' });

// // RolePermission belongsTo and hasMany
// RolePermissions.belongsTo(Roles, { foreignKey: 'role_id' });
// Roles.hasMany(RolePermissions, { foreignKey: 'role_id' });
// RolePermissions.belongsTo(Permissions, { foreignKey: 'permission_id' });
// Permissions.hasMany(RolePermissions, { foreignKey: 'permission_id' });

// // Many-to-many User-Role
// Users.belongsToMany(Roles, { through: UserRoles, foreignKey: 'user_id', otherKey: 'role_id' });
// Roles.belongsToMany(Users, { through: UserRoles, foreignKey: 'role_id', otherKey: 'user_id' });
// UserRoles.belongsTo(Roles, { foreignKey: 'role_id' });
// Roles.hasMany(UserRoles, { foreignKey: 'role_id' });
// UserRoles.belongsTo(Users, { foreignKey: 'user_id' });
// Users.hasMany(UserRoles, { foreignKey: 'user_id' });

// // Other associations
// Schools.belongsTo(Types, { foreignKey: 'type_id' });
// Types.hasMany(Schools, { foreignKey: 'type_id' });

// SchoolAdmins.belongsTo(Schools, { foreignKey: 'school_id' });
// Schools.hasMany(SchoolAdmins, { foreignKey: 'school_id' });

// SchoolAdmins.belongsTo(Designations, { foreignKey: 'designation_id' });
// Designations.hasMany(SchoolAdmins, { foreignKey: 'designation_id' });

// States.hasMany(Schools, { foreignKey: 'state_id' });
// Schools.belongsTo(States, { foreignKey: 'state_id' });

// // Export all models here including Student (added)
// // module.exports = {
// //   sequelize,
// //   User,
// //   Role,
// //   Permission,
// //   UserRole,
// //   RolePermission,
// //   School,
// //   SchoolAdmin,
// //   Designation,
// //   Type,
// //   State,
// //   Student,
// //    initDB  // IMPORTANT: ADD THIS TO EXPORT STUDENT MODEL
// // };

// // // Database sync function
// // const initDB = async () => {
// //   await sequelize.sync();
// // };

// // module.exports.initDB = initDB;
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '../../config/config.json'))[env];

// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs.readdirSync(__dirname)
//   .filter(file => (
//     file.indexOf('.') !== 0 &&
//     file !== basename &&
//     file.slice(-3) === '.js'
//   ))
//   .forEach(file => {
//     const modelImport = require(path.join(__dirname, file));
//     // Import the model class directly (do NOT invoke as a function)
//     db[modelImport.name] = modelImport;
//   });

// // Initialize model associations if they exist
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Export a function to initialize database
// const initDB = async () => {
//   await sequelize.sync();
// };

// module.exports = {
//   sequelize,
//   Users,
//   Roles,
//   Permissions,
//   UserRoles,
//   RolePermissions,
//   Schools,
//   SchoolAdmins,
//   Designations,
//   Types,
//   States,
//   Students,
//    initDB  // IMPORTANT: ADD THIS TO EXPORT STUDENT MODEL
// };

// module.exports.initDB = initDB;

// 
const sequelize = require('../../config/database');

const User = require('./user');
const Role = require('./role');
const Permission = require('./Permission');
const UserRole = require('./userRole');
const RolePermission = require('./rolePermission');
const School = require('./school');
const SchoolAdmin = require('./schoolAdmin');
const Designation = require('./designation');
const Type = require('./type');
const State = require('./state');

// Import Student model (add this line)
const Student = require('./student');

// Define associations (your existing associations remain unchanged)

// Many-to-many Role-Permission
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id', otherKey: 'permission_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id', otherKey: 'role_id' });

// RolePermission belongsTo and hasMany
RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(RolePermission, { foreignKey: 'role_id' });
RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });
Permission.hasMany(RolePermission, { foreignKey: 'permission_id' });

// Many-to-many User-Role
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', otherKey: 'user_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(UserRole, { foreignKey: 'role_id' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(UserRole, { foreignKey: 'user_id' });

// Other associations
School.belongsTo(Type, { foreignKey: 'type_id' });
Type.hasMany(School, { foreignKey: 'type_id' });

SchoolAdmin.belongsTo(School, { foreignKey: 'school_id' });
School.hasMany(SchoolAdmin, { foreignKey: 'school_id' });

SchoolAdmin.belongsTo(Designation, { foreignKey: 'designation_id' });
Designation.hasMany(SchoolAdmin, { foreignKey: 'designation_id' });

State.hasMany(School, { foreignKey: 'state_id' });
School.belongsTo(State, { foreignKey: 'state_id' });

// Export all models here including Student (added)
module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  School,
  SchoolAdmin,
  Designation,
  Type,
  State,
  Student,  // IMPORTANT: ADD THIS TO EXPORT STUDENT MODEL
};

// Database sync function
const initDB = async () => {
  await sequelize.sync();
};

module.exports.initDB = initDB;