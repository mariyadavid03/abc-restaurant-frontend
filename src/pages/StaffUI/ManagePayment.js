import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PagesStyle.css';

function ManagePayment() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const userRole = sessionStorage.getItem('role');
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/payment');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setError('Failed to load payments. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                <h2>Customer Payments</h2>

                {error && <div className="error-message">{error}</div>}

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Delivery ID</th>
                                <th>DateTime</th>
                                <th>Total (LKR)</th>
                                <th>Customer Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.delivery.delivery_code}</td>
                                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.delivery.user.username}</td> {/* Corrected access */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManagePayment;