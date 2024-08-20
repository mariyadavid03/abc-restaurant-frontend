import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../StaffUI/PagesStyle.css';
import ServiceNew from '../../components/OffCanvas/ServiceNew.js';

function ManageService() {
    const [showAdd, setShowAdd] = useState(false);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back" />
                <div className='menu-add-button-line'>
                    <h2>Manage Services</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                            Add Service
                    </Button>
                </div>
                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Item 1</td>
                                <td>Description 1</td>
                                <td>
                                    <Button className='delete-btn'>Delete</Button>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
                
                <ServiceNew show={showAdd} handleClose={handleCloseAdd} />
            </div>
        </div>
    );
}

export default ManageService;