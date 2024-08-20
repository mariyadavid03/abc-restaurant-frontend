import React, { useState } from 'react';
import './PagesStyle.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DineInTable from '../../components/Reservation/DineInTable';
import DeliveryTable from '../../components/Reservation/DeliveryTable';

function ManageReservation() {
    const [key, setKey] = useState('dineIn');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        console.log('Search clicked with term:', searchTerm);
        // Add your search logic here
    };

    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back"/>

                <h2>Customer Reservations</h2>
    
                <div className="search-bar-container">
                    <input 
                        type="text" 
                        placeholder="Search reservations..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <button onClick={handleSearchClick} className="search-button">Search</button>
                </div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="dineIn" title="Dine-In Reservations">
                        <div className="table-container">
                            <DineInTable searchTerm={searchTerm} />
                        </div>
                    </Tab>
                    <Tab eventKey="delivery" title="Delivery Reservations">
                        <div className="table-container">
                            <DeliveryTable searchTerm={searchTerm} />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ManageReservation;