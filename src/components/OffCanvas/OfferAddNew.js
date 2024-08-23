import React, {useRef, useState} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';
import axios from 'axios';


function OfferAddNew({ show, handleClose, onSuccess }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        offerName: '',
        offerDesc: '',
        discount: '',
        validPeriod: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
        if(!selectedFile) {
            alert('Please select an image before submitting.');
            return;
        }

        const data = new FormData();
        data.append('offerName', formData.offerName);
        data.append('offerDesc', formData.offerDesc);
        data.append('discount', formData.discount);
        data.append('validPeriod', formData.validPeriod);
        data.append('image', selectedFile);

        try{
            await axios.post('http://localhost:8080/offer/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            resetForm();
            handleClose();
            onSuccess();
        } catch(error){
            console.error('Error adding item:', error.response ? error.response.data : error.message);
        }
    }
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
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add Offer</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Offer Details</h5>
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
                        placeholder="Offer Name"
                        name="offerName"
                        value={formData.offerName}
                        onChange={handleInputChange}
                    />

                    <textarea
                        placeholder="Offer Description"
                        name="offerDesc"
                        value={formData.offerDesc}
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        placeholder="Discount Rate(%)"
                        name="discount"
                        value={formData.discount}
                        onChange={handleInputChange}
                        maxLength={10}
                    />

                    <input
                        type="text"
                        placeholder="Valid Period"
                        name="validPeriod"
                        value={formData.validPeriod}
                        onChange={handleInputChange}
                    />
                </div>
                <Button 
                    className='submit-btn' 
                    style={{ marginTop: '10px' }} 
                    onClick={handleAddItem}
                >
                    Add Offer
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OfferAddNew;