import React, { useState, useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CanvasStyle.css';

function AddItemCanvas({ show, handleClose, onSuccess }) {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDesc: '',
        price: '',
        type: '',
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);

    // Upload image
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            console.error('No file selected');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // New item adding
    const handleAddResponse = async () => {
        if (!selectedFile) {
            alert('Please select an image before submitting.');
            return;
        }

        const data = new FormData();
        data.append('image', selectedFile);
        data.append('itemName', formData.itemName);
        data.append('itemDesc', formData.itemDesc);
        data.append('price', formData.price);
        data.append('type', formData.type);

        try {
            await axios.post('http://localhost:8080/menu/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleClose();
            onSuccess();
        } catch (error) {
            console.error('Error submitting response:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add New Item</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='item-info'>
                    <div className='add-item-type'>
                        <label>Select Type</label>
                        <select name="type" value={formData.type} onChange={handleInputChange}>
                            <option value="">Select Type</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="main">Main Dish</option>
                            <option value="dessert">Dessert</option>
                            <option value="beverage">Beverage</option>
                        </select>
                    </div>

                    <label>Select Item Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileSelect}
                    />

                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Item Preview" style={{ width: '100%', marginTop: '10px' }} />
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Item Name"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                    />

                     <input
                        type="number"
                        placeholder="Item Price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <textarea
                        placeholder="Item Description"
                        name="itemDesc"
                        value={formData.itemDesc}
                        onChange={handleInputChange}
                    />

                </div>
                <Button onClick={handleAddResponse} className='submit-btn'>Submit</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default AddItemCanvas;