import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormStyles.css';
import SessionManager from '../../../../services/SessionManager';

function LoginForm(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = "customer";
  const session = SessionManager.getInstance();


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'customer') {

          try {
            const userIdResponse = await axios.get(`http://localhost:8080/user/getByUsername`, {
              params: { username }
            });

            // Store user ID in session
            session.setUserId(userIdResponse.data);
            session.setUser(data);
            session.setIsLoggedIn(true);
            navigate('/');
          } catch (error) {
            console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
            setError('Failed to fetch user ID.');
          }
        } else {
          setError('Access denied: You do not have the required permissions.');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Form onSubmit={(e) => {
      e.preventDefault(); 
      handleLogin(); 
    }}>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {error && <p className="error-message">{error}</p>}

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Text className="text-muted">
          Don’t have an account? 
          <Link to="/signup">Sign Up</Link>
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;