import React from "react";
import LoginForm from "../../../components/Login/Signup/Public/LoginForm";
import './Page.css';
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="login-page">
           <Link to='/'>
                <img src={require("../../../assets/images/arrow.png")} alt="Back Arrow" className="back-arrow-img" />
            </Link>
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-formm">
                        <h3>Welcome Back!</h3>
                        <LoginForm/>
                    </div>
                </div>
                <div className="login-img-container">
                    <img src={require("../../../assets/images/for-gourmets.jpg")} alt="Login" />
                </div>
            </div>
        </div>
    );
}

export default LoginPage;