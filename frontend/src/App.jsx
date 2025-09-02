import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/Dashboard-page';
import Login from './components/Login';
import Signup from './components/Signup';
import SchoolProfile from './pages/school/SchoolProfile';
import SocialCoachManagement from './pages/school/SocialCoachManagement';
import StudentManagement from './pages/school/StudentManagement'; 
import EditProfile from './pages/school/EditProfile';
import AddCoach from './pages/school/addCoach/AddCoach';
import AddStudent from './pages/school/addStudent/AddStudent';
import SocialCoachDetails from './pages/school/SocialCoachDetails';
import SocialEditCoach from './pages/school/SocialEditCoach';
import SocialLoginDetails from './pages/school/SocialLoginDetails';
import SchoolRegistrationForm from './components/SchoolRegistrationForm';
import AdminStudentManagement from './pages/superadmin/AdminStudentManagement';
import ViewRegistrationForm from './pages/superadmin/ViewRegistrationForm';
import EditRegistrationForm from './pages/superadmin/EditRegistrationSchool';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<Login onNavigate={(path) => window.location.pathname = path} />} />
          <Route path="/signup" element={<Signup onNavigate={(path) => window.location.pathname = path} />} />
          <Route path="/signup/schoolregistrationform" element={<SchoolRegistrationForm />} />
          <Route path="/school-profile" element={<SchoolProfile />} />
          <Route path="/social-coach-management" element={<SocialCoachManagement />} />
          <Route path="/student-management" element={<StudentManagement />} /> 
          <Route path="/edit-profile" element={<EditProfile />} />
           <Route path="/add-coach" element={<AddCoach />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/coach-details" element={<SocialCoachDetails />} />
             <Route path="/social-coach/edit/:id" element={<SocialEditCoach />} />
             <Route path="/login-details" element={<SocialLoginDetails />} />
             <Route path="/admin/student-management" element={<AdminStudentManagement />} />
              <Route path="/schools/view/:id" element={<ViewRegistrationForm />} />
              <Route path="/schools/edit/:id" element={<EditRegistrationForm />} />

              
            
             

        </Routes>
      </div>
    </Router>
  );
}

export default App;
