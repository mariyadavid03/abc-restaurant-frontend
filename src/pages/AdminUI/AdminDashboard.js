import React from 'react';
import AdminHeader from '../../components/Header/AdminHeader/AdminHeader';
import '../StaffUI/DashboardStyle.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  function AdminDashboard(){
    const navigate = useNavigate();
  
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
          navigate('/admin');
        }
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
                        <Link to="/admin/reservation"><div className='box'>Manage Reservations</div></Link>
                        <Link to="/admin/query"><div className='box'>Respond Queries</div></Link>
                        <Link to="/admin/payment"><div className='box'>View Payments</div></Link>
                        <Link to="/admin/menu"><div className='box'>Manage Menu</div></Link>
                        <Link to="/admin/account"><div className='box'>Manage Accounts</div></Link>
                        <Link to="/admin/gallery"><div className='box'>Manage Gallery</div></Link>
                        <Link to="/admin/service"><div className='box'>Manage Services</div></Link>
                        <Link to="/admin/offer"><div className='box'>Manage Offers</div></Link>
                        <Link to="/admin/report"><div className='box'>Reports</div></Link>
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
export default AdminDashboard;