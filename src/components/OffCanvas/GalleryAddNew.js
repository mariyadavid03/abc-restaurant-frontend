import React, {useRef} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import './CanvasStyle.css';


function GalleryAddNew({ show, handleClose }) {
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
                <Offcanvas.Title>Add Gallery Image</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='item-info'>

                    <label>Select Image</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*" // Optional: Only accept image files
                        onChange={handleFileSelect}
                    />

                    <input type="text" placeholder="Image Title" />
                </div>
                <Button className='submit-btn' style={{ marginTop: '10px' }} onClick={handleClose}>
                    Add
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default GalleryAddNew;