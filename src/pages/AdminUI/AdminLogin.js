import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPageStyle.css';
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = "admin";

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
        if (data.role === 'admin') {
          try {
            const userIdResponse = await axios.get(`http://localhost:8080/user/getByUsername`, {
              params: { username }
            });
            sessionStorage.setItem('userId', userIdResponse.data);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('user', JSON.stringify(data));
            sessionStorage.setItem('isLoggedIn', 'true');
            navigate('/admin/dashboard');
            
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
        <img src={require('../../assets/images/admin-login.png')} alt="Admin Login" />
        <div className="login-form">
          <h2>Admin Login</h2>
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

export default AdminLogin;