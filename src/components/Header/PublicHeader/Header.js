import React, { useState } from 'react';
import './Header.css';
import logo from '../../../assets/images/abcshort-high-resolution-logo-transparent.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
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
            <li><a href="/contact">Contact Us</a></li>
          </ul>
          
        </nav>
        <div className="search-box">
            <input type="text" placeholder="Search..." />
        </div>
        <div className='header-btn'>
          <div className='cart'>
            <img src={require('../../../assets/images/cart.png')} alt='Cart'></img>
          </div>  
          <button type='button'>Login</button>
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
            <a href='/contact'>Contact Us</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;