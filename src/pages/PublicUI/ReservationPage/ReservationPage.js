import React, { useRef, useEffect, useState } from 'react';
import Header from "../../../components/Header/PublicHeader/Header";
import axios from 'axios';
import './ReservationStyle.css';
import SessionManager from '../../../services/SessionManager';

function ReservationPage() {
    const contactUsRef = useRef(null);
    const session = SessionManager.getInstance();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        contactNo: ''
    });
    const [reservationDetails, setReservationDetails] = useState({
        date: '',
        numGuests: '',
        specialRequests: ''
    });

    const scrollToContactUs = () => {
        contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const userId = session.getUserId();

        if (userId) {
            axios.get(`http://localhost:8080/user/${userId}`)
                .then(response => {
                    const { name, email, mobileNo } = response.data;
                    setUserData({
                        name: name,
                        email: email,
                        contactNo: mobileNo
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationDetails({
            ...reservationDetails,
            [name]: value
        });
    };

    const generateReservationCode = () => {
        return `DIN${Math.floor(10000 + Math.random() * 90000)}`;
    };

    const handleReservationSubmit = (e) => {
        e.preventDefault();
        const userId = session.getUserId();
        const reservationCode = generateReservationCode();
        const userEmail = userData.email;
    
        const reservationData = {
            reservation_code: reservationCode,
            user: {
                id: userId
            },
            reservation_date_time: reservationDetails.date,
            num_guests: reservationDetails.numGuests,
            special_requests: reservationDetails.specialRequests,
            status: 'RESERVED'

        };
    
        axios.post('http://localhost:8080/dinein/add', reservationData)
            .then(response => {
                // Send the reservation details email
                axios.post('http://localhost:8080/sendReservationEmail', {
                    email: userEmail,
                    reservation_code: reservationCode,
                    reservation_date_time: reservationDetails.date,
                    num_guests: reservationDetails.numGuests,
                    special_requests: reservationDetails.specialRequests
                })
                .then(() => {
                    alert('Reservation successful! Details will be sent to your email.');
                    setReservationDetails({
                        date: '',
                        numGuests: '',
                        specialRequests: ''
                    });
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Error sending reservation email:', error);
                });
            })
            .catch(error => {
                console.error('Error making reservation:', error.response.data);
            });
    };
    return (
        <>
            <Header onContactUsClick={scrollToContactUs} />
            <div className="reservation-page">
                <h2 className="reservation-heading">Make Your Reservations</h2>

                <div className="main-container">
                    <div className="reservation-form-container">
                        <div className="reservation-details">

                            {/* Reservation Form 1 */}
                            <form className="reservation-form" onSubmit={handleReservationSubmit}>
                                <h2>Booking Details</h2>
                                <div className="form-group">
                                    <label htmlFor="date">Date:</label>
                                    <input 
                                        type="datetime-local" 
                                        id="date" 
                                        name="date" 
                                        value={reservationDetails.date} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numGuests">Number of Diners:</label>
                                    <input 
                                        type="number" 
                                        id="numGuests" 
                                        name="numGuests" 
                                        value={reservationDetails.numGuests} 
                                        onChange={handleInputChange} 
                                        min="1" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="specialRequests">Special Requests:</label>
                                    <textarea 
                                        id="specialRequests" 
                                        name="specialRequests" 
                                        value={reservationDetails.specialRequests} 
                                        onChange={handleInputChange} 
                                        rows="4" 
                                    ></textarea>
                                </div>

                                <h2>Personal Details</h2>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" value={userData.name} disabled />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input  type="email" id="email" name="email" value={userData.email} disabled />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contact-no">Contact Number:</label>
                                    <input type="tel" id="contactNo" name="contactNo" value={userData.contactNo} disabled />
                                </div>

                                <button type="submit" className='submit-btn'>Reserve</button>
                            </form>
                        </div>
                    </div>
                    <div className="reservation-info-container">
                        <h3>Open Hours</h3>
                        <p>Monday - Friday <br />11:00AM - 10:00PM</p>
                        <p>Weekends <br />10:00 AM - 11:30 PM</p>
                        <p>Closed on Bank Holidays</p>
                        <br />
                        <h3>Contact Info</h3>
                        <p>+94 764 7764</p>
                        <p>+94 875 47382</p>
                        <p>abcresturant@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReservationPage;
