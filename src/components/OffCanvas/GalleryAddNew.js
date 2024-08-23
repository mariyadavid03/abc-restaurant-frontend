import React, { useState, useRef } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';

function GalleryAddNew({ show, handleClose, onSuccess }) {
    const [formData, setFormData] = useState({
        image_name: '',
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    //Image Uploading 
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            console.log('Selected file:', file);
        } else {
            console.error('No file selected');
        }
    };

    //Adding new item
    const handleAddItem = async () => {
        if (!selectedFile) {
            alert('Please select an image before submitting.');
            return;
        }

        const data = new FormData();
        data.append('image_data', selectedFile);
        data.append('image_name', formData.image_name);

        try {
            await axios.post('http://localhost:8080/gallery/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            resetForm();
            handleClose();
            onSuccess();

        } catch (error) {
            console.error('Error adding gallery item:', error.response ? error.response.data : error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({ image_name: '' });
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Offcanvas show={show} onHide={() => {
            resetForm(); // Reset fields when closing
            handleClose();
        }} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Gallery Image</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='item-info'>
                    <label>Select Image</label>
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
                        placeholder="Image Name"
                        name="image_name"
                        value={formData.image_name}
                        onChange={handleInputChange}
                    />                   
                </div>
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleAddItem}>
                    Add
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default GalleryAddNew;
