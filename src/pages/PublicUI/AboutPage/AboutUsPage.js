import React from "react";
import'./AboutUsStyle.css';
import Header from "../../../components/Header/PublicHeader/Header";

function AboutUsPage(){
    return(
        <><Header />
        <div className="about-us-page">
            <h2>About Us</h2>
            <div className="about-us-container">
                <div className="about-us-section1">
                    <img src={require("../../../assets/images/delicious-asian-noodles-concept.jpg")}></img>
                </div>
                <div className="about-us-section2">
                    <h5>Our Story</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>
            </div>
        </div></>
    )

}
export default AboutUsPage;