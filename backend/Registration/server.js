const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer'); // Import multer here
const cors = require('cors');
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
const socialCoachAssignmentRoutes = require('./routes/socialCoachAssignmentRoutes');

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",  // Vite default port
  credentials: true
}));

// Initialize multer upload middleware here
const upload = multer().single('file'); // expects 'file' field in form-data

// Your bulk upload handler function for social coaches should be imported from controller
const socialCoachController = require('./controllers/socialCoachController');

// Use upload middleware only in your route, e.g. inside routes/socialCoachRoutes.js or here:
app.post('/test-upload', upload, (req, res) => {
  res.json({ file: req.file });
});


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
app.use('/api/social-coach-assignments', socialCoachAssignmentRoutes);

initDB().then(() => {
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
});
