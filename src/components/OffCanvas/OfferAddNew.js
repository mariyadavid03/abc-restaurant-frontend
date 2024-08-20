import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';


function OfferAddNew({ show, handleClose }) {
    const fileInputRef = useRef(null); 

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
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

                    <label>Select Offer Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" // Optional: Only accept image files
                        onChange={handleFileSelect}
                    />

                    
                   

                    <input type="text" placeholder="Offer Title" />
                    <textarea placeholder="Offer Description" />
                    <input type="text" placeholder="Rate (%)" maxLength={6} />
                    <input type="text" placeholder="Valid Period" />
                </div>
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Add Offer
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OfferAddNew;