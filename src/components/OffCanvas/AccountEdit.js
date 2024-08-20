import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function AccountEdit({ show, handleClose, item }) {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <h5>Account Details</h5>
                <div className='item-info'>
                    <label>Username: {item?.username || ' '}</label>
                    <label>Full Name</label>
                    <div className='name-inputs'>
                        <input type="text" value={item?.fname || ''} placeholder="First Name" />
                        <input type="text" value={item?.lname || ''} placeholder="Last Name" />
                    </div>
                    <label>Email</label>
                    <input type="email" value={item?.email || ''} placeholder="Email" />
                    <label>Phone</label>
                    <input type="text" value={item?.phone || ''} placeholder="Contact Number" />
                </div>
                
                
                
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AccountEdit;