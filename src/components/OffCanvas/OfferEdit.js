import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function OfferEdit({ show, handleClose, item }) {

    const fileInputRef = useRef(null); 

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click(); 
    };


    const sampleImage = "https://via.placeholder.com/240x140";
    const pencilIcon = require('../../assets/images/pencil.png'); 

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Edit Offer</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Offer Details</h5>
                <div className='item-info'>

                <div className='image-box'>
                    <img src={sampleImage} alt="Item" />
                    <div className='upload-icon' onClick={triggerFileInput}>
                        <img src={pencilIcon} alt="Upload" />
                    </div>
                </div>
                
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    onChange={handleFileSelect}
                />

                    <label>Offer Title</label>
                    <input type="text" value={item?.name || ''} placeholder="Offer Title" />
                    <label>Offer Description</label>
                    <textarea value={item?.description || ''} placeholder="Offer Description" />
                    <label>Discount Rate (%)</label>
                    <input type="text" value={item?.rate || ''} placeholder="Offer Rate" maxLength={6} />
                    <label>Valid Period</label>
                    <input type="text" value={item?.valid || ''} placeholder="Offer Discount Rate" />
                    
                </div>
                
                
                
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OfferEdit;