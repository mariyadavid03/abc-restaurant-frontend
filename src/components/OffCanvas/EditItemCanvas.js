import React, { useRef, useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';

function EditItemCanvas({ show, handleClose, item, onSuccess}) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDesc, setItemDesc] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (item) {
            setItemName(item.item_name || '');
            setItemPrice(item.price || '');
            setItemDesc(item.item_desc || '');
            if (item.id) {
                loadImage(item.id);
            }
        }
    }, [item]);

    async function loadImage(id) {
        try {
            const response = await axios.get(`http://localhost:8080/menu/image/${id}`, { responseType: 'blob' });
            const imageUrl = URL.createObjectURL(response.data);
            setImageSrc(imageUrl);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);

        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleNameChange = (e) => setItemName(e.target.value);
    const handlePriceChange = (e) => setItemPrice(e.target.value);
    const handleDescChange = (e) => setItemDesc(e.target.value);

    // Displaying fetched image
    const itemImage = selectedImage || imageSrc;


    const handleSaveChange = async () => {
        try {
            const formData = new FormData();
            formData.append('itemName', itemName);
            formData.append('itemDesc', itemDesc);
            formData.append('price', itemPrice);
            
            // Log the files to ensure they are being added
            if (fileInputRef.current.files[0]) {
                console.log('Image file:', fileInputRef.current.files[0]);
                formData.append('image', fileInputRef.current.files[0]);
            }
        
            await axios.put(`http://localhost:8080/menu/update/${item.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleClose(); 
            onSuccess();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Item</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Item Details</h5>
                <div className='item-info'>
                    <div className='image-box'>
                        {itemImage ? (
                            <img src={itemImage} alt="Item" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <p>No image available</p>
                        )}
                        <div className='upload-icon' onClick={triggerFileInput}>
                            <span>Upload</span>
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleFileSelect}
                    />

                    <label>Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        placeholder="Item Name"
                        onChange={handleNameChange}
                    />
                    <label>Item Price (LKR)</label>
                    <input
                        type="number"
                        value={itemPrice}
                        placeholder="Item Price"
                        onChange={handlePriceChange}
                    />
                    <label>Item Description</label>
                    <textarea
                        value={itemDesc}
                        placeholder="Item Description"
                        onChange={handleDescChange}
                    />
                </div>

                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleSaveChange}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default EditItemCanvas;