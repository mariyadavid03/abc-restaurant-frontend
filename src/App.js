import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomePage from './pages/PublicUI/HomePage';
import AdminLogin from './pages/AdminUI/AdminLogin';
import StaffLogin from './pages/StaffUI/StaffLogin';
import StaffDashboard from './pages/StaffUI/StaffDashboard';
import AdminDashboard from './pages/AdminUI/AdminDashboard';
import LoginPage from './pages/PublicUI/LoginPage/LoginPage';
import SignupPage from './pages/PublicUI/LoginPage/SignupPage';
import AboutUsPage from './pages/PublicUI/AboutPage/AboutUsPage';
import MenuPage from './pages/PublicUI/MenuPage/MenuPage';
import FacilitiesPage from './pages/PublicUI/FacilitiesPage/FacilitiesPage';
import ReservationPage from './pages/PublicUI/ReservationPage/ReservationPage';
import CartPage from './pages/PublicUI/CartPage/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import AnimatedRoute from './components/AnimatedRoute';
import ManageReservation from './pages/StaffUI/ManageReservation';
import ManageQuery from './pages/StaffUI/ManageQuery';
import ManagePayment from './pages/StaffUI/ManagePayment';
import ManageAccount from './pages/AdminUI/ManageAccount';
import ManageGallery from './pages/AdminUI/ManageGallery';
import ManageService from './pages/AdminUI/ManageService';
import ManageOffer from './pages/AdminUI/ManageOffer';
import ReportPage from './pages/AdminUI/ReportPage';
import ManageMenu from './pages/StaffUI/ManageMenu';
import CheckPage from './pages/PublicUI/CheckoutPage/CheckPage';
import DineinReservationReport from './pages/AdminUI/Reports/DineinReservationReport';
import DeliveryReport from './pages/AdminUI/Reports/DeliveryReport';
import PaymentReport from './pages/AdminUI/Reports/PaymentReport';
import QueryReport from './pages/AdminUI/Reports/QueryReport';
import StaffProtectedRoute from './components/StaffProtectedRoute';
import ProfilePage from './pages/PublicUI/Profile/ProfilePage';
import ManageDelivery from './pages/StaffUI/ManageDelivery';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<HomePage/>}/>
        <Route path="/about" element={<AboutUsPage/>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/staff' element={<StaffLogin/>}/>
        
       {/* Customer Protected Routes */}
        <Route path="/reservation" element={<ProtectedRoute><ReservationPage /></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>}/>
        <Route path="/cart/payment" element={<ProtectedRoute><CheckPage /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>

        {/* Staff Protected Routes */}
        <Route path="/staff/dashboard" element={<StaffProtectedRoute><StaffDashboard /></StaffProtectedRoute>} />
        <Route path="/admin/dashboard" element={<StaffProtectedRoute><AdminDashboard /></StaffProtectedRoute>} />
        <Route path="/manage/reservation" element={<StaffProtectedRoute><ManageReservation /></StaffProtectedRoute>} />
        <Route path='/admin/account' element={<StaffProtectedRoute><ManageAccount /></StaffProtectedRoute>} />
        <Route path="/manage/delivery" element={<StaffProtectedRoute><ManageDelivery /></StaffProtectedRoute>} />
        <Route path="/manage/query" element={<StaffProtectedRoute><ManageQuery /></StaffProtectedRoute>} />
        <Route path="/manage/payment" element={<StaffProtectedRoute><ManagePayment /></StaffProtectedRoute>} />
        <Route path="/manage/menu" element={<StaffProtectedRoute><ManageMenu /></StaffProtectedRoute>} />
        <Route path="/manage/account" element={<StaffProtectedRoute><ManageAccount /></StaffProtectedRoute>} />
        <Route path="/manage/gallery" element={<StaffProtectedRoute><ManageGallery /></StaffProtectedRoute>} />
        <Route path="/manage/facility" element={<StaffProtectedRoute><ManageService /></StaffProtectedRoute>} />
        <Route path="/manage/offer" element={<StaffProtectedRoute><ManageOffer /></StaffProtectedRoute>} />
        <Route path="/manage/report" element={<StaffProtectedRoute><ReportPage /></StaffProtectedRoute>} />
        <Route path="/report-display/reservation" element={<StaffProtectedRoute><DineinReservationReport /></StaffProtectedRoute>} />
        <Route path="/report-display/delivery" element={<StaffProtectedRoute><DeliveryReport /></StaffProtectedRoute>} />
        <Route path="/report-display/payment" element={<StaffProtectedRoute><PaymentReport /></StaffProtectedRoute>} />
        <Route path="/report-display/query" element={<StaffProtectedRoute><QueryReport /></StaffProtectedRoute>} />

        {/* Animated Routes */}
        <Route path='/login' element={<AnimatedRoute><LoginPage/></AnimatedRoute>}/>
        <Route path='/signup' element={<AnimatedRoute><SignupPage/></AnimatedRoute>}/>
        
      </Routes>
       
          
    </Router>
  );
}

export default App;
