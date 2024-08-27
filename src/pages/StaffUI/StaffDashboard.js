import React, { useState, useEffect } from 'react';
import StaffHeader from '../../components/Header/StaffHeader/StaffHeader';
import './DashboardStyle.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SessionManager from '../../services/SessionManager';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

const StaffDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const session = SessionManager.getInstance();

    useEffect(() => {
        const fetchUsername = async () => {
          try {
            const userId = session.getUserId();
            const response = await axios.get(`http://localhost:8080/user/${userId}`);
            setUsername(response.data.username);
            setName(response.data.name);
          } catch (error) {
            console.error('Error fetching username:', error);
          }
        };
    
        fetchUsername();
      }, []);
    


    return(
        <>
        <div className='dashboard'>
            <StaffHeader />
            <div className='main-content'>
                <div className='user-info-col'>
                    <img src={require('../../assets/images/user-icon.png')}/>
                    <h6>{username || 'User'}</h6>
                </div>
                <div className='welcome-msg'>
                    <div className='welcome-text'>
                        <h6>Good Day {name}!</h6>
                        <p>Today is {getDate()}</p>
                    </div>
                    <img src={require('../../assets/images/staff-welcome-img.png')}/>
                </div>
                <div className='dashboard-content'>
                    <div className='box-grid'>
                        <Link to="/manage/reservation"><div className='box'>Manage Reservations</div></Link>
                        <Link to="/manage/query"><div className='box'>Respond Queries</div></Link>
                        <Link to="/manage/payment"><div className='box'>View Payments</div></Link>
                        <Link to="/manage/menu"><div className='box'>Manage Menu</div></Link>
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