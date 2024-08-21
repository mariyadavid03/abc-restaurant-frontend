
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/PublicUI/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './pages/AdminUI/AdminLogin';
import StaffLogin from './pages/StaffUI/StaffLogin';
import StaffDashboard from './pages/StaffUI/StaffDashboard';
import AdminDashboard from './pages/AdminUI/AdminDashboard';
import LoginPage from './pages/PublicUI/LoginPage/LoginPage';
import SignupPage from './pages/PublicUI/LoginPage/SignupPage';
import AboutUsPage from './pages/PublicUI/AboutPage/AboutUsPage';
import MenuPage from './pages/PublicUI/MenuPage/MenuPage';
import ServicePage from './pages/PublicUI/ServicePage/ServicePage';
import ReservationPage from './pages/PublicUI/ReservationPage/ReservationPage';
import CartPage from './pages/PublicUI/CartPage/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedRoute from './components/AnimatedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/service" element={<ServicePage />} />

        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>

        <Route path='/staff' element={<StaffLogin/>}/>
        <Route path='/staff/dashboard' element={<StaffDashboard/>}/>
        
        {/* Animated Routes */}
        <Route path='/login' element={
            <AnimatedRoute>
              <LoginPage/>
            </AnimatedRoute>
          }
          />
          <Route path='/login' element={
            <AnimatedRoute>
              <LoginPage/>
            </AnimatedRoute>
          }
          />
        {/* Protected Routes */}
        <Route
          path="/reservation"
          element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
