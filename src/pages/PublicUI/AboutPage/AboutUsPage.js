import React from "react";
import './AboutUsStyle.css';
import Header from "../../../components/Header/PublicHeader/Header";
import Footer from "../../../components/Footer/PublicFooter/Footer";

function AboutUsPage() {
    return (
        <>
            <Header />
            <div className="about-us-page">

                <div className="service-heading-container">
                    <h2>About Us</h2>
                    <p>ABC Restaurant offers a unique dining experience that combines the rich flavors of Sri Lanka with the elegance of Western cuisine. </p>
                </div>
                
                <section className="our-story-section">
                    <div className="our-story-image">
                        <img src={require("../../../assets/images/our-story.jpg")} alt="Our Story" />
                    </div>
                    <div className="our-story-text">
                        <h2>Our Story</h2>
                        <p> Established in 2010, our restaurant began with humble beginnings in the heart of Sri Lanka. 
                            Over the years, we have grown and evolved, bringing together the rich flavors of Sri Lankan 
                            cuisine with the sophistication of Western fine dining. Our goal has always been to offer a 
                            unique culinary experience that blends tradition and innovation, creating unforgettable meals 
                            for our guests.</p>
                    </div>
                </section>

                <section className="our-values-section">
                    <h2>Our Values</h2>
                    <div className="values-container">
                        <div className="value-item">
                            <h3>Quality</h3>
                            <img src={require("../../../assets/images/quality.png")} alt="Our Story" />
                            <p>We prioritize excellence in everything we do, from sourcing ingredients to delivering the final dish.</p>
                            
                        </div>
                        <div className="value-item">
                            <h3>Community</h3>
                            <img src={require("../../../assets/images/community.png")} alt="Our Story" />
                            <p>We believe in giving back to the community that has supported us throughout our journey.</p>
                        </div>
                        <div className="value-item">
                            <h3>Innovation</h3>
                            <img src={require("../../../assets/images/innovation.png")} alt="Our Story" />
                            <p>We constantly seek out new ways to surprise and delight our customers with unique culinary experiences.</p>
                        </div>
                    </div>
                </section>

                <section className="our-team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-container">
                            <img src={require("../../../assets/images/staff.jpg")} alt="Chef 1" />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default AboutUsPage;