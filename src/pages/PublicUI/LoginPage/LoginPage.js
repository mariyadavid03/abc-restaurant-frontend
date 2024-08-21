import React, { useState } from "react";
import LoginForm from "../../../components/Login/Signup/Public/LoginForm";
import './Page.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="login-page">
            <img src={require("../../../assets/images/arrow.png")} alt="Back Arrow" className="back-arrow-img" />
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-form">
                        <h3>Welcome Back!</h3>
                        <LoginForm
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