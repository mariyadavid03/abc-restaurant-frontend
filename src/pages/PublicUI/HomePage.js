import React, { useRef } from 'react';
import Header from '../../components/Header/PublicHeader/Header';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../../components/Slider/Slider';
import Grid from '../../components/Gallery/Grid';
import QueryForm from '../../components/ContactUs/QueryForm';
import Footer from '../../components/Footer/PublicFooter/Footer';
import mainTitleImage from '../../assets/images/homepage-title-img-new.jpg';
import titleLogo from '../../assets/images/abc-restaurant-logo-white-transparent.png';
import ScrollToTopButton from '../../components/ScrollToTop/ScrollToTopButton';
import { Link } from 'react-router-dom';

function HomePage(){
    const contactUsRef = useRef(null);

    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <div className='home-page'>
            <Header onContactUsClick={scrollToContactUs} />
            <div className='main-title-container'>
                <img src={mainTitleImage} alt='Main Title' className='title-bg-image' />
                <div className='main-title'>
                    <img src={titleLogo} alt='Title' className='title-image' />
                    <p>Elevating culinary standards with exquisite flavors and unparalleled service</p>
                    <div className='main-title-btn'>
                    <Link to="/reservation">
                        <button type='button'>Reserve Now</button>
                    </Link>
                    <Link to="/cart">
                        <button type='button'>Order Now</button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className='offer-section'>
                <Slider/>

            </div>

            <div className='menu-section-updated'>
                <div className='menu-img-updated'>
                    <img src={require('../../assets/images/menu-section-image.jpg')} alt='Menu' />
                </div>
                <div className='menu-text-updated'>
                    <h2 className='menu-heading-updated'>Our Specials</h2>
                    <div className='menu-text-content-updated'>     
                        <div className='menu-item-name-updated'>
                            <h5 className='menu-item-updated'>Special Menu Item 1</h5>
                            <p className='menu-item-desc-updated'>small desc about item</p>

                            <h5 className='menu-item-updated'>Special Menu Item 2</h5>
                            <p className='menu-item-desc-updated'>small desc about item</p>

                            <h5 className='menu-item-updated'>Special Menu Item 3</h5>
                            <p className='menu-item-desc-updated'>small desc about item</p>

                            <h5 className='menu-item-updated'>Special Menu Item 4</h5>
                            <p className='menu-item-desc-updated'>small desc about item</p>

                            <h5 className='menu-item-updated'>Special Menu Item 5</h5>
                            <p className='menu-item-desc-updated'>small desc about item</p>
                        </div>
                        <div className='menu-item-price-updated'>
                            <h5 className='item-price-updated'>Rs. 1000</h5>
                            <h5 className='item-price-updated'>Rs. 1000</h5>
                            <h5 className='item-price-updated'>Rs. 1000</h5>
                            <h5 className='item-price-updated'>Rs. 1000</h5>
                            <h5 className='item-price-updated'>Rs. 1000</h5>
                        </div>
                    </div>
                    <Link to="/menu">
                        <button type='button' className='view-menu-btn-updated'>View Menu</button>
                    </Link>
                </div>
            </div>


            <div className='about-us-section'>
                <div className='about-us-container'>
                    <img src={require('../../assets/images/about-us-img-1.jpg')} alt='About Us 1' />
                </div>

                <div className='about-us-container-img'>
                    <h1><center>About Us</center></h1>
                    <h4>Discover Our story</h4>
                    <p>At ABC Restaurant, we're more than just a place to dine— we're a journey into culinary excellence. <br/>
                        Explore our rich heritage, meet our talented chefs, and find out what makes us stand out in the culinary world.
                    </p>
                    <Link to="/about">
                        <button type='button'>Learn More</button>
                    </Link>
                </div>

                <div className='about-us-container'>
                    <img src={require('../../assets/images/about-us-root.jpg')} alt='About Us 2' />
                </div>
                
      
            </div>
          
            <div className='facilities-section'>
                <div className='facilities-conatiner'>
                    <h3>Our Facilities</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <Link to="/service">
                        <button type='button'>More Facilities</button>
                    </Link>
                </div>
                <div className='facilities-img'>
                    <img src={require('../../assets/images/facilities-banner.jpg')}></img>
                </div>
            </div>
            <div className='gallery-section'>
                <h1><center>Gallery</center></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua</p>
                <div className='gallery-box'>
                    <Grid/>
                </div>
                
            </div>

            <div className='reserve-section'>
                <div className='reserve-container'>
                <div className='reserve-box' style={{ borderRight: '1px solid var(--yellow)', paddingRight: '9%' }}>
                        <h4>RESERVE YOUR TABLE NOW!</h4>
                        <Link to="/reservation">
                            <button type='button'>RESERVE NOW</button>
                        </Link>
                    </div>
                    <div className='reserve-box'>
                    
                        <h4>ORDER YOUR DISH NOW!</h4>
                        <Link to="/cart">
                            <button type='button'>ORDER NOW</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='contact-us-section' ref={contactUsRef}>
                <div className='contact-us-container'>
                    <div className='contact-us-img'>
                        <img src={require('../../assets/images/contact-us-banner.jpg')}></img>
                    </div>
                    <div className='contact-us-form-section'>
                        <h1><center>Contact Us</center></h1>
                        <QueryForm/>
                    </div>   
                </div>               
            </div>

            <div className='location-section'>
                <h1><center>Our Places</center></h1>
                <div className='location-container'>
                    <div className='map-box'>
                        <iframe src="https://www.google.com/maps/d/u/5/embed?mid=1YKztDLjVj8rbTFs2szC_KkpfpReI8uU&ehbc=2E312F&noprof=1" 
                        width="640" height="480" className='location-map'></iframe>
                    </div>
                    <div className='location-text'>
                        <h5>Location 1</h5>
                        <p>Location, address, city</p>

                        <h5>Location 2</h5>
                        <p>Location, address, city</p>

                        <h5>Location 3</h5>
                        <p>Location, address, city</p>

                        <h5>Location 4</h5>
                        <p>Location, address, city</p>

                        <h5>Location 5</h5>
                        <p>Location, address, city</p>
                    </div>
                </div>
            
            </div>

            <div className='contact-details'>
                <div className='detail-box'>
                    <img src={require('../../assets/images/mobile-icon.png')} alt='Mobile'></img>
                    <h5>+94 764 7764</h5>
                </div>
                <div className='detail-box'>
                    <img src={require('../../assets/images/mail-icon.png')} alt='Email'></img>
                    <h5>abcrestaurant@gmail.com</h5>
                </div>
                <ScrollToTopButton/>
            </div>
            <Footer/>
            
        </div>
    )
}
export default HomePage;