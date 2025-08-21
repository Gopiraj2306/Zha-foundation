const sequelize = require('../../config/database');

const User = require('./user');
const Role = require('./role');
const Permission = require('./permission');
const UserRole = require('./userRole');
const RolePermission = require('./rolePermission');
const School = require('./school');
const SchoolAdmin = require('./schoolAdmin');
const Designation = require('./designation');
const Type = require('./type'); // Assuming you have a Type model for type_id
const State = require('./state');

// Many-to-many Role-Permission
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id', otherKey: 'permission_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id', otherKey: 'role_id' });

// Add direct belongsTo/hasMany on RolePermission for eager loading
RolePermission.belongsTo(Role, { foreignKey: 'role_id' });
Role.hasMany(RolePermission, { foreignKey: 'role_id' });

RolePermission.belongsTo(Permission, { foreignKey: 'permission_id' });
Permission.hasMany(RolePermission, { foreignKey: 'permission_id' });

// Many-to-many User-Role
User.belongsToMany(Role, { through: UserRole, foreignKey: 'user_id', otherKey: 'role_id' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'role_id', otherKey: 'user_id' });

// Add direct belongsTo/hasMany on UserRole for eager loading
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



// Database sync function
const initDB = async () => {
  // await sequelize.sync({ alter: true });
  await sequelize.sync();
};

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
  initDB
};
