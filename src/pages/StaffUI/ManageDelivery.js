import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PagesStyle.css';
import { Link } from 'react-router-dom';
import SessionManager from '../../services/SessionManager';
import LargeModal from '../../components/Modals/LargeModal';
import Button from 'react-bootstrap/esm/Button';

function ManageDelivery() {

    const session = SessionManager.getInstance();
    const userRole = session.getRole();

    const [reservations, setReservations] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchReservations();
    }, []);

    // Fetch reservations data
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/delivery'); 
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    // //Fetch orders & payment
    // const fetchOrders = async (id) => {
    //     try{
    //         const orderResponse = await axios.get(`http://localhost:8080/order/getbydelivery/${id}`);
    //         const paymentResponse = await axios.get(`http://localhost:8080/payment/getbydelivery/${id}`);

    //     } catch (error) {
    //         console.error('Error fetching orders:', error);
    //     }
    // }
    //Modal 
    const handleModalOpen = (deliveryId) => {
        axios.get(`http://localhost:8080/order/getbydelivery/${deliveryId}`)
          .then(response => {
            setOrderDetails(response.data);
            return axios.get(`http://localhost:8080/payment/getbydelivery/${deliveryId}`);
          })
          .then(response => {
            setTotalAmount(response.data.amount);
            setShowModal(true);
          })
          .catch(error => {
            console.error('Error fetching order or payment data:', error);
          });
      };
    const handleModalClose = () => setShowModal(false);


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this reservation?');
    
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/delivery/removeList/${id}`);
                setReservations(reservations.filter(reservation => reservation.id !== id));
                fetchReservations();

                // Show success message
                setSuccessMessage('Reservation deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                
            } catch (error) {
                console.error('Error deleting reservation:', error);
                alert('An error occurred while deleting the reservation.');
            }
        }
    };

    // Filter the reservations 
    const filteredReservations = reservations.filter(reservation => 
        reservation.delivery_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


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

                <h2>Delivery Order</h2>
                <>
                    <div className="search-bar-container">
                        <input 
                            type="text" 
                            placeholder="Search by ID or Customer Name..." 
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-bar"
                        />
                    </div>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer Name</th>
                                <th>Username</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Delivery Instructions</th>
                                <th>Order</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map(reservation =>(
                                <tr key={reservation.id}>
                                    <td>{reservation.delivery_code}</td>
                                    <td>{reservation.user.name}</td>
                                    <td>{reservation.user.username}</td>
                                    <td>{reservation.user.mobileNo}</td>
                                    <td>{reservation.delivery_address}</td>
                                    <td>{reservation.special_instructions}</td>    
                                    <td
                                        onClick={() => {
                                            // fetchOrders(reservation.id);
                                            handleModalOpen(reservation.id);
                                        }} 
                                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                    >
                                        View
                                    </td>          
                                    <td>
                                    <Button 
                                        className='delete-btn'
                                        onClick={() => handleDelete(reservation.id)}
                                    >
                                    Delete
                                    </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No such record</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/* Order Details Modal */}
                    <LargeModal 
                    show={showModal} 
                    onHide={handleModalClose} 
                    orderDetails={orderDetails} 
                    totalAmount={totalAmount} 
                    />
                </>
            </div>
        </div>
    );
}

export default ManageDelivery;