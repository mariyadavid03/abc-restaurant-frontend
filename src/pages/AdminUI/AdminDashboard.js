import React from 'react';
import AdminHeader from '../../components/Header/AdminHeader/AdminHeader';
import '../StaffUI/DashboardStyle.css';
import { useNavigate } from 'react-router-dom';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  const AdminDashboard = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      navigate('/login');
    };
    return(
        <>
        <div className='dashboard'>
            <AdminHeader />
            <div className='main-content'>
                <div className='user-info-col'>
                    <img src={require('../../assets/images/user-icon.png')}/>
                    <h6>User Name</h6>
                </div>
                <div className='welcome-msg'>
                    <div className='welcome-text'>
                        <h6>Good Day Admin!</h6>
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
                        <div className='box'>Manage Accounts</div>
                        <div className='box'>Manage Gallery</div>
                        <div className='box'>Manage Facilities</div>
                        <div className='box'>Manage Offers</div>
                        <div className='box'>Reports</div>
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
export default AdminDashboard;