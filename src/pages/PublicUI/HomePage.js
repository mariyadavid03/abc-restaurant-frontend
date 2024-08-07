import React from 'react';
import Header from '../../components/Header/PublicHeader/Header';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '../../components/Slider/Slider';
import Grid from '../../components/Gallery/Grid';
import QueryForm from '../../components/ContactUs/QueryForm';



function HomePage(){
    return(
        <div className='home-page'>
            <Header/>
            <div className='main-title-container'>
                <img src={require('../../assets/images/homepage-main-image.jpg')} alt='Main Title' className='title-bg-image'></img>
                <div className='main-title'>
                    <img src={require('../../assets/images/abc-restaurant-logo-white-transparent.png')} alt='Title' className='title-image'></img>
                    <p>Elevating culinary standards with exquisite flavors and unparalleled service</p>
                    <div className='main-title-btn'>
                        <button type='button'>Reserve Now</button>
                        <button type='button'>Order Now</button>
                    </div>
                </div>
                
            </div>
            <div className='offer-section'>
                <Slider/>

            </div>

            {/* Add Menu */}


            <div className='about-us-section'>
                <h1><center>About Us</center></h1>
                <div className='about-us-container'>
                    <div className='about-us-text'>
                        <h2>Our Roots</h2>
                        <p className='about-us-desc'>
                            Founded in 2018, ABC Restaurant has grown from a small family-owned eatery to one 
                            of Sri Lanka's most beloved dining destinations. Our journey began with a passion 
                            for authentic cuisine and a commitment to quality, and these principles continue to 
                            guide us today.
                        </p>
                    </div>
                    <div className='about-us-img'>
                        <img src={require('../../assets/images/about-us-root.jpg')} alt='About Us' />
                    </div>
                </div>
                <br/><br/>

                <div className='about-us-container'>
                    <div className='about-us-img'>
                        <img src={require('../../assets/images/about-us-root.jpg')} alt='Community' className='about-us-img-2' />
                    </div>
                    <div className='about-us-text'>
                        <h2>Community Engagement</h2>
                        <p className='about-us-desc'>
                            We are proud to be an active member of the community, regularly participating in local 
                            events and supporting charitable causes. Our commitment to sustainability and eco-friendly 
                            practices reflects our respect for the environment and the community we serve.
                        </p>
                    </div>
                </div>
      
            </div>
            <div className='we-offer-section'>
                <h1><center>We Offer</center></h1>
                <div className='we-offer-container'>
                    <div className='we-section'>
                        <img src={require('../../assets/images/delivery.png')} alt='delivery'></img>
                        <h4>Delivery</h4>
                    </div>
                    <div className='we-section'>
                        <img src={require('../../assets/images/dine-in.png')} alt='dine-in'></img>
                        <h4>Dine-in</h4>
                    </div>
                    <div className='we-section'>
                        <img src={require('../../assets/images/take-away.png')} alt='Takeaway'></img>
                        <h4>Takeaway</h4>
                    </div>
                </div>
            </div>
            <div className='facilities-section'>
                <div className='facilities-conatiner'>
                    <h3>Our Facilities</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button type='button'>More Facilities</button>
                </div>
            </div>
            <div className='gallery-section'>
                <h1><center>Gallery</center></h1>
                <div className='gallery-box'>
                    <Grid/>
                </div>
                
            </div>

            <div className='reserve-section'>
                <div className='reserve-container'>
                    <div className='reserve-box'>
                        <h4>RESERVE YOUR TABLE NOW!</h4>
                        <button type='button'>RESERVE NOW</button>
                    </div>
                    <div className='reserve-box'>
                        <h4>ORDER YOUR DISH NOW!</h4>
                        <button type='button'>ORDER NOW</button>
                    </div>
                </div>
            </div>

            <div className='contact-us-section'>
                <div className='contact-us-container'>
                    <h1><center>Contact Us</center></h1>
                    <QueryForm/>
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
            
        </div>
    )
}
export default HomePage;