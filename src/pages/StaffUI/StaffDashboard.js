import React from 'react';
import StaffHeader from '../../components/Header/StaffHeader/StaffHeader';
import './DashboardStyle.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const StaffDashboard = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      navigate('/login');
    };
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
                        <h6>Good Day Staff!</h6>
                        <p>Today is {getDate()}</p>
                    </div>
                    <img src={require('../../assets/images/staff-welcome-img.png')}/>
                </div>
                <div className='dashboard-content'>
                    <div className='box-grid'>
                    <Link to="/admin/reservation"><div className='box'>Manage Reservations</div></Link>
                        <Link to="/admin/query"><div className='box'>Respond Queries</div></Link>
                        <Link to="/admin/payment"><div className='box'>View Payments</div></Link>
                        <Link to="/admin/menu"><div className='box'>Manage Menu</div></Link>
                    </div>
                    <br/>
                    <Link to="/">
                    <label className='links'>
                        
                        <h6>Customer Website       {'\u00A0'}       
                        <img src={require('../../assets/images/external-link.png')} alt='external link' className='external-link-icon'/>
                        </h6>

                    </label>
                    </Link>

                </div>
            </div>
            
        </div></>

    );
}
export default StaffDashboard;