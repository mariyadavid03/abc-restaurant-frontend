import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../../../components/Login/Signup/Public/SignUpForm";
import './Page.css';

function SignupPage() {
    return (
        <div className="login-page">
            <Link to="/login">
                <img src={require("../../../assets/images/arrow.png")} alt="Back Arrow" className="back-arrow-img" />
            </Link>
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-form">
                        <h3>Signup</h3>
                        <SignUpForm/>
                    </div>
                </div>
                <div className="login-img-container">
                    <img src={require("../../../assets/images/imgage.jpg")} alt="Login" />
                </div>
            </div>
        </div>
    );
}

export default SignupPage;