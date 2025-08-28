// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User, UserRole, Role, Permission, RolePermission } = require('../models');
// const { Op } = require('sequelize');
// const dotenv = require('dotenv');

// dotenv.config();

// const allowedRoles = ['Super Admin', 'Governor', 'School Admin', 'Social Coach', 'Student'];

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, confirm_password, mobile_no, role } = req.body;

//     if (password !== confirm_password) {
//       return res.status(400).json({ error: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({
//       where: { [Op.or]: [{ email }, { mobile_no }] }
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Email or Mobile number already in use' });
//     }

//     if (!allowedRoles.includes(role)) {
//       return res.status(400).json({ error: 'Invalid role specified' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, mobile_no });

//     const roleRecord = await Role.findOne({ where: { name: role } });
//     if (!roleRecord) {
//       return res.status(400).json({ error: 'Role does not exist' });
//     }

//     await UserRole.create({ user_id: user.id, role_id: roleRecord.id });

//     const token = jwt.sign({ id: user.id, roles: [roleRecord.name] }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     return res.status(201).json({
//       id: user.id,
//       email: user.email,
//       role: roleRecord.name,
//       token
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email, is_deleted: false } });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const userRoles = await UserRole.findAll({
//       where: { user_id: user.id },
//       include: [{ model: Role }]
//     });
//     const roles = userRoles.map(ur => ur.Role.name);

//     let permissions = [];
//     const isSuperAdmin = roles.includes('Super Admin');
//     if (isSuperAdmin) {
//       const allPermissions = await Permission.findAll();
//       permissions = allPermissions.map(p => p.name);
//     } else {
//       const roleIds = userRoles.map(ur => ur.role_id);
//       const rolePermissions = await RolePermission.findAll({
//         where: { role_id: roleIds },
//         include: [{ model: Permission }]
//       });
//       permissions = rolePermissions.map(rp => rp.Permission.name);
//     }

//     const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         roles,
//         permissions
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, UserRole, Role, Permission, RolePermission } = require('../models');
const { Op } = require('sequelize');

const allowedRoles = ['Super Admin', 'Governor', 'School Admin', 'Social Coach', 'Student'];

exports.register = async (req, res) => {
  try {
    const { name, email, password, confirm_password, mobile_no, role } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { mobile_no }] }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email or Mobile number already in use' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, mobile_no });

    const roleRecord = await Role.findOne({ where: { name: role } });
    if (!roleRecord) {
      return res.status(400).json({ error: 'Role does not exist' });
    }

    await UserRole.create({ user_id: user.id, role_id: roleRecord.id });

    const token = jwt.sign(
      { id: user.id, roles: [roleRecord.name] },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: roleRecord.name,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, is_deleted: false } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const userRoles = await UserRole.findAll({
      where: { user_id: user.id },
      include: [{ model: Role }]
    });
    const roles = userRoles.map(ur => ur.Role.name);

    let permissions = [];
    if (roles.includes('Super Admin')) {
      const allPermissions = await Permission.findAll();
      permissions = allPermissions.map(p => p.name);
    } else {
      const roleIds = userRoles.map(ur => ur.role_id);
      const rolePermissions = await RolePermission.findAll({
        where: { role_id: roleIds },
        include: [{ model: Permission }]
      });
      permissions = rolePermissions.map(rp => rp.Permission.name);
    }

    const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles,
        permissions
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, confirm_password, mobile_no, role } = req.body;

//     if(password !== confirm_password) return res.status(400).json({ error: 'Passwords do not match' });

//     const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { mobile_no }] } });
//     if(existingUser) return res.status(400).json({ error: 'Email or Mobile number already in use' });

//     if(!allowedRoles.includes(role)) return res.status(400).json({ error: 'Invalid role specified' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword, mobile_no });

//     const roleRecord = await Role.findOne({ where: { name: role } });
//     if(!roleRecord) return res.status(400).json({ error: 'Role does not exist' });

//     await UserRole.create({ user_id: user.id, role_id: roleRecord.id });

//     const token = jwt.sign({ id: user.id, roles: [roleRecord.name] }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ id: user.id, email: user.email, role: roleRecord.name, token });
//   } catch(error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email, is_deleted: false } });
//     if(!user) return res.status(401).json({ error: 'Invalid credentials' });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if(!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

//     const userRoles = await UserRole.findAll({ where: { user_id: user.id }, include: [{ model: Role }] });
//     const roles = userRoles.map(ur => ur.Role.name);

//     let permissions = [];
//     if(roles.includes('Super Admin')) {
//       const allPermissions = await Permission.findAll();
//       permissions = allPermissions.map(p => p.name);
//     } else {
//       const roleIds = userRoles.map(ur => ur.role_id);
//       const rolePermissions = await RolePermission.findAll({ where: { role_id: roleIds }, include: [{ model: Permission }] });
//       permissions = rolePermissions.map(rp => rp.Permission.name);
//     }

//     const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, user: { id: user.id, email: user.email, name: user.name, roles, permissions } });
//   } catch(error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };