import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function AccountNew({ show, handleClose, onSuccess }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const handleAddAccount = async () => {
        if (!email || !username || !password || !name || !mobileNo || !role) {
            setError('All fields are required.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password, name, mobileNo, role }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData);
            }

            // Reset form fields after successful signup
            setEmail('');
            setUsername('');
            setPassword('');
            setName('');
            setMobileNo('');
            setRole('');

            handleClose();
            onSuccess();
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        }
    };
    
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Account Info</h5>
                <div className='item-info'>
                    {error && <p className="error-message">{error}</p>}
                    <div className='add-item-type'>
                        <label>Select Type</label>
                        <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                    <input
                        type="text"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        placeholder="Enter contact number"
                    />

                    <label>Account Credentials</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                    />
                </div>
                <Button className='submit-btn' onClick={handleAddAccount}>
                    Add Account
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AccountNew;
