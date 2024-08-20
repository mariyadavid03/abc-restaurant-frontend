import React, { useState } from 'react';
import './PagesStyle.css';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function QueryOffCanvas({ show, handleClose }) {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Query Info</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Query</h5>
                <input type="text" value="Sample query text here" disabled />
                <h5>Query Response</h5>
                <input type="text" placeholder="Enter Response" />
                <Button className='submit-btn' style={{ marginTop: '10px' }}>
                    Submit Response
                </Button>
                <Button className='delete-btn' style={{ marginTop: '10px', width: '100%', textAlign: "center" }}>
                    Delete
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

function ManageQuery() {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleRowClick = () => {
        setShowOffCanvas(true);
    };

    const handleCloseOffCanvas = () => {
        setShowOffCanvas(false);
    };

    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back" />
                <h2>Customer Queries</h2>
                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date & Time</th>
                                <th>Customer Name</th>
                                <th>Email Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={handleRowClick}>
                                <td>Data 1</td>
                                <td>Data 2</td>
                                <td>Data 3</td>
                                <td>Date 4</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>

            <QueryOffCanvas show={showOffCanvas} handleClose={handleCloseOffCanvas} />
        </div>
    );
}

export default ManageQuery;