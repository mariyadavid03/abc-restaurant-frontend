import React, { useRef, useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';

function OfferEdit({ show, handleClose, item, onSuccess }) {
    const fileInputRef = useRef(null); 
    const [selectedImage, setSelectedImage] = useState('');
    const [offerName, setOfferName] = useState('');
    const [offerDesc, setOfferDesc] = useState('');
    const [discount, setDiscount] = useState('');
    const [validPeriod, setValidPeriod] = useState('');

    useEffect(() => {
        if (item) {
            setOfferName(item.offer_name || '');
            setOfferDesc(item.offer_desc || '');
            setDiscount(item.discount || '');
            setValidPeriod(item.valid_period || '');

            if (item.id) {
                loadImage(item.id);
            }
        }
    }, [item]);

    const loadImage = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/offer/image/${id}`, {
                responseType: 'arraybuffer'
            });
            const base64Image = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                )
            );
            setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
        } catch (error) {
            console.error('Error loading image:', error);
            setSelectedImage('');  // Clear the image if there's an error
        }
    };

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

    const handleNameChange = (e) => setOfferName(e.target.value);
    const handleDescChange = (e) => setOfferDesc(e.target.value);
    const handleDiscountChange = (e) => setDiscount(e.target.value);
    const handleValidChange = (e) => setValidPeriod(e.target.value);

    const handleSaveChanges = async () => {
        const data = new FormData();
        data.append('offerName', offerName);
        data.append('offerDesc', offerDesc);
        data.append('discount', discount);
        data.append('validPeriod', validPeriod);
        if (fileInputRef.current.files[0]) {
            data.append('image', fileInputRef.current.files[0]);
        }

        try {
            await axios.put(`http://localhost:8080/offer/update/${item.id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error updating offer:', error);
        }
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Offer</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='item-info'>
                    <div className='image-box'>
                        {selectedImage ? (
                            <img src={selectedImage} alt="Item" style={{ width: '100%', height: 'auto' }} />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" 
                        onChange={handleFileSelect}
                    />

                    
                    
                    <label>Offer Title</label>
                    <input type="text" value={offerName} onChange={handleNameChange} placeholder="Offer Title" />
                    
                    <label>Offer Description</label>
                    <textarea value={offerDesc} onChange={handleDescChange} placeholder="Offer Description" />
                    
                    <label>Discount Rate (%)</label>
                    <input type="text" value={discount} onChange={handleDiscountChange} placeholder="Discount Rate" maxLength={6} />
                    
                    <label>Valid Period</label>
                    <input type="text" value={validPeriod} onChange={handleValidChange} placeholder="Valid Period" />
                </div>
                
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OfferEdit;
