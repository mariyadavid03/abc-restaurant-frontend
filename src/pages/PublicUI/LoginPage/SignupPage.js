import React from "react";
import SignUpForm from "../../../components/Login/Signup/Public/SignUpForm";
import './Page.css';

function SignupPage() {
    return (
        <div className="login-page">
            <img src={require("../../../assets/images/arrow.png")} alt="Back Arrow" className="back-arrow-img" />
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