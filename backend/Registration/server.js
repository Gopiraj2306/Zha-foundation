const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { initDB } = require('./models');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const schoolAdminRoutes = require('./routes/schoolAdminRoutes');
const designationRoutes = require('./routes/designationRoutes');
const studentRoutes = require('./routes/students');
const socialCoachRoutes = require('./routes/socialCoaches');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/userroles', userRoleRoutes);
app.use('/api/rolepermissions', rolePermissionRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/schooladmins', schoolAdminRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/social-coaches', socialCoachRoutes);

initDB().then(() => {
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
});
