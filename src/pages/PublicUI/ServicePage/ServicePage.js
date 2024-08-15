import React from "react";
import './ServiceStyle.css';
import Header from "../../../components/Header/PublicHeader/Header";

function ServicePage(){
    return(
        <><Header />
        <div className="service-page">
            <div className="service-heading-container">
                <h2>Our Services</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut </p>
            </div>
             {/* Search Bar */}
             <div className="service-search-container">
                    <input type="text" placeholder="Search services..." className="service-search-input" />
                    <button className="service-search-button">Search</button>
                </div>
            <div className="service-content-conatiner">
                
                <div className="service-container">
                    <div className="service-text">
                        <h5>Service Name</h5>
                        <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut </p>
                    </div>
                    <div className="service-img">
                        <img src={require("../../../assets/images/F_Images/bar-img1.jpg")}></img>
                    </div>

                </div>

            </div>
        </div></>
    )

}
export default ServicePage;