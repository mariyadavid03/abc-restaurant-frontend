import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../pages/StaffUI/PagesStyle.css';
import SmallModal from '../Modals/SmallModal.js';
import Button from 'react-bootstrap/esm/Button.js';

function DeliveryTable() {
    const [reservations, setReservations] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleShowModal = (data) => {
        setModalContent(data);
        setModalShow(true);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this reservation?');
    
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/delivery/remove/${id}`);
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
                    <th>Status</th>
                    <th>Customer Name</th>
                    <th>Contact</th>
                    <th>Address</th>
                    <th>Delivery Instructions</th>
                    <th> - </th>
                </tr>
            </thead>
            <tbody>
            {filteredReservations.length > 0 ? (
                filteredReservations.map(reservation =>(
                    <tr key={reservation.id}>
                        <td>{reservation.delivery_code}</td>
                        <td>{reservation.status}</td>
                        <td>{reservation.user.name}</td>
                        <td>{reservation.user.mobileNo}</td>
                        <td>{reservation.delivery_address}</td>
                        <td
                            onClick={() => handleShowModal(reservation.special_instructions)} 
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} 
                        >
                            view
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

        <SmallModal 
            show={modalShow} 
            onHide={() => setModalShow(false)} 
            content={modalContent} 
        />
    </>
    );
}

export default DeliveryTable;