import React, { useEffect, useState , useCallback } from "react";
import './ProfileStyles.css';
import SessionManager from "../../../services/SessionManager";
import axios from "axios";
import Header from "../../../components/Header/PublicHeader/Header";

function ProfilePage() {
    const [userDetails, setUserDetails] = useState({});
    const [reservations, setReservations] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const session = SessionManager.getInstance();
    const [error, setError] = useState('');
    const userId = session.getUserId();

    // Fetching profile data
    const fetchProfileData = useCallback(async () => {
        try {
            const userResponse = await axios.get(`http://localhost:8080/user/${userId}`);
            setUserDetails(userResponse.data);
        } catch (error) {
            console.error('Error fetching user details:', error.response ? error.response.data : error.message);
            setError('Failed to fetch user details');
        }
    }, [userId]);

    // Fetching user's reservations
    const fetchReservationData = useCallback(async () => {
        try {
            const reservationResponse = await axios.get(`http://localhost:8080/dinein/getReservationByUser/${userId}`);
            const sortedReservations = reservationResponse.data.sort((a, b) => new Date(b.reservationDateTime) - new Date(a.reservationDateTime));
            setReservations(sortedReservations);
        } catch (error) {
            console.error('Error fetching reservation details:', error.response ? error.response.data : error.message);
            setError('Failed to fetch details');
        }
    }, [userId]);

    // Fetching user's delivery orders
    const fetchDeliveryData = useCallback(async () => {
        try {
            const deliveryResponse = await axios.get(`http://localhost:8080/delivery/getDeliverynByUser/${userId}`);
            const sortedDeliveries = deliveryResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setDeliveries(sortedDeliveries);
        } catch (error) {
            console.error('Error fetching details:', error.response ? error.response.data : error.message);
            setError('Failed to fetch details');
        }
    }, [userId]);

    // Handling reservation canceling
    const handleCancel = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to cancel this reservation?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:8080/dinein/cancelReservation/${id}`);
                
                setSuccessMessage('Reservation canceled successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                fetchReservationData();
            } catch (error) {
                console.error('Error canceling reservation:', error);
                alert('An error occurred while canceling the reservation.');
            }
        }
    };

    // Cancleing delivery canceling
    const handleDeliveryCancel = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to cancel this delivery?');
        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:8080/delivery/cancelDelivery/${id}`);

                setSuccessMessage('Order canceled successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                fetchDeliveryData();
            } catch (error) {
                console.error('Error canceling delivery:', error);
                alert('An error occurred while canceling the delivery.');
            }
        }
    };

    useEffect(() => {
        fetchProfileData();
        fetchReservationData();
        fetchDeliveryData();
    }, [fetchProfileData, fetchReservationData, fetchDeliveryData]);

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page-content">

                {/* User info */}
                <h4 className="heading-profile"><center>Profile Details</center></h4>
                <div className="user-info-section">
                    <div>
                        <img src={require('../../../assets/images/user.png')} alt='User' />
                    </div>
                    <div className="user-info">
                        <h6>Username: {userDetails.username}</h6>
                        <h6>Name: {userDetails.name}</h6>
                        <h6>Email: {userDetails.email}</h6>
                        <h6>Contact Number: {userDetails.mobileNo}</h6>
                    </div>
                </div>

                {/* User's reservations */}
                <h4 className="profile-sub-heading">Your Reservations</h4>
                <div className="user-reservation-section">
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {reservations.length === 0 ? (
                        <p>No reservations found</p>
                    ) : (
                        <table className='main-table'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Date & Time</th>
                                    <th>No. of Guests</th>
                                    <th>Status</th>
                                    <th> - </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map(reservation => (
                                    <tr key={reservation.id}>
                                        <td>{reservation.reservation_code}</td>
                                        <td>{new Date(reservation.reservationDateTime).toLocaleString()}</td>
                                        <td>{reservation.num_guests}</td>
                                        <td>{reservation.status}</td>
                                        <td>
                                            {reservation.status !== 'Canceled' && (
                                                <button
                                                    className='cancel-btn'
                                                    onClick={() => handleCancel(reservation.id)}>
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* User's Delivery Orders */}
                <h4 className="profile-sub-heading">Your Delivery Orders</h4>
                <div className="user-delivery-section">
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {deliveries.length === 0 ? (
                        <p>No delivery orders found</p>
                    ) : (
                        <table className='main-table'>
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Order Time</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th> - </th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliveries.map(delivery => (
                                    <tr key={delivery.id}>
                                        <td>{delivery.delivery_code}</td>
                                        <td>{new Date(delivery.createdAt).toLocaleString()}</td>
                                        <td>{delivery.delivery_address}</td>
                                        <td>{delivery.status}</td>
                                        <td>
                                            {delivery.status !== 'Canceled' && (
                                                <button
                                                    className='cancel-btn'
                                                    onClick={() => handleDeliveryCancel(delivery.id)}>
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default ProfilePage;
