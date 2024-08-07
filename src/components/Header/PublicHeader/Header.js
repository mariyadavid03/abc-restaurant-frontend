import React from 'react';
import './Header.css';
import logo from '../../../assets/images/abcshort-high-resolution-logo-transparent.png';

function Header() {
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
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          
        </nav>
        <div className="search-box">
            <input type="text" placeholder="Search..." />
        </div>
        <div className='header-btn'>
            <button type='button'>Login</button>
        </div>
      </div>
    </header>
  );
}

export default Header;