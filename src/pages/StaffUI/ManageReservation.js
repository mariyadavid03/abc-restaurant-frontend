import React, { useState } from 'react';
import './PagesStyle.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DineInTable from '../../components/Reservation/DineInTable';
import DeliveryTable from '../../components/Reservation/DeliveryTable';
import { Link } from 'react-router-dom';
import SessionManager from '../../services/SessionManager';

function ManageReservation() {
    const [key, setKey] = useState('dineIn');
    const session = SessionManager.getInstance();
    const userRole = session.getRole();
    return (
        <div className='page-body'>
            <div className="main-page">
                {
                    userRole === 'staff' ? (
                        <Link to="/staff/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : userRole === 'admin' ? (
                        <Link to="/admin/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : null
                }
                
                

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