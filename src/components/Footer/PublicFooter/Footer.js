import React, { useState, useEffect } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>General Contact</h3>
        <p>+94 764 7764</p>
        <p>+94 875 47382</p>
        <br/>
        <p>abcresturant@gmail.com</p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <div className="quick-links">
          <ul>
            <Link to="/"><li><a>Home</a></li></Link>
            <Link to="/menu"><li><a >Menu</a></li></Link>
            <Link to="/reservation"><li><a >Reserve</a></li></Link>
            
          </ul>
          <ul>
          <Link to="/about"><li><a>About Us</a></li></Link>
          <Link to="/service"><li><a >Services</a></li></Link>
          </ul>
        </div>
      </div>
      <div className="footer-section">
        <h3>Open Hours</h3>
        <p>Monday - Friday <br/>11:00AM - 10:00PM</p>
        <p>Weekends <br/>10:00 AM - 11:30 PM</p>
        <p>Closed on Bank Holidays</p>
      </div>
    </footer>
  );
};

export default Footer;