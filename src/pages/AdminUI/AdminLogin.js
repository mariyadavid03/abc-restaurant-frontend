import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPageStyle.css'; // Updated CSS styles

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Admin login:', { username, password });
    navigate('/admin/dashboard'); // Redirect to Admin Dashboard on successful login
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <img src={require('../../assets/images/admin-login.png')} alt="Admin Login" />
        <div className="login-form">
          <h2>Admin Login</h2>
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