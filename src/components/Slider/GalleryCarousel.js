import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GalleryCarousel.css';

function GalleryCarousel() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/gallery');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching gallery images:', error);
            }
        };
        fetchImages();
    }, []);

    const carouselItems = () => {
        let items = [];
        for (let i = 0; i < images.length; i += 3) {
            items.push(
                <Carousel.Item key={i}>
                    <div className="carousel-container">
                        <div className="carousel-row">
                            {images.slice(i, i + 3).map((item) => (
                                <img 
                                    key={item.id} 
                                    className="carousel-image" 
                                    src={`data:image/jpeg;base64,${item.image_data}`} 
                                    alt={item.image_name} 
                                />
                            ))}
                        </div>
                    </div>
                </Carousel.Item>
            );
        }
        return items;
    };

    return (
        <Carousel className="gallery-carousel" interval={null} controls={true} indicators={true}>
            {carouselItems()}
        </Carousel>
    );
}

export default GalleryCarousel;
