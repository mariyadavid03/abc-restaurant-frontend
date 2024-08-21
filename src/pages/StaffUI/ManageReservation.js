import React, { useState } from 'react';
import './PagesStyle.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DineInTable from '../../components/Reservation/DineInTable';
import DeliveryTable from '../../components/Reservation/DeliveryTable';
import { Link } from 'react-router-dom';


function ManageReservation() {
    const [key, setKey] = useState('dineIn');
    return (
        <div className='page-body'>
            <div className="main-page">
                <Link to="/admin/dashboard">
                <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                </Link>
                

                <h2>Customer Reservations</h2>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="dineIn" title="Dine-In Reservations">
                        <div className="table-container">
                            <DineInTable/>
                        </div>
                    </Tab>
                    <Tab eventKey="delivery" title="Delivery Reservations">
                        <div className="table-container">
                            <DeliveryTable/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default ManageReservation;