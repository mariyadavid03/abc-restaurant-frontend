
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/PublicUI/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './pages/AdminUI/AdminLogin';
import StaffLogin from './pages/StaffUI/StaffLogin';
import StaffDashboard from './pages/StaffUI/StaffDashboard';
import AdminDashboard from './pages/AdminUI/AdminDashboard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/staff-login' element={<StaffLogin/>}/>
        <Route path='/staff' element={<StaffDashboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
