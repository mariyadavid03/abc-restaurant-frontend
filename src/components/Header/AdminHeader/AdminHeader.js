import React, { useState } from 'react';
import '../StaffHeader/HeaderStyle.css'; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SessionManager from '../../../services/SessionManager';


function AdminHeader(){
  const navigate = useNavigate();
  const session = SessionManager.getInstance();
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      session.clearAll();
      navigate('/admin');
    }
  };

  return (
    <div>
      <div className='side-nav'>
        <img src={require('../../../assets/images/logo.png')}/>
        <ul>
          <li><a href="/admin/dashboard">Home</a></li>
          <li><a href="/manage/reservation">Reservations</a></li>
          <li><a href="/manage/delivery">Delivery</a></li>
          <li><a href="/manage/query">Queries</a></li>
          <li><a href="/manage/payment">Payment</a></li>
          <li><a href="/manage/menu">Menu</a></li>
          <li><a href="/manage/account">Accounts</a></li>
          <li><a href="/manage/service">Services</a></li>
          <li><a href="/manage/gallery">Gallery</a></li>
          <li><a href="/manage/offer">Offers</a></li>
          <li><a href="/manage/report">Reports</a></li>
        </ul>
        <h6 onClick={handleLogout}>Logout</h6>
      </div>
    </div>
  );
};

export default AdminHeader;