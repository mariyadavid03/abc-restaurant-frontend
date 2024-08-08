import React from 'react';
import './Footer.css';

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
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reserve">Reserve</a></li>
          </ul>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
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