import React, { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';

function AccountEdit({ show, handleClose, item, onSuccess }) {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (item) {
            setUsername(item.username);
            setName(item.name);
            setEmail(item.email);
            setMobileNo(item.mobileNo);
        }
    }, [item]);

    const handleSave = async () => {
        try {
            const data = {
                name: name,
                email: email,
                mobileNo: mobileNo,
            };

            if (editPassword && password) {
                data.password = password; 
            }

            console.log('Sending data:', data);

            await axios.put(`http://localhost:8080/user/update/${item.id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setEmail('');
            setMobileNo('');
            setName('');
            setPassword('');
            handleClose();
            onSuccess();
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Account</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <h5>Account Details</h5>
                <div className='item-info'>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Username" 
                        disabled
                    />
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Name" 
                    />
                    <label>Phone</label>
                    <input 
                        type="text" 
                        value={mobileNo} 
                        onChange={(e) => setMobileNo(e.target.value)} 
                        placeholder="Contact Number" 
                    />
                </div>
                
                <div className='item-info'>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={editPassword} 
                            onChange={() => setEditPassword(!editPassword)} 
                            style={{ width: "23px" }}
                        />
                        Edit Password
                    </label>
                </div>

                {/* Conditional Password Field */}
                {editPassword && (
                    <div className='item-info'>
                        <label>New Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter new password" 
                        />
                    </div>
                )}

                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleSave}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AccountEdit;
