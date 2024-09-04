import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../AdminUI/LoginPageStyle.css'; 
import axios from 'axios';
import SessionManager from '../../services/SessionManager';

function StaffLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = "staff";
  const session = SessionManager.getInstance();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role}), 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'staff') {
            try {
              const userIdResponse = await axios.get(`http://localhost:8080/user/getByUsername`, {
                params: { username }
              });
              // Setting session user data
              session.setUserId(userIdResponse.data);
              session.setRole(role);
              session.setUser(data);
              session.setIsLoggedIn(true);
              navigate('/staff/dashboard');
              
            } catch (error) {
              console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
              setError('Failed to fetch user ID.');
            }
        } else {
          setError('Access denied: You do not have the required permissions.');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <img src={require('../../assets/images/staff-login.png')} alt="Staff Login" />
        <div className="login-form">
          <h2>Staff Login</h2>
          {error && <p className="error-message">{error}</p>}
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;