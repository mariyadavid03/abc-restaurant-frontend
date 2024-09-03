import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../../../assets/images/abcshort-high-resolution-logo-transparent.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SessionManager from '../../../services/SessionManager';

function Header({ onContactUsClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();
  const session = SessionManager.getInstance();

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    const user = session.getUser();
    setIsLoggedIn(user !== null);

    // Check cart items in session storage
    const cartItems = session.getCartItems();
    setCartItemsCount(cartItems.length);
  }, [session]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      session.clearCart();
      session.clearAll();
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
    <header className='header-main'>
      <div className='menu'>
        <img src={logo} alt="Logo" />
        <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>
          <li><button onClick={handleContactUsClick} className="link-button">Contact Us</button></li>
        </ul>
        </nav>
        <div className='header-btn'>
          {isLoggedIn && (
            <>
              <div className='cart'>
                <Link to="/profile">
                  <img src={require('../../../assets/images/customer-user.png')} alt='User Profile' />
                </Link>
                <Link to="/cart">
                  <img src={require('../../../assets/images/cart.png')} alt='Cart' />
                  {cartItemsCount > 0 && (
                    <span className="badge">{cartItemsCount}</span>
                  )}
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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/facilities">Facilities</Link>
          <button onClick={handleContactUsClick} className="link-button">Contact Us</button>
        </div>
        )}
      </div>
    </header>
  );
}

export default Header;
