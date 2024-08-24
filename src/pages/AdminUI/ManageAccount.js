import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../StaffUI/PagesStyle.css';
import AccountNew from '../../components/OffCanvas/AccountNew.js';
import AccountEdit from '../../components/OffCanvas/AccountEdit.js';

function ManageAccount() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to remove this account?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/user/remove/${id}`);
                await fetchData();
                setSuccessMessage('Account deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Can not delete as the account is linked');
            }
        }
    };

    const handleEditSuccess = async () => {
        await fetchData();
        setSuccessMessage('Account updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        handleCloseEdit();
    };

    const handleAddSuccess = async () => {
        await fetchData();
        setSuccessMessage('Account added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user');
            // Filter out users with the role "customer"
            const nonCustomerAccounts = response.data.filter(user => user.role !== 'customer');
            setAccounts(nonCustomerAccounts);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='page-body'>
            <div className="main-page">
                <Link to="/admin/dashboard">
                    <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back" />
                </Link>
                <div className='menu-add-button-line'>
                    <h2>Manage Accounts</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                            Add Account
                    </Button>
                </div>

                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Created At</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map(item => (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                                    <td>
                                        <img 
                                            src={require('../../assets/images/edit.png')} 
                                            onClick={() => handleShowEdit(item)} 
                                            className='edit-btn' 
                                            alt="Edit" 
                                        />
                                        <img 
                                            src={require('../../assets/images/trash.png')} 
                                            onClick={() => handleDelete(item.id)} 
                                            className='trash-btn' 
                                            alt="Delete" 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                

               

                <AccountNew show={showAdd} handleClose={handleCloseAdd} onSuccess={handleAddSuccess}/>
                <AccountEdit show={showEdit} handleClose={handleCloseEdit} item={selectedItem} onSuccess={handleEditSuccess}/>
            </div>
        </div>
    );
}

export default ManageAccount;