import React, { useState } from 'react';
import '../StaffHeader/HeaderStyle.css'; 

function AdminHeader(){
  return (
    <div>
      <div className='side-nav'>
        <img src={require('../../../assets/images/logo.png')}/>
        <ul>
          <li>Home</li>
          <li>Reservations</li>
          <li>Queries</li>
          <li>Payment</li>
          <li>Menu</li>
          <li>Accounts</li>
          <li>Services</li>
          <li>Gallery</li>
          <li>Offers</li>
          <li>Reports</li>
        </ul>
        <h6>Logout</h6>
      </div>
    </div>
  );
};

export default AdminHeader;