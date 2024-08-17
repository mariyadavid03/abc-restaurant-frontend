
import React from 'react';
import HomePage from './pages/PublicUI/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/PublicUI/LoginPage/LoginPage';
import SignupPage from './pages/PublicUI/LoginPage/SignupPage';
import ReservationPage from './pages/PublicUI/ReservationPage/ReservationPage';
import AboutUsPage from './pages/PublicUI/AboutPage/AboutUsPage';
import MenuPage from './pages/PublicUI/MenuPage/MenuPage';
import ServicePage from './pages/PublicUI/ServicePage/ServicePage';
import CartPage from './pages/PublicUI/CartPage/CartPage';
import CheckPage from './pages/PublicUI/CheckoutPage/CheckPage';
import StaffDashboard from './pages/StaffUI/StaffDashboard';
import ManageReservation from './pages/StaffUI/ManageReservation';

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <ReservationPage/> */}
      {/* <AboutUsPage/> */}
      {/* <MenuPage/> */}
      {/* <ServicePage/> */}
      {/* <CartPage/> */}
      {/* <CheckPage/> */}
      {/* <StaffDashboard/> */}
      <ManageReservation/>
    </div>
  );
}

export default App;
