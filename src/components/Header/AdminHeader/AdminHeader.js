import React, { useState } from 'react';
import '../StaffHeader/HeaderStyle.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function AdminHeader(){
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      navigate('/admin');
    }
  };

  return (
    <div>
      <div className='side-nav'>
        <img src={require('../../../assets/images/logo.png')}/>
        <ul>
          <li><a href="/admin/dashboard">Home</a></li>
          <li><a href="/admin/reservation">Reservations</a></li>
          <li><a href="/admin/query">Queries</a></li>
          <li><a href="/admin/payment">Payment</a></li>
          <li><a href="/admin/menu">Menu</a></li>
          <li><a href="/admin/account">Accounts</a></li>
          <li><a href="/admin/service">Services</a></li>
          <li><a href="/admin/gallery">Gallery</a></li>
          <li><a href="/admin/offer">Offers</a></li>
          <li><a href="/admin/report">Reports</a></li>
        </ul>
        <h6 onClick={handleLogout}>Logout</h6>
      </div>
    </div>
  );
};

export default AdminHeader;