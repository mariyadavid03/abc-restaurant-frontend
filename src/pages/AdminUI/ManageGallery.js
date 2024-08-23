import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../StaffUI/PagesStyle.css';
import GalleryAddNew from '../../components/OffCanvas/GalleryAddNew';
import axios from 'axios';

function ManageGallery() {
    const [showAdd, setShowAdd] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/gallery');
            setGalleryImages(response.data);
        } catch (error) {
            console.error('Error fetching gallery images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/gallery/remove/${id}`);
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
                    <h2>Manage Gallery</h2>
                    <Button onClick={handleShowAdd} className='add-btn'>
                        Add Gallery Item
                    </Button>
                </div>
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className='table-container'>
                    <table className='main-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>-</th>
                            </tr>
                        </thead>
                        <tbody>
                            {galleryImages.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <img 
                                            src={`data:image/jpeg;base64,${item.image_data}`} 
                                            alt={item.image_name} 
                                            className='gallery-image' 
                                        />
                                    </td>
                                    <td>{item.image_name}</td>
                                    <td>
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
                <GalleryAddNew show={showAdd} handleClose={handleCloseAdd} onSuccess={handleAddSuccess} />
            </div>
        </div>
    );
}

export default ManageGallery;