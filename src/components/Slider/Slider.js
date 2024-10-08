import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './Slider.css';

function Slider() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetching offers from backend
    axios.get('http://localhost:8080/offer')
      .then(response => {
        setOffers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the offers!", error);
      });
  }, []);

  return (
    <Carousel className="custom-carousel" interval={5000} pause={false}>
      {offers.map((offer, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-content">
            <div className="carousel-text">
              <h3>{offer.offer_name}</h3>
              <p>{offer.offer_desc}</p>
              <p className="discount-rate">{` ${offer.discount} OFF`}</p>
              <p className="valid-till-date">{`Valid Till ${offer.valid_period}`}</p>
            </div>
            <div className="carousel-image-1">
              <img
                className="d-block w-100"
                src={`data:image/jpeg;base64,${offer.offer_image_data}`}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
