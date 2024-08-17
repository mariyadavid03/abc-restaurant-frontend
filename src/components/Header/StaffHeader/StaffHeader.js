import React, { useState } from 'react';
import './HeaderStyle.css'; 

function StaffHeader(){
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
        </ul>
        <h6>Logout</h6>
      </div>
    </div>
  );
};

export default StaffHeader;