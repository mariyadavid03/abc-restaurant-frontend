import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './PagesStyle.css';
import AddItemCanvas from '../../components/OffCanvas/AddItemCanvas.js';
import EditItemCanvas from '../../components/OffCanvas/EditItemCanvas.js';

function ManageMenu() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };
    const handleCloseEdit = () => setShowEdit(false);

    return (
        <div className='page-body'>
            <div className="main-page">
                <img src={require("../../assets/images/arrow.png")} className="back-arrow" alt="Go Back" />
                <div className='menu-add-button-line'>
                    <h2>Manage Menu</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                            Add New Item
                    </Button>
                </div>
                <div className='menu-sub-heading'>
                    Appetizer
                </div>

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price(LKR)</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Item 1</td>
                                <td>Item Price</td>
                                <td>Description 1</td>
                                <td>
                                    <img src={require('../../assets/images/edit.png')} onClick={() => handleShowEdit({ id: 1, name: 'Item 1', description: 'Description 1' })} className='edit-btn' alt="Edit"/>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
                {/* Main Dishes */}
                <div className='menu-sub-heading'>
                    Main Dishes

                </div>

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price(LKR)</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Item 1</td>
                                <td>Item Price</td>
                                <td>Description 1</td>
                                <td>
                                    <img src={require('../../assets/images/edit.png')} onClick={() => handleShowEdit({ id: 1, name: 'Item 1', price: '1000',description: 'Description 1' })} className='edit-btn' alt="Edit"/>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>

                <AddItemCanvas show={showAdd} handleClose={handleCloseAdd} />
                <EditItemCanvas show={showEdit} handleClose={handleCloseEdit} item={selectedItem} />
            </div>
        </div>
    );
}

export default ManageMenu;