import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../assets/images/abcshort-high-resolution-logo-transparent.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ onContactUsClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    setIsLoggedIn(user !== null);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      sessionStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleContactUsClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollToContactUs: true } });
    } else {
      onContactUsClick();
    }
  };

  return (
    <header className='header'>
      <div className='menu'>
        <img src={logo} alt="Logo" />
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/service">Services</a></li>
            <li><a onClick={handleContactUsClick}>Contact Us</a></li>
          </ul>
        </nav>
        <div className='header-btn'>
          {isLoggedIn && (
            <>
              <div className='cart'>
              <Link to="/cart">
                <img src={require('../../../assets/images/cart.png')} alt='Cart'></img>
              </Link>
              </div>
              <button type='button' onClick={handleLogout}>Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <button type='button' onClick={handleLogin}>Login</button>
          )}
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {isOpen && (
          <div className='dropdown-menu'>
            <a href='/'>Home</a>
            <a href='/about'>About</a>
            <a href='/menu'>Menu</a>
            <a href='/service'>Services</a>
            <a onClick={handleContactUsClick}>Contact Us</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;