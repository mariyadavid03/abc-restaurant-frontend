import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function EditItemCanvas({ show, handleClose, item }) {

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
                <Offcanvas.Title>Edit Item</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Item Details</h5>
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
                    style={{ display: 'none' }} // Hide the file input
                    accept="image/*" // Optional: Only accept image files
                    onChange={handleFileSelect}
                />

                    <label>Item Name</label>
                    <input type="text" value={item?.name || ''} placeholder="Item Name" />
                    <label>Item Price (LKR)</label>
                    <input type="number" value={item?.price || ''} placeholder="Item Price" />
                    <label>Item Description</label>
                    <textarea value={item?.description || ''} placeholder="Item Description" />
                </div>
                
                
                
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Save Changes
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default EditItemCanvas;