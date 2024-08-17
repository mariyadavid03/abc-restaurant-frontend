import React from 'react';
import StaffHeader from '../../components/Header/StaffHeader/StaffHeader';
import './DashboardStyle.css';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

function StaffDashboard(){
    return(
        <>
        <div className='dashboard'>
            <StaffHeader />
            <div className='main-content'>
                <div className='user-info-col'>
                    <img src={require('../../assets/images/user-icon.png')}/>
                    <h6>User Name</h6>
                </div>
                <div className='welcome-msg'>
                    <div className='welcome-text'>
                        <h6>Good Day User!</h6>
                        <p>Today is {getDate()}</p>
                    </div>
                    <img src={require('../../assets/images/staff-welcome-img.png')}/>
                </div>
                <div className='dashboard-content'>
                    <div className='box-grid'>
                        <div className='box'>Manage Reservations</div>
                        <div className='box'>Respond Queries</div>
                        <div className='box'>View Payments</div>
                        <div className='box'>Manage Menu</div>
                    </div>
                    <br/>
                    <label className='links'>
                        <h6>Customer Website       {'\u00A0'}       
                        <img src={require('../../assets/images/external-link.png')} alt='external link' className='external-link-icon'/>
                        </h6>

                    </label>

                </div>
            </div>
            
        </div></>

    );
}
export default StaffDashboard;