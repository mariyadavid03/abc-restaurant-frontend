import React, { useState } from "react";
import LoginForm from "../../../components/Login/Signup/Public/LoginForm";
import './Page.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role: 'customer' }), 
            });

            if (response.ok) {
                const data = await response.json();
                if (data.role === 'customer') {
                    navigate('/');
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
        <div className="login-page">
            <img src={require("../../../assets/images/arrow.png")} alt="Back Arrow" className="back-arrow-img" />
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-form">
                        <h3>Welcome Back!</h3>
                        {error && <p className="error-message">{error}</p>}
                        <LoginForm
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                        />
                    </div>
                </div>
                <div className="login-img-container">
                    <img src={require("../../../assets/images/imgage.jpg")} alt="Login" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;