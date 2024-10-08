import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ServiceStyle.css';
import Header from "../../../components/Header/PublicHeader/Header";

function FacilitiesPage() {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const contactUsRef = useRef(null);

    // Fetching facilities data
    useEffect(() => {
        axios.get('http://localhost:8080/service') 
            .then(response => {
                setServices(response.data);
                setFilteredServices(response.data); 
            })
            .catch(error => {
                console.error("There was an error fetching the services!", error);
            });
    }, []);

    // Searching logic
    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);
        const filtered = services.filter(service =>
            service.service_name.toLowerCase().includes(query)
        );
        setFilteredServices(filtered);
    };

    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header onContactUsClick={scrollToContactUs} />
            <div className="service-page">
                <div className="service-heading-container">
                    <h2>Our Facilities</h2>
                </div>
                
                {/* Search Bar */}
                <div className="service-search-container">
                    <input
                        type="text"
                        placeholder="Search facilities..."
                        className="service-search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="service-content-container">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service, index) => (
                            <div key={index} className="service-container">
                                <div className="service-text">
                                    <h5>{service.service_name}</h5>
                                    <br/>
                                    <p>{service.service_desc}</p>
                                </div>
                                <div className="service-img">
                                    <img src={`data:image/jpeg;base64,${service.service_image_data}`} alt={service.service_name} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-services-message">No such facility found</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default FacilitiesPage;