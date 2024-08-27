import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './PagesStyle.css';
import AddItemCanvas from '../../components/OffCanvas/AddItemCanvas.js';
import EditItemCanvas from '../../components/OffCanvas/EditItemCanvas.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SessionManager from '../../services/SessionManager.js';

function ManageMenu() {
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [appetizers, setAppetizers] = useState([]);
    const [mainDishes, setMainDishes] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [loading, setLoading] = useState(true);

    const session = SessionManager.getInstance();
    const userRole = session.getRole();

    const handleCloseAdd = () => setShowAdd(false);

    const handleShowEdit = (item) => {
        setSelectedItem(item);
        setShowEdit(true);
    };

    const handleCloseEdit = () => setShowEdit(false);

    const fetchData = async () => {
        try {
            const appResponse = await axios.get('http://localhost:8080/menu/type/appetizer');
            const mainResponse = await axios.get('http://localhost:8080/menu/type/main');
            const bevResponse = await axios.get('http://localhost:8080/menu/type/beverage');
            const desResponse = await axios.get('http://localhost:8080/menu/type/dessert');

            setAppetizers(appResponse.data);
            setMainDishes(mainResponse.data);
            setBeverages(bevResponse.data);
            setDesserts(desResponse.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/menu/remove/${id}`);
                await fetchData();
                setSuccessMessage('Item deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting item:', error);
                alert('An error occurred while deleting the item.');
            }
        }
    };

    const handleAddSuccess = async () => {
        await fetchData();
        setSuccessMessage('Item added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };
    const handleEditSuccess = async () => {
        await fetchData();
        setSuccessMessage('Item updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        handleCloseEdit();
    };
    const handleShowAdd = () => {
        setShowAdd(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='page-body'>
            <div className="main-page">
                {
                    userRole === 'staff' ? (
                        <Link to="/staff/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : userRole === 'admin' ? (
                        <Link to="/admin/dashboard">
                            <img src={require("../../assets/images/arrow-white.png")} className="back-arrow" alt="Go Back"/>
                        </Link>
                    ) : null
                }
                <div className='menu-add-button-line'>
                    <h2>Manage Menu</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                        Add New Item
                    </Button>
                </div>
                {successMessage && <div className="success-message">{successMessage}</div>}

                {/* Appetizers Section */}
                <div className='menu-sub-heading'>Appetizers</div>
                <div className='table-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : appetizers.length > 0 ? (
                        <table className='main-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price(LKR)</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appetizers.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.item_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.item_desc}</td>
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
                    ) : (
                        <p>No items available</p>
                    )}
                </div>

                {/* Main Dishes Section */}
                <div className='menu-sub-heading'>Main Dishes</div>
                <div className='table-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : mainDishes.length > 0 ? (
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
                                {mainDishes.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.item_desc}</td>
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
                    ) : (
                        <p>No items available</p>
                    )}
                </div>


                {/* Beverages Section */}
                <div className='menu-sub-heading'>Beverages</div>
                <div className='table-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : beverages.length > 0 ? (
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
                                {beverages.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.item_desc}</td>
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
                    ) : (
                        <p>No items available</p>
                    )}
                </div>

                {/* Desserts Section */}
                <div className='menu-sub-heading'>Beverages</div>
                <div className='table-container'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : desserts.length > 0 ? (
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
                                {desserts.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.item_name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.item_desc}</td>
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
                    ) : (
                        <p>No items available</p>
                    )}
                </div>

                <AddItemCanvas 
                    show={showAdd} 
                    handleClose={handleCloseAdd} 
                    onSuccess={handleAddSuccess}
                />
                 <EditItemCanvas 
                    show={showEdit} 
                    handleClose={handleCloseEdit} 
                    item={selectedItem}
                    onSuccess={handleEditSuccess}
                />
            </div>
        </div>
    );
}

export default ManageMenu;