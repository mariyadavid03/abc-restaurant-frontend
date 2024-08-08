import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import SampleImage from '../../assets/images/sample.jpg';
import './Slider.css';

function Slider() {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={SampleImage}
              alt="First slide"
            />
          </div>
          <div className="carousel-text">
            <h3>Special Offer</h3>
            <p>Enjoy a special discount on our gourmet dishes. Elevating culinary standards!</p>
            <p className='discount-rate'>Up to 20%</p>
            <p className='valid-till-date'>Valid Till August 31st</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={SampleImage}
              alt="Second slide"
            />
          </div>
          <div className="carousel-text">
            <h3>Exclusive Deal</h3>
            <p>Join us this weekend for a culinary journey like no other.</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src={SampleImage}
              alt="Third slide"
            />
          </div>
          <div className="carousel-text">
            <h3>Special Discount</h3>
            <p>Celebrate with us and enjoy a special discount on our signature dishes.</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;