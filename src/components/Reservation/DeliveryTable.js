import React, { useState } from 'react';
import '../../pages/StaffUI/PagesStyle.css';
import SmallModal from '../Modals/SmallModal.js';
import Button from 'react-bootstrap/esm/Button.js';

function DeliveryTable() {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleShowModal = (data) => {
        setModalContent(data);
        setModalShow(true);
    };

    return (
        <>
            <table className='main-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date & Time</th>
                        <th>Customer Name</th>
                        <th>Customer Contact</th>
                        <th>Address</th>
                        <th>Delivery Instructions</th>
                        <th> - </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Delivery 1</td>
                        <td>Data 2</td>
                        <td>Data 3</td>
                        <td>Data 4</td>
                        <td>Data 5</td>
                        <td 
                            onClick={() => handleShowModal('Data 6')} 
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        >
                            Data 6
                        </td>
                        <td>
                            <Button className='delete-btn'>
                                Delete
                            </Button>
                        </td>
                    </tr>
                    {/* Add more rows as needed */}
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