import React, { useRef, useEffect, useState } from 'react';
import Header from '../../components/Header/PublicHeader/Header';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../../components/Slider/Slider';
import GalleryCarousel from '../../components/Slider/GalleryCarousel';
import QueryForm from '../../components/ContactUs/QueryForm';
import Footer from '../../components/Footer/PublicFooter/Footer';
import mainTitleImage from '../../assets/images/homepage-main.png';
import titleLogo from '../../assets/images/abc-restaurant-logo-white-transparent.png';
import ScrollToTopButton from '../../components/ScrollToTop/ScrollToTopButton';
import { Link } from 'react-router-dom';
import axios from "axios";


function HomePage(){
    const [mainDishes, setMainDishes] = useState([]);
    const contactUsRef = useRef(null);

    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchMain = async () => {
            try {
                const response = await axios.get('http://localhost:8080/menu/type/main');
                setMainDishes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchMain();
    }, []);

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
                    <img src={require('../../assets/images/imgage.jpg')} alt='Menu' />
                </div>
                <div className='menu-text-updated'>
                    <h2 className='menu-heading-updated'>Our Main Specials</h2>
                    <div className='menu-text-content-updated'>     
                        <div className='menu-item-name-updated'>
                            {mainDishes.map((item) => (
                                <div key={item.id} className='menu-item-updated'>
                                <h5 className='menu-item-name-updated'>{item.item_name}</h5>
                                </div>
                            ))}
                        </div>
                        <div className='menu-item-price-updated'>
                            {mainDishes.map((item) => (
                                 <div key={item.id} className='item-price-updated'>
                                    <h5 className='menu-item-price-updated'>Rs. {item.price}</h5>
                                </div>
                            ))}
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
                <div className='facilities-container'>
                    <h1>Our Services</h1>
                    <p>
                    Discover a range of exceptional services crafted to enhance your dining experience. 
                    From elegant fine dining to seamless delivery options, we cater to your every need 
                    with the highest standards of excellence.
                    </p>
                    <Link to="/service">
                    <button type='button'>More Facilities</button>
                    </Link>
                </div>
                {/* <div className='facilities-img'></div> */}
            </div>
            <div className='gallery-section'>
                <h1><center>Gallery</center></h1>
                <p>Explore the vibrant essence of our restaurant through our gallery. 
                    From delectable dishes to unforgettable events, 
                    each moment is captured to give you a glimpse of our world</p>
                <div className='gallery-box'>
                    <GalleryCarousel />
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
                        <img src={require('../../assets/images/contact-us-banner.jpg')} alt='Contact Us'></img>
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
                        width="640" height="480" className='location-map' title='Map of the resturants'></iframe>
                    </div>
                    <div className='location-text'>
                        <h5>ABC Restaurant, Kandy</h5>
                        <p>23/A, Queen's Road, Kandy</p>

                        <h5>ABC Restaurant, Colombo</h5>
                        <p>543, Galle Road, Colombo 07 </p>

                        <h5>ABC Restaurant, Negambo</h5>
                        <p>21, Colombo Road, Negambo</p>

                        <h5>ABC Restaurant, Galle</h5>
                        <p>765, Mathara Road, Galle</p>

                        <h5>ABC Restaurant, Kegalle</h5>
                        <p>78/C, Colombo Road, Kegalle</p>
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