import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';

function ServiceNew({ show, handleClose }) {
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
                <Offcanvas.Title>Add New Service</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <h5>Service Details</h5>
                <div className='item-info'>

                    <label>Select Item Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" // Optional: Only accept image files
                        onChange={handleFileSelect}
                    />

                    <input type="text" placeholder="Service Name" />
                    <textarea placeholder="Service Description" />
                </div>
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Add Service
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}


export default ServiceNew;