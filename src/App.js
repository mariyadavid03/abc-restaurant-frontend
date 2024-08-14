
import React from 'react';
import HomePage from './pages/PublicUI/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/PublicUI/LoginPage/LoginPage';
import SignupPage from './pages/PublicUI/LoginPage/SignupPage';
import ReservationPage from './pages/PublicUI/ReservationPage/ReservationPage';
import AboutUsPage from './pages/PublicUI/AboutPage/AboutUsPage';
import MenuPage from './pages/PublicUI/MenuPage/MenuPage';
import ServicePage from './pages/PublicUI/ServicePage/ServicePage';

function App() {
  return (
    <div className="App">
      {/* <HomePage/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <ReservationPage/> */}
      {/* <AboutUsPage/> */}
      {/* <MenuPage/> */}
      <ServicePage/>
    </div>
  );
}

export default App;
