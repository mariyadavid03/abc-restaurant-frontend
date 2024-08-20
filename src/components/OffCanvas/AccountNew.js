import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function AccountNew({ show, handleClose }) {
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Account Info</h5>
                <div className='item-info'>
                    <div className='add-item-type'>
                        <label>Select Account Type</label>
                        <select> 
                            <option>Staff</option>
                            <option>Admin</option>
                        </select>
                    </div>
                    <label>Full Name</label>
                    <div className='name-inputs'>
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <input type="text" placeholder="Phone" maxLength={10} />
                    <input type="email" placeholder="Email" />
                    <label>Account Credentials</label>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Retype Password" />
                </div>
                <Button className='submit-btn' onClick={handleClose}>
                    Add Account
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AccountNew;